import { site } from '../data/site'
import { Link } from '../router/Link'
import ExternalLink from './ExternalLink'
import './Navbar.css'

function Navbar() {
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('main')?.focus()
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <Link className="site-name" href="/">
          {site.name}
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <ul>
            <li>
              <Link href="/#work">Work</Link>
            </li>
            <li>
              <Link href="/#about">About</Link>
            </li>
            <li>
              <Link href="/#contact">Contact</Link>
            </li>
            {site.resume ? (
              <li>
                {/* Opens in a new tab; the browser's PDF viewer offers download. */}
                <ExternalLink href={site.resume} arrow={false}>
                  Resume
                </ExternalLink>
              </li>
            ) : null}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Navbar
