/**
 * B's Menu services — edit titles, descriptions and bullet points here.
 * Photos are set in src/data/images.js (serviceImages), keyed by the service `id`.
 * Services are quoted individually — no fixed prices are shown.
 *
 * Optional `link`: sends the main button to another page instead of the enquiry form
 * (e.g. Pre-order Meals → the menu, Small-Event Catering → the catering page).
 * `icon` must be one of the names in src/utils/serviceIcons.js.
 */
import { serviceImages } from './images'

const withImage = (service) => ({ ...service, image: serviceImages[service.id]?.src, imageAlt: serviceImages[service.id]?.alt ?? service.title })

export const services = [
  {
    id: 'pre-order-meals',
    title: 'Pre-order Meals',
    tagline: 'Freshly cooked for your chosen date.',
    icon: 'ShoppingBag',
    description:
      'Order freshly prepared Nigerian meals ahead of time — soups, stews, sauces, rice dishes and other home-cooked meals, cooked for the day you need them.',
    details:
      'Order from our menu or ask what we’re cooking this week, then send your order on WhatsApp. We confirm availability, delivery and payment with you before anything is prepared.',
    points: ['Soups, stews, sauces, rice dishes and more', 'Choose your size and protein', 'Confirmed with you on WhatsApp'],
    link: { page: 'menu', label: 'Order from the menu' },
  },
  {
    id: 'fridge-restocking',
    title: 'Fridge Restocking',
    tagline: 'Open the fridge to homemade food.',
    icon: 'Refrigerator',
    description:
      'We prepare soups, stews, sauces and other meals and pack them so your fridge or freezer stays stocked with ready-to-eat homemade food.',
    details:
      'Tell us what your household enjoys and we’ll cook a mix of meals packed in ready-to-store portions, so busy days still end with a proper home-cooked meal. Restock once, or arrange it regularly with us.',
    points: ['Soups, stews, sauces and other meals', 'Neatly packed, ready-to-store portions', 'Ideal for busy homes and professionals'],
  },
  {
    id: 'home-cooking',
    title: 'Home Cooking',
    tagline: 'Fresh meals, cooked in your home.',
    icon: 'ChefHat',
    description:
      'We prepare fresh meals in your home for you and your family — for the weekend, a special meal or a regular arrangement.',
    details:
      'Tell us who you’re cooking for, what your household enjoys and when you need us, and we’ll plan the meals with you. Every arrangement is discussed with you one-on-one.',
    points: ['Fresh meals cooked in your home', 'Menus planned around your household', 'Arranged with you one-on-one'],
  },
  {
    id: 'food-prep-delivery',
    title: 'Food Preparation & Delivery',
    tagline: 'Cooked for you, brought to you.',
    icon: 'Truck',
    description:
      'Prefer your food cooked and brought to you? We prepare the meals you need and arrange delivery or pickup.',
    details:
      'Good for family orders, stocking up for the week or when you’re hosting at home. Choose the meals and quantities and we’ll quote for your exact order. Delivery charges are confirmed with you based on your location.',
    points: ['Meals and quantities to suit you', 'Delivery or pickup in Abuja', 'Quoted for your exact order'],
  },
  {
    id: 'fresh-drinks',
    title: 'Fresh Drinks',
    tagline: 'Refreshing, homemade and nourishing.',
    icon: 'CupSoda',
    description: 'Zobo, fresh juices and other nutritious drinks, made fresh on pre-order.',
    details:
      'Add drinks to a meal order, stock up for the week or order for a gathering. Ask us which drinks are available when you order.',
    points: ['Zobo, fresh juices and more', 'Made fresh on pre-order', 'For homes, offices and gatherings'],
  },
  {
    id: 'small-event-catering',
    title: 'Small-Event Catering',
    tagline: 'Good food for smaller gatherings.',
    icon: 'PartyPopper',
    description:
      'Homemade food for birthdays, office meetings, office celebrations, get-togethers and similar small gatherings.',
    details:
      'We focus on smaller events, where good home-cooked food makes the occasion. Tell us your date, guest count and the meals you’d like, and we’ll send you a quotation.',
    points: ['Birthdays and get-togethers', 'Office meetings and celebrations', 'Quoted for each event'],
    link: { page: 'catering', label: 'Request a catering quote' },
  },
].map(withImage)

/** Options for the "Event type" field on the catering quote form. */
export const cateringEventTypes = [
  'Birthday celebration',
  'Office meeting',
  'Office celebration',
  'Get-together',
  'House party',
  'Family celebration',
  'Other small gathering',
]

// Photos moved to src/data/images.js — re-exported here so existing imports keep working.
export { cateringImages, siteImages } from './images'
