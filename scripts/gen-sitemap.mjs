// Writes public/sitemap.xml and public/robots.txt from SITE_URL in src/data/site.js.
// Runs automatically before every build ("prebuild" in package.json), so <lastmod> is the build date.
import { writeFileSync } from 'node:fs'
import { SITE_URL } from '../src/data/site.js'

const pub = new URL('../public/', import.meta.url)
const today = new Date().toISOString().slice(0, 10)

writeFileSync(new URL('sitemap.xml', pub), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`)

writeFileSync(new URL('robots.txt', pub), `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`)

console.log(`sitemap.xml + robots.txt written for ${SITE_URL} (lastmod ${today})`)
