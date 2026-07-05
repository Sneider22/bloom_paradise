import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CollageSection from './components/CollageSection'
import Categories from './components/Categories'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'

const WHATSAPP_NUMBER = '351935882405'

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Hola Bloon Paradise! Quisiera hacer un pedido.'
)}`

function App() {
  return (
    <>
      <Navbar whatsappHref={whatsappHref} />
      <main>
        <Hero whatsappHref={whatsappHref} />
        <CollageSection />
        <Categories whatsappHref={whatsappHref} />
        <HowItWorks />
      </main>
      <Footer whatsappHref={whatsappHref} />
    </>
  )
}

export default App
