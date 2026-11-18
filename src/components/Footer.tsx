import { site } from '../data/site'
import ExternalLink from './ExternalLink'
import './Footer.css'

function Footer() {
  const profiles = [
    { label: 'GitHub', url: site.github },
    { label: 'LinkedIn', url: site.linkedin },
  ].filter((profile) => profile.url)

  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {site.fullName}
      </p>
      {profiles.length > 0 ? (
        <ul className="footer-links" aria-label="Profiles">
          {profiles.map((profile) => (
            <li key={profile.label}>
              <ExternalLink href={profile.url ?? ''} arrow={false}>
                {profile.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      ) : null}
      <p>Built with React, TypeScript &amp; curiosity.</p>
    </footer>
  )
}

export default Footer
