/* ══════════════════════════════════════════════════════════════════
   THE PENGUIN CIRCLE — TECH JOURNAL CLIENT
   Search, Category Filtering, Code Copy (No Overlap), Theme Switcher
   ══════════════════════════════════════════════════════════════════ */

const SUN_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

const MOON_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

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

// ── 1-Click Code Copy (No Overlap) ──
function initCopy() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;
    
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

  if (!cards.length) return;

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

// ── Theme Switcher with Sun & Moon SVG Icons ──
function updateThemeIcon() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const isLight = document.documentElement.classList.contains('light');
  btn.innerHTML = isLight ? MOON_SVG : SUN_SVG;
  btn.setAttribute('aria-label', isLight ? 'Beralih ke Mode Gelap' : 'Beralih ke Mode Terang');
  btn.title = isLight ? 'Beralih ke Mode Gelap' : 'Beralih ke Mode Terang';
}

function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const saved = localStorage.getItem('tpc_theme');
  if (saved === 'light') {
    html.classList.add('light');
  }
  updateThemeIcon();

  if (!btn) return;
  btn.addEventListener('click', () => {
    const isLight = html.classList.toggle('light');
    localStorage.setItem('tpc_theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
    showToast(isLight ? 'Mode Terang diaktifkan' : 'Mode Gelap diaktifkan');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCopy();
  initSearchFilter();
  initTheme();
});

// ── Shared Lightweight Markdown Parser ──
function parseSimpleMarkdown(md) {
  if (!md) return '';
  let clean = md.replace(/^---[\s\S]*?---/, '').trim();
  const esc = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const codeBlocks = [];
  clean = clean.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const idx = codeBlocks.length;
    const language = lang || 'text';
    codeBlocks.push(`
      <div class="code-container">
        <div class="code-header">
          <span class="code-lang">${esc(language)}</span>
          <button class="copy-btn" aria-label="Salin kode">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Salin
          </button>
        </div>
        <pre class="code-body"><code>${esc(code.trim())}</code></pre>
      </div>
    `);
    return `__CODE_BLOCK_${idx}__`;
  });

  clean = clean.replace(/^>\s*(.*$)/gim, '<blockquote style="border-left: 3px solid var(--accent); padding: 8px 14px; background: var(--surface-hover); margin: 12px 0; border-radius: 0 4px 4px 0; color: var(--fg); font-size: 0.9em;">$1</blockquote>');
  clean = clean.replace(/`([^`]+)`/g, (m, c) => `<code style="font-family:'JetBrains Mono',monospace;font-size:0.85em;background:var(--surface);border:1px solid var(--border);padding:2px 5px;border-radius:4px;color:var(--accent);">${esc(c)}</code>`);

  clean = clean.replace(/^### (.*$)/gim, '<h3 style="font-size: 1.1rem; font-weight: 600; color: var(--primary); margin: 20px 0 8px;">$1</h3>');
  clean = clean.replace(/^## (.*$)/gim, '<h2 style="font-size: 1.35rem; font-weight: 700; color: var(--primary); margin: 28px 0 12px; border-bottom: 1px solid var(--border); padding-bottom: 6px;">$1</h2>');
  clean = clean.replace(/^# (.*$)/gim, '<h1 style="font-size: 1.6rem; font-weight: 700; color: var(--primary); margin: 24px 0 12px;">$1</h1>');

  clean = clean.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  clean = clean.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  clean = clean.replace(/^\s*\d+\.\s+(.*$)/gim, '<li style="margin-left: 20px; list-style-type: decimal; margin-bottom: 4px;">$1</li>');
  clean = clean.replace(/^\s*[\-\*]\s+(.*$)/gim, '<li style="margin-left: 20px; list-style-type: disc; margin-bottom: 4px;">$1</li>');

  clean = clean.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').slice(1, -1).map(c => c.trim());
    if (cells.every(c => /^:?-+:?$/.test(c))) {
      return '__TABLE_DIVIDER__';
    }
    return `<tr>${cells.map(c => `<td style="padding: 6px 12px; border: 1px solid var(--border);">${c}</td>`).join('')}</tr>`;
  });
  clean = clean.replace(/(<tr>[\s\S]*?<\/tr>(\s*__TABLE_DIVIDER__\s*<tr>[\s\S]*?<\/tr>)+)/g, (match) => {
    const rows = match.replace(/__TABLE_DIVIDER__/g, '').trim();
    return `<table style="width:100%; border-collapse: collapse; margin: 16px 0; font-size: 0.85em;">${rows}</table>`;
  });
  clean = clean.replace(/__TABLE_DIVIDER__/g, '');

  clean = clean.split('\n\n').map(chunk => {
    chunk = chunk.trim();
    if (!chunk) return '';
    if (chunk.startsWith('<h') || chunk.startsWith('<li') || chunk.startsWith('<table') || chunk.startsWith('<block') || chunk.startsWith('__CODE_BLOCK_')) {
      return chunk;
    }
    return `<p style="margin-bottom: 12px; line-height: 1.65; color: var(--fg); font-size: 0.95rem;">${chunk.replace(/\n/g, '<br>')}</p>`;
  }).join('\n\n');

  codeBlocks.forEach((block, i) => {
    clean = clean.replace(`__CODE_BLOCK_${i}__`, block);
  });

  return clean;
}

