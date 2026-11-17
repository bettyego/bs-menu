import { useEffect, useId, useState } from 'react'
import { CalendarClock, Check, Minus, Plus, ShoppingBag } from 'lucide-react'
import { SmartImage } from './ui'
import { useCart } from '../context/CartContext'
import { getCategoryName } from '../data/menuData'
import { weeklyMenuItemIds } from '../data/contentData'
import { formatNaira, PRICE_ON_REQUEST } from '../utils/currency'
import { getStartingPrice, getUnitPrice } from '../utils/pricing'

export function QuantityStepper({ value, onChange, min = 1, label, size = 'md' }) {
  const box = size === 'sm' ? 'h-8 w-8' : 'h-11 w-9'
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

/** Pill-shaped radio option. `note` is a small second line (e.g. a price). */
function Choice({ name, value, checked, onChange, disabled, label, note }) {
  return (
    <label className={`flex cursor-pointer flex-col rounded-xl border px-3 py-2 text-xs leading-tight transition has-focus-visible:ring-2 has-focus-visible:ring-accent ${checked ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:border-brand/60'} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}>
      <input type="radio" className="sr-only" name={name} value={value} checked={checked} onChange={onChange} disabled={disabled} />
      <span className="font-semibold">{label}</span>
      {note && <span className={`mt-0.5 text-[11px] ${checked ? 'text-white/80' : 'text-muted'}`}>{note}</span>}
    </label>
  )
}

const inWeeklyMenu = (id) => weeklyMenuItemIds.includes(id)

/**
 * Menu item card with size, protein and quantity selection.
 * `anchor` adds id="item-<id>" so links like #/menu?item=egusi-soup can scroll to it.
 */
export default function FoodCard({ product, anchor = false, highlighted = false }) {
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
  const size = product.sizes?.find((entry) => entry.id === sizeId)
  const protein = product.proteins?.find((entry) => entry.id === proteinId)
  const selectionLabel = [size?.label, protein?.label].filter(Boolean).join(' · ')

  function handleAdd() {
    addItem(product.id, sizeId, proteinId, quantity)
    setQuantity(1)
    setJustAdded(true)
  }

  return (
    <article
      id={anchor ? `item-${product.id}` : undefined}
      className={`group flex h-full scroll-mt-40 flex-col overflow-hidden rounded-2xl border bg-white shadow-card transition duration-300 hover:shadow-lift ${highlighted ? 'border-accent ring-4 ring-accent/25' : 'border-line'}`}
    >
      <div className="relative">
        <SmartImage src={product.image} alt={product.imageAlt ?? product.name} className="aspect-[16/10] sm:aspect-[4/3]" imgClassName="transition duration-500 group-hover:scale-[1.03]" />
        <div className="absolute inset-x-3 top-3 flex flex-wrap items-start justify-between gap-2">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brand shadow-sm">{getCategoryName(product.category)}</span>
          {!available ? (
            <span className="rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-semibold text-white">Currently unavailable</span>
          ) : inWeeklyMenu(product.id) ? (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">On this week’s menu</span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-[1.35rem] leading-snug text-ink">{product.name}</h3>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 text-sm">
          {startingPrice === null ? (
            <span className="font-semibold text-brand">{PRICE_ON_REQUEST}</span>
          ) : (
            <span className="font-semibold text-brand">From {formatNaira(startingPrice)}</span>
          )}
          {product.pricingUnit && <span className="text-muted">· sold {product.pricingUnit}</span>}
        </p>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-muted">{product.description}</p>

        <div className="mt-4 space-y-3.5">
          {hasSizes && (
            <fieldset>
              <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink">Choose size</legend>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((entry) => (
                  <Choice
                    key={entry.id}
                    name={`${uid}-size`}
                    value={entry.id}
                    checked={entry.id === sizeId}
                    onChange={() => setSizeId(entry.id)}
                    disabled={!available}
                    label={entry.label}
                    note={typeof entry.price === 'number' ? formatNaira(entry.price) : null}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {hasProteins && (
            <fieldset>
              <legend className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink">
                Choose protein <span className="font-normal normal-case tracking-normal text-muted">({product.proteins.length} options)</span>
              </legend>
              <div className="flex flex-wrap gap-1.5">
                {product.proteins.map((entry) => (
                  <Choice
                    key={entry.id}
                    name={`${uid}-protein`}
                    value={entry.id}
                    checked={entry.id === proteinId}
                    onChange={() => setProteinId(entry.id)}
                    disabled={!available}
                    label={entry.label}
                    note={typeof entry.extraPrice === 'number' && entry.extraPrice > 0 ? `+${formatNaira(entry.extraPrice)}` : null}
                  />
                ))}
              </div>
            </fieldset>
          )}
        </div>

        <div className="mt-auto pt-4">
          <div className="mb-3 flex items-end justify-between gap-3 border-t border-line pt-3.5">
            <span className="min-w-0 text-xs leading-5 text-muted">
              Your selection
              {selectionLabel && <span className="block truncate font-medium text-ink">{selectionLabel}</span>}
            </span>
            <span className="shrink-0 text-right text-sm font-semibold text-ink" aria-live="polite">
              {typeof unitPrice === 'number' ? formatNaira(unitPrice) : <span className="text-xs font-medium text-muted">Price to confirm</span>}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <QuantityStepper value={quantity} onChange={setQuantity} label={product.name} />
            <button
              type="button"
              onClick={handleAdd}
              disabled={!available}
              className={`inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-muted/40 ${justAdded ? 'bg-emerald-600' : 'bg-brand hover:bg-brand-dark'}`}
            >
              {justAdded ? <Check className="h-4 w-4" aria-hidden="true" /> : <ShoppingBag className="h-4 w-4" aria-hidden="true" />}
              {justAdded ? 'Added' : 'Add to Order'}
            </button>
          </div>
          {product.preOrderNote && (
            <p className="mt-2.5 flex gap-1.5 text-[11px] leading-4 text-muted">
              <CalendarClock className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
              {product.preOrderNote}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}
