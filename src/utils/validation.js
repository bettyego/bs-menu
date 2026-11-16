/** Today's date in YYYY-MM-DD (local time) for date input `min`. */
export function todayISO() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

/** Light Nigerian phone validation: 10–15 digits after removing spaces, dashes and +. */
export function isValidPhone(value) {
  const digits = value.replace(/[\s\-()+]/g, '')
  return /^\d{10,15}$/.test(digits)
}
