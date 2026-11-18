import { getProjectPath, type Project } from '../data/projects'
import { Link } from '../router/Link'
import TechTags from './TechTags'
import './ProjectCard.css'

type ProjectCardProps = {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const headingId = `${project.id}-title`

  return (
    <article className="project-card" aria-labelledby={headingId}>
      {project.cover ? (
        <div className="project-preview project-preview--image">
          <img
            src={project.cover.src}
            alt={project.cover.alt}
            width={800}
            height={600}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div
          className={`project-preview project-preview--${project.preview}`}
          aria-hidden="true"
        >
          <span className="preview-shape preview-shape-1" />
          <span className="preview-shape preview-shape-2" />
          <span className="preview-shape preview-shape-3" />
          <span className="preview-shape preview-shape-4" />
        </div>
      )}
      <div className="project-body">
        <h3 id={headingId} className="project-title">
          <Link className="project-link" href={getProjectPath(project)}>
            {project.title}
          </Link>
        </h3>
        {project.subtitle ? (
          <p className="project-subtitle">{project.subtitle}</p>
        ) : null}
        <p className="project-description">{project.description}</p>
        <TechTags technologies={project.technologies} max={4} />
        <p className="project-cta" aria-hidden="true">
          View project <span className="project-cta-arrow">→</span>
        </p>
      </div>
    </article>
  )
}

export default ProjectCard
