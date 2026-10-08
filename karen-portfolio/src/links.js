import { profile } from './data/site'
export const whatsappLink = (msg = 'Hi Karen! I’m interested in a lot in Crescela Nuvali.') =>
  `https://wa.me/${profile.phoneIntl}?text=${encodeURIComponent(msg)}`
export const viberLink = () => `viber://chat?number=%2B${profile.phoneIntl}`
export const mailLink = () => `mailto:${profile.email}`
