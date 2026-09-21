/* ══════════════════════════════════════════════════════════════════
   THE PENGUIN CIRCLE — TRM KNOWLEDGE HUB SCRIPT
   Interactive Command Engine, Live Search, Audio Synthesizer,
   Theme Manager, and Zero-Dependency Utilities
   ══════════════════════════════════════════════════════════════════ */

// ── Web Audio API Click Synthesizer (Zero External Audio Assets) ──
let audioCtx = null;
let soundEnabled = localStorage.getItem('tpc_sound') === 'true';

function playClickSound() {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.025);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.025);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.025);
  } catch (e) {
    // AudioContext blocked or not supported
  }
}

// ── Live Clock (WIB) ──
function initClock() {
  const el = document.getElementById('live-clock');
  if (!el) return;
  const update = () => {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    el.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} WIB`;
  };
  update();
  setInterval(update, 1000);
}

// ── Preloader ──
(function initPreloader() {
  const progress = document.getElementById('pre-progress');
  const text = document.getElementById('pre-text');
  if (!progress) return;

  let pct = 0;
  const iv = setInterval(() => {
    pct = Math.min(pct + Math.random() * 22 + 6, 100);
    progress.style.width = pct + '%';
    if (text && pct < 40) text.textContent = 'INITIALIZING KERNEL...';
    else if (text && pct < 80) text.textContent = 'MOUNTING TRM CATALOG...';
    else if (text) text.textContent = 'SYSTEM READY.';

    if (pct >= 100) {
      clearInterval(iv);
      setTimeout(() => {
        document.body.classList.add('loaded');
        setTimeout(() => {
          const pre = document.getElementById('preloader');
          if (pre) pre.style.display = 'none';
        }, 900);
      }, 250);
    }
  }, 45);
})();

// ── Reading Progress Bar ──
function initReadingProgress() {
  const bar = document.getElementById('read-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const current = window.scrollY;
    const pct = total > 0 ? (current / total) * 100 : 0;
    bar.style.width = `${pct}%`;
  }, { passive: true });
}

// ── Toast Notification System ──
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  playClickSound();
  const textEl = document.getElementById('toast-msg') || toast;
  textEl.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ── 1-Click Code Copy ──
function initCopyButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-copy');
    if (!btn) return;
    const targetId = btn.getAttribute('data-target');
    const codeEl = targetId ? document.getElementById(targetId) : btn.closest('.code-box')?.querySelector('code');
    if (!codeEl) return;

    const textToCopy = codeEl.textContent.trim();
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = btn.innerHTML;
      btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Tersalin!`;
      showToast('[OK] Perintah berhasil disalin ke clipboard!');
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2000);
    }).catch(() => {
      showToast('[ERR] Gagal menyalin secara otomatis.');
    });
  });
}

// ── Interactive Catalog Search & Filtering ──
function initCatalogFilter() {
  const searchInp = document.getElementById('catalog-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.guide-card');
  const emptyState = document.getElementById('catalog-empty');
  const countDisplay = document.getElementById('catalog-count');

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilter() {
    let visibleCount = 0;
    cards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const text = card.textContent.toLowerCase();
      const matchCategory = activeCategory === 'all' || category === activeCategory;
      const matchSearch = searchQuery === '' || text.includes(searchQuery);

      if (matchCategory && matchSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
    if (countDisplay) {
      countDisplay.textContent = `${visibleCount} Panduan Tersedia`;
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter') || 'all';
      applyFilter();
    });
  });

  if (searchInp) {
    searchInp.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilter();
    });

    // Keyboard shortcut '/' to focus search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInp) {
        e.preventDefault();
        searchInp.focus();
        searchInp.select();
      } else if (e.key === 'Escape' && document.activeElement === searchInp) {
        searchInp.value = '';
        searchQuery = '';
        applyFilter();
        searchInp.blur();
      }
    });
  }
}

// ── Mobile Drawer ──
function initMobileMenu() {
  const hbg = document.getElementById('hbg-btn');
  const drawer = document.getElementById('mob-drawer');
  if (!hbg || !drawer) return;

  const toggle = () => {
    playClickSound();
    const isOpen = drawer.classList.toggle('open');
    hbg.classList.toggle('open', isOpen);
    hbg.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hbg.addEventListener('click', toggle);

  drawer.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hbg.classList.remove('open');
      hbg.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ── Theme Manager ──
function initTheme() {
  const themeBtn = document.getElementById('theme-btn');
  const html = document.documentElement;
  const saved = localStorage.getItem('tpc_theme');
  if (saved === 'light') {
    html.classList.add('light');
  }

  if (!themeBtn) return;
  themeBtn.addEventListener('click', () => {
    playClickSound();
    const isLight = html.classList.toggle('light');
    localStorage.setItem('tpc_theme', isLight ? 'light' : 'dark');
    showToast(isLight ? '[THEME] Mode Terang diaktifkan' : '[THEME] Mode Gelap diaktifkan');
  });
}

// ── Sound Toggle ──
function initSound() {
  const soundBtn = document.getElementById('sound-btn');
  if (!soundBtn) return;
  const updateIcon = () => {
    soundBtn.style.color = soundEnabled ? 'var(--accent)' : 'var(--secondary)';
    soundBtn.title = soundEnabled ? 'Audio Aktif' : 'Audio Nonaktif';
  };
  updateIcon();

  soundBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    localStorage.setItem('tpc_sound', String(soundEnabled));
    updateIcon();
    if (soundEnabled) {
      playClickSound();
      showToast('[AUDIO] Audio efek klik diaktifkan');
    } else {
      showToast('[AUDIO] Audio efek klik dibisukan');
    }
  });
}

// ── Scroll Reveal ──
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('in'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

// ── Scroll To Top ──
function initScrollTop() {
  const stb = document.getElementById('stb');
  if (!stb) return;
  window.addEventListener('scroll', () => {
    stb.classList.toggle('vis', window.scrollY > 400);
  }, { passive: true });
  stb.addEventListener('click', () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── DOM Ready Kickoff ──
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initReadingProgress();
  initCopyButtons();
  initCatalogFilter();
  initMobileMenu();
  initTheme();
  initSound();
  initReveal();
  initScrollTop();
});
