"use client";

import Link from "next/link";
import { useState } from "react";

import { ProjectVisual } from "@/components/project-visual";
import { projects, type ProjectCategory } from "@/data/projects";

const filters: Array<"All Work" | ProjectCategory> = [
  "All Work",
  "Education",
  "Business",
  "Platform",
  "Non-profit",
];

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All Work");
  const visibleProjects = projects.filter(
    (project) => activeFilter === "All Work" || project.categories.includes(activeFilter),
  );

  return (
    <section className="portfolio" id="portfolio" aria-labelledby="portfolio-title">
      <div className="shell">
        <div className="section-heading portfolio-heading">
          <div>
            <p className="eyebrow">
              <span aria-hidden="true" />
              Selected transformations
            </p>
            <h2 id="portfolio-title">
              Real work for
              <strong>real organisations.</strong>
            </h2>
          </div>
          <p>
            Four production and product projects showing how strategy, interface design and practical
            engineering combine to build trust and create clearer customer journeys.
          </p>
        </div>

        <div className="portfolio-filters" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={activeFilter === filter ? "is-active" : ""}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {visibleProjects.map((project) => (
            <article className="project-card" key={project.slug}>
              <ProjectVisual project={project} compact />
              <div className="project-card-info">
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="project-actions">
                  <Link href={`/portfolio/${project.slug}`}>
                    View case study <span aria-hidden="true">↗</span>
                  </Link>
                  <a href={project.projectUrl} target="_blank" rel="noreferrer">
                    {project.projectLinkLabel ?? "Visit live site"}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="portfolio-cta">
          <p>Every transformation starts with a real business conversation.</p>
          <a className="button button-primary" href="#contact">
            Start your project <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
