import DetailSection from '../../components/DetailSection'
import ProjectLinks from '../../components/ProjectLinks'
import ProjectPageLayout from '../../components/ProjectPageLayout'
import ScreenshotGallery from '../../components/ScreenshotGallery'
import type { Project } from '../../data/projects'

// Deliberately minimal until the source has been reviewed. Add sections here
// (features, architecture, code excerpts) only with verified information:
// ProjectLinks, ScreenshotGallery, CodeSnippet, and FlowDiagram are ready to use.
function HospitalPage({ project }: { project: Project }) {
  const hasScreenshots = project.screenshots?.some((slot) => slot.image)

  return (
    <ProjectPageLayout project={project}>
      <DetailSection title="Overview">
        <div className="prose">
          <p>
            This is a hospital management application. I&apos;m keeping this
            page short until I have reviewed the code and decided what to share
            publicly, so it only says what I can stand behind today.
          </p>
        </div>
      </DetailSection>

      {hasScreenshots && project.screenshots ? (
        <DetailSection title="Screenshots" wide>
          <ScreenshotGallery slots={project.screenshots} />
        </DetailSection>
      ) : null}

      {project.github || project.demo ? (
        <DetailSection title="Source Code">
          <ProjectLinks project={project} />
        </DetailSection>
      ) : null}
    </ProjectPageLayout>
  )
}

export default HospitalPage
