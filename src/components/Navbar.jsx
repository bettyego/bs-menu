import { useEffect, useState } from 'react'
import { Menu as MenuIcon, MessageCircle, ShoppingBag, X } from 'lucide-react'
import Logo from './Logo'
import { buttonClass } from '../utils/styles'
import { useCart } from '../context/CartContext'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { href, navLinks } from '../utils/router'


const greeting = 'Hello B’s Menu! I would like to make an enquiry.'

export default function Navbar({ currentPage }) {
  const [open, setOpen] = useState(false)
  const { totals, openCart } = useCart()

  // Close the mobile menu whenever the page changes (adjusted during render), and on Escape.
  const [menuPage, setMenuPage] = useState(currentPage)
  if (menuPage !== currentPage) {
    setMenuPage(currentPage)
    setOpen(false)
  }
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const cartLabel = `Open your order, ${totals.count} item${totals.count === 1 ? '' : 's'}`

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = currentPage === link.page
              return (
                <li key={link.page}>
                  <a
                    href={href(link.page)}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${active ? 'bg-lavender text-brand' : 'text-muted hover:text-brand'}`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" onClick={openCart} className="relative grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition hover:border-brand hover:text-brand" aria-label={cartLabel}>
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {totals.count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-white" aria-hidden="true">
                {totals.count > 99 ? '99+' : totals.count}
              </span>
            )}
          </button>
          <a href={buildWhatsAppUrl(greeting)} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'sm', 'hidden h-11 sm:inline-flex')}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="lg:hidden xl:inline">Order on WhatsApp</span>
            <span className="hidden lg:inline xl:hidden">WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <MenuIcon className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.page}>
                <a
                  href={href(link.page)}
                  onClick={() => setOpen(false)}
                  aria-current={currentPage === link.page ? 'page' : undefined}
                  className={`block rounded-xl px-3 py-3 text-base font-medium ${currentPage === link.page ? 'bg-lavender text-brand' : 'text-ink hover:bg-lavender'}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-line pt-4 pb-2">
              <a href={buildWhatsAppUrl(greeting)} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'lg', 'w-full')}>
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> Order on WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
