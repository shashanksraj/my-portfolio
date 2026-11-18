import { useId, type ReactNode } from 'react'
import './DetailSection.css'

type DetailSectionProps = {
  title: string
  // Wide sections put the heading above full-width content (diagrams, galleries).
  wide?: boolean
  children: ReactNode
}

// Sections are numbered automatically by a CSS counter, so reordering or adding
// a section never needs manual renumbering.
function DetailSection({ title, wide = false, children }: DetailSectionProps) {
  const headingId = useId()

  return (
    <section
      className={`detail-section${wide ? ' detail-section--wide' : ''}`}
      aria-labelledby={headingId}
    >
      <div className="detail-section-head">
        <span className="detail-section-label" aria-hidden="true" />
        <h2 id={headingId} className="detail-section-title">
          {title}
        </h2>
      </div>
      <div className="detail-section-body">{children}</div>
    </section>
  )
}

export default DetailSection
