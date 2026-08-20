import type { Metadata } from "next";

import { SupportRequestForm } from "@/components/support-request-form";

export const metadata: Metadata = {
  title: "Existing Client Support",
  description: "Log a structured support request for an existing Tech Alchemy Lab website or digital product.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <div className="support-page">
      <section className="support-hero"><div className="support-aura" aria-hidden="true" /><div className="shell support-hero-grid"><div><p className="eyebrow"><span aria-hidden="true" />Existing client support</p><h1>Tell us what changed.<strong>We’ll trace the right fix.</strong></h1><p>Use this page for websites and digital products already managed or delivered by The Tech Alchemy Lab. A clear report reduces back-and-forth.</p></div><div className="support-expectations"><p>Before you submit</p><ul><li><span>01</span> Share the affected page or project</li><li><span>02</span> Explain what happened and what you expected</li><li><span>03</span> Choose the real business impact</li></ul><small>Urgent requests are prioritised during business hours. This is not a 24/7 emergency service.</small></div></div></section>
      <section className="support-workspace"><div className="shell support-grid"><div className="support-copy"><p className="portal-kicker">Structured support</p><h2>One request.<br />One reference.</h2><p>After submission, keep the support reference for follow-ups. Separate requests help each issue stay clear and traceable.</p><div><span>Business hours</span><strong>Mon–Fri · 08:00–17:00</strong></div><div><span>Response target</span><strong>Within one business day</strong></div></div><SupportRequestForm /></div></section>
    </div>
  );
}
