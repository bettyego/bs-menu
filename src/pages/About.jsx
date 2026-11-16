import { ArrowRight, CookingPot, Heart, Users } from 'lucide-react'
import { Container, PageHeader, SectionHeading, SmartImage } from '../components/ui'
import { buttonClass } from '../utils/styles'
import { WhatsAppCTA } from './Home'
import { siteImages } from '../data/servicesData'
import { href } from '../utils/router'

const values = [
  { icon: Heart, title: 'Cooked with care', text: 'Every pot is prepared the way we’d cook for our own families.' },
  { icon: CookingPot, title: 'Rooted in Nigerian & African cooking', text: 'Soups, stews and sauces full of the flavours you grew up with.' },
  { icon: Users, title: 'For individuals, families & events', text: 'From a single order to a full celebration, we cook to your needs.' },
]

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About B’s Menu" title="Good food, made the way home tastes" />

      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <SmartImage src={siteImages.about.src} alt={siteImages.about.alt} className="aspect-[4/3] rounded-[2rem] shadow-card" />
        <div className="space-y-5 text-base leading-7 text-muted">
          <p className="text-lg leading-8 text-ink">
            B’s Menu is an Abuja-based food business focused on delicious Nigerian and African home-cooked meals.
          </p>
          <p>
            We prepare homemade soups, stews, sauces and drinks on pre-order, so every meal is cooked fresh for the people who will enjoy it. Alongside our menu, we offer cooking and catering solutions — weekend cooking, bulk home cooking, fridge restocking, private chef services and event catering — for individuals, families and gatherings.
          </p>
          <p>
            Our goal is simple: to bring good, homemade food closer to you, and to make ordering it as easy as sending a message.
          </p>
          {/* PLACEHOLDER: Add the founder's story, photo and the B's Menu journey here once provided. */}
          <div className="rounded-2xl border border-dashed border-brand/30 bg-lavender p-4 text-sm text-brand">
            <strong className="font-semibold">Our story — coming soon.</strong> More about the people behind B’s Menu will be shared here.
          </div>
          <a href={href('menu')} className={buttonClass('primary', 'lg')}>Explore Our Menu <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
        </div>
      </Container>

      <section className="bg-lavender py-14 sm:py-20" aria-labelledby="values-title">
        <Container>
          <SectionHeading eyebrow="What we stand for" title={<span id="values-title">What matters to us</span>} align="center" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl bg-white p-6 shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white"><value.icon className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{value.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <div className="pt-16 sm:pt-20"><WhatsAppCTA /></div>
    </>
  )
}
