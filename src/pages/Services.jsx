import { useEffect, useState } from 'react'
import EnquiryForm from '../components/EnquiryForm'
import ServiceCard from '../components/ServiceCard'
import { Container, PageHeader, SectionHeading } from '../components/ui'
import { services } from '../data/servicesData'
import { href } from '../utils/router'

const serviceOptions = [...services.map((service) => service.title), 'Event Catering']

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

export default function Services({ params }) {
  const requested = services.find((service) => service.id === params.get('service'))
  const [selected, setSelected] = useState(requested?.title ?? '')

  function scrollToForm() {
    document.getElementById('service-enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Arriving from a link such as #/services?service=private-chef jumps to the prefilled form.
  useEffect(() => {
    if (requested) setTimeout(scrollToForm, 50)
  }, [requested])

  function handleEnquire(serviceId) {
    setSelected(services.find((service) => service.id === serviceId)?.title ?? '')
    scrollToForm()
  }

  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Cooking for your home, your schedule and your table"
        description="Beyond our menu, B’s Menu offers weekend cooking, bulk home cooking, fridge restocking and private chef services. Every service is arranged with you directly and quoted to your needs."
      />

      <Container className="py-14 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => <ServiceCard key={service.id} service={service} onEnquire={handleEnquire} />)}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          Planning a party or event? See our <a href={href('catering')} className="font-semibold text-brand hover:underline">event catering</a> page.
        </p>
      </Container>

      <section id="service-enquiry" className="scroll-mt-24 bg-lavender py-14 sm:py-20" aria-labelledby="service-enquiry-title">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="Service enquiry" title={<span id="service-enquiry-title">Tell us what you need</span>} description="Fill in the form and we’ll prepare a WhatsApp message with your details. Services are quoted individually — we’ll confirm availability, pricing and arrangements with you." />
          </div>
          <EnquiryForm idPrefix="service" heading="I would like to enquire about one of your services." fields={fields} initialValues={selected ? { service: selected } : {}} />
        </Container>
      </section>
    </>
  )
}
