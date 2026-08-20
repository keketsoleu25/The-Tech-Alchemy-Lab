CREATE TABLE "WebsiteIntake" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT,
    "industry" TEXT,
    "location" TEXT,
    "currentWebsite" TEXT,
    "projectType" TEXT NOT NULL,
    "primaryGoal" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "consent" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "emailStatus" "EmailDeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "resendEmailId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebsiteIntake_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SupportRequest" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "projectName" TEXT,
    "requestType" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "affectedUrl" TEXT,
    "consent" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "emailStatus" "EmailDeliveryStatus" NOT NULL DEFAULT 'PENDING',
    "resendEmailId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportRequest_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WebsiteIntake_reference_key" ON "WebsiteIntake"("reference");
CREATE INDEX "WebsiteIntake_email_idx" ON "WebsiteIntake"("email");
CREATE INDEX "WebsiteIntake_createdAt_idx" ON "WebsiteIntake"("createdAt");
CREATE INDEX "WebsiteIntake_status_idx" ON "WebsiteIntake"("status");

CREATE UNIQUE INDEX "SupportRequest_reference_key" ON "SupportRequest"("reference");
CREATE INDEX "SupportRequest_email_idx" ON "SupportRequest"("email");
CREATE INDEX "SupportRequest_createdAt_idx" ON "SupportRequest"("createdAt");
CREATE INDEX "SupportRequest_priority_idx" ON "SupportRequest"("priority");
CREATE INDEX "SupportRequest_status_idx" ON "SupportRequest"("status");
