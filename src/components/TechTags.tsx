import './TechTags.css'

type TechTagsProps = {
  technologies: string[]
  // Show only the first `max` tags plus a "+N" marker (for compact cards).
  max?: number
}

function TechTags({ technologies, max }: TechTagsProps) {
  if (technologies.length === 0) {
    return null
  }

  const visible = max ? technologies.slice(0, max) : technologies
  const hiddenCount = technologies.length - visible.length

  return (
    <ul className="tech-tags" aria-label="Technologies">
      {visible.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
      {hiddenCount > 0 ? (
        <li>
          <span aria-hidden="true">+{hiddenCount}</span>
          <span className="visually-hidden">and {hiddenCount} more</span>
        </li>
      ) : null}
    </ul>
  )
}

export default TechTags
