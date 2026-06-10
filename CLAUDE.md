# CLAUDE.md — Math Tutoring Site
> Read this at the start of every session. It is the authoritative reference for
> architecture, design rules, and planned work. The TO-DO section at the bottom
> tracks all outstanding tasks — mark items complete there after finishing them.
> When in doubt, follow what is written here rather than inferring from the code.

---

## What this project is

**Math Tutoring Site** is a single-page personal website advertising math tutoring
services, built in vanilla HTML/CSS/JS and served as a static site (no build step).

It is a portfolio-quality project. Code quality, comments, and consistency matter as
much as functionality. Never sacrifice clarity for cleverness.

---

## File structure

```
tutoring-site/
├── index.html         Markup only — layout, content, no inline logic.
├── assets/            Static assets: images, fonts, icons (none yet).
├── css/
│   └── styles.css     All styles — design tokens, layout, components, animations.
└── js/
    ├── nav.js         Sticky nav, mobile burger toggle, active-link tracking.
    └── script.js      Orchestration — AppState, canvas rain, carousel, scroll-reveal, cmd-line.
```

---

## Design system

### Colour tokens — `css/styles.css :root`

Never hardcode colour values in HTML or JS — always use CSS custom properties.
New colours must be added to `:root` before use anywhere else.

| Token              | Value         | Purpose                              |
|--------------------|---------------|--------------------------------------|
| `--bg`             | `#f2f2f0`     | Page background (near-white)         |
| `--bg-hex`         | hex SVG data  | Tiling hex grid on body background   |
| `--panel`          | `#ffffff`     | HUD window fill, card fill           |
| `--panel-dark`     | `#111111`     | Nav bar, HUD bars, dark chrome       |
| `--border`         | `#c42b1e`     | All red structural borders           |
| `--border-muted`   | `rgba(196,43,30,0.25)` | Subtle separators             |
| `--accent`         | `#c42b1e`     | Primary CTA, focus states, badges    |
| `--accent-dark`    | `#9e1e14`     | Hover / pressed accent               |
| `--accent-glow`    | `rgba(196,43,30,0.18)` | Soft glow on hover          |
| `--text`           | `#111111`     | Primary body text                    |
| `--text-on-dark`   | `#f0f0f0`     | Text on dark chrome panels           |
| `--text-muted`     | `#888888`     | Labels, hints, secondary copy        |
| `--hud-mid`        | `rgba(255,200,196,0.06)` | Subtle tint over HUD content |

### Typography

All loaded from Google Fonts via `<link>` in `index.html`:
- **Bebas Neue** — display headings, logotype, section labels
- **Orbitron** (400, 700) — UI chrome: nav, stat values, version badge, HUD labels
- **Share Tech Mono** — body copy, taglines, canvas characters, cmd-line

### Shape and spacing

- **Hex motif:** CSS `clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)` on `.hex-badge` elements
- **Circle motif:** `border-radius: 50%` decorative divs, `.stat-badge` circles, concentric SVG traces
- **Chamfered panels:** parent `background: var(--accent)` + `::before` pseudo fill creates the bordered chamfer trick. Clip path: `polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))`
- **Max content width:** `1200px` via `.wrap`
- **Hero height:** `100svh`
- **Nav height:** `56px`
- **Mobile breakpoint:** `768px`
- **Card grid:** auto-fill, minmax(280px, 1fr)

---

## JavaScript rules

1. **Always syntax-check every JS file before finishing.**
   ```bash
   for f in js/*.js; do node --check "$f" && echo "$f OK"; done
   ```
   A single syntax error can kill the entire app silently. This is non-negotiable.

2. **No `var`.** Use `const` and `let` only.

3. **No inline event handlers added from JavaScript.** Event listeners belong in
   `script.js` via `addEventListener`. Any `onclick=` attributes in HTML are the
   only exceptions — document them here if used.

4. **One source of truth for runtime state.** `AppState` is defined in `script.js`:
   ```js
   const AppState = {
     carouselIdx: 1, // current active HUD slide (0=curriculum, 1=identity, 2=stats)
   };
   ```
   Never store runtime state in the DOM or in module-level variables in other files.

5. **`localStorage` keys:** None currently in use.

---

## Carousel architecture

Three slides indexed 0–2:
- **0** — Curriculum Map (subjects hex list, left panel)
- **1** — Identity (name / role / CTA, center panel) ← default start
- **2** — Stats & Bio (concentric circles, right panel)

No lock mechanic — all three slides are freely navigable.
Each slide contains its own `.hud-logo__dots` group; `updateDots()` syncs all three
simultaneously so they always agree on the active index.

---

## Command-line feature

`#cmdInput` accepts subject queries and navigation shortcuts:
- Typing a subject name (algebra, trig, geometry, etc.) scrolls to `#services`
  and briefly pulses the matching card with `.is-queried`.
- `contact` / `book` / `session` scrolls to `#contact`.
- `help` / `?` updates the placeholder with available commands.
- Unknown input updates placeholder with an error hint.

---

## Pre-push checklist

Run through this before every `git push`.

- [ ] `node --check` passes on every JS file
- [ ] App loads in the browser with no console errors
- [ ] Carousel slides correctly and dots update on all three panels
- [ ] Math-symbol rain is visible on all three HUD canvases
- [ ] Cmd-line subject query scrolls to services and pulses the card
- [ ] Scroll-reveal fires on cards, stats, and contact invite
- [ ] Nav active-link tracking works on scroll through all sections
- [ ] Mobile burger menu opens/closes and closes on link tap
- [ ] No hardcoded colours, URLs, or magic numbers left in the code
- [ ] CHANGELOG.md updated with a commit entry
- [ ] Version badge in the UI matches the version in CHANGELOG.md
- [ ] CLAUDE.md TO-DO is up to date

---

## Commit conventions

```
add:      new feature or file
fix:      bug fix — describe what broke and what fixed it
style:    CSS/visual only, no logic change
refactor: restructure without behaviour change
docs:     README, CLAUDE.md, CHANGELOG, code comments only
chore:    dependency, config, or tooling change
```

Every commit message should be a complete sentence in the imperative mood.
Bad: `fix stuff`, `update`, `wip`
Good: `style: tighten hex-badge clip-path so it renders crisply at small sizes`

---

## Versioning

```
α (alpha)   — active development, features being added
β (beta)    — feature-complete, stabilisation and polish only
v1.x.x      — stable release; only bugfixes and minor polish
```

**Version format:** `[phase] [major].[minor].[patch]`

**When to increment:**
- **patch** — bug fixes, copy corrections, CSS tweaks with no new features
- **minor** — new feature added, existing feature meaningfully changed
- **major** — breaking change, significant architectural shift, or phase promotion

Version is displayed in the UI via `#version-badge` in the footer. Update it in
`index.html` to match every time the version changes.

---

## Architectural decisions

- **No build step** — deliberate. Keeps the project portable and instantly deployable
  to GitHub Pages or any static host. If a bundler is ever needed, document the reason here.
- **Chamfer via pseudo-element trick** — parent sets `background: var(--accent)`, child
  `::before` covers it with the panel fill, leaving only the clipped corner as a border.
  Cleaner than box-shadow or outline hacks.
- **Canvas at `opacity: 0.08`** — keeps the math-symbol rain atmospheric without competing
  with content. Adjust per-panel via inline `style` if needed.
- **Three canvases, same function** — `initMathCanvas` is called three times with different
  color values. No separate logic per panel — the variation is purely in the passed color arg.

---

## TO-DO

> Work through items in order unless directed otherwise.
> After completing a task, change `[ ]` to `[x]` and append a short completion note.
> Update CHANGELOG.md with a matching entry.
> Run the full pre-push checklist after every task.

---

### ✅ Completed

- [x] **Initial build** — Full site scaffold: `index.html`, `css/styles.css`, `js/nav.js`,
      `js/script.js`, `CLAUDE.md`, `CHANGELOG.md`, `README.md`, `.gitignore` created.
      Three-panel HUD carousel, math-symbol rain canvases, services grid, about section,
      contact section, and footer with version badge.
      *(all files)*

---

### 🔧 Short term

- [ ] **Replace placeholder copy** — Swap `[Your Name]` in `index.html` and `styles.css`
      with the real name, and update the URL in the logotype. Also update the footer
      copyright and the nav monogram.
      *(index.html)*

- [ ] **Contact link** — Wire the "Book a Session" CTA to a real booking link or email
      `mailto:` in `index.html`. Currently `href="#contact"`.
      *(index.html)*

- [x] **Favicon** — Added `assets/favicon.svg`, a solid hex-motif shape in
      `--accent` red, referenced via `<link rel="icon">` in `index.html`.
      *(index.html, assets/favicon.svg)*

- [ ] **Mobile polish pass** — Test at 375px and 414px widths. HUD panels likely need
      adjustments for the carousel arrow spacing and card grid.
      *(css/styles.css)*

---

### 🗺 Long term

- **Availability status toggle** — Replace the static `[ AVAILABLE ]` nav badge with a
  toggle (e.g. AVAILABLE / FULL) that persists via a simple flag. Could be a query param
  or a small admin endpoint.

- **Testimonials section** — A fifth section below Contact with 2–3 quote cards using
  the chamfered panel style. Scroll-reveal stagger.

- **Dark mode variant** — The personal-site palette (dark chrome with crimson accents)
  is a natural dark counterpart. A `data-theme="dark"` toggle with `prefers-color-scheme`
  media query would make the site adaptive.
