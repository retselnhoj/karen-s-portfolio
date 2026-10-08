import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/site'

// <details>/<summary> so it opens without JavaScript. The same `faqs` feed the FAQPage JSON-LD.
export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-3xl px-4 py-24">
      <div className="reveal text-center">
        <p className="section-kicker">good to know</p>
        <h2 id="faq-title" className="section-title">Frequently Asked Questions</h2>
      </div>
      <div className="reveal mt-10 space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-3xl bg-white px-6 py-4 shadow-sm open:shadow-md">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-xl font-semibold">{f.q}</h3>
              <ChevronDown size={18} className="shrink-0 text-rose transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
