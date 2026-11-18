import type { ReactNode } from 'react'
import { Link } from '../router/Link'
import './BackLink.css'

type BackLinkProps = {
  href: string
  children: ReactNode
}

function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link className="back-link" href={href}>
      <span aria-hidden="true">←</span>
      <span className="back-link-text">{children}</span>
    </Link>
  )
}

export default BackLink
