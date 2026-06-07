// nav.js — Sticky nav behaviour, mobile menu toggle, active-link tracking.
// Owned by this module only. Do not touch #nav or .nav__* from other files.

document.addEventListener('DOMContentLoaded', () => {
  const nav      = document.getElementById('nav');
  const navLinks = document.getElementById('nav-links');
  const burger   = document.getElementById('nav-burger');
  const links    = document.querySelectorAll('.nav__link');

  // ── Scrolled state (adds shadow + blur) ──────────────────
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ── Mobile menu toggle ───────────────────────────────────
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when a nav link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Active link tracking via IntersectionObserver ────────
  const sections = document.querySelectorAll('main section[id]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        link.classList.toggle(
          'is-active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));
});
