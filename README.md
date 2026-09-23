<div align="center">

# KATAKATING

**Boash Knowledge Base & Lab Survival Guide**  
*Repositori Panduan Praktikum, Tips Kuliah, dan Solusi Kendala Teknis Mahasiswa Universitas Boash*

[![CI Verification](https://github.com/muadzhdz/katakating/actions/workflows/ci.yml/badge.svg)](https://github.com/muadzhdz/katakating/actions)
[![Vercel Deployment](https://img.shields.io/badge/Deployment-katakating.vercel.app-00ff66?logo=vercel&logoColor=black)](https://katakating.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Architecture: Cyber Brutalist](https://img.shields.io/badge/Design-_Cyber_Brutalist-00ff66)](#)
[![Policy: Zero-Emoji](https://img.shields.io/badge/Policy-Zero--Emoji-success)](#)

</div>

---

## Gambaran Umum

`KATAKATING` adalah platform web repositori basis pengetahuan terbuka yang dirancang untuk memecahkan masalah transfer pengetahuan perkuliahan di lingkungan **Fakultas Sains Teknologi dan Informasi (FSTI) serta seluruh sivitas akademika Universitas Boash**.

Platform ini dibangun dengan estetika **Cyber Brutalist** (palet Cyber Emerald `#00ff66`, deep OLED `#000000`, connected 1px border grid, dan tipografi monospaced) serta menerapkan sistem **Matrix Filtering** untuk menjembatani program studi serumpun (TRM, Informatika, Mekatronika, Sistem Informasi, Sistem Rekayasa Komputer, dan Otomotif).

---

## Fitur Utama

- **Matrix Filtering Multi-Prodi:** Navigasi materi lintas program studi tanpa sekat kaku; menyaring panduan berdasarkan rumpun keilmuan dan tingkat semester (Semester 1 s.d. 8).
- **1-Click Command & Code Copy:** Tombol penyalinan perintah terminal (Linux/Bash/PowerShell) dan potongan kode dengan umpan balik visual instan.
- **Micro-Learning Video Walkthroughs:** Integrasi klip video demonstrasi teknis (1–3 menit) pada artikel panduan yang memerlukan tahapan visual.
- **Infografis & Diagram Alur Vektor:** Diagram arsitektur dan skema rangkaian praktikum yang tajam dan responsif.
- **Dual Submission Pipeline:** Mahasiswa dapat mengirimkan naskah tips secara instan via web form (`tulis.html`) terhubung ke basis data Supabase PostgreSQL, maupun melalui GitHub Issue template.

---

## Struktur Repositori

```text
katakating/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── submit-guide.yml      # Formulir submission panduan via GitHub Issue
│   └── workflows/
│       └── ci.yml                # Pengujian otomatis skema katalog (node:test)
├── scripts/
│   └── build-catalog.mjs         # Verifikator & compiler data catalog.json
├── test/
│   └── catalog.test.js           # Unit test otomatis integritas panduan
├── articles/                     # Berkas dokumentasi naskah panduan (Markdown)
├── assets/                       # Aset grafis, diagram SVG, dan identitas visual
├── supabase/
│   └── migrations/               # Skema DDL PostgreSQL dan migrasi Supabase
├── catalog.json                  # Single Source of Truth (Katalog Master)
├── index.html                    # Katalog Web Utama KATAKATING
├── article.html                  # Antarmuka Reader Mode Panduan
├── tulis.html                    # Formulir Pengajuan Panduan Mahasiswa
├── style.css                     # Desain Sistem Cyber Emerald
├── main.js                       # Logika Pencarian, Filter Multi-Prodi, & Copy Code
├── package.json                  # Konfigurasi Node.js Module & Testing
└── README.md                     # Dokumentasi Resmi Proyek
```

---

## Pengembangan Lokal & Pengujian

### Prasyarat
- Node.js >= 20.x
- Python 3.x (untuk server web statis lokal)

### Menjalankan Server Lokal
```bash
# Menjalankan server lokal di port 4173
npm run dev

# Akses via peramban:
# http://localhost:4173
```

### Menjalankan Pengujian (Testing)
Pengujian integritas data `catalog.json` dijalankan menggunakan test runner bawaan Node.js:
```bash
npm test
```

### Memvalidasi Katalog
```bash
npm run build
```

---

## Alur Kontribusi Naskah Panduan

1. **Jalur Web Publik:** Akses halaman `tulis.html`, isi rincian naskah, kategori rumpun, dan tag prodi, lalu kirim naskah ke antrean kurasi.
2. **Jalur GitOps:** Buka Issue baru menggunakan template [Submit a Practical Guide](.github/ISSUE_TEMPLATE/submit-guide.yml). Tim kurator akan memeriksa validitas teknis naskah sebelum diintegrasikan ke `catalog.json`.

---

## Tim Pengembang (Proyek Multimedia TRM 2026/2027)

- **Mu'adz Hudzaifah (NPM: 24903460014):** Lead Systems Architect & Fullstack Developer / Ketua Divisi Kemahasiswaan HIMATRA.
- **Ardi Haryanto (NPM: 24903460043):** UI/UX & Interactive Media Designer.
- **Muhammad Bariq (NPM: 24903460055):** Multimedia Content Producer & Video Editor.
- **Dosen Pengampu & Pembimbing:** Khadijah, S.Kom., M.Kom.

---

## Lisensi

Didistribusikan di bawah lisensi [MIT](LICENSE). Terbuka untuk seluruh mahasiswa dan komunitas akademik.
