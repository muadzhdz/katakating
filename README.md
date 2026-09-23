<div align="center">

# KATAKATING

**Boash Knowledge Base & Lab Survival Guide**  
*Repositori Panduan Praktikum, Tips Kuliah, dan Solusi Kendala Teknis Mahasiswa Universitas Boash*

</div>

---

## Gambaran Umum

`KATAKATING` adalah platform web repositori basis pengetahuan terbuka yang dirancang untuk memfasilitasi transfer pengetahuan perkuliahan, panduan praktikum, dan solusi kendala teknis bagi **seluruh mahasiswa di seluruh fakultas dan program studi Universitas Boash**.

Platform ini dibangun dengan estetika **Cyber Brutalist** (palet Cyber Emerald `#00ff66`, deep OLED `#000000`, connected 1px border grid, dan tipografi monospaced) serta menerapkan sistem **Matrix Filtering** yang fleksibel untuk mempermudah navigasi panduan lintas fakultas, program studi, dan tingkat semester.

---

## Fitur Utama

- **Matrix Filtering Multi-Prodi:** Navigasi materi lintas fakultas dan program studi tanpa sekat kaku; menyaring panduan berdasarkan bidang keilmuan dan tingkat semester (Semester 1 s.d. 8).
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

1. **Jalur Web Publik:** Akses halaman `tulis.html`, isi rincian naskah, kategori bidang ilmu, dan fakultas/prodi, lalu kirim naskah ke antrean kurasi.
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
