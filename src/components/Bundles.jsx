import { Check, MessageCircle, Users } from 'lucide-react'
import { Container, EditorNote, SectionHeading, SmartImage } from './ui'
import { buttonClass } from '../utils/styles'
import { bundles } from '../data/contentData'
import { formatNaira, PRICE_ON_REQUEST } from '../utils/currency'
import { buildWhatsAppUrl } from '../utils/whatsapp'

/** Optional meal bundles & packages from contentData.js. Hidden on the live site while empty. */
export default function Bundles({ tone = 'white' }) {
  if (!bundles.enabled) return null
  if (!bundles.items.length) {
    return import.meta.env.DEV ? (
      <Container className="py-10">
        <EditorNote title="Meal bundles & packages (optional)">
          Add packages to <code>bundles.items</code> in <code>src/data/contentData.js</code> — there is a full example in the comments. Set <code>enabled: false</code> to switch the section off entirely.
        </EditorNote>
      </Container>
    ) : null
  }

  return (
    <section className={`py-16 sm:py-24 ${tone === 'lavender' ? 'bg-lavender' : 'bg-white'}`} aria-labelledby="bundles-title">
      <Container>
        <SectionHeading eyebrow="Bundles & packages" title={<span id="bundles-title">{bundles.title}</span>} description={bundles.description} />
        <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {bundles.items.map((bundle) => (
            <li key={bundle.id} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card">
              {bundle.image && <SmartImage src={bundle.image} alt={bundle.imageAlt ?? bundle.name} className="aspect-[16/10]" />}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-display text-2xl text-ink">{bundle.name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand">{typeof bundle.price === 'number' ? formatNaira(bundle.price) : PRICE_ON_REQUEST}</p>
                {bundle.description && <p className="mt-2 text-sm leading-6 text-muted">{bundle.description}</p>}
                {bundle.serves && (
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-dark">
                    <Users className="h-4 w-4" aria-hidden="true" /> {bundle.serves}
                  </p>
                )}
                {bundle.includes?.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {bundle.includes.map((entry) => (
                      <li key={entry} className="flex gap-2 text-sm text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{entry}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-5">
                  <a
                    href={buildWhatsAppUrl(`Hello B’s Menu! I would like to order the ${bundle.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass('primary', 'md', 'w-full')}
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" /> Order this package
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
