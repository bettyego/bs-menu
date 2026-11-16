import { ArrowUpRight } from 'lucide-react'
import { businessConfig } from '../config/businessConfig'

const networks = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'tiktok', label: 'TikTok' },
]

/** Social links; networks without a configured URL show as "coming soon" instead of a dead link. */
export default function SocialLinks({ light = false }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {networks.map(({ key, label }) => {
        const url = businessConfig.social[key]
        const base = `inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium`
        return (
          <li key={key}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className={`${base} transition ${light ? 'border-white/25 text-white hover:bg-white/10' : 'border-line text-ink hover:border-brand hover:text-brand'}`}>
                {label} <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            ) : (
              <span className={`${base} ${light ? 'border-white/10 text-white/45' : 'border-line text-muted/70'}`} title={`${label} link coming soon`}>
                {label} · soon
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
