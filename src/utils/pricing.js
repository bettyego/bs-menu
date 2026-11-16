/**
 * Price resolution for a product + selected size + selected protein.
 * Returns a number, or null when the price has not been configured ("Price on request").
 */
export function getUnitPrice(product, sizeId, proteinId) {
  const key = `${sizeId ?? ''}|${proteinId ?? ''}`
  const override = product.priceOverrides?.[key]
  if (typeof override === 'number') return override

  const size = product.sizes?.find((entry) => entry.id === sizeId)
  const base = size ? size.price : product.price
  if (typeof base !== 'number') return null

  const protein = product.proteins?.find((entry) => entry.id === proteinId)
  if (!protein) return base
  if (typeof protein.extraPrice !== 'number') return null
  return base + protein.extraPrice
}

/** Lowest configured price for a product, used for "From ₦…" on cards. */
export function getStartingPrice(product) {
  const sizeIds = product.sizes?.length ? product.sizes.map((size) => size.id) : [undefined]
  const proteinIds = product.proteins?.length ? product.proteins.map((protein) => protein.id) : [undefined]
  const prices = sizeIds
    .flatMap((sizeId) => proteinIds.map((proteinId) => getUnitPrice(product, sizeId, proteinId)))
    .filter((price) => typeof price === 'number')
  return prices.length ? Math.min(...prices) : null
}

/** Unique key for a cart configuration: same product + size + protein merge; anything else is separate. */
export function getCartKey(productId, sizeId, proteinId) {
  return [productId, sizeId ?? '-', proteinId ?? '-'].join('::')
}
