/* =====================================================
   Data Reinvent — Site Interactions
   Mobile nav, scroll header state, active-link highlight,
   footer year, and lightweight contact form handling.
===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScrollState();
  initActiveNavLink();
  initFooterYear();
  initContactForm();
});

/* ---------- Mobile navigation toggle ---------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu whenever a nav link is used.
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Header shadow/background once page is scrolled ---------- */
function initHeaderScrollState() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const updateState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  updateState();
  window.addEventListener('scroll', updateState, { passive: true });
}

/* ---------- Highlight the nav link matching the section in view ---------- */
function initActiveNavLink() {
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const links = Array.from(document.querySelectorAll('.nav-link'));
  if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

  const linkFor = (id) => links.find((link) => link.getAttribute('href') === `#${id}`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach((l) => l.removeAttribute('aria-current'));
          link.setAttribute('aria-current', 'true');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------- Contact form (client-side only) ----------
   No backend is wired up yet. This validates required fields
   and shows an inline confirmation message. Replace the
   "TODO" block with a real submission (e.g. fetch() to an
   email/CRM endpoint) when one is available.
------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = 'Please fill in your name, email, and message before sending.';
      status.className = 'form-status error';
      form.reportValidity();
      return;
    }

    // TODO: send form data to a real endpoint (email service, CRM, etc.)
    // const data = new FormData(form);

    status.textContent = "Thanks — your message has been received. We'll be in touch shortly.";
    status.className = 'form-status success';
    form.reset();
  });
}
