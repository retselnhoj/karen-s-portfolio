import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import useReveal from './useReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Properties from './components/Properties'
import Teaser from './components/Teaser'
import FAQ from './components/FAQ'
import LeadForm from './components/LeadForm'
import Footer from './components/Footer'
import FloatingChat from './components/FloatingChat'

// Heavy sections load in their own chunks so the hero shows first
const MapAvailability = lazy(() => import('./components/MapAvailability'))
const Perspectives = lazy(() => import('./components/Perspectives'))
const Elevations = lazy(() => import('./components/Elevations'))

// Holds the section's place (and its #anchor) while its chunk loads
const Loading = ({ id }) => <section id={id} aria-busy="true" className="min-h-screen" />

export default function App() {
  useReveal()
  const [interest, setInterest] = useState('')
  const inquire = (name) => {
    setInterest(name)
    document.getElementById('inquire').scrollIntoView({ behavior: 'smooth' })
  }
  const map = useRef(null)
  const pickBlock = (block) => {
    map.current?.selectBlock(block)
    document.getElementById('map').scrollIntoView({ behavior: 'smooth' })
  }
  // The pre-rendered HTML holds only the placeholder for these; the real section loads in the browser
  const [inBrowser, setInBrowser] = useState(false)
  useEffect(() => setInBrowser(true), [])
  const later = (id, section) => (inBrowser ? <Suspense fallback={<Loading id={id} />}>{section}</Suspense> : <Loading id={id} />)
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Properties onInquire={inquire} />
        {later('map', <MapAvailability ref={map} onInquire={inquire} />)}
        {later('perspectives', <Perspectives />)}
        {later('elevations', <Elevations onInquire={inquire} onPickBlock={pickBlock} />)}
        <FAQ />
        <LeadForm interest={interest} setInterest={setInterest} />
        <Teaser />
      </main>
      <Footer />
      <FloatingChat />
    </>
  )
}
