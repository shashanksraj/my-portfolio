import { useEffect } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { projects } from './data/projects'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import { projectPages } from './pages/projects'
import { scrollToCurrentHash, useLocation } from './router/navigation'
import './App.css'

function getPage(pathname: string) {
  if (pathname === '/') {
    return <HomePage />
  }

  const slug = /^\/projects\/([^/]+)\/?$/.exec(pathname)?.[1]
  const project = projects.find((item) => item.slug === slug)
  const ProjectPage = project ? projectPages[project.slug] : undefined

  if (project && ProjectPage) {
    return <ProjectPage project={project} />
  }

  return <NotFoundPage />
}

function App() {
  const { pathname } = useLocation()

  // A direct load of /#about should land on the section once it has rendered.
  useEffect(() => {
    scrollToCurrentHash()
  }, [])

  return (
    <div className="page">
      <Navbar />
      <main id="main" tabIndex={-1}>
        {getPage(pathname)}
      </main>
      <Footer />
    </div>
  )
}

export default App
