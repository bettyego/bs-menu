import { businessConfig } from '../config/businessConfig'
import { activeCategories } from '../data/menuData'

/**
 * schema.org business details so search engines understand what B's Menu is.
 * Built only from businessConfig — nothing here is invented; unset fields are left out.
 */
export default function StructuredData() {
  const { name, shortDescription, phoneLink, email, serviceArea, address, social } = businessConfig
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name,
    description: shortDescription,
    servesCuisine: ['Nigerian', 'African'],
    areaServed: serviceArea,
    telephone: phoneLink,
    ...(email && { email }),
    ...(address && { address: { '@type': 'PostalAddress', streetAddress: address, addressLocality: 'Abuja', addressCountry: 'NG' } }),
    ...(typeof window !== 'undefined' && { url: `${window.location.origin}/` }),
    hasMenu: { '@type': 'Menu', hasMenuSection: activeCategories.map((category) => ({ '@type': 'MenuSection', name: category.name })) },
    sameAs: Object.values(social).filter(Boolean),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
