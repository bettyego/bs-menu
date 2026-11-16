import { ClipboardList, MessageCircle, Search, ShoppingBag } from 'lucide-react'
import { Container, SectionHeading } from './ui'

const steps = [
  { icon: Search, title: 'Explore our menu', text: 'Browse our soups, stews, sauces, meals and drinks.' },
  { icon: ShoppingBag, title: 'Select your food', text: 'Choose your preferred food items, sizes, quantities and available protein options.' },
  { icon: ClipboardList, title: 'Review your order', text: 'Check your selections, quantities and subtotal.' },
  { icon: MessageCircle, title: 'Order through WhatsApp', text: 'Send your order to B’s Menu through WhatsApp and wait for confirmation.' },
]

export default function HowToOrder() {
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="how-to-order">
      <Container>
        <SectionHeading eyebrow="How to order" title={<span id="how-to-order">Four simple steps to your table</span>} align="center" />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl border border-line bg-lavender/60 p-6">
              <span className="font-display text-sm font-semibold text-accent">Step {index + 1}</span>
              <span className="mt-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-muted">
          Availability, delivery charges and payment arrangements are confirmed with you through WhatsApp before your order is prepared.
        </p>
      </Container>
    </section>
  )
}
