import { motion } from 'framer-motion'

const images = [
  { src: '/images/galeria1.jpg', alt: 'Bouquet de rosas, tulipanes y gerberas entregado a cliente', desktopSpan: 'md:row-span-2' },
  { src: '/images/galeria2.jpg', alt: 'Bouquet de girasoles con flor de azahar', desktopSpan: '' },
  { src: '/images/galeria3.jpg', alt: 'Bouquet de margaritas blancas', desktopSpan: '' },
  { src: '/images/galeria4.jpg', alt: 'Caja regalo con chocolates Kinder, Ferrero y productos Kiko', desktopSpan: 'md:row-span-2' },
  { src: '/images/galeria5.jpg', alt: 'Set de regalo con gafas de sol, KitKat y Ferrero Rocher', desktopSpan: '' },
  { src: '/images/galeria6.jpg', alt: 'Arreglo romántico con rosas rojas, girasoles y Dyson Airwrap', desktopSpan: '' },
]

function Gallery() {
  return (
    <section className="bg-bp-text-dark py-16 md:py-20 px-5">
      <h2
        className="font-display font-bold text-4xl md:text-6xl text-bp-cream text-center mb-10 md:mb-14"
        style={{ fontStyle: 'italic', letterSpacing: '-0.5px' }}
      >
        Galería de trabajos
      </h2>

      {/* Mobile: grid 2 cols cuadrado */}
      <div className="md:hidden max-w-lg mx-auto grid grid-cols-2 gap-3">
        {images.map((image, i) => (
          <motion.div
            key={image.src}
            className="relative overflow-hidden rounded-xl group aspect-square"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Desktop: masonry con row-span */}
      <div className="hidden md:grid max-w-6xl mx-auto grid-cols-3 grid-rows-[repeat(2,220px)] gap-3">
        {images.map((image, i) => (
          <motion.div
            key={image.src}
            className={`relative overflow-hidden rounded-xl group ${image.desktopSpan}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-bp-yellow-main/0 group-hover:bg-bp-yellow-main/70 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity font-body font-medium text-bp-text-dark">
                Ver más
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Gallery
