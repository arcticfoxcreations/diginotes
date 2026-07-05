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
    flowerImage: 'assets/flowers/rose.png', floaty: 'petal', defaultVariant: 'blush'
  },
  blossom: {
    label: 'Cherry Blossom', flowerName: 'sakura',
    flowerImage: 'assets/flowers/blossom.png', floaty: 'petal', defaultVariant: 'blush'
  },
  dreamy: {
    label: 'Dreamy Wildflower', flowerName: 'cosmos',
    flowerImage: 'assets/flowers/cosmos.png', floaty: 'butterfly', defaultVariant: 'lavender'
  },
  minimal: {
    label: 'Minimal Bloom', flowerName: 'daisy',
    flowerImage: 'assets/flowers/daisy.png', floaty: 'clover', defaultVariant: 'sage'
  }
};
const THEME_ORDER = ['romantic', 'blossom', 'dreamy', 'minimal'];

const COLOR_VARIANTS = {
  blush:    { label: 'Blush Pink', accent: '#c96b82', soft: '#f6dde3', deep: '#7d2a3f', paper: '#fdf4f6', center: '#e8b7c4' },
  lavender: { label: 'Lavender',   accent: '#8b6bc9', soft: '#e9defb', deep: '#4a2f7d', paper: '#f9f6fd', center: '#cdb9ec' },
  sky:      { label: 'Sky Blue',   accent: '#5f8fc9', soft: '#deebf9', deep: '#2d4f7d', paper: '#f4f9fd', center: '#b7d0ea' },
  sage:     { label: 'Sage Green', accent: '#6f9d6a', soft: '#e1f0df', deep: '#2f5c2a', paper: '#f5faf4', center: '#bcdbb8' },
  gold:     { label: 'Warm Gold',  accent: '#c9903f', soft: '#f6e6c8', deep: '#7d5220', paper: '#fdf9f0', center: '#eccd93' }
};
const VARIANT_ORDER = ['blush', 'lavender', 'sky', 'sage', 'gold'];

const FONT_OPTIONS = [
  { id: 'caveat',   label: 'Handwriting',    family: "'Caveat', cursive" },
  { id: 'dancing',  label: 'Elegant Script', family: "'Dancing Script', cursive" },
  { id: 'shadows',  label: 'Casual Note',    family: "'Shadows Into Light', cursive" },
  { id: 'patrick',  label: 'Simple & Neat',  family: "'Patrick Hand', cursive" }
];

const STICKERS = {
  heart:     '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.3C.5 8.4 2.3 5 5.7 5c2 0 3.4 1.1 4.3 2.6C10.9 6.1 12.3 5 14.3 5c3.4 0 5.2 3.4 3.7 6.7C19.5 16.4 12 21 12 21z"/></svg>',
  rose:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 22v-5"/><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M12 7c1.6-3.4 5-3.4 5 0 0 2.6-2.5 5.2-5 8-2.5-2.8-5-5.4-5-8 0-3.4 3.4-3.4 5 0Z"/></svg>',
  butterfly: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 10c-2-4.5-9-3.4-9 1.8 0 3.3 4.5 5.4 9 10.2 4.5-4.8 9-6.9 9-10.2 0-5.2-7-6.3-9-1.8Z"/><path d="M12 8v13"/></svg>',
  sparkle:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z"/></svg>',
  ring:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="12" cy="15" r="6"/><path d="M9 9l3-6 3 6"/></svg>',
  moon:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>',
  coffee:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><path d="M6 1v3M10 1v3M14 1v3"/></svg>',
  book:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z"/></svg>'
};
const STICKER_ORDER = ['heart','rose','butterfly','sparkle','ring','moon','coffee','book'];

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
    case 'petal':
      return `<svg viewBox="0 0 30 40" width="22" xmlns="http://www.w3.org/2000/svg"><path d="M15 0 C28 12 28 30 15 40 C2 30 2 12 15 0 Z" fill="${color}"/></svg>`;
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
    outer.style.bottom = '-10vh';
    const duration = 16 + Math.random() * 14;
    outer.style.setProperty('--dx', (Math.random()*140-70).toFixed(0)+'px');
    outer.style.setProperty('--rot', (Math.random()*60-30).toFixed(0)+'deg');
    outer.style.animation = `drift-up ${duration}s linear -${Math.random()*duration}s infinite`;
    const inner = document.createElement('div');
    if (t.floaty === 'butterfly') inner.style.animation = `flutter ${1.2+Math.random()}s ease-in-out infinite`;
    inner.innerHTML = floatySVG(t.floaty, v.accent);
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

function buildStickerGrid(){
  const grid = document.getElementById('sticker-grid');
  grid.innerHTML = '';
  STICKER_ORDER.forEach(id => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'sticker-chip' + (draft.stickers.includes(id) ? ' selected' : '');
    chip.innerHTML = STICKERS[id];
    chip.addEventListener('click', () => {
      const idx = draft.stickers.indexOf(id);
      if (idx > -1){ draft.stickers.splice(idx,1); chip.classList.remove('selected'); }
      else if (draft.stickers.length < 4){ draft.stickers.push(id); chip.classList.add('selected'); }
    });
    grid.appendChild(chip);
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
    ? `<div class="letter-stickers">${state.stickers.map(id => `<span class="sticker-deco">${STICKERS[id] || ''}</span>`).join('')}</div>` : '';

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
      playerVars: { start: music.start || 0, autoplay: 1, playsinline: 1 },
      events: {
        onReady: (e) => {
          e.target.playVideo();
          setTimeout(() => {
            const state = e.target.getPlayerState();
            if (state !== YT.PlayerState.PLAYING && state !== YT.PlayerState.BUFFERING){
              e.target.mute();
              e.target.playVideo();
              showUnmutePill(mount, e.target);
            }
          }, 900);
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
  buildStickerGrid();
  applyVariant('blush');
  document.body.setAttribute('data-theme', 'romantic');
  spawnFloaties('romantic');
})();
