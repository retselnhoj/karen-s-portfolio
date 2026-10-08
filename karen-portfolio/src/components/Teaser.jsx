import { teaserImage } from '../data/site'
export default function Teaser() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <a href="#inquire" className="reveal group block overflow-hidden rounded-[2rem] shadow-xl">
        <img src={teaserImage} alt="Crescela Nuvali — Live and thrive soon" loading="lazy" className="w-full transition duration-700 group-hover:scale-[1.02]" />
      </a>
    </section>
  )
}
