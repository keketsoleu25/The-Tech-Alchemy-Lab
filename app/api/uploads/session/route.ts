import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { createRequestKeyHash, createUploadSecret, hashUploadSecret } from "@/lib/upload-server";
import { MAX_UPLOAD_FILES, UPLOAD_SESSION_MINUTES, uploadPurposeSchema } from "@/lib/upload-config";

export const runtime = "nodejs";

const requestSchema = z.object({
  purpose: uploadPurposeSchema,
  fileCount: z.number().int().min(1).max(MAX_UPLOAD_FILES),
});

export async function POST(request: Request) {
  try {
    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ message: "Choose between one and five supported files." }, { status: 400 });
    }

    const requestKeyHash = createRequestKeyHash(request);
    if (requestKeyHash) {
      const recentSessions = await prisma.uploadSession.count({
        where: {
          requestKeyHash,
          createdAt: { gt: new Date(Date.now() - 60 * 60 * 1000) },
        },
      });
      if (recentSessions >= 10) {
        return NextResponse.json({ message: "Too many upload attempts. Please try again later." }, { status: 429 });
      }
    }

    const secret = createUploadSecret();
    const session = await prisma.uploadSession.create({
      data: {
        secretHash: hashUploadSecret(secret),
        purpose: parsed.data.purpose,
        maxFiles: parsed.data.fileCount,
        requestKeyHash,
        expiresAt: new Date(Date.now() + UPLOAD_SESSION_MINUTES * 60 * 1000),
      },
      select: { id: true },
    });

    return NextResponse.json({ id: session.id, secret }, { status: 201 });
  } catch (error) {
    console.error("Upload session creation failed", error);
    return NextResponse.json({ message: "The secure upload could not be started." }, { status: 500 });
  }
}
