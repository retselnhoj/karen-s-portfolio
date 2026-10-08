import { useEffect, useRef, useState } from 'react'
import { TransformWrapper, TransformComponent, KeepScale } from 'react-zoom-pan-pinch'
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, X } from 'lucide-react'
import { dims } from '../data/site'

// A marker placed at x/y (% of the image) that stays the same size on screen while zooming.
// Render these as children of <ZoomImage>.
export function MapMarker({ x, y, className = '', children }) {
  return (
    <div className={`absolute -translate-x-1/2 -translate-y-1/2 ${className}`} style={{ left: `${x}%`, top: `${y}%` }}>
      <KeepScale>{children}</KeepScale>
    </div>
  )
}

function Pin({ s, on }) {
  return (
    <span className={`relative grid place-items-center rounded-full border-2 border-white shadow-lg ${s.main ? 'h-7 w-7 bg-rose' : 'h-5 w-5 bg-sage'} ${on ? 'ring-4 ring-rose/40' : ''}`}>
      {s.main && <span className="absolute inset-0 animate-ping rounded-full bg-rose/60" />}
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
    </span>
  )
}

// Zoomable image with optional clickable hotspots (x/y in % of the image).
// `focus` drives the zoom from the parent: { x, y, w, h } (a box in % of the image, centred on x/y)
// zooms to fit that box, adding `scale` zooms to that exact scale instead, and an object without
// x/y (e.g. {}) resets the view. Pass a new object each time to re-run the zoom.
function Viewer({ src, alt, spots = [], active, setActive, tall, focus, fixedPins, children }) {
  const api = useRef(null)
  const box = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!focus || !loaded || !api.current) return
    if (focus.x == null) api.current.resetTransform(400)
    else api.current.zoomToElement(box.current, { scale: focus.scale, maxScale: 4, animationTime: 400 })
  }, [focus, loaded])

  const toggle = (i) => (e) => { e.stopPropagation(); setActive?.(active === i ? null : i) }
  return (
    // wheel.step is multiplied by the wheel delta (~100 per mouse notch): 0.003 ≈ +0.3x per notch
    <TransformWrapper ref={api} minScale={1} maxScale={5} wheel={{ step: 0.003 }} doubleClick={{ mode: 'zoomIn' }}>
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div className="relative">
          <div className="absolute right-3 top-3 z-10 flex gap-1">
            {[[ZoomIn, () => zoomIn(), 'Zoom in'], [ZoomOut, () => zoomOut(), 'Zoom out'], [RotateCcw, () => resetTransform(), 'Reset']].map(([I, fn, l]) => (
              <button key={l} onClick={fn} aria-label={l} className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow hover:text-rose"><I size={16} /></button>
            ))}
          </div>
          <TransformComponent wrapperStyle={{ width: '100%', maxHeight: tall ? '85vh' : undefined }} contentStyle={{ width: '100%' }}>
            <div className="relative w-full">
              <img src={src} alt={alt} {...dims(src)} loading="lazy" decoding="async" className="block h-auto w-full select-none" draggable={false}
                ref={(el) => { if (el?.complete) setLoaded(true) }} onLoad={() => setLoaded(true)} />
              {focus?.x != null && (
                <div ref={box} aria-hidden className="pointer-events-none absolute"
                  style={{ left: `${focus.x - focus.w / 2}%`, top: `${focus.y - focus.h / 2}%`, width: `${focus.w}%`, height: `${focus.h}%` }} />
              )}
              {spots.map((s, i) => fixedPins ? (
                <MapMarker key={i} x={s.x} y={s.y}>
                  <button onClick={toggle(i)} aria-label={s.title} className="block"><Pin s={s} on={active === i} /></button>
                </MapMarker>
              ) : (
                <button key={i} onClick={toggle(i)}
                  className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${s.x}%`, top: `${s.y}%` }} aria-label={s.title}>
                  <Pin s={s} on={active === i} />
                </button>
              ))}
              {children}
            </div>
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  )
}

export default function ZoomImage(props) {
  const [full, setFull] = useState(false)
  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border-8 border-white bg-white shadow-xl">
        <Viewer {...props} />
        <button onClick={() => setFull(true)} className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs shadow hover:text-rose">
          <Maximize2 size={14} /> Fullscreen
        </button>
        <p className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-white/80 px-3 py-1 text-[11px] text-ink/80">Pinch, scroll or double-tap to zoom</p>
      </div>
      {full && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-ink/90 p-4">
          <button onClick={() => setFull(false)} className="absolute right-5 top-5 z-10 text-white" aria-label="Close"><X size={30} /></button>
          <div className="w-full max-w-6xl overflow-hidden rounded-2xl bg-white"><Viewer {...props} tall /></div>
        </div>
      )}
    </>
  )
}
