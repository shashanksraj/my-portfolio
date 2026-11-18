import type { CSSProperties } from 'react'
import './FlowDiagram.css'

export type FlowStep = {
  title: string
  note?: string
  items?: string[]
  // Endpoints (inputs and outputs) are drawn lighter than processing stages.
  endpoint?: boolean
}

type FlowDiagramProps = {
  label: string
  steps: FlowStep[]
  caption?: string
}

/** A restrained left-to-right flow (top-to-bottom on small screens). */
function FlowDiagram({ label, steps, caption }: FlowDiagramProps) {
  return (
    <figure className="flow">
      <ol
        className="flow-steps"
        aria-label={label}
        style={{ '--steps': steps.length } as CSSProperties}
      >
        {steps.map((step) => (
          <li
            className={`flow-step${step.endpoint ? ' flow-step--endpoint' : ''}`}
            key={step.title}
          >
            <p className="flow-step-title">{step.title}</p>
            {step.note ? <p className="flow-step-note">{step.note}</p> : null}
            {step.items ? (
              <ul className="flow-step-items">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
      {caption ? <figcaption className="flow-caption">{caption}</figcaption> : null}
    </figure>
  )
}

export default FlowDiagram
