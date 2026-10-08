import { useState } from 'react'
import { Send, CheckCircle2, MessageCircle, Phone } from 'lucide-react'
import { profile, formImage, dims } from '../data/site'
import { whatsappLink, viberLink } from '../links'
import { buildLeadMessage, GENERAL_INQUIRY } from '../lib/leadMessage'

const encode = (d) => new URLSearchParams(d).toString()

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Older browsers / non-https: copy through a temporary textarea
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

export default function LeadForm({ interest, setInterest }) {
  const [form, setForm] = useState({ name: '', number: '', app: 'Viber', email: '', location: '', 'bot-field': '' })
  const [state, setState] = useState('idle') // idle | sending | done | error
  const [message, setMessage] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const msg = buildLeadMessage(form, interest)
    setMessage(msg)
    setState('sending')
    try {
      // Netlify Forms: submissions appear in Netlify dashboard → Forms → "leads"
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'leads', ...form, interest, message: msg,
          subject: `New Lead: ${form.name.trim()} – ${interest || GENERAL_INQUIRY}`, // Netlify uses "subject" as the email subject
        }),
      })
      if (!res.ok) throw new Error()
      setState('done')
    } catch {
      setState('error')
    }
  }

  return (
    <section id="inquire" aria-labelledby="inquire-title" className="mx-auto max-w-6xl px-4 py-24">
      <div className="reveal overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blush-200 via-blush-100 to-sage-light p-8 md:p-14">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="section-kicker">let's align</p>
            <h2 id="inquire-title" className="section-title">Find the lot that fits you</h2>
            <p className="mt-4 max-w-sm font-light">Leave your details and {profile.name} will reach out personally on Viber or WhatsApp — no pressure, just guidance.</p>
            <img src={formImage} alt="Nuvali sign at the entrance to the eco-city in Santa Rosa, Laguna" {...dims(formImage)} loading="lazy" decoding="async" className="mt-8 hidden aspect-[4/3] w-full max-w-sm rounded-3xl object-cover shadow-lg md:block" />
          </div>
          {state === 'done' ? (
            <div className="grid place-items-center rounded-3xl bg-white/80 p-8 text-center md:p-10">
              <div>
                <CheckCircle2 size={48} className="mx-auto text-sage-dark" />
                <h3 className="mt-4 font-display text-3xl">Thank you, {form.name.trim().split(' ')[0]}!</h3>
                <p className="mt-2 text-sm">{profile.name} will message you on {form.app === 'Both' ? 'Viber or WhatsApp' : form.app} soon.</p>
                <p className="mt-6 text-sm font-medium">Want a faster reply? Send it directly:</p>
                <DirectSend message={message} app={form.app} />
                <a href={profile.facebook} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm text-[#1877F2] hover:underline">See {profile.name}'s latest listings on Facebook →</a>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4 rounded-3xl bg-white/80 p-6 shadow-lg backdrop-blur md:p-8">
              <p hidden><label>Leave this empty: <input name="bot-field" value={form['bot-field']} onChange={set('bot-field')} tabIndex={-1} autoComplete="off" /></label></p>
              <Field label="Full name"><input required value={form.name} onChange={set('name')} className="input" placeholder="Juan Dela Cruz" /></Field>
              <Field label="Mobile number">
                <div className="flex gap-2">
                  <select aria-label="Messaging app" value={form.app} onChange={set('app')} className="input !w-32">
                    <option>Viber</option><option>WhatsApp</option><option>Both</option>
                  </select>
                  <input required type="tel" pattern="[0-9+\s\-]{10,16}" value={form.number} onChange={set('number')} className="input" placeholder="0917 123 4567" />
                </div>
              </Field>
              <Field label="Email (optional)"><input type="email" value={form.email} onChange={set('email')} className="input" placeholder="you@email.com" /></Field>
              <Field label="Your current location"><input required value={form.location} onChange={set('location')} className="input" placeholder="e.g. Makati City" /></Field>
              {interest && (
                <p className="flex items-center justify-between gap-3 rounded-xl bg-blush-100 px-4 py-2 text-sm">
                  <span>Interested in: <b>{interest}</b></span>
                  <button type="button" onClick={() => setInterest('')} className="text-rose-deep">clear</button>
                </p>
              )}
              <button disabled={state === 'sending'} className="btn-rose w-full justify-center disabled:opacity-60">
                <Send size={16} /> {state === 'sending' ? 'Sending…' : 'Send my inquiry'}
              </button>
              {state === 'error' && (
                <div className="text-center">
                  <p className="text-sm">Couldn't send right now. Send it directly instead:</p>
                  <DirectSend message={message} app={form.app} />
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// WhatsApp opens with the message pre-filled; Viber can't pre-fill, so the message is copied first.
function DirectSend({ message, app }) {
  const [toast, setToast] = useState(false)
  const viber = async () => {
    if (await copyText(message)) {
      setToast(true)
      setTimeout(() => setToast(false), 4000)
    }
    window.location.href = viberLink()
  }
  const buttons = [
    <a key="WhatsApp" href={whatsappLink(message)} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 px-5 py-2.5 text-sm font-medium text-[#128C4A] transition hover:bg-[#25D366]/20">
      <MessageCircle size={16} /> Send via WhatsApp
    </a>,
    <button key="Viber" type="button" onClick={viber}
      className="inline-flex items-center gap-2 rounded-full bg-[#7360F2]/10 px-5 py-2.5 text-sm font-medium text-[#5b48d6] transition hover:bg-[#7360F2]/20">
      <Phone size={16} /> Send via Viber
    </button>,
  ]
  if (app === 'Viber') buttons.reverse()
  return (
    <>
      <div className="mt-3 flex flex-wrap justify-center gap-2">{buttons}</div>
      {toast && (
        <p role="status" className="mx-auto mt-3 w-fit rounded-full bg-ink px-5 py-2 text-sm text-white shadow-lg">Message copied — paste it in Viber</p>
      )}
    </>
  )
}

function Field({ label, children }) {
  return <label className="block"><span className="mb-1 block text-xs uppercase tracking-widest text-ink/80">{label}</span>{children}</label>
}
