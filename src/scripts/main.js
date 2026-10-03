/**
 * STAR CHAIN LABS — Main Application Entry
 * Bootstraps navigation, constellation network, architecture blueprint,
 * case studies, inquiry lifecycle, and scroll reveals.
 */

import { initNavigation } from './navigation.js';
import { initConstellation } from './constellation.js';
import { initBlueprint } from './blueprint.js';
import { initCaseStudies } from './caseStudies.js';
import { initInquiryForm } from './inquiryForm.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation & Mobile Drawer
  initNavigation();

  // 2. Interactive Constellation Canvas
  initConstellation();

  // 3. System Architecture Blueprint Explorer
  initBlueprint();

  // 4. Featured Work Case Studies
  initCaseStudies();

  // 5. Project Inquiry Form & Lifecycle
  initInquiryForm();

  // 6. Scroll Reveal Observer
  initAnimations();

  // Back to top smooth scroll
  const backToTop = document.querySelector('.footer-back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
