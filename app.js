// ---------------------------------------------------------------
// 0. Configuration - ADD YOUR KEYS HERE
// ---------------------------------------------------------------
const SUPABASE_URL = 'https://myezfpifwwlzggqfsgts.supabase.co/rest/v1/';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15ZXpmcGlmd3dsemdncWZzZ3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxNjczNDcsImV4cCI6MjA5ODc0MzM0N30.G_DFS9W6GCTgbXD8eOJLuzEHKtAUP_1P-p6YDL1cgFg';
let supabase = null;

// Wrap initialization in a try/catch so the app doesn't crash if keys are missing
try {
  if (typeof window.supabase !== 'undefined' && SUPABASE_URL.includes('supabase.co')) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
} catch (e) {
  console.error("Supabase initialization failed. Check your URL and Key.", e);
}

// ---------------------------------------------------------------
// 2. Constants & Theme Definitions
// ---------------------------------------------------------------

const THEMES = {
  romantic: {
    label: 'Romantic Garden', floaty: 'petal', accent: '#9e2a2b',
    flower: { petals: 8, rings: 2, pColor: '#e6a3b0', pColor2: '#b5495b', center: '#7d2534', shape: 'round' }
  },
  cherry: {
    label: 'Cherry Blossom', floaty: 'sakura', accent: '#ff8fab',
    flower: { petals: 5, rings: 1, pColor: '#ffb7c5', pColor2: '#ffb7c5', center: '#f08080', shape: 'slim' }
  },
  butterfly: {
    label: 'Butterfly Dreams', floaty: 'butterfly', accent: '#7b2cbf',
    flower: { petals: 6, rings: 1, pColor: '#c3b8e8', pColor2: '#a190d6', center: '#e8c468', shape: 'wide' }
  },
  minimal: {
    label: 'Minimal White', floaty: 'sparkle', accent: '#4a4e69',
    flower: { petals: 10, rings: 1, pColor: '#ffffff', pColor2: '#f0f0f0', center: '#d3d3d3', shape: 'thin' }
  }
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
  sparkle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z"/></svg>',
  coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
};

// ---------------------------------------------------------------
// 3. State & Navigation
// ---------------------------------------------------------------

let draft = {
  theme: 'minimal', music: null, to: '', from: '', body: '',
  font: 'caveat', photos: [], stickers: []
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + id);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------------------------------------------------------------
// 4. UI Builders
// ---------------------------------------------------------------

function makeFlowerSVG(themeId, size) {
  const f = THEMES[themeId].flower;
  let petals = '';
  for (let i = 0; i < f.petals; i++) {
    const angle = (360 / f.petals) * i;
    petals += `<ellipse cx="50" cy="35" rx="10" ry="20" fill="${f.pColor}" transform="rotate(${angle} 50 50)" opacity="0.7"/>`;
  }
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">${petals}<circle cx="50" cy="50" r="8" fill="${f.center}"/></svg>`;
}

function buildOccasionGrid() {
  const grid = document.getElementById('occasion-grid');
  if (!grid) return;
  grid.innerHTML = '';
  Object.keys(THEMES).forEach(id => {
    const card = document.createElement('div');
    card.className = 'occasion-card';
    card.innerHTML = makeFlowerSVG(id, 60) + `<p style="margin-top:10px; font-size:0.8rem; text-transform:uppercase; letter-spacing:1px;">${THEMES[id].label}</p>`;
    card.onclick = () => {
      draft.theme = id;
      document.body.setAttribute('data-theme', id);
      spawnFloaties(id);
      if (window.innerWidth > 768) {
        showScreen('music');
      } else {
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
  if (!row) return;
  row.innerHTML = '';
  FONT_OPTIONS.forEach(f => {
    const chip = document.createElement('button');
    chip.className = 'font-chip' + (f.id === draft.font ? ' selected' : '');
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
  if (!grid) return;
  grid.innerHTML = '';
  Object.keys(STICKERS).forEach(id => {
    const chip = document.createElement('button');
    chip.className = 'sticker-chip' + (draft.stickers.includes(id) ? ' selected' : '');
    chip.innerHTML = STICKERS[id];
    chip.onclick = () => {
      if (draft.stickers.includes(id)) {
        draft.stickers = draft.stickers.filter(s => s !== id);
      } else if (draft.stickers.length < 4) {
        draft.stickers.push(id);
      }
      buildStickerGrid();
    };
    grid.appendChild(chip);
  });
}

// ---------------------------------------------------------------
// 5. Decorations (Floaties)
// ---------------------------------------------------------------

function spawnFloaties(themeId) {
  const host = document.getElementById('floaties');
  if (!host) return;
  host.innerHTML = '';
  const kind = THEMES[themeId].floaty;
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.className = 'floaty';
    el.style.left = Math.random() * 100 + 'vw';
    const dur = 10 + Math.random() * 15;
    el.style.animation = `drift-up ${dur}s linear infinite`;
    el.style.animationDelay = `-${Math.random() * dur}s`;
    el.style.color = THEMES[themeId].accent;
    el.innerHTML = getFloatyIcon(kind);
    host.appendChild(el);
  }
}

function getFloatyIcon(kind) {
  if (kind === 'petal') return '🌸';
  if (kind === 'sakura') return '🌸';
  if (kind === 'butterfly') return '🦋';
  return '✦';
}

// ---------------------------------------------------------------
// 6. Link Generation & Loading (Supabase)
// ---------------------------------------------------------------

async function generateLink() {
  const btn = document.getElementById('btn-get-link');
  if (!supabase) {
    alert("Please configure your Supabase URL and Key in app.js");
    return;
  }
  
  btn.textContent = 'Creating...';
  const { data, error } = await supabase.from('Notes').insert([{ data: draft }]).select();

  if (error) {
    alert("Error saving letter: " + error.message);
    btn.textContent = 'Get link';
  } else {
    const id = data[0].id;
    const url = `${window.location.origin}${window.location.pathname}?id=${id}`;
    navigator.clipboard.writeText(url).then(() => {
      btn.textContent = 'Copied ✓';
      setTimeout(() => btn.textContent = 'Get link', 3000);
    });
  }
}

async function loadLetter(id) {
  if (!supabase) return;
  const { data, error } = await supabase.from('Notes').select('data').eq('id', id).single();
  if (data) renderRecipientView(data.data);
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
       <div style="color:var(--accent); margin-bottom:1.5em; font-size:0.9rem;">Dear ${state.to},</div>
       <div class="letter-body">${state.body}</div>
       <div style="text-align:right; margin-top:2em;">
          <span style="display:block; font-size:0.8rem; opacity:0.7;">Sincerely,</span>
          <strong style="font-family:var(--note-font); font-size:1.6rem;">${state.from}</strong>
       </div>
    </div>
  `;
  spawnFloaties(state.theme);
}

// ---------------------------------------------------------------
// 7. Event Listeners & Boot
// ---------------------------------------------------------------

// Attach button listeners
document.getElementById('btn-start').addEventListener('click', () => showScreen('occasion'));
document.getElementById('occasion-next').onclick = () => showScreen('music');
document.getElementById('music-next').onclick = () => showScreen('note');
document.getElementById('note-next').onclick = () => {
  draft.to = document.getElementById('note-to').value;
  draft.from = document.getElementById('note-from').value;
  draft.body = document.getElementById('note-body').value;
  showScreen('photos');
};
document.getElementById('photos-next').onclick = () => {
  // Simple preview render
  const mount = document.getElementById('preview-mount');
  mount.innerHTML = `<div class="letter-card"><div class="letter-body">${draft.body}</div></div>`;
  showScreen('preview');
};
document.getElementById('btn-get-link').onclick = generateLink;
document.getElementById('btn-make-own').onclick = () => window.location.href = window.location.origin + window.location.pathname;

function boot() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id) {
    loadLetter(id);
  } else {
    buildOccasionGrid();
    buildFontPicker();
    buildStickerGrid();
    spawnFloaties('minimal');
  }
}

boot();
