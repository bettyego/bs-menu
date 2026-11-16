import { useState } from 'react'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import FormField from './FormField'
import { buttonClass } from '../utils/styles'
import { businessConfig } from '../config/businessConfig'
import { useCart } from '../context/CartContext'
import { formatNaira } from '../utils/currency'
import { isValidPhone, todayISO } from '../utils/validation'
import { buildOrderMessage, getDeliveryFee, openWhatsApp } from '../utils/whatsapp'

/** Checkout step: collects customer details and opens WhatsApp with the formatted order. */
export default function OrderForm({ details, setDetails, onBack, onSent }) {
  const { items, totals } = useCart()
  const [errors, setErrors] = useState({})
  const set = (key) => (value) => setDetails((current) => ({ ...current, [key]: value }))
  const isPickup = details.fulfilment === 'Pickup'
  const deliveryFee = getDeliveryFee(details.fulfilment)

  function validate() {
    const next = {}
    if (!details.name.trim()) next.name = 'Please enter your name.'
    if (!details.phone.trim()) next.phone = 'Please enter your phone number.'
    else if (!isValidPhone(details.phone)) next.phone = 'Please enter a valid phone number.'
    if (!isPickup && !details.location.trim()) next.location = 'Please enter your delivery location.'
    if (!details.date) next.date = 'Please choose a preferred date.'
    else if (details.date < todayISO()) next.date = 'Please choose a date from today onwards.'
    return next
  }

  function handleSubmit(event) {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      document.getElementById(`order-${first}`)?.focus()
      return
    }
    const message = buildOrderMessage(items, { ...details, location: isPickup ? details.location || 'Pickup' : details.location })
    openWhatsApp(message)
    onSent(message)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to your order
        </button>
        <p className="text-sm leading-6 text-muted">Add your details and we’ll prepare a WhatsApp message with your full order for you to send.</p>

        <FormField id="order-name" label="Your name" value={details.name} onChange={set('name')} error={errors.name} required />
        <FormField id="order-phone" label="Phone number" type="tel" value={details.phone} onChange={set('phone')} error={errors.phone} placeholder="e.g. 0803 000 0000" required />
        {businessConfig.fulfilmentOptions.length > 1 && (
          <fieldset>
            <legend className="text-sm font-semibold text-ink">Delivery or pickup</legend>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              {businessConfig.fulfilmentOptions.map((option) => (
                <label key={option} className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition has-focus-visible:ring-2 has-focus-visible:ring-accent ${details.fulfilment === option ? 'border-brand bg-lavender text-brand' : 'border-line text-ink'}`}>
                  <input type="radio" name="fulfilment" value={option} checked={details.fulfilment === option} onChange={() => set('fulfilment')(option)} className="sr-only" />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        <FormField
          id="order-location"
          label={isPickup ? 'Your area (optional)' : 'Delivery location'}
          value={details.location}
          onChange={set('location')}
          error={errors.location}
          placeholder="e.g. Wuse 2, Abuja"
          required={!isPickup}
          hint={isPickup ? 'Pickup arrangements will be confirmed on WhatsApp.' : 'Delivery charges, if any, will be confirmed on WhatsApp.'}
        />
        <FormField id="order-date" label="Preferred delivery date" type="date" min={todayISO()} value={details.date} onChange={set('date')} error={errors.date} required hint="Subject to availability — we’ll confirm on WhatsApp." />
        <FormField id="order-notes" label="Special instructions" type="textarea" value={details.notes} onChange={set('notes')} placeholder="Spice level, preferred delivery time, allergies…" />
      </div>

      <div className="border-t border-line bg-white px-5 py-4">
        <div className="mb-3 flex items-baseline justify-between text-sm">
          <span className="text-muted">{totals.count} item{totals.count === 1 ? '' : 's'}</span>
          <span className="font-semibold text-ink">{totals.allUnpriced ? 'Prices on request' : formatNaira(totals.subtotal)}</span>
        </div>
        {deliveryFee !== null && (
          <div className="-mt-2 mb-3 flex items-baseline justify-between text-sm">
            <span className="text-muted">Delivery fee</span>
            <span className="font-medium text-ink">{formatNaira(deliveryFee)}</span>
          </div>
        )}
        <button type="submit" className={buttonClass('primary', 'lg', 'w-full')}>
          <MessageCircle className="h-5 w-5" aria-hidden="true" /> Proceed to WhatsApp
        </button>
        <p className="mt-2 text-center text-[11px] leading-4 text-muted">You’ll review and send the message in WhatsApp. Your order is confirmed only after B’s Menu replies.</p>
      </div>
    </form>
  )
}
