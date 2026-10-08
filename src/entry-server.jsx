// Used only at build time (scripts/prerender.mjs) to write the page's HTML into dist/index.html,
// so visitors and search engines get real content before any JavaScript runs.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export const render = () => renderToString(<StrictMode><App /></StrictMode>)
