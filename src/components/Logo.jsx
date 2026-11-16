import { href } from '../utils/router'

/** Text-based B's Menu logo — swap for an <img> when the official logo is ready. */
export default function Logo({ light = false }) {
  return (
    <a href={href('home')} className="group inline-flex items-center gap-2.5" aria-label="B’s Menu — home">
      <span
        className={`grid h-10 w-10 place-items-center rounded-full font-display text-xl font-bold ${light ? 'bg-white text-brand' : 'bg-brand text-white'}`}
        aria-hidden="true"
      >
        B
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[22px] font-semibold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
          B<span className="text-accent">’</span>s Menu
        </span>
        <span className={`mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] ${light ? 'text-white/70' : 'text-brand'}`}>
          Homemade · Abuja
        </span>
      </span>
    </a>
  )
}
