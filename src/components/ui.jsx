import { useState } from 'react'
import { ImageOff } from 'lucide-react'

/**
 * For Unsplash URLs, build a srcset so phones download smaller files than desktops.
 * Local images (e.g. /images/menu/egusi.jpg) are used as-is.
 */
function unsplashSrcSet(src) {
  try {
    const url = new URL(src)
    if (url.hostname !== 'images.unsplash.com') return undefined
    const width = Number(url.searchParams.get('w'))
    const height = Number(url.searchParams.get('h'))
    if (!width) return undefined
    return [400, 700, 1000, 1400]
      .filter((candidate) => candidate <= width * 1.6)
      .map((candidate) => {
        url.searchParams.set('w', candidate)
        if (height) url.searchParams.set('h', Math.round((height * candidate) / width))
        return `${url.toString()} ${candidate}w`
      })
      .join(', ')
  } catch {
    return undefined
  }
}

/** Image with lazy loading, fixed aspect ratio, responsive sizes and a branded fallback if the source fails. */
export function SmartImage({ src, alt, className = '', imgClassName = '', eager = false, sizes = '(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw' }) {
  const [failed, setFailed] = useState(!src)
  return (
    <div className={`relative overflow-hidden bg-lavender ${className}`}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center text-center text-brand/60" role="img" aria-label={alt}>
          <div>
            <ImageOff className="mx-auto h-7 w-7" aria-hidden="true" />
            <p className="mt-2 text-xs font-medium">Photo coming soon</p>
          </div>
        </div>
      ) : (
        <img
          src={src}
          srcSet={unsplashSrcSet(src)}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  )
}

export function Eyebrow({ children, tone = 'brand' }) {
  const color = tone === 'light' ? 'text-accent' : 'text-brand'
  return <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${color}`}>{children}</p>
}

export function SectionHeading({ eyebrow, title, description, align = 'left', tone = 'dark', as: Tag = 'h2' }) {
  const center = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <div className={`max-w-2xl ${center}`}>
      {eyebrow && <Eyebrow tone={tone === 'light' ? 'light' : 'brand'}>{eyebrow}</Eyebrow>}
      <Tag className={`mt-3 text-balance font-display text-[1.85rem] leading-tight sm:text-4xl ${tone === 'light' ? 'text-white' : 'text-ink'}`}>{title}</Tag>
      {description && <p className={`mt-4 text-pretty text-base leading-7 ${tone === 'light' ? 'text-white/80' : 'text-muted'}`}>{description}</p>}
    </div>
  )
}

/**
 * Dashed "where content goes" box. Shown ONLY while developing (npm run dev) — never on the
 * live site — so empty sections (reviews, galleries, packages) are easy to find and fill in.
 */
export function EditorNote({ title, children, className = '' }) {
  if (!import.meta.env.DEV) return null
  return (
    <div className={`rounded-2xl border-2 border-dashed border-accent/50 bg-accent/5 p-5 text-sm leading-6 text-ink ${className}`} role="note">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-dark">Editor note · only visible in development</p>
      <p className="mt-1.5 font-semibold">{title}</p>
      <div className="mt-1 text-muted">{children}</div>
    </div>
  )
}

/** Standard vertical rhythm for page sections. tone: 'white' | 'lavender' | 'deep' */
export function Section({ id, labelledBy, tone = 'white', className = '', children }) {
  const tones = { white: 'bg-white', lavender: 'bg-lavender', deep: 'bg-brand-deep text-white' }
  return (
    <section id={id} aria-labelledby={labelledBy} className={`scroll-mt-24 py-16 sm:py-24 ${tones[tone]} ${className}`}>
      {children}
    </section>
  )
}

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

/** Page header used at the top of inner pages. */
export function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="border-b border-line bg-lavender">
      <Container className="py-10 sm:py-16">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-[2.15rem] leading-[1.1] text-ink sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-muted sm:text-lg">{description}</p>}
        {children}
      </Container>
    </section>
  )
}
