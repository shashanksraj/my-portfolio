import About from '../components/About'
import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Hero from '../components/Hero'
import SelectedWork from '../components/SelectedWork'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

function HomePage() {
  usePageMeta(`${site.name} | Software Engineer`, site.description)

  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Experience />
      <Contact />
    </>
  )
}

export default HomePage
