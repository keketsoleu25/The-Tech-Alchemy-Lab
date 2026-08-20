import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireActiveUploadSession, UploadValidationError } from "@/lib/upload-server";
import {
  ALLOWED_UPLOAD_MIME_TYPES,
  buildUploadPath,
  MAX_UPLOAD_SIZE_BYTES,
  uploadClientPayloadSchema,
  validateUploadCandidate,
} from "@/lib/upload-config";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json() as HandleUploadBody;
    const result = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let rawPayload: unknown;
        try {
          rawPayload = JSON.parse(clientPayload || "null");
        } catch {
          throw new UploadValidationError("The upload details are invalid.");
        }

        const parsed = uploadClientPayloadSchema.safeParse(rawPayload);
        if (!parsed.success) throw new UploadValidationError("The upload details are invalid.");

        const data = parsed.data;
        const candidateError = validateUploadCandidate({ name: data.originalName, type: data.contentType, size: data.fileSize });
        if (candidateError) throw new UploadValidationError(candidateError);

        const session = await requireActiveUploadSession({ id: data.sessionId, secret: data.secret }, data.purpose);
        if (pathname !== buildUploadPath(data.purpose, session.id, data.slot, data.originalName)) {
          throw new UploadValidationError("The upload destination is invalid.");
        }

        const reservation = await prisma.uploadSession.updateMany({
          where: {
            id: session.id,
            consumedAt: null,
            expiresAt: { gt: new Date() },
            reservedFiles: { lt: session.maxFiles },
          },
          data: { reservedFiles: { increment: 1 } },
        });
        if (reservation.count !== 1) throw new UploadValidationError("This upload session has no file slots remaining.");

        return {
          allowedContentTypes: ALLOWED_UPLOAD_MIME_TYPES,
          maximumSizeInBytes: MAX_UPLOAD_SIZE_BYTES,
          validUntil: session.expiresAt.getTime(),
          addRandomSuffix: true,
          allowOverwrite: false,
        };
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Private attachment upload failed", error);
    const message = error instanceof UploadValidationError ? error.message : "The file could not be uploaded securely.";
    return NextResponse.json({ message }, { status: error instanceof UploadValidationError ? 400 : 500 });
  }
}
