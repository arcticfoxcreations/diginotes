// ---------------------------------------------------------------
// 0. Configuration - ADD YOUR KEYS HERE
// ---------------------------------------------------------------
const SUPABASE_URL = 'https://myezfpifwwlzggqfsgts.supabase.co/rest/v1/';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15ZXpmcGlmd3dsemdncWZzZ3RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxNjczNDcsImV4cCI6MjA5ODc0MzM0N30.G_DFS9W6GCTgbXD8eOJLuzEHKtAUP_1P-p6YDL1cgFg';
let supabase = null;

// ---------------------------------------------------------------
// 2. Navigation Logic (Moved to top to ensure buttons work!)
// ---------------------------------------------------------------
function showScreen(id) {
  console.log("Navigating to:", id);
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));
  
  const target = document.getElementById('screen-' + id);
  if (target) {
    target.classList.add('active');
  } else {
    console.error("Screen not found: screen-" + id);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------------------------------------------------------------
// 3. Theme & Feature Definitions
// ---------------------------------------------------------------
const THEMES = {
  romantic: { label: 'Romantic Garden', floaty: 'petal', accent: '#9e2a2b' },
  cherry: { label: 'Cherry Blossom', floaty: 'sakura', accent: '#ff8fab' },
  butterfly: { label: 'Butterfly Dreams', floaty: 'butterfly', accent: '#7b2cbf' },
  minimal: { label: 'Minimal White', floaty: 'sparkle', accent: '#4a4e69' }
};

const FONT_OPTIONS = [
  { id: 'caveat',  label: 'Handwriting', family: "'Caveat', cursive" },
  { id: 'garamond', label: 'Classic Serif', family: "'EB Garamond', serif" },
  { id: 'playfair', label: 'Elegant Script', family: "'Playfair Display', serif" },
  { id: 'patrick', label: 'Modern Minimal', family: "'Patrick Hand', cursive" }
];

let draft = {
  theme: 'minimal', to: '', from: '', body: '',
  font: 'caveat', stickers: []
};

// ---------------------------------------------------------------
// 4. Initialize Everything
// ---------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  console.log("Dear, You — App Initialized");

  // A. Initialize Supabase safely
  try {
    if (typeof window.supabase !== 'undefined' && SUPABASE_URL.includes('supabase.co')) {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      console.log("Supabase connected.");
    } else {
      console.warn("Supabase not configured. Links will not work, but UI will.");
    }
  } catch (e) {
    console.error("Supabase Init Error:", e);
  }

  // B. Attach Basic Navigation Listeners
  const startBtn = document.getElementById('btn-start');
  if (startBtn) {
    startBtn.addEventListener('click', () => showScreen('occasion'));
  }

  document.getElementById('occasion-next').onclick = () => showScreen('music');
  document.getElementById('music-next').onclick = () => showScreen('note');
  
  document.getElementById('note-next').onclick = () => {
    draft.to = document.getElementById('note-to').value;
    draft.from = document.getElementById('note-from').value;
    draft.body = document.getElementById('note-body').value;
    showScreen('photos');
  };

  document.getElementById('photos-next').onclick = () => {
    renderPreview();
    showScreen('preview');
  };

  // C. Build Grids
  buildOccasionGrid();
  buildFontPicker();
  
  // D. Check if we are opening a letter
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id) {
    loadLetterFromDatabase(id);
  } else {
    spawnFloaties('minimal');
  }
});

// ---------------------------------------------------------------
// 5. Database Logic
// ---------------------------------------------------------------
async function loadLetterFromDatabase(id) {
  if (!supabase) return;
  console.log("Loading letter ID:", id);
  const { data, error } = await supabase.from('Notes').select('data').eq('id', id).single();
  if (data) {
    renderRecipientView(data.data);
  } else {
    console.error("Letter not found", error);
  }
}

async function saveLetterToDatabase() {
  const btn = document.getElementById('btn-get-link');
  if (!supabase) {
    alert("Database not connected. Check your keys in app.js");
    return;
  }

  btn.textContent = 'Generating...';
  const { data, error } = await supabase.from('Notes').insert([{ data: draft }]).select();

  if (error) {
    alert("Save failed: " + error.message);
    btn.textContent = 'Get Link';
  } else {
    const newId = data[0].id;
    const url = `${window.location.origin}${window.location.pathname}?id=${newId}`;
    navigator.clipboard.writeText(url).then(() => {
      btn.textContent = 'Copied ✓';
      setTimeout(() => btn.textContent = 'Get Link', 3000);
    });
  }
}

document.getElementById('btn-get-link').onclick = saveLetterToDatabase;
document.getElementById('btn-make-own').onclick = () => window.location.href = window.location.origin + window.location.pathname;

// ---------------------------------------------------------------
// 6. Helpers
// ---------------------------------------------------------------
function buildOccasionGrid() {
  const grid = document.getElementById('occasion-grid');
  if (!grid) return;
  Object.keys(THEMES).forEach(id => {
    const card = document.createElement('div');
    card.className = 'occasion-card';
    card.innerHTML = `<div style="font-size:2rem; margin-bottom:10px;">${getFloatyIcon(THEMES[id].floaty)}</div><p>${THEMES[id].label}</p>`;
    card.onclick = () => {
      draft.theme = id;
      document.body.setAttribute('data-theme', id);
      spawnFloaties(id);
      document.querySelectorAll('.occasion-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      document.getElementById('occasion-next').disabled = false;
    };
    grid.appendChild(card);
  });
}

function buildFontPicker() {
  const row = document.getElementById('font-chip-row');
  if (!row) return;
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

function renderPreview() {
  const mount = document.getElementById('preview-mount');
  mount.innerHTML = `
    <div class="letter-card">
      <div class="letter-body" style="font-family:var(--note-font)">${draft.body || "Your message will appear here..."}</div>
    </div>`;
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
       <div style="color:var(--accent); margin-bottom:1.5em;">Dear ${state.to},</div>
       <div class="letter-body">${state.body}</div>
       <div style="text-align:right; margin-top:2em;">Sincerely, <strong>${state.from}</strong></div>
    </div>`;
  spawnFloaties(state.theme);
}

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
