const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

export const PRICE_ON_REQUEST = 'Price on request'

/** Formats a number as Nigerian naira, e.g. 12500 → "₦12,500". */
export function formatNaira(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return PRICE_ON_REQUEST
  return nairaFormatter.format(amount)
}
