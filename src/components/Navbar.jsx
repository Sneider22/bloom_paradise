import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Contacto', href: '#contacto' },
]

function Navbar({ whatsappHref }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 12)
  })

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[100] bg-bp-cream"
      animate={{ boxShadow: scrolled ? '0 4px 20px rgba(61,61,46,0.10)' : '0 0 0 rgba(0,0,0,0)' }}
      transition={{ duration: 0.3 }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 md:px-8 py-4">
        <a
          href="#inicio"
          className="font-display text-2xl text-bp-text-dark"
        >
          Bloon Paradise
        </a>

        <ul className="hidden md:flex items-center gap-8 font-body text-bp-text-dark">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:opacity-70 transition-opacity">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-block bg-bp-yellow-main text-bp-text-dark font-body font-medium px-5 py-2.5 rounded-full hover:scale-105 transition-transform"
        >
          Hacer pedido
        </a>

        <button
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="block w-6 h-0.5 bg-bp-text-dark" />
          <span className="block w-6 h-0.5 bg-bp-text-dark" />
          <span className="block w-6 h-0.5 bg-bp-text-dark" />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-bp-cream"
          >
            <ul className="flex flex-col gap-4 px-5 pb-6 font-body text-bp-text-dark">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex justify-center pt-1">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block bg-bp-yellow-main text-bp-text-dark font-medium px-5 py-2.5 rounded-full"
                >
                  Hacer pedido
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
