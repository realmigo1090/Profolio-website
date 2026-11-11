# Nash Browin — Portfolio

Plain HTML / CSS / JS. No build step: open it with any static server or drop it on Vercel, Netlify or GitHub Pages.

```
index.html        page layout + all the text
css/style.css     styles (colors and fonts at the top in :root)
js/content.js     the Works projects (videos, titles, credits)
js/main.js        hover-play, smooth scroll, carousel, lightbox
videos/           put your own video files here
```

## Run it locally

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

## Swapping in your own work

**Projects (Works carousel):** edit `js/content.js`. Each project has:

- `preview`: a short muted clip that plays on hover, e.g. `"videos/basement-tapes-preview.mp4"` (720p, 5–15 s, a few MB)
- `full`: what opens on click. Either an mp4 or a Vimeo / YouTube link (`"https://vimeo.com/123456789"`)
- `title`, `client`, `category`, `year`, `description`, the client `quote`, a `stat` and the `credits` list

Add or remove entries and the carousel, counter and nav "Works (06)" update automatically.

**Hero reel, services clips, contact video:** these are files in `videos/` (`hero-reel.mp4`, `service-*.mp4`, `contact-bg.mp4`, `avatar-*.mp4`). Swap a file or point `index.html` at a new one.

**Text:** the headline, about paragraph, services, testimonials and contact email are all plain text in `index.html`.

**Colors:** change `--purple`, `--lime` and `--lavender` at the top of `css/style.css`.

## Video tips

- Export hover previews without audio, H.264 mp4, ~720p, under ~5 MB each so they start instantly.
- Keep the hero reel short (10–20 s) and loopable; it autoplays muted.
- On phones there's no hover, so preview clips play automatically when they scroll into view.

GitHub Pages limits files to 100 MB each and the whole site to 1 GB, so keep full videos at 1080p around 4-5 Mbps.
