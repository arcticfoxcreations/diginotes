/* ============================================================
   Dear, You — app logic
   ============================================================ */

// ---------------------------------------------------------------
// 1. Theme / flower / floaty definitions
// ---------------------------------------------------------------
const THEMES = {
  birthday: {
    label: 'Birthday', flowerName: 'marigold',
    petals: 12, rings: 2, petalColor: '#eab06a', petalColor2: '#d97a3f',
    center: '#a85321', stroke: '#a85321', petalShape: 'thin',
    floaty: 'lantern'
  },
  anniversary: {
    label: 'Anniversary', flowerName: 'rose',
    petals: 8, rings: 2, petalColor: '#e6a3b0', petalColor2: '#b5495b',
    center: '#7d2534', stroke: '#7d2534', petalShape: 'round',
    floaty: 'petal'
  },
  friendship: {
    label: 'Friendship', flowerName: 'daisy',
    petals: 10, rings: 1, petalColor: '#fffaf0', petalColor2: '#fffaf0',
    center: '#e8c468', stroke: '#6f8f4a', petalShape: 'slim',
    floaty: 'clover'
  },
  justbecause: {
    label: 'Just Because', flowerName: 'wildflower',
    petals: 6, rings: 1, petalColor: '#9aa4d9', petalColor2: '#7e8bcb',
    center: '#e8c468', stroke: '#383f74', petalShape: 'wide',
    floaty: 'butterfly'
  }
};
const THEME_ORDER = ['birthday', 'anniversary', 'friendship', 'justbecause'];

function petalDims(shape){
  switch(shape){
    case 'thin': return { rx: 4.5, ry: 21 };
    case 'round': return { rx: 10, ry: 18 };
    case 'slim': return { rx: 3.6, ry: 23 };
    case 'wide': return { rx: 13, ry: 19 };
    default: return { rx: 8, ry: 20 };
  }
}

// Builds a stylised line-art flower as an inline SVG string.
function makeFlowerSVG(themeId, size){
  const t = THEMES[themeId] || THEMES.justbecause;
  const { rx, ry } = petalDims(t.petalShape);
  size = size || 90;
  let petals = '';
  const ringDefs = t.rings === 2
    ? [ { n: t.petals, r: 0, scale: 1, color: t.petalColor, offset: 0 },
        { n: Math.max(4, Math.floor(t.petals * 0.6)), r: 0, scale: .62, color: t.petalColor2, offset: (360 / t.petals) / 2 } ]
    : [ { n: t.petals, r: 0, scale: 1, color: t.petalColor, offset: 0 } ];

  ringDefs.forEach(ring => {
    for (let i = 0; i < ring.n; i++){
      const angle = (360 / ring.n) * i + ring.offset;
      petals += `<ellipse cx="50" cy="${50 - ry * 0.42 * ring.scale}" rx="${rx * ring.scale}" ry="${ry * ring.scale}"
        fill="${ring.color}" stroke="${t.stroke}" stroke-width="0.6" stroke-opacity="0.35"
        transform="rotate(${angle} 50 50)" />`;
    }
  });

  return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <g>${petals}</g>
    <circle cx="50" cy="50" r="11" fill="${t.center}" stroke="${t.stroke}" stroke-width="0.6" stroke-opacity="0.4"/>
  </svg>`;
}

// Floating background motifs, one shape per theme, no emoji.
function floatySVG(kind, color){
  switch(kind){
    case 'lantern':
      return `<svg viewBox="0 0 40 56" width="30" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="20" cy="6" rx="4" ry="3" fill="${color}" opacity=".5"/>
        <rect x="6" y="12" width="28" height="30" rx="14" fill="${color}"/>
        <rect x="16" y="42" width="8" height="8" fill="${color}"/>
        <line x1="20" y1="0" x2="20" y2="10" stroke="${color}" stroke-width="1.5"/>
      </svg>`;
    case 'petal':
      return `<svg viewBox="0 0 30 40" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0 C28 12 28 30 15 40 C2 30 2 12 15 0 Z" fill="${color}"/>
      </svg>`;
    case 'clover':
      return `<svg viewBox="0 0 40 40" width="28" xmlns="http://www.w3.org/2000/svg">
        <g fill="${color}">
          <circle cx="14" cy="14" r="9"/><circle cx="26" cy="14" r="9"/>
          <circle cx="14" cy="26" r="9"/><circle cx="26" cy="26" r="9"/>
        </g>
        <line x1="20" y1="30" x2="20" y2="40" stroke="${color}" stroke-width="2"/>
      </svg>`;
    case 'butterfly':
      return `<svg viewBox="0 0 60 40" width="34" xmlns="http://www.w3.org/2000/svg">
        <g fill="${color}">
          <path d="M30 20 C22 -4 0 2 4 18 C6 28 20 26 30 20 Z"/>
          <path d="M30 20 C38 -4 60 2 56 18 C54 28 40 26 30 20 Z"/>
          <path d="M30 20 C24 32 8 34 8 26 C8 22 20 20 30 20 Z" opacity=".8"/>
          <path d="M30 20 C36 32 52 34 52 26 C52 22 40 20 30 20 Z" opacity=".8"/>
        </g>
        <line x1="30" y1="12" x2="30" y2="28" stroke="${color}" stroke-width="1.5"/>
      </svg>`;
    default: return '';
  }
}

function spawnFloaties(themeId){
  const t = THEMES[themeId] || THEMES.justbecause;
  const host = document.getElementById('floaties');
  host.innerHTML = '';
  const count = window.innerWidth < 640 ? 8 : 14;
  for (let i = 0; i < count; i++){
    const outer = document.createElement('div');
    outer.className = 'floaty';
    const left = Math.random() * 100;
    const duration = 16 + Math.random() * 14;
    const delay = -Math.random() * duration;
    const dx = (Math.random() * 140 - 70).toFixed(0) + 'px';
    const rot = (Math.random() * 60 - 30).toFixed(0) + 'deg';
    outer.style.left = left + 'vw';
    outer.style.bottom = '-10vh';
    outer.style.setProperty('--dx', dx);
    outer.style.setProperty('--rot', rot);
    outer.style.animation = `drift-up ${duration}s linear ${delay}s infinite`;

    const inner = document.createElement('div');
    if (t.floaty === 'butterfly'){
      inner.style.animation = `flutter ${1.2 + Math.random()}s ease-in-out infinite`;
    }
    inner.innerHTML = floatySVG(t.floaty, t.petalColor2 || t.center);
    outer.appendChild(inner);
    host.appendChild(outer);
  }
}

// ---------------------------------------------------------------
// 2. State
// ---------------------------------------------------------------
const draft = {
  theme: null,
  music: null, // { type: 'youtube'|'spotify', id, url, start, title }
  to: '', from: '', body: '',
  photos: []
};

let ytPlayer = null;
let ytDuration = 0;
let scrubInterval = null;

// ---------------------------------------------------------------
// 3. Screen navigation
// ---------------------------------------------------------------
function showScreen(id){
  document.querySelectorAll('#app .screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.querySelectorAll('[data-nav]').forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.getAttribute('data-nav')));
});
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
    card.dataset.theme = id;
    card.innerHTML = makeFlowerSVG(id, 56) + `<p>${t.label}</p>`;
    card.addEventListener('click', () => {
      document.querySelectorAll('.occasion-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      draft.theme = id;
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

function fmtTime(s){
  s = Math.max(0, Math.floor(s));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

document.getElementById('music-url').addEventListener('change', handleMusicUrl);
document.getElementById('music-url').addEventListener('paste', () => setTimeout(handleMusicUrl, 50));

function handleMusicUrl(){
  const url = document.getElementById('music-url').value.trim();
  const status = document.getElementById('music-status');
  if (!url) return;

  if (musicSource === 'youtube'){
    const id = extractYouTubeId(url);
    if (!id){
      status.textContent = "hmm, that doesn't look like a YouTube link";
      status.className = 'error';
      return;
    }
    status.textContent = 'loading player…';
    status.className = '';
    draft.music = { type: 'youtube', id, url, start: 0, title: '' };
    fetchYouTubeTitle(id);
    setupYouTubeScrubber(id);
  } else {
    const id = extractSpotifyId(url);
    if (!id){
      status.textContent = "hmm, that doesn't look like a Spotify track link";
      status.className = 'error';
      return;
    }
    draft.music = { type: 'spotify', id, url, start: 0, title: '' };
    document.getElementById('scrub-wrap').hidden = true;
    status.textContent = "got it — Spotify's own player will show up on the letter (it can only play a short preview, and can't be scrubbed to a set moment).";
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
        onReady: (e) => {
          ytDuration = e.target.getDuration();
          document.getElementById('scrub').max = Math.floor(ytDuration);
        },
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
  const state = ytPlayer.getPlayerState();
  if (state === YT.PlayerState.PLAYING) ytPlayer.pauseVideo(); else ytPlayer.playVideo();
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
  document.getElementById('chosen-moment').textContent = `starts at ${fmtTime(t)} — nice choice`;
});
document.getElementById('btn-random-start').addEventListener('click', () => {
  if (!draft.music) return;
  const max = Math.max(0, ytDuration - 30);
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
// 6. Note step
// ---------------------------------------------------------------
document.getElementById('note-next').addEventListener('click', () => {
  draft.to = document.getElementById('note-to').value.trim() || 'you';
  draft.from = document.getElementById('note-from').value.trim() || 'me';
  draft.body = document.getElementById('note-body').value.trim();
  showScreen('photos');
});

// ---------------------------------------------------------------
// 7. Photos step
// ---------------------------------------------------------------
document.getElementById('photo-drop').addEventListener('click', () => document.getElementById('photo-input').click());
document.getElementById('photo-input').addEventListener('change', (e) => {
  const files = Array.from(e.target.files).slice(0, 2 - draft.photos.length);
  files.forEach(compressPhoto);
  e.target.value = '';
});

function compressPhoto(file){
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const maxW = 480;
      const scale = Math.min(1, maxW / img.width);
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.55);
      if (draft.photos.length < 2){
        draft.photos.push(dataUrl);
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
    thumb.querySelector('button').addEventListener('click', () => {
      draft.photos.splice(i, 1);
      renderPhotoPreviews();
    });
    row.appendChild(thumb);
  });
}

document.getElementById('photos-next').addEventListener('click', () => {
  renderPreview();
  showScreen('preview');
});

// ---------------------------------------------------------------
// 8. Letter card rendering (shared by preview + recipient view)
// ---------------------------------------------------------------
function buildLetterCardHTML(state){
  const flower = makeFlowerSVG(state.theme, 100);
  const photosHtml = (state.photos && state.photos.length)
    ? `<div class="letter-photos">${state.photos.map(p => `<img src="${p}">`).join('')}</div>` : '';

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
        <div class="letter-to">Dear ${escapeHtml(state.to)},</div>
        <div class="letter-body">${escapeHtml(state.body)}</div>
        ${photosHtml}
        <div class="letter-sign"><span>Sincerely,</span><strong>${escapeHtml(state.from)}</strong></div>
      </div>
      ${state.music && state.music.type === 'youtube' ? `<div class="seam"><div class="seam-btn" id="seam-btn">♪</div></div>` : ''}
      ${songRow}
    </div>`;
}
function escapeHtml(s){
  return (s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderPreview(){
  document.body.setAttribute('data-theme', draft.theme || 'justbecause');
  const mount = document.getElementById('preview-mount');
  mount.innerHTML = buildLetterCardHTML(draft);
  const flowerEl = mount.querySelector('.flower-slot svg');
  if (flowerEl) flowerEl.parentElement.classList.add('bloom');

  const seamBtn = mount.querySelector('#seam-btn');
  if (seamBtn && draft.music && draft.music.type === 'youtube'){
    seamBtn.addEventListener('click', () => togglePreviewYouTube());
  }
}

let previewYtPlayer = null;
let previewLoopInterval = null;
function togglePreviewYouTube(){
  loadYouTubeApi().then(() => {
    if (previewYtPlayer){
      const s = previewYtPlayer.getPlayerState();
      if (s === YT.PlayerState.PLAYING) previewYtPlayer.pauseVideo();
      else previewYtPlayer.playVideo();
      return;
    }
    const slot = document.createElement('div');
    slot.id = 'preview-yt-slot';
    slot.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:200px;height:113px;';
    document.body.appendChild(slot);
    previewYtPlayer = new YT.Player(slot, {
      videoId: draft.music.id,
      playerVars: { start: draft.music.start || 0, autoplay: 1, playsinline: 1 },
      events: {
        onReady: (e) => {
          e.target.playVideo();
          startLoopWatch(e.target, draft.music.start || 0);
        }
      }
    });
  });
}
function startLoopWatch(player, start, loopLen){
  loopLen = loopLen || 25;
  clearInterval(previewLoopInterval);
  previewLoopInterval = setInterval(() => {
    if (!player.getCurrentTime) return;
    if (player.getCurrentTime() >= start + loopLen) player.seekTo(start, true);
  }, 500);
}

// ---------------------------------------------------------------
// 9. Get link (encode state → URL, copy to clipboard)
// ---------------------------------------------------------------
function toBase64Url(obj){
  const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function fromBase64Url(str){
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return JSON.parse(decodeURIComponent(escape(atob(str))));
}

document.getElementById('btn-get-link').addEventListener('click', () => {
  const payload = {
    theme: draft.theme || 'justbecause',
    music: draft.music,
    to: draft.to, from: draft.from, body: draft.body,
    photos: draft.photos
  };
  const encoded = toBase64Url(payload);
  const url = `${location.origin}${location.pathname}?l=${encoded}`;
  const btn = document.getElementById('btn-get-link');
  const done = (ok) => { btn.textContent = ok ? 'copied ✓' : 'copy failed — long-press to select'; setTimeout(() => btn.textContent = 'get link', 2200); };
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(url).then(() => done(true)).catch(() => done(false));
  } else {
    window.prompt('Copy your letter link:', url);
    done(true);
  }
});

// ---------------------------------------------------------------
// 10. Recipient view
// ---------------------------------------------------------------
function renderRecipientView(state){
  document.getElementById('app').hidden = true;
  document.getElementById('view').hidden = false;
  document.body.setAttribute('data-theme', state.theme || 'justbecause');
  spawnFloaties(state.theme || 'justbecause');

  const mount = document.getElementById('view-mount');
  mount.innerHTML = buildLetterCardHTML(state);
  const flowerWrap = mount.querySelector('.flower-slot');
  if (flowerWrap) flowerWrap.classList.add('bloom');

  if (state.music && state.music.type === 'youtube'){
    setupRecipientYouTube(state.music, mount);
  }
  // Spotify: the embedded widget handles its own play button — nothing else to wire up.
}

function setupRecipientYouTube(music, mount){
  const gate = document.createElement('button');
  gate.textContent = '♪ tap to play our song';
  gate.className = 'btn btn-accent';
  gate.style.cssText = 'display:block;margin:14px auto 0;';
  mount.appendChild(gate);

  let started = false;
  gate.addEventListener('click', () => {
    if (started){
      // toggle mute as a simple pause/resume
      if (recipientYtPlayer){
        const s = recipientYtPlayer.getPlayerState();
        if (s === YT.PlayerState.PLAYING){ recipientYtPlayer.pauseVideo(); gate.textContent = '♪ tap to play our song'; }
        else { recipientYtPlayer.playVideo(); gate.textContent = '❚❚ pause our song'; }
      }
      return;
    }
    started = true;
    gate.textContent = 'loading…';
    loadYouTubeApi().then(() => {
      const slot = document.createElement('div');
      slot.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:200px;height:113px;';
      document.body.appendChild(slot);
      recipientYtPlayer = new YT.Player(slot, {
        videoId: music.id,
        playerVars: { start: music.start || 0, autoplay: 1, playsinline: 1 },
        events: {
          onReady: (e) => {
            e.target.playVideo();
            gate.textContent = '❚❚ pause our song';
            startLoopWatch(e.target, music.start || 0);
          }
        }
      });
    });
  });
}
let recipientYtPlayer = null;

document.getElementById('btn-make-own').addEventListener('click', () => {
  window.location.href = location.origin + location.pathname;
});

// ---------------------------------------------------------------
// 11. Boot
// ---------------------------------------------------------------
(function boot(){
  const params = new URLSearchParams(location.search);
  const encoded = params.get('l');
  if (encoded){
    try {
      const state = fromBase64Url(encoded);
      renderRecipientView(state);
      return;
    } catch (e){
      console.warn('Could not read this letter link.', e);
    }
  }
  buildOccasionGrid();
  document.body.setAttribute('data-theme', 'justbecause');
  spawnFloaties('justbecause');
})();
