import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "The Tech Alchemy Lab — Turning code into digital gold";
export const size = socialImageSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return createSocialImage();
}
