const inputBase =
  'mt-1.5 w-full rounded-xl border bg-white px-3.5 py-3 text-[15px] text-ink outline-none transition placeholder:text-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/15'

/**
 * Accessible labelled input / select / textarea with inline error message.
 * type: 'text' | 'tel' | 'date' | 'number' | 'email' | 'select' | 'textarea'
 */
export default function FormField({ id, label, type = 'text', value, onChange, error, required, options = [], placeholder, hint, rows = 3, min, className = '' }) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined
  const shared = {
    id,
    name: id,
    value,
    onChange: (event) => onChange(event.target.value),
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    className: `${inputBase} ${error ? 'border-red-400' : 'border-line'}`,
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {type === 'select' ? (
        <select {...shared}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea {...shared} rows={rows} placeholder={placeholder} />
      ) : (
        <input {...shared} type={type} placeholder={placeholder} min={min} />
      )}
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}
