/** Shared button styles so every CTA looks consistent. */
const buttonVariants = {
  primary: 'bg-brand text-white hover:bg-brand-dark shadow-sm',
  accent: 'bg-accent text-white hover:bg-accent-dark shadow-sm',
  outline: 'border border-brand text-brand hover:bg-lavender',
  light: 'bg-white text-brand hover:bg-lavender',
  ghostLight: 'border border-white/50 text-white hover:bg-white/10',
  dark: 'bg-ink text-white hover:bg-brand-deep',
}
const buttonSizes = { sm: 'px-4 py-2 text-sm', md: 'px-5 py-3 text-sm', lg: 'px-6 py-3.5 text-[15px]' }

export function buttonClass(variant = 'primary', size = 'md', extra = '') {
  return `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${buttonVariants[variant]} ${buttonSizes[size]} ${extra}`
}
