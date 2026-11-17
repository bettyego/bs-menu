/**
 * B's Menu — ALL website photos (except individual menu items) in one place.
 *
 * HOW TO USE YOUR OWN PHOTOS
 * 1. Copy the photo into the matching folder under /public/images/
 *      public/images/site/      hero & general photos
 *      public/images/about/     About page photos
 *      public/images/services/  one photo per service
 *      public/images/catering/  event & catering photos (incl. the gallery)
 *      public/images/gallery/   meal gallery (see contentData.js → mealGallery)
 *      public/images/menu/      menu item photos (set in menuData.js, per item)
 * 2. Replace the `stock(...)` value below with the path, starting with /images/, e.g.
 *      hero: { src: '/images/site/egusi.jpg', alt: 'A bowl of our egusi soup' },
 * 3. Always keep a short, accurate `alt` description (used by screen readers and Google).
 *
 * Everything that still uses stock(...) is a TEMPORARY stock photo (Unsplash) — not B's Menu food.
 * Tip: landscape photos about 1200px wide work best; square works for the hero.
 */
export const stock = (id, w = 1000, h = 750) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`

/** Homepage hero collage and About page. */
export const siteImages = {
  hero: { src: stock('1763048443535-1243379234e2', 1200, 1200), alt: 'A bowl of egusi soup with assorted meats, held up to the camera' },
  heroSide: { src: stock('1665332398215-825114bbb355'), alt: 'Nigerian stew served with white rice' },
  heroDrink: { src: stock('1566823422707-7813dab8eca9'), alt: 'A chilled glass of red zobo drink' },
  about: { src: stock('1604329760661-e71dc83f8f26'), alt: 'A bowl of green leafy Nigerian soup served with pounded yam' },
}

/** One photo per service — keys match the service ids in servicesData.js. */
export const serviceImages = {
  'pre-order-meals': { src: stock('1665332561290-cc6757172890'), alt: 'Plates of Nigerian stew served with rice' },
  'fridge-restocking': { src: stock('1609915437016-85693e56470f'), alt: 'Home-cooked food portioned into storage containers' },
  'home-cooking': { src: stock('1653233797467-1a528819fd4f'), alt: 'Hands preparing fresh vegetables on a wooden chopping board' },
  'food-prep-delivery': { src: stock('1694579740719-0e601c5d2437'), alt: 'A pan of chicken stew being stirred with a wooden spoon' },
  'fresh-drinks': { src: stock('1593624191635-f1a49f5eca76'), alt: 'A glass of hibiscus drink beside fresh fruit' },
  'small-event-catering': { src: stock('1664992960082-0ea299a9c53e'), alt: 'Party jollof rice topped with grilled chicken skewers' },
}

/** Event catering page and the homepage catering section. */
export const cateringImages = {
  hero: { src: stock('1722477936580-84aa10762b0b'), alt: 'Serving dishes filled with rice and stews at a gathering' },
  party: { src: stock('1664992960082-0ea299a9c53e'), alt: 'Party jollof rice topped with grilled chicken skewers' },
  feature: { src: stock('1665332195309-9d75071138f0'), alt: 'Party jollof rice served with grilled fish, chicken skewers and fresh peppers' },
}

/**
 * Catering gallery. `stock: true` shows a small "illustrative photos" note under the gallery.
 * Replace with your own event photos and delete `stock: true` — the note disappears automatically.
 * Set to [] to hide the gallery completely.
 */
export const cateringGallery = [
  { src: stock('1722477936580-84aa10762b0b'), alt: 'Serving dishes filled with rice and stews', stock: true },
  { src: stock('1664992960082-0ea299a9c53e', 900, 675), alt: 'Party jollof rice topped with grilled chicken skewers', stock: true },
  { src: stock('1555244162-803834f70033', 900, 675), alt: 'A table with a variety of dishes', stock: true },
  { src: stock('1694579740719-0e601c5d2437', 900, 675), alt: 'A pan of chicken stew being stirred', stock: true },
  { src: stock('1708782344137-21c48d98dfcc', 900, 675), alt: 'A bowl of assorted meat stew', stock: true },
  { src: stock('1705088293125-063256c88cf5', 900, 675), alt: 'Bowls of Nigerian soups ready for serving', stock: true },
]
