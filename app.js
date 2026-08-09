/* ============================================================
   Dear, You — app logic (v2)
   Paste your Supabase project URL + anon key below, then see
   the setup steps in the chat reply for the one-time table setup.
   ============================================================ */
const SUPABASE_URL = 'https://myezfpifwwlzggqfsgts.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15ZXpmcGlmd3dsemdncWZzZ3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxNjczNDcsImV4cCI6MjA5ODc0MzM0N30.G_DFS9W6GCTgbXD8eOJLuzEHKtAUP_1P-p6YDL1cgFg';
const sb = (window.supabase && SUPABASE_URL.includes('supabase.co') && !SUPABASE_URL.includes('YOUR_PROJECT_ID'))
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

// ---------------------------------------------------------------
// 1. Themes (flower shape/motif) + color variants (the "mood")
// ---------------------------------------------------------------
const THEMES = {
  romantic: {
    label: 'Romantic Rose', flowerName: 'rose',
    flowerImage: 'assets/flowers/rose.png', floaty: 'rose-petal', defaultVariant: 'blush'
  },
  blossom: {
    label: 'Cherry Blossom', flowerName: 'sakura',
    flowerImage: 'assets/flowers/blossom.png', floaty: 'blossom-petal', defaultVariant: 'sakura'
  },
  dreamy: {
    label: 'Dreamy Wildflower', flowerName: 'cosmos',
    flowerImage: 'assets/flowers/cosmos.png', floaty: 'butterfly', defaultVariant: 'lavender'
  },
  minimal: {
    label: 'Minimal Bloom', flowerName: 'daisy',
    flowerImage: 'assets/flowers/daisy.png', floaty: 'clover', defaultVariant: 'sage'
  },
  sunflower: {
    label: 'Sunny Sunflower', flowerName: 'sunflower',
    flowerImage: 'assets/flowers/sunflower.png', floaty: 'sunflower-petal', defaultVariant: 'gold'
  },
  peony: {
    label: 'Blooming Peony', flowerName: 'peony',
    flowerImage: 'assets/flowers/peony.png', floaty: 'peony-petal', defaultVariant: 'peach'
  },
  zinnia: {
    label: 'Bold Zinnia', flowerName: 'zinnia',
    flowerImage: 'assets/flowers/zinnia.png', floaty: 'zinnia-petal', defaultVariant: 'scarlet'
  },
  dahlia: {
    label: 'Vivid Dahlia', flowerName: 'dahlia',
    flowerImage: 'assets/flowers/dahlia.png', floaty: 'dahlia-petal', defaultVariant: 'fuchsia'
  }
};
const THEME_ORDER = ['romantic', 'blossom', 'dreamy', 'minimal', 'sunflower', 'peony', 'zinnia', 'dahlia'];

const COLOR_VARIANTS = {
  blush:    { label: 'Blush Pink', accent: '#c96b82', soft: '#f6dde3', deep: '#7d2a3f', paper: '#fdf4f6', center: '#e8b7c4' },
  sakura:   { label: 'Sakura Pink', accent: '#e8a3b8', soft: '#fbe7ee', deep: '#9c5a71', paper: '#fef6f8', center: '#f3c7d5' },
  lavender: { label: 'Lavender',   accent: '#8b6bc9', soft: '#e9defb', deep: '#4a2f7d', paper: '#f9f6fd', center: '#cdb9ec' },
  sky:      { label: 'Sky Blue',   accent: '#5f8fc9', soft: '#deebf9', deep: '#2d4f7d', paper: '#f4f9fd', center: '#b7d0ea' },
  sage:     { label: 'Sage Green', accent: '#6f9d6a', soft: '#e1f0df', deep: '#2f5c2a', paper: '#f5faf4', center: '#bcdbb8' },
  gold:     { label: 'Warm Gold',  accent: '#c9903f', soft: '#f6e6c8', deep: '#7d5220', paper: '#fdf9f0', center: '#eccd93' },
  peach:    { label: 'Soft Peach', accent: '#e0916a', soft: '#faeade', deep: '#8a4a2a', paper: '#fdf8f4', center: '#f0c5a8' },
  scarlet:  { label: 'Scarlet Red', accent: '#c33a2e', soft: '#f8ded9', deep: '#7a1f17', paper: '#fdf5f3', center: '#e8a89b' },
  fuchsia:  { label: 'Vivid Fuchsia', accent: '#b8348f', soft: '#f7dcee', deep: '#6b1a52', paper: '#fdf5fa', center: '#e8a8d4' }
};
const VARIANT_ORDER = ['blush', 'sakura', 'lavender', 'sky', 'sage', 'gold', 'peach', 'scarlet', 'fuchsia'];

const FONT_OPTIONS = [
  { id: 'caveat',   label: 'Handwriting',    family: "'Caveat', cursive" },
  { id: 'dancing',  label: 'Elegant Script', family: "'Dancing Script', cursive" },
  { id: 'shadows',  label: 'Casual Note',    family: "'Shadows Into Light', cursive" },
  { id: 'patrick',  label: 'Simple & Neat',  family: "'Patrick Hand', cursive" },
  { id: 'kalam',    label: 'Friendly Note',  family: "'Kalam', cursive" },
  { id: 'apple',    label: 'Delicate Hand',  family: "'Homemade Apple', cursive" },
  { id: 'indie',    label: 'Playful Hand',   family: "'Indie Flower', cursive" },
  { id: 'marck',    label: 'Flowing Script', family: "'Marck Script', cursive" }
];

// Custom hand-drawn stickers (no emoji) — used by the "Custom" tab.
const CUSTOM_STICKERS = {
  heart:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.3C.5 8.4 2.3 5 5.7 5c2 0 3.4 1.1 4.3 2.6C10.9 6.1 12.3 5 14.3 5c3.4 0 5.2 3.4 3.7 6.7C19.5 16.4 12 21 12 21z"/></svg>',
  star:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5-5.9-3.4-5.9 3.4 1.3-6.5-4.9-4.5 6.6-.7z"/></svg>',
  moon:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 14.7A8.5 8.5 0 1 1 9.3 3.5a7 7 0 1 0 11.2 11.2z"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"/></svg>',
  ribbon:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8.5" r="3.7"/><circle cx="15.5" cy="8.5" r="3.7"/><path d="M12 12v9M9 21l3-2 3 2"/></svg>',
  feather: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4S9 5 6 12s-2 9-2 9 6.5.5 10-3 3-8 6-14z"/><path d="M14 10L6 18"/></svg>',
  envelope: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="1.5"/><path d="M3 6.5l9 7 9-7"/></svg>',
  flower: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.8" r="2.2"/><circle cx="17.7" cy="8.4" r="2.2"/><circle cx="15.6" cy="14.8" r="2.2"/><circle cx="8.4" cy="14.8" r="2.2"/><circle cx="6.3" cy="8.4" r="2.2"/><circle cx="12" cy="9.6" r="1.6" fill="currentColor" stroke="none"/><path d="M12 13v8"/></svg>',
  ring: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="12" cy="15" r="6"/><path d="M9.5 9L12 3l2.5 6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  infinity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M7 15c-2.2 0-4-1.8-4-4s1.8-4 4-4c3 0 5 8 8 8 2.2 0 4-1.8 4-4s-1.8-4-4-4c-3 0-5 8-8 8z"/></svg>',
  'lock-heart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/><path d="M12 15.5s-2-1.2-2-2.6a1.4 1.4 0 012.6-.9 1.4 1.4 0 012.4.9c0 1.4-3 2.6-3 2.6z" fill="currentColor" stroke="none"/></svg>',
  key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="12" r="4"/><path d="M11 12h10M17 12v4M20 12v3"/></svg>',
  'cupid-arrow': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l6-6"/><path d="M9 15l7.5-7.5M19.5 4.5l-5 .5M19.5 4.5l-.5 5"/><path d="M6.5 11.5c-1.8-1.9-1.4-4.4.3-5.1 1.8-.7 2.9.7 2.9.7s1.1-1.4 2.9-.7c1.7.7 2.1 3.2.3 5.1L9.4 15z"/></svg>',
  'double-heart': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 14s-5-3-5-6.3C3 5.6 4.3 4 6.3 4c1.2 0 2.1.6 2.7 1.5C9.6 4.6 10.5 4 11.7 4c2 0 3.3 1.6 3.3 3.7C15 11 10 14 8 14z" opacity="0.55"/><path d="M15 20s-6-3.6-6-7.7C9 9.9 10.6 8 12.9 8c1.4 0 2.5.7 3.1 1.8.6-1.1 1.7-1.8 3.1-1.8 2.3 0 3.9 1.9 3.9 4.3 0 4.1-6 7.7-6 7.7z"/></svg>',
  kiss: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10c2.5-2 5-2.3 9-2.3S18.5 8 21 10c-1 3-4.5 5-9 5s-8-2-9-5z"/><path d="M3 10c2.5 1.4 5 2 9 2s6.5-.6 9-2"/></svg>',
  balloon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="8" rx="6" ry="7"/><path d="M12 15l-1.5 2 1.5 1-1.5 2"/></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18M12 9v12"/><path d="M12 9c-1.5 0-4-1-4-3.2C8 4.3 9.1 3 10.5 3c1.6 0 1.5 3 1.5 6zM12 9c1.5 0 4-1 4-3.2C16 4.3 14.9 3 13.5 3c-1.6 0-1.5 3-1.5 6z"/></svg>',
  cake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21v-7a2 2 0 012-2h14a2 2 0 012 2v7z"/><path d="M3 21h18M7 12V9M12 12V9M17 12V9M12 9c0-1.5-1-1.5-1-3s1-2 1-2 1 .5 1 2-1 1.5-1 3z"/></svg>',
  candle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="6" height="12" rx="1"/><path d="M12 9V5"/><path d="M12 5c-1 0-1.5-.8-1.5-1.6C10.5 2.5 12 1.5 12 1.5s1.5 1 1.5 1.9c0 .8-.5 1.6-1.5 1.6z" fill="currentColor" stroke="none"/></svg>',
  confetti: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="6" r="1.4"/><circle cx="12" cy="4" r="1.1"/><circle cx="19" cy="7" r="1.4"/><circle cx="4" cy="14" r="1.1"/><circle cx="20" cy="15" r="1.1"/><rect x="10" y="11" width="2.4" height="2.4" transform="rotate(30 11 12)"/><rect x="15" y="18" width="2.4" height="2.4" transform="rotate(20 16 19)"/><rect x="6" y="19" width="2.4" height="2.4" transform="rotate(-15 7 20)"/></svg>',
  'party-hat': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 16H5z"/><path d="M8 12l8 0M9.5 8l5 0"/><circle cx="12" cy="3" r="1.2" fill="currentColor" stroke="none"/></svg>',
  champagne: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3l1 7a3 3 0 003 3v8M6 3h4"/><path d="M17 6l.6 6a2.3 2.3 0 01-2.3 2.4v6.6M17 6h-3.4"/><path d="M7 21h6M13 22h5"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v5a5 5 0 01-10 0z"/><path d="M7 5H4a3 3 0 003 4M17 5h3a3 3 0 01-3 4"/><path d="M10 15v3M14 15v3M8 21h8M9 18h6"/></svg>',
  banner: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3v18l3-2 3 2 3-2 3 2 3-2 3 2V3z"/></svg>',
  bee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="13" rx="4.5" ry="5.5"/><path d="M8 11h8M8 14h8M8 17h8" stroke-width="1.6"/><path d="M12 8V6M9 6c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5"/><path d="M8 9c-2-1-3.5 0-4 1M16 9c2-1 3.5 0 4 1"/></svg>',
  cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4.5 4.5 0 01-.5-9 5.5 5.5 0 0110.6-1.8A4 4 0 0117 18z"/></svg>',
  raindrop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c4 5 6 8.5 6 11.5a6 6 0 11-12 0C6 11.5 8 8 12 3z"/></svg>',
  snowflake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M12 2v20M4 7l16 10M20 7L4 17"/><path d="M12 2l-2 2M12 2l2 2M12 22l-2-2M12 22l2-2M4 7l2.6.3M4 7l1-2.4M20 17l-2.6-.3M20 17l-1 2.4M20 7l-2.6.3M20 7l-1-2.4M4 17l2.6-.3M4 17l1 2.4"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4S9 5 6 12s-2 9-2 9 6.5.5 10-3 6-14 6-14z"/><path d="M14 10L6 18"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7L5.6 5.6"/></svg>',
  tulip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12V21"/><path d="M12 21c-2.5-.3-4-2-4-4.3M12 21c2.5-.3 4-2 4-4.3"/><path d="M12 3c-3 0-4.5 2.6-3 5-1.8.3-3 2-3 3.7 0 2 1.8 3.3 6 3.3s6-1.3 6-3.3c0-1.7-1.2-3.4-3-3.7 1.5-2.4 0-5-3-5z"/></svg>',
  sprout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21v-9"/><path d="M12 12c0-4-3-5-7-5 0 4 3 5 7 5zM12 12c0-3.5 2.5-4.5 6-4.5 0 3.5-2.5 4.5-6 4.5z"/><path d="M6 21h12"/></svg>',
  clover: '<svg viewBox="0 0 24 24" fill="currentColor"><g><circle cx="9" cy="9" r="4.2"/><circle cx="15" cy="9" r="4.2"/><circle cx="9" cy="15" r="4.2"/><circle cx="15" cy="15" r="4.2"/></g><line x1="12" y1="17" x2="12" y2="22" stroke="currentColor" stroke-width="1.4"/></svg>',
  coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5z"/><path d="M17 9h1.5a2.5 2.5 0 010 5H17"/><path d="M7 5c0-1 1-1 1-2M11 5c0-1 1-1 1-2"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6c-1.8-1.4-4.5-2-8-1.6v14c3.5-.4 6.2.2 8 1.6M12 6c1.8-1.4 4.5-2 8-1.6v14c-3.5-.4-6.2.2-8 1.6V6z"/></svg>',
  'paper-plane': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3L3 10.5l7.5 3L14 20.5z"/><path d="M21 3l-10.5 10.5"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="14" r="3.5"/></svg>',
  umbrella: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0118 0z"/><path d="M12 12v8a2 2 0 01-3 1.7M12 3v2"/></svg>',
  hug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3"/><path d="M5 21c0-4 3-7 7-7s7 3 7 7"/><path d="M5 21c1.5-2 2.5-4 2.5-6M19 21c-1.5-2-2.5-4-2.5-6"/></svg>',
  smile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/><path d="M8 14c1 2 3 3 4 3s3-1 4-3"/></svg>',
};
const CUSTOM_ORDER = ['heart', 'star', 'moon', 'sparkle', 'ribbon', 'feather', 'envelope', 'flower', 'ring', 'infinity', 'lock-heart', 'key', 'cupid-arrow', 'double-heart', 'kiss', 'balloon', 'gift', 'cake', 'candle', 'confetti', 'party-hat', 'champagne', 'trophy', 'banner', 'bee', 'cloud', 'raindrop', 'snowflake', 'leaf', 'sun', 'tulip', 'sprout', 'clover', 'coffee', 'book', 'paper-plane', 'camera', 'umbrella', 'hug', 'smile'];

// Curated emoji, grouped — used by the "Emoji" tab.
const EMOJI_CATEGORIES = {
  Love:      ['❤️','💕','💘','💖','💗','💓','💝','💌','😍','🥰','😘','😻'],
  Happy:     ['😊','😉','😎','🤩','🥹','🙌','🤞','😌','🤗','😇'],
  Celebrate: ['🎉','🎊','🎈','🎀','🎁','🎂','🍾','🥂','✨','💫','🕯️','🎶'],
  Nature:    ['🌸','🌷','🌻','🌼','🌹','🍀','🦋','🌙','⭐','☀️','🔥','🌈']
};
const EMOJI_CAT_ORDER = ['Love', 'Happy', 'Celebrate', 'Nature'];

const MAX_STICKERS = 4;

// A sticker on the draft/letter is now { type: 'builtin'|'emoji'|'draw', ... }
// instead of a lookup key, so hand-drawn stickers can carry their own image.
function renderStickerContent(s){
  if (!s) return '';
  if (s.type === 'builtin') return CUSTOM_STICKERS[s.id] || '';
  if (s.type === 'emoji')   return `<span class="sticker-emoji">${escapeHtml(s.ch)}</span>`;
  if (s.type === 'draw')    return `<img class="sticker-drawn" src="${s.src}" alt="">`;
  return '';
}

// Real flower photos (provided by the user) instead of generated shapes —
// see assets/flowers/. These render as-is and don't recolor with the
// flower-color swatches; the swatches still shift the paper/accent mood.
function makeFlowerImg(themeId, size){
  const t = THEMES[themeId] || THEMES.romantic;
  size = size || 100;
  return `<img src="${t.flowerImage}" alt="${t.flowerName}" width="${size}" style="width:${size}px; height:auto; display:block;">`;
}

function floatySVG(kind, color){
  switch(kind){
    case 'rose-petal':
      return `<svg viewBox="0 0 30 40" width="22" xmlns="http://www.w3.org/2000/svg"><path d="M15 0 C28 12 28 30 15 40 C2 30 2 12 15 0 Z" fill="${color}"/></svg>`;
    case 'blossom-petal':
      return `<svg viewBox="0 0 30 30" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M15 1 C22 1 27 8 22 16 C19 21 15 26 15 29 C15 26 11 21 8 16 C3 8 8 1 15 1 Z" fill="${color}"/></svg>`;
    case 'clover':
      return `<svg viewBox="0 0 40 40" width="26" xmlns="http://www.w3.org/2000/svg">
        <g fill="${color}"><circle cx="14" cy="14" r="9"/><circle cx="26" cy="14" r="9"/><circle cx="14" cy="26" r="9"/><circle cx="26" cy="26" r="9"/></g>
        <line x1="20" y1="30" x2="20" y2="40" stroke="${color}" stroke-width="2"/></svg>`;
    case 'butterfly':
      return `<svg viewBox="0 0 60 40" width="32" xmlns="http://www.w3.org/2000/svg">
        <g fill="${color}">
          <path d="M30 20 C22 -4 0 2 4 18 C6 28 20 26 30 20 Z"/>
          <path d="M30 20 C38 -4 60 2 56 18 C54 28 40 26 30 20 Z"/>
        </g><line x1="30" y1="12" x2="30" y2="28" stroke="${color}" stroke-width="1.5"/></svg>`;
    case 'sunflower-petal':
      return `<svg viewBox="0 0 18 40" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M9 0 C14 6 15 26 9 40 C3 26 4 6 9 0 Z" fill="${color}"/></svg>`;
    case 'peony-petal':
      return `<svg viewBox="0 0 34 34" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 2 C27 2 32 12 26 20 C21 27 13 27 8 20 C2 12 7 2 17 2 Z" fill="${color}"/></svg>`;
    case 'zinnia-petal':
      return `<svg viewBox="0 0 20 36" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M10 0 C14 2 15.5 9 15.5 17 C15.5 25 14 32 10 36 C6 32 4.5 25 4.5 17 C4.5 9 6 2 10 0 Z" fill="${color}"/></svg>`;
    case 'dahlia-petal':
      return `<svg viewBox="0 0 14 40" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M7 0 C9 3 12 14 8 24 C11 30 9 36 7 40 C5 36 3 30 6 24 C2 14 5 3 7 0 Z" fill="${color}"/></svg>`;
    default: return '';
  }
}

function spawnFloaties(themeId){
  const t = THEMES[themeId] || THEMES.romantic;
  const v = COLOR_VARIANTS[draft.colorVariant] || COLOR_VARIANTS.blush;
  const host = document.getElementById('floaties');
  host.innerHTML = '';
  const count = window.innerWidth < 640 ? 8 : 14;
  for (let i = 0; i < count; i++){
    const outer = document.createElement('div');
    outer.className = 'floaty';
    outer.style.left = (Math.random() * 100) + 'vw';
    outer.style.top = '-10vh';
    const duration = 16 + Math.random() * 14;
    outer.style.setProperty('--dx', (Math.random()*140-70).toFixed(0)+'px');
    outer.style.setProperty('--rot', (Math.random()*60-30).toFixed(0)+'deg');
    outer.style.animation = `drift-down ${duration}s linear -${Math.random()*duration}s infinite`;
    const inner = document.createElement('div');
    if (t.floaty === 'butterfly') inner.style.animation = `flutter ${1.2+Math.random()}s ease-in-out infinite`;
    inner.innerHTML = floatySVG(t.floaty, v.accent);
    outer.appendChild(inner);
    host.appendChild(outer);
  }
}

// The very first landing screen isn't tied to any one occasion yet, so its
// falling particles mix all 4 themes' shapes and colors together instead of
// picking just one.
function spawnLandingFloaties(){
  const host = document.getElementById('floaties');
  host.innerHTML = '';
  const count = window.innerWidth < 640 ? 8 : 14;
  const mix = THEME_ORDER.map(id => ({
    floaty: THEMES[id].floaty,
    color: COLOR_VARIANTS[THEMES[id].defaultVariant].accent
  }));
  for (let i = 0; i < count; i++){
    const pick = mix[Math.floor(Math.random() * mix.length)];
    const outer = document.createElement('div');
    outer.className = 'floaty';
    outer.style.left = (Math.random() * 100) + 'vw';
    outer.style.top = '-10vh';
    const duration = 16 + Math.random() * 14;
    outer.style.setProperty('--dx', (Math.random()*140-70).toFixed(0)+'px');
    outer.style.setProperty('--rot', (Math.random()*60-30).toFixed(0)+'deg');
    outer.style.animation = `drift-down ${duration}s linear -${Math.random()*duration}s infinite`;
    const inner = document.createElement('div');
    if (pick.floaty === 'butterfly') inner.style.animation = `flutter ${1.2+Math.random()}s ease-in-out infinite`;
    inner.innerHTML = floatySVG(pick.floaty, pick.color);
    outer.appendChild(inner);
    host.appendChild(outer);
  }
}

function applyVariant(variantId){
  const v = COLOR_VARIANTS[variantId] || COLOR_VARIANTS.blush;
  draft.colorVariant = variantId;
  document.documentElement.style.setProperty('--accent', v.accent);
  document.documentElement.style.setProperty('--accent-soft', v.soft);
  document.documentElement.style.setProperty('--accent-deep', v.deep);
  document.documentElement.style.setProperty('--paper', v.paper);
}

// ---------------------------------------------------------------
// 2. State
// ---------------------------------------------------------------
const draft = {
  theme: null, colorVariant: 'blush', music: null,
  to: '', from: '', body: '', font: 'caveat',
  photos: [], stickers: []
};

let ytPlayer = null, ytDuration = 0, scrubInterval = null;

// ---------------------------------------------------------------
// 3. Navigation
// ---------------------------------------------------------------
function showScreen(id){
  document.querySelectorAll('#app .screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'landing'){
    document.body.style.backgroundColor = '#fff';
    spawnLandingFloaties();
  } else {
    document.body.style.backgroundColor = '';
  }
}
document.querySelectorAll('[data-nav]').forEach(btn => btn.addEventListener('click', () => showScreen(btn.getAttribute('data-nav'))));
document.getElementById('btn-start').addEventListener('click', () => showScreen('occasion'));

// ---------------------------------------------------------------
// 4. Occasion step
// ---------------------------------------------------------------
function buildOccasionGrid(){
  const grid = document.getElementById('occasion-grid');
  grid.innerHTML = '';
  THEME_ORDER.forEach(id => {
    const t = THEMES[id];
    const card = document.createElement('div');
    card.className = 'occasion-card';
    card.innerHTML = makeFlowerImg(id, 56) + `<p>${t.label}</p>`;
    card.addEventListener('click', () => {
      document.querySelectorAll('.occasion-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      draft.theme = id;
      applyVariant(t.defaultVariant);
      document.body.setAttribute('data-theme', id);
      spawnFloaties(id);
      document.getElementById('occasion-next').disabled = false;
    });
    grid.appendChild(card);
  });
}
document.getElementById('occasion-next').addEventListener('click', () => showScreen('music'));

// ---------------------------------------------------------------
// 5. Music step
// ---------------------------------------------------------------
let musicSource = 'youtube';
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    musicSource = tab.getAttribute('data-source');
    const input = document.getElementById('music-url');
    input.value = '';
    input.placeholder = musicSource === 'youtube' ? 'paste a YouTube link…' : 'paste a Spotify track link…';
    document.getElementById('music-status').textContent = '';
    document.getElementById('scrub-wrap').hidden = true;
    draft.music = null;
    stopScrubPoll();
  });
});

function extractYouTubeId(url){
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}
function extractSpotifyId(url){
  const m = url.match(/open\.spotify\.com\/track\/([A-Za-z0-9]+)/);
  return m ? m[1] : null;
}

let ytApiPromise = null;
function loadYouTubeApi(){
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise(resolve => {
    window.onYouTubeIframeAPIReady = resolve;
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  });
  return ytApiPromise;
}
function fmtTime(s){ s = Math.max(0, Math.floor(s)); return Math.floor(s/60) + ':' + String(s%60).padStart(2,'0'); }

document.getElementById('music-url').addEventListener('change', handleMusicUrl);
document.getElementById('music-url').addEventListener('paste', () => setTimeout(handleMusicUrl, 50));
let musicUrlDebounce = null;
document.getElementById('music-url').addEventListener('input', () => {
  clearTimeout(musicUrlDebounce);
  musicUrlDebounce = setTimeout(handleMusicUrl, 500);
});

function handleMusicUrl(){
  const url = document.getElementById('music-url').value.trim();
  const status = document.getElementById('music-status');
  if (!url) return;

  if (musicSource === 'youtube'){
    const id = extractYouTubeId(url);
    if (!id){ status.textContent = "hmm, that doesn't look like a YouTube link"; status.className = 'error'; return; }
    status.textContent = 'loading player…'; status.className = '';
    draft.music = { type: 'youtube', id, url, start: 0, title: '' };
    fetchYouTubeTitle(id);
    setupYouTubeScrubber(id);
  } else {
    const id = extractSpotifyId(url);
    if (!id){ status.textContent = "hmm, that doesn't look like a Spotify track link"; status.className = 'error'; return; }
    draft.music = { type: 'spotify', id, url, start: 0, title: '' };
    document.getElementById('scrub-wrap').hidden = true;
    status.textContent = "got it — Spotify's own player will show up on the letter (it only plays a short preview, and can't be looped from a set moment).";
    status.className = 'ok';
  }
}
function fetchYouTubeTitle(id){
  fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
    .then(r => r.ok ? r.json() : null)
    .then(data => { if (data && draft.music) draft.music.title = data.title; })
    .catch(() => {});
}
function setupYouTubeScrubber(id){
  loadYouTubeApi().then(() => {
    document.getElementById('scrub-wrap').hidden = false;
    document.getElementById('chosen-moment').textContent = '';
    if (ytPlayer){ ytPlayer.loadVideoById(id); return; }
    ytPlayer = new YT.Player('yt-player', {
      height: '113', width: '200', videoId: id,
      playerVars: { playsinline: 1 },
      events: {
        onReady: (e) => { ytDuration = e.target.getDuration(); document.getElementById('scrub').max = Math.floor(ytDuration); },
        onStateChange: (e) => {
          const btn = document.getElementById('btn-play-pause');
          btn.textContent = e.data === YT.PlayerState.PLAYING ? '❚❚' : '▶';
          if (e.data === YT.PlayerState.PLAYING) startScrubPoll(); else stopScrubPoll();
        }
      }
    });
  });
}
function startScrubPoll(){
  stopScrubPoll();
  scrubInterval = setInterval(() => {
    if (!ytPlayer || !ytPlayer.getCurrentTime) return;
    const t = ytPlayer.getCurrentTime();
    document.getElementById('scrub').value = t;
    document.getElementById('scrub-time').textContent = fmtTime(t);
  }, 250);
}
function stopScrubPoll(){ if (scrubInterval){ clearInterval(scrubInterval); scrubInterval = null; } }

document.getElementById('btn-play-pause').addEventListener('click', () => {
  if (!ytPlayer) return;
  if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) ytPlayer.pauseVideo(); else ytPlayer.playVideo();
});
document.getElementById('scrub').addEventListener('input', (e) => {
  if (!ytPlayer) return;
  ytPlayer.seekTo(Number(e.target.value), true);
  document.getElementById('scrub-time').textContent = fmtTime(e.target.value);
});
document.getElementById('btn-mark-start').addEventListener('click', () => {
  if (!ytPlayer || !draft.music) return;
  const t = Math.floor(ytPlayer.getCurrentTime());
  draft.music.start = t;
  document.getElementById('chosen-moment').textContent = `starts at ${fmtTime(t)}, then loops the whole song from there`;
});
document.getElementById('btn-random-start').addEventListener('click', () => {
  if (!draft.music) return;
  const max = Math.max(0, ytDuration - 20);
  const t = Math.floor(Math.random() * max);
  draft.music.start = t;
  if (ytPlayer) ytPlayer.seekTo(t, true);
  document.getElementById('chosen-moment').textContent = `a surprise moment at ${fmtTime(t)}`;
});
document.getElementById('music-next').addEventListener('click', () => {
  if (ytPlayer && ytPlayer.pauseVideo) ytPlayer.pauseVideo();
  showScreen('note');
});

// ---------------------------------------------------------------
// 6. Note + font step
// ---------------------------------------------------------------
function buildFontPicker(){
  const row = document.getElementById('font-chip-row');
  row.innerHTML = '';
  FONT_OPTIONS.forEach(f => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'font-chip' + (f.id === draft.font ? ' selected' : '');
    chip.style.fontFamily = f.family;
    chip.textContent = f.label;
    chip.addEventListener('click', () => {
      draft.font = f.id;
      document.documentElement.style.setProperty('--note-font', f.family);
      document.querySelectorAll('.font-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
    });
    row.appendChild(chip);
  });
}
document.getElementById('note-next').addEventListener('click', () => {
  draft.to = document.getElementById('note-to').value.trim() || 'you';
  draft.from = document.getElementById('note-from').value.trim() || 'me';
  draft.body = document.getElementById('note-body').value.trim();
  showScreen('photos');
});

// ---------------------------------------------------------------
// 7. Photos + stickers step
// ---------------------------------------------------------------
document.getElementById('photo-drop').addEventListener('click', () => document.getElementById('photo-input').click());
document.getElementById('photo-input').addEventListener('change', (e) => {
  Array.from(e.target.files).slice(0, 2 - draft.photos.length).forEach(compressPhoto);
  e.target.value = '';
});
function compressPhoto(file){
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 480 / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale; canvas.height = img.height * scale;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      if (draft.photos.length < 2){
        draft.photos.push(canvas.toDataURL('image/jpeg', 0.55));
        renderPhotoPreviews();
      }
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}
function renderPhotoPreviews(){
  const row = document.getElementById('photo-preview-row');
  row.innerHTML = '';
  draft.photos.forEach((src, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'photo-thumb';
    thumb.innerHTML = `<img src="${src}"><button type="button">×</button>`;
    thumb.querySelector('button').addEventListener('click', () => { draft.photos.splice(i,1); renderPhotoPreviews(); });
    row.appendChild(thumb);
  });
}

// ---- Sticker studio: tabs, custom grid, emoji grid, draw canvas, keyboard input ----
function tryAddSticker(item){
  if (draft.stickers.length >= MAX_STICKERS) return;
  draft.stickers.push(item);
  renderSelectedStickers();
}
function renderSelectedStickers(){
  const row = document.getElementById('sticker-selected-row');
  if (!row) return;
  row.innerHTML = '';
  draft.stickers.forEach((s, i) => {
    const chip = document.createElement('div');
    chip.className = 'sticker-selected-chip';
    chip.innerHTML = `${renderStickerContent(s)}<button type="button" aria-label="remove">×</button>`;
    chip.querySelector('button').addEventListener('click', () => { draft.stickers.splice(i, 1); renderSelectedStickers(); });
    row.appendChild(chip);
  });
  const countEl = document.getElementById('sticker-count');
  if (countEl) countEl.textContent = `${draft.stickers.length}/${MAX_STICKERS}`;
}
function wireStickerTabs(){
  document.querySelectorAll('.stk-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.stk-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.sticker-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('panel-' + tab.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });
  // The "from keyboard" tab only makes sense on touch devices, where the
  // OS keyboard has its own emoji/sticker key — desktop keyboards don't.
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  const kbTab = document.getElementById('stk-tab-keyboard');
  if (kbTab) kbTab.hidden = !isTouch;
}
function buildCustomStickerGrid(){
  const grid = document.getElementById('sticker-grid-custom');
  if (!grid) return;
  grid.innerHTML = '';
  CUSTOM_ORDER.forEach(id => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'sticker-chip';
    chip.innerHTML = CUSTOM_STICKERS[id];
    chip.addEventListener('click', () => tryAddSticker({ type: 'builtin', id }));
    grid.appendChild(chip);
  });
}
function buildEmojiGrid(){
  const catsWrap = document.getElementById('emoji-cats');
  const grid = document.getElementById('sticker-grid-emoji');
  if (!catsWrap || !grid) return;
  catsWrap.innerHTML = '';
  function showCat(name){
    grid.innerHTML = '';
    EMOJI_CATEGORIES[name].forEach(ch => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'sticker-chip';
      chip.textContent = ch;
      chip.addEventListener('click', () => tryAddSticker({ type: 'emoji', ch }));
      grid.appendChild(chip);
    });
  }
  EMOJI_CAT_ORDER.forEach((name, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'emoji-cat-btn' + (i === 0 ? ' active' : '');
    b.textContent = name;
    b.addEventListener('click', () => {
      document.querySelectorAll('.emoji-cat-btn').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      showCat(name);
    });
    catsWrap.appendChild(b);
  });
  showCat(EMOJI_CAT_ORDER[0]);
}
function setupDrawCanvas(){
  const canvas = document.getElementById('draw-canvas');
  if (!canvas) return;
  canvas.style.touchAction = 'none'; // let pointer events drive drawing, not page scroll
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let strokes = [];
  let currentStroke = null;
  let color = '#b5495b';

  function redraw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokes.forEach(st => {
      ctx.strokeStyle = st.color;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      st.points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      ctx.stroke();
    });
  }
  function pos(e){
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (canvas.width / r.width), y: (e.clientY - r.top) * (canvas.height / r.height) };
  }
  canvas.addEventListener('pointerdown', e => {
    drawing = true;
    canvas.setPointerCapture(e.pointerId);
    currentStroke = { color, points: [pos(e)] };
    strokes.push(currentStroke);
    e.preventDefault();
  });
  canvas.addEventListener('pointermove', e => {
    if (!drawing) return;
    currentStroke.points.push(pos(e));
    redraw();
    e.preventDefault();
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach(evt =>
    canvas.addEventListener(evt, () => { drawing = false; currentStroke = null; })
  );

  const colorsWrap = document.getElementById('draw-colors');
  if (colorsWrap){
    ['#262220', '#b5495b', '#8b6bc9', '#6f9d6a', '#c9903f', '#5f8fc9'].forEach((c, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'draw-color-dot' + (i === 0 ? ' active' : '');
      b.style.background = c;
      b.addEventListener('click', () => {
        color = c;
        document.querySelectorAll('.draw-color-dot').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
      });
      colorsWrap.appendChild(b);
    });
    // Rainbow swatch — a real <input type="color"> wrapped in a styled
    // label, so tapping it opens the device's native color picker
    // (system wheel on desktop, native picker on iOS/Android) for any hue.
    const rainbowLabel = document.createElement('label');
    rainbowLabel.className = 'draw-color-dot draw-color-rainbow';
    rainbowLabel.title = 'pick any color';
    const rainbowInput = document.createElement('input');
    rainbowInput.type = 'color';
    rainbowInput.value = '#c96b82';
    rainbowInput.addEventListener('input', () => {
      color = rainbowInput.value;
      document.querySelectorAll('.draw-color-dot').forEach(x => x.classList.remove('active'));
      rainbowLabel.classList.add('active');
    });
    rainbowLabel.appendChild(rainbowInput);
    colorsWrap.appendChild(rainbowLabel);
  }
  const undoBtn = document.getElementById('draw-undo');
  const clearBtn = document.getElementById('draw-clear');
  const addBtn = document.getElementById('draw-add');
  if (undoBtn) undoBtn.addEventListener('click', () => { strokes.pop(); redraw(); });
  if (clearBtn) clearBtn.addEventListener('click', () => { strokes = []; redraw(); });
  if (addBtn) addBtn.addEventListener('click', () => {
    if (!strokes.length) return;
    const src = canvas.toDataURL('image/png');
    tryAddSticker({ type: 'draw', src });
    strokes = [];
    redraw();
  });
}
function setupKeyboardStickerInput(){
  const input = document.getElementById('keyboard-input');
  const addBtn = document.getElementById('keyboard-add');
  if (!input || !addBtn) return;
  addBtn.addEventListener('click', () => {
    const val = input.value.trim();
    if (!val) return;
    tryAddSticker({ type: 'emoji', ch: val });
    input.value = '';
  });
}
document.getElementById('photos-next').addEventListener('click', () => {
  buildVariantSwatches();
  renderPreview();
  showScreen('preview');
});

// ---------------------------------------------------------------
// 8. Variant swatches (flower color, independent of occasion)
// ---------------------------------------------------------------
function buildVariantSwatches(){
  const row = document.getElementById('variant-swatches');
  row.innerHTML = '';
  VARIANT_ORDER.forEach(id => {
    const v = COLOR_VARIANTS[id];
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'variant-swatch' + (id === draft.colorVariant ? ' selected' : '');
    btn.style.background = v.accent;
    btn.title = v.label;
    btn.addEventListener('click', () => {
      applyVariant(id);
      document.querySelectorAll('.variant-swatch').forEach(s => s.classList.remove('selected'));
      btn.classList.add('selected');
      spawnFloaties(draft.theme);
      renderPreview();
    });
    row.appendChild(btn);
  });
}

// ---------------------------------------------------------------
// 9. Letter card rendering (shared by preview + recipient view)
// ---------------------------------------------------------------
function buildLetterCardHTML(state){
  const flower = makeFlowerImg(state.theme, 100);
  const photosHtml = (state.photos && state.photos.length)
    ? `<div class="letter-photos">${state.photos.map(p => `<img src="${p}">`).join('')}</div>` : '';
  const stickersHtml = (state.stickers && state.stickers.length)
    ? `<div class="letter-stickers">${state.stickers.map(s => `<span class="sticker-deco">${renderStickerContent(s)}</span>`).join('')}</div>` : '';

  let songRow = '';
  if (state.music && state.music.type === 'youtube'){
    songRow = `
      <div class="song-row" id="song-row">
        <img class="song-thumb" src="https://img.youtube.com/vi/${state.music.id}/hqdefault.jpg">
        <div class="song-meta">
          <div class="title">${escapeHtml(state.music.title || 'a song for you')}</div>
          <div class="source">YouTube</div>
        </div>
        <a class="song-link" href="${state.music.url}" target="_blank" rel="noopener">open ↗</a>
      </div>`;
  } else if (state.music && state.music.type === 'spotify'){
    songRow = `
      <div class="song-row" id="song-row" style="padding:0; overflow:hidden;">
        <iframe style="border-radius:0 0 22px 22px;" src="https://open.spotify.com/embed/track/${state.music.id}?utm_source=generator&theme=0"
          width="100%" height="80" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </div>`;
  }

  return `
    <div class="letter-wrap">
      <div class="flower-slot">${flower}</div>
      <div class="letter-card"${state.music ? ' style="border-radius: var(--radius-lg) var(--radius-lg) 0 0;"' : ''}>
        ${stickersHtml}
        <div class="letter-to">Dear ${escapeHtml(state.to)},</div>
        <div class="letter-body">${escapeHtml(state.body)}</div>
        ${photosHtml}
        <div class="letter-sign"><span>Sincerely,</span><strong>${escapeHtml(state.from)}</strong></div>
      </div>
      ${state.music && state.music.type === 'youtube' ? `<div class="seam"><div class="seam-btn" id="seam-btn">♪</div></div>` : ''}
      ${songRow}
    </div>`;
}
function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function renderPreview(){
  document.body.setAttribute('data-theme', draft.theme || 'romantic');
  document.documentElement.style.setProperty('--note-font', (FONT_OPTIONS.find(f => f.id === draft.font) || FONT_OPTIONS[0]).family);
  const mount = document.getElementById('preview-mount');
  mount.innerHTML = buildLetterCardHTML(draft);
  const flowerEl = mount.querySelector('.flower-slot');
  if (flowerEl) flowerEl.classList.add('bloom');
  if (draft.music && draft.music.type === 'youtube') attachSongPlayback(mount, draft.music);
}

// ---------------------------------------------------------------
// 10. Get link — saved to Supabase, only a short id goes in the URL
// ---------------------------------------------------------------
document.getElementById('btn-get-link').addEventListener('click', async () => {
  const btn = document.getElementById('btn-get-link');
  if (!sb){
    btn.textContent = 'add Supabase keys first';
    setTimeout(() => btn.textContent = 'get link', 2600);
    return;
  }
  btn.textContent = 'saving…'; btn.disabled = true;

  const payload = {
    theme: draft.theme || 'romantic', colorVariant: draft.colorVariant,
    music: draft.music, to: draft.to, from: draft.from, body: draft.body,
    font: draft.font, photos: draft.photos, stickers: draft.stickers
  };

  const { data, error } = await sb.from('letters').insert([{ data: payload }]).select();
  btn.disabled = false;

  if (error || !data || !data[0]){
    console.error(error);
    btn.textContent = 'save failed — try again';
    setTimeout(() => btn.textContent = 'get link', 2600);
    return;
  }

  const url = `${location.origin}${location.pathname}?id=${data[0].id}`;
  const done = (ok) => { btn.textContent = ok ? 'copied ✓' : 'copy failed — long-press to select'; setTimeout(() => btn.textContent = 'get link', 2200); };
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(() => done(true)).catch(() => done(false));
  } else {
    window.prompt('Copy your letter link:', url);
    done(true);
  }
});

// ---------------------------------------------------------------
// 11. Recipient view
// ---------------------------------------------------------------
async function loadLetterById(id){
  if (!sb){
    document.getElementById('app').hidden = false;
    return;
  }
  const { data, error } = await sb.from('letters').select('data').eq('id', id).single();
  if (error || !data){
    document.getElementById('view-mount').innerHTML = `<p style="color:var(--ink-soft)">This letter couldn't be found — the link may be old or mistyped.</p>`;
    document.getElementById('app').hidden = true;
    document.getElementById('view').hidden = false;
    return;
  }
  renderRecipientView(data.data);
}

function renderRecipientView(state){
  document.getElementById('app').hidden = true;
  document.getElementById('view').hidden = false;
  document.body.setAttribute('data-theme', state.theme || 'romantic');
  applyVariant(state.colorVariant || 'blush');
  document.documentElement.style.setProperty('--note-font', (FONT_OPTIONS.find(f => f.id === state.font) || FONT_OPTIONS[0]).family);
  spawnFloaties(state.theme || 'romantic');

  const mount = document.getElementById('view-mount');
  mount.innerHTML = buildLetterCardHTML(state);
  const flowerWrap = mount.querySelector('.flower-slot');
  if (flowerWrap) flowerWrap.classList.add('bloom');

  if (state.music && state.music.type === 'youtube') attachSongPlayback(mount, state.music);
}

// Shared by both the preview screen and the recipient view: tries to
// autoplay with sound immediately; if the browser blocks that, falls back
// to muted autoplay + a one-tap "unmute" pill. Loops the full song from
// the marked start to its natural end, then repeats — until someone taps
// the ♪ icon to pause.
//
// Only one of these ever exists at a time. Re-rendering the preview card
// (e.g. clicking a flower-color swatch) calls this again with the same
// song — in that case we just rewire the toggle button to the player
// that's already happily playing, instead of spinning up a second one.
let activePlayer = null;
let activePlayerSlot = null;
let activePlayerKey = null;

// Any tap/click anywhere on the page counts as the "interaction" browsers
// require before audio can play with sound. This listens for the whole
// page's lifetime (not just a one-time window right after the player
// loads), so it doesn't matter if the visitor taps before the player is
// ready, while the "tap for sound" pill is showing, or well after —
// the very next tap always unmutes whatever is currently muted-and-playing.
document.addEventListener('pointerdown', () => {
  if (activePlayer && typeof activePlayer.isMuted === 'function' && activePlayer.isMuted()){
    try { activePlayer.unMute(); } catch(err){}
    document.querySelectorAll('.unmute-pill').forEach(p => p.remove());
  }
}, true);

function wireSeamToggle(mount, getPlayer){
  const seamBtn = mount.querySelector('#seam-btn');
  if (!seamBtn) return;
  seamBtn.addEventListener('click', () => {
    const player = getPlayer();
    if (!player) return;
    const s = player.getPlayerState();
    if (s === YT.PlayerState.PLAYING) player.pauseVideo(); else player.playVideo();
  });
}
function destroyActivePlayer(){
  if (activePlayer){ try { activePlayer.destroy(); } catch(e){} }
  if (activePlayerSlot && activePlayerSlot.parentNode) activePlayerSlot.parentNode.removeChild(activePlayerSlot);
  activePlayer = null; activePlayerSlot = null; activePlayerKey = null;
}
function attachSongPlayback(mount, music){
  const key = music.type + ':' + music.id + '@' + (music.start || 0);

  if (activePlayer && activePlayerKey === key){
    // same song already playing — just point the (freshly re-rendered)
    // toggle button at the existing player, don't touch playback
    wireSeamToggle(mount, () => activePlayer);
    return activePlayer;
  }

  destroyActivePlayer();
  activePlayerKey = key;
  wireSeamToggle(mount, () => activePlayer);

  loadYouTubeApi().then(() => {
    const slot = document.createElement('div');
    slot.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:200px;height:113px;';
    document.body.appendChild(slot);
    activePlayerSlot = slot;
    activePlayer = new YT.Player(slot, {
      videoId: music.id,
      playerVars: { start: music.start || 0, autoplay: 1, mute: 1, playsinline: 1 },
      events: {
        onReady: (e) => {
          // Start muted — this is the one autoplay path virtually every
          // browser (including mobile Safari/Chrome) allows with zero
          // interaction, so playback truly starts the instant the letter
          // opens. We immediately try an unmuted play right after; some
          // browsers (desktop Chrome with a high site-engagement score,
          // PWAs added to home screen, etc.) will actually allow it, in
          // which case the visitor never sees the "tap for sound" pill.
          e.target.mute();
          e.target.playVideo();
          try { e.target.unMute(); } catch (err) {}
          setTimeout(() => {
            const state = e.target.getPlayerState();
            if (state !== YT.PlayerState.PLAYING && state !== YT.PlayerState.BUFFERING){
              e.target.mute();
              e.target.playVideo();
            }
            if (typeof e.target.isMuted === 'function' && e.target.isMuted()){
              showUnmutePill(mount, e.target);
            }
          }, 350);
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.ENDED){ e.target.seekTo(music.start || 0, true); e.target.playVideo(); }
        }
      }
    });
  });
  return activePlayer;
}
function showUnmutePill(mount, player){
  const songRow = mount.querySelector('#song-row');
  if (!songRow || songRow.querySelector('.unmute-pill')) return;
  const pill = document.createElement('button');
  pill.type = 'button';
  pill.className = 'unmute-pill';
  pill.textContent = 'tap for sound';
  pill.addEventListener('click', () => { player.unMute(); pill.remove(); });
  songRow.appendChild(pill);
}

document.getElementById('btn-make-own').addEventListener('click', () => { window.location.href = location.origin + location.pathname; });

// ---------------------------------------------------------------
// 12. Boot
// ---------------------------------------------------------------
(function boot(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if (id){ loadLetterById(id); return; }
  buildOccasionGrid();
  buildFontPicker();
  wireStickerTabs();
  buildCustomStickerGrid();
  buildEmojiGrid();
  setupDrawCanvas();
  setupKeyboardStickerInput();
  renderSelectedStickers();
  applyVariant('blush');
  document.body.setAttribute('data-theme', 'romantic');
  document.body.style.backgroundColor = '#fff';
  spawnLandingFloaties();
})();
