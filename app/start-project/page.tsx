import type { Metadata } from "next";

import { WebsiteIntakeForm } from "@/components/website-intake-form";

export const metadata: Metadata = {
  title: "Start a Website Project",
  description: "Build a clear website brief for The Tech Alchemy Lab, covering goals, content, features, budget and timing.",
  alternates: { canonical: "/start-project" },
};

export default function StartProjectPage() {
  return (
    <div className="portal-page">
      <section className="portal-hero">
        <div className="portal-hero-aura" aria-hidden="true" />
        <div className="shell"><p className="eyebrow"><span aria-hidden="true" />Client website intake</p><h1>A clear brief creates a<strong>stronger website.</strong></h1><p>Answer the questions that shape scope, strategy and delivery. Your draft saves automatically, and the final brief receives a reference number.</p><div className="portal-hero-meta"><span>7 guided steps</span><span>10–15 minutes</span><span>Draft auto-saves</span></div></div>
      </section>
      <div className="shell"><WebsiteIntakeForm /></div>
    </div>
  );
}
