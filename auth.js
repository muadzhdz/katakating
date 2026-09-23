/* ══════════════════════════════════════════════════════════════════
   [>] KATAKATING — SUPABASE AUTH & IDENTITY MODULE
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
            <svg class="auth-provider-icon" width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
              <path fill-rule="evenodd" d="M8 .13c-4.42 0-8 3.6-8 8.07 0 3.57 2.3 6.58 5.47 7.65.4.08.55-.17.55-.39L6 13.96c-2.23.49-2.7-.95-2.7-.95-.35-.94-.88-1.18-.88-1.18-.73-.5.05-.5.05-.5.8.06 1.23.84 1.23.84.72 1.22 1.87.88 2.33.66.07-.52.28-.88.5-1.08-1.77-.19-3.64-.88-3.64-3.98 0-.88.32-1.6.82-2.16-.07-.2-.35-1.03.08-2.14 0 0 .68-.21 2.2.83a7.7 7.7 0 0 1 4 0c1.53-1.04 2.2-.83 2.2-.83.45 1.11.17 1.94.09 2.14.52.56.82 1.28.82 2.16 0 3.1-1.87 3.78-3.66 3.98.3.26.54.74.54 1.5v2.21c0 .22.14.47.54.4A8.1 8.1 0 0 0 16 8.2 8 8 0 0 0 8 .13" clip-rule="evenodd"/>
            </svg>
            <span class="auth-provider-label">Lanjutkan dengan GitHub</span>
          </button>

          <button type="button" class="auth-provider-btn auth-provider-google" id="btn-login-google">
            <svg class="auth-provider-icon" width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path fill="#4285F4" d="M8.16 6.55v3.1h4.3c-.18.99-.75 1.83-1.6 2.4l2.6 2.02a7.8 7.8 0 0 0 2.38-5.89q0-.85-.15-1.63z"/>
              <path fill="#34A853" d="m3.68 9.52-.59.45-2.07 1.62A8 8 0 0 0 8.16 16c2.16 0 3.97-.71 5.3-1.93l-2.6-2.02a4.78 4.78 0 0 1-7.18-2.52"/>
              <path fill="#FBBC05" d="M1.02 4.41a7.9 7.9 0 0 0 0 7.18l2.66-2.07a4.8 4.8 0 0 1 0-3.04z"/>
              <path fill="#EA4335" d="M8.16 3.19c1.18 0 2.23.4 3.06 1.19l2.3-2.3a7.99 7.99 0 0 0-12.5 2.33l2.66 2.07c.63-1.9 2.4-3.3 4.48-3.3"/>
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

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
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

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
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
