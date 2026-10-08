import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react'
import { profile } from '../data/site'
import { whatsappLink, viberLink, mailLink } from '../links'
import FacebookIcon from './icons/FacebookIcon'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-36">
      <div className="absolute inset-0 -z-0">
        <img src={profile.heroImage} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-blush-50 via-blush-50/90 to-blush-50/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-blush-50 to-transparent" />
      </div>
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blush-200/60 blur-3xl" />
      <div className="absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-sage-light blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <div className="reveal">
          <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-sage">
            <MapPin size={14} /> {profile.location}
          </p>
          <p className="font-script text-5xl text-rose md:text-6xl">The Property Aligner</p>
          <h1 className="mt-2 font-display text-6xl font-semibold leading-none md:text-8xl">{profile.fullName}</h1>
          <p className="mt-6 max-w-md text-lg font-light">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#inquire" className="btn-rose">Find my lot</a>
            <a href="#properties" className="btn-ghost">View properties</a>
          </div>
          <div className="mt-10 grid gap-3 text-sm sm:grid-cols-2">
            <a href={mailLink()} className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-sm hover:shadow-md">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-100 text-rose"><Mail size={16} /></span>
              <span className="truncate">{profile.email}</span>
            </a>
            <div className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 shadow-sm">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-blush-100 text-rose"><Phone size={16} /></span>
              <span><span className="block text-[11px] uppercase tracking-widest text-ink/60">{profile.phoneLabel}</span>{profile.phone}</span>
            </div>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-[#25D366]/10 p-3 text-[#128C4A] hover:bg-[#25D366]/20">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
            <a href={viberLink()} className="flex items-center gap-3 rounded-2xl bg-[#7360F2]/10 p-3 text-[#5b48d6] hover:bg-[#7360F2]/20">
              <Phone size={18} /> Message on Viber
            </a>
            <a href={profile.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-[#1877F2]/10 p-3 text-[#1877F2] hover:bg-[#1877F2]/20 sm:col-span-2">
              <FacebookIcon size={18} /> Follow on Facebook
            </a>
          </div>
        </div>
        <div className="reveal relative">
          <div className="aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[3rem] border-8 border-white shadow-2xl shadow-rose/20">
           <img src={profile.photo} alt={profile.fullName} className="h-full w-full object-cover object-top" />
          </div>
          <div className="absolute -bottom-6 -left-4 rounded-2xl bg-white px-5 py-4 shadow-xl">
            <p className="font-display text-3xl text-rose">Nuvali</p>
            <p className="text-xs uppercase tracking-widest text-sage">Eco-city living</p>
          </div>
        </div>
      </div>
    </section>
  )
}
