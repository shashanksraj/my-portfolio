import { site } from '../data/site'
import ExternalLink from './ExternalLink'
import SectionHeading from './SectionHeading'
import './Contact.css'

function Contact() {
  // Only profiles with a configured URL are shown.
  const profiles = [
    { label: 'GitHub', url: site.github },
    { label: 'LinkedIn', url: site.linkedin },
    { label: 'Resume', url: site.resume },
  ].filter((profile) => profile.url)

  return (
    <section
      className="home-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <SectionHeading
        id="contact-heading"
        label="04 / Contact"
        title="Let's connect."
      />
      <p className="contact-intro">
        I&apos;m always interested in discussing software engineering
        opportunities, interesting projects, and ideas worth building.
      </p>
      <a className="contact-email" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      {profiles.length > 0 ? (
        <ul className="contact-links">
          {profiles.map((profile) => (
            <li key={profile.label}>
              <ExternalLink href={profile.url ?? ''}>
                {profile.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

export default Contact
