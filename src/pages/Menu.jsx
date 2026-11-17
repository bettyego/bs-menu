import { useEffect, useMemo, useState } from 'react'
import { Beef, MessageCircle, Ruler, Search, SearchX, Sparkles, Tag, X } from 'lucide-react'
import CategoryFilter from '../components/CategoryFilter'
import FoodCard from '../components/FoodCard'
import PreOrderNotice from '../components/PreOrderNotice'
import DeliveryInfo from '../components/DeliveryInfo'
import Bundles from '../components/Bundles'
import { Container, PageHeader, SectionHeading, SmartImage } from '../components/ui'
import { buttonClass } from '../utils/styles'
import { activeCategories, menuItems } from '../data/menuData'
import { formatNaira, PRICE_ON_REQUEST } from '../utils/currency'
import { getStartingPrice } from '../utils/pricing'
import { buildWhatsAppUrl } from '../utils/whatsapp'

function matches(product, query) {
  if (!query) return true
  const haystack = [product.name, product.description, ...(product.proteins ?? []).map((protein) => protein.label)].join(' ').toLowerCase()
  return query.toLowerCase().split(/\s+/).every((word) => haystack.includes(word))
}

const pricingGuide = [
  { icon: Ruler, title: 'Pick a size', text: 'Soups, stews and most sauces are sold by the litre (1L, 2L, 3L). Drinks come by the bottle.' },
  { icon: Beef, title: 'Choose your protein', text: 'Where offered, choose assorted meat, goat meat, beef, chicken or fish. Each choice is its own order line.' },
  { icon: Tag, title: 'See your price', text: 'Your price updates as you choose. “Price on request” means we confirm the exact price on WhatsApp first.' },
]

function scrollToItem(id) {
  const element = document.getElementById(`item-${id}`)
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

/** Compact strip of featured dishes that jump to their full card below. */
function FeaturedStrip({ onSelect }) {
  const featured = menuItems.filter((item) => item.featured && item.available !== false)
  if (!featured.length) return null
  return (
    <section aria-labelledby="menu-featured-title" className="mb-14">
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-accent" aria-hidden="true" />
        <h2 id="menu-featured-title" className="font-display text-2xl text-ink sm:text-3xl">Featured meals</h2>
      </div>
      <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
        {featured.map((item) => {
          const price = getStartingPrice(item)
          return (
            <li key={item.id} className="w-[62%] shrink-0 snap-start sm:w-auto">
              <button type="button" onClick={() => onSelect(item.id)} className="group block w-full overflow-hidden rounded-2xl border border-line bg-white text-left shadow-card transition hover:border-brand/40 hover:shadow-lift">
                <SmartImage src={item.image} alt="" sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 62vw" className="aspect-[4/3]" imgClassName="transition duration-500 group-hover:scale-[1.04]" />
                <span className="block p-3.5">
                  <span className="block font-display text-lg leading-snug text-ink">{item.name}</span>
                  <span className="mt-0.5 block text-xs font-semibold text-brand">{price === null ? PRICE_ON_REQUEST : `From ${formatNaira(price)}`}</span>
                  <span className="mt-2 block text-xs font-medium text-muted group-hover:text-brand">Choose options ↓</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default function Menu({ params }) {
  const fromUrl = params.get('category')
  const linkedItem = menuItems.find((item) => item.id === params.get('item'))?.id ?? null
  const initialCategory = !linkedItem && activeCategories.some((category) => category.id === fromUrl) ? fromUrl : 'all'
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState('')
  const [highlighted, setHighlighted] = useState(linkedItem)

  const searched = useMemo(() => menuItems.filter((product) => matches(product, query.trim())), [query])
  const counts = useMemo(() => {
    const result = { all: searched.length }
    for (const entry of activeCategories) result[entry.id] = searched.filter((product) => product.category === entry.id).length
    return result
  }, [searched])

  function changeCategory(next) {
    setCategory(next)
    // Keep the URL shareable without adding a history entry for every click.
    window.history.replaceState(null, '', next === 'all' ? '#/menu' : `#/menu?category=${next}`)
  }

  function selectItem(id) {
    setHighlighted(id)
    scrollToItem(id)
  }

  // Links like #/menu?item=egusi-soup (from the weekly menu) scroll to and highlight that dish.
  useEffect(() => {
    if (!linkedItem) return undefined
    const timer = setTimeout(() => scrollToItem(linkedItem), 120)
    return () => clearTimeout(timer)
  }, [linkedItem])

  useEffect(() => {
    if (!highlighted) return undefined
    const timer = setTimeout(() => setHighlighted(null), 2600)
    return () => clearTimeout(timer)
  }, [highlighted])

  const groups = activeCategories
    .filter((entry) => category === 'all' || entry.id === category)
    .map((entry) => ({ ...entry, products: searched.filter((product) => product.category === entry.id) }))
    .filter((group) => group.products.length)

  const showFeatured = category === 'all' && !query.trim()

  return (
    <>
      <PageHeader eyebrow="Our menu" title="Homemade Nigerian soups, stews, sauces & drinks" description="Choose your size, protein and quantity, add meals to your order, then send everything to us on WhatsApp. This is a selection of what we cook — ask us on WhatsApp about other meals and drinks.">
        <ol className="no-scrollbar -mx-4 mt-8 flex snap-x gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0" aria-label="How pricing works">
          {pricingGuide.map((step, index) => (
            <li key={step.title} className="flex w-[82%] shrink-0 snap-start gap-3 rounded-2xl bg-white p-4 shadow-card md:w-auto">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white"><step.icon className="h-5 w-5" aria-hidden="true" /></span>
              <div>
                <h2 className="text-sm font-semibold text-ink"><span className="text-accent">{index + 1}.</span> {step.title}</h2>
                <p className="mt-0.5 text-[13px] leading-5 text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <PreOrderNotice compact className="mt-4 bg-white" />
      </PageHeader>

      <div className="sticky top-[72px] z-20 border-b border-line bg-white/95 shadow-[0_6px_16px_-14px_rgb(44_26_69/0.35)] backdrop-blur">
        <Container className="flex flex-col gap-3 py-3 md:flex-row md:items-center">
          <CategoryFilter value={category} onChange={changeCategory} counts={counts} />
          <div className="relative md:ml-auto md:w-72 md:shrink-0">
            <label htmlFor="menu-search" className="sr-only">Search the menu</label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search e.g. egusi, goat meat…"
              className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-10 text-base outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 sm:text-sm [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-lavender" aria-label="Clear search">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        {showFeatured && <FeaturedStrip onSelect={selectItem} />}

        <p className="sr-only" aria-live="polite">{groups.reduce((sum, group) => sum + group.products.length, 0)} items shown</p>
        {groups.length === 0 ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <SearchX className="mx-auto h-10 w-10 text-brand/60" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl">No meals found</h2>
            <p className="mt-2 text-sm text-muted">Try a different search or category — or message us on WhatsApp to ask about something specific.</p>
            <button type="button" onClick={() => { setQuery(''); changeCategory('all') }} className="mt-5 text-sm font-semibold text-brand hover:underline">Show the full menu</button>
          </div>
        ) : (
          <div className="space-y-16">
            {groups.map((group) => (
              <section key={group.id} aria-labelledby={`cat-${group.id}`}>
                <div className="mb-6 flex flex-col gap-1 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <h2 id={`cat-${group.id}`} className="font-display text-3xl text-ink">
                    {group.name} <span className="align-middle text-sm font-sans font-medium text-muted">({group.products.length})</span>
                  </h2>
                  <p className="text-sm text-muted">{group.blurb}</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.products.map((product) => <FoodCard key={product.id} product={product} anchor highlighted={highlighted === product.id} />)}
                </div>
              </section>
            ))}
          </div>
        )}
      </Container>

      <Bundles />

      <section className="bg-lavender py-16 sm:py-20" aria-labelledby="menu-delivery-title">
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Before you order" title={<span id="menu-delivery-title">Pre-order, delivery & payment</span>} />
            <a href={buildWhatsAppUrl('Hello B’s Menu! I have a question about the menu.')} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'md', 'self-start lg:self-auto')}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Can’t find something? Ask us
            </a>
          </div>
          <DeliveryInfo className="mt-8" />
        </Container>
      </section>
    </>
  )
}
