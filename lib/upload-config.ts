import { z } from "zod";

export const MAX_UPLOAD_FILES = 5;
export const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;
export const UPLOAD_SESSION_MINUTES = 30;

export const uploadPurposeSchema = z.enum(["intake", "support"]);
export type UploadPurpose = z.infer<typeof uploadPurposeSchema>;

export const ALLOWED_UPLOAD_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
  "application/vnd.ms-powerpoint": [".ppt"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
  "text/plain": [".txt"],
  "text/csv": [".csv"],
} as const;

export const ALLOWED_UPLOAD_MIME_TYPES = Object.keys(ALLOWED_UPLOAD_TYPES);
export const FILE_INPUT_ACCEPT = Object.values(ALLOWED_UPLOAD_TYPES).flat().join(",");

export type UploadCandidate = {
  name: string;
  type: string;
  size: number;
};

export function sanitizeUploadName(name: string) {
  const leaf = name.split(/[\\/]/).pop() || "attachment";
  const cleaned = leaf
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^\.+/, "")
    .replace(/-+/g, "-")
    .slice(0, 120);

  return cleaned || "attachment";
}
export function buildUploadPath(purpose: UploadPurpose, sessionId: string, slot: number, name: string) {
  return `client-uploads/${purpose}/${sessionId}/${String(slot + 1).padStart(2, "0")}-${sanitizeUploadName(name)}`;
}

export function uploadPathPrefix(purpose: UploadPurpose, sessionId: string) {
  return `client-uploads/${purpose}/${sessionId}/`;
}

export function validateUploadCandidate(file: UploadCandidate) {
  if (!Number.isInteger(file.size) || file.size <= 0) return "Empty files cannot be uploaded.";
  if (file.size > MAX_UPLOAD_SIZE_BYTES) return `${file.name} is larger than 10 MB.`;

  const extensions = ALLOWED_UPLOAD_TYPES[file.type as keyof typeof ALLOWED_UPLOAD_TYPES];
  if (!extensions) return `${file.name} is not a supported document or image type.`;

  const lowerName = file.name.toLowerCase();
  if (!extensions.some((extension) => lowerName.endsWith(extension))) {
    return `${file.name} does not match its declared file type.`;
  }

  return null;
}

function startsWith(bytes: Uint8Array, signature: number[]) {
  return signature.every((byte, index) => bytes[index] === byte);
}

export function matchesAllowedFileSignature(contentType: string, bytes: Uint8Array) {
  if (contentType === "application/pdf") return startsWith(bytes, [0x25, 0x50, 0x44, 0x46]);
  if (contentType === "image/jpeg") return startsWith(bytes, [0xff, 0xd8, 0xff]);
  if (contentType === "image/png") return startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (contentType === "image/webp") {
    return startsWith(bytes, [0x52, 0x49, 0x46, 0x46])
      && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50;
  }

  const zipOfficeTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];
  if (zipOfficeTypes.includes(contentType)) {
    return startsWith(bytes, [0x50, 0x4b, 0x03, 0x04])
      || startsWith(bytes, [0x50, 0x4b, 0x05, 0x06])
      || startsWith(bytes, [0x50, 0x4b, 0x07, 0x08]);
  }

  const legacyOfficeTypes = [
    "application/msword",
    "application/vnd.ms-excel",
    "application/vnd.ms-powerpoint",
  ];
  if (legacyOfficeTypes.includes(contentType)) {
    return startsWith(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
  }

  if (contentType === "text/plain" || contentType === "text/csv") {
    return !bytes.slice(0, 1024).includes(0);
  }

  return false;
}

function isWebUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export const webUrlSchema = z.string().trim().max(500).refine(isWebUrl, "Use a complete http:// or https:// link.");
export const optionalWebUrlSchema = z.union([z.literal(""), webUrlSchema]).optional();
export const referenceLinksSchema = z.array(webUrlSchema).max(10).default([]);

export const uploadedAttachmentInputSchema = z.object({
  pathname: z.string().trim().min(10).max(600),
  originalName: z.string().trim().min(1).max(180),
});

export const uploadSessionCredentialsSchema = z.object({
  id: z.string().trim().min(10).max(80),
  secret: z.string().trim().min(32).max(200),
});

export const uploadSubmissionSchema = z.object({
  attachments: z.array(uploadedAttachmentInputSchema).max(MAX_UPLOAD_FILES).default([]),
  uploadSession: uploadSessionCredentialsSchema.nullable().optional(),
}).superRefine((value, context) => {
  if (value.attachments.length > 0 && !value.uploadSession) {
    context.addIssue({ code: "custom", message: "An upload session is required for attachments.", path: ["uploadSession"] });
  }
  if (value.attachments.length === 0 && value.uploadSession) {
    context.addIssue({ code: "custom", message: "An upload session cannot be submitted without attachments.", path: ["uploadSession"] });
  }
});

export const uploadClientPayloadSchema = z.object({
  sessionId: z.string().trim().min(10).max(80),
  secret: z.string().trim().min(32).max(200),
  purpose: uploadPurposeSchema,
  slot: z.number().int().min(0).max(MAX_UPLOAD_FILES - 1),
  originalName: z.string().trim().min(1).max(180),
  contentType: z.string().trim().min(3).max(180),
  fileSize: z.number().int().positive().max(MAX_UPLOAD_SIZE_BYTES),
});

export type UploadedAttachmentInput = z.infer<typeof uploadedAttachmentInputSchema>;
export type UploadSessionCredentials = z.infer<typeof uploadSessionCredentialsSchema>;
