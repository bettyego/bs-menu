import { useEffect, useId, useState } from 'react'
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { SmartImage } from './ui'
import { useCart } from '../context/CartContext'
import { getCategoryName } from '../data/menuData'
import { formatNaira, PRICE_ON_REQUEST } from '../utils/currency'
import { getStartingPrice, getUnitPrice } from '../utils/pricing'

export function QuantityStepper({ value, onChange, min = 1, label, size = 'md' }) {
  const box = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white" role="group" aria-label={`Quantity for ${label}`}>
      <button type="button" className={`grid ${box} place-items-center rounded-full text-ink transition hover:bg-lavender disabled:opacity-40`} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease quantity of ${label}`}>
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="min-w-7 text-center text-sm font-semibold tabular-nums" aria-live="polite">{value}</span>
      <button type="button" className={`grid ${box} place-items-center rounded-full text-ink transition hover:bg-lavender`} onClick={() => onChange(value + 1)} aria-label={`Increase quantity of ${label}`}>
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export default function FoodCard({ product }) {
  const uid = useId()
  const { addItem } = useCart()
  const hasSizes = product.sizes?.length > 0
  const hasProteins = product.proteins?.length > 0
  const [sizeId, setSizeId] = useState(hasSizes ? product.sizes[0].id : null)
  const [proteinId, setProteinId] = useState(hasProteins ? product.proteins[0].id : null)
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) return undefined
    const timer = setTimeout(() => setJustAdded(false), 1800)
    return () => clearTimeout(timer)
  }, [justAdded])

  const unitPrice = getUnitPrice(product, sizeId, proteinId)
  const startingPrice = getStartingPrice(product)
  const available = product.available !== false

  function handleAdd() {
    addItem(product.id, sizeId, proteinId, quantity)
    setQuantity(1)
    setJustAdded(true)
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative">
        <SmartImage src={product.image} alt={product.imageAlt ?? product.name} className="aspect-[4/3]" imgClassName="transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brand shadow-sm">{getCategoryName(product.category)}</span>
        {!available && <span className="absolute right-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-semibold text-white">Currently unavailable</span>}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-snug text-ink">{product.name}</h3>
          <p className="shrink-0 pt-1 text-right text-sm">
            {startingPrice === null ? (
              <span className="font-medium text-muted">{PRICE_ON_REQUEST}</span>
            ) : (
              <>
                <span className="block text-[11px] text-muted">from</span>
                <span className="font-semibold text-brand">{formatNaira(startingPrice)}</span>
              </>
            )}
          </p>
        </div>
        <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted">{product.description}</p>
        {product.pricingUnit && <p className="mt-2 text-xs font-medium uppercase tracking-wide text-accent-dark">Sold {product.pricingUnit}</p>}

        <div className="mt-4 space-y-3">
          {hasSizes && (
            <fieldset>
              <legend className="mb-1.5 text-xs font-semibold text-ink">Size</legend>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => {
                  const selected = size.id === sizeId
                  return (
                    <label key={size.id} className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition has-focus-visible:ring-2 has-focus-visible:ring-accent ${selected ? 'border-brand bg-brand text-white' : 'border-line text-ink hover:border-brand'}`}>
                      <input type="radio" className="sr-only" name={`${uid}-size`} value={size.id} checked={selected} onChange={() => setSizeId(size.id)} disabled={!available} />
                      {size.label}
                    </label>
                  )
                })}
              </div>
            </fieldset>
          )}

          {hasProteins && (
            <div>
              <label htmlFor={`${uid}-protein`} className="mb-1.5 block text-xs font-semibold text-ink">Protein</label>
              <select id={`${uid}-protein`} value={proteinId ?? ''} onChange={(event) => setProteinId(event.target.value)} disabled={!available} className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/15">
                {product.proteins.map((protein) => (
                  <option key={protein.id} value={protein.id}>
                    {protein.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mt-auto pt-4">
          {startingPrice !== null && (
            <div className="mb-3 flex items-center justify-between border-t border-line pt-4">
              <span className="text-xs text-muted">Your selection</span>
              <span className="text-sm font-semibold text-ink" aria-live="polite">{formatNaira(unitPrice)}</span>
            </div>
          )}
          <div className={`flex items-center gap-2 ${startingPrice === null ? 'border-t border-line pt-4' : ''}`}>
            <QuantityStepper value={quantity} onChange={setQuantity} label={product.name} />
            <button
              type="button"
              onClick={handleAdd}
              disabled={!available}
              className={`inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-muted/40 ${justAdded ? 'bg-emerald-600' : 'bg-brand hover:bg-brand-dark'}`}
            >
              {justAdded ? <Check className="h-4 w-4" aria-hidden="true" /> : <ShoppingBag className="h-4 w-4" aria-hidden="true" />}
              {justAdded ? 'Added' : 'Add to Order'}
            </button>
          </div>
          {product.preOrderNote && <p className="mt-2.5 text-[11px] leading-4 text-muted">{product.preOrderNote}</p>}
        </div>
      </div>
    </article>
  )
}
