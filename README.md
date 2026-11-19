# Hager Radwan — Media Buyer

A single-page portfolio built with plain HTML, CSS and JavaScript. It has no framework, no build step and no backend, so it runs on GitHub Pages as-is.

```
hager-radwan-media-buyer/
├── index.html      page content and structure
├── style.css       design (colors, fonts and spacing are variables at the top)
├── script.js       menu, screenshot viewer, and the SITE settings (name and contact details)
├── .nojekyll       tells GitHub Pages to serve the files as-is
└── assets/
    ├── favicon.svg
    └── img/        Ads Manager screenshots (ad names already hidden)
```

## Updating details

**Name, email, phone, WhatsApp:** edit the `SITE` block at the top of `script.js`.
`phoneIntl` must be the country code plus the number, digits only (for example `201156685718`). It is used for both the `tel:` link and the `https://wa.me/...` link.

`index.html` has the same values written in as a fallback for search engines and for visitors with JavaScript turned off. After you change a value in `script.js`, use Find & Replace in `index.html` to update it there too.

**Text and case studies:** edit `index.html`. Each case study is an `<article class="case">` block. To add one, copy a block and change its text, its `id`, and its image.

**Colors:** change the variables at the top of `style.css`. `--blue-ink` is a slightly deeper shade of the palette blue `#567CFF`. Buttons and links use it so that white text on blue stays readable.

**New screenshots:** before you add a screenshot, cover the campaign, ad set and ad names, and the creative thumbnails, with a solid box. Blur is not enough. Save it into `assets/img/`.

## Preview locally

Open `index.html` in a browser by double-clicking it.

Or run a local server from this folder:

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Publish on GitHub Pages

1. Create a public repository on GitHub, for example `hager-radwan-media-buyer`.
2. Upload every file in this folder, including `.nojekyll` and the `assets` folder, to the root of the `main` branch.
3. In the repository, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then **main** and **/ (root)**, and click **Save**.
4. After 1–2 minutes the site is live at `https://<your-username>.github.io/hager-radwan-media-buyer/`.

To update the site, upload the changed files again. Pages redeploys automatically.
