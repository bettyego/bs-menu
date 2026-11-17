import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ShoppingCart from './components/ShoppingCart'
import WhatsAppButton from './components/WhatsAppButton'
import MobileOrderBar from './components/MobileOrderBar'
import StructuredData from './components/StructuredData'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Services from './pages/Services'
import Catering from './pages/Catering'
import About from './pages/About'
import Contact from './pages/Contact'
import { businessConfig } from './config/businessConfig'
import { useHashRoute } from './utils/router'

const pages = {
  home: { component: Home, title: `${businessConfig.name} | Homemade Nigerian Meals in Abuja` },
  menu: { component: Menu, title: `Our Menu — Nigerian Soups, Stews, Sauces, Meals & Drinks | ${businessConfig.name}` },
  services: { component: Services, title: `Our Services — Pre-order Meals, Fridge Restocking, Home Cooking & Small-Event Catering | ${businessConfig.name}` },
  catering: { component: Catering, title: `Small-Event Catering in Abuja | ${businessConfig.name}` },
  about: { component: About, title: `About Us | ${businessConfig.name}` },
  contact: { component: Contact, title: `Contact Us | ${businessConfig.name}` },
}

export default function App() {
  const { page, params } = useHashRoute()
  const { component: Page, title } = pages[page]
  const paramKey = params.toString()

  useEffect(() => {
    document.title = title
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [page, title])

  return (
    <CartProvider>
      <a href="#main" onClick={(event) => { event.preventDefault(); document.getElementById('main')?.focus() }} className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <Navbar currentPage={page} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Page key={`${page}?${paramKey}`} params={params} />
      </main>
      <Footer />
      <MobileOrderBar />
      <ShoppingCart />
      <WhatsAppButton />
      <StructuredData />
    </CartProvider>
  )
}
