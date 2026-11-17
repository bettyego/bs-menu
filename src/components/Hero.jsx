import { ArrowRight, CalendarClock, MapPin, MessageCircle, SlidersHorizontal, Truck } from 'lucide-react'
import { SmartImage } from './ui'
import { buttonClass } from '../utils/styles'
import { businessConfig } from '../config/businessConfig'
import { activeCategories } from '../data/menuData'
import { siteImages } from '../data/servicesData'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { href } from '../utils/router'

const fulfilment = businessConfig.fulfilmentOptions.join(' or ').toLowerCase()

const highlights = [
  { icon: CalendarClock, text: 'Cooked fresh on pre-order' },
  { icon: SlidersHorizontal, text: 'Choose your size & protein' },
  { icon: Truck, text: `${fulfilment.charAt(0).toUpperCase()}${fulfilment.slice(1)} in ${businessConfig.serviceArea.split(',')[0]}` },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-lavender">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:pb-24 lg:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand shadow-sm">
            <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> Nigerian home cooking · {businessConfig.serviceArea}
          </p>
          <h1 className="mt-5 text-balance font-display text-[2.55rem] leading-[1.04] text-ink sm:text-6xl lg:text-[4.1rem]">
            Homemade Goodness, <span className="text-brand">Made for Your Table.</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Freshly prepared Nigerian meals — soups, stews, sauces, rice dishes, zobo and fresh drinks — cooked with care on pre-order. Order online or ask us on WhatsApp what’s cooking this week.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={href('menu')} className={buttonClass('primary', 'lg')}>
              Explore Our Menu <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={buildWhatsAppUrl('Hello B’s Menu! I would like to place an order.')} target="_blank" rel="noopener noreferrer" className={buttonClass('accent', 'lg')}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Order on WhatsApp
            </a>
          </div>

          <nav aria-label="Menu categories" className="mt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Jump to</p>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {activeCategories.map((category) => (
                <li key={category.id}>
                  <a href={href('menu', { category: category.id })} className="inline-flex rounded-full border border-brand/15 bg-white px-3.5 py-1.5 text-sm font-medium text-ink transition hover:border-brand hover:text-brand">
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="mt-8 grid gap-3 border-t border-brand/10 pt-6 text-sm text-ink sm:grid-cols-3">
            {highlights.map((item) => (
              <li key={item.text} className="flex items-center gap-2.5">
                <item.icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" /> {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <SmartImage
            src={siteImages.hero.src}
            alt={siteImages.hero.alt}
            eager
            sizes="(min-width: 1024px) 45vw, 92vw"
            className="aspect-square rounded-[2rem] shadow-lift sm:aspect-[5/4.4]"
          />
          {/* Positioning lives on wrappers: SmartImage sets `relative` on its own box. */}
          <div className="absolute -bottom-6 -left-2 hidden w-36 sm:block lg:-left-8 lg:w-44">
            <SmartImage src={siteImages.heroSide.src} alt={siteImages.heroSide.alt} sizes="200px" className="aspect-square rounded-2xl border-4 border-white shadow-lift" />
          </div>
          <div className="absolute -right-2 -top-5 hidden w-28 sm:block lg:-right-6 lg:w-32">
            <SmartImage src={siteImages.heroDrink.src} alt={siteImages.heroDrink.alt} sizes="160px" className="aspect-[3/4] rounded-2xl border-4 border-white shadow-lift" />
          </div>
          <div className="absolute -bottom-6 right-3 flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-lift sm:right-6">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand font-display text-lg font-bold text-white" aria-hidden="true">B</span>
            <p className="text-sm leading-5 text-ink">
              <strong className="block font-semibold">Home-cooked Nigerian meals</strong>
              <span className="text-muted">Cooked fresh, the way home tastes.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
