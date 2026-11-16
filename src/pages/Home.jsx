import { ArrowRight, CalendarClock, HandPlatter, Heart, MessageCircle, PartyPopper, SlidersHorizontal } from 'lucide-react'
import Hero from '../components/Hero'
import FoodCard from '../components/FoodCard'
import HowToOrder from '../components/HowToOrder'
import { Container, SectionHeading, SmartImage } from '../components/ui'
import { buttonClass } from '../utils/styles'
import { categories, menuItems } from '../data/menuData'
import { cateringImages, services } from '../data/servicesData'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { href } from '../utils/router'

const service = (id) => services.find((entry) => entry.id === id)

function Categories() {
  const shown = categories.filter((category) => category.image && menuItems.some((item) => item.category === category.id))
  return (
    <section className="py-16 sm:py-20" aria-labelledby="categories-title">
      <Container>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Our food" title={<span id="categories-title">What’s cooking at B’s Menu</span>} description="Explore our homemade Nigerian soups, stews, sauces and drinks — all freshly prepared on pre-order." />
          <a href={href('menu')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">View full menu <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {shown.map((category) => (
            <a key={category.id} href={href('menu', { category: category.id })} className="group relative overflow-hidden rounded-2xl shadow-card">
              <SmartImage src={category.image} alt={category.imageAlt} className="aspect-[4/5] sm:aspect-[4/4.4]" imgClassName="transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className="font-display text-xl text-white sm:text-2xl">{category.name}</h3>
                <p className="mt-1 hidden text-sm leading-5 text-white/80 sm:block">{category.blurb}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white">Browse <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden="true" /></span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Featured() {
  const featured = menuItems.filter((item) => item.featured && item.category !== 'drinks').slice(0, 4)
  if (!featured.length) return null
  return (
    <section className="bg-lavender py-16 sm:py-20" aria-labelledby="featured-title">
      <Container>
        <SectionHeading eyebrow="Customer favourites" title={<span id="featured-title">Featured meals</span>} description="Pick your size and protein, add to your order, and send it to us on WhatsApp." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => <FoodCard key={product.id} product={product} />)}
        </div>
        <div className="mt-10 text-center">
          <a href={href('menu')} className={buttonClass('primary', 'lg')}>See the full menu <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
      </Container>
    </section>
  )
}

function HomeCooking() {
  const items = [service('weekend-cooking'), service('fridge-restocking')]
  return (
    <section className="py-16 sm:py-20" aria-labelledby="home-cooking-title">
      <Container>
        <SectionHeading eyebrow="Cooking for your home" title={<span id="home-cooking-title">Weekend cooking & fridge restocking</span>} description="Let us take the cooking off your hands. We prepare soups, stews and meals for your household and pack your fridge with ready-to-eat and ready-to-use homemade food." />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((entry) => (
            <article key={entry.id} className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card">
              <SmartImage src={entry.image} alt={entry.imageAlt} className="aspect-[16/9]" imgClassName="transition duration-500 group-hover:scale-[1.03]" />
              <div className="p-6">
                <h3 className="font-display text-2xl">{entry.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{entry.description}</p>
                <a href={href('services', { service: entry.id })} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">Enquire about {entry.title.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Need larger quantities? <a href={href('services', { service: 'bulk-cooking' })} className="font-semibold text-brand hover:underline">Ask about bulk home cooking</a>.
        </p>
      </Container>
    </section>
  )
}

function Catering() {
  return (
    <section className="bg-brand-deep py-16 text-white sm:py-20" aria-labelledby="catering-title">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-5 gap-3">
          <SmartImage src={cateringImages.hero.src} alt={cateringImages.hero.alt} className="col-span-3 aspect-[3/4] rounded-2xl" />
          <SmartImage src={cateringImages.party.src} alt={cateringImages.party.alt} className="col-span-2 mt-10 aspect-[3/4] rounded-2xl" />
        </div>
        <div>
          <SectionHeading tone="light" eyebrow="Event catering" title={<span id="catering-title">Good food for your celebrations</span>} description="From mini birthday parties and house parties to family celebrations, intimate gatherings and larger events, B’s Menu can prepare the food so you can enjoy the moment." />
          <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-white/85">
            {['Mini birthdays', 'House parties', 'Family celebrations', 'Intimate gatherings', 'Social events', 'Bulk food for larger events'].map((item) => (
              <li key={item} className="flex items-center gap-2"><PartyPopper className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{item}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={href('catering')} className={buttonClass('light', 'lg')}>Plan your event <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href={buildWhatsAppUrl('Hello B’s Menu! I would like to enquire about event catering.')} target="_blank" rel="noopener noreferrer" className={buttonClass('ghostLight', 'lg')}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

function PrivateChef() {
  const chef = service('private-chef')
  return (
    <section className="py-16 sm:py-20" aria-labelledby="chef-title">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="order-2 lg:order-1">
          <SectionHeading eyebrow="Private chef services" title={<span id="chef-title">Meals prepared around you</span>} description={chef.description} />
          <ul className="mt-6 space-y-2.5">
            {chef.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm text-ink"><HandPlatter className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{point}</li>
            ))}
          </ul>
          <a href={href('services', { service: 'private-chef' })} className={buttonClass('primary', 'lg', 'mt-8')}>Enquire about a private chef</a>
        </div>
        <SmartImage src={chef.image} alt={chef.imageAlt} className="order-1 aspect-[4/3] rounded-[2rem] shadow-card lg:order-2" />
      </Container>
    </section>
  )
}

function Drinks() {
  const drinks = menuItems.filter((item) => item.category === 'drinks')
  if (!drinks.length) return null
  return (
    <section className="bg-lavender py-16 sm:py-20" aria-labelledby="drinks-title">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading eyebrow="Drinks & beverages" title={<span id="drinks-title">Refreshing homemade zobo</span>} description="Our homemade hibiscus drink pairs perfectly with any meal. Add a bottle or two to your order — best served chilled." />
          <a href={href('menu', { category: 'drinks' })} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">See all drinks <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {drinks.slice(0, 2).map((product) => <FoodCard key={product.id} product={product} />)}
        </div>
      </Container>
    </section>
  )
}

const reasons = [
  { icon: Heart, title: 'Homemade with care', text: 'Nigerian and African meals cooked the way home tastes.' },
  { icon: CalendarClock, title: 'Freshly prepared on pre-order', text: 'We cook for your order and confirm your date with you.' },
  { icon: SlidersHorizontal, title: 'Your sizes, your proteins', text: 'Choose your portion and protein options for each meal.' },
  { icon: MessageCircle, title: 'Simple WhatsApp ordering', text: 'Build your order online and send it to us in one tap.' },
]

function WhyChoose() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="why-title">
      <Container>
        <SectionHeading eyebrow="Why B’s Menu" title={<span id="why-title">Why choose B’s Menu</span>} align="center" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-lavender text-brand"><reason.icon className="h-6 w-6" aria-hidden="true" /></span>
              <h3 className="mt-4 text-lg font-semibold">{reason.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{reason.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function WhatsAppCTA() {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand px-6 py-12 text-center text-white sm:px-12 sm:py-16">
        <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight sm:text-4xl">Ready to order? We’re one message away.</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">Build your order from our menu, or message us directly to ask about availability, bulk cooking or catering.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={buildWhatsAppUrl('Hello B’s Menu! I would like to place an order.')} target="_blank" rel="noopener noreferrer" className={buttonClass('accent', 'lg')}>
            <MessageCircle className="h-5 w-5" aria-hidden="true" /> Order on WhatsApp
          </a>
          <a href={href('menu')} className={buttonClass('ghostLight', 'lg')}>Explore Our Menu</a>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Featured />
      <HowToOrder />
      <HomeCooking />
      <Catering />
      <PrivateChef />
      <Drinks />
      <WhyChoose />
      <WhatsAppCTA />
    </>
  )
}
