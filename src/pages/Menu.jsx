import { useMemo, useState } from 'react'
import { Search, SearchX, X } from 'lucide-react'
import CategoryFilter from '../components/CategoryFilter'
import FoodCard from '../components/FoodCard'
import PreOrderNotice from '../components/PreOrderNotice'
import { Container, PageHeader } from '../components/ui'
import { activeCategories, menuItems } from '../data/menuData'

function matches(product, query) {
  if (!query) return true
  const haystack = [product.name, product.description, ...(product.proteins ?? []).map((protein) => protein.label)].join(' ').toLowerCase()
  return query.toLowerCase().split(/\s+/).every((word) => haystack.includes(word))
}

export default function Menu({ params }) {
  const fromUrl = params.get('category')
  const initialCategory = activeCategories.some((category) => category.id === fromUrl) ? fromUrl : 'all'
  const [category, setCategory] = useState(initialCategory)
  const [query, setQuery] = useState('')

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

  const groups = activeCategories
    .filter((entry) => category === 'all' || entry.id === category)
    .map((entry) => ({ ...entry, products: searched.filter((product) => product.category === entry.id) }))
    .filter((group) => group.products.length)

  return (
    <>
      <PageHeader eyebrow="Our menu" title="Homemade Nigerian soups, stews, sauces & drinks" description="Choose your size, quantity and protein, add items to your order, then send everything to us on WhatsApp.">
        <PreOrderNotice className="mt-6 max-w-3xl bg-white" />
      </PageHeader>

      <div className="sticky top-[72px] z-20 border-b border-line bg-white/95 backdrop-blur">
        <Container className="flex flex-col gap-3 py-3 md:flex-row md:items-center">
          <div className="relative md:w-72 md:shrink-0">
            <label htmlFor="menu-search" className="sr-only">Search the menu</label>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="menu-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search e.g. egusi, goat meat…"
              className="w-full rounded-full border border-line bg-white py-2.5 pl-10 pr-10 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-lavender" aria-label="Clear search">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <CategoryFilter value={category} onChange={changeCategory} counts={counts} />
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <p className="sr-only" aria-live="polite">{groups.reduce((sum, group) => sum + group.products.length, 0)} items shown</p>
        {groups.length === 0 ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <SearchX className="mx-auto h-10 w-10 text-brand/60" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl">No meals found</h2>
            <p className="mt-2 text-sm text-muted">Try a different search or category — or message us on WhatsApp to ask about something specific.</p>
            <button type="button" onClick={() => { setQuery(''); changeCategory('all') }} className="mt-5 text-sm font-semibold text-brand hover:underline">Show the full menu</button>
          </div>
        ) : (
          <div className="space-y-14">
            {groups.map((group) => (
              <section key={group.id} aria-labelledby={`cat-${group.id}`}>
                <div className="mb-6 flex flex-col gap-1 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <h2 id={`cat-${group.id}`} className="font-display text-3xl text-ink">{group.name}</h2>
                  <p className="text-sm text-muted">{group.blurb}</p>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.products.map((product) => <FoodCard key={product.id} product={product} />)}
                </div>
              </section>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}
