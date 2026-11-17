import { Quote } from 'lucide-react'
import { Container, EditorNote, SectionHeading } from './ui'
import { reviews } from '../data/contentData'

/**
 * Customer reviews from contentData.js → reviews.
 * Hidden on the live site until reviews.enabled is true AND at least one genuine review is added.
 */
export default function Testimonials() {
  if (!reviews.enabled || !reviews.items.length) {
    return import.meta.env.DEV ? (
      <Container className="py-10">
        <EditorNote title="Customer reviews (currently hidden)">
          When you have genuine feedback, add it to <code>reviews.items</code> in <code>src/data/contentData.js</code> and set <code>reviews.enabled: true</code>. The reviews section then appears here.
        </EditorNote>
      </Container>
    ) : null
  }

  return (
    <section className="bg-lavender py-16 sm:py-24" aria-labelledby="reviews-title">
      <Container>
        <SectionHeading eyebrow="Kind words" title={<span id="reviews-title">{reviews.title}</span>} align="center" />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.items.map((review) => (
            <li key={`${review.name}-${review.quote.slice(0, 20)}`} className="flex flex-col rounded-2xl bg-white p-6 shadow-card sm:p-7">
              <Quote className="h-7 w-7 text-accent" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-base leading-7 text-ink">“{review.quote}”</blockquote>
              <p className="mt-6 border-t border-line pt-4 text-sm">
                <span className="font-semibold text-ink">{review.name}</span>
                {review.context && <span className="block text-muted">{review.context}</span>}
                {review.source && <span className="block text-xs text-muted/80">via {review.source}</span>}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
