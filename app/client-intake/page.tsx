import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Client Intake", description: "Start a project with The Tech Alchemy Lab." };

export default function ClientIntakePage() {
  return <section className="legal-hero"><div className="shell"><p className="eyebrow"><span aria-hidden="true" />New client intake</p><h1>Start your<br />project.</h1><p className="legal-intro">Tell the Lab what you are building, the problem it needs to solve and your target timeline. We will turn this into a focused project plan.</p><div className="hero-actions"><Link className="button button-primary" href="/#contact">Complete project enquiry <span aria-hidden="true">↗</span></Link><a className="button button-secondary" href="mailto:techalchemist407@gmail.com?subject=Client%20intake%20%E2%80%94%20The%20Tech%20Alchemy%20Lab">Email project brief <span aria-hidden="true">↗</span></a></div><p className="form-privacy">Have a brief, logo, images or documents? Mention them in your enquiry first. The Lab will send you a secure upload link after review.</p></div></section>;
}
