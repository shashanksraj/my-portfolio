import './SectionHeading.css'

type SectionHeadingProps = {
  id: string
  label: string
  title: string
}

function SectionHeading({ id, label, title }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="section-label">{label}</p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      <hr className="section-rule" />
    </header>
  )
}

export default SectionHeading
