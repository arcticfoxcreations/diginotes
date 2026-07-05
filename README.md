# Dear, You

A small, static site for writing a digital letter — pick an occasion, add a song, write a note, decorate it with a font/photo/sticker, and get a link to send to one person.

No backend, no database, no sign-up. The whole letter is packed into the link itself, so anything you host this on (GitHub Pages included) just works.

## How it works

1. **Pick an occasion** — Birthday, Anniversary, Friendship, or Just Because. Each has its own flower, its own drifting background motif (lanterns, falling petals, clovers, butterflies), and — on the final preview step — a few color variants to pick from (e.g. marigold / sunflower / poppy for Birthday). Tap a card to select it, then hit Next.
2. **Add a song (optional)** — paste a YouTube or Spotify link.
   - **YouTube**: you can scrub through the song and mark the exact second it should start playing for the other person (or hit "surprise me" for a random moment). It loops cleanly from there.
   - **Spotify**: Spotify only allows embedding its own preview player — there's no way to script a start time or looping without the person logging into Spotify. So Spotify tracks show up as Spotify's own compact player, which the recipient can press play on.
3. **Write the note** — a simple "Dear / note / Sincerely" card. Pick from six handwriting-style fonts (Caveat, Kalam, Shadows Into Light, Homemade Apple, Dancing Script, Patrick Hand) — the note updates live as you choose.
4. **Add a photo or a sticker (optional)** — up to 2 photos (compressed and cropped in the browser) and up to 4 stickers from a small hand-drawn set (heart, star, moon, sparkle, leaf, sun, cloud, bow, music note, feather, umbrella, camera). A live size meter shows roughly how long the final link will be, so you can back off before it gets unwieldy.
5. **Get the link** — this copies a URL like `yoursite.com/?l=xxxxxxxx` to the clipboard. That `xxxxxxxx` *is* the letter — everything above, compressed and encoded. Send that link to the person.

When they open it, they see the finished letter with the flower "blooming" in, and (for YouTube songs) a small "tap to play our song" button — browsers block videos from auto-playing with sound before someone has interacted with the page, so a single tap is unavoidable.

## Deploying to GitHub Pages

1. Create a new GitHub repo and add these four files to the root: `index.html`, `style.css`, `app.js`, `README.md`.
2. Push them to the `main` branch.
3. In the repo, go to **Settings → Pages**, set **Source** to `main` branch, `/ (root)`, and save.
4. Your site will be live at `https://your-username.github.io/your-repo-name/`.

That's it — no build step, no dependencies to install. The site does load one small external script, [LZString](https://github.com/pieroxy/lz-string) from a public CDN, used only to compress the letter before it goes in the link; if that CDN is ever unreachable the site quietly falls back to plain (longer) links instead of breaking.

## Good to know / limitations

- **Link length**: since the letter lives entirely in the URL, this is the one thing to watch. Two fixes are built in: the JSON is compressed with LZString before encoding, and photos are cropped to a small 160×160 square and compressed hard in the browser (this is the single biggest lever — a full-resolution photo alone can make a link tens of thousands of characters long, which is what broke earlier drafts of this site). The size meter on the photo and preview steps shows a live estimate so you can see it coming. As a rule of thumb: a note with no photos is a few hundred characters; one small photo adds a few thousand; two photos is the practical ceiling for reliably pasting into chat apps.
- **Spotify timing**: Spotify's embed can't be scrubbed to a specific moment or looped programmatically the way YouTube can — that's a platform limitation, not a bug.
- **Autoplay**: no site can force audio/video to play with sound before the visitor taps something — that's a browser rule, not a choice this site makes.
- **No accounts, no server**: nothing is ever stored anywhere except inside the link itself. If you lose the link, the letter is gone — there's no "my letters" list to recover it from. That's the tradeoff for zero setup and zero cost.
- **Old links**: links made before this update used a slightly different, uncompressed format. This version can still read those old links (it recognizes the difference automatically), so nobody's existing letter link breaks.
