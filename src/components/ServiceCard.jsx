import { CalendarDays, ChefHat, Check, CookingPot, Refrigerator } from 'lucide-react'
import { SmartImage } from './ui'
import { buttonClass } from '../utils/styles'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const icons = { CalendarDays, ChefHat, CookingPot, Refrigerator }

/**
 * Service card. `onEnquire(serviceId)` preselects the service in the enquiry form;
 * the quote button opens WhatsApp directly.
 */
export default function ServiceCard({ service, onEnquire, compact = false }) {
  const Icon = icons[service.icon] ?? ChefHat
  const quoteMessage = `Hello B’s Menu! I would like to request a quote for your ${service.title} service.`

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition duration-300 hover:shadow-lift">
      <div className="relative">
        <SmartImage src={service.image} alt={service.imageAlt} className={compact ? 'aspect-[16/10]' : 'aspect-[4/3]'} imgClassName="transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-full bg-white text-brand shadow-sm">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-2xl text-ink">{service.title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{service.description}</p>
        {!compact && (
          <ul className="mt-4 space-y-2">
            {service.points.map((point) => (
              <li key={point} className="flex gap-2 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /> {point}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          <button type="button" onClick={() => onEnquire(service.id)} className={buttonClass('primary', 'sm')}>Enquire Now</button>
          <a href={buildWhatsAppUrl(quoteMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass('outline', 'sm')}>Request a Quote</a>
        </div>
      </div>
    </article>
  )
}
