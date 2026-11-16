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
      <Tag className={`mt-3 font-display text-3xl leading-tight sm:text-4xl ${tone === 'light' ? 'text-white' : 'text-ink'}`}>{title}</Tag>
      {description && <p className={`mt-4 text-base leading-7 ${tone === 'light' ? 'text-white/80' : 'text-muted'}`}>{description}</p>}
    </div>
  )
}

export function Container({ children, className = '' }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

/** Page header used at the top of inner pages. */
export function PageHeader({ eyebrow, title, description, children }) {
  return (
    <section className="border-b border-line bg-lavender">
      <Container className="py-12 sm:py-16">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] text-ink sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</p>}
        {children}
      </Container>
    </section>
  )
}
