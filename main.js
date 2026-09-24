/* ══════════════════════════════════════════════════════════════════
   KATAKATING — KNOWLEDGE HUB JAVASCRIPT
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
  const searchClearBtn = document.getElementById('search-clear-btn');
  const chips = document.querySelectorAll('.category-chip, .filter-pill');
  const clearFiltersBtn = document.getElementById('clear-filters') || document.getElementById('empty-reset');
  const countEl = document.getElementById('plugin-count');
  const sortSelect = document.getElementById('sort-select');
  const emptyState = document.getElementById('empty-state') || document.getElementById('search-empty');
  const grid = document.getElementById('plugin-grid');

  let cards = grid ? Array.from(grid.querySelectorAll('.plugin-card, .article-card')) : Array.from(document.querySelectorAll('.plugin-card, .article-card'));
  if (!cards.length) return;

  let activeCat = 'all';
  let query = '';

  function updateClearBtn() {
    if (searchClearBtn) {
      searchClearBtn.hidden = !(input && input.value.trim().length > 0);
    }
  }

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
    cards = grid ? Array.from(grid.querySelectorAll('.plugin-card, .article-card')) : Array.from(document.querySelectorAll('.plugin-card, .article-card'));
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
      updateClearBtn();
      apply();
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        input.value = '';
        query = '';
        updateClearBtn();
        apply();
        input.focus();
      });
    }

    window.addEventListener('keydown', (e) => {
      // Ctrl+K or / to focus search
      if ((e.key === '/' || (e.ctrlKey && e.key.toLowerCase() === 'k')) && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
        input.select();
      } else if (e.key === 'Escape' && document.activeElement === input) {
        input.value = '';
        query = '';
        updateClearBtn();
        apply();
        input.blur();
      }
    });
  }

  updateClearBtn();
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
    window.dispatchEvent(new CustomEvent('katakating-theme-change', { detail: { isLight, theme: isLight ? 'light' : 'dark' } }));
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
  clean = clean.replace(/^---$/gim, '<hr style="border: 0; border-top: 1px solid var(--line); margin: 28px 0;">');

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
    if (chunk.startsWith('<h') || chunk.startsWith('<li') || chunk.startsWith('<table') || chunk.startsWith('<block') || chunk.startsWith('<hr') || chunk.startsWith('__CODE_BLOCK_')) {
      return chunk;
    }
    return `<p style="margin-bottom: 14px; line-height: 1.65; color: var(--text); font-size: 14px;">${chunk.replace(/\n/g, '<br>')}</p>`;
  }).join('\n\n');

  codeBlocks.forEach((block, i) => {
    clean = clean.replace(`__CODE_BLOCK_${i}__`, block);
  });

  return clean;
}

// ── Interactive Card Actions (Likes, Bookmarks, Real-Time Stats) ──
async function initCardInteractions() {
  const cards = document.querySelectorAll('.plugin-card[data-id]');
  if (!cards.length) return;

  const auth = window.KataKatingAuth || window.ReadmeAuth;
  const sb = auth ? auth.client : null;

  if (sb) {
    try {
      const user = auth ? auth.user : null;

      // 1. Fetch user's own likes
      if (user) {
        const { data: userLikes } = await sb.from('guide_likes').select('guide_id').eq('user_id', user.id);
        if (userLikes) {
          userLikes.forEach(l => {
            document.querySelectorAll(`.card-btn-like[data-id="${l.guide_id}"]`).forEach(btn => {
              btn.classList.add('active-heart');
            });
          });
        }

        // 2. Fetch user's own bookmarks
        const { data: userBookmarks } = await sb.from('bookmarks').select('guide_id').eq('user_id', user.id);
        if (userBookmarks) {
          userBookmarks.forEach(b => {
            document.querySelectorAll(`.card-btn-bookmark[data-id="${b.guide_id}"]`).forEach(btn => {
              btn.classList.add('active-bookmark');
              btn.classList.add('active-star');
            });
          });
        }
      }

      // 3. Fetch aggregate counts for likes
      const { data: allLikes } = await sb.from('guide_likes').select('guide_id');
      if (allLikes) {
        const likeCounts = {};
        allLikes.forEach(l => { likeCounts[l.guide_id] = (likeCounts[l.guide_id] || 0) + 1; });
        Object.entries(likeCounts).forEach(([gid, cnt]) => {
          document.querySelectorAll(`.card-btn-like[data-id="${gid}"] .card-like-count`).forEach(el => {
            el.textContent = cnt;
          });
        });
      }

      // 4. Fetch aggregate counts for bookmarks
      const { data: allBookmarks } = await sb.from('bookmarks').select('guide_id');
      if (allBookmarks) {
        const bookmarkCounts = {};
        allBookmarks.forEach(b => { bookmarkCounts[b.guide_id] = (bookmarkCounts[b.guide_id] || 0) + 1; });
        Object.entries(bookmarkCounts).forEach(([gid, cnt]) => {
          document.querySelectorAll(`.card-btn-bookmark[data-id="${gid}"] .card-bookmark-count`).forEach(el => {
            el.textContent = cnt;
          });
        });
      }
    } catch (err) {
      console.warn('Card interactions load notice:', err);
    }
  }
}

// Global click delegation for card action buttons
let cardClickDelegated = false;
function setupCardDelegation() {
  if (cardClickDelegated) return;
  cardClickDelegated = true;

  document.addEventListener('click', async (e) => {
    const btnLike = e.target.closest('.card-btn-like');
    const btnBookmark = e.target.closest('.card-btn-bookmark');
    const auth = window.KataKatingAuth || window.ReadmeAuth;
    const sb = auth ? auth.client : null;

    if (btnLike) {
      e.preventDefault();
      e.stopPropagation();
      const articleId = btnLike.getAttribute('data-id');
      const user = auth ? auth.user : null;
      if (!user) {
        showToast('Masuk dengan GitHub atau Google untuk menyukai artikel');
        if (auth && auth.openLoginModal) auth.openLoginModal();
        return;
      }

      const isLiked = btnLike.classList.contains('active-heart');
      const countEl = btnLike.querySelector('.card-like-count');
      let count = parseInt(countEl ? countEl.textContent : '0', 10) || 0;
      const nextCount = isLiked ? Math.max(0, count - 1) : count + 1;

      document.querySelectorAll(`.card-btn-like[data-id="${articleId}"]`).forEach(btn => {
        if (isLiked) {
          btn.classList.remove('active-heart');
        } else {
          btn.classList.add('active-heart');
        }
        const c = btn.querySelector('.card-like-count');
        if (c) c.textContent = nextCount;
      });

      if (isLiked) {
        showToast('Batal menyukai artikel');
        try { localStorage.removeItem('katakating_like_' + articleId); } catch(e){}
        if (sb) await sb.from('guide_likes').delete().eq('guide_id', articleId).eq('user_id', user.id);
      } else {
        showToast('Artikel disukai!');
        try { localStorage.setItem('katakating_like_' + articleId, 'true'); } catch(e){}
        if (sb) {
          const { error } = await sb.from('guide_likes').insert({ guide_id: articleId, user_id: user.id });
          if (error) console.warn('guide_likes insert notice:', error);
        }
      }
    }

    if (btnBookmark) {
      e.preventDefault();
      e.stopPropagation();
      const articleId = btnBookmark.getAttribute('data-id');
      const user = auth ? auth.user : null;
      if (!user) {
        showToast('Masuk dengan GitHub atau Google untuk menyimpan artikel');
        if (auth && auth.openLoginModal) auth.openLoginModal();
        return;
      }

      const isSaved = btnBookmark.classList.contains('active-bookmark') || btnBookmark.classList.contains('active-star');
      const countEl = btnBookmark.querySelector('.card-bookmark-count');
      let count = parseInt(countEl ? countEl.textContent : '0', 10) || 0;
      const nextCount = isSaved ? Math.max(0, count - 1) : count + 1;

      document.querySelectorAll(`.card-btn-bookmark[data-id="${articleId}"]`).forEach(btn => {
        if (isSaved) {
          btn.classList.remove('active-bookmark');
          btn.classList.remove('active-star');
        } else {
          btn.classList.add('active-bookmark');
          btn.classList.add('active-star');
        }
        const c = btn.querySelector('.card-bookmark-count');
        if (c) c.textContent = nextCount;
      });

      if (isSaved) {
        showToast('Artikel dihapus dari simpanan');
        try { localStorage.removeItem('katakating_bookmark_' + articleId); } catch(e){}
        if (sb) await sb.from('bookmarks').delete().eq('guide_id', articleId).eq('user_id', user.id);
      } else {
        showToast('Artikel disimpan ke daftar bacaan!');
        try { localStorage.setItem('katakating_bookmark_' + articleId, 'true'); } catch(e){}
        if (sb) {
          const { error } = await sb.from('bookmarks').insert({ guide_id: articleId, user_id: user.id });
          if (error) console.warn('bookmarks insert notice:', error);
        }
      }
    }
  });
}

// ── Utility: HTML Escape ──
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Utility: Relative Time ──
function formatTimeAgo(isoString) {
  if (!isoString) return 'BARU';
  try {
    const date = new Date(isoString);
    const diffMs = Date.now() - date.getTime();
    if (diffMs < 0) return 'baru saja';
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 30) return `${Math.floor(diffDay / 30)} bln lalu`;
    if (diffDay > 0) return `${diffDay} hr lalu`;
    if (diffHour > 0) return `${diffHour} jam lalu`;
    if (diffMin > 0) return `${diffMin} mnt lalu`;
    return 'baru saja';
  } catch (e) {
    return 'BARU';
  }
}

// ── Recently Added Dynamic Section (FIFO Rolling Queue) ──
async function loadRecentlyAdded() {
  const container = document.getElementById('recent-grid');
  if (!container) return;

  try {
    // 1. Fetch static curated articles from articles.json
    let localArticles = [];
    try {
      const res = await fetch('articles/articles.json');
      if (res.ok) {
        localArticles = await res.json();
      }
    } catch (e) {
      console.warn('Could not fetch local articles.json:', e);
    }

    // 2. Fetch Supabase articles
    let dbGuides = [];
    const auth = window.KataKatingAuth || window.ReadmeAuth;
    let sb = auth ? auth.client : null;
    if (!sb && window.supabase && typeof window.supabase.createClient === 'function') {
      const SUPABASE_URL = 'https://nyywfctmbdzzypiwuilt.supabase.co';
      const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55eXdmY3RtYmR6enlwaXd1aWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNTYxMjYsImV4cCI6MjEwNTczMjEyNn0.rSE8M3hyZE-CdcDVL9Rx0NUfQddn0-tw2ltBr1wPgOQ';
      sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    if (sb) {
      try {
        const { data, error } = await sb
          .from('guides')
          .select('id, title, summary, author_name, category, initials, prodi_tags, views_count, created_at')
          .order('created_at', { ascending: false });
        if (!error && Array.isArray(data)) {
          dbGuides = data;
        }
      } catch (err) {
        console.warn('Recently added Supabase query notice:', err);
      }
    }

    // 3. Merge: Seed with localArticles (authoritative file repository)
    const mergedMap = new Map();

    localArticles.forEach(item => {
      mergedMap.set(item.id, {
        id: item.id,
        title: item.title,
        summary: item.summary,
        author_name: item.author || 'Kontributor',
        category: item.category || 'Panduan',
        initials: item.initials || (item.title ? item.title.substring(0, 4).toUpperCase() : 'DOC'),
        prodi_tags: item.tags || item.prodi_tags || ['guide'],
        views_count: item.views || 1,
        created_at: item.date ? (item.date.includes('T') ? item.date : item.date + 'T12:00:00Z') : new Date().toISOString()
      });
    });

    // Merge Supabase entries (update stats or add database-only submissions)
    dbGuides.forEach(g => {
      if (mergedMap.has(g.id)) {
        const existing = mergedMap.get(g.id);
        if (g.views_count) existing.views_count = g.views_count;
        if (g.created_at) existing.created_at = g.created_at;
        if (g.initials) existing.initials = g.initials;
      } else {
        mergedMap.set(g.id, g);
      }
    });

    // 4. Sort descending: newest created_at / date first!
    const allGuides = Array.from(mergedMap.values()).sort((a, b) => {
      const timeA = new Date(a.created_at || 0).getTime();
      const timeB = new Date(b.created_at || 0).getTime();
      return timeB - timeA;
    });

    const recentGuides = allGuides.slice(0, 3);

    if (recentGuides && recentGuides.length > 0) {
      container.innerHTML = recentGuides.map((g, idx) => {
        const monogram = escapeHtml(g.initials || (g.title ? g.title.substring(0, 4).toUpperCase() : 'DOC'));
        const title = escapeHtml(g.title || 'Untitled');
        const summary = escapeHtml(g.summary || '');
        const author = escapeHtml(g.author_name || 'Kontributor');
        const category = escapeHtml(g.category || 'Panduan');
        const timeAgo = formatTimeAgo(g.created_at);
        const tags = Array.isArray(g.prodi_tags) && g.prodi_tags.length > 0 ? g.prodi_tags : ['guide'];
        const tagSpans = tags.slice(0, 3).map(t => `<span class="card-tag">${escapeHtml(t)}</span>`).join('');
        const views = g.views_count || 0;
        const idNum = `#0${idx + 1}`;

        return `
      <!-- Recent ${idx + 1}: ${escapeHtml(g.id)} -->
      <article class="plugin-card" data-id="${escapeHtml(g.id)}" data-cat="${escapeHtml(category.toLowerCase())}">
        <div class="plugin-card-banner">
          <span class="banner-monogram">${monogram}</span>
        </div>
        <div class="plugin-card-content">
          <div class="plugin-card-header">
            <h3 class="plugin-card-title">
              <a href="article.html?id=${escapeHtml(g.id)}">${title}</a>
            </h3>
            <div class="plugin-card-actions">
              <button type="button" class="card-action-btn card-btn-bookmark" data-id="${escapeHtml(g.id)}" title="Simpan artikel" aria-label="Simpan artikel">
                <svg class="card-btn-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                <span class="card-bookmark-count">0</span>
              </button>
              <button type="button" class="card-action-btn card-btn-like" data-id="${escapeHtml(g.id)}" title="Sukai artikel" aria-label="Sukai artikel">
                <svg class="card-btn-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span class="card-like-count">0</span>
              </button>
            </div>
          </div>
          <div class="plugin-card-meta-row">
            <span class="plugin-card-by">by ${author} &bull; ${category}</span>
            <span class="plugin-card-id" title="${timeAgo}">${idNum} &bull; ${timeAgo}</span>
          </div>
          <p class="plugin-card-desc">${summary}</p>
          <div class="plugin-card-badges">
            <span class="badge-tag-new">BARU</span>
            <span class="badge-tag-verified">Verified</span>
          </div>
        </div>
        <div class="plugin-card-bottom">
          <div class="card-bottom-tags">
            ${tagSpans}
          </div>
          <div class="card-bottom-stats">
            <span class="card-stat-group" title="Jumlah pembaca">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              <span class="card-views-count" data-id="${escapeHtml(g.id)}">${views}</span>
            </span>
            <a href="article.html?id=${escapeHtml(g.id)}" class="card-read-action" title="Buka Jurnal" aria-label="Buka Jurnal">&gt;_</a>
          </div>
        </div>
      </article>`;
      }).join('');

      // Refresh interactions after dynamic render
      initCardInteractions();
    }
  } catch (err) {
    console.warn('Recently added load error:', err);
  }
}

// ── Mobile Navigation Toggle ──
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const panel = document.getElementById('mobile-nav-panel');
  if (!toggleBtn || !panel) return;

  const iconOpen = toggleBtn.querySelector('.icon-menu-open');
  const iconClose = toggleBtn.querySelector('.icon-menu-close');

  function toggleMenu(forceClose = false) {
    const isExpanded = forceClose ? true : toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
      if (iconOpen) iconOpen.style.display = 'block';
      if (iconClose) iconClose.style.display = 'none';
    } else {
      toggleBtn.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
      if (iconOpen) iconOpen.style.display = 'none';
      if (iconClose) iconClose.style.display = 'block';
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const authDrop = document.getElementById('auth-user-dropdown');
    if (authDrop) authDrop.hidden = true;
    toggleMenu();
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!panel.hidden && !panel.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(true);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      toggleMenu(true);
    }
  });

  // Close when clicking any nav item in the panel
  panel.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      toggleMenu(true);
    });
  });
}

window.refreshCardInteractions = initCardInteractions;
window.refreshRecentlyAdded = loadRecentlyAdded;

document.addEventListener('DOMContentLoaded', () => {
  initCopy();
  initSearchFilter();
  initTheme();
  setupCardDelegation();
  initMobileNav();
  loadRecentlyAdded();
  setTimeout(initCardInteractions, 300);
});
