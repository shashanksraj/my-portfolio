import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { navigate } from './navigation'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
}

/** An anchor that navigates client-side but still works with modified clicks. */
export function Link({ href, onClick, target, ...rest }: LinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)

    const isModified =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      isModified ||
      target === '_blank'
    ) {
      return
    }

    event.preventDefault()
    navigate(href)
  }

  return <a {...rest} href={href} target={target} onClick={handleClick} />
}
