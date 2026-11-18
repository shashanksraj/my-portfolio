import { site } from '../data/site'

// Hero styles live in App.css.
function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-content">
        <p className="hero-label">Software Engineer / AI &amp; Full-Stack</p>
        <h1 id="hero-heading" className="hero-heading">
          <span className="hero-greeting">Hey, I&apos;m Shashank.</span>
          <span className="hero-statement">
            I build software that makes complex things feel simple.
          </span>
        </h1>
        <p className="hero-copy">
          I&apos;m a software engineer interested in full-stack development,
          AI, and systems programming. I enjoy building practical applications,
          exploring how things work, and turning ideas into working software.
        </p>
        <a className="hero-link" href="#work">
          <span className="hero-link-text">Explore my work</span>
          <span className="hero-link-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>

      <div className="hero-footer">
        <hr className="hero-rule" />
        <p className="hero-location">Based in {site.location}</p>
      </div>
    </section>
  )
}

export default Hero
