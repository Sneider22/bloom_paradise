import { useRef, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion'

const SLIDES = [
  { src: '/images/producto1.jpg', alt: 'Jarrón con Luces LED' },
  { src: '/images/producto2.jpg', alt: 'Caja Rosas con Dyson' },
  { src: '/images/producto3.jpg', alt: 'Box Rosas & Ferrero' },
  { src: '/images/producto4.jpg', alt: 'Canasta Cumpleaños' },
  { src: '/images/producto5.jpg', alt: 'Torta de Chocolates' },
  { src: '/images/producto6.jpg', alt: 'Box Rituals & Flores' },
]

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

// ─── Carrusel de productos ────────────────────────────────────────────────────
function ProductShowcase({ reduceMotion }) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 140, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 140, damping: 22 })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 2800)
    return () => clearInterval(t)
  }, [])

  function handleMouseMove(e) {
    if (reduceMotion) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 16)
    rotateX.set(-py * 16)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      style={{ perspective: 1400 }}
      className="relative"
      animate={reduceMotion ? undefined : { y: [0, -16, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Glow blob */}
      <div
        className="absolute inset-0 rounded-[2rem] blur-3xl opacity-40 scale-90 translate-y-4"
        style={{ background: 'radial-gradient(circle, #F0E84A 0%, #6BBF59 60%, transparent 100%)' }}
      />

      {/* Imagen con tilt 3D */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX: springX, rotateY: springY, aspectRatio: '1 / 1' }}
        className="relative rounded-[2rem] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.4)]"
      >
        <AnimatePresence>
          {SLIDES.map((slide, i) =>
            i === current ? (
              <motion.img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                draggable={false}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.38, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : null
          )}
        </AnimatePresence>

        {/* Overlay inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        {/* Dots indicadores */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ver producto ${i + 1}`}
              className={`h-1.5 rounded-full bg-white transition-all duration-300 ${
                i === current ? 'w-5 opacity-100' : 'w-1.5 opacity-40'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Hero principal ───────────────────────────────────────────────────────────
function Hero({ whatsappHref }) {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="inicio"
      style={{
        background: 'linear-gradient(135deg, #FAFAF7 0%, #F9F5C8 40%, #D4F0C0 100%)',
      }}
      className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-28 px-5"
    >
      {/* Blobs decorativos de fondo */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--bp-pink-petal)' }} />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--bp-green-pastel)' }} />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 items-center">

        {/* Texto */}
        <motion.div
          className="text-center md:text-left order-1 md:order-1"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.14 }}
        >
          <motion.span
            variants={fadeIn}
            transition={{ duration: 0.5 }}
            className="inline-block bg-bp-yellow-main text-bp-text-dark font-body text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
          >
            Portugal · Madeira
          </motion.span>

          <motion.h1
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="font-display font-bold text-bp-text-dark text-[38px] md:text-[72px] leading-[1.05]"
            style={{ fontStyle: 'italic', letterSpacing: '-0.5px' }}
          >
            Arreglos que hablan por ti
          </motion.h1>

          <motion.p
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="font-body text-base text-gray-700 mt-4 max-w-md mx-auto md:mx-0 leading-relaxed"
          >
            Bouquets, cajas regalo y decoraciones para cada momento especial — hechos con flores frescas y mucho amor.
          </motion.p>

          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="mt-8 flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4"
          >
            {/* Botón 1 — Ver catálogo */}
            <a
              href="#catalogo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #3D3D2E 0%, #5a5a3a 100%)',
                color: '#FAFAF7',
                fontFamily: '"Lora", serif',
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: 15,
                padding: '14px 32px',
                borderRadius: '40px 8px 40px 8px',
                textDecoration: 'none',
                boxShadow: '0 6px 24px rgba(61,61,46,0.22)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                letterSpacing: '0.01em',
                width: '100%',
                maxWidth: 260,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 10px 32px rgba(61,61,46,0.32)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(61,61,46,0.22)'
              }}
            >
              Ver catálogo
            </a>

            {/* Botón 2 — WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                color: '#3D3D2E',
                fontFamily: '"Lora", serif',
                fontStyle: 'italic',
                fontWeight: 600,
                fontSize: 15,
                padding: '13px 31px',
                borderRadius: '8px 40px 8px 40px',
                textDecoration: 'none',
                border: '1.5px solid #6BBF59',
                transition: 'background 0.25s, color 0.25s, transform 0.2s',
                letterSpacing: '0.01em',
                width: '100%',
                maxWidth: 260,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#6BBF59'
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.transform = 'scale(1.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#3D3D2E'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Pedir por WhatsApp
            </a>
          </motion.div>
        </motion.div>

        {/* Foto */}
        <div className="order-2 md:order-2 px-4 md:px-6">
          <ProductShowcase reduceMotion={reduceMotion} />
        </div>

      </div>
    </section>
  )
}

export default Hero
