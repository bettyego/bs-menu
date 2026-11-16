import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, MessageCircle, ShoppingBag, Trash2, X } from 'lucide-react'
import OrderForm from './OrderForm'
import PreOrderNotice from './PreOrderNotice'
import { QuantityStepper } from './FoodCard'
import { SmartImage } from './ui'
import { buttonClass } from '../utils/styles'
import { useCart } from '../context/CartContext'
import { businessConfig } from '../config/businessConfig'
import { formatNaira, PRICE_ON_REQUEST } from '../utils/currency'
import { href } from '../utils/router'
import { openWhatsApp } from '../utils/whatsapp'

const emptyOrderDetails = { name: '', phone: '', location: '', date: '', fulfilment: businessConfig.fulfilmentOptions[0] ?? '', notes: '' }

/**
 * Cart drawer wrapper. Customer details live here so they survive closing and reopening the drawer;
 * the drawer itself mounts fresh on each open, so it always starts on the review step.
 */
export default function ShoppingCart() {
  const { isOpen } = useCart()
  const [details, setDetails] = useState(emptyOrderDetails)
  if (!isOpen) return null
  return <CartDrawer details={details} setDetails={setDetails} />
}

/** Slide-in cart drawer with three steps: review → details → sent. */
function CartDrawer({ details, setDetails }) {
  const { items, totals, closeCart, updateQuantity, removeItem, clearCart } = useCart()
  const [step, setStep] = useState('cart')
  const [lastMessage, setLastMessage] = useState('')
  const panelRef = useRef(null)
  const closeRef = useRef(null)

  // Lock page scroll while open, focus the close button, and restore focus on close.
  useEffect(() => {
    const previousFocus = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      previousFocus?.focus?.()
    }
  }, [])

  // Escape closes; Tab is kept inside the drawer.
  useEffect(() => {
    function onKey(event) {
      if (event.key === 'Escape') closeCart()
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select, textarea')
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeCart])

  const title = step === 'details' ? 'Your details' : step === 'sent' ? 'Almost done' : 'Your order'

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={closeCart} aria-hidden="true" />
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="cart-title" className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 id="cart-title" className="font-display text-2xl text-ink">{title}</h2>
            {step === 'cart' && <p className="text-xs text-muted">{totals.count} item{totals.count === 1 ? '' : 's'} selected</p>}
          </div>
          <button ref={closeRef} type="button" onClick={closeCart} className="grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-lavender" aria-label="Close order">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {step === 'sent' ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <CheckCircle2 className="h-14 w-14 text-brand" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl">WhatsApp is opening</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Your order message has been prepared. <strong className="text-ink">Please press send in WhatsApp</strong> — your order is only placed once {businessConfig.name} receives it and confirms availability, delivery and payment with you.
            </p>
            <p className="mt-3 text-xs text-muted">WhatsApp didn’t open? Check that pop-ups are allowed, then try again.</p>
            <div className="mt-6 flex w-full flex-col gap-2">
              <button type="button" onClick={() => openWhatsApp(lastMessage)} className={buttonClass('outline', 'md', 'w-full')}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Open WhatsApp again
              </button>
              <button type="button" onClick={() => { clearCart(); closeCart() }} className={buttonClass('primary', 'md', 'w-full')}>I’ve sent it — clear my order</button>
              <button type="button" onClick={closeCart} className="py-2 text-sm font-medium text-muted hover:text-brand">Keep my order and close</button>
            </div>
          </div>
        ) : step === 'details' ? (
          <OrderForm details={details} setDetails={setDetails} onBack={() => setStep('cart')} onSent={(message) => { setLastMessage(message); setStep('sent') }} />
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-lavender text-brand"><ShoppingBag className="h-7 w-7" aria-hidden="true" /></div>
            <h3 className="mt-4 font-display text-2xl">Your order is empty</h3>
            <p className="mt-2 text-sm text-muted">Browse our soups, stews, sauces and drinks to get started.</p>
            <a href={href('menu')} onClick={closeCart} className={buttonClass('primary', 'md', 'mt-6')}>Explore Our Menu</a>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3 py-4">
                  <SmartImage src={item.image} alt={item.imageAlt ?? item.name} className="h-20 w-20 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold leading-snug text-ink">{item.name}</h3>
                        <p className="mt-0.5 text-xs text-muted">{[item.sizeLabel, item.proteinLabel].filter(Boolean).join(' · ')}</p>
                        <p className="mt-0.5 text-xs text-muted">{formatNaira(item.unitPrice)}{typeof item.unitPrice === 'number' ? ' each' : ''}</p>
                      </div>
                      <button type="button" onClick={() => removeItem(item.key)} className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${item.name} from order`}>
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QuantityStepper size="sm" value={item.quantity} min={1} onChange={(quantity) => updateQuantity(item.key, quantity)} label={item.name} />
                      <span className="text-sm font-semibold text-ink">{item.lineTotal === null ? PRICE_ON_REQUEST : formatNaira(item.lineTotal)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-line bg-white px-5 py-4">
              <PreOrderNotice compact />
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between"><dt className="text-muted">Total items</dt><dd className="font-medium">{totals.count}</dd></div>
                <div className="flex justify-between text-base"><dt className="font-semibold">Subtotal</dt><dd className="font-semibold text-brand">{totals.allUnpriced ? 'To be confirmed' : formatNaira(totals.subtotal)}</dd></div>
              </dl>
              {totals.unpricedLines > 0 && (
                <p className="text-xs leading-5 text-muted">
                  {totals.allUnpriced ? 'Prices for your selections will be confirmed on WhatsApp.' : `${totals.unpricedLines} item${totals.unpricedLines > 1 ? 's are' : ' is'} priced on request and not included in the subtotal.`}
                </p>
              )}
              <p className="text-xs text-muted">
                {typeof businessConfig.deliveryFee === 'number'
                  ? `Delivery fee of ${formatNaira(businessConfig.deliveryFee)} is added at checkout if you choose delivery. Payment details are confirmed on WhatsApp.`
                  : 'Delivery charges and payment details are confirmed on WhatsApp.'}
              </p>
              <button type="button" onClick={() => setStep('details')} className={buttonClass('primary', 'lg', 'w-full')}>
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> Proceed to WhatsApp
              </button>
              <button type="button" onClick={clearCart} className="w-full py-1 text-xs font-medium text-muted hover:text-red-600">Clear order</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
