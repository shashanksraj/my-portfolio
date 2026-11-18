import BackLink from '../components/BackLink'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'
import '../components/ProjectPageLayout.css'

function NotFoundPage() {
  usePageMeta(`Page not found | ${site.name}`, 'This page could not be found.')

  return (
    <section className="project-page" aria-labelledby="not-found-title">
      <BackLink href="/">Back to home</BackLink>
      <header className="project-hero">
        <p className="project-hero-label">404</p>
        <h1 id="not-found-title" className="project-hero-title">
          Page not found
        </h1>
        <p className="project-hero-tagline">
          This page doesn&apos;t exist, or it hasn&apos;t been built yet.
        </p>
      </header>
    </section>
  )
}

export default NotFoundPage
