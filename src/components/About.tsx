import SectionHeading from './SectionHeading'
import './About.css'

const facts = [
  { term: 'Degree', detail: 'B.S. in Computer Science' },
  { term: 'University', detail: 'University of Arizona' },
  { term: 'Minor', detail: 'Business' },
  { term: 'Graduated', detail: 'December 2025' },
]

function About() {
  return (
    <section
      className="home-section"
      id="about"
      aria-labelledby="about-heading"
    >
      <SectionHeading id="about-heading" label="02 / About" title="About" />
      <div className="about-body">
        <div className="about-text">
          <p className="about-lead">
            I&apos;m a Computer Science graduate from the University of
            Arizona, with a minor in Business. I like building software from
            the ground up, whether that&apos;s an interactive 3D experience, a
            compiler, or a full-stack application.
          </p>
          <p>
            I&apos;m most interested in where engineering, AI, and real
            products meet, and in understanding the technical details behind
            them.
          </p>
        </div>
        <dl className="about-facts">
          {facts.map((fact) => (
            <div className="about-fact" key={fact.term}>
              <dt>{fact.term}</dt>
              <dd>{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default About
