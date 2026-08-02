"use client";

import { FormEvent, useState } from "react";

type FormStatus = { type: "idle" | "success" | "error"; message: string };

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Your enquiry could not be submitted.");
      }

      form.reset();
      setStatus({ type: "success", message: result.message || "Your enquiry has been sent." });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Your enquiry could not be submitted.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-aura" aria-hidden="true" />
      <div className="shell contact-grid">
        <div className="contact-copy">
          <p className="eyebrow"><span aria-hidden="true" />Start a transformation</p>
          <h2 id="contact-title">Let’s forge something<strong>worth remembering.</strong></h2>
          <p>
            Tell me what you are building, where the business is stuck and what a successful
            result would look like. I respond within 24 business hours.
          </p>

          <div className="contact-details">
            <a href="mailto:techalchemist407@gmail.com"><span>Email</span><strong>techalchemist407@gmail.com</strong></a>
            <a href="https://wa.me/27692602709?text=Hello%20Tech%20Alchemy%20Lab%2C%20I%20am%20interested%20in%20your%20services" target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>+27 69 260 2709</strong></a>
            <div><span>Based in</span><strong>Johannesburg, South Africa</strong></div>
            <div><span>Working hours</span><strong>Monday–Friday · 08:00–17:00</strong></div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <span>Project enquiry / 2026</span>
            <i aria-hidden="true" />
          </div>

          <div className="form-grid">
            <label>
              <span>First name</span>
              <input name="firstName" type="text" autoComplete="given-name" minLength={2} maxLength={60} required />
            </label>
            <label>
              <span>Last name</span>
              <input name="lastName" type="text" autoComplete="family-name" minLength={2} maxLength={60} required />
            </label>
            <label className="form-wide">
              <span>Email address</span>
              <input name="email" type="email" autoComplete="email" maxLength={160} required />
            </label>
            <label className="form-wide">
              <span>Phone / WhatsApp</span>
              <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
            </label>
            <label className="form-wide">
              <span>Service needed</span>
              <select name="service" defaultValue="" required>
                <option value="" disabled>Select a service</option>
                <option value="website">Website / web application</option>
                <option value="ecommerce">E-commerce store</option>
                <option value="branding">Brand identity and design</option>
                <option value="mobile">Mobile product</option>
                <option value="strategy">Digital strategy and SEO</option>
                <option value="retainer">Monthly retainer</option>
                <option value="other">Other / not sure yet</option>
              </select>
            </label>
            <label className="form-wide">
              <span>Budget range</span>
              <select name="budget" defaultValue="" required>
                <option value="" disabled>Select a budget</option>
                <option value="under-10k">Under R10,000</option>
                <option value="10k-25k">R10,000 – R25,000</option>
                <option value="25k-50k">R25,000 – R50,000</option>
                <option value="50k-100k">R50,000 – R100,000</option>
                <option value="100k-plus">R100,000+</option>
                <option value="not-sure">Not sure yet</option>
              </select>
            </label>
            <label className="form-wide">
              <span>Tell me about the project</span>
              <textarea name="message" minLength={20} maxLength={3000} rows={6} required />
            </label>
            <label className="form-trap" aria-hidden="true">
              Website
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <button className="button button-primary form-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending enquiry…" : "Send project enquiry"}
            <span aria-hidden="true">↗</span>
          </button>

          <p className={`form-status ${status.type}`} role="status" aria-live="polite">
            {status.message}
          </p>
          <p className="form-privacy">
            Your details are used only to respond to this enquiry. <a href="/privacy">Privacy notice.</a>
          </p>
        </form>
      </div>
    </section>
  );
}
