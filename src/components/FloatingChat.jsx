import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../links'
export default function FloatingChat() {
  return (
    <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Chat with Karen"
      className="fixed bottom-5 right-5 z-[1500] grid h-14 w-14 place-items-center rounded-full bg-rose text-white shadow-xl shadow-rose/40 transition hover:scale-110">
      <MessageCircle />
    </a>
  )
}
