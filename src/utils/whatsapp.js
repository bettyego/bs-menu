import { businessConfig } from '../config/businessConfig'
import { formatNaira } from './currency'

/** Builds a wa.me link with an optional pre-filled, URL-encoded message. */
export function buildWhatsAppUrl(message = '') {
  const number = String(businessConfig.whatsappNumber || '').replace(/\D/g, '')
  const base = `https://wa.me/${number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function openWhatsApp(message) {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
}

function formatDate(value) {
  if (!value) return 'Not specified'
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-NG', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })
}

/** Configured delivery fee for this fulfilment choice, or null when none applies. */
export function getDeliveryFee(fulfilment) {
  if (fulfilment === 'Pickup') return null
  return typeof businessConfig.deliveryFee === 'number' ? businessConfig.deliveryFee : null
}

const line = (label, value) => `${label}: ${value && String(value).trim() ? String(value).trim() : 'Not specified'}`

/**
 * Creates the order message sent to B's Menu.
 * @param {Array} items cart lines: { name, sizeLabel, proteinLabel, quantity, unitPrice }
 * @param {Object} customer { name, phone, location, date, fulfilment, notes }
 */
export function buildOrderMessage(items, customer) {
  const itemLines = items.map((item, index) => {
    const details = [item.sizeLabel, item.proteinLabel].filter(Boolean).join(' — ')
    const hasPrice = typeof item.unitPrice === 'number'
    const pricing = hasPrice
      ? `${item.quantity} × ${formatNaira(item.unitPrice)} = ${formatNaira(item.unitPrice * item.quantity)}`
      : `Qty ${item.quantity} — Price on request`
    return `${index + 1}. ${item.name}${details ? ` — ${details}` : ''}\n    ${pricing}`
  })

  const pricedTotal = items.reduce(
    (sum, item) => (typeof item.unitPrice === 'number' ? sum + item.unitPrice * item.quantity : sum),
    0,
  )
  const unpricedCount = items.filter((item) => typeof item.unitPrice !== 'number').length
  let subtotalLine = `Subtotal: ${formatNaira(pricedTotal)}`
  if (unpricedCount === items.length) subtotalLine = 'Subtotal: To be confirmed (prices on request)'
  else if (unpricedCount) subtotalLine += ` (plus ${unpricedCount} item${unpricedCount > 1 ? 's' : ''} priced on request)`

  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0)

  // Delivery fee only appears when configured in businessConfig and the customer chose delivery.
  const fee = getDeliveryFee(customer.fulfilment)
  const feeLines = fee === null
    ? []
    : [`Delivery fee: ${formatNaira(fee)}`, `Total: ${formatNaira(pricedTotal + fee)}${unpricedCount ? ' (excluding items priced on request)' : ''}`]

  return [
    `Hello ${businessConfig.name}!`,
    '',
    'I would like to place a food order.',
    '',
    line('Customer Name', customer.name),
    line('Phone Number', customer.phone),
    line('Delivery Location', customer.location),
    line('Preferred Date', formatDate(customer.date)),
    customer.fulfilment ? line('Delivery / Pickup', customer.fulfilment) : null,
    '',
    'MY ORDER:',
    '',
    ...itemLines,
    '',
    `Total items: ${totalQty}`,
    subtotalLine,
    ...feeLines,
    '',
    line('Additional Instructions', customer.notes || 'None'),
    '',
    'Please confirm availability, delivery arrangements, and payment instructions.',
    '',
    'Thank you!',
  ]
    .filter((entry) => entry !== null)
    .join('\n')
}

/** Generic enquiry message for services and catering forms. */
export function buildEnquiryMessage(title, fields) {
  return [
    `Hello ${businessConfig.name}!`,
    '',
    title,
    '',
    ...fields.map(([label, value, isDate]) => line(label, isDate ? formatDate(value) : value)),
    '',
    'Please let me know availability and a quote. Thank you!',
  ].join('\n')
}
