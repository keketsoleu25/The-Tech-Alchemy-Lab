import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema } from "@/lib/contact-schema";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const serviceLabels: Record<string, string> = {
  website: "Website / web application",
  ecommerce: "E-commerce store",
  branding: "Brand identity and design",
  mobile: "Mobile product",
  strategy: "Digital strategy and SEO",
  retainer: "Monthly retainer",
  other: "Other / not sure yet",
};

const budgetLabels: Record<string, string> = {
  "under-10k": "Under R10,000",
  "10k-25k": "R10,000 – R25,000",
  "25k-50k": "R25,000 – R50,000",
  "50k-100k": "R50,000 – R100,000",
  "100k-plus": "R100,000+",
  "not-sure": "Not sure yet",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Please check the highlighted fields and try again." },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const inquiry = await prisma.inquiry.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        service: data.service,
        budget: data.budget,
        message: data.message,
      },
    });

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      await prisma.inquiry.update({
        where: { id: inquiry.id },
        data: { emailStatus: "FAILED" },
      });

      return NextResponse.json(
        { message: "Your enquiry was saved, but email delivery is not configured yet." },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const fullName = `${data.firstName} ${data.lastName}`;
    const emailResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email,
      subject: `New Tech Alchemy enquiry: ${serviceLabels[data.service]}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#171717;line-height:1.6;max-width:640px;margin:auto">
          <h1 style="font-size:24px">New website enquiry</h1>
          <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(data.phone || "Not supplied")}</p>
          <p><strong>Service:</strong> ${escapeHtml(serviceLabels[data.service])}</p>
          <p><strong>Budget:</strong> ${escapeHtml(budgetLabels[data.budget])}</p>
          <hr style="border:0;border-top:1px solid #ddd;margin:24px 0" />
          <p><strong>Project description</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
          <p style="color:#666;font-size:12px;margin-top:28px">Stored enquiry ID: ${inquiry.id}</p>
        </div>
      `,
    });

    if (emailResult.error) {
      await prisma.inquiry.update({ where: { id: inquiry.id }, data: { emailStatus: "FAILED" } });
      return NextResponse.json(
        { message: "Your enquiry was saved, but the notification email could not be sent." },
        { status: 502 },
      );
    }

    await prisma.inquiry.update({
      where: { id: inquiry.id },
      data: { emailStatus: "SENT", resendEmailId: emailResult.data?.id },
    });

    return NextResponse.json({ message: "Your enquiry has been sent successfully." });
  } catch (error) {
    console.error("Contact submission failed", error);
    return NextResponse.json(
      { message: "We could not submit your enquiry right now. Please try again shortly." },
      { status: 500 },
    );
  }
}
