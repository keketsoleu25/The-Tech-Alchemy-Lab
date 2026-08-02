import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Terms governing use of The Tech Alchemy Lab marketing website.",
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    id: "scope",
    title: "Scope of these terms",
    content: (
      <>
        <p>
          These terms govern access to and use of The Tech Alchemy Lab marketing website. By
          using the website, you agree to use it lawfully and consistently with these terms.
        </p>
        <p>
          These website terms do not replace a project proposal, quotation or signed service
          agreement. Project-specific documents will define the actual scope, fees, timelines,
          ownership and responsibilities for paid work.
        </p>
      </>
    ),
  },
  {
    id: "website-information",
    title: "Website information",
    content: (
      <>
        <p>
          Portfolio descriptions, service information and indicative pricing are provided for
          general information. They are not a binding offer or guarantee that a particular
          service, timeline or price is available.
        </p>
        <p>
          A tailored quotation is prepared after the project requirements have been reviewed.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    content: (
      <>
        <p>You may not use the website to:</p>
        <ul>
          <li>Submit unlawful, deceptive, abusive or malicious content</li>
          <li>Attempt to bypass security or interfere with website operation</li>
          <li>Use automated tools to overload, scrape or misuse the service</li>
          <li>Impersonate another person or submit information without authority</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <p>
        Unless otherwise stated, the website&apos;s original branding, copy, layout and source code
        are owned by Keketso Leu. Viewing the public website or source repository does not grant
        permission to copy, modify, distribute, sublicense or use that material commercially.
        Client names, brands and project materials remain the property of their respective owners.
      </p>
    ),
  },
  {
    id: "external-links",
    title: "External websites",
    content: (
      <p>
        The portfolio links to live projects, GitHub repositories and third-party services. Those
        destinations are operated independently and may change or become unavailable. Their own
        terms and privacy practices apply when you visit them.
      </p>
    ),
  },
  {
    id: "availability-liability",
    title: "Availability and responsibility",
    content: (
      <p>
        Reasonable care is taken to keep the website accurate and available, but uninterrupted or
        error-free operation cannot be guaranteed. To the extent permitted by applicable law, The
        Tech Alchemy Lab is not responsible for indirect loss arising solely from reliance on this
        marketing website or from third-party websites linked from it.
      </p>
    ),
  },
  {
    id: "privacy-law",
    title: "Privacy and governing law",
    content: (
      <>
        <p>Personal information submitted through the website is handled according to the <a href="/privacy">Privacy Notice</a>.</p>
        <p>
          These website terms are governed by the laws of the Republic of South Africa. Questions
          can be sent to <a href="mailto:techalchemist407@gmail.com">techalchemist407@gmail.com</a>.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Website terms / South Africa"
      title="Website terms"
      introduction="The practical rules for using this website and understanding its service, pricing and portfolio information."
      updated="02 August 2026"
      sections={sections}
    />
  );
}
