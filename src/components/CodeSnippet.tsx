import { useState } from 'react'
import ExternalLink from './ExternalLink'
import './CodeSnippet.css'

type CodeSnippetProps = {
  // Short name for the excerpt, e.g. "Collision check".
  title: string
  // Why this code matters.
  explanation: string
  // Real source only. Leave undefined and nothing is rendered.
  code?: string
  filename?: string
  // Link to the exact file in a verified repository.
  sourceUrl?: string
}

/** A short, real code excerpt with a copy button. */
function CodeSnippet({
  title,
  explanation,
  code,
  filename,
  sourceUrl,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false)

  // No real code, nothing to show: a snippet is never faked or stubbed.
  if (code === undefined) {
    return null
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code ?? '')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard access can be blocked; the code stays selectable by hand.
    }
  }

  return (
    <figure className="snippet">
      <div className="snippet-bar">
        <span className="snippet-filename">{filename ?? title}</span>
        <button type="button" className="snippet-copy" onClick={copyCode}>
          {copied ? 'Copied' : 'Copy'}
        </button>
        <span className="visually-hidden" role="status">
          {copied ? 'Code copied to clipboard' : ''}
        </span>
      </div>
      {/* tabIndex lets keyboard users scroll long lines. */}
      <pre className="snippet-code" tabIndex={0}>
        <code>{code}</code>
      </pre>
      <figcaption className="snippet-caption">
        {explanation}
        {sourceUrl ? (
          <>
            {' '}
            <ExternalLink href={sourceUrl}>
              View file
              <span className="visually-hidden"> for {title}</span>
            </ExternalLink>
          </>
        ) : null}
      </figcaption>
    </figure>
  )
}

export default CodeSnippet
