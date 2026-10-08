// Builds the SEO parts of index.html from src/data/site.js, so nothing is typed twice.
// Used by the "seo" plugin in vite.config.js (runs for both `npm run dev` and `npm run build`).
import { SITE_URL, profile, featured, faqs } from '../src/data/site.js'

const address = { '@type': 'PostalAddress', addressLocality: 'Santa Rosa', addressRegion: 'Laguna', addressCountry: 'PH' }
const placeDescription =
  `Residential lots by Avida Land in Nuvali, Santa Rosa, Laguna, ${featured.elevation.replace(' – ', '–')}. ` +
  "Clubhouse, adult and kiddie pools, basketball court, kid's play area and jogging paths, with views of Laguna de Bay and Mt. Makiling."

// No reviews, ratings or prices here — only add what is real and shown on the page.
const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'RealEstateAgent',
      '@id': `${SITE_URL}/#agent`,
      name: profile.fullName,
      alternateName: profile.title,
      url: SITE_URL,
      image: SITE_URL + profile.photoJpg,
      email: profile.email,
      telephone: `+${profile.phoneIntl}`,
      areaServed: ['Nuvali', 'Santa Rosa, Laguna', 'Laguna, Philippines'],
      address,
      sameAs: [profile.facebook],
    },
    {
      '@type': 'Place',
      '@id': `${SITE_URL}/#crescela`,
      name: featured.name,
      description: placeDescription,
      address,
      image: `${SITE_URL}/images/crescela/og-cover.jpg`,
      // "geo" left out on purpose: featured.googleMaps has no real coordinates yet.
    },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: profile.title, url: SITE_URL },
  ],
}

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const ld = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

export const jsonLdTags = () => [graph, faqPage].map(ld).join('\n    ')

// The production build pre-renders the whole page into #root (scripts/prerender.mjs), so crawlers
// and link-preview bots that don't run JavaScript already get the real h1, description, contact
// details, Facebook link and FAQ. Without JavaScript the scroll fade-in never runs, so this
// <noscript> just un-hides those sections.
export const noscriptHtml = () => '<noscript><style>.reveal { opacity: 1; transform: none; }</style></noscript>'

export const replacements = () => ({
  '%SITE_URL%': SITE_URL,
  '%HERO_IMAGE%': profile.heroImage,
  '%HERO_SRCSET%': profile.heroImageSrcSet,
  '<!--seo:jsonld-->': jsonLdTags(),
  '<!--seo:noscript-->': noscriptHtml(),
})
