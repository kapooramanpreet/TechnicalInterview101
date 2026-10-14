document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // The slides menu is a <details>; close it on an outside click, on Escape,
  // or once a deck has been picked.
  document.querySelectorAll('.schedule-term-slides').forEach((menu) => {
    document.addEventListener('click', (event) => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        menu.querySelector('summary').focus();
      }
    });
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => { menu.open = false; });
    });
  });

  // Progressive reveal. Everything is visible by default; this only adds the
  // fade-up when IntersectionObserver is available.
  const revealables = document.querySelectorAll(
    '.claim, .flow li, .cohort-card, .team-card'
  );
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' }
    );
    revealables.forEach((el, i) => {
      el.classList.add('fade-ready');
      el.style.setProperty('--reveal-delay', (i % 4) * 60 + 'ms');
      observer.observe(el);
    });
  }
});
