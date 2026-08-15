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
  initArticles();
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

/* ---------- Insights: article cards + pagination ----------
   Cards are generated from the ARTICLES array (articles-data.js)
   instead of being hand-written in index.html. Adding a new
   article there is all that's needed — the grid and the page
   count below both update automatically.
------------------------------------------------------- */
const ARTICLES_PER_PAGE = 6;

// One renderer per thumbnail "type" used in articles-data.js.
// Each returns the inner SVG markup for a card's cover art,
// given a unique gradient id and a [from, to] color pair.
const THUMBNAIL_RENDERERS = {
  lambda: (gradientId, [from, to]) => `
    <svg viewBox="0 0 400 240" role="img" aria-label="" class="article-thumb">
      <defs>
        <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}"/>
          <stop offset="100%" stop-color="${to}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#${gradientId})"/>
      <g stroke="rgba(255,255,255,0.35)" stroke-width="1.5">
        <line x1="0" y1="60" x2="400" y2="60"/>
        <line x1="0" y1="105" x2="400" y2="105"/>
        <line x1="0" y1="150" x2="400" y2="150"/>
        <line x1="0" y1="195" x2="400" y2="195"/>
        <line x1="90" y1="0" x2="90" y2="240"/>
        <line x1="200" y1="0" x2="200" y2="240"/>
        <line x1="310" y1="0" x2="310" y2="240"/>
      </g>
      <text x="200" y="140" text-anchor="middle" font-family="Georgia, serif" font-size="88" fill="#ffffff" opacity="0.95">&#955;</text>
    </svg>`,

  bars: (gradientId, [from, to]) => `
    <svg viewBox="0 0 400 240" role="img" aria-label="" class="article-thumb">
      <defs>
        <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}"/>
          <stop offset="100%" stop-color="${to}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#${gradientId})"/>
      <g fill="rgba(255,255,255,0.9)">
        <rect x="60" y="150" width="34" height="60"/>
        <rect x="110" y="110" width="34" height="100"/>
        <rect x="160" y="70" width="34" height="140"/>
        <rect x="210" y="130" width="34" height="80"/>
      </g>
      <polyline points="260,150 285,120 310,135 335,90" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.95"/>
    </svg>`,

  sparkle: (gradientId, [from, to]) => `
    <svg viewBox="0 0 400 240" role="img" aria-label="" class="article-thumb">
      <defs>
        <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}"/>
          <stop offset="100%" stop-color="${to}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#${gradientId})"/>
      <path d="M200 60 L214 106 L260 120 L214 134 L200 180 L186 134 L140 120 L186 106 Z" fill="#ffffff" opacity="0.95"/>
      <path d="M300 70 L307 92 L330 100 L307 108 L300 130 L293 108 L270 100 L293 92 Z" fill="#ffffff" opacity="0.7"/>
    </svg>`,

  leaf: (gradientId, [from, to]) => `
    <svg viewBox="0 0 400 240" role="img" aria-label="" class="article-thumb">
      <defs>
        <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}"/>
          <stop offset="100%" stop-color="${to}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#${gradientId})"/>
      <path d="M200 70 C170 75 150 100 150 130 C150 165 175 190 205 188 C185 165 185 130 210 105 C225 90 240 85 250 85 C240 130 210 175 175 195 C210 205 250 190 265 155 C280 120 265 85 200 70 Z" fill="#ffffff" opacity="0.9"/>
    </svg>`,

  variance: (gradientId, [from, to]) => `
    <svg viewBox="0 0 400 240" role="img" aria-label="" class="article-thumb">
      <defs>
        <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}"/>
          <stop offset="100%" stop-color="${to}"/>
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#${gradientId})"/>
      <g stroke="rgba(255,255,255,0.35)" stroke-width="1.5">
        <line x1="0" y1="60" x2="400" y2="60"/>
        <line x1="0" y1="105" x2="400" y2="105"/>
        <line x1="0" y1="150" x2="400" y2="150"/>
        <line x1="0" y1="195" x2="400" y2="195"/>
        <line x1="90" y1="0" x2="90" y2="240"/>
        <line x1="200" y1="0" x2="200" y2="240"/>
        <line x1="310" y1="0" x2="310" y2="240"/>
      </g>
      <text x="200" y="134" text-anchor="middle" font-family="Consolas, 'Courier New', monospace" font-size="34" fill="#ffffff" opacity="0.95">23,233 (912)</text>
    </svg>`
};

// 'image' is handled separately from THUMBNAIL_RENDERERS: it renders a
// real <img> (thumbnail.src / thumbnail.alt) instead of a generated SVG.
function renderThumbnail(thumbnail, gradientId) {
  if (!thumbnail) return '';
  if (thumbnail.type === 'image') {
    return `<img class="article-thumb" src="${thumbnail.src}" alt="${thumbnail.alt || ''}" loading="lazy" />`;
  }
  const renderer = THUMBNAIL_RENDERERS[thumbnail.type];
  return renderer ? renderer(gradientId, thumbnail.colors) : '';
}

function articleCardHTML(article) {
  // Gradient ids must be unique wherever the card ends up in the DOM;
  // the article's own id is already unique across ARTICLES.
  const gradientId = `grad-${article.id}`;

  return `
    <article class="article-card">
      <a class="article-card-media" href="${article.href}" aria-hidden="true" tabindex="-1">
        ${renderThumbnail(article.thumbnail, gradientId)}
      </a>
      <div class="article-card-body">
        <p class="article-category">${article.category}</p>
        <h3><a href="${article.href}">${article.title}</a></h3>
        <p class="article-desc">${article.description}</p>
        <div class="article-meta">
          <span class="article-author">${article.author}</span>
          <span class="dot" aria-hidden="true">•</span>
          <span class="article-readtime">${article.readTime}</span>
        </div>
      </div>
    </article>`;
}

function initArticles() {
  const grid = document.getElementById('articleGrid');
  const pagination = document.getElementById('articlePagination');
  if (!grid || typeof ARTICLES === 'undefined') return;

  const totalPages = Math.max(1, Math.ceil(ARTICLES.length / ARTICLES_PER_PAGE));
  let currentPage = 1;

  function renderGrid() {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    const pageItems = ARTICLES.slice(start, start + ARTICLES_PER_PAGE);
    grid.innerHTML = pageItems.map(articleCardHTML).join('');
  }

  function goToPage(page) {
    currentPage = Math.min(Math.max(1, page), totalPages);
    renderGrid();
    renderPagination();
  }

  function renderPagination() {
    if (!pagination) return;

    // Nothing to paginate yet — hide the control entirely. It reappears
    // on its own once ARTICLES grows past one page's worth of cards.
    if (totalPages <= 1) {
      pagination.hidden = true;
      pagination.innerHTML = '';
      return;
    }

    pagination.hidden = false;

    const arrow = (label, targetPage, disabled, ariaLabel) => `
      <button type="button" class="pagination-btn pagination-arrow" data-page="${targetPage}"
        ${disabled ? 'disabled' : ''} aria-label="${ariaLabel}">${label}</button>`;

    const numbers = Array.from({ length: totalPages }, (_, i) => i + 1)
      .map(
        (page) => `
        <button type="button" class="pagination-btn${page === currentPage ? ' is-active' : ''}"
          data-page="${page}" aria-label="Go to page ${page}"
          aria-current="${page === currentPage ? 'page' : 'false'}">${page}</button>`
      )
      .join('');

    pagination.innerHTML =
      arrow('&larr;', currentPage - 1, currentPage === 1, 'Previous page') +
      numbers +
      arrow('&rarr;', currentPage + 1, currentPage === totalPages, 'Next page');

    pagination.querySelectorAll('.pagination-btn[data-page]:not(:disabled)').forEach((btn) => {
      btn.addEventListener('click', () => goToPage(Number(btn.dataset.page)));
    });
  }

  goToPage(1);
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
      status.textContent = 'กรุณากรอกชื่อ อีเมล และข้อความให้ครบก่อนส่ง';
      status.className = 'form-status error';
      form.reportValidity();
      return;
    }

    // TODO: send form data to a real endpoint (email service, CRM, etc.)
    // const data = new FormData(form);

    status.textContent = 'ขอบคุณครับ/ค่ะ เราได้รับข้อความของคุณแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด';
    status.className = 'form-status success';
    form.reset();
  });
}
