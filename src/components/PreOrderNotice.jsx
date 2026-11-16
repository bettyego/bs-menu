import { CalendarClock } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'

export default function PreOrderNotice({ compact = false, className = '' }) {
  return (
    <div className={`flex gap-3 rounded-2xl border border-accent/30 bg-accent/[0.07] text-ink ${compact ? 'p-3 text-xs leading-5' : 'p-4 text-sm leading-6'} ${className}`} role="note">
      <CalendarClock className={`shrink-0 text-accent ${compact ? 'h-4 w-4' : 'h-5 w-5'}`} aria-hidden="true" />
      <p>
        <strong className="font-semibold">Pre-order only. </strong>
        {businessConfig.preOrderNotice}
      </p>
    </div>
  )
}
