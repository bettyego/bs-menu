import { CalendarCheck, Check, ChefHat, ClipboardList, FileText, MessageCircle, PartyPopper, Send, Users, UtensilsCrossed } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import { PhotoGrid } from '../components/Gallery'
import { Container, EditorNote, Eyebrow, SectionHeading, SmartImage } from '../components/ui'
import { buttonClass } from '../utils/styles'
import { cateringEventTypes, cateringImages } from '../data/servicesData'
import { cateringPackages, cateringSampleMenus } from '../data/contentData'
import { cateringGallery } from '../data/images'
import { formatNaira, PRICE_ON_REQUEST } from '../utils/currency'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const quoteMessage = 'Hello B’s Menu! I would like to request a quotation for catering a small event.'

const occasions = [
  { title: 'Birthday celebrations', text: 'Homemade party food for birthdays at home or with friends.' },
  { title: 'Office meetings', text: 'Fresh meals for meetings, working lunches and team days.' },
  { title: 'Office celebrations', text: 'Good food for end-of-year parties, send-forths and team celebrations.' },
  { title: 'Get-togethers', text: 'Meals for hangouts, reunions and catching up with friends and family.' },
  { title: 'House parties', text: 'Soups, stews, rice and party favourites for your guests.' },
  { title: 'Family celebrations', text: 'Home-cooked food for family milestones and small gatherings.' },
]

const process = [
  { icon: Send, title: 'Send your request', text: 'Share your date, location, guest count and the meals you have in mind.' },
  { icon: UtensilsCrossed, title: 'Plan the menu', text: 'We talk through dishes, quantities, proteins and how you’d like food served.' },
  { icon: FileText, title: 'Receive your quote', text: 'We send a quotation for your event based on your menu and guest count.' },
  { icon: CalendarCheck, title: 'Confirm & book', text: 'Confirm the quote and we lock in your date and arrangements.' },
  { icon: ChefHat, title: 'We cook fresh', text: 'Everything is prepared fresh for your event, with delivery or pickup arranged with you.' },
]

const fields = [
  { key: 'name', label: 'Full name', required: true },
  { key: 'phone', label: 'Phone number', type: 'tel', required: true },
  { key: 'eventType', label: 'Event type', type: 'select', options: cateringEventTypes, required: true },
  { key: 'eventDate', label: 'Event date', type: 'date', required: true },
  { key: 'location', label: 'Event location', required: true, placeholder: 'e.g. Maitama, Abuja' },
  { key: 'guests', label: 'Estimated number of guests', type: 'number', required: true, placeholder: 'e.g. 30' },
  { key: 'meals', label: 'Preferred meals', type: 'textarea', placeholder: 'e.g. Egusi soup, assorted meat stew, zobo…' },
  { key: 'budget', label: 'Estimated budget (optional)', placeholder: 'e.g. ₦150,000' },
  { key: 'notes', label: 'Additional requirements', type: 'textarea', rows: 2, placeholder: 'Serving style, timing, dietary needs…' },
]

function scrollToForm(event) {
  event?.preventDefault()
  document.getElementById('catering-form')?.scrollIntoView({ behavior: 'smooth' })
}

function PackagesAndMenus() {
  const hasContent = cateringPackages.length > 0 || cateringSampleMenus.length > 0
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="packages-title">
      <Container>
        <SectionHeading eyebrow="Packages & sample menus" title={<span id="packages-title">Ideas for your event menu</span>} description="Every event is different, so every quote is built around your guest count and menu. Use these as a starting point." />

        {cateringPackages.length > 0 && (
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cateringPackages.map((pkg) => (
              <li key={pkg.name} className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card">
                <h3 className="font-display text-2xl text-ink">{pkg.name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand">{typeof pkg.price === 'number' ? `From ${formatNaira(pkg.price)}` : PRICE_ON_REQUEST}</p>
                {pkg.idealFor && <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-dark"><Users className="h-4 w-4" aria-hidden="true" /> {pkg.idealFor}</p>}
                {pkg.description && <p className="mt-3 text-sm leading-6 text-muted">{pkg.description}</p>}
                {pkg.includes?.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {pkg.includes.map((entry) => <li key={entry} className="flex gap-2 text-sm text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{entry}</li>)}
                  </ul>
                )}
                <div className="mt-auto pt-6">
                  <a href={buildWhatsAppUrl(`Hello B’s Menu! I would like a quote for the ${pkg.name} catering package.`)} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'md', 'w-full')}>
                    <MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask for a quote
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cateringSampleMenus.length > 0 && (
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cateringSampleMenus.map((menu) => (
              <li key={menu.title} className="rounded-2xl bg-lavender p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark">Sample menu</p>
                <h3 className="mt-1 font-display text-2xl text-ink">{menu.title}</h3>
                <ul className="mt-4 space-y-2 border-t border-brand/10 pt-4">
                  {menu.dishes.map((dish) => <li key={dish} className="text-sm text-ink">{dish}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        )}

        {!hasContent && (
          <div className="mt-10 grid gap-6 rounded-[1.75rem] border border-line bg-lavender p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h3 className="font-display text-2xl text-ink sm:text-3xl">Every menu is built around your event</h3>
              <p className="mt-3 text-base leading-7 text-muted">
                Tell us what you’d love to serve — soups, stews, sauces, rice dishes, zobo and fresh drinks, or other party favourites — and how many guests you’re expecting. We’ll suggest quantities and send a quotation tailored to your event.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#catering-form" onClick={scrollToForm} className={buttonClass('primary', 'lg')}><ClipboardList className="h-5 w-5" aria-hidden="true" /> Request a quotation</a>
              <a href={buildWhatsAppUrl(quoteMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass('outline', 'lg', 'bg-white')}><MessageCircle className="h-5 w-5" aria-hidden="true" /> Ask on WhatsApp</a>
            </div>
            <EditorNote title="Catering packages & sample menus" className="lg:col-span-2">
              Add packages to <code>cateringPackages</code> and sample menus to <code>cateringSampleMenus</code> in <code>src/data/contentData.js</code>. They replace this box automatically.
            </EditorNote>
          </div>
        )}
      </Container>
    </section>
  )
}

export default function Catering() {
  const hasStockPhotos = cateringGallery.some((image) => image.stock)
  return (
    <>
      <section className="relative overflow-hidden bg-brand-deep text-white">
        <Container className="grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-2">
          <div>
            <Eyebrow tone="light">Event catering</Eyebrow>
            <h1 className="mt-3 text-balance font-display text-[2.4rem] leading-[1.08] sm:text-5xl">Homemade food for your small events &amp; gatherings</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              Birthdays, office meetings, office celebrations and get-togethers — B’s Menu prepares fresh, home-cooked Nigerian food for smaller events, so you can focus on your guests.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#catering-form" className={buttonClass('accent', 'lg')} onClick={scrollToForm}>
                <PartyPopper className="h-5 w-5" aria-hidden="true" /> Request a quotation
              </a>
              <a href={buildWhatsAppUrl(quoteMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass('ghostLight', 'lg')}>
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> Chat on WhatsApp
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" aria-hidden="true" /> Quoted per event</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" aria-hidden="true" /> Menu planned with you</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" aria-hidden="true" /> Cooked fresh for your date</li>
            </ul>
          </div>
          {/* Single hero photo — the gallery further down shows the rest. */}
          <SmartImage src={cateringImages.feature.src} alt={cateringImages.feature.alt} eager sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] rounded-[1.75rem] shadow-lift" />
        </Container>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="occasions-title">
        <Container>
          <SectionHeading eyebrow="Who we cater for" title={<span id="occasions-title">Made for smaller gatherings</span>} description="We focus on small events and gatherings, where good home-cooked food makes the occasion. Every menu is planned around your guest count and quoted for your event." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((occasion) => (
              <li key={occasion.title} className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-lavender text-brand"><PartyPopper className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <h3 className="font-semibold text-ink">{occasion.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{occasion.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {cateringGallery.length > 0 && (
        <section className="bg-lavender py-16 sm:py-24" aria-labelledby="catering-gallery-title">
          <Container>
            <SectionHeading eyebrow="Gallery" title={<span id="catering-gallery-title">Food made for gathering</span>} description="Party rice, rich stews, soups and drinks — the kind of food we love to prepare for your guests." />
            <PhotoGrid images={cateringGallery} className="mt-10" />
            {hasStockPhotos && <p className="mt-4 text-xs text-muted">Illustrative photos — our own event photos are coming soon.</p>}
          </Container>
        </section>
      )}

      <section className="bg-brand-deep py-16 text-white sm:py-24" aria-labelledby="process-title">
        <Container>
          <SectionHeading tone="light" eyebrow="Our catering process" title={<span id="process-title">From first message to serving day</span>} align="center" />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-white"><step.icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="font-display text-3xl text-white/20" aria-hidden="true">0{index + 1}</span>
                </div>
                <h3 className="mt-4 font-semibold"><span className="sr-only">Step {index + 1}: </span>{step.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-white/75">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <a href="#catering-form" onClick={scrollToForm} className={buttonClass('accent', 'lg')}>Start with a quote request</a>
          </div>
        </Container>
      </section>

      <PackagesAndMenus />

      <section id="catering-form" className="scroll-mt-24 bg-lavender py-16 sm:py-24" aria-labelledby="catering-form-title">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Request a quotation" title={<span id="catering-form-title">Tell us about your event</span>} description="Share a few details and we’ll prepare a WhatsApp message for you to send. Availability and pricing are confirmed for each event — please reach out as early as you can." />
            <div className="mt-6 rounded-2xl bg-white p-5 text-sm leading-6 text-muted shadow-card">
              <p className="font-semibold text-ink">Prefer to chat?</p>
              <p className="mt-1">Send us a quick message and we’ll ask the right questions.</p>
              <a href={buildWhatsAppUrl(quoteMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'sm', 'mt-3')}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp us
              </a>
            </div>
          </div>
          <EnquiryForm idPrefix="catering" heading="I would like to request a quotation for event catering." fields={fields} submitLabel="Send Quote Request" />
        </Container>
      </section>
    </>
  )
}
