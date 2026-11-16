import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import FormField from './FormField'
import { buttonClass } from '../utils/styles'
import { isValidPhone, todayISO } from '../utils/validation'
import { buildEnquiryMessage, openWhatsApp } from '../utils/whatsapp'

/**
 * Reusable enquiry form that sends a formatted WhatsApp message.
 * fields: [{ key, label, type, required, options, placeholder, full }]
 */
export default function EnquiryForm({ idPrefix, heading, fields, initialValues = {}, submitLabel = 'Send Enquiry on WhatsApp' }) {
  const blank = Object.fromEntries(fields.map((field) => [field.key, '']))
  const [values, setValues] = useState({ ...blank, ...initialValues })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  // Allow parent to preselect a value (e.g. the requested service) after mount.
  const initialKey = JSON.stringify(initialValues)
  const [appliedKey, setAppliedKey] = useState(initialKey)
  if (appliedKey !== initialKey) {
    setAppliedKey(initialKey)
    setValues((current) => ({ ...current, ...initialValues }))
  }

  const set = (key) => (value) => setValues((current) => ({ ...current, [key]: value }))

  function handleSubmit(event) {
    event.preventDefault()
    const next = {}
    for (const field of fields) {
      const value = String(values[field.key] ?? '').trim()
      if (field.required && !value) next[field.key] = `Please fill in ${field.label.toLowerCase()}.`
      else if (field.type === 'tel' && value && !isValidPhone(value)) next[field.key] = 'Please enter a valid phone number.'
      else if (field.type === 'date' && value && value < todayISO()) next[field.key] = 'Please choose a date from today onwards.'
    }
    setErrors(next)
    if (Object.keys(next).length) {
      document.getElementById(`${idPrefix}-${Object.keys(next)[0]}`)?.focus()
      setSent(false)
      return
    }
    openWhatsApp(buildEnquiryMessage(heading, fields.map((field) => [field.label, values[field.key], field.type === 'date'])))
    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-line bg-white p-5 shadow-card sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <FormField
            key={field.key}
            id={`${idPrefix}-${field.key}`}
            label={field.label}
            type={field.type}
            options={field.options}
            placeholder={field.placeholder}
            required={field.required}
            min={field.type === 'date' ? todayISO() : undefined}
            value={values[field.key]}
            onChange={set(field.key)}
            error={errors[field.key]}
            className={field.full || field.type === 'textarea' ? 'sm:col-span-2' : ''}
          />
        ))}
      </div>
      {sent && (
        <p role="status" className="mt-5 rounded-xl bg-lavender p-3 text-sm text-brand">
          Your enquiry has been prepared in WhatsApp — please press <strong>send</strong> there. We’ll reply to confirm availability and details.
        </p>
      )}
      <button type="submit" className={buttonClass('primary', 'lg', 'mt-6 w-full sm:w-auto')}>
        <MessageCircle className="h-5 w-5" aria-hidden="true" /> {submitLabel}
      </button>
      <p className="mt-3 text-xs text-muted">Fields marked <span className="text-accent">*</span> are required. Nothing is booked until B’s Menu confirms with you.</p>
    </form>
  )
}
