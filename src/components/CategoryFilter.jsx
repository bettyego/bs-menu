import { activeCategories } from '../data/menuData'

/** Horizontal, scrollable category chips. `value` is a category id or 'all'. */
export default function CategoryFilter({ value, onChange, counts }) {
  const options = [{ id: 'all', name: 'All' }, ...activeCategories]
  return (
    <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="group" aria-label="Menu categories">
      <div className="flex w-max gap-2">
        {options.map((option) => {
          const active = value === option.id
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.id)}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${active ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink hover:border-brand hover:text-brand'}`}
            >
              {option.name}
              {counts?.[option.id] !== undefined && (
                <span className={`rounded-full px-1.5 text-[11px] ${active ? 'bg-white/20' : 'bg-lavender text-brand'}`}>{counts[option.id]}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
