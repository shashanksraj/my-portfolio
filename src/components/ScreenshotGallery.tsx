import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { ProjectImage, ScreenshotSlot } from '../data/projects'
import './ScreenshotGallery.css'

type FilledSlot = ScreenshotSlot & { image: ProjectImage }

function hasImage(slot: ScreenshotSlot): slot is FilledSlot {
  return slot.image !== undefined
}

type LightboxProps = {
  slots: FilledSlot[]
  index: number
  onChange: (index: number) => void
  onClose: () => void
}

function Lightbox({ slots, index, onChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const slot = slots[index]

  useEffect(() => {
    const dialog = dialogRef.current
    // Guard against showing twice (React StrictMode runs effects twice in dev).
    if (dialog && !dialog.open) {
      dialog.showModal()
    }
  }, [])

  function step(delta: number) {
    onChange((index + delta + slots.length) % slots.length)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    // Closing explicitly means Escape does not depend on the browser's
    // built-in dialog handling; close() still fires onClose.
    if (event.key === 'Escape') {
      event.preventDefault()
      dialogRef.current?.close()
      return
    }
    if (slots.length < 2) return
    if (event.key === 'ArrowLeft') step(-1)
    if (event.key === 'ArrowRight') step(1)
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={`Screenshot: ${slot.label}`}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        // A click on the backdrop targets the dialog element itself.
        if (event.target === event.currentTarget) {
          dialogRef.current?.close()
        }
      }}
    >
      <div className="lightbox-bar">
        <p className="lightbox-count">
          {index + 1} / {slots.length}
        </p>
        <div className="lightbox-actions">
          {slots.length > 1 ? (
            <>
              <button type="button" onClick={() => step(-1)}>
                Previous
              </button>
              <button type="button" onClick={() => step(1)}>
                Next
              </button>
            </>
          ) : null}
          <button type="button" onClick={() => dialogRef.current?.close()}>
            Close
          </button>
        </div>
      </div>
      <figure className="lightbox-figure">
        <img src={slot.image.src} alt={slot.image.alt} />
        <figcaption>{slot.caption}</figcaption>
      </figure>
    </dialog>
  )
}

type ScreenshotGalleryProps = {
  slots: ScreenshotSlot[]
}

/**
 * Screenshots in a consistent 4:3 grid; each one opens in a lightbox.
 * Only slots that have a real image are shown, and with none the gallery
 * renders nothing, so unfinished slots never appear as empty boxes.
 */
function ScreenshotGallery({ slots }: ScreenshotGalleryProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const viewable = slots.filter(hasImage)
  const openIndex = viewable.findIndex((slot) => slot.id === openId)

  if (viewable.length === 0) {
    return null
  }

  return (
    <>
      <ul className="gallery">
        {viewable.map((slot) => (
          <li key={slot.id}>
            <figure className="gallery-item">
              <button
                type="button"
                className="gallery-open"
                onClick={() => setOpenId(slot.id)}
                aria-label={`Enlarge screenshot: ${slot.label}`}
              >
                <img
                  src={slot.image.src}
                  alt={slot.image.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                />
              </button>
              <figcaption className="gallery-caption">{slot.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {openIndex >= 0 ? (
        <Lightbox
          slots={viewable}
          index={openIndex}
          onChange={(next) => setOpenId(viewable[next].id)}
          onClose={() => setOpenId(null)}
        />
      ) : null}
    </>
  )
}

export default ScreenshotGallery
