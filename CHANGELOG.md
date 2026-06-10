# CHANGELOG — Math Tutoring Site

All commits and version changes are recorded here in reverse chronological order.
Every entry is written immediately after committing — entries are never batched or
written after the fact.

See `CLAUDE.md` for the commit message conventions and versioning scheme.

---

## COMMIT #1 / α 1.0.0
Initial full build of the math tutoring site. Complete single-page site scaffold
created from scratch using the personal-website zip as structural reference and the
project-template zip for conventions.

`index.html` (644 lines): three-panel HUD carousel hero with `.hud-slide` panels for
Curriculum Map (hex subject badges, circuit trace SVGs, math-symbol canvas), Identity
(targeting reticle SVG, K12 grade badge, logotype, CTA group with `.btn--primary` book
button and `.btn--secondary` curriculum button), and Stats/Bio (concentric circle SVG
traces, `.hud-about` grid with biography text and 2×2 chamfered stat blocks). Sections
below the hero: `#services` (6 chamfered cards in auto-fill grid — Elementary Math,
Pre-Algebra, Geometry, Algebra I, Algebra II, Trigonometry — with Algebra I & II
carrying `.card--focus` for permanent red left-border treatment); `#about` (bio panel
and 2×2 circular stat badges); `#contact` (invite copy and email CTA); `footer`
(dark chrome, version badge at α 1.0.0).

`css/styles.css` (1797 lines): full design system using CSS custom properties. White
primary (`--bg: #f2f2f0`, `--panel: #ffffff`) with red structural accents
(`--accent: #c42b1e`). Dark chrome nav and HUD bars (`--panel-dark: #111111`). Hex
motif via `clip-path` on `.hex-badge` elements. Circle motif via `border-radius: 50%`
on `.stat-badge`, `.hud-window__circ` decorative divs, and concentric SVG traces.
Chamfered panels using the parent-border / `::before`-fill pseudo-element trick.
Hex SVG tiled background on `body`. Fonts: Bebas Neue (display), Orbitron (UI
chrome), Share Tech Mono (body/mono). Scroll-reveal via `.reveal` / `.is-visible`
classes toggled by `IntersectionObserver`. `.card--focus` and `.is-queried` states.
Mobile breakpoint at 768px.

`js/nav.js` (49 lines): sticky nav scroll state, mobile burger toggle, active-link
tracking via `IntersectionObserver` with `-40% 0px -55% 0px` root margin.

`js/script.js` (213 lines): `AppState` singleton tracking `carouselIdx`. `initMathCanvas`
replaces the personal site's binary stream with falling math symbols (√, π, Σ, ∂, θ,
∫, ±, Δ, ∞, α, β, γ, ∈, ≡, ≈, ≠, λ, φ, and digit/variable chars) in red at
`rgba(196, 43, 30, 0.5–0.65)`. `initHudTrack` implements the three-slide drag/touch/
arrow carousel with `snapTo`, dot sync, and resize handler — no lock mechanic unlike
the personal site. `initCmdLine` handles subject query input: subject names scroll to
`#services` and pulse the matching card via `.is-queried`; `contact`/`book` scrolls to
`#contact`; `help` updates the placeholder. Scroll-reveal observer wires `.card`,
`.stat`, `.about__bio p`, and `.contact__invite` targets.

`CLAUDE.md`, `CHANGELOG.md`, `README.md`, `.gitignore` added per project-template conventions.
*(index.html, css/styles.css, js/nav.js, js/script.js, CLAUDE.md, CHANGELOG.md, README.md, .gitignore)*

---

## COMMIT #2 / α 1.1.0
Desktop hero polish and favicon. With the portrait slot temporarily hidden,
`.hud-window--hero` switched from `justify-content: space-between` to `center` so the
intro block sits balanced in the window instead of flush-left with empty space on the
right; `.hero__intro` `max-width` increased from 620px to 720px to use more of that
space. Added `assets/favicon.svg`, a solid hex-motif shape in `--accent` red,
referenced via `<link rel="icon">` in `index.html`. Version badge bumped to α 1.1.0.
*(index.html, css/styles.css, assets/favicon.svg, CLAUDE.md)*
