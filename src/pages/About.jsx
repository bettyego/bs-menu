import { ArrowRight, CookingPot, Heart, Quote, Users } from 'lucide-react'
import WhatsAppCTA from '../components/WhatsAppCTA'
import { Container, EditorNote, Eyebrow, PageHeader, SectionHeading, SmartImage } from '../components/ui'
import { buttonClass } from '../utils/styles'
import { aboutContent } from '../data/contentData'
import { activeCategories, menuItems } from '../data/menuData'
import { siteImages } from '../data/servicesData'
import { href } from '../utils/router'

const values = [
  { icon: Heart, title: 'Cooked with care', text: 'Every pot is prepared the way we’d cook for our own families.' },
  { icon: CookingPot, title: 'Rooted in Nigerian & African cooking', text: 'Soups, stews and sauces full of the flavours you grew up with.' },
  { icon: Users, title: 'For individuals, families & events', text: 'From a single order to a full celebration, we cook to your needs.' },
]

/** Our story — shows the owner's own words from contentData.aboutContent, or a tasteful "coming soon". */
function Story() {
  const { story, founderName, founderRole, founderImage, quote, intro, closing } = aboutContent
  const hasStory = story.length > 0
  return (
    <section className="bg-lavender py-16 sm:py-24" aria-labelledby="story-title">
      <Container className={`grid gap-10 ${founderImage ? 'lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16' : ''}`}>
        {founderImage && (
          <figure>
            <SmartImage src={founderImage} alt={founderName ? `${founderName} of B’s Menu` : 'The cook behind B’s Menu'} className="aspect-[4/5] rounded-[2rem] shadow-card" />
            {founderName && (
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-ink">{founderName}</span>
                {founderRole && <span className="text-muted"> · {founderRole}</span>}
              </figcaption>
            )}
          </figure>
        )}
        <div className={founderImage ? '' : 'mx-auto max-w-3xl'}>
          <Eyebrow>Our story</Eyebrow>
          <h2 id="story-title" className="mt-3 font-display text-[1.9rem] leading-tight text-ink sm:text-4xl">The kitchen behind B’s Menu</h2>
          {hasStory && intro && <p className="mt-4 text-lg font-medium leading-8 text-brand sm:text-xl">{intro}</p>}
          {hasStory ? (
            <div className="mt-6 space-y-4 text-base leading-8 text-muted">
              {story.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
            </div>
          ) : (
            <p className="mt-6 text-base leading-8 text-muted">
              Our full story — the people, the kitchen and the recipes behind B’s Menu — is coming soon. In the meantime, the best introduction is a plate of our food.
            </p>
          )}
          {quote && (
            <blockquote className="mt-8 border-l-4 border-accent pl-5 font-display text-xl leading-snug text-ink sm:text-2xl">
              <Quote className="mb-2 h-5 w-5 text-accent" aria-hidden="true" />
              {quote}
              {founderName && !founderImage && <footer className="mt-3 font-sans text-sm text-muted">— {founderName}{founderRole ? `, ${founderRole}` : ''}</footer>}
            </blockquote>
          )}
          {hasStory && closing && <p className="mt-6 text-base font-medium text-ink">{closing}</p>}
          {!hasStory && (
            <EditorNote title="Your brand story" className="mt-8">
              Add your story in your own words to <code>aboutContent.story</code> (one paragraph per item), plus optional <code>founderName</code>, <code>founderRole</code>, <code>founderImage</code> and a short <code>quote</code>, in <code>src/data/contentData.js</code>.
            </EditorNote>
          )}
        </div>
      </Container>
    </section>
  )
}

function Philosophy() {
  const { philosophy } = aboutContent
  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="values-title">
      <Container>
        <SectionHeading eyebrow="How we cook" title={<span id="values-title">What matters to us</span>} align="center" />
        {philosophy.length > 0 && (
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-base leading-8 text-muted">
            {philosophy.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)}
          </div>
        )}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white"><value.icon className="h-5 w-5" aria-hidden="true" /></span>
              <h3 className="mt-5 text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{value.text}</p>
            </div>
          ))}
        </div>
        {philosophy.length === 0 && (
          <EditorNote title="Your cooking philosophy" className="mx-auto mt-8 max-w-3xl">
            Add a few sentences about how you cook — ingredients, seasoning, freshness — to <code>aboutContent.philosophy</code> in <code>src/data/contentData.js</code>. They appear above these three cards.
          </EditorNote>
        )}
      </Container>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About B’s Menu" title="Good food, made the way home tastes" />

      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <SmartImage src={siteImages.about.src} alt={siteImages.about.alt} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] rounded-[2rem] shadow-card" />
        <div className="space-y-5 text-base leading-7 text-muted">
          <p className="font-display text-2xl leading-snug text-ink sm:text-[1.7rem]">
            B’s Menu is an Abuja-based food business focused on delicious Nigerian and African home-cooked meals.
          </p>
          <p>
            We prepare homemade soups, stews, sauces, rice dishes and other meals, plus zobo and fresh drinks, on pre-order — so every meal is cooked fresh for the people who will enjoy it. We also offer fridge restocking, home cooking, food preparation and delivery, and catering for small events and gatherings.
          </p>
          <p>
            Our goal is simple: to bring good, homemade food closer to you, and to make ordering it as easy as sending a message.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <a href={href('menu')} className={buttonClass('primary', 'lg')}>Explore Our Menu <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href={href('services')} className={buttonClass('outline', 'lg')}>Our services</a>
          </div>
        </div>
      </Container>

      <Story />
      <Philosophy />

      <section className="border-t border-line bg-white py-14" aria-labelledby="about-cook-title">
        <Container>
          <h2 id="about-cook-title" className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand">What we cook</h2>
          <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {activeCategories.flatMap((category) => menuItems.filter((item) => item.category === category.id)).map((item) => (
              <li key={item.id}>
                <a href={href('menu', { item: item.id })} className="inline-flex rounded-full border border-line px-4 py-2 text-sm text-ink transition hover:border-brand hover:text-brand">{item.name}</a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <WhatsAppCTA />
    </>
  )
}
