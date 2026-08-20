import { createHmac, timingSafeEqual } from "node:crypto";

const DOWNLOAD_WINDOW_SECONDS = 7 * 24 * 60 * 60;

function signingSecret() {
  return process.env.ATTACHMENT_DOWNLOAD_SECRET;
}
function signature(attachmentId: string, expires: number, secret: string) {
  return createHmac("sha256", secret).update(`${attachmentId}:${expires}`).digest("base64url");
}

export function createAttachmentDownloadUrl(attachmentId: string) {
  const secret = signingSecret();
  if (!secret) return null;

  const expires = Math.floor(Date.now() / 1000) + DOWNLOAD_WINDOW_SECONDS;
  const token = signature(attachmentId, expires, secret);
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://the-tech-alchemy-lab.vercel.app").replace(/\/$/, "");
  return `${siteUrl}/api/attachments/${encodeURIComponent(attachmentId)}?expires=${expires}&token=${encodeURIComponent(token)}`;
}

export function verifyAttachmentDownloadToken(attachmentId: string, expiresValue: string | null, token: string | null) {
  const secret = signingSecret();
  const expires = Number(expiresValue);
  if (!secret || !token || !Number.isInteger(expires) || expires <= Math.floor(Date.now() / 1000)) return false;

  const expected = Buffer.from(signature(attachmentId, expires, secret));
  const actual = Buffer.from(token);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
