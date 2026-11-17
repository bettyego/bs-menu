import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import DeliveryInfo from '../components/DeliveryInfo'
import FAQ from '../components/FAQ'
import SocialLinks from '../components/SocialLinks'
import { Container, PageHeader, SectionHeading } from '../components/ui'
import { buttonClass } from '../utils/styles'
import { businessConfig } from '../config/businessConfig'
import { buildWhatsAppUrl } from '../utils/whatsapp'

function ContactCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
      <span className="grid h-12 w-12 place-items-center rounded-full bg-lavender text-brand"><Icon className="h-5 w-5" aria-hidden="true" /></span>
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <div className="mt-1.5 text-sm leading-6 text-muted">{children}</div>
    </div>
  )
}

export default function Contact() {
  const { email, phoneDisplay, phoneLink, address, serviceArea } = businessConfig
  return (
    <>
      <PageHeader eyebrow="Contact us" title="We’d love to cook for you" description="The fastest way to reach B’s Menu is on WhatsApp — for orders, availability, services and catering enquiries.">
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a href={buildWhatsAppUrl('Hello B’s Menu! I would like to make an enquiry.')} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'lg')}>
            <MessageCircle className="h-5 w-5" aria-hidden="true" /> Chat on WhatsApp
          </a>
          <a href={`tel:${phoneLink}`} className={buttonClass('outline', 'lg', 'bg-white')}>
            <Phone className="h-5 w-5" aria-hidden="true" /> Call {phoneDisplay}
          </a>
        </div>
      </PageHeader>

      <Container className="py-14 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard icon={MessageCircle} title="WhatsApp">
            <p>Orders and enquiries</p>
            <a href={buildWhatsAppUrl('Hello B’s Menu! I would like to make an enquiry.')} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'sm', 'mt-3')}>Chat on WhatsApp</a>
          </ContactCard>
          <ContactCard icon={Phone} title="Phone">
            <a href={`tel:${phoneLink}`} className="font-medium text-brand hover:underline">{phoneDisplay}</a>
          </ContactCard>
          <ContactCard icon={Mail} title="Email">
            {email ? <a href={`mailto:${email}`} className="break-all font-medium text-brand hover:underline">{email}</a> : <p>Email address coming soon.</p>}
          </ContactCard>
          <ContactCard icon={MapPin} title="Service area">
            <p>{address ?? serviceArea}</p>
            {address && <p className="mt-1">Serving {serviceArea}</p>}
          </ContactCard>
        </div>

        <div className="mt-6 rounded-2xl border border-line p-6">
          <h2 className="text-lg font-semibold">Follow B’s Menu</h2>
          <p className="mt-1 text-sm text-muted">See what’s cooking on our social pages.</p>
          <div className="mt-4"><SocialLinks /></div>
        </div>
      </Container>

      <section className="bg-lavender py-16 sm:py-20" aria-labelledby="contact-delivery-title">
        <Container>
          <SectionHeading eyebrow="Before you order" title={<span id="contact-delivery-title">Pre-order, delivery & payment</span>} />
          <DeliveryInfo className="mt-8" />
        </Container>
      </section>

      <section id="faq" className="scroll-mt-24 bg-white py-16 sm:py-20" aria-labelledby="contact-faq-title">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQs" title={<span id="contact-faq-title">Frequently asked questions</span>} description="Can’t find your answer? Message us on WhatsApp — we’re happy to help." />
          <FAQ />
        </Container>
      </section>
    </>
  )
}
