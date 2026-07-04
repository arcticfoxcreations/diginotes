// ---------------------------------------------------------------
// 0. Configuration - ADD YOUR KEYS HERE
// ---------------------------------------------------------------
const SUPABASE_URL = 'https://myezfpifwwlzggqfsgts.supabase.co/rest/v1/';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15ZXpmcGlmd3dsemdncWZzZ3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxNjczNDcsImV4cCI6MjA5ODc0MzM0N30.G_DFS9W6GCTgbXD8eOJLuzEHKtAUP_1P-p6YDL1cgFg';
// We name this 'supabaseClient' to avoid the "already declared" error
let supabaseClient = null;

// ---------------------------------------------------------------
// 2. Constants & Themes (Requested Improvements)
// ---------------------------------------------------------------
const THEMES = {
  romantic: { label: 'Romantic Garden', floaty: 'petal', accent: '#9e2a2b', bg: '#fff9f9' },
  cherry: { label: 'Cherry Blossom', floaty: 'sakura', accent: '#ff8fab', bg: '#fffafa' },
  butterfly: { label: 'Butterfly Dreams', floaty: 'butterfly', accent: '#7b2cbf', bg: '#f8f7ff' },
  minimal: { label: 'Minimal White', floaty: 'sparkle', accent: '#4a4e69', bg: '#ffffff' }
};

const FONT_OPTIONS = [
  { id: 'caveat',  label: 'Handwriting', family: "'Caveat', cursive" },
  { id: 'garamond', label: 'Classic Serif', family: "'EB Garamond', serif" },
  { id: 'playfair', label: 'Elegant Script', family: "'Playfair Display', serif" },
  { id: 'patrick', label: 'Modern Minimal', family: "'Patrick Hand', cursive" }
];

const STICKERS = {
  rose: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 22v-4M12 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M12 8c2-4 6-4 6 0 0 3-3 6-6 10-3-4-6-7-6-10 0-4 4-4 6 0Z"/></svg>',
  butterfly: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 10c-2-4-8-3-8 2 0 3 4 5 8 10 4-5 8-7 8-10 0-5-6-6-8-2Z"/></svg>',
  ribbon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 12L4 6v12l8-6z"/><path d="M12 12l8-6v12l-8-6z"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/></svg>'
};

let draft = { theme: 'minimal', to: '', from: '', body: '', font: 'caveat', stickers: [] };

// ---------------------------------------------------------------
// 3. App Initialization
// ---------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Safe Supabase check
  try {
    if (typeof window.supabase !== 'undefined' && SUPABASE_URL.includes('supabase.co')) {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
  } catch (e) { console.error("Database connection failed:", e); }

  // Initial Builds
  buildOccasionGrid();
  buildFontPicker();
  buildStickerGrid();

  // Screen Nav
  document.getElementById('btn-start').onclick = () => showScreen('occasion');
  document.getElementById('occasion-next').onclick = () => showScreen('music');
  document.getElementById('music-next').onclick = () => showScreen('note');
  document.getElementById('note-next').onclick = () => {
    draft.to = document.getElementById('note-to').value;
    draft.from = document.getElementById('note-from').value;
    draft.body = document.getElementById('note-body').value;
    showScreen('photos');
  };
  document.getElementById('photos-next').onclick = () => { renderPreview(); showScreen('preview'); };
  document.getElementById('btn-get-link').onclick = saveLetter;
  document.getElementById('btn-make-own').onclick = () => window.location.href = window.location.origin + window.location.pathname;

  // URL ID check
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id) loadLetter(id); else spawnFloaties('minimal');
});

// ---------------------------------------------------------------
// 4. core logic
// ---------------------------------------------------------------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function buildOccasionGrid() {
  const grid = document.getElementById('occasion-grid');
  Object.keys(THEMES).forEach(id => {
    const card = document.createElement('div');
    card.className = 'occasion-card';
    card.innerHTML = `<div style="font-size:1.8rem; margin-bottom:8px;">${getFloatyIcon(THEMES[id].floaty)}</div><p style="font-size:0.7rem; font-weight:700;">${THEMES[id].label}</p>`;
    card.onclick = () => {
      draft.theme = id;
      document.body.setAttribute('data-theme', id);
      spawnFloaties(id);
      if (window.innerWidth > 768) showScreen('music'); 
      else {
        document.querySelectorAll('.occasion-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        document.getElementById('occasion-next').disabled = false;
      }
    };
    grid.appendChild(card);
  });
}

function buildFontPicker() {
  const row = document.getElementById('font-chip-row');
  FONT_OPTIONS.forEach(f => {
    const chip = document.createElement('button');
    chip.className = 'font-chip';
    chip.style.fontFamily = f.family;
    chip.textContent = f.label;
    chip.onclick = () => {
      draft.font = f.id;
      document.documentElement.style.setProperty('--note-font', f.family);
      document.querySelectorAll('.font-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
    };
    row.appendChild(chip);
  });
}

function buildStickerGrid() {
  const grid = document.getElementById('sticker-grid');
  grid.innerHTML = '';
  Object.keys(STICKERS).forEach(id => {
    const chip = document.createElement('button');
    chip.className = 'sticker-chip' + (draft.stickers.includes(id) ? ' selected' : '');
    chip.innerHTML = STICKERS[id];
    chip.onclick = () => {
      if (draft.stickers.includes(id)) draft.stickers = draft.stickers.filter(s => s !== id);
      else if (draft.stickers.length < 4) draft.stickers.push(id);
      buildStickerGrid();
    };
    grid.appendChild(chip);
  });
}

async function saveLetter() {
  const btn = document.getElementById('btn-get-link');
  if (!supabaseClient) return alert("Database not ready.");
  btn.textContent = 'Generating...';
  const { data, error } = await supabaseClient.from('Notes').insert([{ data: draft }]).select();
  if (error) { alert("Error: " + error.message); btn.textContent = 'Get Link'; }
  else {
    const url = `${window.location.origin}${window.location.pathname}?id=${data[0].id}`;
    navigator.clipboard.writeText(url).then(() => {
      btn.textContent = 'Copied ✓';
      setTimeout(() => btn.textContent = 'Get Link', 3000);
    });
  }
}

async function loadLetter(id) {
  if (!supabaseClient) return;
  const { data } = await supabaseClient.from('Notes').select('data').eq('id', id).single();
  if (data) renderRecipientView(data.data);
}

function renderPreview() {
  const mount = document.getElementById('preview-mount');
  mount.innerHTML = `<div class="letter-card"><div class="letter-body">${draft.body || "Preview..."}</div></div>`;
}

function renderRecipientView(state) {
  document.getElementById('app').hidden = true;
  document.getElementById('view').hidden = false;
  document.body.setAttribute('data-theme', state.theme);
  const fontObj = FONT_OPTIONS.find(f => f.id === state.font) || FONT_OPTIONS[0];
  document.documentElement.style.setProperty('--note-font', fontObj.family);
  const mount = document.getElementById('view-mount');
  mount.innerHTML = `
    <div class="letter-card">
       <div style="color:var(--accent); margin-bottom:1.5em; font-size:0.8rem;">Dear ${state.to},</div>
       <div class="letter-body">${state.body}</div>
       <div style="text-align:right; margin-top:2em;">Sincerely, <strong>${state.from}</strong></div>
    </div>`;
  spawnFloaties(state.theme);
}

function spawnFloaties(themeId) {
  const host = document.getElementById('floaties');
  host.innerHTML = '';
  const kind = THEMES[themeId].floaty;
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.className = 'floaty';
    el.style.left = Math.random() * 100 + 'vw';
    const dur = 10 + Math.random() * 15;
    el.style.animation = `drift-up ${dur}s linear infinite`;
    el.style.animationDelay = `-${Math.random() * dur}s`;
    el.innerHTML = getFloatyIcon(kind);
    host.appendChild(el);
  }
}

function getFloatyIcon(kind) {
  const icons = { petal: '🌸', sakura: '🌸', butterfly: '🦋', sparkle: '✦' };
  return icons[kind] || '✦';
}
