/**
 * B's Menu services. Edit titles, descriptions and photos here.
 * Services are quoted individually — no fixed prices are shown.
 * ⚠️ Photos are temporary stock images — replace with real B's Menu photos.
 */
const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1000&h=750&q=75`

export const services = [
  {
    id: 'weekend-cooking',
    title: 'Weekend Cooking',
    icon: 'CalendarDays',
    description:
      'Let B’s Menu prepare meals for your home over the weekend, so your family can enjoy good food without spending the weekend in the kitchen.',
    points: ['Meals planned around your household', 'Soups, stews and sauces for the week ahead', 'Arranged ahead on pre-order'],
    image: unsplash('1653233797467-1a528819fd4f'),
    imageAlt: 'Fresh tomatoes and vegetables being chopped on a wooden board',
  },
  {
    id: 'bulk-cooking',
    title: 'Bulk Home Cooking',
    icon: 'CookingPot',
    description:
      'Need large quantities? Request soups, stews, sauces and other meals in bulk for your household, family gatherings or freezer stock.',
    points: ['Larger quantities of your favourites', 'Choose your proteins and portions', 'Quoted to your requirements'],
    image: unsplash('1694579740719-0e601c5d2437'),
    imageAlt: 'A large pan of chicken stew being stirred with a wooden spoon',
  },
  {
    id: 'fridge-restocking',
    title: 'Fridge Restocking',
    icon: 'Refrigerator',
    description:
      'We prepare and pack meals, soups and stews so your fridge or freezer stays stocked with ready-to-eat and ready-to-use homemade food.',
    points: ['Neatly packed, ready-to-store portions', 'A mix of soups, stews and sauces', 'Ideal for busy homes and professionals'],
    image: unsplash('1609915437016-85693e56470f'),
    imageAlt: 'Home-cooked food portioned into storage containers',
  },
  {
    id: 'private-chef',
    title: 'Private Chef Services',
    icon: 'ChefHat',
    description:
      'Have meals prepared for you based on your needs, preferences and arrangements — for your home, a special dinner or an ongoing schedule.',
    points: ['Menus tailored to your preferences', 'For individuals, families and special occasions', 'Arrangements discussed one-on-one'],
    image: unsplash('1577219491135-ce391730fb2c'),
    imageAlt: 'A chef carefully preparing a dish in a kitchen',
  },
]

export const cateringEventTypes = [
  'Mini birthday party',
  'House party',
  'Family celebration',
  'Intimate gathering',
  'Social event',
  'Large event (bulk food)',
  'Other',
]

export const cateringImages = {
  hero: { src: unsplash('1722477936580-84aa10762b0b'), alt: 'Buffet chafing dishes filled with rice and stews at an event' },
  buffet: { src: unsplash('1555244162-803834f70033'), alt: 'An elegant buffet table with a variety of dishes' },
  party: { src: unsplash('1664992960082-0ea299a9c53e'), alt: 'Party jollof rice topped with grilled chicken skewers' },
}

export const siteImages = {
  hero: { src: 'https://images.unsplash.com/photo-1665332195309-9d75071138f0?auto=format&fit=crop&w=1400&h=1100&q=80', alt: 'Nigerian jollof rice served with grilled fish, chicken skewers and fresh peppers' },
  about: { src: unsplash('1665332561290-cc6757172890'), alt: 'Plates of Nigerian stew served with rice' },
}
