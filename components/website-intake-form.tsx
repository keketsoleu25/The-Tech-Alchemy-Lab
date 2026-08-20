"use client";

import { useEffect, useState } from "react";

import { AttachmentUploadField } from "@/components/attachment-upload-field";
import { ReferenceLinksField } from "@/components/reference-links-field";
import { uploadSelectedFiles, type UploadedBatch } from "@/lib/upload-client";

type IntakeData = {
  fullName: string; businessName: string; email: string; phone: string; role: string;
  industry: string; location: string; businessDescription: string; idealCustomer: string;
  currentWebsite: string; projectType: string; primaryGoal: string; projectSummary: string;
  successLooksLike: string; competitors: string; pages: string[]; contentStatus: string;
  assets: string[]; contentNotes: string; style: string[]; colourNotes: string; references: string;
  avoid: string; features: string[]; featureNotes: string; budget: string; timeline: string;
  targetDate: string; maintenance: string; consent: boolean; website: string;
  referenceLinks: string[];
};

const steps = ["Your details", "The business", "Project goals", "Content", "Style & features", "Budget & timing", "Review"];
const initialData: IntakeData = {
  fullName: "", businessName: "", email: "", phone: "", role: "", industry: "", location: "",
  businessDescription: "", idealCustomer: "", currentWebsite: "", projectType: "", primaryGoal: "",
  projectSummary: "", successLooksLike: "", competitors: "", pages: ["Home", "About", "Contact"],
  contentStatus: "", assets: [], contentNotes: "", style: [], colourNotes: "", references: "", avoid: "",
  features: [], featureNotes: "", budget: "", timeline: "", targetDate: "", maintenance: "", consent: false,
  website: "", referenceLinks: [],
};

function Option({ selected, title, detail, onClick }: { selected: boolean; title: string; detail?: string; onClick: () => void }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick} className={`portal-option ${selected ? "is-selected" : ""}`}>
      <span className="portal-check" aria-hidden="true">{selected ? "✓" : ""}</span>
      <span><strong>{title}</strong>{detail ? <small>{detail}</small> : null}</span>
    </button>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="portal-summary-row"><dt>{label}</dt><dd>{value || "Not provided"}</dd></div>;
}

export function WebsiteIntakeForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<IntakeData>(initialData);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedBatch, setUploadedBatch] = useState<UploadedBatch | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem("tal-website-intake-draft");
        if (saved) setData({ ...initialData, ...JSON.parse(saved) });
      } catch { /* Ignore an invalid device draft. */ }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ready && !reference) window.localStorage.setItem("tal-website-intake-draft", JSON.stringify(data));
  }, [data, ready, reference]);

  function update<K extends keyof IntakeData>(key: K, value: IntakeData[K]) {
    setData((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function toggle(key: "pages" | "assets" | "style" | "features", value: string) {
    const values = data[key];
    update(key, values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  }

  function updateFiles(nextFiles: File[]) {
    setFiles(nextFiles);
    setUploadedBatch(null);
    setUploadStatus("");
    setError("");
  }

  function goTo(next: number) {
    setStep(Math.max(0, Math.min(steps.length - 1, next)));
    setError("");
    document.getElementById("intake-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function continueForm() {
    if (step === 0 && (!data.fullName.trim() || !data.businessName.trim() || !data.email.trim())) {
      setError("Add your name, business name and email address before continuing."); return;
    }
    if (step === 2 && (!data.projectType || !data.primaryGoal)) {
      setError("Choose a project type and primary business goal."); return;
    }
    if (step === 5 && (!data.budget || !data.timeline)) {
      setError("Choose a working budget and timeline."); return;
    }
    goTo(step + 1);
  }

  async function submit() {
    if (!data.consent) { setError("Confirm that we may use these details to prepare and discuss your project."); return; }
    setSending(true); setError("");
    try {
      let batch = uploadedBatch;
      if (files.length > 0 && !batch) {
        batch = await uploadSelectedFiles("intake", files, setUploadStatus);
        setUploadedBatch(batch);
      }
      setUploadStatus("Saving your website brief…");
      const response = await fetch("/api/intakes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          referenceLinks: data.referenceLinks.map((link) => link.trim()).filter(Boolean),
          attachments: batch?.attachments ?? [],
          uploadSession: batch?.uploadSession ?? null,
        }),
      });
      const result = await response.json() as { message?: string; reference?: string };
      if (!response.ok || !result.reference) throw new Error(result.message || "Your brief could not be submitted.");
      setReference(result.reference);
      setFiles([]);
      setUploadedBatch(null);
      setUploadStatus("");
      window.localStorage.removeItem("tal-website-intake-draft");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Your brief could not be submitted.");
    } finally { setSending(false); }
  }

  if (reference) {
    return (
      <section className="portal-success" aria-live="polite">
        <span className="portal-success-mark" aria-hidden="true">✓</span>
        <p className="portal-kicker">Brief received</p>
        <h2>Good input. Strong starting point.</h2>
        <p>The Lab now has the context needed to assess your project and prepare the right next conversation.</p>
        <div className="portal-reference"><span>Your brief reference</span><strong>{reference}</strong></div>
        <div className="portal-next-steps"><span><b>01</b> Brief review</span><span><b>02</b> Scope call</span><span><b>03</b> Proposal</span></div>
        <button type="button" onClick={() => { setReference(""); setData(initialData); goTo(0); }}>Start another brief</button>
      </section>
    );
  }

  return (
    <section className="portal-form" id="intake-form" aria-labelledby="intake-step-title">
      <aside className="portal-progress" aria-label="Website brief progress">
        <p>YOUR WEBSITE BRIEF</p>
        <ol>{steps.map((label, index) => <li key={label}><button type="button" onClick={() => goTo(index)} className={index === step ? "active" : ""}><span>{index < step ? "✓" : String(index + 1).padStart(2, "0")}</span>{label}</button></li>)}</ol>
        <div><strong>Draft saved</strong><p>Your answers stay on this device until you submit.</p></div>
      </aside>

      <div className="portal-workspace">
        <div className="portal-mobile-progress"><span>Step {step + 1} of {steps.length}</span><i><b style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></i></div>
        <div className="portal-step-heading"><p className="portal-kicker">{steps[step]}</p><h2 id="intake-step-title">{[
          "Tell us who we’re building for.", "Help us understand the business.", "What must this website achieve?", "Map the story and the pages.", "Shape the experience.", "Set realistic project boundaries.", "Your website brief is ready.",
        ][step]}</h2></div>

        <div className="portal-card">
          {step === 0 && <div className="portal-fields two-column">
            <label>Full name <em>Required</em><input value={data.fullName} onChange={(e) => update("fullName", e.target.value)} autoComplete="name" placeholder="e.g. Naledi Mokoena" /></label>
            <label>Business name <em>Required</em><input value={data.businessName} onChange={(e) => update("businessName", e.target.value)} autoComplete="organization" placeholder="e.g. Naledi & Co." /></label>
            <label>Email address <em>Required</em><input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" placeholder="you@business.co.za" /></label>
            <label>WhatsApp / phone<input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" placeholder="+27 71 234 5678" /></label>
            <label className="full">Your role<select value={data.role} onChange={(e) => update("role", e.target.value)}><option value="">Select your role</option><option>Founder / owner</option><option>Manager</option><option>Marketing / communications</option><option>Project lead</option><option>Other</option></select></label>
            <label className="portal-trap" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => update("website", e.target.value)} /></label>
          </div>}

          {step === 1 && <div className="portal-fields two-column">
            <label>Industry / business type<input value={data.industry} onChange={(e) => update("industry", e.target.value)} placeholder="e.g. Training academy" /></label>
            <label>Main location or service area<input value={data.location} onChange={(e) => update("location", e.target.value)} placeholder="e.g. Johannesburg, Gauteng" /></label>
            <label className="full">What does the business do?<textarea value={data.businessDescription} onChange={(e) => update("businessDescription", e.target.value)} rows={5} placeholder="Your main services, products and what makes the business valuable." /></label>
            <label className="full">Who is your ideal customer?<textarea value={data.idealCustomer} onChange={(e) => update("idealCustomer", e.target.value)} rows={4} placeholder="Who should the website attract, and what do they care about?" /></label>
            <label className="full">Current website or social page<input value={data.currentWebsite} onChange={(e) => update("currentWebsite", e.target.value)} placeholder="https:// — leave blank if you do not have one" /></label>
          </div>}

          {step === 2 && <div className="portal-question-stack">
            <div><h3>What are we building? <em>Required</em></h3><div className="portal-options two-column">{[
              ["New business website", "A credible digital home from the ground up."], ["Website redesign", "Improve a website that is not performing."], ["Campaign / landing page", "One focused offer, launch or campaign."], ["Online store", "Products, payments and a clear buying journey."],
            ].map(([title, detail]) => <Option key={title} title={title} detail={detail} selected={data.projectType === title} onClick={() => update("projectType", title)} />)}</div></div>
            <div><h3>Primary business goal <em>Required</em></h3><div className="portal-options three-column">{["Build trust & credibility", "Generate enquiries", "Sell products online", "Get bookings", "Explain services clearly", "Support operations"].map((title) => <Option key={title} title={title} selected={data.primaryGoal === title} onClick={() => update("primaryGoal", title)} />)}</div></div>
            <div className="portal-fields"><label>What problem must this project solve?<textarea value={data.projectSummary} onChange={(e) => update("projectSummary", e.target.value)} rows={5} /></label><label>Six months after launch, what would success look like?<textarea value={data.successLooksLike} onChange={(e) => update("successLooksLike", e.target.value)} rows={4} /></label><label>Competitors or alternatives<textarea value={data.competitors} onChange={(e) => update("competitors", e.target.value)} rows={3} /></label></div>
          </div>}

          {step === 3 && <div className="portal-question-stack">
            <div><h3>Pages you expect to need</h3><div className="portal-options three-column">{["Home", "About", "Services", "Products", "Pricing", "Gallery", "Testimonials", "Blog / news", "FAQs", "Contact", "Bookings", "Apply / enrol"].map((title) => <Option key={title} title={title} selected={data.pages.includes(title)} onClick={() => toggle("pages", title)} />)}</div></div>
            <div><h3>Where is the content now?</h3><div className="portal-options two-column">{["Ready to use", "Partly ready", "Needs writing support", "Starting from zero"].map((title) => <Option key={title} title={title} selected={data.contentStatus === title} onClick={() => update("contentStatus", title)} />)}</div></div>
            <div><h3>Assets available</h3><div className="portal-options three-column">{["Logo files", "Brand guide", "Professional photos", "Product images", "Videos", "Testimonials"].map((title) => <Option key={title} title={title} selected={data.assets.includes(title)} onClick={() => toggle("assets", title)} />)}</div></div>
            <div className="portal-fields"><label>Content notes<textarea value={data.contentNotes} onChange={(e) => update("contentNotes", e.target.value)} rows={4} /></label></div>
            <ReferenceLinksField links={data.referenceLinks} onChange={(links) => update("referenceLinks", links)} disabled={sending} />
            <AttachmentUploadField files={files} onChange={updateFiles} disabled={sending} />
          </div>}

          {step === 4 && <div className="portal-question-stack">
            <div><h3>How should the brand feel?</h3><div className="portal-options three-column">{["Clean & professional", "Bold & energetic", "Warm & human", "Premium & refined", "Playful & friendly", "Modern & digital"].map((title) => <Option key={title} title={title} selected={data.style.includes(title)} onClick={() => toggle("style", title)} />)}</div></div>
            <div className="portal-fields"><label>Brand colours or preferences<input value={data.colourNotes} onChange={(e) => update("colourNotes", e.target.value)} /></label><label>Websites or brands you like<textarea value={data.references} onChange={(e) => update("references", e.target.value)} rows={3} /></label><label>What should we avoid?<textarea value={data.avoid} onChange={(e) => update("avoid", e.target.value)} rows={3} /></label></div>
            <div><h3>Useful features</h3><div className="portal-options three-column">{["Enquiry form", "WhatsApp contact", "Online booking", "Online payments", "E-commerce", "Client portal", "Applications / enrolment", "Blog / news", "Newsletter signup", "Google Maps", "Analytics & SEO", "Multiple languages"].map((title) => <Option key={title} title={title} selected={data.features.includes(title)} onClick={() => toggle("features", title)} />)}</div></div>
            <div className="portal-fields"><label>Other workflow or feature needs<textarea value={data.featureNotes} onChange={(e) => update("featureNotes", e.target.value)} rows={4} /></label></div>
          </div>}

          {step === 5 && <div className="portal-question-stack">
            <div><h3>Working budget range <em>Required</em></h3><div className="portal-options two-column">{["R5,000 – R10,000", "R10,000 – R20,000", "R20,000 – R35,000", "R35,000+", "Not sure — recommend a scope"].map((title) => <Option key={title} title={title} selected={data.budget === title} onClick={() => update("budget", title)} />)}</div></div>
            <div><h3>Ideal timeline <em>Required</em></h3><div className="portal-options two-column">{["As soon as practical", "2–4 weeks", "1–2 months", "2–3 months", "Flexible / planning ahead"].map((title) => <Option key={title} title={title} selected={data.timeline === title} onClick={() => update("timeline", title)} />)}</div></div>
            <div className="portal-fields two-column"><label>Important launch date<input type="date" value={data.targetDate} onChange={(e) => update("targetDate", e.target.value)} /></label><label>Support after launch<select value={data.maintenance} onChange={(e) => update("maintenance", e.target.value)}><option value="">Select an option</option><option>I can manage it</option><option>I want training</option><option>I need ongoing maintenance</option><option>Not sure yet</option></select></label></div>
            <p className="portal-note"><strong>How projects start:</strong> the approved proposal reserves your scope and timeline. A 50% deposit starts the work, with the balance due before final handover.</p>
          </div>}

          {step === 6 && <div className="portal-review">
            <section><div><h3>Client & business</h3><button type="button" onClick={() => goTo(0)}>Edit</button></div><dl><Summary label="Contact" value={`${data.fullName} · ${data.email}${data.phone ? ` · ${data.phone}` : ""}`} /><Summary label="Business" value={`${data.businessName}${data.industry ? ` · ${data.industry}` : ""}`} /><Summary label="Business summary" value={data.businessDescription} /></dl></section>
            <section><div><h3>Project direction</h3><button type="button" onClick={() => goTo(2)}>Edit</button></div><dl><Summary label="Project" value={data.projectType} /><Summary label="Primary goal" value={data.primaryGoal} /><Summary label="Pages" value={data.pages.join(" · ")} /><Summary label="Features" value={data.features.join(" · ")} /><Summary label="Budget & timing" value={`${data.budget} · ${data.timeline}`} /></dl></section>
            <section><div><h3>References & files</h3><button type="button" onClick={() => goTo(3)}>Edit</button></div><dl><Summary label="Links" value={data.referenceLinks.filter((link) => link.trim()).join(" · ")} /><Summary label="Files" value={files.map((file) => file.name).join(" · ")} /></dl></section>
            <label className="portal-consent"><input type="checkbox" checked={data.consent} onChange={(e) => update("consent", e.target.checked)} /><span>I confirm these details are accurate and allow The Tech Alchemy Lab to use them to prepare and discuss my project. <em>Required</em></span></label>
          </div>}

          {error ? <p className="portal-error" role="alert">{error}</p> : null}
          <div className="portal-actions"><span>{uploadStatus || (ready ? "Draft saved on this device · files stay selected until submission" : "Preparing your draft…")}</span><div>{step > 0 ? <button type="button" className="button button-secondary" disabled={sending} onClick={() => goTo(step - 1)}>← Back</button> : null}{step < steps.length - 1 ? <button type="button" className="button button-primary" onClick={continueForm}>Continue →</button> : <button type="button" className="button button-primary" disabled={sending} onClick={submit}>{sending ? "Submitting…" : "Submit website brief →"}</button>}</div></div>
        </div>
      </div>
    </section>
  );
}
