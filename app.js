const SUPABASE_URL = 'https://myezfpifwwlzggqfsgts.supabase.co/rest/v1/';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15ZXpmcGlmd3dsemdncWZzZ3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxNjczNDcsImV4cCI6MjA5ODc0MzM0N30.G_DFS9W6GCTgbXD8eOJLuzEHKtAUP_1P-p6YDL1cgFg';
const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// ---------------------------------------------------------------
// 1. Updated Themes
// ---------------------------------------------------------------
const THEMES = {
  romantic: {
    label: 'Romantic Garden', flowerName: 'rose',
    petals: 8, rings: 2, petalColor: '#e6a3b0', petalColor2: '#b5495b',
    center: '#7d2534', stroke: '#7d2534', petalShape: 'round',
    floaty: 'petal'
  },
  cherry: {
    label: 'Cherry Blossom', flowerName: 'sakura',
    petals: 5, rings: 1, petalColor: '#ffb7c5', petalColor2: '#ffb7c5',
    center: '#f08080', stroke: '#ff8fab', petalShape: 'slim',
    floaty: 'sakura'
  },
  butterfly: {
    label: 'Butterfly Dreams', flowerName: 'wildflower',
    petals: 6, rings: 1, petalColor: '#c3b8e8', petalColor2: '#a190d6',
    center: '#e8c468', stroke: '#5f4a8a', petalShape: 'wide',
    floaty: 'butterfly'
  },
  minimal: {
    label: 'Minimal White', flowerName: 'lily',
    petals: 10, rings: 1, petalColor: '#ffffff', petalColor2: '#f0f0f0',
    center: '#d3d3d3', stroke: '#4a4e69', petalShape: 'thin',
    floaty: 'sparkle'
  }
};
const THEME_ORDER = ['romantic', 'cherry', 'butterfly', 'minimal'];

// ---------------------------------------------------------------
// 2. Curated Fonts & Stickers
// ---------------------------------------------------------------
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
// 3. App State & Logic
// ---------------------------------------------------------------
const draft = {
  theme: null, variant: 0, music: null,
  to: '', from: '', body: '',
  font: 'caveat', photos: [], stickers: []
};

// --- Navigation ---
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + id);
  if(target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-nav]').forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.getAttribute('data-nav')));
});

document.getElementById('btn-start').addEventListener('click', () => showScreen('occasion'));

// --- Step 1: Occasion ---
function buildOccasionGrid(){
  const grid = document.getElementById('occasion-grid');
  grid.innerHTML = '';
  THEME_ORDER.forEach(id => {
    const card = document.createElement('div');
    card.className = 'occasion-card';
    card.innerHTML = makeFlowerSVG(id, 56) + `<p style="font-size:0.7rem; margin-top:8px;">${THEMES[id].label}</p>`;
    card.onclick = () => {
      draft.theme = id;
      document.body.setAttribute('data-theme', id);
      spawnFloaties(id);
      
      // Auto-next logic
      const isMobile = window.innerWidth <= 768;
      if (!isMobile) {
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
document.getElementById('occasion-next').onclick = () => showScreen('music');

// --- Step 2: Music (Preserved YouTube/Spotify logic) ---
// (Note: Keep your existing YouTube API and extract functions from previous app.js)

// --- Step 3: Note & Fonts ---
function buildFontPicker(){
  const row = document.getElementById('font-chip-row');
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
document.getElementById('note-next').onclick = () => {
  draft.to = document.getElementById('note-to').value || 'you';
  draft.from = document.getElementById('note-from').value || 'me';
  draft.body = document.getElementById('note-body').value;
  showScreen('photos');
};

// --- Link Generation (SUPABASE) ---
async function generateShortLink() {
  const btn = document.getElementById('btn-get-link');
  btn.textContent = 'generating...';
  
  if (!supabase) {
    alert("Supabase not configured properly.");
    btn.textContent = 'get link';
    return;
  }

  const { data, error } = await supabase
    .from('Notes')
    .insert([{ data: draft }])
    .select();

  if (error) {
    console.error(error);
    btn.textContent = 'error!';
    return;
  }

  const id = data[0].id;
  const shortUrl = `${window.location.origin}${window.location.pathname}?id=${id}`;
  
  navigator.clipboard.writeText(shortUrl).then(() => {
    btn.textContent = 'copied ✓';
    setTimeout(() => btn.textContent = 'get link', 3000);
  });
}

document.getElementById('btn-get-link').onclick = generateShortLink;

// --- Load from Supabase ---
async function loadLetter(id) {
  const { data, error } = await supabase
    .from('Notes')
    .select('data')
    .eq('id', id)
    .single();

  if (error || !data) {
    alert("Letter not found.");
    return;
  }
  
  renderRecipientView(data.data);
}

// ---------------------------------------------------------------
// 4. Helper Functions (Flowers, Floaties, etc.)
// ---------------------------------------------------------------
function makeFlowerSVG(themeId, size, variantIdx = 0) {
  const t = THEMES[themeId];
  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}"><circle cx="50" cy="50" r="15" fill="${t.petalColor}" opacity="0.8" /><circle cx="50" cy="50" r="5" fill="${t.center}" /></svg>`;
}

function spawnFloaties(themeId) {
  const host = document.getElementById('floaties');
  host.innerHTML = '';
  const kind = THEMES[themeId].floaty;
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.className = 'floaty';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animation = `drift-up ${15 + Math.random() * 10}s linear infinite`;
    el.style.animationDelay = `-${Math.random() * 15}s`;
    el.innerHTML = `<div style="color: ${THEMES[themeId].accent}; opacity: 0.3;">${getFloatySVG(kind)}</div>`;
    host.appendChild(el);
  }
}

function getFloatySVG(kind) {
  if (kind === 'petal') return '<svg width="20" height="20"><path d="M10 0 Q15 10 10 20 Q5 10 10 0" fill="currentColor"/></svg>';
  if (kind === 'sakura') return '<svg width="15" height="15"><circle r="7" cx="7" cy="7" fill="currentColor"/></svg>';
  return '✦';
}

// ---------------------------------------------------------------
// 5. Boot
// ---------------------------------------------------------------
function boot() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  
  if (id) {
    loadLetter(id);
  } else {
    buildOccasionGrid();
    buildFontPicker();
    // buildStickerGrid(); // Implement similar to previous
    spawnFloaties('minimal');
  }
}

function renderRecipientView(state) {
  document.getElementById('app').hidden = true;
  document.getElementById('view').hidden = false;
  document.body.setAttribute('data-theme', state.theme);
  document.documentElement.style.setProperty('--note-font', FONT_OPTIONS.find(f=>f.id===state.font).family);
  
  const mount = document.getElementById('view-mount');
  mount.innerHTML = `
    <div class="letter-card">
      <div style="color:var(--accent); margin-bottom:10px;">Dear ${state.to},</div>
      <div class="letter-body">${state.body}</div>
      <div style="text-align:right; margin-top:20px;">Sincerely, ${state.from}</div>
    </div>
  `;
  spawnFloaties(state.theme);
}

boot();
