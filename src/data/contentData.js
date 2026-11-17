/**
 * B's Menu — editable website content (everything that is NOT the menu or contact details).
 *
 *   Menu items & prices  → src/data/menuData.js
 *   Phone, WhatsApp, email, socials, delivery fee → src/config/businessConfig.js
 *   Everything else (weekly menu, best sellers, bundles, reviews, galleries,
 *   delivery info, FAQs, About story) → THIS FILE
 *
 * RULES OF THUMB
 * • Empty lists ([]) and `null` values hide their section on the live site, so nothing
 *   unfinished is ever shown to customers. While you run `npm run dev`, a dashed
 *   "editor note" box appears in their place to show where content will go.
 * • Only add REAL content: genuine customer reviews (with permission), real photos of
 *   B's Menu food, and real prices. Never add made-up reviews or ratings.
 * • Photos: all site photos are listed in src/data/images.js (menu item photos in menuData.js).
 *   Put your files in /public/images/… and reference them as '/images/…/file.jpg'.
 */
import { businessConfig } from '../config/businessConfig'

/* ───────────────────────── WEEKLY MENU ─────────────────────────
 * A flexible list of what you are cooking this week. Update it as often as you like.
 *
 * `items` accepts two kinds of entries, in any order:
 *   1. A menu item id from menuData.js, e.g. 'egusi-soup'
 *      → shows its photo and links to the menu so customers can add it to their order.
 *   2. Any other meal or drink, written out, e.g.
 *        { name: 'Jollof Rice', description: 'Smoky party-style jollof', image: '/images/menu/jollof.jpg' }
 *        { name: 'Pineapple & ginger juice', description: 'Freshly pressed' }   // image is optional
 *      → shows with an "Ask on WhatsApp" link (no price is shown).
 *
 * `alsoPrepare` is a short list shown under the heading so customers know you cook more
 * than what is listed this week. Set it to [] to hide it.
 *
 * To hide the whole section (e.g. a week you are not updating it): enabled: false
 * ⚠️ The five items below are examples taken from your message — replace them with this week's meals.
 */
export const weeklyMenu = {
  enabled: true,
  title: 'This week’s menu',
  weekLabel: null, // e.g. 'Week of 17 November'
  orderDeadline: null, // e.g. 'Order by Thursday 6pm for weekend delivery'
  note: 'A selection of what’s cooking this week. Pre-order online, or message us on WhatsApp to ask what else is available.',
  items: [
    'egusi-soup',
    'oha-soup',
    'tomato-stew',
    'assorted-meat-stew',
    'zobo',
    // { name: 'Jollof Rice', description: 'Smoky party-style jollof rice', image: '/images/menu/jollof.jpg' },
    // { name: 'Fresh fruit juice', description: 'Freshly made — ask for this week’s flavours' },
  ],
  alsoPrepare: ['Other Nigerian soups', 'Stews & sauces', 'Rice dishes', 'Other home-cooked meals', 'Fresh juices', 'Nutritious drinks'],
}

/** Menu item ids that appear in the weekly menu (used for the "On this week’s menu" badge). */
export const weeklyMenuItemIds = weeklyMenu.enabled ? weeklyMenu.items.filter((entry) => typeof entry === 'string') : []

/* ───────────────────────── BEST SELLERS ─────────────────────────
 * List the ids of your genuine best-selling items. While this is empty, the homepage
 * shows your `featured: true` items under the heading "Featured meals" instead,
 * so we never claim something is a best seller unless you say so.
 */
export const bestSellerIds = []

/* ───────────────────────── MEAL BUNDLES & PACKAGES ─────────────────────────
 * Optional. Each package gets a card with a WhatsApp "Order this package" button.
 * Example:
 *   {
 *     id: 'family-weekend',
 *     name: 'Family Weekend Package',
 *     description: 'Two soups and one stew to see your family through the weekend.',
 *     includes: ['2L Egusi soup', '2L Oha soup', '2L Tomato stew (chicken)'],
 *     serves: 'Family of 4–5',
 *     price: null,               // number in naira, or null for "Price on request"
 *     image: '/images/bundles/family-weekend.jpg',
 *     imageAlt: 'Three containers of soup and stew',
 *   }
 * Tip: to let customers add a package to the cart instead, add it to menuData.js
 * with category: 'combos'.
 */
export const bundles = {
  enabled: true,
  title: 'Meal bundles & packages',
  description: 'Ready-made combinations for busy weeks, families and weekends — order in one message.',
  items: [],
}

/* ───────────────────────── CUSTOMER REVIEWS ─────────────────────────
 * The reviews section is HIDDEN until you switch it on. To activate it later:
 *   1. Add genuine reviews (with the customer's permission) to `items`, e.g.
 *        { quote: 'The egusi tasted just like home.', name: 'Adaeze O.', context: 'Ordered egusi soup', source: 'WhatsApp' }
 *   2. Set enabled: true
 * The section only appears when it is enabled AND has at least one review.
 */
export const reviews = {
  enabled: false,
  title: 'What our customers say',
  items: [],
}

/* ───────────────────────── PHOTO GALLERIES ─────────────────────────
 * mealGallery: REAL photos of B's Menu food only. { src, alt, caption }
 */
export const mealGallery = []

/**
 * Instagram gallery. Add the profile link in businessConfig.social.instagram,
 * then add a few recent post photos here: { src, alt, link } (link = the post URL, optional).
 */
export const instagramGallery = {
  handle: null, // e.g. '@bsmenu'
  images: [],
}

// The catering gallery now lives in src/data/images.js (cateringGallery) with all other photos.

/* ───────────────────────── CATERING PACKAGES & SAMPLE MENUS ─────────────────────────
 * cateringPackages: { name, description, idealFor, includes: [], price: null }
 * cateringSampleMenus: { title, dishes: [] }
 * While both are empty, the catering page explains that every event is quoted individually.
 */
export const cateringPackages = []
export const cateringSampleMenus = []

/* ───────────────────────── PRE-ORDER & DELIVERY ─────────────────────────
 * Leave a value as null until it is confirmed — it is then simply not shown.
 */
export const deliveryInfo = {
  leadTime: null, // e.g. 'Please order at least 48 hours before your preferred date.'
  deliveryDays: null, // e.g. 'Deliveries run Tuesday to Saturday.'
  deliveryAreas: null, // e.g. 'Most areas within Abuja, including Wuse, Maitama, Gwarinpa and Lugbe.'
  pickupDetails: null, // e.g. 'Pickup from our kitchen in Lokogoma — address shared on confirmation.'
  paymentNote: null, // e.g. 'Payment by bank transfer confirms your order.'
}

/* ───────────────────────── FREQUENTLY ASKED QUESTIONS ─────────────────────────
 * Edit freely. `home: true` also shows the question on the homepage.
 */
const fulfilment = businessConfig.fulfilmentOptions.map((option) => option.toLowerCase()).join(' and ')

export const faqs = [
  {
    home: true,
    question: 'How do I place an order?',
    answer:
      'Browse our menu, choose your size, protein and quantity, and add meals to your order. When you’re ready, fill in your details and tap “Send Order on WhatsApp” — your full order is sent to us in one message and we reply to confirm.',
  },
  {
    home: true,
    question: 'Why do you only cook on pre-order?',
    answer: `Everything is cooked fresh for the people who will eat it. ${businessConfig.preOrderNotice}${deliveryInfo.leadTime ? ` ${deliveryInfo.leadTime}` : ''}`,
  },
  {
    home: true,
    question: 'Do you deliver?',
    answer: `We offer ${fulfilment} in ${businessConfig.serviceArea}. ${
      typeof businessConfig.deliveryFee === 'number'
        ? 'A delivery fee applies and is shown on your order.'
        : 'Delivery charges depend on your location and are confirmed with you on WhatsApp before your order is prepared.'
    }`,
  },
  {
    home: true,
    question: 'How do I pay?',
    answer:
      deliveryInfo.paymentNote ??
      'There is no payment on the website. Once we confirm your order on WhatsApp, we send you payment instructions.',
  },
  {
    question: 'Why do some meals say “Price on request”?',
    answer:
      'Prices depend on the size and protein you choose. Where a price isn’t listed yet, we confirm the exact price for your selection on WhatsApp before anything is prepared.',
  },
  {
    question: 'Can I choose my protein and portion size?',
    answer:
      'Yes. Soups and stews are sold by the litre, and many meals let you pick your protein — for example assorted meat, goat meat, beef, chicken or fish. Each combination is added to your order as its own line.',
  },
  {
    question: 'Do you cater for events?',
    answer:
      'Yes — we cater for smaller events and gatherings such as birthdays, office meetings, office celebrations and get-togethers. Every event is quoted individually based on your guest count and menu. Use the quote form on our Event Catering page.',
  },
  {
    home: true,
    question: 'Do you only cook what’s on the menu?',
    answer:
      'No. Our menu and weekly menu show a selection of what we prepare. We cook a wide range of Nigerian soups, stews, sauces, rice dishes and other home-cooked meals, plus zobo, fresh juices and other drinks. Message us on WhatsApp to ask what’s available.',
  },
  {
    question: 'Can you restock my fridge or cook in my home?',
    answer:
      'Yes. We offer fridge restocking, home cooking, and food preparation with delivery. Each is arranged with you directly — send an enquiry from our Services page or message us on WhatsApp.',
  },
]

/* ───────────────────────── ABOUT US ─────────────────────────
 * Add your real story in your own words. Each array item is one paragraph.
 * Until `story` has paragraphs, the About page shows "Our story — coming soon".
 */
export const aboutContent = {
  founderName: null, // e.g. 'Beth'
  founderRole: null, // e.g. 'Founder & Head Cook'
  founderImage: null, // e.g. '/images/about/founder.jpg'
  intro: 'Good food, genuine passion, and a little beginning that grew into something more.', // shown as a lead line under the heading
  story: [
    'B’s Menu started during my university days, with something as simple as making and selling moi moi.',
    'What began as a small hustle in school gradually became something I genuinely enjoyed doing. I started by preparing moi moi and delivering orders to students in my hostel and nearby hostels. Before long, I noticed that many students wanted good, home-cooked meals but didn’t always have the time, energy or convenience to prepare them themselves.',
    'That was where the idea began to grow.',
    'I started offering more than just food deliveries. I began cooking meals for people, preparing food in their homes and helping them enjoy freshly made meals without having to do all the cooking themselves.',
    'Over time, what started as a small university hustle developed into a food business.',
    'Today, B’s Menu continues that journey by offering pre-order meals, home cooking services, fridge restocking, fresh drinks and catering for small events and gatherings.',
    'Whether it’s preparing different soups and stews to stock your fridge, making fresh and nourishing drinks, cooking for your home or providing food for a birthday celebration or office gathering, our goal is simple: to make good food and convenient cooking services accessible to more people.',
  ],
  closing: 'Thank you for being part of it.', // shown after the quote
  philosophy: [], // your cooking philosophy — e.g. how you source ingredients, cook, season
  quote: 'B’s Menu is still growing, and we’re excited about every step of the journey.', // shown as a pull quote
}
