import { Mail, Phone, MessageCircle } from 'lucide-react'
import { profile } from '../data/site'
import { whatsappLink, viberLink, mailLink } from '../links'
import FacebookIcon from './icons/FacebookIcon'

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink py-14 text-blush-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center">
        <p className="font-script text-5xl text-blush-400">{profile.fullName}</p>
        <p className="text-xs uppercase tracking-[0.35em]">The Property Aligner · Nuvali</p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <a href={mailLink()} className="flex items-center gap-2 rounded-full border border-blush-100/30 px-4 py-2 hover:bg-white/10"><Mail size={15} />{profile.email}</a>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-blush-100/30 px-4 py-2 hover:bg-white/10"><MessageCircle size={15} />WhatsApp</a>
          <a href={viberLink()} className="flex items-center gap-2 rounded-full border border-blush-100/30 px-4 py-2 hover:bg-white/10"><Phone size={15} />Viber</a>
          <a href={profile.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-blush-100/30 px-4 py-2 hover:bg-white/10"><FacebookIcon size={15} />Facebook</a>
        </div>
        <p className="text-sm">{profile.phoneLabel}: {profile.phone}</p>
        <p className="text-xs text-blush-100/50">© {new Date().getFullYear()} {profile.fullName}. Images are artist's perspectives and for illustration only.</p>
      </div>
    </footer>
  )
}
