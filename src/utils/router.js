import { useEffect, useState } from 'react'

/**
 * Tiny hash router (no extra dependency). URLs look like  /#/menu  or  /#/services?service=private-chef
 * Hash URLs work on any static host without server rewrite rules.
 */
export const routes = ['home', 'menu', 'services', 'catering', 'about', 'contact']

export function parseHash(hash = window.location.hash) {
  const [path, query = ''] = hash.replace(/^#\/?/, '').split('?')
  const page = routes.includes(path) ? path : 'home'
  return { page, params: new URLSearchParams(query) }
}

export const href = (page, params) => `#/${page === 'home' ? '' : page}${params ? `?${new URLSearchParams(params)}` : ''}`

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash())
  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export const navLinks = [
  { page: 'home', label: 'Home' },
  { page: 'menu', label: 'Our Menu' },
  { page: 'services', label: 'Our Services' },
  { page: 'catering', label: 'Event Catering' },
  { page: 'about', label: 'About Us' },
  { page: 'contact', label: 'Contact Us' },
]
