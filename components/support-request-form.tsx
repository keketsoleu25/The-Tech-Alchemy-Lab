"use client";

import { FormEvent, useState } from "react";

import { AttachmentUploadField } from "@/components/attachment-upload-field";
import { ReferenceLinksField } from "@/components/reference-links-field";
import { uploadSelectedFiles, type UploadedBatch } from "@/lib/upload-client";

type Status = { type: "idle" | "success" | "error"; message: string; reference?: string };

export function SupportRequestForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [referenceLinks, setReferenceLinks] = useState<string[]>([]);
  const [uploadedBatch, setUploadedBatch] = useState<UploadedBatch | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  function updateFiles(nextFiles: File[]) {
    setFiles(nextFiles);
    setUploadedBatch(null);
    setUploadStatus("");
    setStatus({ type: "idle", message: "" });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitting(true); setStatus({ type: "idle", message: "" });
    try {
      let batch = uploadedBatch;
      if (files.length > 0 && !batch) {
        batch = await uploadSelectedFiles("support", files, setUploadStatus);
        setUploadedBatch(batch);
      }
      setUploadStatus("Saving your support request…");
      const payload = {
        ...Object.fromEntries(formData.entries()),
        consent: formData.get("consent") === "on",
        referenceLinks: referenceLinks.map((link) => link.trim()).filter(Boolean),
        attachments: batch?.attachments ?? [],
        uploadSession: batch?.uploadSession ?? null,
      };
      const response = await fetch("/api/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json() as { message?: string; reference?: string };
      if (!response.ok || !result.reference) throw new Error(result.message || "Your request could not be logged.");
      form.reset();
      setFiles([]);
      setReferenceLinks([]);
      setUploadedBatch(null);
      setUploadStatus("");
      setStatus({ type: "success", message: result.message || "Your request has been logged.", reference: result.reference });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Your request could not be logged." });
    } finally { setSubmitting(false); }
  }

  return (
    <form className="support-form" onSubmit={submit}>
      <div className="form-heading"><span>Existing client support / 2026</span><i aria-hidden="true" /></div>
      <div className="support-form-grid">
        <label>Full name <em>Required</em><input name="clientName" autoComplete="name" minLength={2} maxLength={120} required /></label>
        <label>Business name <em>Required</em><input name="businessName" autoComplete="organization" minLength={2} maxLength={160} required /></label>
        <label>Email address <em>Required</em><input name="email" type="email" autoComplete="email" maxLength={180} required /></label>
        <label>Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
        <label>Project or website name<input name="projectName" maxLength={160} /></label>
        <label>Affected page URL<input name="affectedUrl" type="url" maxLength={500} placeholder="https://" /></label>
        <label>Request type <em>Required</em><select name="requestType" defaultValue="" required><option value="" disabled>Select request type</option><option value="website">Website issue</option><option value="content">Content update</option><option value="email">Email or form issue</option><option value="domain">Domain or hosting</option><option value="billing">Billing or invoice</option><option value="access">Account or access</option><option value="other">Other support</option></select></label>
        <label>Priority <em>Required</em><select name="priority" defaultValue="normal" required><option value="normal">Normal — routine request</option><option value="high">High — business is affected</option><option value="urgent">Urgent — service unavailable</option></select></label>
        <label className="full">Short subject <em>Required</em><input name="subject" minLength={4} maxLength={180} required placeholder="e.g. Contact form is not delivering emails" /></label>
        <label className="full">What happened, and what did you expect? <em>Required</em><textarea name="description" minLength={20} maxLength={5000} rows={7} required placeholder="Include the steps, any error message and when you first noticed the issue." /></label>
        <div className="full"><ReferenceLinksField links={referenceLinks} onChange={setReferenceLinks} disabled={submitting} title="Useful links" description="Add affected pages, shared folders or examples that will help us investigate." /></div>
        <div className="full"><AttachmentUploadField files={files} onChange={updateFiles} disabled={submitting} /></div>
        <label className="support-consent full"><input name="consent" type="checkbox" required /><span>I allow The Tech Alchemy Lab to use these details to investigate and respond to this request.</span></label>
        <label className="form-trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <button className="button button-primary form-submit" disabled={submitting} type="submit">{submitting ? (uploadStatus || "Logging request…") : "Log support request"}<span aria-hidden="true">↗</span></button>
      <div className={`support-status ${status.type}`} role="status" aria-live="polite">{status.message}{status.reference ? <strong>{status.reference}</strong> : null}</div>
    </form>
  );
}
