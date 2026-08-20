"use client";

import { upload } from "@vercel/blob/client";

import {
  buildUploadPath,
  type UploadedAttachmentInput,
  type UploadPurpose,
  type UploadSessionCredentials,
  validateUploadCandidate,
} from "@/lib/upload-config";

export type UploadedBatch = {
  attachments: UploadedAttachmentInput[];
  uploadSession: UploadSessionCredentials;
};

export async function uploadSelectedFiles(
  purpose: UploadPurpose,
  files: File[],
  onStatus?: (message: string) => void,
): Promise<UploadedBatch | null> {
  if (files.length === 0) return null;

  for (const file of files) {
    const validationError = validateUploadCandidate(file);
    if (validationError) throw new Error(validationError);
  }

  onStatus?.("Preparing secure upload…");
  const sessionResponse = await fetch("/api/uploads/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ purpose, fileCount: files.length }),
  });
  const sessionResult = await sessionResponse.json() as UploadSessionCredentials & { message?: string };
  if (!sessionResponse.ok || !sessionResult.id || !sessionResult.secret) {
    throw new Error(sessionResult.message || "The secure upload could not be started.");
  }

  const uploadSession = { id: sessionResult.id, secret: sessionResult.secret };
  const attachments: UploadedAttachmentInput[] = [];

  for (const [slot, file] of files.entries()) {
    onStatus?.(`Uploading ${slot + 1} of ${files.length}: ${file.name}`);
    const pathname = buildUploadPath(purpose, uploadSession.id, slot, file.name);
    const blob = await upload(pathname, file, {
      access: "private",
      handleUploadUrl: "/api/uploads",
      contentType: file.type,
      multipart: file.size > 5 * 1024 * 1024,
      clientPayload: JSON.stringify({
        sessionId: uploadSession.id,
        secret: uploadSession.secret,
        purpose,
        slot,
        originalName: file.name,
        contentType: file.type,
        fileSize: file.size,
      }),
    });
    attachments.push({ pathname: blob.pathname, originalName: file.name });
  }

  return { attachments, uploadSession };
}
