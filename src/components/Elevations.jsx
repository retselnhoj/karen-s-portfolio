import { useState } from 'react'
import { Wind, Mountain, Droplets } from 'lucide-react'
import ZoomImage, { MapMarker } from './ZoomImage'
import { elevationImage, elevationBands, elevationBlockSpots, elevationEmptySpot, elevationPerks, featured } from '../data/site'

const icons = [Wind, Mountain, Droplets]
const PAD = 6       // % of the image added around a band's blocks
const MIN_BOX = 30  // % — keeps one-block bands from over-zooming
const textOn = (idx) => (idx < 2 ? '#1a3a32' : '#fff')

// Box (in % of the image) around a band's blocks, for ZoomImage's `focus`.
function bandBox(band) {
  const pts = band.blocks.length ? band.blocks.map((b) => elevationBlockSpots[b]) : [elevationEmptySpot]
  const xs = pts.map((p) => p.x), ys = pts.map((p) => p.y)
  const x0 = Math.max(0, Math.min(...xs) - PAD), x1 = Math.min(100, Math.max(...xs) + PAD)
  const y0 = Math.max(0, Math.min(...ys) - PAD), y1 = Math.min(100, Math.max(...ys) + PAD)
  const w = Math.max(x1 - x0, MIN_BOX), h = Math.max(y1 - y0, MIN_BOX)
  const mid = (a, b, size) => Math.min(100 - size / 2, Math.max(size / 2, (a + b) / 2))
  return { x: mid(x0, x1, w), y: mid(y0, y1, h), w, h }
}

export default function Elevations({ onInquire, onPickBlock }) {
  const [sel, setSel] = useState(null)
  const [focus, setFocus] = useState(null)
  const band = sel === null ? null : elevationBands[sel]
  const pick = (idx) => { setSel(idx); setFocus(idx === null ? {} : bandBox(elevationBands[idx])) }
  return (
    <section id="elevations" aria-labelledby="elevations-title" className="bg-sage-light/60 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="reveal text-center">
          <p className="section-kicker">rise above</p>
          <h2 id="elevations-title" className="section-title">Elevation Range</h2>
          <p className="mx-auto mt-3 max-w-xl font-light">Crescela sits {featured.elevation} — tap a band to zoom to the blocks it covers.</p>
        </div>
        <div className="reveal mt-10 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ZoomImage src={elevationImage} alt="Crescela Nuvali elevation range map by block, in metres above sea level" focus={focus}>
              {band?.blocks.map((b) => (
                <MapMarker key={b} {...elevationBlockSpots[b]}>
                  <button onClick={(e) => { e.stopPropagation(); onPickBlock(b) }} aria-label={`Block ${b} — open on the site plan`}
                    className="block rounded-full border-2 border-white px-1.5 text-[11px] font-semibold leading-[18px] shadow-lg transition hover:scale-110"
                    style={{ background: band.color, color: textOn(sel) }}>
                    B{b}
                  </button>
                </MapMarker>
              ))}
            </ZoomImage>
          </div>
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-2xl">
              {elevationBands.map((b, idx) => (
                <button key={b.range} onClick={() => pick(idx)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition ${sel === idx ? 'scale-[1.02] shadow-lg' : 'opacity-85 hover:opacity-100'}`}
                  style={{ background: b.color, color: textOn(idx) }}>
                  {b.range}
                  {sel === idx && <span className="rounded-full bg-white/90 px-2 py-0.5 text-[11px] text-ink">selected</span>}
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-widest text-sage-dark">meters above sea level</p>
              {band ? (
                <>
                  <h3 className="font-display text-3xl font-semibold">{band.range}</h3>
                  <p className="mt-1 text-sm">{band.where}</p>
                  {band.blocks.length > 0 && (
                    <>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {band.blocks.map((b) => (
                          <button key={b} onClick={() => onPickBlock(b)} className="rounded-full bg-sage-light px-2.5 py-0.5 text-xs hover:bg-blush-100 hover:text-rose">Block {b}</button>
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-ink/80">Tap a block to open it on the site plan.</p>
                    </>
                  )}
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <button onClick={() => onInquire(`${featured.name} – ${band.range} lots`)} className="btn-rose">Ask for lots at {band.range}</button>
                    <button onClick={() => pick(null)} className="text-sm text-rose-dark hover:underline">Show all</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-display text-3xl font-semibold">All elevations</h3>
                  <p className="mt-1 text-sm">Tap a band above to zoom the map to its blocks.</p>
                </>
              )}
              <p className="mt-3 text-[11px] text-ink/80">Blocks are approximate — final elevations per developer.</p>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {elevationPerks.map((p, i) => {
            const I = icons[i % icons.length]
            return (
              <div key={p.title} className="reveal rounded-3xl bg-white p-6">
                <I className="text-sage-dark" />
                <h3 className="mt-3 font-display text-2xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm">{p.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
