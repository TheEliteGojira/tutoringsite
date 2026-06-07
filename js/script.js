// script.js — App init, scroll-reveal.
// Orchestrates the app. Does not own nav concerns (see nav.js).

// ── AppState ─────────────────────────────────────────────────────────────
// Single source of truth for runtime state. Never store state in the DOM
// or in module-level variables in other files.
const AppState = {};

// ── DOMContentLoaded ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Scroll-reveal via IntersectionObserver ────────────────────────────
  // Elements with .reveal animate in when they enter the viewport.
  // Progressive enhancement: if JS fails, content is still visible.
  //
  // Some elements (.card, .about__bio p, .contact__invite) don't carry
  // .reveal in the markup — tag them here. Others (.about__bio,
  // .about__stats, .contact__panel) already have it written directly into
  // index.html. Either way, querying .reveal *after* tagging picks up both
  // groups, so nothing is left stuck at opacity: 0.
  ['.card', '.about__bio p', '.contact__invite'].forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.add('reveal'));
  });

  const revealTargets = [...document.querySelectorAll('.reveal')];

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach(el => revealObserver.observe(el));
});
