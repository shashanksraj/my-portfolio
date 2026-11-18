import type { Project } from '../data/projects'
import ExternalLink from './ExternalLink'
import './ProjectLinks.css'

type ProjectLinksProps = {
  project: Project
}

function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

/**
 * Source and live-demo rows. A row only appears when its URL is configured,
 * and the whole list disappears when there is nothing to show.
 */
function ProjectLinks({ project }: ProjectLinksProps) {
  const rows = [
    { label: 'Source code', url: project.github },
    { label: 'Live demo', url: project.demo },
  ].filter((row): row is { label: string; url: string } => Boolean(row.url))

  if (rows.length === 0) {
    return null
  }

  return (
    <dl className="resource-list">
      {rows.map((row) => (
        <div className="resource" key={row.label}>
          <dt>{row.label}</dt>
          <dd>
            <ExternalLink className="resource-link" href={row.url}>
              {displayUrl(row.url)}
            </ExternalLink>
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default ProjectLinks
