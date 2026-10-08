// Last build step: renders the React app to HTML and puts it inside <div id="root"> in dist/index.html.
// The browser shows that HTML straight away, then React takes over ("hydrates") when the JS has loaded.
import { readFileSync, writeFileSync, rmSync } from 'node:fs'

const ssrDir = new URL('../dist-ssr/', import.meta.url)
const htmlFile = new URL('../dist/index.html', import.meta.url)
const EMPTY_ROOT = '<div id="root"></div>'

const { render } = await import(new URL('entry-server.js', ssrDir).href)
const html = readFileSync(htmlFile, 'utf8')
if (!html.includes(EMPTY_ROOT)) throw new Error(`prerender: ${EMPTY_ROOT} not found in dist/index.html`)

const app = render()
writeFileSync(htmlFile, html.replace(EMPTY_ROOT, () => `<div id="root">${app}</div>`))
rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerendered ${(app.length / 1024).toFixed(1)} kB of HTML into dist/index.html`)
