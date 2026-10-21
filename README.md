<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/brand/logo-v1-white.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/brand/logo-v1-black.svg">
    <img alt="KATAKATING Logo" src="public/brand/logo-v1-black.svg" width="160">
  </picture>
</p>

<h1 align="center">KATAKATING</h1>

<p align="center">
  <strong>Pusat Dokumentasi Catatan Praktikum &amp; Panduan Akademik Terbuka</strong><br>
  <em>Universitas Boash • Bebas Bloatware • Berorientasi Kinerja</em>
</p>

---

## Gambaran Umum

KATAKATING adalah repositori naskah catatan dan panduan lab berbasis web statis (Astro) yang dirancang untuk memfasilitasi pertukaran materi perkuliahan antar mahasiswa. Mengusung filosofi desain minimalis monokromatik bergaya Omarchy dengan performa tinggi dan nol *bloatware*.

---

## Fitur Utama

- **Katalog & Filter Rumpun Keilmuan:** Navigasi cepat catatan berdasarkan 8 kategori bidang studi (Jaringan Komputer, Web & Tooling, Basis Data, Algoritma, IoT, Game, Akademik, Git & DevOps).
- **Konverter Multi-Format:** Ekstraksi otomatis naskah Word (.docx), PDF Digital (.pdf), Teks (.txt), dan Markdown (.md) langsung ke formulir pengajuan.
- **Graf Pengetahuan 2D Canvas:** Visualisasi keterhubungan simpul konsep, kategori, dan kontributor menggunakan rendering Canvas performa tinggi.
- **Panel Moderasi Kurasi:** Alur peninjauan dan persetujuan naskah mahasiswa terintegrasi dengan basis data Supabase.
- **Template Naskah Baku:** Ketersediaan template siap pakai (DOCX, TXT, MD) berformat standar margin 4-4-3-3.

---

## Teknologi

- **Framework:** Astro 5 (Static Site Generation)
- **Styling:** Vanilla CSS, CSS Variables, Monochrome Palette
- **Backend / Auth:** Supabase (PostgreSQL & OAuth)
- **Parser Dokumen:** Mammoth.js (.docx), PDF.js (.pdf), Marked.js (.md)
- **Visualisasi:** HTML5 Canvas API

---

## Pengembangan Lokal

```bash
# Instalasi dependensi
npm install

# Menjalankan server pengembangan
npm run dev

# Membangun versi produksi statis
npm run build

# Menjalankan preview hasil build
npm run preview
```

---

## Tim Pengembang

- **Mu'adz Hudzaifah (NPM: 24903460014)** — Lead Systems Architect & Developer
- **Ardi Haryanto (NPM: 24903460043)** — UI/UX & Interactive Design
- **Muhammad Bariq (NPM: 24903460055)** — Content & Media Documentation
- **Dosen Pembimbing:** Khadijah, S.Kom., M.Kom.

---

## Lisensi

Didistribusikan di bawah lisensi [MIT](LICENSE). Terbuka untuk seluruh sivitas akademika Universitas Boash.
