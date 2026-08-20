import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { Resend } from "resend";

import { createAttachmentDownloadUrl } from "@/lib/attachment-download";
import { intakeSchema } from "@/lib/intake-schema";
import { prisma } from "@/lib/prisma";
import { UploadValidationError, verifyUploadedAttachments } from "@/lib/upload-server";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function referenceLinksHtml(links: string[]) {
  if (links.length === 0) return "<p>None supplied</p>";
  return `<ul>${links.map((link) => `<li><a href="${escapeHtml(link)}">${escapeHtml(link)}</a></li>`).join("")}</ul>`;
}

function attachmentLinksHtml(attachments: Array<{ id: string; originalName: string; size: number }>) {
  if (attachments.length === 0) return "<p>None supplied</p>";
  return `<ul>${attachments.map((attachment) => {
    const downloadUrl = createAttachmentDownloadUrl(attachment.id);
    const size = `${(attachment.size / (1024 * 1024)).toFixed(1)} MB`;
    return downloadUrl
      ? `<li><a href="${escapeHtml(downloadUrl)}">${escapeHtml(attachment.originalName)}</a> (${size}) · link expires in 7 days</li>`
      : `<li>${escapeHtml(attachment.originalName)} (${size}) · available in private Blob storage</li>`;
  }).join("")}</ul>`;
}

export async function POST(request: Request) {
  try {
    const parsed = intakeSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ message: "Please complete the required details, goals, budget and consent." }, { status: 400 });
    }

    const data = parsed.data;
    const verifiedUploads = await verifyUploadedAttachments("intake", data.uploadSession, data.attachments);
    const briefPayload = Object.fromEntries(
      Object.entries(data).filter(([key]) => key !== "attachments" && key !== "uploadSession"),
    ) as Prisma.InputJsonObject;
    const reference = `TA-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
    const intakeData = {
        reference,
        fullName: data.fullName,
        businessName: data.businessName,
        email: data.email,
        phone: data.phone || null,
        role: data.role || null,
        industry: data.industry || null,
        location: data.location || null,
        currentWebsite: data.currentWebsite || null,
        projectType: data.projectType,
        primaryGoal: data.primaryGoal,
        budget: data.budget,
        timeline: data.timeline,
        referenceLinks: data.referenceLinks,
        payload: briefPayload,
        consent: data.consent,
    };

    const intake = verifiedUploads.sessionId
      ? await prisma.$transaction(async (transaction) => {
        const claimed = await transaction.uploadSession.updateMany({
          where: { id: verifiedUploads.sessionId!, consumedAt: null, expiresAt: { gt: new Date() } },
          data: { consumedAt: new Date() },
        });
        if (claimed.count !== 1) throw new UploadValidationError("The attachment session was already used. Please upload the files again.");

        const created = await transaction.websiteIntake.create({ data: intakeData });
        await transaction.uploadAttachment.createMany({
          data: verifiedUploads.attachments.map((attachment) => ({ ...attachment, websiteIntakeId: created.id })),
        });
        return created;
      })
      : await prisma.websiteIntake.create({ data: intakeData });

    const storedAttachments = await prisma.uploadAttachment.findMany({
      where: { websiteIntakeId: intake.id },
      select: { id: true, originalName: true, size: true },
      orderBy: { createdAt: "asc" },
    });

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (apiKey && toEmail && fromEmail) {
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: data.email,
        subject: `New website brief ${reference}: ${data.businessName}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#171717;line-height:1.6;max-width:680px;margin:auto">
            <p style="color:#667085;font-size:12px;letter-spacing:.08em">THE TECH ALCHEMY LAB · WEBSITE INTAKE</p>
            <h1 style="font-size:25px;margin:8px 0 4px">${escapeHtml(data.businessName)}</h1>
            <p style="color:#667085;margin-top:0">Reference ${escapeHtml(reference)}</p>
            <hr style="border:0;border-top:1px solid #ddd;margin:24px 0" />
            <p><strong>Contact:</strong> ${escapeHtml(data.fullName)} · ${escapeHtml(data.email)} · ${escapeHtml(data.phone || "No phone supplied")}</p>
            <p><strong>Project:</strong> ${escapeHtml(data.projectType)}</p>
            <p><strong>Primary goal:</strong> ${escapeHtml(data.primaryGoal)}</p>
            <p><strong>Budget:</strong> ${escapeHtml(data.budget)}</p>
            <p><strong>Timeline:</strong> ${escapeHtml(data.timeline)}</p>
            <p><strong>Industry:</strong> ${escapeHtml(data.industry || "Not supplied")}</p>
            <p><strong>Pages:</strong> ${escapeHtml(data.pages.join(", ") || "Not supplied")}</p>
            <p><strong>Features:</strong> ${escapeHtml(data.features.join(", ") || "Not supplied")}</p>
            <h2 style="font-size:17px;margin-top:26px">Reference links</h2>
            ${referenceLinksHtml(data.referenceLinks)}
            <h2 style="font-size:17px;margin-top:26px">Private attachments</h2>
            ${attachmentLinksHtml(storedAttachments)}
            <h2 style="font-size:17px;margin-top:26px">What the project must solve</h2>
            <p style="white-space:pre-wrap">${escapeHtml(data.projectSummary || "Not supplied")}</p>
            <h2 style="font-size:17px;margin-top:26px">Business summary</h2>
            <p style="white-space:pre-wrap">${escapeHtml(data.businessDescription || "Not supplied")}</p>
            <p style="color:#667085;font-size:12px;margin-top:30px">Stored intake ID: ${escapeHtml(intake.id)}</p>
          </div>
        `,
      });

      await prisma.websiteIntake.update({
        where: { id: intake.id },
        data: result.error
          ? { emailStatus: "FAILED" }
          : { emailStatus: "SENT", resendEmailId: result.data?.id },
      });
    } else {
      await prisma.websiteIntake.update({ where: { id: intake.id }, data: { emailStatus: "FAILED" } });
    }

    return NextResponse.json({ message: "Your website brief has been received.", reference }, { status: 201 });
  } catch (error) {
    console.error("Website intake submission failed", error);
    if (error instanceof UploadValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "We could not save your brief right now. Please try again." }, { status: 500 });
  }
}
