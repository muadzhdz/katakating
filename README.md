<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/brand/logo-v1-white.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/brand/logo-v1-black.svg">
    <img alt="KataKating Logo" src="public/brand/logo-v1-black.svg" width="140">
  </picture>
</p>

<h1 align="center">KATAKATING</h1>

<p align="center">
  Repositori naskah catatan praktikum dan panduan akademik terbuka mahasiswa Universitas Boash.<br>
  Dirancang dengan estetika monokromatik, performa tinggi, dan bebas bloatware.
</p>

---

## Arsitektur Sistem

- **Frontend:** Astro (Static Site Generation), Vanilla CSS, Palet Monokromatik
- **Edge API:** Cloudflare Pages Functions (V8 isolate runtime)
- **Basis Data:** Cloudflare D1 (Serverless SQLite, Region APAC)
- **Ekstraksi Dokumen:** Mammoth.js (.docx), Marked.js (.md)

---

## Pengembangan Lokal

```bash
# Instalasi dependensi
npm install

# Menjalankan server pengembangan lokal
npm run dev

# Membangun output statis produksi
npm run build

# Menjalankan preview hasil build
npm run preview

# Deploy langsung ke Cloudflare Pages
npm run deploy
```

---

## Manajemen Basis Data (Cloudflare D1)

```bash
# Menghasilkan seed SQL dari repositori naskah markdown
node scripts/seed-d1.mjs

# Eksekusi skema dan seed ke basis data remote D1
npx wrangler d1 execute katakating-db --remote --file=./d1/schema.sql --yes
npx wrangler d1 execute katakating-db --remote --file=./d1/seed.sql --yes
```

---

## Tim Pengembang

- **Mu'adz Hudzaifah** — Lead Systems Architect & Developer
- **Ardi Haryanto** — Graphic Designer
- **Muhammad Bariq** — Dokumentasi & Media
- **Dosen Pembimbing:** Khadijah, S.Kom., M.Kom.

---

## Lisensi

Didistribusikan di bawah lisensi [MIT](LICENSE). Terbuka untuk seluruh sivitas akademika Universitas Boash.
