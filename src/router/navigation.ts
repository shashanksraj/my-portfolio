import { useSyncExternalStore } from 'react'

// A tiny History API router. It exists so that /projects/:slug works without a
// routing dependency. Hash routing is avoided on purpose: #work, #about and
// #contact are section anchors on the homepage.

let navigationCount = 0
const listeners = new Set<() => void>()

function notify() {
  navigationCount += 1
  listeners.forEach((listener) => listener())
}

// Scroll restoration. The browser's own restoration runs before the page
// content has been swapped, so going back or forward between pages can land at
// the wrong offset. Remember the scroll position of each history entry and
// restore it ourselves once the new page has rendered.
const scrollPositions = new Map<string, number>()
let restoring = false

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

function createKey() {
  return Math.random().toString(36).slice(2)
}

/** Every history entry carries a key so its scroll position can be found. */
function ensureEntryKey(): string {
  const existing = (window.history.state as { key?: unknown } | null)?.key
  if (typeof existing === 'string') return existing

  const key = createKey()
  window.history.replaceState({ key }, '')
  return key
}

let currentKey = ensureEntryKey()

window.addEventListener(
  'scroll',
  () => {
    if (!restoring) scrollPositions.set(currentKey, window.scrollY)
  },
  { passive: true },
)

window.addEventListener('popstate', () => {
  currentKey = ensureEntryKey()
  restoring = true
  notify()

  window.requestAnimationFrame(() => {
    const saved = scrollPositions.get(currentKey)

    if (saved !== undefined) {
      window.scrollTo({ top: saved, behavior: 'instant' })
    } else if (!scrollToHashTarget(window.location.hash, true)) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    restoring = false
  })
})

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return navigationCount
}

/** Re-renders the caller whenever the URL changes and returns the location. */
export function useLocation() {
  useSyncExternalStore(subscribe, getSnapshot)
  return {
    pathname: window.location.pathname,
    hash: window.location.hash,
  }
}

function scrollToHashTarget(hash: string, instant: boolean) {
  const target = hash
    ? document.getElementById(decodeURIComponent(hash.slice(1)))
    : null

  target?.scrollIntoView({ behavior: instant ? 'instant' : 'auto' })
  return target !== null
}

function updateScroll(pathChanged: boolean, hash: string) {
  if (pathChanged) {
    // Move keyboard and screen reader focus to the new page's content.
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  // Jump when arriving from another page; otherwise use the CSS smooth scroll.
  const found = scrollToHashTarget(hash, pathChanged)

  if (!found && pathChanged) {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
}

/**
 * On a direct load of a URL like /#about the browser tries to scroll before
 * React has rendered the sections, so scroll again once the page exists.
 */
export function scrollToCurrentHash() {
  scrollToHashTarget(window.location.hash, true)
}

/** Client-side navigation to a path, optionally with a #hash. */
export function navigate(to: string) {
  const previousPath = window.location.pathname
  const destination = new URL(to, window.location.href)

  if (destination.href !== window.location.href) {
    currentKey = createKey()
    window.history.pushState({ key: currentKey }, '', destination)
    notify()
  }

  // Wait for React to render the new page before scrolling.
  window.requestAnimationFrame(() => {
    updateScroll(destination.pathname !== previousPath, destination.hash)
  })
}
