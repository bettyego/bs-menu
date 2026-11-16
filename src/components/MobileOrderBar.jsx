import { ChevronRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatNaira } from '../utils/currency'

/**
 * Sticky "View order" bar on phones and tablets, shown once the cart has items,
 * so customers can always reach checkout without scrolling back to the header.
 */
export default function MobileOrderBar() {
  const { totals, isOpen, openCart } = useCart()
  if (totals.count === 0 || isOpen) return null

  return (
    <>
    {/* Spacer so the fixed bar never covers the bottom of the footer */}
    <div className="h-20 lg:hidden" aria-hidden="true" />
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-12px_rgb(44_26_69/0.25)] backdrop-blur lg:hidden">
      <button
        type="button"
        onClick={openCart}
        className="mx-auto flex w-full max-w-xl items-center gap-3 rounded-full bg-brand py-2 pl-2 pr-4 text-left text-white transition hover:bg-brand-dark"
      >
        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
          <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold">{totals.count}</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">View your order</span>
          <span className="block truncate text-xs text-white/75">
            {totals.count} item{totals.count === 1 ? '' : 's'} · {totals.allUnpriced ? 'Prices on request' : formatNaira(totals.subtotal)}
          </span>
        </span>
        <ChevronRight className="h-5 w-5 shrink-0" aria-hidden="true" />
      </button>
    </div>
    </>
  )
}
