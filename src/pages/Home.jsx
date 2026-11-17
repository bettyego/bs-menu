import { ArrowRight, MessageCircle, PartyPopper } from 'lucide-react'
import Hero from '../components/Hero'
import FoodCard from '../components/FoodCard'
import HowToOrder from '../components/HowToOrder'
import WeeklyMenu from '../components/WeeklyMenu'
import Bundles from '../components/Bundles'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import ServiceCard from '../components/ServiceCard'
import WhatsAppCTA from '../components/WhatsAppCTA'
import { InstagramGallery, MealGallery } from '../components/Gallery'
import { Container, SectionHeading, SmartImage } from '../components/ui'
import { buttonClass } from '../utils/styles'
import { activeCategories, menuItems } from '../data/menuData'
import { bestSellerIds } from '../data/contentData'
import { cateringImages, services } from '../data/servicesData'
import { buildWhatsAppUrl } from '../utils/whatsapp'
import { href } from '../utils/router'

/** Food catalogue: every category that has dishes, with a photo and dish count. */
function Categories() {
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="categories-title">
      <Container>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Our food" title={<span id="categories-title">What’s cooking at B’s Menu</span>} description="A taste of what we cook — soups, stews, sauces and drinks you can order online. We prepare many more Nigerian meals on request." />
          <a href={href('menu')} className={buttonClass('outline', 'md', 'shrink-0 self-start sm:self-auto')}>
            View full menu <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {activeCategories.map((category) => {
            const dishes = menuItems.filter((item) => item.category === category.id)
            const image = category.image ?? dishes[0]?.image
            return (
              <a key={category.id} href={href('menu', { category: category.id })} className="group relative overflow-hidden rounded-2xl shadow-card">
                <SmartImage src={image} alt={category.imageAlt ?? dishes[0]?.imageAlt ?? category.name} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/5]" imgClassName="transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">{dishes.length} {dishes.length === 1 ? 'item' : 'items'}</p>
                  <h3 className="mt-1 font-display text-2xl text-white sm:text-[1.75rem]">{category.name}</h3>
                  <p className="mt-1 hidden text-sm leading-5 text-white/80 sm:block">{category.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white">
                    Browse <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

/**
 * Best sellers come from contentData.bestSellerIds. Until the owner lists genuine best sellers,
 * the section honestly shows the menu's featured items as "Featured meals".
 */
function BestSellers() {
  const bestSellers = bestSellerIds.map((id) => menuItems.find((item) => item.id === id)).filter(Boolean)
  const hasBestSellers = bestSellers.length > 0
  const products = (hasBestSellers ? bestSellers : menuItems.filter((item) => item.featured)).filter((item) => item.available !== false).slice(0, 4)
  if (!products.length) return null

  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="featured-title">
      <Container>
        <SectionHeading
          eyebrow={hasBestSellers ? 'Customer favourites' : 'From our kitchen'}
          title={<span id="featured-title">{hasBestSellers ? 'Our best sellers' : 'Featured meals'}</span>}
          description="Pick your size and protein, add to your order, and send it to us on WhatsApp."
        />
        {/* Swipeable row on phones, grid from tablet up */}
        <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="w-[86%] shrink-0 snap-center sm:w-auto">
              <FoodCard product={product} />
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-muted sm:hidden" aria-hidden="true">Swipe to see more →</p>
        <div className="mt-10 text-center">
          <a href={href('menu')} className={buttonClass('primary', 'lg')}>See the full menu <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
      </Container>
    </section>
  )
}

function Services() {
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="services-title">
      <Container>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Our services" title={<span id="services-title">Let us take the cooking off your hands</span>} description="Pre-order meals, fridge restocking, home cooking, food preparation and delivery, fresh drinks and small-event catering — each arranged with you to suit your needs." />
          <a href={href('services')} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand hover:underline">All services <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
        {/* Swipeable row on phones, grid from tablet up */}
        <div className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="w-[82%] shrink-0 snap-center sm:w-auto">
              <ServiceCard service={service} compact onEnquire={(id) => { window.location.hash = href('services', { service: id }) }} />
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-muted sm:hidden" aria-hidden="true">Swipe to see all services →</p>
      </Container>
    </section>
  )
}

function Catering() {
  return (
    <section className="bg-brand-deep py-16 text-white sm:py-24" aria-labelledby="catering-title">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-5 gap-3">
          <SmartImage src={cateringImages.hero.src} alt={cateringImages.hero.alt} className="col-span-3 aspect-[3/4] rounded-2xl" />
          <SmartImage src={cateringImages.party.src} alt={cateringImages.party.alt} className="col-span-2 mt-10 aspect-[3/4] rounded-2xl" />
        </div>
        <div>
          <SectionHeading tone="light" eyebrow="Small-event catering" title={<span id="catering-title">Good food for your gatherings</span>} description="We cater for smaller events — birthdays, office meetings, office celebrations and get-togethers — with fresh, home-cooked food, so you can enjoy the moment." />
          <ul className="mt-6 grid grid-cols-2 gap-2 text-sm text-white/85">
            {['Birthdays', 'Office meetings', 'Office celebrations', 'Get-togethers', 'House parties', 'Family celebrations'].map((item) => (
              <li key={item} className="flex items-center gap-2"><PartyPopper className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />{item}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={href('catering')} className={buttonClass('light', 'lg')}>Request a quote <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href={buildWhatsAppUrl('Hello B’s Menu! I would like to enquire about event catering.')} target="_blank" rel="noopener noreferrer" className={buttonClass('ghostLight', 'lg')}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

function HomeFAQ() {
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="faq-title">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="Good to know" title={<span id="faq-title">Questions, answered</span>} description="Everything you need to know about ordering, pre-orders, delivery and payment." />
          <a href={href('contact')} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">See all FAQs <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
        <FAQ homeOnly />
      </Container>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <WeeklyMenu />
      <BestSellers />
      <Bundles />
      <HowToOrder />
      <Services />
      <Catering />
      <Testimonials />
      <MealGallery />
      <InstagramGallery />
      <HomeFAQ />
      <div className="border-t border-line">
        <WhatsAppCTA />
      </div>
    </>
  )
}
