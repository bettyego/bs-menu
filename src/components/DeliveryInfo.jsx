import { CalendarClock, CreditCard, MessageCircle, Truck } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'
import { deliveryInfo } from '../data/contentData'
import { formatNaira } from '../utils/currency'

/**
 * Pre-order, delivery and payment essentials. Built only from businessConfig and
 * deliveryInfo (contentData.js); unconfirmed details are simply left out.
 */
function getDeliveryPoints() {
  const { fulfilmentOptions, serviceArea, deliveryFee, preOrderNotice } = businessConfig
  const offersDelivery = fulfilmentOptions.includes('Delivery')
  const offersPickup = fulfilmentOptions.includes('Pickup')
  const fulfilmentTitle = [offersDelivery && 'Delivery', offersPickup && 'pickup'].filter(Boolean).join(' & ') || 'Collection'

  return [
    {
      icon: CalendarClock,
      title: 'Pre-order only',
      lines: [deliveryInfo.leadTime ?? preOrderNotice],
    },
    {
      icon: Truck,
      title: `${fulfilmentTitle} in ${serviceArea.split(',')[0]}`,
      lines: [
        deliveryInfo.deliveryAreas ?? `We serve customers across ${serviceArea}.`,
        deliveryInfo.deliveryDays,
        offersPickup ? deliveryInfo.pickupDetails : null,
      ],
    },
    {
      icon: MessageCircle,
      title: 'Delivery charges',
      lines: [
        typeof deliveryFee === 'number'
          ? `Delivery is ${formatNaira(deliveryFee)}, added to your order total.`
          : 'Delivery charges depend on your location and are confirmed with you on WhatsApp before we cook.',
      ],
    },
    {
      icon: CreditCard,
      title: 'Payment',
      lines: [deliveryInfo.paymentNote ?? 'No payment on the website — we send payment instructions on WhatsApp once your order is confirmed.'],
    },
  ]
}

export default function DeliveryInfo({ className = '' }) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {getDeliveryPoints().map((point) => (
        <li key={point.title} className="rounded-2xl border border-line bg-white p-5 shadow-card">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-lavender text-brand">
            <point.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-4 font-semibold text-ink">{point.title}</h3>
          {point.lines.filter(Boolean).map((text) => (
            <p key={text} className="mt-1.5 text-sm leading-6 text-muted">{text}</p>
          ))}
        </li>
      ))}
    </ul>
  )
}
