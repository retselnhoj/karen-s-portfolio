import { useImperativeHandle, useState } from 'react'
import { MapPin, Navigation, RotateCcw } from 'lucide-react'
import ZoomImage, { MapMarker } from './ZoomImage'
import { dims, featured, vicinitySpots, siteSpots, blocks, blockSpots, lotsPerBlock, skippedLotNumbers } from '../data/site'

const tabs = [
  { key: 'vicinity', label: 'Location in Nuvali', alt: 'Nuvali vicinity map showing where Crescela Nuvali is', src: '/images/crescela/nuvali-vicinity-map.webp', spots: vicinitySpots },
  { key: 'site', label: 'Site Plan & Lot Inquiry', alt: 'Crescela Nuvali site plan with blocks and lots', src: '/images/crescela/site-plan.webp', spots: siteSpots },
]
const SITE = 1

const lotsIn = (block) =>
  Array.from({ length: lotsPerBlock[block] || 0 }, (_, i) => i + 1).filter((n) => !skippedLotNumbers.includes(n))

export default function MapAvailability({ onInquire, ref }) {
  const [tab, setTab] = useState(0)
  const [active, setActive] = useState(null)
  const [block, setBlock] = useState('')
  const [lot, setLot] = useState('')
  const [focus, setFocus] = useState(null)
  const [showBlocks, setShowBlocks] = useState(true)
  const [showAmenities, setShowAmenities] = useState(true)
  const t = tabs[tab]
  const site = tab === SITE
  const spots = site && !showAmenities ? [] : t.spots
  const spot = active !== null ? spots[active] : null

  const pickBlock = (b) => {
    setBlock(b ? String(b) : '')
    setLot('')
    setFocus(b ? { ...blockSpots[b], w: 4, h: 4, scale: 3 } : {})
  }
  // Lets other sections (Elevation Range) open the site plan on a block.
  useImperativeHandle(ref, () => ({
    selectBlock: (b) => { setTab(SITE); setActive(null); pickBlock(b) },
  }))

  const choice = block ? `Block ${block}, ${lot ? `Lot ${lot}` : 'any lot'}` : ''
  return (
    <section id="map" aria-labelledby="map-title" className="bg-white/60 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="reveal text-center">
          <p className="section-kicker">see where you'll live</p>
          <h2 id="map-title" className="section-title">Map Availability</h2>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {tabs.map((x, i) => (
            <button key={x.key} onClick={() => { setTab(i); setActive(null) }}
              className={`rounded-full px-5 py-2 text-sm transition ${tab === i ? 'bg-rose-dark text-white' : 'bg-white hover:bg-blush-100'}`}>{x.label}</button>
          ))}
        </div>
        <div className="reveal mt-8 grid gap-8 lg:grid-cols-3">
          <div className={site ? 'lg:col-span-2' : 'mx-auto w-full max-w-md lg:col-span-2'}>
            {site && (
              <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-rose" checked={showBlocks} onChange={(e) => setShowBlocks(e.target.checked)} /> Show blocks</label>
                <label className="flex items-center gap-2"><input type="checkbox" className="accent-rose" checked={showAmenities} onChange={(e) => { setShowAmenities(e.target.checked); setActive(null) }} /> Show amenities</label>
                <button onClick={() => setFocus({})} className="ml-auto flex items-center gap-1 text-rose-dark hover:underline"><RotateCcw size={14} /> Reset view</button>
              </div>
            )}
            <ZoomImage key={t.key} src={t.src} alt={t.alt} spots={spots} active={active} setActive={setActive}
              fixedPins={site} focus={site ? focus : undefined}>
              {site && showBlocks && blocks.map((b) => (
                <MapMarker key={b} {...blockSpots[b]} className={String(b) === block ? 'z-[2]' : 'z-[1]'}>
                  <button onClick={(e) => { e.stopPropagation(); pickBlock(b) }} aria-label={`Block ${b}`} aria-pressed={String(b) === block}
                    className={`block rounded-full border px-[3px] text-[9px] font-semibold leading-[12px] shadow transition sm:px-1.5 sm:text-[11px] sm:leading-[18px] ${String(b) === block ? 'border-white bg-rose-dark text-white ring-2 ring-rose/40' : 'border-rose/40 bg-white/95 text-rose-dark hover:bg-blush-100'}`}>
                    B{b}
                  </button>
                </MapMarker>
              ))}
            </ZoomImage>
            {site && <p className="mt-2 text-center text-xs text-ink/80">Tap a block chip to zoom in — or pick the block from the list.</p>}
          </div>
          <aside className="space-y-4">
            {site && (
              <div className="rounded-3xl bg-gradient-to-br from-blush-100 to-sage-light p-6">
                <h3 className="font-display text-xl font-semibold">Inquire about a lot</h3>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="mb-1 block text-xs uppercase tracking-widest text-ink/80">Block</span>
                    <select value={block} onChange={(e) => pickBlock(e.target.value)} className="input">
                      <option value="">Select</option>
                      {blocks.map((b) => <option key={b} value={b}>Block {b}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs uppercase tracking-widest text-ink/80">Lot</span>
                    <select value={lot} onChange={(e) => setLot(e.target.value)} disabled={!block} className="input disabled:opacity-50">
                      <option value="">Any lot</option>
                      {lotsIn(block).map((n) => <option key={n} value={n}>Lot {n}</option>)}
                    </select>
                  </label>
                </div>
                <p className="mt-4 font-display text-2xl font-semibold" aria-live="polite">{choice || 'Pick a block to start'}</p>
                <button disabled={!block} onClick={() => onInquire(`${featured.name} – ${choice}`)}
                  className="btn-rose mt-3 w-full justify-center text-center disabled:opacity-50">
                  {block ? `Inquire about ${choice}` : 'Inquire about a lot'}
                </button>
                <p className="mt-3 text-xs text-ink/80">Lots are sold live — Karen will confirm availability and price.</p>
              </div>
            )}
            {(!site || showAmenities) && (
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-sage-dark">Tap a pin</p>
                {spot ? (
                  <div className="mt-3">
                    {spot.image && <img src={spot.image} alt={`${spot.title} at ${featured.name} – artist's perspective`} {...dims(spot.image)} loading="lazy" decoding="async" className="mb-3 aspect-video w-full rounded-2xl object-cover" />}
                    <h3 className="font-display text-2xl font-semibold">{spot.title}</h3>
                    <p className="mt-1 text-sm">{spot.text}</p>
                    <button onClick={() => setActive(null)} className="mt-3 text-sm text-rose-dark hover:underline">← All pins</button>
                  </div>
                ) : (
                  <ul className="mt-3 space-y-2 text-sm">
                    {spots.map((s, i) => (
                      <li key={i}>
                        <button onClick={() => setActive(i)} className="flex items-center gap-2 hover:text-rose">
                          <MapPin size={14} className={s.main ? 'text-rose' : 'text-sage-dark'} /> {s.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {!site && (
              <div className="rounded-3xl bg-gradient-to-br from-blush-100 to-sage-light p-6">
                <h3 className="font-display text-xl font-semibold">Check a lot's availability</h3>
                <p className="mt-1 text-sm">Pick a block and Karen will send you the open lots.</p>
                <div className="mt-4 flex gap-2">
                  <select aria-label="Block" value={block} onChange={(e) => pickBlock(e.target.value)} className="input">
                    <option value="">Any block</option>
                    {blocks.map((b) => <option key={b} value={b}>Block {b}</option>)}
                  </select>
                  <button onClick={() => onInquire(`${featured.name}${block ? ` – Block ${block}` : ''}`)} className="btn-rose shrink-0 !px-4">Ask</button>
                </div>
              </div>
            )}
            <a href={featured.googleMaps} target="_blank" rel="noreferrer" className="btn-ghost w-full justify-center bg-white">
              <Navigation size={16} /> Open in Google Maps
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
