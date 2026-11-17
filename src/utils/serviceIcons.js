import { createElement } from 'react'
import { ChefHat, CupSoda, PartyPopper, Refrigerator, ShoppingBag, Truck } from 'lucide-react'

/** Icon names usable in servicesData.js → `icon`. */
export const serviceIcons = { ChefHat, CupSoda, PartyPopper, Refrigerator, ShoppingBag, Truck }

/** <ServiceIcon name="Truck" className="h-5 w-5" /> — falls back to a chef's hat. */
export function ServiceIcon({ name, ...props }) {
  return createElement(serviceIcons[name] ?? ChefHat, { 'aria-hidden': true, ...props })
}
