import { MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { buildWhatsAppUrl } from '../utils/whatsapp'

/** Floating WhatsApp contact button, shown on every page. Moves up on mobile when the order bar is visible. */
export default function WhatsAppButton() {
  const { totals } = useCart()
  const raised = totals.count > 0 ? 'bottom-24 lg:bottom-6' : 'bottom-5 sm:bottom-6'
  return (
    <a
      href={buildWhatsAppUrl('Hello B’s Menu! I would like to make an enquiry.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with B’s Menu on WhatsApp"
      className={`group fixed right-4 z-30 flex h-14 items-center gap-2 rounded-full bg-[#25D366] pl-4 pr-4 text-white shadow-lift transition-[bottom,background-color] hover:bg-[#1fb457] sm:right-6 sm:pr-5 ${raised}`}
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
      <span className="hidden text-sm font-semibold sm:inline">Chat with us</span>
    </a>
  )
}
