import { useRef, useState } from 'react'
import useReveal from './useReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Properties from './components/Properties'
import MapAvailability from './components/MapAvailability'
import Teaser from './components/Teaser'
import Perspectives from './components/Perspectives'
import Elevations from './components/Elevations'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'
import FloatingChat from './components/FloatingChat'

export default function App() {
  useReveal()
  const [interest, setInterest] = useState('')
  const inquire = (name) => {
    setInterest(name)
    document.getElementById('inquire').scrollIntoView({ behavior: 'smooth' })
  }
  const map = useRef(null)
  const pickBlock = (block) => {
    map.current.selectBlock(block)
    document.getElementById('map').scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Properties onInquire={inquire} />
        <MapAvailability ref={map} onInquire={inquire} />
        <Perspectives />
        <Elevations onInquire={inquire} onPickBlock={pickBlock} />
        <LeadForm interest={interest} setInterest={setInterest} />
        <Teaser />
      </main>
      <Footer />
      <FloatingChat />
    </>
  )
}
