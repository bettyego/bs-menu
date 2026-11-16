import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import PreOrderNotice from '../components/PreOrderNotice'
import SocialLinks from '../components/SocialLinks'
import { Container, PageHeader } from '../components/ui'
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
      <PageHeader eyebrow="Contact us" title="We’d love to cook for you" description="The fastest way to reach B’s Menu is on WhatsApp — for orders, availability, services and catering enquiries." />

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
            {email ? <a href={`mailto:${email}`} className="font-medium text-brand hover:underline">{email}</a> : <p>Email address coming soon.</p>}
          </ContactCard>
          <ContactCard icon={MapPin} title="Service area">
            <p>{address ?? serviceArea}</p>
            {address && <p className="mt-1">Serving {serviceArea}</p>}
          </ContactCard>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-line p-6">
            <h2 className="text-lg font-semibold">Follow B’s Menu</h2>
            <p className="mt-1 text-sm text-muted">See what’s cooking on our social pages.</p>
            <div className="mt-4"><SocialLinks /></div>
          </div>
          <PreOrderNotice className="h-full" />
        </div>
      </Container>
    </>
  )
}
