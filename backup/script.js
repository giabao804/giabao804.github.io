(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const toggleHeaderShadow = () => {
    if (window.scrollY > 8) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  };

  const revealTargets = [
    '.profile-table',
    '#bio',
    '#research',
    '#news',
    '#publication',
    '#experience',
    '#education',
    '#honors',
    '.site-footer',
  ];

  const elements = revealTargets
    .flatMap((selector) => Array.from(document.querySelectorAll(selector)))
    .filter((el, index, self) => self.indexOf(el) === index);

  if (!prefersReducedMotion && elements.length) {
    elements.forEach((el, index) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${index * 60}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
  }

  toggleHeaderShadow();
  window.addEventListener('scroll', toggleHeaderShadow, { passive: true });
})();
