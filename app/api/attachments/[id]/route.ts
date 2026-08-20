import { get } from "@vercel/blob";
import { NextResponse } from "next/server";

import { verifyAttachmentDownloadToken } from "@/lib/attachment-download";
import { prisma } from "@/lib/prisma";
import { sanitizeUploadName } from "@/lib/upload-config";

export const runtime = "nodejs";

type AttachmentRouteProps = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: AttachmentRouteProps) {
  const { id } = await params;
  const url = new URL(request.url);
  if (!verifyAttachmentDownloadToken(id, url.searchParams.get("expires"), url.searchParams.get("token"))) {
    return NextResponse.json({ message: "This attachment link is invalid or has expired." }, { status: 403 });
  }

  const attachment = await prisma.uploadAttachment.findUnique({ where: { id } });
  if (!attachment) return NextResponse.json({ message: "Attachment not found." }, { status: 404 });

  try {
    const result = await get(attachment.pathname, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200) return NextResponse.json({ message: "Attachment not found." }, { status: 404 });

    const filename = sanitizeUploadName(attachment.originalName).replaceAll('"', "");
    return new Response(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType || "application/octet-stream",
        "Content-Length": String(result.blob.size),
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Private attachment download failed", error);
    return NextResponse.json({ message: "The attachment could not be downloaded." }, { status: 500 });
  }
}
