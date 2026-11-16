import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { menuItems } from '../data/menuData'
import { getCartKey, getUnitPrice } from '../utils/pricing'

const STORAGE_KEY = 'bs-menu-cart-v1'
const CartContext = createContext(null)

function loadCart() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(saved) ? saved.filter((line) => line && line.key && line.quantity > 0) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable (private mode) — cart still works for this visit */
    }
  }, [lines])

  const addItem = useCallback((productId, sizeId, proteinId, quantity = 1) => {
    const key = getCartKey(productId, sizeId, proteinId)
    setLines((current) =>
      current.some((line) => line.key === key)
        ? current.map((line) => (line.key === key ? { ...line, quantity: line.quantity + quantity } : line))
        : [...current, { key, productId, sizeId: sizeId ?? null, proteinId: proteinId ?? null, quantity }],
    )
  }, [])

  const updateQuantity = useCallback((key, quantity) => {
    setLines((current) =>
      quantity <= 0
        ? current.filter((line) => line.key !== key)
        : current.map((line) => (line.key === key ? { ...line, quantity } : line)),
    )
  }, [])

  const removeItem = useCallback((key) => setLines((current) => current.filter((line) => line.key !== key)), [])
  const clearCart = useCallback(() => setLines([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  /** Cart lines enriched with live product data, so price edits in menuData apply immediately. */
  const items = useMemo(
    () =>
      lines.flatMap((line) => {
        const product = menuItems.find((item) => item.id === line.productId)
        if (!product) return []
        const size = product.sizes?.find((entry) => entry.id === line.sizeId)
        const protein = product.proteins?.find((entry) => entry.id === line.proteinId)
        const unitPrice = getUnitPrice(product, line.sizeId, line.proteinId)
        return [{
          ...line,
          product,
          name: product.name,
          image: product.image,
          imageAlt: product.imageAlt,
          sizeLabel: size?.label ?? null,
          proteinLabel: protein?.label ?? null,
          unitPrice,
          lineTotal: typeof unitPrice === 'number' ? unitPrice * line.quantity : null,
        }]
      }),
    [lines],
  )

  const totals = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + (item.lineTotal ?? 0), 0)
    const unpricedLines = items.filter((item) => item.lineTotal === null).length
    return { count, subtotal, unpricedLines, allUnpriced: items.length > 0 && unpricedLines === items.length }
  }, [items])

  const value = useMemo(
    () => ({ items, totals, addItem, updateQuantity, removeItem, clearCart, isOpen, openCart, closeCart }),
    [items, totals, addItem, updateQuantity, removeItem, clearCart, isOpen, openCart, closeCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}
