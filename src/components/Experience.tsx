import { experience } from '../data/experience'
import SectionHeading from './SectionHeading'
import './Experience.css'

function Experience() {
  return (
    <section
      className="home-section"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <SectionHeading
        id="experience-heading"
        label="03 / Experience"
        title="Experience"
      />
      <ol className="experience-list">
        {experience.map((entry) => (
          <li className="experience-item" key={entry.id}>
            <p className="experience-period">{entry.period}</p>
            <div>
              <h3 className="experience-role">{entry.role}</h3>
              <p className="experience-company">{entry.company}</p>
              <p className="experience-summary">{entry.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Experience
