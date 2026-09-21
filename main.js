/* ══════════════════════════════════════════════════════════════════
   THE PENGUIN CIRCLE — TECH JOURNAL CLIENT
   Search, Category Filtering, Code Copy (No Overlap), Theme Manager
   ══════════════════════════════════════════════════════════════════ */

// ── Toast Notification ──
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ── 1-Click Code Copy (Supports .code-container and .code-header) ──
function initCopy() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    
    // Find code element inside .code-container or .code-box
    const container = btn.closest('.code-container') || btn.closest('.code-box');
    const codeEl = container ? container.querySelector('code') : null;
    if (!codeEl) return;

    navigator.clipboard.writeText(codeEl.textContent.trim()).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Tersalin!`;
      showToast('Perintah disalin ke clipboard');
      setTimeout(() => { btn.innerHTML = orig; }, 1800);
    }).catch(() => {
      showToast('Gagal menyalin otomatis');
    });
  });
}

// ── Live Search & Category Filtering (Index Page) ──
function initSearchFilter() {
  const input = document.getElementById('search-input');
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.article-card');
  const empty = document.getElementById('search-empty');

  if (!cards.length) return; // Not on index page

  let activeCat = 'all';
  let query = '';

  function apply() {
    let count = 0;
    cards.forEach(card => {
      const cat = card.getAttribute('data-cat') || '';
      const text = card.textContent.toLowerCase();
      const matchCat = activeCat === 'all' || cat === activeCat;
      const matchQuery = query === '' || text.includes(query);

      if (matchCat && matchQuery) {
        card.classList.remove('hidden');
        count++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (empty) {
      empty.style.display = count === 0 ? 'block' : 'none';
    }
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCat = pill.getAttribute('data-cat') || 'all';
      apply();
    });
  });

  if (input) {
    input.addEventListener('input', (e) => {
      query = e.target.value.trim().toLowerCase();
      apply();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
        input.select();
      } else if (e.key === 'Escape' && document.activeElement === input) {
        input.value = '';
        query = '';
        apply();
        input.blur();
      }
    });
  }
}

// ── Theme Switcher ──
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('tpc_theme');
  if (saved === 'light') html.classList.add('light');

  if (!btn) return;
  btn.addEventListener('click', () => {
    const isLight = html.classList.toggle('light');
    localStorage.setItem('tpc_theme', isLight ? 'light' : 'dark');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCopy();
  initSearchFilter();
  initTheme();
});
