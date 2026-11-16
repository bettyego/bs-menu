import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Logo from './Logo'
import SocialLinks from './SocialLinks'
import { buttonClass } from '../utils/styles'
import { businessConfig } from '../config/businessConfig'
import { activeCategories } from '../data/menuData'
import { services } from '../data/servicesData'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { href, navLinks } from '../utils/router'

function FooterHeading({ children }) {
  return <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{children}</h2>
}

const linkClass = 'text-sm text-white/75 transition hover:text-white'

export default function Footer() {
  return (
    <footer className="bg-brand-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/75">{businessConfig.shortDescription}</p>
          <a href={buildWhatsAppUrl('Hello B’s Menu! I would like to make an enquiry.')} target="_blank" rel="noopener noreferrer" className={buttonClass('light', 'sm', 'mt-6')}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Order on WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:col-span-1 lg:col-span-2">
          <nav aria-label="Footer">
            <FooterHeading>Quick links</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.page}><a className={linkClass} href={href(link.page)}>{link.label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <FooterHeading>Our menu</FooterHeading>
            <ul className="mt-4 space-y-2.5">
              {activeCategories.map((category) => (
                <li key={category.id}><a className={linkClass} href={href('menu', { category: category.id })}>{category.name}</a></li>
              ))}
            </ul>
            <div className="mt-8"><FooterHeading>Services</FooterHeading></div>
            <ul className="mt-4 space-y-2.5">
              {services.map((service) => (
                <li key={service.id}><a className={linkClass} href={href('services', { service: service.id })}>{service.title}</a></li>
              ))}
              <li><a className={linkClass} href={href('catering')}>Event Catering</a></li>
            </ul>
          </div>
        </div>

        <div>
          <FooterHeading>Contact</FooterHeading>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{businessConfig.address ?? businessConfig.serviceArea}</li>
            <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /><a className="hover:text-white" href={`tel:${businessConfig.phoneLink}`}>{businessConfig.phoneDisplay}</a></li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {businessConfig.email ? <a className="hover:text-white" href={`mailto:${businessConfig.email}`}>{businessConfig.email}</a> : <span className="text-white/45">Email coming soon</span>}
            </li>
          </ul>
          <div className="mt-6"><SocialLinks light /></div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/55 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {businessConfig.name}. All rights reserved.</p>
          <p>Homemade Nigerian meals · Pre-orders · Catering · {businessConfig.serviceArea}</p>
        </div>
      </div>
    </footer>
  )
}
