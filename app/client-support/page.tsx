import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Client Support", description: "Support for existing Tech Alchemy Lab clients." };

export default function ClientSupportPage() {
  return <section className="legal-hero"><div className="shell"><p className="eyebrow"><span aria-hidden="true" />Existing client support</p><h1>Need help<br />with your site?</h1><p className="legal-intro">Send a clear support request for your live website, digital tool, content update or account access. Include the affected page, what happened and what you expected instead.</p><div className="hero-actions"><a className="button button-primary" href="mailto:techalchemist407@gmail.com?subject=Client%20support%20request%20%E2%80%94%20The%20Tech%20Alchemy%20Lab">Send support request <span aria-hidden="true">↗</span></a><a className="button button-secondary" href="https://wa.me/27692602709?text=Hello%20Tech%20Alchemy%20Lab%2C%20I%20need%20support%20with%20my%20existing%20project." target="_blank" rel="noreferrer">WhatsApp support <span aria-hidden="true">↗</span></a></div><p className="form-privacy">Do not email passwords or sensitive records. For documents, screenshots and images, request a secure upload link and we will verify the files before they are shared.</p><p className="form-privacy"><Link href="/#contact">Not an existing client? Start with project intake instead.</Link></p></div></section>;
}
