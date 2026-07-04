# Dear, You

A small, static site for writing a digital letter — pick an occasion, add a song, write a note, attach a photo or two — and get a link to send to one person.

No backend, no database, no sign-up. The whole letter is packed into the link itself, so anything you host this on (GitHub Pages included) just works.

## How it works

1. **Pick an occasion** — Birthday, Anniversary, Friendship, or Just Because. Each has its own flower and its own drifting background motif (lanterns, petals, clovers, butterflies).
2. **Add a song (optional)** — paste a YouTube or Spotify link.
   - **YouTube**: you can scrub through the song and mark the exact second it should start playing for the other person (or hit "surprise me" for a random moment). It loops cleanly from there.
   - **Spotify**: Spotify only allows embedding its own preview player — there's no way to script a start time or looping without the person logging into Spotify. So Spotify tracks show up as Spotify's own compact player, which the recipient can press play on.
3. **Write the note** — a simple "Dear / note / Sincerely" card, set in a handwriting-style font.
4. **Add up to 2 photos (optional)** — they're compressed in the browser before being added, to keep the link a reasonable length.
5. **Get the link** — this copies a URL like `yoursite.com/?l=xxxxxxxx` to the clipboard. That `xxxxxxxx` *is* the letter — everything above, encoded. Send that link to the person.

When they open it, they see the finished letter with the flower "blooming" in, and (for YouTube songs) a small "tap to play our song" button — browsers block videos from auto-playing with sound before someone has interacted with the page, so a single tap is unavoidable.

## Deploying to GitHub Pages

1. Create a new GitHub repo and add these three files to the root: `index.html`, `style.css`, `app.js`.
2. Push them to the `main` branch.
3. In the repo, go to **Settings → Pages**, set **Source** to `main` branch, `/ (root)`, and save.
4. Your site will be live at `https://your-username.github.io/your-repo-name/`.

That's it — no build step, no dependencies to install.

## Good to know / limitations

- **Link length**: since the letter lives entirely in the URL, adding photos makes the link noticeably longer. It'll still work everywhere that matters (iMessage, WhatsApp, Instagram DMs, email), but keep it to a photo or two, not a full album.
- **Spotify timing**: as above — Spotify's embed can't be scrubbed to a specific moment or looped programmatically the way YouTube can. This is a platform limitation, not a bug.
- **Autoplay**: no site can force audio/video to play with sound before the visitor taps something — that's a browser rule, not a choice this site makes.
- **No accounts, no server**: nothing is ever stored anywhere except inside the link itself. If you lose the link, the letter is gone — there's no "my letters" list to recover it from. That's the tradeoff for zero setup and zero cost.
