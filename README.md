# Math Tutoring Site

Personal website advertising math tutoring services. Single-page, no build step —
drop the folder on any static host or GitHub Pages and it works.

## Stack

- Vanilla HTML / CSS / JS
- Fonts: Bebas Neue · Orbitron · Share Tech Mono (Google Fonts)
- No dependencies, no framework, no bundler

## Structure

```
tutoring-site/
├── index.html
├── css/styles.css
├── js/
│   ├── nav.js
│   └── script.js
└── assets/
```

## Running locally

Open `index.html` directly in a browser, or serve with any static server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Customisation checklist

Before going live:
- Replace `[Your Name]` in `index.html` with your real name
- Update the nav monogram `[YN]`
- Update the logotype URL line with your actual site URL
- Wire the "Book a Session" button to a real booking link or `mailto:`
- Update the footer copyright year if needed

## Version

α 1.0.0 — see `CHANGELOG.md` for full history.
