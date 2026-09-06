# The Penguin Circle — Simulasi Alur Lengkap

> Panduan operasional dari sisi Mentor (lo) dan sisi Peserta.
> Mencakup siklus penuh: persiapan, 8 segmen, 3 buffer, dan warisan digital.
> Dokumen ini sejalan dengan `KURIKULUM-8-SEGMEN.md` (versi berbasis produk).

---

## Daftar Isi

1. [Filosofi & Alur Kerja Inti](#1-filosofi--alur-kerja-inti)
2. [Persiapan (Mei 2026)](#2-persiapan-mei-2026)
3. [Flow Per Segmen — Mingguan](#3-flow-per-segmen--mingguan)
4. [Flow Per Segmen — Project Week](#4-flow-per-segmen--project-week)
5. [Timeline 12 Bulan](#5-timeline-12-bulan)
6. [Siklus Kolaborasi Tim (S7-S8)](#6-siklus-kolaborasi-tim-s7-s8)
7. [Multimedia Survival Kit (Overlap)](#7-multimedia-survival-kit-overlap)
8. [Warisan Digital (Akhir Tahun)](#8-warisan-digital-akhir-tahun)
9. [Referensi Cepat Git & Deploy](#9-referensi-cepat-git--deploy)
10. [Diagram Alur](#10-diagram-alur)

---

## 1. Filosofi & Alur Kerja Inti

### Filosofi

The Penguin Circle sekarang adalah **simulasi pembuatan produk digital**.
Peserta belajar **alur**: dari ide → dokumen rancangan → kode → database →
deploy → produk hidup di internet. Semua berpusat pada tiga alat:

```
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  AI Agent    │   │   Git/GitHub │   │   VS Code    │
│  (menulis)   │   │  (versi)     │   │  (melihat)   │
└──────┬──────┘   └──────┬──────┘   └──────┬──────┘
       └─────────────────┼──────────────────┘
                         ▼
              ┌─────────────────────┐
              │  Produk Digital     │
              │  (web app penuh)    │
              └─────────────────────┘
```

### Alur Kerja Inti (dipakai di Setiap Segmen)

```
1. Buka Terminal WSL di folder project
2. Jalankan AI Agent (opencode / claude)
3. Perintahkan AI menulis file (dokumen .md atau kode)
4. Buat hasilnya di VS Code (lihat, koreksi, kelola)
5. Simpan perubahan: git add → commit → push
6. (Tim) kolaborasi lewat branch → Pull Request → merge
```

> ⚠️ **Peran alat:**
> - **Terminal WSL** → menjalankan AI Agent & perintah inti
> - **VS Code** → melihat & mengelola hasil kerja (bukan editor terminal)
> - **AI Agent** → menulis & men-debug file
> - **Git/GitHub** → version control & kolaborasi
> - **Vercel / Supabase / Cloudinary** → deploy, database, media

---

## 2. Persiapan (Mei 2026)

### 2a. Yang Dilakukan Mentor (Lo)

| Deadline | Aktivitas | Detail |
|----------|-----------|--------|
| H-30 | Finalisasi kurikulum | 8 segmen × 4 modul, prompt AI, flow kerja |
| H-30 | Setup GitHub Org | Repo kurikulum, template, dsb. |
| H-21 | Push template-submission | README, template dokumen, cara mengejar |
| H-14 | Bikin persiapan-pertemuan-0.md | Panduan WSL, VS Code, Git, GitHub, Node |
| H-14 | Bikin informasi-peserta.md | Panduan tugas, FAQ, alur per segmen |
| H-7 | Siapkan slides tiap segmen | PPT / TUI: konsep + contoh prompt + kuburan |
| H-7 | Test semua command & prompt AI | Pastikan workflow jalan |
| H-3 | Briefing anggota divisi | Bagi tugas sesuai peran |
| H-1 | Test AI Agent di lab | Pastikan bisa buat file di folder project |

### 2b. Yang Dilakukan Peserta (Berdasarkan persiapan-pertemuan-0.md)

| Deadline | Aktivitas | Detail | Estimasi |
|----------|-----------|--------|----------|
| H-3 | Install WSL Ubuntu | PowerShell: `wsl --install` | 20 menit |
| H-3 | Update & upgrade | `sudo apt update && sudo apt upgrade -y` | 10 menit |
| H-2 | Install VS Code | code.visualstudio.com + ekstensi (WSL, Prettier) | 10 menit |
| H-2 | Buat akun GitHub | github.com/signup | 5 menit |
| H-2 | Buat SSH Key | `ssh-keygen` → tambah ke GitHub | 5 menit |
| H-1 | Install Node.js & Git | `sudo apt install nodejs npm git` | 10 menit |
| H-1 | Git config | `git config --global user.name / email` | 2 menit |
| H-1 | Install AI Agent | opencode / claude | 5 menit |
| H-1 | Clone repo organisasi | `git clone` kurikulum & template | 3 menit |
| H-0 | Ceklist final | Laptop, WSL, VS Code, Git, Node, SSH, AI Agent | 5 menit |

---

## 3. Flow Per Segmen — Mingguan

### 3a. Dalam 1 Sesi (Jumat 15:30-17:30, Modul 1-3)

Setiap segmen punya 3 modul materi + 1 modul project.

#### Sebelum Sesi (Mentor)

1. Buka `KURIKULUM-8-SEGMEN.md`, baca segmen & modul yang akan diajar
2. Siapkan slide (konsep + 1-2 contoh prompt AI)
3. **Test prompt AI & alur kerja** di terminal — pastikan tidak error
4. Siapkan "kuburan error" (error umum + cara fix)

#### Saat Sesi (120 menit total)

| Waktu | Aktivitas | Durasi |
|-------|-----------|--------|
| 15:30-15:45 | Buka slide, jelasin konsep & tujuan modul | 15' |
| 15:45-15:50 | Demo prompt AI pertama (terminal, proyektor) | 5' |
| 15:50-16:00 | Peserta coba; mentor & anggota keliling bantu | 10' |
| 16:00-16:05 | Demo prompt/langkah kedua | 5' |
| 16:05-16:15 | Peserta praktik | 10' |
| 16:15-16:20 | Demo langkah ketiga | 5' |
| 16:20-16:30 | Peserta praktik | 10' |
| 16:30-16:45 | Istirahat (sholat ashar bagi yang mau) | 15' |
| 16:45-16:50 | Demo langkah 4-5 (lebih cepat) | 5' |
| 16:50-17:10 | Praktik, kejar ketertinggalan | 20' |
| 17:10-17:25 | Q&A, bahas error | 15' |
| 17:25-17:30 | Recap, ingatkan push & buka di VS Code | 5' |

#### Loop Demo-Praktik

```
1. Mentor: "Perintah ini fungsinya untuk ..."
2. Mentor jalanin prompt AI di terminal → tunjukkan file yang terbuat
3. Peserta buka hasilnya di VS Code
4. Mentor: "Sekarang coba lo modifikasi lewat prompt: ..."
5. Peserta jalanin → buka di VS Code → error? bantu
6. Semua OK → commit → push → lanjut langkah berikut
```

#### Setelah Sesi

| Mentor | Peserta |
|--------|---------|
| Catat presensi | Buka `catatan-harian.md` di repo pribadi |
| Catat error yang sering muncul | Tulis hasil belajar (bisa dibantu AI agent) |
| Evaluasi: terlalu cepat/lambat? | `git add . && git commit && git push` |
| Update kurikulum bila ada revisi | - |

### 3b. Detail Peran Anggota Divisi

6 anggota (Ilham, Hisyam, Rassel, Hayyan, Bayu, Kammila) belajar **bersama** peserta — bukan co-mentor.

| Peran | Tugas |
|-------|-------|
| Ilham (Koordinator) | Koordinasi jadwal, admin form, bantu kumpul link |
| Hisyam | Dekati peserta yang error duluan sebelum mentor datang |
| Rassel | Damping 1-on-1 peserta paling lambat |
| Hayyan | Catat error unik → bahan FAQ kumulatif |
| Bayu | Siapkan PC lab (login, terminal, VS Code) sebelum sesi |
| Kammila | Presensi, bagikan panduan, dokumentasi foto |

---

## 4. Flow Per Segmen — Project Week

Modul ke-4 tiap segmen = **Project Week**.

### Sebelum Sesi (Mentor)

| Aktivitas |
|-----------|
| Siapkan deskripsi project + contoh output |
| Buat contoh "produk" 1 segmen sebagai acuan |
| Pastikan akun/layanan (Vercel, Supabase, Cloudinary) siap |

### Saat Sesi (Project Week)

| Waktu | Aktivitas |
|-------|-----------|
| 15:30-15:45 | Jelasin tugas & kriteria penilaian |
| 15:45-16:00 | Demo contoh (bisa screen record singkat) |
| 16:00-17:00 | **Peserta kerjakan project** + mentor & anggota keliling bantu |
| 17:00-17:15 | Q&A kendala |
| 17:15-17:30 | Recap deadline & cara submit |

### Setelah Sesi (+7 Hari Deadline)

| Mentor | Peserta |
|--------|---------|
| Terima link karyawan (video / link produk) | 1. Selesaikan project (dibantu AI Agent) |
| Cek link satu per satu | 2. Push hasil ke GitHub |
| Chat WA bila link rusak | 3. Deploy ke Vercel (bila web) |
| Tandai siapa yang sudah submit | 4. Kirim link via Google Form |

### Google Form Structure

| Field | Type | Notes |
|-------|------|-------|
| Nama Lengkap | Short text | - |
| Angkatan | Short text | Contoh: "2026" |
| Segmen | Dropdown | Segmen 1 - Segmen 8 |
| Link (produk / video) | Short text | URL Vercel / GitHub / YouTube |
| Konfirmasi | Checkbox | "Saya sudah membaca aturan submission" |
| Catatan | Paragraph | Opsional |

---

## 5. Timeline 12 Bulan

### 8 Segmen Aktif (Juni 2026 - Januari 2027)

| Bulan | Segmen | Topik | Deliverable |
|-------|--------|-------|-------------|
| **Juni** | S1 | Navigasi & File + setup Git | Dev machine siap |
| **Juli** | S2 | AI Agent + Git + Perancangan | Product Blueprint (.md) di GitHub |
| **Agustus** | S3 | HTML/CSS/JS + Deploy | Landing page online (Vercel) |
| **September** | S4 | Next.js + API Routes | Website Next.js multi-halaman |
| **Oktober** | S5 | Backend konsep + Supabase | Data-driven web (CRUD) |
| **November** | S6 | Auth + Media + Polish | Full-stack final (individual) |
| **Desember** | S7 | Kolaborasi tim + Sprint 1 | Working prototype tim (API+DB) |
| **Januari** | S8 | Sprint 2 + Deploy + Penutup | Produk tim final + warisan |

### 3 Bulan Buffer (Februari - April 2027)

| Bulan | Aktivitas Mentor | Aktivitas Peserta |
|-------|------------------|-------------------|
| **Februari** | Make-up S2-S3, workshop lanjutan | Kejar ketertinggalan |
| **Maret** | Make-up S4-S6, review portofolio | Ngejar, konsultasi portofolio |
| **April** | Review final, regenerasi, penutupan | Rapikan portofolio, closing |

---

## 6. Siklus Kolaborasi Tim (S7-S8)

Di Segmen 7-8, peserta bekerja dalam **tim 2 orang** (Frontend & Backend/Data).

### Pembentukan Tim

| Aspek | Detail |
|-------|--------|
| Jumlah anggota | 2 orang per tim |
| Peran | 1 Frontend (UI & integrasi) + 1 Backend/Data (DB & API) |
| Repo | Satu repo GitHub bersama dengan collaborator |
| Studi kasus | Aplikasi web simple (pesan tiket, kasir, dll.) |

### Alur Kerja Tim

```
┌────────────────────────────────────────────────────────────┐
│ 1. Satu orang buat repo, share sebagai collaborator        │
│ 2. Keduanya clone repo tersebut                            │
│ 3. Masing-masing buat branch sendiri (frontend-ui / backend-api)│
│ 4. Kerjakan fitur → commit → push branch                   │
│ 5. Buat Pull Request di GitHub → review → merge             │
│ 6. Tarik hasil merge ke local (git pull)                   │
│ 7. Ulangi sampai produk selesai                             │
└────────────────────────────────────────────────────────────┘
```

### Kontrak Kerja Tim (dibuat via AI Agent, dirawat di VS Code)

| File | Isi |
|------|-----|
| `PRD.md` | Konsep, fitur MVP, alur pengguna |
| `API.md` | Kontrak API (endpoint, method, body, response) |
| `SCHEMA.md` | Rancangan database (tabel, relasi, tipe) |
| `README.md` | Deskripsi produk & cara menjalankan |

### Aturan Kolaborasi yang Disepakati

- Selalu `git pull origin main` **sebelum** mulai kerja
- Satu fitur = satu branch
- Jangan commit langsung ke `main` — lewat Pull Request
- Tulis pesan commit yang jelas (feat:, fix:, docs:)
- Bila konflik muncul: diskusikan, selesaikan bersama

---

## 7. Multimedia Survival Kit (Overlap)

MSK jalan **bersamaan** dengan Circle — bukan terpisah.

| No | Konten | Wajib/Opsional | Format | Platform |
|----|--------|---------------|--------|----------|
| 1 | Cheatsheet / konsep segmen | Wajib | Poster/Carousel | IG Feed |
| 2 | Video tutorial singkat | Opsional | Video 60 detik | IG Reels |

### Pembagian Tugas

| Tim | Tanggung Jawab |
|-----|----------------|
| Kemahasiswaan (lo + anggota) | Materi teknis, draft, screenshot, caption |
| Kominfo | Desain poster, edit video, jadwal posting |

### Timeline Produksi per Segmen

| Minggu | Aktivitas MSK |
|--------|---------------|
| Minggu 1 | Lo buat draft konten (konsep segmen) |
| Minggu 2 | Passing ke Kominfo buat didesain |
| Minggu 3 | Kominfo selesai desain, review bareng |
| Minggu 4 | Posting — pas Project Week (biar engaging) |

---

## 8. Warisan Digital (Akhir Tahun)

### Yang Diarsipkan

1. **Produk final tim** (link Vercel + repo GitHub)
2. **Produk individual** (landing page, Next.js app, full-stack)
3. **Prompt library** — kumpulan prompt AI yang teruji
4. **Pesan angkatan** — untuk adik kelas berikutnya

### Struktur Arsiptan

```
warisan_circle/
├── catatan_perjalanan.md        # Refleksi pribadi
├── pesan_untuk_angkatan.txt     # Pesan buat angkatan depan
├── link_portofolio.md           # Daftar semua URL produk
├── prompt_log_complete.txt      # Semua prompt AI yang dipakai
├── repo_pribadi/                # Project individual (S2-S6)
└── repo_tim/                    # Project tim (S7-S8)
```

### Template Pesan Angkatan

```
Halo adik-adik angkatan [TAHUN]!

The Penguin Circle adalah [kesan lo dalam 1-2 kalimat].

Beberapa hal yang gua harap gua tau dari awal:
1. [tips 1]
2. [tips 2]
3. [tips 3]

Error yang paling sering gua temuin:
- [error] → [solusi]

Pesan terakhir:
[pesan motivasi singkat]

— [Nama], Angkatan [TAHUN]
```

---

## 9. Referensi Cepat Git & Deploy

### Git Commands (Peserta — Individual)

| Situasi | Command |
|---------|---------|
| Setup awal | `git config --global user.name "Nama"` |
| Setup awal | `git config --global user.email "email"` |
| Inisialisasi | `git init` |
| Cek status | `git status` |
| Stage semua | `git add .` |
| Commit | `git commit -m "pesan"` |
| Push pertama | `git push -u origin main` |
| Push | `git push` |
| Tarik update | `git pull origin main` |
| Lihat history | `git log --oneline` |
| Buat branch | `git checkout -b nama-branch` |
| Pindah branch | `git checkout nama-branch` |

### Git Commands (Tim — Kolaborasi)

| Situasi | Command |
|---------|---------|
| Clone repo tim | `git clone git@github.com:user/repo.git` |
| Tarik update sebelum kerja | `git pull origin main` |
| Buat branch fitur | `git checkout -b fitur/login` |
| Push branch | `git push origin fitur/login` |
| Buat PR | Di GitHub → compare & pull request |
| Merge PR | Di GitHub → merge |
| Tarik hasil merge | `git checkout main && git pull origin main` |

### Deploy ke Vercel (Gratis)

```
1. Push project ke GitHub
2. Buka vercel.com → Login dengan GitHub
3. Import repo → project terdeteksi otomatis (Next.js / statis)
4. Klik Deploy → dapat URL *.vercel.app
5. Set environment variables (Supabase, Cloudinary) di dashboard Vercel
6. Setiap push ke GitHub → Vercel auto-redeploy
```

### Setup Supabase (Gratis)

```
1. supabase.com → Create project (free tier)
2. SQL Editor → buat tabel (sesuai SCHEMA)
3. Copy Project URL & anon key → simpan di .env.local
4. Atur RLS policy untuk keamanan data
5. Aktifkan Auth (email/password) bila perlu
```

---

## 10. Diagram Alur

```
                     ┌────────────────────────────┐
                     │        MENTOR (lo)         │
                     │  KURIKULUM-8-SEGMEN.md     │
                     └─────────────┬──────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
     ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
     │  SEBELUM     │    │  SAAT SESI   │    │  SETELAH     │
     │ SESI:        │    │  (120 menit) │    │ SESI:        │
     │ • Test prompt│    │ • Slide      │    │ • Presensi   │
     │ • Siapin     │    │ • Demo AI    │    │ • Evaluasi   │
     │   lingkaran  │    │ • Praktik    │    │ • Revisi     │
     └──────────────┘    └──────────────┘    └──────┬───────┘
                                                    │
                 ┌──────────┬───────────┬───────────┼──────────┐
                 ▼          ▼           ▼                    ▼
        ┌────────────┐ ┌────────┐ ┌────────┐           ┌──────────────┐
        │ PRODUCT    │ │ GIT/   │ │ DEPLOY │           │  MULTIMEDIA  │
        │ (AI Agent  │ │ GITHUB │ │ VERCEL │           │  SURVIVAL    │
        │ + VS Code) │ │ (repo) │ │ SUPABASE│          │  KIT (IG)    │
        └────────────┘ └────────┘ └────────┘           └──────────────┘
                 ▲
                 │
        ┌────────┴────────┐
        │    PESERTA      │
        │  (individual)   │
        │   → tim (S7-S8) │
        └─────────────────┘
```

### Alur Sederhana (1 Siklus Segmen)

```
┌──────────────────────────────────────────────────────────┐
│  MODUL 1-3  →  Materi + praktik (AI Agent + VS Code)     │
│  MODUL 4    →  Project Week (buat produk kecil)           │
│                    ↓                                      │
│  Peserta: selesaikan → push GitHub → deploy Vercel        │
│                    ↓                                      │
│  Submit link via Google Form (deadline +7 hari)           │
│                    ↓                                      │
│  Mentor: cek → arsip → share di media                     │
└──────────────────────────────────────────────────────────┘
```

---

> **Dokumen ini:** `simulasi-alur.md`
> **The Penguin Circle** — Divisi Kemahasiswaan, Himpunan Mahasiswa TRM (HIMATRA)
> **From 0, To Product.** 🐧
