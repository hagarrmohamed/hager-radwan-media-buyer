# Hager Radwan — Performance Media Buyer

A single-page portfolio in plain HTML, CSS and JavaScript. It has no framework, no build step and no backend, so GitHub Pages serves it as-is.

Live: https://hagarrmohamed.github.io/hager-radwan-media-buyer/

```
hager-radwan-media-buyer/
├── index.html      all content (skills, case studies, contact)
├── style.css       design system: color, type and glass tokens at the top
├── script.js       scroll reveals, active nav link, 50→15 product grid, screenshot viewer
├── .nojekyll       tells GitHub Pages to serve the files as-is
└── assets/
    ├── favicon.svg
    └── img/        ads report screenshots (ad names already hidden)
```

## Design system

- **Concept:** "Sorted by results". The site reads like an editorial ads report: hairline table rules, mono column labels, and a ROAS column sorted ↓.
- **Colors:** the brand palette `#567CFF`, `#8EA8FF`, `#7AF8FF`, `#D875FF`, `#8D4BE0` plus deep ink `#17123B`. Neon cyan is used only for highlights and on the dark contact section.
- **Type:** Bricolage Grotesque (display), Instrument Serif (editorial accents), Instrument Sans (body), JetBrains Mono (labels and data).
- **Glass:** three strengths, `.glass--strong`, `.glass` and `.glass--soft`. Browsers without `backdrop-filter` get a solid fallback, and the effect is removed when the system asks for reduced transparency.

## Editing

- **Text and case studies:** edit `index.html`. Each case study is an `<article class="case">`, with the screenshot first and the text below it.
- **Contact details:** search `index.html` for `mailto:`, `tel:` and `wa.me`.
- **New screenshots:** before you add one, cover the ad names and creative thumbnails with a solid box (blur is not enough). Save it to `assets/img/`, then set its `width` and `height` in the `<img>` tag.
- After changing the CSS or JS, bump the `?v=` number on the two links in `index.html` so browsers load the new files.

## Preview locally

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Publish

The `main` branch is published by GitHub Pages (Settings → Pages → Deploy from a branch → `main` / root). To update the site:

```
git add -A
git commit -m "Describe the change"
git push
```

The live site updates 1–2 minutes after the push.
