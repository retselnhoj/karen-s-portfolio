// The one place a lead message is built — used for the Netlify "message" field
// and for the WhatsApp / Viber direct-send buttons.
//
//   Lead: {name}
//   Number: {number} ({app})
//   Email: {email}              ← line left out when empty
//   Location: {location}
//   Inquiring about: {interest} ← "General inquiry" when empty
//   Sent: Oct 9, 2026, 2:45 PM  ← Asia/Manila time

export const GENERAL_INQUIRY = 'General inquiry'

const sentAt = (date) =>
  date.toLocaleString('en-US', {
    timeZone: 'Asia/Manila', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
  }).replace(/ /g, ' ') // some browsers put a narrow no-break space before AM/PM

export function buildLeadMessage(form, interest, date = new Date()) {
  const email = form.email?.trim()
  return [
    `Lead: ${form.name.trim()}`,
    `Number: ${form.number.trim()} (${form.app})`,
    email && `Email: ${email}`,
    `Location: ${form.location.trim()}`,
    `Inquiring about: ${interest || GENERAL_INQUIRY}`,
    `Sent: ${sentAt(date)}`,
  ].filter(Boolean).join('\n')
}
