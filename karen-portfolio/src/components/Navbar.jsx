import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/site'
import FacebookIcon from './icons/FacebookIcon'

const links = [
  ['Top Sellers', '#properties'], ['Availability', '#map'], ['Perspectives', '#perspectives'],
  ['Elevation', '#elevations'], ['Contact', '#contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', on); return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-[1000] transition ${scrolled ? 'bg-blush-50/90 backdrop-blur shadow-sm' : ''}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#top" className="font-script text-3xl text-rose">{profile.name}</a>
        <ul className="hidden gap-8 text-sm tracking-wide md:flex">
          {links.map(([l, h]) => <li key={h}><a href={h} className="hover:text-rose">{l}</a></li>)}
        </ul>
        <div className="hidden items-center gap-3 md:flex">
          <a href={profile.facebook} target="_blank" rel="noreferrer" aria-label={`${profile.facebookHandle} on Facebook`}
            className="grid h-9 w-9 place-items-center rounded-full bg-[#1877F2]/10 text-[#1877F2] transition hover:bg-[#1877F2]/20"><FacebookIcon size={16} /></a>
          <a href="#inquire" className="btn-rose !py-2">Inquire</a>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <ul className="space-y-1 bg-blush-50 px-4 pb-4 md:hidden">
          {[...links, ['Inquire', '#inquire']].map(([l, h]) => (
            <li key={h}><a href={h} onClick={() => setOpen(false)} className="block py-2">{l}</a></li>
          ))}
        </ul>
      )}
    </header>
  )
}
