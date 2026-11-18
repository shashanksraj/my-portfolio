import type { ReactNode } from 'react'

type ExternalLinkProps = {
  href: string
  className?: string
  children: ReactNode
  // Hide the visual arrow where the surrounding design already implies it.
  arrow?: boolean
}

/**
 * A link to another site. Opens in a new tab, keeps the opener isolated, and
 * tells screen-reader users where it goes.
 */
function ExternalLink({
  href,
  className,
  children,
  arrow = true,
}: ExternalLinkProps) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      {arrow ? (
        <>
          {' '}
          <span aria-hidden="true">↗</span>
        </>
      ) : null}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  )
}

export default ExternalLink
