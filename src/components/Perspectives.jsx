import { useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { dims, featured, perspectives, perspectivesNote } from '../data/site'

const alt = (p) => `${featured.name} – ${p.caption.toLowerCase()} (artist's perspective)`

export default function Perspectives() {
  const cats = ['All', ...new Set(perspectives.map((p) => p.cat))]
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? perspectives : perspectives.filter((p) => p.cat === cat)
  const [i, setI] = useState(null)
  const n = list.length
  const touch = useRef(null)
  const next = () => setI((v) => (v + 1) % n)
  const prev = () => setI((v) => (v - 1 + n) % n)
  useEffect(() => {
    if (i === null) return
    document.body.style.overflow = 'hidden'
    const key = (e) => { if (e.key === 'Escape') setI(null); if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev() }
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = '' }
  })
  return (
    <section id="perspectives" aria-labelledby="perspectives-title" className="mx-auto max-w-6xl px-4 py-24">
      <div className="reveal text-center">
        <p className="section-kicker">imagine living here</p>
        <h2 id="perspectives-title" className="section-title">Artist's Perspective</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink/80">{perspectivesNote}</p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${cat === c ? 'bg-rose-dark text-white' : 'bg-white hover:bg-blush-100'}`}>
            {c} <span className="text-xs">{c === 'All' ? perspectives.length : perspectives.filter((p) => p.cat === c).length}</span>
          </button>
        ))}
      </div>
      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
        {list.map((p, idx) => (
          <button key={p.src} onClick={() => setI(idx)} className="group relative mb-5 block w-full overflow-hidden rounded-3xl shadow-sm">
            <img src={p.src} alt={alt(p)} {...dims(p.src)} loading="lazy" decoding="async" className="h-auto w-full transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4 text-left font-display text-xl text-white opacity-0 transition group-hover:opacity-100">{p.caption}</span>
          </button>
        ))}
      </div>
      {i !== null && (
        <div className="fixed inset-0 z-[2000] grid place-items-center bg-ink/95 p-4" onClick={() => setI(null)}
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - touch.current; if (Math.abs(d) > 50) d < 0 ? next() : prev() }}>
          <button className="absolute right-5 top-5 text-white" aria-label="Close"><X size={30} /></button>
          <button className="absolute left-2 hidden text-white sm:block" onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous"><ChevronLeft size={44} /></button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-5xl">
            <img src={list[i].src} alt={alt(list[i])} {...dims(list[i].src)} className="h-auto max-h-[78vh] w-auto rounded-2xl" />
            <figcaption className="mt-3 text-center text-white">
              <span className="font-display text-2xl">{list[i].caption}</span>
              <span className="ml-3 text-sm opacity-60">{i + 1} / {n}</span>
            </figcaption>
          </figure>
          <button className="absolute right-2 hidden text-white sm:block" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next"><ChevronRight size={44} /></button>
        </div>
      )}
    </section>
  )
}
