import './ProjectBlocks.css'

type Term = {
  term: string
  description: string
}

/** A glossary-style list: a term followed by a short explanation. */
export function TermList({ items }: { items: Term[] }) {
  return (
    <dl className="term-list">
      {items.map((item) => (
        <div className="term" key={item.term}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </div>
      ))}
    </dl>
  )
}

type Stat = {
  value: string
  label: string
}

/** Large figures with a plain-language label. Only pass verified numbers. */
export function StatList({ items }: { items: Stat[] }) {
  return (
    <dl className="stat-list">
      {items.map((item) => (
        <div className="stat" key={item.label}>
          {/* Label first in the DOM for assistive tech; CSS shows the value on top. */}
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}