(() => {
  const OWNER_MODE_KEY = 'owner_mode';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initializePublicationToggle = () => {
    const showFullBtn = document.getElementById('showFullListBtn');
    const showSelectedBtn = document.getElementById('showSelectedListBtn');

    if (!showFullBtn || !showSelectedBtn) {
      return;
    }

    showFullBtn.addEventListener('click', () => {
      document.body.classList.add('pub-show-all');
      showFullBtn.classList.add('active');
      showSelectedBtn.classList.remove('active');
    });

    showSelectedBtn.addEventListener('click', () => {
      document.body.classList.remove('pub-show-all');
      showSelectedBtn.classList.add('active');
      showFullBtn.classList.remove('active');
    });
  };

  const initializeReveal = () => {
    const revealTargets = Array.from(document.querySelectorAll('.reveal-target'));

    if (!revealTargets.length) {
      return;
    }

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealTargets.forEach((el) => observer.observe(el));
  };

  const updateOwnerModeFromQuery = () => {
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('admin');

    if (adminParam === '1') {
      localStorage.setItem(OWNER_MODE_KEY, '1');
      return;
    }

    if (adminParam === '0') {
      localStorage.removeItem(OWNER_MODE_KEY);
    }
  };

  const isOwnerModeEnabled = () => localStorage.getItem(OWNER_MODE_KEY) === '1';

  const renderFooterVisibility = () => {
    const footer = document.getElementById('siteFooter');
    if (footer) {
      footer.hidden = !isOwnerModeEnabled();
    }
  };

  const initializeOwnerShortcut = () => {
    document.addEventListener('keydown', (event) => {
      if (event.altKey && event.shiftKey && event.code === 'KeyA') {
        if (isOwnerModeEnabled()) {
          localStorage.removeItem(OWNER_MODE_KEY);
        } else {
          localStorage.setItem(OWNER_MODE_KEY, '1');
        }

        renderFooterVisibility();
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initializePublicationToggle();
    initializeReveal();
    updateOwnerModeFromQuery();
    renderFooterVisibility();
    initializeOwnerShortcut();
  });
})();
