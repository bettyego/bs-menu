import { CalendarCheck, MessageCircle, PartyPopper, UtensilsCrossed, Users } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import { Container, Eyebrow, SectionHeading, SmartImage } from '../components/ui'
import { buttonClass } from '../utils/styles'
import { cateringEventTypes, cateringImages } from '../data/servicesData'
import { buildWhatsAppUrl } from '../utils/whatsapp'

const occasions = [
  { title: 'Mini birthday parties', text: 'Delicious party food for smaller birthday celebrations at home.' },
  { title: 'House parties', text: 'Trays of soups, stews and party favourites for your guests.' },
  { title: 'Family celebrations', text: 'Homemade food for family get-togethers and special milestones.' },
  { title: 'Intimate gatherings', text: 'Thoughtfully prepared meals for small, close-knit gatherings.' },
  { title: 'Social events', text: 'Food for hangouts, meetings and community events.' },
  { title: 'Larger events', text: 'Bulk food preparation for events with more guests.' },
]

const process = [
  { icon: MessageCircle, title: 'Send your enquiry', text: 'Share your event details using the form below.' },
  { icon: UtensilsCrossed, title: 'Plan the menu', text: 'We discuss meals, quantities and your preferences.' },
  { icon: CalendarCheck, title: 'Confirm arrangements', text: 'We confirm availability, pricing and delivery with you.' },
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

export default function Catering() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-deep text-white">
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <Eyebrow tone="light">Event catering</Eyebrow>
            <h1 className="mt-3 font-display text-4xl leading-[1.1] sm:text-5xl">Homemade Nigerian food for your celebrations</h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              Whether it’s a mini birthday, a house party or a family celebration, B’s Menu prepares delicious Nigerian and African dishes for your guests — so you can focus on the occasion.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#catering-form" className={buttonClass('accent', 'lg')} onClick={(event) => { event.preventDefault(); document.getElementById('catering-form')?.scrollIntoView({ behavior: 'smooth' }) }}>
                <PartyPopper className="h-5 w-5" aria-hidden="true" /> Plan your event
              </a>
              <a href={buildWhatsAppUrl('Hello B’s Menu! I would like to enquire about event catering.')} target="_blank" rel="noopener noreferrer" className={buttonClass('ghostLight', 'lg')}>
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <SmartImage src={cateringImages.hero.src} alt={cateringImages.hero.alt} eager className="col-span-2 aspect-[16/9] rounded-2xl" />
            <SmartImage src={cateringImages.buffet.src} alt={cateringImages.buffet.alt} className="aspect-[4/3] rounded-2xl" />
            <SmartImage src={cateringImages.party.src} alt={cateringImages.party.alt} className="aspect-[4/3] rounded-2xl" />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="occasions-title">
        <Container>
          <SectionHeading eyebrow="Who we cater for" title={<span id="occasions-title">Celebrations big and small</span>} description="Our catering is built around your event — the guest count, the menu and the way you want food served. Every event is quoted individually." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((occasion) => (
              <li key={occasion.title} className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <Users className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="mt-3 text-lg font-semibold">{occasion.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">{occasion.text}</p>
              </li>
            ))}
          </ul>

          <ol className="mt-14 grid gap-6 rounded-3xl bg-lavender p-6 sm:p-10 md:grid-cols-3">
            {process.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white"><step.icon className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <p className="text-xs font-semibold text-accent">Step {index + 1}</p>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="catering-form" className="scroll-mt-24 bg-lavender/60 py-14 sm:py-20" aria-labelledby="catering-form-title">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="Catering enquiry" title={<span id="catering-form-title">Tell us about your event</span>} description="Share a few details and we’ll prepare a WhatsApp message for you to send. Availability and pricing are confirmed for each event — please reach out as early as you can." />
          <EnquiryForm idPrefix="catering" heading="I would like to enquire about catering for an event." fields={fields} submitLabel="Send Catering Enquiry" />
        </Container>
      </section>
    </>
  )
}
