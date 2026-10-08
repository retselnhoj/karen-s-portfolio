import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { replacements } from './scripts/seo.mjs'

// Fills index.html's %SITE_URL%, %HERO_IMAGE%, JSON-LD and <noscript> from src/data/site.js
const seo = () => ({
  name: 'seo',
  transformIndexHtml: {
    order: 'pre',
    handler: (html) => Object.entries(replacements()).reduce((out, [key, value]) => out.replaceAll(key, value), html),
  },
})

export default defineConfig({
  plugins: [seo(), react(), tailwindcss()],
})
