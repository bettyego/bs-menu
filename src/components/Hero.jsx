import { ArrowRight, CalendarClock, MessageCircle, MapPin } from 'lucide-react'
import { SmartImage } from './ui'
import { buttonClass } from '../utils/styles'
import { businessConfig } from '../config/businessConfig'
import { siteImages } from '../data/servicesData'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { href } from '../utils/router'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-lavender">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8 lg:pb-20 lg:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand shadow-sm">
            <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> Nigerian home cooking · {businessConfig.serviceArea}
          </p>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.05] text-ink sm:text-6xl lg:text-[4.1rem]">
            Homemade Goodness, <span className="text-brand">Made for Your Table.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Enjoy freshly prepared Nigerian and African meals, made with care and available on pre-order. From delicious homemade soups and stews to catering and private chef services, B’s Menu brings good food closer to you.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={href('menu')} className={buttonClass('primary', 'lg')}>
              Explore Our Menu <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={buildWhatsAppUrl('Hello B’s Menu! I would like to place an order.')} target="_blank" rel="noopener noreferrer" className={buttonClass('outline', 'lg', 'bg-white')}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Order on WhatsApp
            </a>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-muted">
            <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            Freshly prepared on pre-order — contact us ahead of your preferred date.
          </p>
        </div>

        <div className="relative">
          <SmartImage src={siteImages.hero.src} alt={siteImages.hero.alt} eager className="aspect-[5/4] rounded-[2rem] shadow-lift" />
          <div className="absolute -bottom-5 left-4 right-4 flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-lift sm:left-auto sm:right-6 sm:max-w-xs">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand font-display text-lg font-bold text-white" aria-hidden="true">B</span>
            <p className="text-sm leading-5 text-ink">
              <strong className="block font-semibold">Soups, stews, sauces & zobo</strong>
              <span className="text-muted">Cooked fresh, the way home tastes.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
