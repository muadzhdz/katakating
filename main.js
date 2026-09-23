/* ══════════════════════════════════════════════════════════════════
   [>] KATAKATING — KNOWLEDGE HUB JAVASCRIPT
   Search, Category Filtering, Dynamic Sorting, Code Copy, Theme Toggle
   ══════════════════════════════════════════════════════════════════ */

const SUN_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

const MOON_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

// ── Toast Notification ──
let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toast-msg') || toast;
  if (!toast) return;
  if (msgEl !== toast) msgEl.textContent = msg;
  else toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ── 1-Click Code Copy (Style) ──
function initCopy() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-btn') || e.target.closest('.copy-button');
    if (!btn) return;
    
    const container = btn.closest('.code-container') || btn.closest('.command-panel') || btn.closest('.code-box');
    const codeEl = container ? container.querySelector('code') || container.querySelector('pre') : null;
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

// ── Live Search, Filtering, and Sorting (KataKating Catalog) ──
function initSearchFilter() {
  const input = document.getElementById('search-input');
  const chips = document.querySelectorAll('.category-chip, .filter-pill');
  const clearFiltersBtn = document.getElementById('clear-filters') || document.getElementById('empty-reset');
  const countEl = document.getElementById('plugin-count');
  const sortSelect = document.getElementById('sort-select');
  const emptyState = document.getElementById('empty-state') || document.getElementById('search-empty');
  const grid = document.getElementById('plugin-grid');

  let cards = Array.from(document.querySelectorAll('.plugin-card, .article-card'));
  if (!cards.length) return;

  let activeCat = 'all';
  let query = '';

  function apply() {
    let visibleCount = 0;
    cards.forEach(card => {
      const cat = (card.getAttribute('data-cat') || '').toLowerCase();
      const text = card.textContent.toLowerCase();
      const matchCat = activeCat === 'all' || cat.includes(activeCat.toLowerCase());
      const matchQuery = query === '' || text.includes(query);

      if (matchCat && matchQuery) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (countEl) {
      countEl.textContent = visibleCount;
    }

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
      if (emptyState.style) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Sort logic
  function applySort() {
    if (!sortSelect || !grid) return;
    const val = sortSelect.value;
    const currentCards = Array.from(grid.querySelectorAll('.plugin-card, .article-card'));

    currentCards.sort((a, b) => {
      if (val === 'title') {
        const titleA = (a.querySelector('h3') ? a.querySelector('h3').textContent : '').toLowerCase();
        const titleB = (b.querySelector('h3') ? b.querySelector('h3').textContent : '').toLowerCase();
        return titleA.localeCompare(titleB);
      } else if (val === 'category') {
        const catA = (a.getAttribute('data-cat') || '').toLowerCase();
        const catB = (b.getAttribute('data-cat') || '').toLowerCase();
        return catA.localeCompare(catB);
      }
      return 0; // Default order
    });

    currentCards.forEach(c => grid.appendChild(c));
    cards = Array.from(document.querySelectorAll('.plugin-card, .article-card'));
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      applySort();
      apply();
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCat = chip.getAttribute('data-cat') || 'all';
      apply();
    });
  });

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      activeCat = 'all';
      query = '';
      if (input) input.value = '';
      chips.forEach(c => {
        if (c.getAttribute('data-cat') === 'all') c.classList.add('active');
        else c.classList.remove('active');
      });
      apply();
    });
  }

  if (input) {
    input.addEventListener('input', (e) => {
      query = e.target.value.trim().toLowerCase();
      apply();
    });

    window.addEventListener('keydown', (e) => {
      // Ctrl+K or / to focus search
      if ((e.key === '/' || (e.ctrlKey && e.key.toLowerCase() === 'k')) && document.activeElement !== input) {
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

  apply();
}

// ── Theme Switcher with Sun & Moon SVG Icons ──
function updateThemeIcon() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const isLight = document.documentElement.classList.contains('light') || document.documentElement.getAttribute('data-theme') === 'light';
  btn.innerHTML = isLight ? MOON_SVG : SUN_SVG;
  btn.setAttribute('aria-label', isLight ? 'Beralih ke Mode Gelap' : 'Beralih ke Mode Terang');
  btn.title = isLight ? 'Beralih ke Mode Gelap' : 'Beralih ke Mode Terang';
}

function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('katakating_theme') || localStorage.getItem('tpc_theme') || localStorage.getItem('readme-theme');
  if (saved === 'light') {
    html.classList.add('light');
    html.setAttribute('data-theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
  }
  updateThemeIcon();

  if (!btn) return;
  btn.addEventListener('click', () => {
    const isLight = html.classList.toggle('light');
    html.setAttribute('data-theme', isLight ? 'light' : 'dark');
    localStorage.setItem('katakating_theme', isLight ? 'light' : 'dark');
    localStorage.setItem('tpc_theme', isLight ? 'light' : 'dark');
    localStorage.setItem('readme-theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
    showToast(isLight ? 'Mode Terang diaktifkan' : 'Mode Gelap diaktifkan');
  });
}

// ── Shared Lightweight Markdown Parser (Code Panels) ──
function parseSimpleMarkdown(md) {
  if (!md) return '';
  let clean = md.replace(/^---[\s\S]*?---/, '').trim();
  const esc = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const codeBlocks = [];
  clean = clean.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const idx = codeBlocks.length;
    const language = lang || 'text';
    codeBlocks.push(`
      <div class="command-panel">
        <div class="command-panel-head">
          <span>${esc(language)}</span>
          <button class="copy-button" type="button" aria-label="Salin kode">
            <span class="copy-icon"></span>
            SALIN
          </button>
        </div>
        <pre class="code-body"><code>${esc(code.trim())}</code></pre>
      </div>
    `);
    return `__CODE_BLOCK_${idx}__`;
  });

  clean = clean.replace(/^>\s*(.*$)/gim, '<blockquote style="border-left: 2px solid var(--accent); padding: 8px 14px; background: var(--panel-2); margin: 14px 0; color: var(--text); font-size: 0.9em;">$1</blockquote>');
  clean = clean.replace(/`([^`]+)`/g, (m, c) => `<code style="font-family:var(--mono);font-size:0.85em;background:var(--code-bg);border:1px solid var(--line-strong);padding:2px 5px;color:var(--accent);">${esc(c)}</code>`);

  clean = clean.replace(/^### (.*$)/gim, '<h3 style="font-size: 1.1rem; font-weight: 600; color: var(--heading); margin: 24px 0 8px;">$1</h3>');
  clean = clean.replace(/^## (.*$)/gim, '<h2 style="font-size: 1.35rem; font-weight: 700; color: var(--heading); margin: 32px 0 12px; border-bottom: 1px solid var(--line); padding-bottom: 6px;">$1</h2>');
  clean = clean.replace(/^# (.*$)/gim, '<h1 style="font-size: 1.6rem; font-weight: 700; color: var(--heading); margin: 24px 0 12px;">$1</h1>');

  clean = clean.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  clean = clean.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  clean = clean.replace(/^\s*\d+\.\s+(.*$)/gim, '<li style="margin-left: 20px; list-style-type: decimal; margin-bottom: 4px;">$1</li>');
  clean = clean.replace(/^\s*[\-\*]\s+(.*$)/gim, '<li style="margin-left: 20px; list-style-type: disc; margin-bottom: 4px;">$1</li>');

  clean = clean.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').slice(1, -1).map(c => c.trim());
    if (cells.every(c => /^:?-+:?$/.test(c))) {
      return '__TABLE_DIVIDER__';
    }
    return `<tr>${cells.map(c => `<td style="padding: 7px 12px; border: 1px solid var(--line); font-size: 13px;">${c}</td>`).join('')}</tr>`;
  });
  clean = clean.replace(/(<tr>[\s\S]*?<\/tr>(\s*__TABLE_DIVIDER__\s*<tr>[\s\S]*?<\/tr>)+)/g, (match) => {
    const rows = match.replace(/__TABLE_DIVIDER__/g, '').trim();
    return `<table style="width:100%; border-collapse: collapse; margin: 16px 0; border: 1px solid var(--line);">${rows}</table>`;
  });
  clean = clean.replace(/__TABLE_DIVIDER__/g, '');

  clean = clean.split('\n\n').map(chunk => {
    chunk = chunk.trim();
    if (!chunk) return '';
    if (chunk.startsWith('<h') || chunk.startsWith('<li') || chunk.startsWith('<table') || chunk.startsWith('<block') || chunk.startsWith('__CODE_BLOCK_')) {
      return chunk;
    }
    return `<p style="margin-bottom: 14px; line-height: 1.65; color: var(--text); font-size: 14px;">${chunk.replace(/\n/g, '<br>')}</p>`;
  }).join('\n\n');

  codeBlocks.forEach((block, i) => {
    clean = clean.replace(`__CODE_BLOCK_${i}__`, block);
  });

  return clean;
}

document.addEventListener('DOMContentLoaded', () => {
  initCopy();
  initSearchFilter();
  initTheme();
});
