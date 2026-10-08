import { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { properties, statusInfo } from '../data/site'

export default function AvailabilityMap({ onInquire }) {
  const [show, setShow] = useState(Object.keys(statusInfo))
  const toggle = (s) => setShow((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))
  return (
    <section id="map" className="bg-white/60 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="reveal text-center">
          <p className="section-kicker">see what's open</p>
          <h2 className="section-title">Map Availability</h2>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {Object.entries(statusInfo).map(([k, v]) => (
            <button key={k} onClick={() => toggle(k)}
              className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition ${show.includes(k) ? 'bg-white shadow-sm' : 'opacity-40'}`}
              style={{ borderColor: v.color }}>
              <span className="h-3 w-3 rounded-full" style={{ background: v.color }} /> {v.label}
            </button>
          ))}
        </div>
        <div className="reveal mt-8 h-[460px] overflow-hidden rounded-3xl border-8 border-white shadow-xl">
          <MapContainer center={[14.236, 121.06]} zoom={14} scrollWheelZoom={false} className="h-full w-full">
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {properties.filter((p) => show.includes(p.status)).map((p) => (
              <CircleMarker key={p.id} center={[p.lat, p.lng]} radius={13}
                pathOptions={{ color: '#fff', weight: 3, fillColor: statusInfo[p.status].color, fillOpacity: 0.95 }}>
                <Popup>
                  <div className="w-48">
                    <img src={p.image} alt="" className="mb-2 h-24 w-full rounded-lg object-cover" />
                    <p className="font-display text-lg font-semibold">{p.name}</p>
                    <p className="text-xs">{p.type} · {p.price}</p>
                    <p className="mt-1 text-xs" style={{ color: statusInfo[p.status].color }}>{statusInfo[p.status].label}</p>
                    {p.status !== 'sold-out' && (
                      <button onClick={() => onInquire(p.name)} className="mt-2 text-xs font-semibold text-rose">Inquire →</button>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  )
}
