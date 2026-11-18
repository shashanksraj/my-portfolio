import type { ReactNode } from 'react'
import type { Project } from '../data/projects'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import BackLink from './BackLink'
import ExternalLink from './ExternalLink'
import TechTags from './TechTags'
import './ProjectPageLayout.css'

type ProjectPageLayoutProps = {
  project: Project
  children: ReactNode
}

/** The shared frame for every project page: title block, links, then sections. */
function ProjectPageLayout({ project, children }: ProjectPageLayoutProps) {
  usePageMeta(`${project.title} | ${site.name}`, project.tagline)

  // Only verified links are rendered in the header.
  const links = [
    { label: 'View source on GitHub', url: project.github },
    { label: 'Live demo', url: project.demo },
  ].filter((link): link is { label: string; url: string } => Boolean(link.url))

  return (
    <article className="project-page" aria-labelledby="project-title">
      <BackLink href="/#work">Back to Selected Work</BackLink>

      <header className="project-hero">
        <div className="project-hero-text">
          <p className="project-hero-label">Project</p>
          <h1 id="project-title" className="project-hero-title">
            {project.title}
          </h1>
          {project.subtitle ? (
            <p className="project-hero-subtitle">{project.subtitle}</p>
          ) : null}
          <p className="project-hero-tagline">{project.tagline}</p>
          <TechTags technologies={project.technologies} />
          {links.length > 0 ? (
            <ul className="project-hero-links">
              {links.map((link) => (
                <li key={link.label}>
                  <ExternalLink href={link.url}>{link.label}</ExternalLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {project.cover ? (
          <figure className="project-hero-art">
            <img
              src={project.cover.src}
              alt={project.cover.alt}
              width={800}
              height={600}
              decoding="async"
            />
          </figure>
        ) : null}
      </header>

      <div className="project-sections">{children}</div>
    </article>
  )
}

export default ProjectPageLayout
