(() => {
  const VISIT_STORAGE_KEY = 'visit_count';
  const VISIT_SESSION_KEY = 'visit_counted_session';
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

  const getVisitCountForSession = () => {
    if (!sessionStorage.getItem(VISIT_SESSION_KEY)) {
      const currentCount = Number.parseInt(localStorage.getItem(VISIT_STORAGE_KEY) || '0', 10);
      const safeCount = Number.isNaN(currentCount) ? 0 : currentCount;
      const nextCount = safeCount + 1;

      localStorage.setItem(VISIT_STORAGE_KEY, String(nextCount));
      sessionStorage.setItem(VISIT_SESSION_KEY, '1');
      return nextCount;
    }

    const persistedCount = Number.parseInt(localStorage.getItem(VISIT_STORAGE_KEY) || '0', 10);
    return Number.isNaN(persistedCount) ? 0 : persistedCount;
  };

  const renderVisitCounter = () => {
    const visitCounter = document.getElementById('visitCounter');
    if (!visitCounter) {
      return;
    }

    const visits = getVisitCountForSession();
    visitCounter.textContent = `👁 Visited ${visits} times`;
    visitCounter.hidden = !isOwnerModeEnabled();
  };

  const initializeOwnerShortcut = () => {
    document.addEventListener('keydown', (event) => {
      if (event.altKey && event.shiftKey && event.key.toLowerCase() === 'a') {
        if (isOwnerModeEnabled()) {
          localStorage.removeItem(OWNER_MODE_KEY);
        } else {
          localStorage.setItem(OWNER_MODE_KEY, '1');
        }

        renderVisitCounter();
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initializePublicationToggle();
    initializeReveal();
    updateOwnerModeFromQuery();
    renderVisitCounter();
    initializeOwnerShortcut();
  });
})();
