import { useEffect, useState } from 'react'
import { Check, Mountain, Tag, Ruler, ChevronLeft, ChevronRight } from 'lucide-react'
import { featured } from '../data/site'

export default function Properties({ onInquire }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = featured.gallery.length
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setI((v) => (v + 1) % n), 4500)
    return () => clearInterval(t)
  }, [paused, n])
  return (
    <section id="properties" className="mx-auto max-w-6xl px-4 py-24">
      <div className="reveal text-center">
        <p className="section-kicker">curated for you</p>
        <h2 className="section-title">Top Selling Properties</h2>
      </div>
      <article className="reveal mt-12 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-rose/10 lg:grid lg:grid-cols-5"
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="relative lg:col-span-3">
          <div className="relative aspect-[16/10] overflow-hidden">
            {featured.gallery.map((g, idx) => (
              <img key={g.src} src={g.src} alt={g.label} loading={idx ? 'lazy' : 'eager'}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${idx === i ? 'opacity-100' : 'opacity-0'}`} />
            ))}
            <span className="absolute left-4 top-4 rounded-full bg-rose px-3 py-1 text-xs font-medium text-white shadow">{featured.status}</span>
            <button onClick={() => setI((i - 1 + n) % n)} className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 hover:bg-white" aria-label="Previous"><ChevronLeft size={18} /></button>
            <button onClick={() => setI((i + 1) % n)} className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 hover:bg-white" aria-label="Next"><ChevronRight size={18} /></button>
          </div>
          <div className="flex gap-2 overflow-x-auto p-3">
            {featured.gallery.map((g, idx) => (
              <button key={g.src} onClick={() => setI(idx)} className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl ring-2 transition ${idx === i ? 'ring-rose' : 'ring-transparent opacity-60 hover:opacity-100'}`}>
                <img src={g.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col p-7 lg:col-span-2">
          <p className="text-xs uppercase tracking-widest text-sage">{featured.developer}</p>
          <h3 className="mt-1 font-display text-4xl font-semibold">{featured.name}</h3>
          <p className="mt-1 font-light italic">{featured.tagline}</p>
          <dl className="mt-5 grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center gap-2"><Tag size={15} className="text-rose" /><dt className="sr-only">Price</dt><dd>{featured.price}</dd></div>
            <div className="flex items-center gap-2"><Ruler size={15} className="text-rose" /><dt className="sr-only">Lot sizes</dt><dd>{featured.type} · {featured.lotSizes}</dd></div>
            <div className="flex items-center gap-2"><Mountain size={15} className="text-rose" /><dt className="sr-only">Elevation</dt><dd>{featured.elevation}</dd></div>
          </dl>
          <ul className="mt-5 space-y-1.5 text-sm">
            {featured.highlights.map((h) => <li key={h} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-sage" />{h}</li>)}
          </ul>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            <button onClick={() => onInquire(featured.name)} className="btn-rose">Inquire now</button>
            <a href="#map" className="btn-ghost">See site plan</a>
          </div>
        </div>
      </article>
    </section>
  )
}
