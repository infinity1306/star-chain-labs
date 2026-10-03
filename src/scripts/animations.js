/**
 * STAR CHAIN LABS — Scroll Reveal & Micro-Interactions
 * Performance-conscious IntersectionObserver reveals
 */

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe existing and newly added elements
  function observeElements() {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
      revealObserver.observe(el);
    });
  }

  observeElements();

  // Re-run after a small delay in case dynamic content was injected
  setTimeout(observeElements, 200);

  // Industry Row interactive toggle
  const industryRows = document.querySelectorAll('.industry-row');
  industryRows.forEach(row => {
    row.addEventListener('click', () => {
      const isExpanded = row.getAttribute('data-expanded') === 'true';
      industryRows.forEach(r => r.setAttribute('data-expanded', 'false'));
      if (!isExpanded) {
        row.setAttribute('data-expanded', 'true');
      }
    });
  });
}
