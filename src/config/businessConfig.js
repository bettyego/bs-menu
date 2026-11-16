/**
 * B's Menu — central business configuration.
 *
 * Edit this file to update contact details, social links and ordering options.
 * Anything left as `null` is treated as "not yet provided": the matching button
 * or link is hidden (or shown as "Coming soon") instead of pointing nowhere.
 */
export const businessConfig = {
  name: "B's Menu",
  tagline: 'Homemade Goodness, Made for Your Table.',
  shortDescription:
    "Freshly prepared Nigerian and African home-cooked meals in Abuja — soups, stews, sauces and drinks on pre-order, plus cooking, catering and private chef services.",

  /**
   * WhatsApp number in INTERNATIONAL format: country code + number,
   * digits only — no "+", spaces or leading zero.
   * Example: 0806 411 1501  →  '2348064111501'
   *
   * ⚠️ CONFIRM BEFORE LAUNCH: this number was carried over from the earlier
   * version of the site. Replace it if it is not the B's Menu WhatsApp line.
   */
  whatsappNumber: '2348064111501',

  /** Number shown to customers for calls (local format is fine). */
  phoneDisplay: '0806 411 1501',
  /** Number used for tel: links, international format with "+". */
  phoneLink: '+2348064111501',

  email: 'nwabethroseonuoha@gmail.com',
  serviceArea: 'Abuja, Nigeria',
  address: null, // e.g. 'Pickup point address' — leave null to show service area only

  social: {
    instagram: null, // e.g. 'https://instagram.com/bsmenu'
    facebook: null,
    tiktok: null,
  },

  /** Fulfilment options offered at checkout. Remove one to hide it. */
  fulfilmentOptions: ['Delivery', 'Pickup'],

  /**
   * Delivery fee in naira. Keep `null` while delivery charges are confirmed
   * per order on WhatsApp — no fee is then added to any total.
   */
  deliveryFee: null,

  preOrderNotice:
    'Our meals are freshly prepared on pre-order. Please contact us ahead of your preferred delivery date to confirm availability and preparation arrangements.',
}
