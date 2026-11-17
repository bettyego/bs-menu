import { useEffect, useState } from 'react'
import { Check, ClipboardList, MessageCircle, Send, ThumbsUp } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import WhatsAppCTA from '../components/WhatsAppCTA'
import { Container, Eyebrow, PageHeader, SectionHeading, SmartImage } from '../components/ui'
import { buttonClass } from '../utils/styles'
import { services } from '../data/servicesData'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { href } from '../utils/router'
import { ServiceIcon } from '../utils/serviceIcons'

const serviceOptions = services.map((service) => service.title)

const fields = [
  { key: 'name', label: 'Your name', required: true },
  { key: 'phone', label: 'Phone number', type: 'tel', required: true },
  { key: 'location', label: 'Location', required: true, placeholder: 'e.g. Gwarinpa, Abuja' },
  { key: 'service', label: 'Requested service', type: 'select', options: serviceOptions, required: true },
  { key: 'people', label: 'Number of people or desired quantity', placeholder: 'e.g. Family of 5, or 4 litres of soup' },
  { key: 'date', label: 'Preferred date', type: 'date' },
  { key: 'preferences', label: 'Food preferences', type: 'textarea', placeholder: 'Meals you’d like, proteins, spice level, dietary needs…' },
  { key: 'notes', label: 'Additional instructions', type: 'textarea', rows: 2 },
]

const process = [
  { icon: Send, title: 'Send a request', text: 'Tap a WhatsApp button or fill in the short form below.' },
  { icon: ClipboardList, title: 'Plan it together', text: 'We discuss meals, quantities, dates and your preferences.' },
  { icon: ThumbsUp, title: 'Confirm & we cook', text: 'We confirm availability and your quote, then prepare everything fresh.' },
]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function ServiceSection({ service, index, onEnquire }) {
  const reversed = index % 2 === 1
  return (
    <section id={service.id} className={`scroll-mt-24 py-14 sm:py-20 ${reversed ? 'bg-lavender' : 'bg-white'}`} aria-labelledby={`${service.id}-title`}>
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className={`relative ${reversed ? 'lg:order-2' : ''}`}>
          <SmartImage src={service.image} alt={service.imageAlt} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] rounded-[1.75rem] shadow-card" />
          <span className="absolute -bottom-5 left-5 grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-lift">
            <ServiceIcon name={service.icon} className="h-6 w-6" />
          </span>
        </div>
        <div className="pt-4 lg:pt-0">
          <Eyebrow>{`Service 0${index + 1}`}</Eyebrow>
          <h2 id={`${service.id}-title`} className="mt-3 font-display text-[2rem] leading-tight text-ink sm:text-[2.6rem]">{service.title}</h2>
          {service.tagline && <p className="mt-2 text-lg font-medium text-accent-dark">{service.tagline}</p>}
          <p className="mt-4 text-base leading-7 text-ink">{service.description}</p>
          {service.details && <p className="mt-3 text-base leading-7 text-muted">{service.details}</p>}
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {service.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /> {point}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={buildWhatsAppUrl(`Hello B’s Menu! I would like to enquire about your ${service.title} service.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass('primary', 'lg')}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" /> Ask on WhatsApp
            </a>
            {service.link ? (
              <a href={href(service.link.page)} className={buttonClass('outline', 'lg', reversed ? 'bg-white' : '')}>{service.link.label}</a>
            ) : (
              <button type="button" onClick={() => onEnquire(service.id)} className={buttonClass('outline', 'lg', reversed ? 'bg-white' : '')}>
                Fill in the enquiry form
              </button>
            )}
          </div>
          <p className="mt-3 text-xs text-muted">Nothing is confirmed until we agree the details with you.</p>
        </div>
      </Container>
    </section>
  )
}

export default function Services({ params }) {
  const requested = services.find((service) => service.id === params.get('service'))
  const [selected, setSelected] = useState(requested?.title ?? '')

  // Arriving from a link such as #/services?service=private-chef jumps to the prefilled form.
  useEffect(() => {
    if (!requested) return undefined
    const timer = setTimeout(() => scrollToId('service-enquiry'), 50)
    return () => clearTimeout(timer)
  }, [requested])

  function handleEnquire(serviceId) {
    setSelected(services.find((service) => service.id === serviceId)?.title ?? '')
    scrollToId('service-enquiry')
  }

  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Cooking for your home, your schedule and your table"
        description="Pre-order meals, fridge restocking, home cooking, food preparation and delivery, fresh drinks and catering for small events — each arranged with you directly to suit your needs."
      >
        <nav aria-label="Services on this page" className="mt-7">
          <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {services.map((service) => {
              return (
                <li key={service.id} className="shrink-0">
                  <a href={`#${service.id}`} onClick={(event) => { event.preventDefault(); scrollToId(service.id) }} className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-brand/15 bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:border-brand hover:text-brand">
                    <ServiceIcon name={service.icon} className="h-4 w-4 text-brand" /> {service.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </PageHeader>

      {services.map((service, index) => <ServiceSection key={service.id} service={service} index={index} onEnquire={handleEnquire} />)}

      <section className="bg-brand-deep py-14 text-white sm:py-20" aria-labelledby="services-process-title">
        <Container>
          <SectionHeading tone="light" eyebrow="How it works" title={<span id="services-process-title">Simple to arrange, start to finish</span>} align="center" />
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {process.map((step, index) => (
              <li key={step.title} className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-white"><step.icon className="h-5 w-5" aria-hidden="true" /></span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-accent">Step {index + 1}</p>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-white/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="service-enquiry" className="scroll-mt-24 bg-lavender py-14 sm:py-20" aria-labelledby="service-enquiry-title">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Service enquiry" title={<span id="service-enquiry-title">Tell us what you need</span>} description="Fill in the form and we’ll prepare a WhatsApp message with your details. Services are quoted individually — we’ll confirm availability, pricing and arrangements with you." />
            <p className="mt-6 text-sm text-muted">
              Planning a party or event? See our <a href={href('catering')} className="font-semibold text-brand hover:underline">event catering</a> page.
            </p>
          </div>
          <EnquiryForm idPrefix="service" heading="I would like to enquire about one of your services." fields={fields} initialValues={selected ? { service: selected } : {}} />
        </Container>
      </section>

      <WhatsAppCTA
        title="Prefer to just talk it through?"
        text="Message us on WhatsApp with what you need and we’ll take it from there."
        message="Hello B’s Menu! I would like to enquire about your cooking services."
        secondary={{ label: 'Browse the menu', page: 'menu' }}
      />
    </>
  )
}
