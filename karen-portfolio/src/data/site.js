// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to update Karen's details and the property content.
//  Images live in /public/images/crescela/ (converted to .webp).
// ─────────────────────────────────────────────────────────────

const img = (name) => `/images/crescela/${name}.webp`

export const profile = {
  name: 'Karen',
  fullName: 'Karen Besueno',
  title: 'The Property Aligner',
  location: 'Nuvali, Santa Rosa, Laguna',
  tagline: 'Aligning you with the perfect lot for your future home — in the heart of Nuvali.',
  email: 'karenb.avida@gmail.com',
  phone: '0928 324 6225',                 // display format
  phoneLabel: 'Viber / WhatsApp',
  phoneIntl: '639283246225',              // digits only, starts with 63, no "+" (wa.me and viber:// links)
  facebook: 'https://www.facebook.com/ThePropertyAligner',
  facebookHandle: 'The Property Aligner',
  photo: '/images/karen.jpg',            // TODO: Karen's photo, e.g. '/images/karen.jpg'
  heroImage: img('aerial-mountain-view'),
}

// ── Featured / top selling property ──────────────────────────
export const featured = {
  name: 'Crescela Nuvali',
  developer: 'Avida Land · an Ayala Land company',
  tagline: 'Live and thrive in the highlands of Nuvali.',
  type: 'Residential Lots',
  status: 'Now Selling',
  price: 'Ask for price list',          // TODO: e.g. 'Starts at ₱X.XM'
  lotSizes: 'TODO sqm',                 // TODO: e.g. '150 – 250 sqm'
  elevation: '199 – 225 m above sea level',
  googleMaps: 'https://www.google.com/maps/search/?api=1&query=Crescela+Nuvali', // TODO: exact pin
  gallery: [
    { src: img('aerial-gate-entrance'), label: 'Entrance' },
    { src: img('aerial-masterplan'), label: 'Masterplan' },
    { src: img('aerial-clubhouse'), label: 'Clubhouse' },
    { src: img('clubhouse-pool'), label: 'Pool' },
    { src: img('playground'), label: 'Playground' },
  ],
  highlights: [
    'Clubhouse',
    'Adult & kiddie pool',
    'Basketball court',
    "Kid's play area",
    'Jogging & walk paths',
    'Generous open spaces',
    'Laguna de Bay & Mt. Makiling views',
  ],
}

// ── Map: Nuvali vicinity hotspots (x/y = % position on the image) ──
export const vicinitySpots = [
  { x: 48.6, y: 77.2, title: 'Crescela Nuvali', text: 'Southern Nuvali, beside Hillcrest Estates.', main: true },
  { x: 28.3, y: 20.6, title: 'Ayala Malls Solenad', text: 'Shopping, dining, S&R, Landers and Healthway nearby.' },
  { x: 37.6, y: 39.7, title: 'Xavier School Nuvali', text: 'Private school within Nuvali.' },
  { x: 46.0, y: 61.0, title: 'Everest Academy', text: 'Private school within Nuvali.' },
  { x: 50.8, y: 67.8, title: 'Miriam College Nuvali', text: 'Close to Crescela.' },
]

// ── Map: Crescela site plan amenity pins (x/y = % position on site-plan.webp) ──
export const siteSpots = [
  { x: 31.5, y: 75.0, title: 'Main Entrance', text: 'Gated entry with guardhouse.', image: img('gate-entrance') },
  { x: 30.3, y: 51.6, title: 'Roundabout', text: 'Tree-lined central roundabout.', image: img('aerial-roundabout') },
  { x: 43.5, y: 48.0, title: 'Main Amenity', text: 'Clubhouse, pool, court and play area.', image: img('aerial-clubhouse') },
  { x: 15.5, y: 37.5, title: 'Pocket Park', text: 'Green pocket park.', image: img('playground') },
  { x: 26.0, y: 30.0, title: 'Pocket Park', text: 'Green pocket park.', image: img('dog-park') },
  { x: 66.3, y: 25.9, title: 'Ecoyard / MRF', text: 'Ecoyard and materials recovery facility.', image: null },
  { x: 84.5, y: 25.9, title: 'Detention Pond', text: 'Natural water management, +199m.', image: null },
]

// ── Lot inquiry ──────────────────────────────────────────────
// Lots are sold live: NEVER add availability / sold / reserved data here.
// Every selection is just an inquiry that goes to Karen.

// Valid blocks: 1–27 except 4 and 13 (confirmed by the architect).
export const blocks = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]

// Where each block's "B10" chip sits on site-plan.webp (x/y = % position on the image).
// Neighbouring narrow blocks (10–16, 18–20, 22/23, 24/25) are staggered on purpose so the
// chips don't cover each other on a phone — keep them apart when nudging.
export const blockSpots = {
  1: { x: 22.0, y: 64.1 }, 2: { x: 25.0, y: 57.2 }, 3: { x: 36.8, y: 50.4 }, 5: { x: 38.5, y: 56.3 },
  6: { x: 36.5, y: 63.5 }, 7: { x: 41.0, y: 68.5 }, 8: { x: 38.3, y: 75.4 }, 9: { x: 47.3, y: 60.0 },
  10: { x: 49.8, y: 47.5 }, 11: { x: 53.3, y: 40.0 }, 12: { x: 56.6, y: 45.5 }, 14: { x: 60.2, y: 38.5 },
  15: { x: 63.6, y: 45.5 }, 16: { x: 67.1, y: 38.0 }, 17: { x: 78.3, y: 36.0 }, 18: { x: 82.8, y: 44.5 },
  19: { x: 86.0, y: 37.5 }, 20: { x: 89.6, y: 43.5 }, 21: { x: 73.3, y: 29.8 }, 22: { x: 54.0, y: 34.4 },
  23: { x: 59.5, y: 28.2 }, 24: { x: 38.0, y: 43.3 }, 25: { x: 42.5, y: 37.3 }, 26: { x: 27.0, y: 43.1 },
  27: { x: 28.3, y: 36.0 },
}

// Highest lot number printed inside each block on the site plan.
export const lotsPerBlock = {
  1: 32, 2: 18, 3: 21, 5: 10, 6: 15, 7: 19, 8: 15, 9: 14, 10: 16, 11: 8, 12: 9, 14: 9, 15: 18,
  16: 25, 17: 9, 18: 20, 19: 18, 20: 21, 21: 22, 22: 26, 23: 27, 24: 29, 25: 20, 26: 17, 27: 7,
}

// Lot numbers the site plan never uses in any block (numbering goes 3 → 5 and 12 → 14).
export const skippedLotNumbers = [4, 13]

// ── Artist's Perspective ─────────────────────────────────────
export const perspectivesNote = "Homes shown are artist's perspectives for illustration. Lots are sold without houses."
export const perspectives = [
  { src: img('aerial-masterplan'), caption: 'Masterplan aerial view', cat: 'Aerial' },
  { src: img('aerial-roundabout'), caption: 'Tree-lined roundabout', cat: 'Aerial' },
  { src: img('aerial-clubhouse'), caption: 'Clubhouse & amenity core', cat: 'Aerial' },
  { src: img('aerial-basketball-court'), caption: 'Basketball court & amphitheater', cat: 'Aerial' },
  { src: img('aerial-mountain-view'), caption: 'Overlooking Mt. Makiling', cat: 'Aerial' },
  { src: img('gate-entrance'), caption: 'Grand entrance', cat: 'Entrance' },
  { src: img('aerial-gate-entrance'), caption: 'Gate and guardhouse', cat: 'Entrance' },
  { src: img('gate-street-view'), caption: 'Entrance with mountain view', cat: 'Entrance' },
  { src: img('clubhouse-pool'), caption: 'Clubhouse pool', cat: 'Amenities' },
  { src: img('playground'), caption: "Children's playground", cat: 'Amenities' },
  { src: img('pool-lounge'), caption: 'Pool lounge', cat: 'Amenities' },
  { src: img('gazebo-cabana'), caption: 'Gazebo', cat: 'Amenities' },
  { src: img('amphitheater-seating'), caption: 'Layered seating', cat: 'Amenities' },
  { src: img('dog-park'), caption: 'Pet park', cat: 'Amenities' },
  { src: img('amenity-features'), caption: 'Amenity features overview', cat: 'Amenities' },
]

// ── Elevation Range ──────────────────────────────────────────
// Blocks are approximate, read from the elevation map — final elevations per developer.
export const elevationImage = img('elevation-range')
export const elevationBands = [
  { range: 'Below 200 m', color: '#8cc5b5', where: 'North-east edge near the detention pond (Laguna de Bay side)', blocks: [] },
  { range: '200 – 205 m', color: '#6fae9c', where: 'Northern strip facing Laguna de Bay', blocks: [21, 23] },
  { range: '205 – 210 m', color: '#4f9381', where: 'Central-north, around the park', blocks: [3, 5, 22, 24, 25] },
  { range: '210 – 215 m', color: '#3c7f6c', where: 'Central blocks', blocks: [10, 11, 12, 14, 15, 16, 17, 26, 27] },
  { range: '215 – 220 m', color: '#2a6b59', where: 'South and east blocks', blocks: [2, 6, 7, 8, 9, 18, 19, 20] },
  { range: '220 – 225 m', color: '#1a5545', where: 'Highest — south-west near the entrance (Tagaytay Ridge side)', blocks: [1] },
]

// Where each block sits on elevation-range.webp (x/y = % position on the image).
export const elevationBlockSpots = {
  1: { x: 18.3, y: 69.4 }, 2: { x: 20.6, y: 60.5 }, 3: { x: 33.6, y: 48.6 }, 5: { x: 36.1, y: 54.7 },
  6: { x: 36.1, y: 66.6 }, 7: { x: 38.3, y: 71.9 }, 8: { x: 39.2, y: 77.6 }, 9: { x: 47.8, y: 62.9 },
  10: { x: 48.3, y: 37.2 }, 11: { x: 51.9, y: 35.1 }, 12: { x: 55.8, y: 34.3 }, 14: { x: 59.7, y: 33.5 },
  15: { x: 63.9, y: 30.2 }, 16: { x: 68.1, y: 30.2 }, 17: { x: 81.1, y: 22.5 }, 18: { x: 86.9, y: 25.7 },
  19: { x: 90.8, y: 23.7 }, 20: { x: 93.6, y: 22.1 }, 21: { x: 73.6, y: 17.6 }, 22: { x: 55.6, y: 26.1 },
  23: { x: 54.2, y: 19.2 }, 24: { x: 36.7, y: 41.7 }, 25: { x: 34.7, y: 36.4 }, 26: { x: 21.1, y: 45.8 },
  27: { x: 21.9, y: 33.5 },
}
// Bands with no blocks zoom here instead (the detention pond area).
export const elevationEmptySpot = { x: 88, y: 10 }

export const elevationPerks = [
  { title: 'Cooler breeze', text: 'Higher ground in southern Nuvali catches more wind.' },
  { title: 'Views', text: 'Mt. Makiling to the east, Laguna de Bay to the north.' },
  { title: 'Natural drainage', text: 'Gentle slope toward the north-east detention pond.' },
]

export const teaserImage = img('crescela-teaser')
export const formImage = img('nuvali-sign')
