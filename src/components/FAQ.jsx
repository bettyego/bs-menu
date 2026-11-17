import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/contentData'

/** Accessible FAQ accordion using native <details>. `homeOnly` shows the questions marked home: true. */
export default function FAQ({ homeOnly = false, className = '' }) {
  const list = homeOnly ? faqs.filter((faq) => faq.home) : faqs
  return (
    <div className={`divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white ${className}`}>
      {list.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink transition hover:bg-lavender/60 sm:px-6 [&::-webkit-details-marker]:hidden">
            {faq.question}
            <ChevronDown className="h-5 w-5 shrink-0 text-brand transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="px-5 pb-5 text-sm leading-7 text-muted sm:px-6">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
