import assert from "node:assert/strict";
import test from "node:test";

import {
  matchesAllowedFileSignature,
  MAX_UPLOAD_SIZE_BYTES,
  referenceLinksSchema,
  sanitizeUploadName,
  uploadSubmissionSchema,
  validateUploadCandidate,
} from "../lib/upload-config.ts";

test("accepts supported files whose extension and MIME type agree", () => {
  assert.equal(validateUploadCandidate({ name: "brand-guide.pdf", type: "application/pdf", size: 2048 }), null);
  assert.equal(validateUploadCandidate({ name: "homepage.png", type: "image/png", size: 4096 }), null);
});
test("rejects executable, spoofed, empty and oversized files", () => {
  assert.match(validateUploadCandidate({ name: "setup.exe", type: "application/x-msdownload", size: 2048 }) || "", /not a supported/i);
  assert.match(validateUploadCandidate({ name: "photo.pdf", type: "image/jpeg", size: 2048 }) || "", /does not match/i);
  assert.match(validateUploadCandidate({ name: "empty.pdf", type: "application/pdf", size: 0 }) || "", /empty/i);
  assert.match(validateUploadCandidate({ name: "large.pdf", type: "application/pdf", size: MAX_UPLOAD_SIZE_BYTES + 1 }) || "", /larger than 10 MB/i);
});

test("checks common file signatures instead of trusting the filename alone", () => {
  assert.equal(matchesAllowedFileSignature("application/pdf", new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d])), true);
  assert.equal(matchesAllowedFileSignature("application/pdf", new Uint8Array([0x4d, 0x5a, 0x90, 0x00])), false);
  assert.equal(matchesAllowedFileSignature("image/png", new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])), true);
});

test("sanitizes upload names and strips directory traversal", () => {
  assert.equal(sanitizeUploadName("../../Client Logo (final).png"), "Client-Logo-final-.png");
  assert.equal(sanitizeUploadName("C:\\fakepath\\brief.pdf"), "brief.pdf");
});

test("accepts only http and https reference links", () => {
  assert.equal(referenceLinksSchema.safeParse(["https://drive.google.com/example", "http://example.test/mockup"]).success, true);
  assert.equal(referenceLinksSchema.safeParse(["javascript:alert(1)"]).success, false);
  assert.equal(referenceLinksSchema.safeParse(["not-a-link"]).success, false);
});

test("requires an upload session whenever attachments are submitted", () => {
  const attachment = { pathname: "client-uploads/intake/session/file.pdf", originalName: "file.pdf" };
  assert.equal(uploadSubmissionSchema.safeParse({ attachments: [attachment], uploadSession: null }).success, false);
  assert.equal(uploadSubmissionSchema.safeParse({
    attachments: [attachment],
    uploadSession: { id: "session-123456789", secret: "x".repeat(43) },
  }).success, true);
});
