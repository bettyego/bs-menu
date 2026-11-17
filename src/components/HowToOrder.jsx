import { ClipboardList, MessageCircle, Search, ShoppingBag } from 'lucide-react'
import DeliveryInfo from './DeliveryInfo'
import { Container, SectionHeading } from './ui'

const steps = [
  { icon: Search, title: 'Explore our menu', text: 'Browse our soups, stews, sauces, meals and drinks.' },
  { icon: ShoppingBag, title: 'Select your food', text: 'Choose your size, protein and quantity, then add it to your order.' },
  { icon: ClipboardList, title: 'Review your order', text: 'Check your selections, add your details and preferred date.' },
  { icon: MessageCircle, title: 'Send on WhatsApp', text: 'Your order goes to B’s Menu in one message — we reply to confirm.' },
]

/** "How to order" steps plus the pre-order & delivery essentials. */
export default function HowToOrder({ withDelivery = true }) {
  return (
    <section id="how-to-order-section" className="scroll-mt-24 bg-lavender py-16 sm:py-24" aria-labelledby="how-to-order">
      <Container>
        <SectionHeading eyebrow="How to order" title={<span id="how-to-order">Four simple steps to your table</span>} align="center" />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-display text-3xl text-brand/15" aria-hidden="true">0{index + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink"><span className="sr-only">Step {index + 1}: </span>{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>

        {withDelivery && (
          <div className="mt-14">
            <h3 className="text-center font-display text-2xl text-ink sm:text-3xl">Pre-order & delivery</h3>
            <DeliveryInfo className="mt-8" />
          </div>
        )}
      </Container>
    </section>
  )
}
