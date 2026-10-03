/**
 * STAR CHAIN LABS — Project Inquiry Form System
 * Validation, dynamic service & budget selectors, lifecycle state transitions
 */

export function initInquiryForm() {
  const form = document.getElementById('projectInquiryForm');
  const successBox = document.getElementById('inquirySuccess');
  const servicePills = document.querySelectorAll('.service-pill');
  const budgetPills = document.querySelectorAll('.budget-pill');
  const serviceInput = document.getElementById('selectedService');
  const budgetInput = document.getElementById('selectedBudget');

  if (!form) return;

  // Service Pill Selection
  servicePills.forEach(pill => {
    pill.addEventListener('click', () => {
      servicePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const val = pill.getAttribute('data-value') || '';
      if (serviceInput) serviceInput.value = val;
    });
  });

  // Budget Pill Selection
  budgetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      budgetPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const val = pill.getAttribute('data-value') || '';
      if (budgetInput) budgetInput.value = val;
    });
  });

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const company = document.getElementById('company')?.value.trim();
    const description = document.getElementById('description')?.value.trim();

    // Basic validation
    if (!fullName || !email || !description) {
      alert('Please fill out all required fields: Full Name, Work Email, and Project Description.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid work email address.');
      return;
    }

    // Submit state simulation
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="status-dot"></span>
      PROCESSING INQUIRY...
    `;

    setTimeout(() => {
      form.style.display = 'none';
      if (successBox) {
        successBox.classList.add('active');
        const confirmName = document.getElementById('confirmClientName');
        if (confirmName) confirmName.textContent = fullName;
      }
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 900);
  });

  // Reset button in success box
  const resetBtn = document.getElementById('newInquiryBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (successBox) successBox.classList.remove('active');
      servicePills.forEach((p, i) => {
        if (i === 0) p.classList.add('active');
        else p.classList.remove('active');
      });
      budgetPills.forEach((p, i) => {
        if (i === 0) p.classList.add('active');
        else p.classList.remove('active');
      });
    });
  }
}
