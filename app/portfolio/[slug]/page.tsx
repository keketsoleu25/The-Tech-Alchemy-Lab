import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectVisual } from "@/components/project-visual";
import { getProject, projects } from "@/data/projects";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.name} Case Study`,
    description: project.introduction,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/portfolio/${project.slug}`,
      title: `${project.name} Case Study | The Tech Alchemy Lab`,
      description: project.introduction,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} Case Study | The Tech Alchemy Lab`,
      description: project.introduction,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="case-study">
      <header className="case-hero">
        <div className="case-aura" aria-hidden="true" />
        <div className="shell case-hero-grid">
          <div>
            <Link className="back-link" href="/#portfolio">
              <span aria-hidden="true">←</span> Back to selected work
            </Link>
            <p className="eyebrow">
              <span aria-hidden="true" />
              Case study · {project.industry}
            </p>
            <h1>{project.name}</h1>
            <p className="case-intro">{project.introduction}</p>
            <div className="case-actions">
              <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
                Visit live website <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <ProjectVisual project={project} />
        </div>
        <div className="shell case-meta">
          <div><span>Client</span><strong>{project.client}</strong></div>
          <div><span>Industry</span><strong>{project.industry}</strong></div>
          <div><span>Focus</span><strong>{project.focus}</strong></div>
        </div>
      </header>

      <div className="shell case-body">
        <section className="case-summary" aria-label="Project summary">
          <article><span>01</span><h2>Client overview</h2><p>{project.overview}</p></article>
          <article><span>02</span><h2>The challenge</h2><p>{project.challenge}</p></article>
          <article><span>03</span><h2>The result</h2><p>{project.result}</p></article>
        </section>

        <section className="case-narrative">
          <div>
            <p className="case-label">The context</p>
            <h2>A clearer digital path was needed.</h2>
          </div>
          <p>{project.detailedChallenge}</p>
        </section>

        <section className="case-solution">
          <div>
            <p className="case-label">The solution</p>
            <h2>Strategy translated into a focused experience.</h2>
          </div>
          <ol>
            {project.solution.map((step, index) => (
              <li key={step}><span>0{index + 1}</span><p>{step}</p></li>
            ))}
          </ol>
        </section>

        <section className="case-details">
          <div>
            <p className="case-label">Technology stack</p>
            <div className="case-pills">
              {project.stack.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </div>
          <div>
            <p className="case-label">Design process</p>
            <ol>
              {project.process.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}
            </ol>
          </div>
        </section>

        <section className="case-highlights" aria-labelledby="highlights-title">
          <div className="case-section-heading">
            <p className="case-label">Experience highlights</p>
            <h2 id="highlights-title">The details that move the journey forward.</h2>
          </div>
          <div>
            {project.highlights.map((highlight, index) => (
              <article key={highlight.title}>
                <span>0{index + 1}</span>
                <div><h3>{highlight.title}</h3><p>{highlight.description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="case-outcome">
          <article>
            <p className="case-label">Business impact</p>
            <h2>{project.impact}</h2>
          </article>
          <article>
            <p className="case-label">Lesson carried forward</p>
            <p>{project.lessons}</p>
          </article>
        </section>

        <nav className="case-next" aria-label="Case study navigation">
          <Link href="/#portfolio">Explore all work</Link>
          <a href={project.liveUrl} target="_blank" rel="noreferrer">Visit {project.name} ↗</a>
        </nav>
      </div>
    </article>
  );
}
