/* ══════════════════════════════════════════════════════════════════
   KATAKATING — SUPABASE AUTH & IDENTITY MODULE
   GitHub OAuth, Google OAuth, Identity Linking, Profiles, Likes, Bookmarks
   ══════════════════════════════════════════════════════════════════ */

const SUPABASE_URL = 'https://nyywfctmbdzzypiwuilt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55eXdmY3RtYmR6enlwaXd1aWx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNTYxMjYsImV4cCI6MjEwNTczMjEyNn0.rSE8M3hyZE-CdcDVL9Rx0NUfQddn0-tw2ltBr1wPgOQ';

// Initialize Supabase Client
let sbClient = null;
if (window.supabase && typeof window.supabase.createClient === 'function') {
  sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Global Auth State
const KataKatingAuth = {
  client: sbClient,
  user: null,
  profile: null,

  // Helper: extract Google avatar from user metadata / identities
  getGoogleAvatar(user = this.user) {
    if (!user) return null;
    const meta = user.user_metadata || {};
    const gIdent = user.identities?.find(i => i.provider === 'google');
    return meta.picture || meta.avatar_url || gIdent?.identity_data?.picture || gIdent?.identity_data?.avatar_url || null;
  },

  // Helper: extract GitHub avatar from user metadata / identities
  getGitHubAvatar(user = this.user, profile = this.profile) {
    if (!user) return null;
    const meta = user.user_metadata || {};
    const ghIdent = user.identities?.find(i => i.provider === 'github');
    const ghUser = (profile && profile.github_username) || meta.user_name || ghIdent?.identity_data?.user_name;
    if (ghUser) {
      return `https://github.com/${ghUser}.png`;
    }
    return ghIdent?.identity_data?.avatar_url || null;
  },

  // Helper: clean initial fallback SVG data URL
  getInitialSvg(nameOrEmail, bgColor = '#18181b', textColor = '#22c55e') {
    const char = ((nameOrEmail || 'U').trim().charAt(0) || 'U').toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="${bgColor}"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,monospace" font-size="28" font-weight="700" fill="${textColor}">${char}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  },

  // Cache persistence for instant 0ms flicker-free hydration
  hydrateCache() {
    try {
      const adminSess = JSON.parse(localStorage.getItem('katakating_admin_session') || 'null');
      if (adminSess && adminSess.email === 'katakating@gmail.com') {
        this.user = {
          id: 'admin-katakating',
          email: 'katakating@gmail.com',
          user_metadata: {
            full_name: 'Dewan Redaksi KATAKATING',
            role: 'admin'
          }
        };
        this.profile = {
          id: 'admin-katakating',
          email: 'katakating@gmail.com',
          full_name: 'Dewan Redaksi KATAKATING',
          role: 'admin',
          nim: 'REDAKSI-01',
          prodi: 'Dewan Redaksi HIMATRA'
        };
        return true;
      }

      const cached = JSON.parse(localStorage.getItem('katakating_auth_cache') || 'null');
      if (cached && cached.user) {
        this.user = cached.user;
        this.profile = cached.profile || null;
        return true;
      }
    } catch (e) {
      console.warn('Hydrate cache notice:', e);
    }
    return false;
  },

  saveCache() {
    try {
      if (this.user && this.user.id !== 'admin-katakating') {
        localStorage.setItem('katakating_auth_cache', JSON.stringify({
          user: this.user,
          profile: this.profile
        }));
      }
    } catch (e) {
      console.warn('Save cache notice:', e);
    }
  },

  clearCache() {
    try {
      localStorage.removeItem('katakating_auth_cache');
      localStorage.removeItem('katakating_admin_session');
    } catch (e) {}
  },

  // Update profile avatar across database, memory, and cache
  async updateAvatar(newAvatarUrl) {
    if (!this.user || !sbClient) return { success: false, error: 'Belum login' };
    try {
      const { error } = await sbClient
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', this.user.id);

      if (error) throw error;

      if (!this.profile) {
        this.profile = { id: this.user.id, email: this.user.email };
      }
      this.profile.avatar_url = newAvatarUrl;
      this.saveCache();
      this.renderNav();
      window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: { user: this.user, profile: this.profile } }));
      return { success: true };
    } catch (err) {
      console.error('Update avatar error:', err);
      return { success: false, error: err.message };
    }
  },

  // 1. Check Session & Render Nav
  async init() {
    // 0. Synchronously hydrate cached state and render immediately to eliminate blank/flicker
    this.hydrateCache();
    this.renderNav();

    if (this.user && this.user.id === 'admin-katakating') {
      window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: { user: this.user, profile: this.profile } }));
      return;
    }

    if (!sbClient) return;

    // 1. Asynchronously verify session from Supabase
    try {
      const { data: { session } } = await sbClient.auth.getSession();
      if (session && session.user) {
        this.user = session.user;
        await this.loadProfile();
      } else {
        if (this.user && this.user.id !== 'admin-katakating') {
          this.user = null;
          this.profile = null;
          this.clearCache();
        }
      }
    } catch (err) {
      console.warn('Auth session check notice:', err);
    }

    this.renderNav();
    this.checkOnboarding();
    window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: { user: this.user, profile: this.profile } }));

    // 2. Listen to Auth State Changes
    sbClient.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user) {
        this.user = session.user;
        await this.loadProfile();
      } else {
        this.user = null;
        this.profile = null;
        this.clearCache();
      }
      this.renderNav();
      window.dispatchEvent(new CustomEvent('auth-state-changed', { detail: { user: this.user, profile: this.profile } }));
      if (typeof window.refreshRecentlyAdded === 'function') window.refreshRecentlyAdded();
      if (typeof window.refreshCardInteractions === 'function') window.refreshCardInteractions();
    });
  },

  // 2. Fetch User Profile from public.profiles
  async loadProfile() {
    if (!sbClient || !this.user) return;
    if (this.user.id === 'admin-katakating') return;

    try {
      const { data, error } = await sbClient
        .from('profiles')
        .select('*')
        .eq('id', this.user.id)
        .single();

      const meta = this.user.user_metadata || {};
      const googleAvatar = this.getGoogleAvatar(this.user);
      const ghAvatar = this.getGitHubAvatar(this.user, this.profile);
      const detectedAvatar = googleAvatar || ghAvatar || meta.avatar_url || meta.picture || '';
      const fullName = meta.full_name || meta.name || meta.user_name || this.user.email.split('@')[0];
      const ghUser = meta.user_name || this.user.identities?.find(i => i.provider === 'github')?.identity_data?.user_name || '';

      if (data) {
        this.profile = data;
        let needsUpdate = false;
        const updates = {};

        // Backfill avatar if empty in DB
        if (!this.profile.avatar_url && detectedAvatar) {
          this.profile.avatar_url = detectedAvatar;
          updates.avatar_url = detectedAvatar;
          needsUpdate = true;
        }
        // Backfill github_username if empty in DB
        if (!this.profile.github_username && ghUser) {
          this.profile.github_username = ghUser;
          updates.github_username = ghUser;
          needsUpdate = true;
        }

        if (needsUpdate) {
          await sbClient.from('profiles').update(updates).eq('id', this.user.id);
        }
      } else if (error) {
        // If row not created by trigger yet, create basic row
        const newProf = {
          id: this.user.id,
          email: this.user.email,
          full_name: fullName,
          avatar_url: detectedAvatar,
          github_username: ghUser
        };
        await sbClient.from('profiles').upsert(newProf);
        this.profile = newProf;
      }
      this.saveCache();
    } catch (err) {
      console.warn('Profile fetch notice:', err);
    }
  },

  renderNav() {
    const container = document.getElementById('auth-nav-container');
    if (!container) return;

    const isAdmin = this.user && (
      this.user.email === 'katakating@gmail.com' ||
      (this.profile && this.profile.role === 'admin') ||
      this.user.user_metadata?.role === 'admin' ||
      this.user.id === 'admin-katakating'
    );

    const name = (this.profile && this.profile.full_name) ||
                 (this.user && (this.user.user_metadata?.full_name || this.user.user_metadata?.name || this.user.email.split('@')[0])) ||
                 '';
    const avatar = (this.profile && this.profile.avatar_url) ||
                   (this.user && (this.user.user_metadata?.avatar_url || this.user.user_metadata?.picture)) ||
                   '';
    const initial = (name.charAt(0) || (this.user && this.user.email ? this.user.email.charAt(0) : 'U')).toUpperCase();

    // Idempotency fingerprint prevents destroying DOM when state has not changed (eliminates flicker)
    const renderKey = this.user
      ? `${this.user.id}|${avatar}|${name}|${isAdmin ? 'admin' : 'user'}`
      : 'guest';

    if (container.dataset.renderedKey === renderKey) {
      return;
    }
    container.dataset.renderedKey = renderKey;

    if (this.user) {
      const profileUrl = isAdmin ? 'admin-profile.html' : 'profile.html';
      const shortName = name.split(' ')[0] || 'User';

      container.innerHTML = `
        <div class="auth-user-dropdown-wrap">
          <button type="button" class="auth-user-btn" id="auth-dropdown-toggle" aria-label="Menu Profil" aria-expanded="false">
            ${avatar
              ? `<img src="${avatar}" alt="${name}" class="auth-nav-avatar" onerror="this.outerHTML='<span class=\\'auth-nav-initial\\'>${initial}</span>'">`
              : `<span class="auth-nav-initial">${initial}</span>`}
            <span class="auth-nav-name">${shortName}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="auth-dropdown-menu" id="auth-dropdown-menu" hidden>
            <div class="auth-dropdown-header">
              <strong>${name}</strong>
              <span>${this.user.email}</span>
            </div>
            <hr class="auth-dropdown-divider">
            <a href="upload.html" class="auth-dropdown-item">Upload Catatan</a>
            <a href="${profileUrl}" class="auth-dropdown-item">Profil Saya</a>
            <hr class="auth-dropdown-divider">
            <button type="button" class="auth-dropdown-item auth-logout-btn" id="btn-auth-logout">Keluar (Logout)</button>
          </div>
        </div>
      `;

      // Inject Panel Admin link into desktop nav if admin
      const navLinks = document.querySelector('.market-nav-links');
      if (navLinks) {
        const existing = navLinks.querySelector('#nav-admin-link');
        if (isAdmin && !existing) {
          const adminLink = document.createElement('a');
          adminLink.id = 'nav-admin-link';
          adminLink.href = 'admin.html';
          adminLink.setAttribute('aria-label', 'Panel Admin');
          adminLink.textContent = 'Panel Admin';
          if (window.location.pathname.endsWith('admin.html') || window.location.pathname.endsWith('admin-profile.html')) {
            adminLink.classList.add('active');
          }
          const githubLink = navLinks.querySelector('.market-icon-link');
          navLinks.insertBefore(adminLink, githubLink || null);
        } else if (!isAdmin && existing) {
          existing.remove();
        }
      }

      // Inject Panel Admin link into mobile nav panel if admin
      const mobInner = document.querySelector('.mobile-nav-panel .mobile-nav-inner');
      if (mobInner) {
        const existingMob = mobInner.querySelector('#mobile-nav-admin-link');
        if (isAdmin && !existingMob) {
          const mobAdminLink = document.createElement('a');
          mobAdminLink.id = 'mobile-nav-admin-link';
          mobAdminLink.href = 'admin.html';
          mobAdminLink.className = 'mobile-nav-item' + (window.location.pathname.endsWith('admin.html') || window.location.pathname.endsWith('admin-profile.html') ? ' active' : '');
          mobAdminLink.innerHTML = `<span class="mobile-nav-num">[04]</span><span class="mobile-nav-label">Panel Admin</span>`;
          const divider = mobInner.querySelector('.mobile-nav-divider');
          mobInner.insertBefore(mobAdminLink, divider || null);
        } else if (!isAdmin && existingMob) {
          existingMob.remove();
        }
      }

      // Dropdown toggle
      const toggle = document.getElementById('auth-dropdown-toggle');
      const menu = document.getElementById('auth-dropdown-menu');
      if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
          e.stopPropagation();
          const mobPanel = document.getElementById('mobile-nav-panel');
          const mobBtn = document.getElementById('mobile-menu-btn');
          if (mobPanel && !mobPanel.hidden) {
            mobPanel.hidden = true;
            if (mobBtn) {
              mobBtn.setAttribute('aria-expanded', 'false');
              const iconOpen = mobBtn.querySelector('.icon-menu-open');
              const iconClose = mobBtn.querySelector('.icon-menu-close');
              if (iconOpen) iconOpen.style.display = 'block';
              if (iconClose) iconClose.style.display = 'none';
            }
          }
          const isHidden = menu.hidden;
          menu.hidden = !isHidden;
          toggle.setAttribute('aria-expanded', String(!isHidden));
        });
      }

      // Guarded single document click listener
      if (!window._authDocClickListenerAttached) {
        document.addEventListener('click', (e) => {
          const m = document.getElementById('auth-dropdown-menu');
          const t = document.getElementById('auth-dropdown-toggle');
          if (m && !m.hidden && t && !t.contains(e.target) && !m.contains(e.target)) {
            m.hidden = true;
            t.setAttribute('aria-expanded', 'false');
          }
        });
        window._authDocClickListenerAttached = true;
      }

      // Logout handler
      const btnLogout = document.getElementById('btn-auth-logout');
      if (btnLogout) {
        btnLogout.addEventListener('click', async () => {
          await this.signOut();
        });
      }
    } else {
      container.innerHTML = `
        <button type="button" class="button auth-login-btn" id="btn-open-login" aria-label="Masuk">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          Masuk
        </button>
      `;

      // Remove admin link if present (user logged out)
      const navLinks = document.querySelector('.market-nav-links');
      if (navLinks) {
        const existing = navLinks.querySelector('#nav-admin-link');
        if (existing) existing.remove();
      }

      const mobInner = document.querySelector('.mobile-nav-panel .mobile-nav-inner');
      if (mobInner) {
        const existingMob = mobInner.querySelector('#mobile-nav-admin-link');
        if (existingMob) existingMob.remove();
      }

      const btnLogin = document.getElementById('btn-open-login');
      if (btnLogin) {
        btnLogin.addEventListener('click', () => {
          this.openLoginModal();
        });
      }
    }
  },

  // 4. Login Modal Trigger
  openLoginModal() {
    let modal = document.getElementById('login-modal');
    if (!modal) {
      this.createLoginModalDOM();
      modal = document.getElementById('login-modal');
    }
    if (modal) modal.hidden = false;
  },

  closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.hidden = true;
  },

  createLoginModalDOM() {
    const div = document.createElement('div');
    div.id = 'login-modal';
    div.className = 'auth-modal-overlay';
    div.hidden = true;
    div.innerHTML = `
      <div class="auth-modal-card" style="max-width: 440px;" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <div class="auth-modal-header">
          <span class="auth-modal-badge">[&gt;] KATAKATING // BOASH</span>
          <button type="button" class="auth-modal-close" id="btn-close-login" aria-label="Tutup modal">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <h3 id="auth-modal-title" class="auth-modal-title" style="margin-bottom: 4px;">
          Masuk ke KataKating
        </h3>

        <!-- Dual Tab Switcher -->
        <div style="display: flex; gap: 8px; margin: 14px 0 16px; border-bottom: 1px solid var(--line); padding-bottom: 10px;">
          <button type="button" class="admin-filter-pill active" id="tab-login-student" style="flex: 1; text-align: center;">
            Masuk Mahasiswa
          </button>
          <button type="button" class="admin-filter-pill" id="tab-login-editorial" style="flex: 1; text-align: center;">
            Admin
          </button>
        </div>

        <!-- PANEL 1: MAHASISWA (OAUTH GOOGLE & GITHUB) -->
        <div id="panel-login-student">
          <p class="auth-modal-desc" style="margin-bottom: 18px; text-align: left;">
            Masuk menggunakan akun Google atau GitHub Anda untuk mengunggah naskah dokumen, menyukai panduan, dan menyimpan catatan.
          </p>

          <div class="auth-provider-stack">
            <button type="button" class="auth-provider-btn auth-provider-google" id="btn-login-google">
              <svg class="auth-provider-icon" data-icon="brand" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span class="auth-provider-label">Lanjutkan dengan Google</span>
            </button>

            <button type="button" class="auth-provider-btn auth-provider-github" id="btn-login-github">
              <svg class="auth-provider-icon" data-icon="brand" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span class="auth-provider-label">Lanjutkan dengan GitHub</span>
            </button>
          </div>
        </div>

        <!-- PANEL 2: ADMIN -->
        <div id="panel-login-editorial" style="display: none;">
          <p class="auth-modal-desc" style="margin-bottom: 14px; text-align: left;">
            Kredensial khusus administrator untuk mengurasi antrean naskah dan mempublikasikan dokumen.
          </p>
          <form id="form-editorial-login" onsubmit="return false;">
            <div style="margin-bottom: 10px; text-align: left;">
              <label for="editorial-login-email" style="display: block; font-family: var(--mono); font-size: 11px; color: var(--muted); margin-bottom: 4px; text-transform: uppercase;">
                Email / Username Admin:
              </label>
              <input type="text" id="editorial-login-email" class="form-input" placeholder="Masukkan email atau username" style="width: 100%; font-size: 12.5px; padding: 8px 12px; font-family: var(--mono);" required autocomplete="username">
            </div>
            <div style="margin-bottom: 16px; text-align: left;">
              <label for="editorial-login-pass" style="display: block; font-family: var(--mono); font-size: 11px; color: var(--muted); margin-bottom: 4px; text-transform: uppercase;">
                Kata Sandi Admin:
              </label>
              <input type="password" id="editorial-login-pass" class="form-input" placeholder="Masukkan kata sandi..." style="width: 100%; font-size: 12.5px; padding: 8px 12px;" required autocomplete="current-password">
            </div>
            <button type="submit" id="btn-submit-editorial" class="button market-primary" style="width: 100%; justify-content: center; min-height: 38px; font-weight: 700;">
              Masuk sebagai Admin
            </button>
          </form>
        </div>

        <div class="auth-modal-footer">
          Repositori Pengetahuan Resmi Mahasiswa &bull; Universitas Boash
        </div>
      </div>
    `;
    document.body.appendChild(div);

    document.getElementById('btn-close-login').addEventListener('click', () => this.closeLoginModal());
    div.addEventListener('click', (e) => {
      if (e.target === div) this.closeLoginModal();
    });

    // Tab switcher
    const tabStudent = document.getElementById('tab-login-student');
    const tabEditorial = document.getElementById('tab-login-editorial');
    const panelStudent = document.getElementById('panel-login-student');
    const panelEditorial = document.getElementById('panel-login-editorial');

    if (tabStudent && tabEditorial && panelStudent && panelEditorial) {
      tabStudent.addEventListener('click', () => {
        tabStudent.classList.add('active');
        tabEditorial.classList.remove('active');
        panelStudent.style.display = 'block';
        panelEditorial.style.display = 'none';
      });

      tabEditorial.addEventListener('click', () => {
        tabEditorial.classList.add('active');
        tabStudent.classList.remove('active');
        panelEditorial.style.display = 'block';
        panelStudent.style.display = 'none';
      });
    }

    // Submit Editorial / Admin
    const formEditorial = document.getElementById('form-editorial-login');
    if (formEditorial) {
      formEditorial.addEventListener('submit', async () => {
        const email = document.getElementById('editorial-login-email').value;
        const pass = document.getElementById('editorial-login-pass').value;
        await this.signInWithEmailPassword(email, pass, true);
      });
    }

    document.getElementById('btn-login-github').addEventListener('click', () => this.signInWithGitHub());
    document.getElementById('btn-login-google').addEventListener('click', () => this.signInWithGoogle());
  },

  // 5. Onboarding Check (Prompt NIM / Prodi once if missing)
  checkOnboarding() {
    if (!this.user || !this.profile) return;
    if (this.profile.nim && this.profile.prodi) return;

    // Show onboarding modal
    let modal = document.getElementById('onboarding-modal');
    if (!modal) {
      this.createOnboardingModalDOM();
      modal = document.getElementById('onboarding-modal');
    }
    if (modal) modal.hidden = false;
  },

  createOnboardingModalDOM() {
    const div = document.createElement('div');
    div.id = 'onboarding-modal';
    div.className = 'auth-modal-overlay';
    div.hidden = true;
    div.innerHTML = `
      <div class="auth-modal-card" style="max-width: 480px;" role="dialog" aria-modal="true">
        <div class="auth-modal-header">
          <div class="page-eyebrow">// ONBOARDING // UNIVERSITAS BOASH</div>
        </div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--heading); margin: 6px 0 8px;">
          Lengkapi Identitas Mahasiswa
        </h3>
        <p style="font-size: 13px; color: var(--muted); line-height: 1.5; margin-bottom: 18px;">
          Lengkapi data studi sekali saja agar nama dan program studi Anda otomatis tercantum saat menulis naskah praktikum.
        </p>

        <form id="onboarding-form" onsubmit="return false;" style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <label class="form-label" for="ob-fullname">Nama Lengkap Mahasiswa *</label>
            <input type="text" id="ob-fullname" class="form-input" value="${(this.profile && this.profile.full_name) || ''}" required>
          </div>

          <div class="form-row" style="margin-bottom: 0;">
            <div>
              <label class="form-label" for="ob-nim">NIM / NPM *</label>
              <input type="text" id="ob-nim" class="form-input" placeholder="Contoh: 24903460014" required>
            </div>
            <div>
              <label class="form-label" for="ob-angkatan">Angkatan *</label>
              <select id="ob-angkatan" class="form-select">
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024" selected>2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>

          <div class="form-row" style="margin-bottom: 0;">
            <div>
              <label class="form-label" for="ob-fakultas">Fakultas *</label>
              <select id="ob-fakultas" class="form-select">
                <option value="FSTI" selected>FSTI (Sains & Tek)</option>
                <option value="FEB">FEB (Ekonomi & Bisnis)</option>
                <option value="FH">FH (Hukum)</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label class="form-label" for="ob-prodi">Program Studi *</label>
              <select id="ob-prodi" class="form-select">
                <option value="TRM" selected>Teknologi Rekayasa Multimedia</option>
                <option value="Mekatronika">Teknologi Rekayasa Mekatronika</option>
                <option value="Industri">Teknologi Rekayasa Industri</option>
                <option value="Informatika">Teknik Informatika</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="SRK">Sistem Rekayasa Komputer</option>
              </select>
            </div>
          </div>

          <div style="margin-top: 10px; display: flex; gap: 10px; justify-content: flex-end;">
            <button type="submit" class="button market-primary" id="btn-save-onboarding" style="min-height: 38px;">
              Simpan Identitas
            </button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(div);
    if (window.setupCyberSelect) {
      div.querySelectorAll('select.form-select').forEach(window.setupCyberSelect);
    }

    document.getElementById('onboarding-form').addEventListener('submit', async () => {
      const full_name = document.getElementById('ob-fullname').value.trim();
      const nim = document.getElementById('ob-nim').value.trim();
      const angkatan = parseInt(document.getElementById('ob-angkatan').value, 10);
      const fakultas = document.getElementById('ob-fakultas').value;
      const prodi = document.getElementById('ob-prodi').value;

      if (!full_name || !nim) {
        if (typeof showToast === 'function') showToast('Mohon lengkapi Nama dan NIM');
        return;
      }

      try {
        const { error } = await sbClient
          .from('profiles')
          .update({ full_name, nim, angkatan, fakultas, prodi })
          .eq('id', this.user.id);

        if (!error) {
          if (this.profile) {
            this.profile.full_name = full_name;
            this.profile.nim = nim;
            this.profile.angkatan = angkatan;
            this.profile.fakultas = fakultas;
            this.profile.prodi = prodi;
          }
          document.getElementById('onboarding-modal').hidden = true;
          if (typeof showToast === 'function') showToast('Identitas mahasiswa berhasil disimpan');
          this.renderNav();
        } else {
          alert('Gagal menyimpan identitas: ' + error.message);
        }
      } catch (e) {
        console.error(e);
      }
    });
  },

  // 6. Email & Password and OAuth Actions
  async signInWithEmailPassword(email, password, isEditorial = false) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanEmail || !cleanPass) {
      if (typeof showToast === 'function') showToast('Mohon lengkapi email dan kata sandi');
      return { success: false, error: 'Email dan kata sandi wajib diisi' };
    }

    if (!sbClient) {
      if (typeof showToast === 'function') showToast('Koneksi autentikasi Supabase tidak tersedia');
      return { success: false, error: 'Supabase client belum siap' };
    }

    try {
      const { data, error } = await sbClient.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPass
      });

      if (error) {
        const msg = error.message === 'Invalid login credentials'
          ? 'Email atau kata sandi tidak valid'
          : error.message;
        if (typeof showToast === 'function') showToast(msg);
        return { success: false, error: msg };
      }

      if (data && data.user) {
        this.user = data.user;
        await this.loadProfile();

        // Check if user has administrator privileges
        const isAdmin = data.user.email === 'katakating@gmail.com' ||
                        (this.profile && this.profile.role === 'admin') ||
                        data.user.user_metadata?.role === 'admin' ||
                        data.user.app_metadata?.role === 'admin';

        if (isEditorial && !isAdmin) {
          await sbClient.auth.signOut();
          this.user = null;
          this.profile = null;
          if (typeof showToast === 'function') showToast('Akun ini tidak memiliki hak akses administrator');
          return { success: false, error: 'Bukan akun administrator' };
        }

        if (isAdmin) {
          localStorage.setItem('katakating_admin_session', JSON.stringify({
            email: data.user.email,
            full_name: (this.profile && this.profile.full_name) || data.user.user_metadata?.full_name || 'Admin KATAKATING',
            role: 'admin',
            authenticated_at: new Date().toISOString()
          }));
        }

        this.renderNav();
        this.closeLoginModal();
        if (typeof showToast === 'function') showToast(isAdmin ? 'Berhasil masuk sebagai Admin KATAKATING' : 'Berhasil masuk ke akun Anda');
        if (typeof updateAuthViewState === 'function') updateAuthViewState();
        if (typeof window.checkAdminAuth === 'function') window.checkAdminAuth();
        if (window.location.pathname.endsWith('upload.html') || window.location.pathname.endsWith('admin.html')) {
          setTimeout(() => { window.location.reload(); }, 350);
        }
        return { success: true, role: isAdmin ? 'admin' : 'student' };
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.message || 'Terjadi kesalahan saat masuk';
      if (typeof showToast === 'function') showToast(msg);
      return { success: false, error: msg };
    }
  },

  async signInWithGitHub() {
    if (!sbClient) return;
    await sbClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.href
      }
    });
  },

  async signInWithGoogle() {
    if (!sbClient) return;
    await sbClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.href
      }
    });
  },

  async linkGitHub() {
    if (!sbClient) return;
    await sbClient.auth.linkIdentity({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + '/profile.html'
      }
    });
  },

  async signOut() {
    this.clearCache();
    if (sbClient) {
      try {
        await sbClient.auth.signOut();
      } catch (err) {
        console.warn('Signout notice:', err);
      }
    }
    this.user = null;
    this.profile = null;
    const container = document.getElementById('auth-nav-container');
    if (container) container.dataset.renderedKey = '';
    this.renderNav();
    if (typeof showToast === 'function') showToast('Anda telah keluar dari akun');
    setTimeout(() => {
      window.location.reload();
    }, 350);
  }
};

window.KataKatingAuth = KataKatingAuth;
window.ReadmeAuth = KataKatingAuth;

// Auto init on DOM ready or immediate if ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.KataKatingAuth.init();
  });
} else {
  window.KataKatingAuth.init();
}
