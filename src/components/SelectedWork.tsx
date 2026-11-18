import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import SectionHeading from './SectionHeading'
import './SelectedWork.css'

function SelectedWork() {
  return (
    <section className="home-section" id="work" aria-labelledby="work-heading">
      <SectionHeading
        id="work-heading"
        label="01 / Projects"
        title="Selected Work"
      />
      <ul className="project-grid">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SelectedWork
