import { ArrowRight, CalendarDays, Clock, MessageCircle, UtensilsCrossed } from 'lucide-react'
import { Container, Eyebrow, SmartImage } from './ui'
import { buttonClass } from '../utils/styles'
import { weeklyMenu } from '../data/contentData'
import { menuItems } from '../data/menuData'
import { formatNaira, PRICE_ON_REQUEST } from '../utils/currency'
import { getStartingPrice } from '../utils/pricing'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { href } from '../utils/router'

/**
 * Turns each weekly-menu entry into a display row.
 * A string is a menu item id (orderable online); an object is any other meal or drink (enquire on WhatsApp).
 */
function toRow(entry) {
  if (typeof entry === 'string') {
    const item = menuItems.find((menuItem) => menuItem.id === entry)
    if (!item || item.available === false) return null
    const price = getStartingPrice(item)
    return {
      key: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      priceLabel: price === null ? PRICE_ON_REQUEST : `From ${formatNaira(price)}`,
      unit: item.pricingUnit,
      link: href('menu', { item: item.id }),
      linkLabel: 'Choose',
      external: false,
    }
  }
  if (!entry?.name) return null
  return {
    key: entry.name,
    name: entry.name,
    description: entry.description,
    image: entry.image,
    priceLabel: 'Ask for price',
    unit: null,
    link: buildWhatsAppUrl(`Hello B’s Menu! I would like to pre-order ${entry.name} from this week’s menu.`),
    linkLabel: 'Ask',
    external: true,
  }
}

/** "This week's menu" board, driven by weeklyMenu in src/data/contentData.js. */
export default function WeeklyMenu() {
  const rows = weeklyMenu.items.map(toRow).filter(Boolean)
  if (!weeklyMenu.enabled || !rows.length) return null

  const askMessage = `Hello B’s Menu! What’s available on ${weeklyMenu.weekLabel ? `your menu for ${weeklyMenu.weekLabel}` : 'this week’s menu'}? I would like to place a pre-order.`

  return (
    <section className="bg-lavender py-16 sm:py-24" aria-labelledby="weekly-title">
      <Container>
        <div className="grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-card lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col justify-between gap-8 bg-brand p-7 text-white sm:p-10">
            <div>
              <Eyebrow tone="light">Fresh this week</Eyebrow>
              <h2 id="weekly-title" className="mt-3 font-display text-[2rem] leading-tight sm:text-[2.6rem]">{weeklyMenu.title}</h2>
              {weeklyMenu.weekLabel && (
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium">
                  <CalendarDays className="h-4 w-4 text-accent" aria-hidden="true" /> {weeklyMenu.weekLabel}
                </p>
              )}
              <p className="mt-4 max-w-md text-base leading-7 text-white/80">{weeklyMenu.note}</p>
              {weeklyMenu.orderDeadline && (
                <p className="mt-4 flex items-start gap-2 text-sm font-semibold text-white">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /> {weeklyMenu.orderDeadline}
                </p>
              )}
              {weeklyMenu.alsoPrepare?.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">We also prepare</p>
                  <ul className="mt-2.5 flex flex-wrap gap-2">
                    {weeklyMenu.alsoPrepare.map((entry) => (
                      <li key={entry} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/15">{entry}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href={buildWhatsAppUrl(askMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass('accent', 'lg')}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask what’s available
              </a>
              <a href={href('menu')} className={buttonClass('ghostLight', 'lg')}>
                Pre-order from the menu <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex flex-col p-3 sm:p-5">
            <ul className="flex-1 divide-y divide-line/80">
              {rows.map((row) => (
                <li key={row.key}>
                  <a
                    href={row.link}
                    {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex items-center gap-4 rounded-2xl p-3 transition hover:bg-lavender"
                  >
                    {row.image ? (
                      <SmartImage src={row.image} alt="" sizes="96px" className="h-16 w-16 shrink-0 rounded-xl sm:h-20 sm:w-20" />
                    ) : (
                      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-lavender text-brand sm:h-20 sm:w-20" aria-hidden="true">
                        <UtensilsCrossed className="h-6 w-6" />
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg leading-snug text-ink sm:text-xl">{row.name}</h3>
                      {row.description && <p className="mt-0.5 line-clamp-1 text-sm text-muted">{row.description}</p>}
                      <p className="mt-1 text-xs font-semibold text-brand">
                        {row.priceLabel}
                        {row.unit && <span className="font-normal text-muted"> · {row.unit}</span>}
                      </p>
                    </div>
                    <span className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand sm:inline-flex">
                      {row.linkLabel} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand sm:hidden" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-2xl bg-lavender/70 px-4 py-3.5 text-sm leading-6 text-muted sm:mx-3 sm:mb-1">
              <strong className="font-semibold text-ink">Looking for something else?</strong> This is only a selection — we cook many more Nigerian meals and drinks.{' '}
              <a href={buildWhatsAppUrl(askMessage)} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand hover:underline">Ask us on WhatsApp</a>.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
