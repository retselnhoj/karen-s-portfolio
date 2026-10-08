# Karen — The Property Aligner (Nuvali)

Vite + React + Tailwind CSS v4 + react-zoom-pan-pinch. Lead form uses Netlify Forms.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Update content
- **All text, contacts, properties, models:** `src/data/site.js`
- **Images:** `public/images/crescela/` (.webp). Reference them in `site.js` with `img('name')`
- **Map pins:** `vicinitySpots` / `siteSpots` in `site.js` — `x` / `y` are % positions on the image
- **Lot inquiry (Site Plan & Lot Inquiry tab):**
  - `blocks` — the valid block numbers (1–27, no 4 or 13). Add or remove a block here.
  - `blockSpots` — where each block's "B10" chip sits on `site-plan.webp` (`x` / `y` in %). Every block in `blocks` needs one.
  - `lotsPerBlock` — the highest lot number in each block; the Lot dropdown lists 1 up to that number.
  - `skippedLotNumbers` — lot numbers the plan never uses (4 and 13), left out of the Lot dropdown.
  - Lots are sold live: never add available / sold / reserved data. Every selection is only an inquiry to Karen.
- **Elevation blocks:** `elevationBands` in `site.js` — which blocks are in each band (approximate — final elevations per developer)
  - `elevationBlockSpots` — where each block sits on `elevation-range.webp` (`x` / `y` in %). Tapping a band zooms to its blocks.
  - `elevationEmptySpot` — where a band with no blocks zooms to (the detention pond).
- **New site plan image:** replace `public/images/crescela/site-plan.webp`, then re-check `siteSpots`, `blockSpots` and `lotsPerBlock`
- **Google Maps button:** `featured.googleMaps`
- **Facebook page:** `profile.facebook` / `profile.facebookHandle`
- **Link preview image:** `public/images/crescela/og-cover.jpg` (1200×630 JPG)

## Deploy (Netlify)
1. Push to GitHub.
2. Netlify → Add new site → Import from GitHub → pick the repo (build settings come from `netlify.toml`).
3. Site settings → Forms → enable form detection, then redeploy once.
4. Leads appear under **Forms → leads**. Add an email notification there so Karen gets each lead in her inbox.

5. In `index.html`, replace `https://YOUR-SITE.netlify.app` (2 places) with the real site URL so the Facebook link preview works, then redeploy.

## Lead notifications
Every inquiry is saved in Netlify under **Forms → leads**. To also email each one to Karen:

Netlify dashboard → **Site configuration → Forms → Form notifications → Add notification → Email notification** → form **leads** → send to `karenb.avida@gmail.com`.

The email shows every field; the **message** field holds the formatted lead (built by `src/lib/leadMessage.js`):

```
Lead: Juan Dela Cruz
Number: 0917 123 4567 (Viber)
Email: juan@email.com            ← left out when empty
Location: Makati City
Inquiring about: Crescela Nuvali – Block 5, Lot 1
Sent: Oct 9, 2026, 2:45 PM       ← Asia/Manila time
```

The email subject is `New Lead: {name} – {interest}` (the form's `subject` field). After submitting, the client can also send the same message straight to Karen on WhatsApp or Viber.

> GitHub Pages works for the site itself, but the lead form needs Netlify (or swap the fetch in `LeadForm.jsx` to Formspree).
