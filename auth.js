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

  // 1. Check Session & Render Nav
  async init() {
    if (!sbClient) return;

    try {
      const { data: { session } } = await sbClient.auth.getSession();
      if (session && session.user) {
        this.user = session.user;
        await this.loadProfile();
      } else {
        this.user = null;
        this.profile = null;
      }
    } catch (err) {
      console.warn('Auth session check notice:', err);
    }

    this.renderNav();
    this.checkOnboarding();

    // Listen to Auth State Changes
    sbClient.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user) {
        this.user = session.user;
        await this.loadProfile();
      } else {
        this.user = null;
        this.profile = null;
      }
      this.renderNav();
      if (typeof window.refreshRecentlyAdded === 'function') window.refreshRecentlyAdded();
      if (typeof window.refreshCardInteractions === 'function') window.refreshCardInteractions();
    });
  },

  // 2. Fetch User Profile from public.profiles
  async loadProfile() {
    if (!sbClient || !this.user) return;
    try {
      const { data, error } = await sbClient
        .from('profiles')
        .select('*')
        .eq('id', this.user.id)
        .single();

      if (data) {
        this.profile = data;
      } else if (error) {
        // If row not created by trigger yet, create basic row
        const meta = this.user.user_metadata || {};
        const newProf = {
          id: this.user.id,
          email: this.user.email,
          full_name: meta.full_name || meta.name || meta.user_name || this.user.email.split('@')[0],
          avatar_url: meta.avatar_url || '',
          github_username: meta.user_name || ''
        };
        await sbClient.from('profiles').upsert(newProf);
        this.profile = newProf;
      }
    } catch (err) {
      console.warn('Profile fetch notice:', err);
    }
  },

  // 3. Render Navbar Auth Button / User Badge
  renderNav() {
    const container = document.getElementById('auth-nav-container');
    if (!container) return;

    if (this.user) {
      const name = (this.profile && this.profile.full_name) || this.user.email.split('@')[0];
      const avatar = (this.profile && this.profile.avatar_url) || '';
      const initial = (name.charAt(0) || 'U').toUpperCase();

      container.innerHTML = `
        <div class="auth-user-dropdown-wrap">
          <button type="button" class="auth-user-btn" id="auth-dropdown-toggle" aria-label="Menu Profil">
            ${avatar ? `<img src="${avatar}" alt="${name}" class="auth-nav-avatar">` : `<span class="auth-nav-initial">${initial}</span>`}
            <span class="auth-nav-name">${name.split(' ')[0]}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="auth-dropdown-menu" id="auth-dropdown-menu" hidden>
            <div class="auth-dropdown-header">
              <strong>${name}</strong>
              <span>${this.user.email}</span>
            </div>
            <hr class="auth-dropdown-divider">
            <a href="profile.html" class="auth-dropdown-item">Profil Saya</a>
            <a href="tulis.html" class="auth-dropdown-item">Tulis Artikel</a>
            <hr class="auth-dropdown-divider">
            <button type="button" class="auth-dropdown-item auth-logout-btn" id="btn-auth-logout">Keluar (Logout)</button>
          </div>
        </div>
      `;

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
          menu.hidden = !menu.hidden;
        });
        document.addEventListener('click', () => {
          menu.hidden = true;
        });
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
      <div class="auth-modal-card" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <div class="auth-modal-header">
          <span class="auth-modal-badge">[&gt;] KATAKATING // BOASH</span>
          <button type="button" class="auth-modal-close" id="btn-close-login" aria-label="Tutup modal">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <h3 id="auth-modal-title" class="auth-modal-title">
          Masuk ke KataKating
        </h3>
        <p class="auth-modal-desc">
          Masuk untuk menyukai panduan, menyimpan artikel favorit, dan melengkapi data profil mahasiswa Anda.
        </p>

        <div class="auth-provider-stack">
          <button type="button" class="auth-provider-btn auth-provider-github" id="btn-login-github">
            <svg class="auth-provider-icon" data-icon="brand" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span class="auth-provider-label">Lanjutkan dengan GitHub</span>
          </button>

          <button type="button" class="auth-provider-btn auth-provider-google" id="btn-login-google">
            <svg class="auth-provider-icon" data-icon="brand" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span class="auth-provider-label">Lanjutkan dengan Google</span>
          </button>
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

  // 6. OAuth Actions
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
    if (!sbClient) return;
    await sbClient.auth.signOut();
    window.location.reload();
  }
};

window.KataKatingAuth = KataKatingAuth;
window.ReadmeAuth = KataKatingAuth;

// Auto init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.KataKatingAuth.init();
});
