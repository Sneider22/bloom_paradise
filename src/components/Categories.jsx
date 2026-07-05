import { motion } from 'framer-motion'

const categories = [
  {
    id: 'navidad',
    title: 'Navidad & Fiestas',
    description: 'Arreglos festivos para la época más especial del año',
  },
  {
    id: 'cumpleanos',
    title: 'Cumpleaños',
    description: 'Sorpresas únicas para hacer inolvidable el día especial',
  },
  {
    id: 'amor',
    title: 'Amor & Amistad',
    description: 'Rosas, bouquets y detalles para quienes más quieres',
  },
  {
    id: 'aniversario',
    title: 'Aniversario de Pareja',
    description: 'Celebra cada año juntos con un arreglo tan único como su historia',
  },
  {
    id: 'soporquesi',
    title: 'Solo Porque Sí',
    description: 'Detalles espontáneos que no necesitan ninguna excusa',
  },
  {
    id: 'ocasiones',
    title: 'Ocasiones Especiales',
    description: 'Graduaciones, despedidas, bienvenidas — todo merece flores',
  },
]

// ─── SVG base compartido ──────────────────────────────────────────────────────
const C = '#111108'

function VineBase({ transform }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true"
      style={{ width: '100%', height: '100%' }}>
      <g transform={transform}>
        {/* Tallos */}
        <path d="M4,4 Q18,24 16,50 Q14,70 26,82" stroke={C} strokeWidth="1.1" />
        <path d="M4,4 Q26,16 54,13 Q76,11 88,26" stroke={C} strokeWidth="1.1" />
        {/* Hoja 1 */}
        <path d="M12,30 Q26,20 22,38 Q10,40 12,30Z"
          stroke={C} strokeWidth="0.85" fill={C} fillOpacity="0.1" />
        <path d="M12,30 Q18,34 22,38" stroke={C} strokeWidth="0.55" />
        {/* Hoja 2 */}
        <path d="M40,12 Q42,24 54,18 Q50,8 40,12Z"
          stroke={C} strokeWidth="0.85" fill={C} fillOpacity="0.1" />
        <path d="M40,12 Q46,15 54,18" stroke={C} strokeWidth="0.55" />
        {/* Hoja 3 */}
        <path d="M17,56 Q6,50 8,62 Q15,64 17,56Z"
          stroke={C} strokeWidth="0.75" fill={C} fillOpacity="0.08" />
        {/* Rosa principal */}
        <g transform="translate(87,26)">
          {[0,60,120,180,240,300].map((deg, i) => (
            <ellipse key={i} cx="0" cy="-9" rx="4.5" ry="7.5"
              stroke={C} strokeWidth="0.75" fill={C} fillOpacity="0.07"
              transform={`rotate(${deg})`} />
          ))}
          {[30,90,150,210,270,330].map((deg, i) => (
            <ellipse key={i} cx="0" cy="-5" rx="3" ry="5"
              stroke={C} strokeWidth="0.65" fill={C} fillOpacity="0.06"
              transform={`rotate(${deg})`} />
          ))}
          <circle cx="0" cy="0" r="4.5" stroke={C} strokeWidth="0.9"
            fill={C} fillOpacity="0.11" />
        </g>
        {/* Rosa pequeña */}
        <g transform="translate(26,82)">
          {[0,90,180,270].map((deg, i) => (
            <ellipse key={i} cx="0" cy="-5" rx="3.2" ry="4.8"
              stroke={C} strokeWidth="0.7" fill={C} fillOpacity="0.07"
              transform={`rotate(${deg})`} />
          ))}
          <circle cx="0" cy="0" r="3" stroke={C} strokeWidth="0.8"
            fill={C} fillOpacity="0.1" />
        </g>
        {/* Espinas */}
        <path d="M11,44 L7,41" stroke={C} strokeWidth="0.6" />
        <path d="M48,13 L50,9" stroke={C} strokeWidth="0.6" />
      </g>
    </svg>
  )
}

// Esquina izquierda: tal cual
function RoseVineLeft() { return <VineBase transform="" /> }
// Esquina derecha: espejada horizontalmente (scaleX -1 desde el centro)
function RoseVineRight() { return <VineBase transform="scale(-1,1) translate(-100,0)" /> }

function PetalSvg() {
  return (
    <svg width="9" height="13" viewBox="0 0 9 13" fill="none" aria-hidden="true">
      <path d="M4.5 1 Q8.5 4.5 6.5 9.5 Q4.5 12.5 2.5 9.5 Q0.5 4.5 4.5 1Z"
        fill="#111108" fillOpacity="0.55" />
    </svg>
  )
}

function FallingPetal({ delay, xPct, dur }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${xPct}%`, top: -16 }}
      animate={{
        y: [0, 200],
        x: [0, 10, -8, 4, 0],
        rotate: [0, 110, 240, 360],
        opacity: [0, 0.5, 0.35, 0.1, 0],
      }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <PetalSvg />
    </motion.div>
  )
}

const PETALS = [
  [{ xPct: 22, delay: 0,   dur: 6   }, { xPct: 55, delay: 2.2, dur: 7.5 }, { xPct: 78, delay: 1,   dur: 5.5 }],
  [{ xPct: 15, delay: 0.5, dur: 7   }, { xPct: 60, delay: 1.8, dur: 6   }, { xPct: 82, delay: 3,   dur: 5   }],
  [{ xPct: 25, delay: 1,   dur: 6.5 }, { xPct: 50, delay: 0.3, dur: 7   }, { xPct: 75, delay: 2,   dur: 5.8 }],
  [{ xPct: 18, delay: 0.8, dur: 5.5 }, { xPct: 58, delay: 2.5, dur: 6.5 }, { xPct: 80, delay: 1.2, dur: 7   }],
  [{ xPct: 22, delay: 0.2, dur: 7   }, { xPct: 52, delay: 1.6, dur: 5.5 }, { xPct: 76, delay: 2.8, dur: 6.5 }],
  [{ xPct: 16, delay: 1.4, dur: 6   }, { xPct: 55, delay: 0.6, dur: 7.5 }, { xPct: 82, delay: 2,   dur: 5.5 }],
]

// true = esquina izquierda, false = espejada (esquina derecha)
const VINE_LEFT = [true, false, true, false, true, false]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

function Categories({ whatsappHref }) {
  return (
    <section className="bg-bp-green-mint py-14 md:py-20 px-4">

      {/* Título de sección */}
      <div className="text-center mb-10 md:mb-14">
        <h2
          className="font-display font-bold text-4xl md:text-6xl text-bp-text-dark"
          style={{ fontStyle: 'italic', letterSpacing: '-0.5px' }}
        >
          Elige tu ocasión
        </h2>
        <span className="block w-28 h-[3px] bg-bp-yellow-gold mx-auto mt-5 rounded-full" />
        <p
          className="font-body text-sm md:text-base mt-4"
          style={{ color: '#3D3D2E', fontWeight: 500, opacity: 0.7 }}
        >
          Un arreglo para cada momento especial
        </p>
      </div>

      <motion.div
        className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {categories.map((cat, i) => {
          const isLeft = VINE_LEFT[i]
          const petals = PETALS[i]
          return (
            <motion.a
              key={cat.id}
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              variants={cardVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(61,61,46,0.14)' }}
              className="relative bg-white rounded-2xl p-4 md:p-5 flex flex-col overflow-hidden"
              style={{
                textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(61,61,46,0.07)',
                minHeight: 140,
              }}
            >
              {/* Vid de rosas */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: 90,
                  height: 90,
                  top: 0,
                  left: isLeft ? 0 : 'auto',
                  right: isLeft ? 'auto' : 0,
                  opacity: 0.48,
                }}
              >
                {isLeft ? <RoseVineLeft /> : <RoseVineRight />}
              </div>

              {/* Pétalos cayendo */}
              {petals.map((p, j) => (
                <FallingPetal key={j} xPct={p.xPct} delay={p.delay} dur={p.dur} />
              ))}

              {/* Texto */}
              <div className="relative mt-auto pt-8">
                <h3 className="font-display text-sm md:text-base font-semibold text-bp-text-dark leading-snug mb-1">
                  {cat.title}
                </h3>
                <p className="font-body text-[11px] md:text-xs text-gray-500 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </motion.a>
          )
        })}
      </motion.div>
    </section>
  )
}

export default Categories
