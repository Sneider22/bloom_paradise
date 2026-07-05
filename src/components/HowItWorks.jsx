import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Elige tu arreglo',
    description: 'Explora el catálogo y escoge el que más te guste',
  },
  {
    number: '02',
    title: 'Escríbenos por WhatsApp',
    description: 'Cuéntanos qué necesitas y la fecha de entrega',
  },
  {
    number: '03',
    title: 'Recibe tu pedido',
    description: 'Preparamos tu arreglo con amor y lo entregamos',
  },
]

const C = '#3D3D2E'

// ─── Vid/Raíz decorativa vertical (mobile) ───────────────────────────────────
function VineVertical() {
  return (
    <svg
      viewBox="0 0 52 370"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 52,
        height: '100%',
        opacity: 0.52,
        pointerEvents: 'none',
      }}
    >
      {/* ── Tallo principal sinuoso ── */}
      <path
        d="M28,18 C18,55 38,95 22,135 C10,168 36,205 24,245 C14,278 38,312 26,352 C22,364 26,370 26,370"
        stroke={C}
        strokeWidth="1.5"
      />

      {/* ── Rosa principal arriba ── */}
      <g transform="translate(28,18)">
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <ellipse
            key={i} cx="0" cy="-9" rx="4.5" ry="7.5"
            stroke={C} strokeWidth="0.8" fill={C} fillOpacity="0.08"
            transform={`rotate(${deg})`}
          />
        ))}
        {[30, 90, 150, 210, 270, 330].map((deg, i) => (
          <ellipse
            key={i} cx="0" cy="-5" rx="2.8" ry="4.8"
            stroke={C} strokeWidth="0.65" fill={C} fillOpacity="0.06"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="4.5" stroke={C} strokeWidth="0.9" fill={C} fillOpacity="0.11" />
      </g>

      {/* ── Hoja izquierda — zona paso 1 ── */}
      <path
        d="M22,92 Q4,78 9,100 Q18,105 22,92Z"
        stroke={C} strokeWidth="0.85" fill={C} fillOpacity="0.1"
      />
      <path d="M22,92 Q13,96 9,100" stroke={C} strokeWidth="0.5" />

      {/* ── Rama que cruza al paso 1 ── */}
      <path d="M26,118 Q40,113 50,116" stroke={C} strokeWidth="1" />

      {/* ── Espina ── */}
      <path d="M25,148 L19,143" stroke={C} strokeWidth="0.65" />

      {/* ── Hoja derecha — zona paso 2 ── */}
      <path
        d="M36,198 Q50,184 46,206 Q37,210 36,198Z"
        stroke={C} strokeWidth="0.85" fill={C} fillOpacity="0.1"
      />
      <path d="M36,198 Q42,200 46,206" stroke={C} strokeWidth="0.5" />

      {/* ── Capullo pequeño — zona paso 2 ── */}
      <g transform="translate(24,245)">
        {[0, 90, 180, 270].map((deg, i) => (
          <ellipse
            key={i} cx="0" cy="-5" rx="3" ry="5"
            stroke={C} strokeWidth="0.7" fill={C} fillOpacity="0.07"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="3" stroke={C} strokeWidth="0.75" fill={C} fillOpacity="0.09" />
      </g>

      {/* ── Rama que cruza al paso 2 ── */}
      <path d="M25,232 Q12,227 4,230" stroke={C} strokeWidth="1" />

      {/* ── Espina ── */}
      <path d="M23,268 L29,263" stroke={C} strokeWidth="0.65" />

      {/* ── Hoja izquierda — zona paso 3 ── */}
      <path
        d="M22,306 Q4,292 9,314 Q18,318 22,306Z"
        stroke={C} strokeWidth="0.85" fill={C} fillOpacity="0.1"
      />
      <path d="M22,306 Q13,310 9,314" stroke={C} strokeWidth="0.5" />

      {/* ── Rama que cruza al paso 3 ── */}
      <path d="M26,330 Q40,325 50,328" stroke={C} strokeWidth="1" />
    </svg>
  )
}

// ─── Vid horizontal para desktop (debajo de la línea dorada) ─────────────────
function VineHorizontal() {
  return (
    <svg
      viewBox="0 0 900 55"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '8%',
        right: '8%',
        top: 10,
        width: '84%',
        height: 55,
        opacity: 0.38,
        pointerEvents: 'none',
      }}
    >
      {/* Tallo horizontal */}
      <path
        d="M0,28 C120,14 240,42 400,26 C560,10 680,44 900,28"
        stroke={C} strokeWidth="1.4"
      />
      {/* Rosa izquierda */}
      <g transform="translate(0,28)">
        {[0,60,120,180,240,300].map((deg,i) => (
          <ellipse key={i} cx="0" cy="-8" rx="4" ry="7"
            stroke={C} strokeWidth="0.75" fill={C} fillOpacity="0.08"
            transform={`rotate(${deg})`} />
        ))}
        <circle cx="0" cy="0" r="4" stroke={C} strokeWidth="0.85" fill={C} fillOpacity="0.1" />
      </g>
      {/* Hojas */}
      <path d="M200,22 Q195,8 210,15 Q210,24 200,22Z" stroke={C} strokeWidth="0.75" fill={C} fillOpacity="0.09" />
      <path d="M450,30 Q445,16 460,22 Q460,32 450,30Z" stroke={C} strokeWidth="0.75" fill={C} fillOpacity="0.09" />
      <path d="M700,22 Q695,8 710,14 Q710,24 700,22Z" stroke={C} strokeWidth="0.75" fill={C} fillOpacity="0.09" />
      {/* Rosa derecha */}
      <g transform="translate(900,28)">
        {[0,90,180,270].map((deg,i) => (
          <ellipse key={i} cx="0" cy="-6" rx="3.5" ry="6"
            stroke={C} strokeWidth="0.75" fill={C} fillOpacity="0.07"
            transform={`rotate(${deg})`} />
        ))}
        <circle cx="0" cy="0" r="3.5" stroke={C} strokeWidth="0.8" fill={C} fillOpacity="0.09" />
      </g>
    </svg>
  )
}

function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-bp-cream py-12 md:py-20 px-5">
      <h2
        className="font-display font-bold text-4xl md:text-6xl text-bp-text-dark text-center mb-8 md:mb-16"
        style={{ fontStyle: 'italic', letterSpacing: '-0.5px' }}
      >
        Pedir es muy fácil
      </h2>

      {/* ── Mobile: pasos minimalistas con vid vertical ── */}
      <div className="md:hidden max-w-sm mx-auto relative" style={{ paddingLeft: 60 }}>
        <VineVertical />
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: i * 0.12 }}
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                paddingLeft: 16,
                borderLeft: '2px solid #E8D44D',
                marginBottom: i < steps.length - 1 ? 8 : 0,
                position: 'relative',
              }}
            >
              {/* Dot en la línea */}
              <span style={{
                position: 'absolute',
                left: -5,
                top: 26,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#E8D44D',
                display: 'block',
              }} />

              <span
                className="font-display font-bold"
                style={{
                  fontStyle: 'italic',
                  fontSize: 13,
                  letterSpacing: '0.12em',
                  color: '#E8D44D',
                  display: 'block',
                  marginBottom: 2,
                }}
              >
                {step.number}
              </span>
              <h3 className="font-display text-base font-semibold text-bp-text-dark leading-snug mb-1">
                {step.title}
              </h3>
              <p className="font-body text-xs text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Desktop: layout horizontal original con solo la línea dorada ── */}
      <div className="hidden md:block relative max-w-5xl mx-auto">
        <motion.div
          className="absolute top-8 left-[16%] right-[16%] h-0.5 bg-bp-yellow-gold origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
        <div className="grid grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="text-center relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <span className="font-display text-5xl text-bp-yellow-gold block mb-4">
                {step.number}
              </span>
              <h3 className="font-display text-xl text-bp-text-dark mb-2">
                {step.title}
              </h3>
              <p className="font-body text-sm text-gray-500 max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

