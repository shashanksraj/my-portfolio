import { useEffect } from 'react'

/** Sets the document title and meta description while a page is mounted. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    const previousTitle = document.title
    const previousDescription = meta?.content

    document.title = title
    if (meta) {
      meta.content = description
    }

    return () => {
      document.title = previousTitle
      if (meta && previousDescription !== undefined) {
        meta.content = previousDescription
      }
    }
  }, [title, description])
}
