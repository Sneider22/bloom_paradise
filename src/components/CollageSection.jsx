import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP_NUMBER = '351935882405'
const PER_PAGE = 6

// ─── Todos los arreglos unificados ────────────────────────────────────────────
const ARRANGEMENTS = [
  { id: 'p1', src: '/images/producto1.jpg', caption: 'Jarrón con Luces LED' },
  { id: 'p2', src: '/images/producto2.jpg', caption: 'Caja Rosas con Dyson' },
  { id: 'p3', src: '/images/producto3.jpg', caption: 'Box Rosas & Ferrero' },
  { id: 'p4', src: '/images/producto4.jpg', caption: 'Canasta Cumpleaños' },
  { id: 'p5', src: '/images/producto5.jpg', caption: 'Torta de Chocolates' },
  { id: 'p6', src: '/images/producto6.jpg', caption: 'Box Rituals & Flores' },
  { id: 'g1', src: '/images/galeria1.jpg', caption: 'Bouquet Rosas & Tulipanes' },
  { id: 'g2', src: '/images/galeria2.jpg', caption: 'Bouquet de Girasoles' },
  { id: 'g3', src: '/images/galeria3.jpg', caption: 'Bouquet Margaritas Blancas' },
  { id: 'g4', src: '/images/galeria4.jpg', caption: 'Caja Chocolates Kinder' },
  { id: 'g5', src: '/images/galeria5.jpg', caption: 'Set Regalo con KitKat' },
  { id: 'g6', src: '/images/galeria6.jpg', caption: 'Arreglo Rosas & Dyson' },
]

const TOTAL_PAGES = Math.ceil(ARRANGEMENTS.length / PER_PAGE)

function buildHref(name) {
  const msg = `Hola Bloon Paradise! Me interesa el arreglo "${name}". ¿Pueden darme más información?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', bounce: 0.35, duration: 0.6 },
  },
}

// ─── Tarjeta Polaroid con hover de levantamiento ──────────────────────────────
function PolaroidCard({ item }) {
  return (
    <motion.a
      variants={cardVariants}
      href={buildHref(item.caption)}
      target="_blank"
      rel="noreferrer"
      whileHover={{
        y: -10,
        scale: 1.04,
        boxShadow: '0 20px 48px rgba(0,0,0,0.6)',
        transition: { type: 'spring', stiffness: 320, damping: 20 },
      }}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: '#fff',
        padding: 10,
        paddingBottom: 36,
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
        willChange: 'transform',
        cursor: 'pointer',
      }}
    >
      <img
        src={item.src}
        alt={item.caption}
        loading="lazy"
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <p
        style={{
          fontFamily: '"Poppins", sans-serif',
          fontSize: 11,
          fontWeight: 500,
          color: '#3D3D2E',
          textAlign: 'center',
          marginTop: 10,
          marginBottom: 0,
          letterSpacing: '0.02em',
        }}
      >
        {item.caption}
      </p>
    </motion.a>
  )
}

// ─── Botón de paginación ──────────────────────────────────────────────────────
function PageBtn({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: 'none',
        background: disabled ? 'rgba(255,255,255,0.08)' : '#F0E84A',
        color: disabled ? 'rgba(255,255,255,0.25)' : '#3D3D2E',
        fontWeight: 700,
        fontSize: 18,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'background 0.2s, transform 0.15s',
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.transform = 'scale(1.12)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
    >
      {children}
    </button>
  )
}

// ─── CollageSection principal ─────────────────────────────────────────────────
function CollageSection() {
  const [page, setPage] = useState(0)

  const start = page * PER_PAGE
  const visible = ARRANGEMENTS.slice(start, start + PER_PAGE)

  function goTo(p) {
    setPage(p)
    // scroll suave al inicio del catálogo
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="catalogo" style={{ background: '#1c1c14' }} className="py-16 px-5">

      {/* Título */}
      <div className="text-center mb-10">
        <h2
          className="font-display font-bold text-4xl md:text-6xl text-bp-cream"
          style={{ fontStyle: 'italic', letterSpacing: '-0.5px' }}
        >
          Nuestros arreglos
        </h2>
        <span className="block w-20 h-1 bg-bp-yellow-main mx-auto mt-4 rounded-full" />
        <p className="font-body font-semibold text-bp-cream/75 text-xs mt-3 tracking-wide uppercase">
          Explora · Toca para pedir por WhatsApp
        </p>
      </div>

      {/* Grid de tarjetas — anima al cambiar de página */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
          variants={containerVariants}
        >
          {visible.map((item) => (
            <PolaroidCard key={item.id} item={item} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Paginación */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          marginTop: 40,
        }}
      >
        {/* Anterior */}
        <PageBtn onClick={() => goTo(page - 1)} disabled={page === 0}>
          ‹
        </PageBtn>

        {/* Dots de páginas */}
        {Array.from({ length: TOTAL_PAGES }, (_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === page ? 28 : 10,
              height: 10,
              borderRadius: 99,
              border: 'none',
              background: i === page ? '#F0E84A' : 'rgba(255,255,255,0.25)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
            aria-label={`Página ${i + 1}`}
          />
        ))}

        {/* Siguiente */}
        <PageBtn onClick={() => goTo(page + 1)} disabled={page === TOTAL_PAGES - 1}>
          ›
        </PageBtn>
      </div>

      {/* Contador de página */}
      <p
        style={{
          textAlign: 'center',
          marginTop: 12,
          fontFamily: '"Poppins", sans-serif',
          fontSize: 11,
          color: 'rgba(250,250,247,0.35)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Página {page + 1} de {TOTAL_PAGES}
      </p>

    </section>
  )
}

export default CollageSection
