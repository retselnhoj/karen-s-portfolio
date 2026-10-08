import { teaserImage, dims } from '../data/site'
export default function Teaser() {
  return (
    <section aria-label="Crescela Nuvali teaser" className="mx-auto max-w-6xl px-4 pb-20">
      <a href="#inquire" className="reveal group block overflow-hidden rounded-[2rem] shadow-xl">
        <img src={teaserImage} alt="Crescela Nuvali — Live and thrive soon. Inquire about a lot." {...dims(teaserImage)} loading="lazy" decoding="async" className="h-auto w-full transition duration-700 group-hover:scale-[1.02]" />
      </a>
    </section>
  )
}
