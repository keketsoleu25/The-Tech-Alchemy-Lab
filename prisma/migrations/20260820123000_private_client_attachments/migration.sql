-- AlterTable
ALTER TABLE "WebsiteIntake" ADD COLUMN "referenceLinks" JSONB;

-- AlterTable
ALTER TABLE "SupportRequest" ADD COLUMN "referenceLinks" JSONB;

-- CreateTable
CREATE TABLE "UploadSession" (
    "id" TEXT NOT NULL,
    "secretHash" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "maxFiles" INTEGER NOT NULL,
    "reservedFiles" INTEGER NOT NULL DEFAULT 0,
    "requestKeyHash" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadAttachment" (
    "id" TEXT NOT NULL,
    "uploadSessionId" TEXT NOT NULL,
    "websiteIntakeId" TEXT,
    "supportRequestId" TEXT,
    "pathname" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "downloadUrl" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UploadSession_expiresAt_idx" ON "UploadSession"("expiresAt");

-- CreateIndex
CREATE INDEX "UploadSession_purpose_consumedAt_idx" ON "UploadSession"("purpose", "consumedAt");

-- CreateIndex
CREATE INDEX "UploadSession_requestKeyHash_createdAt_idx" ON "UploadSession"("requestKeyHash", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "UploadAttachment_pathname_key" ON "UploadAttachment"("pathname");

-- CreateIndex
CREATE INDEX "UploadAttachment_uploadSessionId_idx" ON "UploadAttachment"("uploadSessionId");

-- CreateIndex
CREATE INDEX "UploadAttachment_websiteIntakeId_idx" ON "UploadAttachment"("websiteIntakeId");

-- CreateIndex
CREATE INDEX "UploadAttachment_supportRequestId_idx" ON "UploadAttachment"("supportRequestId");

-- AddForeignKey
ALTER TABLE "UploadAttachment" ADD CONSTRAINT "UploadAttachment_uploadSessionId_fkey" FOREIGN KEY ("uploadSessionId") REFERENCES "UploadSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadAttachment" ADD CONSTRAINT "UploadAttachment_websiteIntakeId_fkey" FOREIGN KEY ("websiteIntakeId") REFERENCES "WebsiteIntake"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadAttachment" ADD CONSTRAINT "UploadAttachment_supportRequestId_fkey" FOREIGN KEY ("supportRequestId") REFERENCES "SupportRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
