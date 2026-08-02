import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal-document";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How The Tech Alchemy Lab collects, uses and protects website enquiry information.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    id: "responsible-party",
    title: "Who is responsible",
    content: (
      <>
        <p>
          Keketso Leu, trading as The Tech Alchemy Lab, is responsible for deciding why and how
          personal information submitted through this website is used.
        </p>
        <p>
          Privacy questions and requests can be sent to <a href="mailto:techalchemist407@gmail.com">techalchemist407@gmail.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "information-collected",
    title: "Information collected",
    content: (
      <>
        <p>The project-enquiry form collects information that you choose to provide:</p>
        <ul>
          <li>First and last name</li>
          <li>Email address and optional phone or WhatsApp number</li>
          <li>Requested service and indicative budget range</li>
          <li>Your project description</li>
        </ul>
        <p>
          The website does not currently use advertising or marketing analytics cookies. Hosting
          and security providers may process standard technical request information needed to
          deliver and protect the website.
        </p>
      </>
    ),
  },
  {
    id: "purpose",
    title: "Why information is used",
    content: (
      <>
        <p>Enquiry information is used only to:</p>
        <ul>
          <li>Review and respond to your request</li>
          <li>Discuss possible services, scope, timing and budget</li>
          <li>Maintain an accurate history of project enquiries</li>
          <li>Protect the website and prevent misuse</li>
        </ul>
        <p>Your information is not sold and is not used for unrelated bulk marketing.</p>
      </>
    ),
  },
  {
    id: "service-providers",
    title: "Service providers",
    content: (
      <>
        <p>The website relies on specialist providers to operate the enquiry flow:</p>
        <ul>
          <li>Vercel hosts and delivers the website</li>
          <li>Neon provides PostgreSQL database storage</li>
          <li>Resend delivers enquiry notification emails</li>
        </ul>
        <p>
          These providers may process information in countries outside South Africa under their
          own security and privacy commitments. Information is shared only as needed to provide
          the relevant hosting, storage or email service.
        </p>
      </>
    ),
  },
  {
    id: "retention-security",
    title: "Retention and security",
    content: (
      <>
        <p>
          Enquiry records are kept only for as long as reasonably needed to respond, maintain
          business records and resolve questions or disputes. Records may be deleted or
          anonymised when they are no longer required, unless a legal obligation requires them to
          be retained.
        </p>
        <p>
          Reasonable technical and organisational safeguards are used, but no internet or storage
          system can be guaranteed completely secure.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    content: (
      <>
        <p>
          You may ask whether your information is held, request access or correction, object to
          certain processing, or request deletion where applicable. Email the address above with
          enough detail to identify your enquiry.
        </p>
        <p>
          You may also contact or lodge a complaint with South Africa&apos;s <a href="https://inforegulator.org.za/" target="_blank" rel="noreferrer">Information Regulator</a>.
        </p>
      </>
    ),
  },
  {
    id: "updates",
    title: "Changes to this notice",
    content: (
      <p>
        This notice may be updated when the website, its service providers or its information
        practices change. The date at the top identifies the latest published version.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Privacy / POPIA notice"
      title="Privacy notice"
      introduction="A plain-language explanation of what happens to the information you submit through The Tech Alchemy Lab website."
      updated="02 August 2026"
      sections={sections}
    />
  );
}
