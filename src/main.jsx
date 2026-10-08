import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = <StrictMode><App /></StrictMode>
// The production build ships pre-rendered HTML (scripts/prerender.mjs) — attach to it; `npm run dev` starts empty
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
