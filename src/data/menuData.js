/**
 * B's Menu — central menu data.
 *
 * HOW TO EDIT
 * -----------
 * • Change a price: set the number (in naira, no commas) on the size, e.g. price: 12000.
 *   Leave `null` to show "Price on request".
 * • Protein prices: `extraPrice` is ADDED to the size price (0 = no extra charge).
 *   For full control of a specific combination, use `priceOverrides`, e.g.
 *     priceOverrides: { '2l|goat': 26000 }   // key = 'sizeId|proteinId'
 * • Products without sizes use the top-level `price`.
 * • Replace a photo: put the file in /public/images/menu/ and set
 *     image: '/images/menu/egusi.jpg'
 * • Hide an item temporarily: available: false (shows "Currently unavailable").
 * • Featured on the homepage: featured: true.
 * • Add a new item: copy an existing block, give it a unique `id`, and set its `category`
 *   to one of the category ids below.
 *
 * ⚠️ All prices are `null` until B's Menu supplies real prices.
 * ⚠️ Photos are temporary stock images (Unsplash) — replace with real B's Menu photos.
 */

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&h=675&q=75`

export const categories = [
  { id: 'soups', name: 'Soups', blurb: 'Rich, homemade Nigerian soups, sold mainly by the litre.', image: unsplash('1645066804237-08145dd196e9'), imageAlt: 'A bowl of Nigerian pepper soup with fish' },
  { id: 'stews', name: 'Stews', blurb: 'Classic stews with your choice of protein.', image: unsplash('1665332398215-825114bbb355'), imageAlt: 'Nigerian stew served with white rice and plantain' },
  { id: 'sauces', name: 'Sauces', blurb: 'Flavourful sauces for rice, yam, plantain and more.', image: unsplash('1740707591344-ee3feb4d06c5'), imageAlt: 'Meat simmered in a rich sauce' },
  { id: 'other-meals', name: 'Other Meals', blurb: 'More Nigerian and African favourites.' },
  { id: 'drinks', name: 'Drinks', blurb: 'Homemade drinks, including our zobo.', image: unsplash('1593624191635-f1a49f5eca76'), imageAlt: 'A glass of hibiscus drink beside dried hibiscus petals' },
  { id: 'combos', name: 'Combos & Packages', blurb: 'Family meals, weekend packages and bundles.' },
]

/** Reusable protein lists — each product can use its own instead. */
const soupProteins = [
  { id: 'assorted', label: 'Assorted meat', extraPrice: null },
  { id: 'goat', label: 'Goat meat', extraPrice: null },
  { id: 'beef', label: 'Beef', extraPrice: null },
  { id: 'chicken', label: 'Chicken', extraPrice: null },
  { id: 'fish', label: 'Fish', extraPrice: null },
]

const litreSizes = [
  { id: '1l', label: '1 Litre', price: null },
  { id: '2l', label: '2 Litres', price: null },
  { id: '3l', label: '3 Litres', price: null },
]

const soupPreOrder = 'Prepared fresh on pre-order. Confirm your date with us on WhatsApp.'

export const menuItems = [
  // ───────────────────────── SOUPS ─────────────────────────
  {
    id: 'egusi-soup',
    name: 'Egusi Soup',
    category: 'soups',
    description: 'Ground melon seed soup cooked with leafy vegetables, palm oil and rich Nigerian seasoning.',
    image: unsplash('1763048443535-1243379234e2'),
    imageAlt: 'A bowl of egusi soup with assorted meats',
    pricingUnit: 'per litre',
    sizes: litreSizes,
    proteins: soupProteins,
    available: true,
    preOrderNote: soupPreOrder,
    featured: true,
  },
  {
    id: 'ogbono-soup',
    name: 'Ogbono Soup',
    category: 'soups',
    description: 'Smooth, hearty draw soup made with ground ogbono seeds, perfect with your favourite swallow.',
    image: unsplash('1705088293125-063256c88cf5'),
    imageAlt: 'Bowls of Nigerian soups and stews, including ogbono-style draw soup',
    pricingUnit: 'per litre',
    sizes: litreSizes,
    proteins: soupProteins,
    available: true,
    preOrderNote: soupPreOrder,
    featured: false,
  },
  {
    id: 'okra-soup',
    name: 'Okra Soup',
    category: 'soups',
    description: 'Fresh chopped okra cooked into a light, flavourful soup.',
    image: unsplash('1722239312486-2675eac7cec3'),
    imageAlt: 'A white bowl of green okra soup',
    pricingUnit: 'per litre',
    sizes: litreSizes,
    proteins: soupProteins,
    available: true,
    preOrderNote: soupPreOrder,
    featured: false,
  },
  {
    id: 'oha-soup',
    name: 'Oha Soup',
    category: 'soups',
    description: 'Traditional Igbo soup with tender oha leaves and a cocoyam-thickened base.',
    image: unsplash('1604329760661-e71dc83f8f26'),
    imageAlt: 'A bowl of green leafy Nigerian soup served with pounded yam',
    pricingUnit: 'per litre',
    sizes: litreSizes,
    proteins: soupProteins,
    available: true,
    preOrderNote: soupPreOrder,
    featured: true,
  },
  {
    id: 'bitterleaf-soup',
    name: 'Bitterleaf Soup',
    category: 'soups',
    description: 'Ofe onugbu — washed bitterleaf in a rich, deeply savoury soup.',
    image: unsplash('1673465580365-b96bef916770'),
    imageAlt: 'A plate of dark leafy bitterleaf soup with swallow on the side',
    pricingUnit: 'per litre',
    sizes: litreSizes,
    proteins: soupProteins,
    available: true,
    preOrderNote: soupPreOrder,
    featured: false,
  },

  // ───────────────────────── STEWS ─────────────────────────
  {
    id: 'tomato-stew',
    name: 'Nigerian Tomato Stew',
    category: 'stews',
    description: 'Classic fried tomato and pepper stew. Choose your protein — each option is priced separately.',
    image: unsplash('1575919159574-e49dc9e1228f'),
    imageAlt: 'A bowl of red Nigerian tomato and pepper stew',
    pricingUnit: 'per litre',
    sizes: litreSizes,
    proteins: [
      { id: 'none', label: 'No protein (plain stew)', extraPrice: 0 },
      { id: 'chicken', label: 'Chicken', extraPrice: null },
      { id: 'goat', label: 'Goat meat', extraPrice: null },
      { id: 'assorted', label: 'Assorted meat', extraPrice: null },
      { id: 'beef', label: 'Beef', extraPrice: null },
    ],
    available: true,
    preOrderNote: 'Prepared fresh on pre-order.',
    featured: true,
  },
  {
    id: 'chicken-stew',
    name: 'Chicken Stew',
    category: 'stews',
    description: 'Tender chicken pieces simmered in a rich tomato and pepper stew.',
    image: unsplash('1708782344071-35ed44b849a9'),
    imageAlt: 'Chicken pieces in red Nigerian stew',
    pricingUnit: 'per litre',
    sizes: litreSizes,
    proteins: [],
    available: true,
    preOrderNote: 'Prepared fresh on pre-order.',
    featured: false,
  },
  {
    id: 'goat-meat-stew',
    name: 'Goat Meat Stew',
    category: 'stews',
    description: 'Well-seasoned goat meat cooked low and slow in a flavourful stew.',
    image: unsplash('1596797038530-2c107229654b'),
    imageAlt: 'Goat meat stew cooking in a pan, topped with herbs',
    pricingUnit: 'per litre',
    sizes: litreSizes,
    proteins: [],
    available: true,
    preOrderNote: 'Prepared fresh on pre-order.',
    featured: false,
  },
  {
    id: 'assorted-meat-stew',
    name: 'Assorted Meat Stew',
    category: 'stews',
    description: 'A generous mix of assorted meats in a deep, peppery stew.',
    image: unsplash('1708782344137-21c48d98dfcc'),
    imageAlt: 'A bowl of assorted meat stew',
    pricingUnit: 'per litre',
    sizes: litreSizes,
    proteins: [],
    available: true,
    preOrderNote: 'Prepared fresh on pre-order.',
    featured: true,
  },
  {
    id: 'beef-stew',
    name: 'Beef Stew',
    category: 'stews',
    description: 'Juicy beef chunks in a classic Nigerian-style stew.',
    image: unsplash('1608500218861-01091cdc501e'),
    imageAlt: 'A bowl of beef stew with vegetables',
    pricingUnit: 'per litre',
    sizes: litreSizes,
    proteins: [],
    available: true,
    preOrderNote: 'Prepared fresh on pre-order.',
    featured: false,
  },

  // ───────────────────────── SAUCES ─────────────────────────
  {
    id: 'egg-sauce',
    name: 'Egg Sauce',
    category: 'sauces',
    description: 'Eggs cooked in a light tomato and pepper sauce — lovely with yam, plantain or bread.',
    image: unsplash('1661588669110-81142a5b9e57'),
    imageAlt: 'Egg in a warm tomato-based sauce',
    pricingUnit: 'per pack',
    sizes: [
      { id: 'small', label: 'Small pack', price: null },
      { id: 'large', label: 'Large pack', price: null },
    ],
    proteins: [],
    available: true,
    preOrderNote: 'Prepared fresh on pre-order.',
    featured: false,
  },
  {
    id: 'coconut-sauce',
    name: 'Coconut Sauce',
    category: 'sauces',
    description: 'Creamy coconut sauce with a gentle pepper kick, great with rice.',
    image: unsplash('1764304733301-3a9f335f0c67'),
    imageAlt: 'Creamy coconut sauce with chicken',
    pricingUnit: 'per litre',
    sizes: [
      { id: '1l', label: '1 Litre', price: null },
      { id: '2l', label: '2 Litres', price: null },
    ],
    proteins: [
      { id: 'chicken', label: 'Chicken', extraPrice: null },
      { id: 'beef', label: 'Beef', extraPrice: null },
    ],
    available: true,
    preOrderNote: 'Prepared fresh on pre-order.',
    featured: false,
  },
  {
    id: 'chicken-sauce',
    name: 'Chicken Sauce',
    category: 'sauces',
    description: 'Chicken simmered with peppers and onions in a savoury sauce.',
    image: unsplash('1631292784640-2b24be784d5d'),
    imageAlt: 'Chicken sauce with peppers in a pan',
    pricingUnit: 'per litre',
    sizes: [
      { id: '1l', label: '1 Litre', price: null },
      { id: '2l', label: '2 Litres', price: null },
    ],
    proteins: [],
    available: true,
    preOrderNote: 'Prepared fresh on pre-order.',
    featured: false,
  },

  // ───────────────────────── OTHER MEALS ─────────────────────────
  // Add other meals here with category: 'other-meals'. The category stays hidden until it has items.

  // ───────────────────────── DRINKS ─────────────────────────
  {
    id: 'zobo',
    name: 'Zobo',
    category: 'drinks',
    description: 'Homemade hibiscus drink, naturally refreshing and best served chilled.',
    image: unsplash('1566823422707-7813dab8eca9'),
    imageAlt: 'A chilled glass of red zobo drink',
    pricingUnit: 'per bottle',
    sizes: [
      { id: '50cl', label: '50cl bottle', price: null },
      { id: '1l', label: '1 Litre bottle', price: null },
    ],
    proteins: [],
    available: true,
    preOrderNote: 'Made fresh on pre-order.',
    featured: true,
  },

  // ───────────────────────── COMBOS & PACKAGES ─────────────────────────
  // Add packages here with category: 'combos'. The category stays hidden until it has items.
]

/** Categories that currently have at least one product. */
export const activeCategories = categories.filter((category) =>
  menuItems.some((item) => item.category === category.id),
)

export function getCategoryName(categoryId) {
  return categories.find((category) => category.id === categoryId)?.name ?? categoryId
}
