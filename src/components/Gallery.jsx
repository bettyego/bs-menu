import { ArrowUpRight, Camera } from 'lucide-react'
import { Container, EditorNote, SectionHeading, SmartImage } from './ui'
import { buttonClass } from '../utils/styles'
import { businessConfig } from '../config/businessConfig'
import { instagramGallery, mealGallery } from '../data/contentData'

/**
 * Responsive photo grid. The first photo is larger on wide screens.
 * images: [{ src, alt, caption?, link? }]
 */
export function PhotoGrid({ images, className = '' }) {
  return (
    <ul className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 ${className}`}>
      {images.map((image, index) => {
        const feature = index === 0 && images.length >= 5
        // On phones (2 columns) stretch a lone last tile across the row so there is no gap.
        const tilesAfterFeature = images.length >= 5 ? images.length - 1 : images.length
        const stretchLast = index === images.length - 1 && index > 0 && tilesAfterFeature % 2 === 1
        const tile = (
          <figure className="group relative h-full">
            <SmartImage
              src={image.src}
              alt={image.alt}
              sizes={feature ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 50vw'}
              className={`h-full rounded-2xl ${feature ? 'aspect-square md:aspect-auto' : stretchLast ? 'aspect-[2/1] md:aspect-square' : 'aspect-square'}`}
              imgClassName="transition duration-500 group-hover:scale-[1.03]"
            />
            {image.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-ink/75 to-transparent px-3 pb-3 pt-8 text-xs font-medium text-white sm:text-sm">
                {image.caption}
              </figcaption>
            )}
          </figure>
        )
        return (
          <li key={image.src} className={feature ? 'col-span-2 md:row-span-2' : stretchLast ? 'col-span-2 md:col-span-1' : ''}>
            {image.link ? <a href={image.link} target="_blank" rel="noopener noreferrer" className="block h-full">{tile}</a> : tile}
          </li>
        )
      })}
    </ul>
  )
}

/** Real B's Menu meal photos (contentData.mealGallery). Hidden on the live site until photos are added. */
export function MealGallery() {
  if (!mealGallery.length) {
    return import.meta.env.DEV ? (
      <Container className="py-10">
        <EditorNote title="Meal photo gallery">
          Add real photos of B’s Menu meals to <code>mealGallery</code> in <code>src/data/contentData.js</code> (e.g. <code>{'{ src: \'/images/gallery/egusi.jpg\', alt: \'…\', caption: \'Egusi soup\' }'}</code>). The gallery appears here automatically.
        </EditorNote>
      </Container>
    ) : null
  }
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="gallery-title">
      <Container>
        <SectionHeading eyebrow="From our kitchen" title={<span id="gallery-title">Straight from the B’s Menu kitchen</span>} description="Real meals, freshly cooked for our customers." />
        <PhotoGrid images={mealGallery} className="mt-10" />
      </Container>
    </section>
  )
}

/** Instagram strip. Shows when an Instagram link and/or photos are configured. */
export function InstagramGallery() {
  const url = businessConfig.social.instagram
  const { images, handle } = instagramGallery
  if (!url && !images.length) {
    return import.meta.env.DEV ? (
      <Container className="pb-10">
        <EditorNote title="Instagram gallery">
          Add your Instagram link in <code>businessConfig.social.instagram</code> and a few post photos to <code>instagramGallery.images</code> in <code>src/data/contentData.js</code>.
        </EditorNote>
      </Container>
    ) : null
  }
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="instagram-title">
      <Container>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={handle ?? 'Instagram'} title={<span id="instagram-title">Follow what’s cooking</span>} description="Fresh pots, new dishes and weekly menus — see them first on Instagram." />
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClass('outline', 'md', 'shrink-0')}>
              <Camera className="h-4 w-4" aria-hidden="true" /> Follow us <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
        {images.length > 0 && (
          <ul className="mt-10 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
            {images.slice(0, 6).map((image) => (
              <li key={image.src}>
                <a href={image.link ?? url ?? '#'} target="_blank" rel="noopener noreferrer" className="group block">
                  <SmartImage src={image.src} alt={image.alt} sizes="(min-width: 1024px) 16vw, 33vw" className="aspect-square rounded-xl" imgClassName="transition duration-500 group-hover:scale-105" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  )
}
