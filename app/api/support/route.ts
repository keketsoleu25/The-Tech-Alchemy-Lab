import { NextResponse } from "next/server";
import { Resend } from "resend";

import { createAttachmentDownloadUrl } from "@/lib/attachment-download";
import { prisma } from "@/lib/prisma";
import { supportSchema } from "@/lib/support-schema";
import { UploadValidationError, verifyUploadedAttachments } from "@/lib/upload-server";

export const runtime = "nodejs";

const requestLabels: Record<string, string> = {
  website: "Website issue",
  content: "Content update",
  email: "Email or form issue",
  domain: "Domain or hosting",
  billing: "Billing or invoice",
  access: "Account or access",
  other: "Other support",
};

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
    const parsed = supportSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ message: "Please check the required support details and try again." }, { status: 400 });
    }

    const data = parsed.data;
    const verifiedUploads = await verifyUploadedAttachments("support", data.uploadSession, data.attachments);
    const reference = `SUP-${crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
    const supportData = {
        reference,
        clientName: data.clientName,
        businessName: data.businessName,
        email: data.email,
        phone: data.phone || null,
        projectName: data.projectName || null,
        requestType: data.requestType,
        priority: data.priority,
        subject: data.subject,
        description: data.description,
        affectedUrl: data.affectedUrl || null,
        referenceLinks: data.referenceLinks,
        consent: data.consent,
    };

    const supportRequest = verifiedUploads.sessionId
      ? await prisma.$transaction(async (transaction) => {
        const claimed = await transaction.uploadSession.updateMany({
          where: { id: verifiedUploads.sessionId!, consumedAt: null, expiresAt: { gt: new Date() } },
          data: { consumedAt: new Date() },
        });
        if (claimed.count !== 1) throw new UploadValidationError("The attachment session was already used. Please upload the files again.");

        const created = await transaction.supportRequest.create({ data: supportData });
        await transaction.uploadAttachment.createMany({
          data: verifiedUploads.attachments.map((attachment) => ({ ...attachment, supportRequestId: created.id })),
        });
        return created;
      })
      : await prisma.supportRequest.create({ data: supportData });

    const storedAttachments = await prisma.uploadAttachment.findMany({
      where: { supportRequestId: supportRequest.id },
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
        subject: `[${data.priority.toUpperCase()}] ${reference}: ${data.subject}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#171717;line-height:1.6;max-width:680px;margin:auto">
            <p style="color:#667085;font-size:12px;letter-spacing:.08em">THE TECH ALCHEMY LAB · CLIENT SUPPORT</p>
            <h1 style="font-size:24px;margin:8px 0 4px">${escapeHtml(data.subject)}</h1>
            <p style="color:#667085;margin-top:0">Reference ${escapeHtml(reference)}</p>
            <hr style="border:0;border-top:1px solid #ddd;margin:24px 0" />
            <p><strong>Client:</strong> ${escapeHtml(data.clientName)} · ${escapeHtml(data.businessName)}</p>
            <p><strong>Contact:</strong> ${escapeHtml(data.email)} · ${escapeHtml(data.phone || "No phone supplied")}</p>
            <p><strong>Request type:</strong> ${escapeHtml(requestLabels[data.requestType])}</p>
            <p><strong>Priority:</strong> ${escapeHtml(data.priority.toUpperCase())}</p>
            <p><strong>Project:</strong> ${escapeHtml(data.projectName || "Not supplied")}</p>
            <p><strong>Affected URL:</strong> ${escapeHtml(data.affectedUrl || "Not supplied")}</p>
            <h2 style="font-size:17px;margin-top:26px">Reference links</h2>
            ${referenceLinksHtml(data.referenceLinks)}
            <h2 style="font-size:17px;margin-top:26px">Private attachments</h2>
            ${attachmentLinksHtml(storedAttachments)}
            <h2 style="font-size:17px;margin-top:26px">Request details</h2>
            <p style="white-space:pre-wrap">${escapeHtml(data.description)}</p>
            <p style="color:#667085;font-size:12px;margin-top:30px">Stored support ID: ${escapeHtml(supportRequest.id)}</p>
          </div>
        `,
      });

      await prisma.supportRequest.update({
        where: { id: supportRequest.id },
        data: result.error
          ? { emailStatus: "FAILED" }
          : { emailStatus: "SENT", resendEmailId: result.data?.id },
      });
    } else {
      await prisma.supportRequest.update({ where: { id: supportRequest.id }, data: { emailStatus: "FAILED" } });
    }

    return NextResponse.json({ message: "Your support request has been logged.", reference }, { status: 201 });
  } catch (error) {
    console.error("Support submission failed", error);
    if (error instanceof UploadValidationError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "We could not log your request right now. Please try again." }, { status: 500 });
  }
}
