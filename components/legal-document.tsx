import Link from "next/link";
import type { ReactNode } from "react";

type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  updated: string;
  sections: LegalSection[];
};

export function LegalDocument({ eyebrow, title, introduction, updated, sections }: LegalDocumentProps) {
  return (
    <article className="legal-page">
      <header className="legal-hero">
        <div className="legal-aura" aria-hidden="true" />
        <div className="shell">
          <Link className="legal-back" href="/#home">← Back to the Lab</Link>
          <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>
          <h1>{title}</h1>
          <p className="legal-intro">{introduction}</p>
          <p className="legal-updated">Last updated / {updated}</p>
        </div>
      </header>

      <div className="shell legal-layout">
        <nav className="legal-nav" aria-label={`${title} sections`}>
          <p>On this page</p>
          {sections.map((section, index) => (
            <a href={`#${section.id}`} key={section.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>{section.title}
            </a>
          ))}
        </nav>

        <div className="legal-content">
          {sections.map((section, index) => (
            <section id={section.id} key={section.id}>
              <p className="legal-index">Section / {String(index + 1).padStart(2, "0")}</p>
              <h2>{section.title}</h2>
              {section.content}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
