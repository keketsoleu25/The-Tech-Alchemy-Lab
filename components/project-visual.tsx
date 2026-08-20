import type { Project } from "@/data/projects";

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={`project-visual project-${project.slug} ${compact ? "is-compact" : ""}`}>
      <div className="project-browser-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <i>{project.projectUrl.replace("https://", "")}</i>
      </div>
      <div className="project-visual-body">
        <span className="project-visual-index">TAL / {project.slug.slice(0, 3).toUpperCase()}</span>
        <div>
          <small>{project.industry}</small>
          <strong>{project.name}</strong>
        </div>
        <div className="project-visual-lines" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}
