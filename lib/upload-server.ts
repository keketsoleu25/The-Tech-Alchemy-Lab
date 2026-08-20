import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

import { get } from "@vercel/blob";

import { prisma } from "@/lib/prisma";
import {
  matchesAllowedFileSignature,
  MAX_UPLOAD_FILES,
  type UploadedAttachmentInput,
  type UploadPurpose,
  type UploadSessionCredentials,
  uploadPathPrefix,
  validateUploadCandidate,
} from "@/lib/upload-config";

export class UploadValidationError extends Error {}

export function createUploadSecret() {
  return randomBytes(32).toString("base64url");
}

export function hashUploadSecret(secret: string) {
  return createHash("sha256").update(secret).digest("hex");
}

export function createRequestKeyHash(request: Request) {
  const secret = process.env.ATTACHMENT_DOWNLOAD_SECRET;
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwarded || request.headers.get("x-real-ip")?.trim();
  if (!secret || !address) return null;
  return createHmac("sha256", secret).update(address).digest("hex");
}

function secureHashMatch(value: string, expectedHash: string) {
  const actual = Buffer.from(hashUploadSecret(value), "hex");
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function requireActiveUploadSession(
  credentials: UploadSessionCredentials,
  purpose: UploadPurpose,
) {
  const session = await prisma.uploadSession.findUnique({ where: { id: credentials.id } });
  if (!session || !secureHashMatch(credentials.secret, session.secretHash)) {
    throw new UploadValidationError("The secure upload session is invalid.");
  }
  if (session.purpose !== purpose || session.consumedAt || session.expiresAt <= new Date()) {
    throw new UploadValidationError("The secure upload session has expired. Please upload the files again.");
  }
  return session;
}

export type VerifiedAttachment = {
  uploadSessionId: string;
  pathname: string;
  url: string;
  downloadUrl: string;
  originalName: string;
  contentType: string;
  size: number;
};

export async function verifyUploadedAttachments(
  purpose: UploadPurpose,
  credentials: UploadSessionCredentials | null | undefined,
  attachments: UploadedAttachmentInput[],
) {
  if (attachments.length === 0) return { sessionId: null, attachments: [] as VerifiedAttachment[] };
  if (!credentials) throw new UploadValidationError("The attachment upload session is missing.");
  if (attachments.length > MAX_UPLOAD_FILES) throw new UploadValidationError("A maximum of five attachments is allowed.");

  const session = await requireActiveUploadSession(credentials, purpose);
  if (attachments.length > session.maxFiles || attachments.length > session.reservedFiles) {
    throw new UploadValidationError("The attachment list does not match the secure upload session.");
  }

  const uniquePaths = new Set(attachments.map((attachment) => attachment.pathname));
  if (uniquePaths.size !== attachments.length) throw new UploadValidationError("Duplicate attachments are not allowed.");

  const prefix = uploadPathPrefix(purpose, session.id);
  const verified: VerifiedAttachment[] = [];

  for (const attachment of attachments) {
    if (!attachment.pathname.startsWith(prefix) || attachment.pathname.includes("..")) {
      throw new UploadValidationError("An attachment path is not part of this secure upload session.");
    }

    const result = await get(attachment.pathname, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) throw new UploadValidationError(`${attachment.originalName} could not be verified.`);

    const candidateError = validateUploadCandidate({
      name: attachment.originalName,
      type: result.blob.contentType,
      size: result.blob.size,
    });
    if (candidateError) {
      await result.stream.cancel();
      throw new UploadValidationError(candidateError);
    }

    const reader = result.stream.getReader();
    const firstChunk = await reader.read();
    await reader.cancel();
    if (!firstChunk.value || !matchesAllowedFileSignature(result.blob.contentType, firstChunk.value)) {
      throw new UploadValidationError(`${attachment.originalName} failed the file-content safety check.`);
    }

    verified.push({
      uploadSessionId: session.id,
      pathname: result.blob.pathname,
      url: result.blob.url,
      downloadUrl: result.blob.downloadUrl,
      originalName: attachment.originalName,
      contentType: result.blob.contentType,
      size: result.blob.size,
    });
  }

  return { sessionId: session.id, attachments: verified };
}
