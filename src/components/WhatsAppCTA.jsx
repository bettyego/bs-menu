import { MessageCircle } from 'lucide-react'
import { buttonClass } from '../utils/styles'
import { businessConfig } from '../config/businessConfig'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { href } from '../utils/router'

/** Closing "ready to order" banner used at the bottom of several pages. */
export default function WhatsAppCTA({
  title = 'Ready to order? We’re one message away.',
  text = 'Build your order from our menu, or message us directly to ask what’s cooking, about our services or catering.',
  message = 'Hello B’s Menu! I would like to place an order.',
  secondary = { label: 'Explore Our Menu', page: 'menu' },
}) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand px-6 py-12 text-center text-white sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.06]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-accent/15" aria-hidden="true" />
        <h2 className="relative mx-auto max-w-2xl text-balance font-display text-[1.9rem] leading-tight sm:text-4xl">{title}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-white/80">{text}</p>
        <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={buildWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer" className={buttonClass('accent', 'lg')}>
            <MessageCircle className="h-5 w-5" aria-hidden="true" /> Order on WhatsApp
          </a>
          {secondary && <a href={href(secondary.page)} className={buttonClass('ghostLight', 'lg')}>{secondary.label}</a>}
        </div>
        <p className="relative mt-6 text-sm text-white/70">
          Or call <a href={`tel:${businessConfig.phoneLink}`} className="font-semibold text-white underline-offset-4 hover:underline">{businessConfig.phoneDisplay}</a>
        </p>
      </div>
    </section>
  )
}
