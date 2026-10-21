---
id: panduan-kontribusi
title: Panduan Berbagi Catatan & Panduan di KATAKATING
category: Kontribusi & Panduan
author: Tim KATAKATING
date: 2026-09-27
initials: DOCS
tags: ["panduan", "kontribusi", "mahasiswa", "boash", "catatan", "praktikum"]
summary: Panduan lengkap alur kontribusi, unduh template naskah multi-format (DOCX, TXT, MD), dan proses kurasi catatan di KATAKATING.
---

## 1. Dari Mahasiswa, untuk Mahasiswa
KATAKATING adalah wadah repositori terbuka bagi mahasiswa Universitas Boash untuk saling berbagi catatan praktikum, rangkuman materi perkuliahan, dan panduan akademik mandiri.

Tujuan portal ini adalah memastikan catatan dan pengalaman lab yang telah dipelajari dapat terdokumentasi rapi, terstruktur, serta bermanfaat bagi sesama rekan mahasiswa dan angkatan selanjutnya.

## 2. Kategori Catatan yang Didukung
Naskah dapat diajukan sesuai rumpun bidang keilmuan yang tersedia:
1. **Jaringan Komputer**: Konfigurasi router, switch, VLAN, routing statis/dinamis, subnetting, dan simulasi Cisco Packet Tracer.
2. **Web & Tooling**: Panduan frontend/backend, instalasi environment, WSL2, Docker, Node.js, dan framework web modern.
3. **Basis Data**: Perancangan ERD, sintaks SQL, normalisasi tabel (1NF hingga 3NF), PostgreSQL, dan MySQL.
4. **Algoritma & Pemrograman**: Struktur data, rekursi, algoritma sorting/searching dalam C++, Java, atau Python.
5. **IoT & Embedded System**: Skema mikrokontroler ESP32/Arduino, protokol MQTT, sensor, dan simulasi Wokwi.
6. **Game & Multimedia**: Pemodelan 3D Blender, pipeline Unity, audio, dan metodologi MDLC.
7. **Akademik & Laporan**: Format margin baku 4-4-3-3, tata tulis ilmiah, template Word, dan panduan sidang tugas akhir.
8. **Git & DevOps**: Workflow branching, mitigasi merge conflict, CI/CD pipeline, dan deployment cloud.

## 3. Unduh Template Naskah Praktikum
Untuk mempermudah penulisan, telah disediakan tiga pilihan format berkas siap pakai yang dapat diunduh dan disesuaikan:

<div class="template-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin: 20px 0 28px;">
  <a href="/templates/template-laporan-praktikum.docx" download class="template-item" title="Unduh format Microsoft Word (.docx)" style="display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: var(--panel); border: 1px solid var(--line-strong); border-radius: var(--radius); text-decoration: none; color: inherit; transition: all 0.15s ease;">
    <span class="template-ext" style="font-family: var(--mono); font-size: 11px; font-weight: 700; color: #3b82f6; background: rgba(59, 130, 246, 0.12); padding: 6px 10px; border-radius: var(--radius);">DOCX</span>
    <div class="template-meta" style="flex: 1; min-width: 0;">
      <strong style="display: block; font-size: 13px; color: var(--heading);">Microsoft Word (.docx)</strong>
      <span style="font-size: 11px; color: var(--muted);">Format standar dokumen praktikum</span>
    </div>
    <span style="font-size: 11px; font-family: var(--mono); color: var(--accent);">&darr; Unduh</span>
  </a>

  <a href="/templates/template-laporan-praktikum.txt" download class="template-item" title="Unduh format Notepad Teks (.txt)" style="display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: var(--panel); border: 1px solid var(--line-strong); border-radius: var(--radius); text-decoration: none; color: inherit; transition: all 0.15s ease;">
    <span class="template-ext" style="font-family: var(--mono); font-size: 11px; font-weight: 700; color: #10b981; background: rgba(16, 185, 129, 0.12); padding: 6px 10px; border-radius: var(--radius);">TXT</span>
    <div class="template-meta" style="flex: 1; min-width: 0;">
      <strong style="display: block; font-size: 13px; color: var(--heading);">Notepad / Plain Text (.txt)</strong>
      <span style="font-size: 11px; color: var(--muted);">Teks baku tanpa ketergantungan software</span>
    </div>
    <span style="font-size: 11px; font-family: var(--mono); color: var(--accent);">&darr; Unduh</span>
  </a>

  <a href="/templates/template-laporan-praktikum.md" download class="template-item" title="Unduh format Markdown (.md)" style="display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: var(--panel); border: 1px solid var(--line-strong); border-radius: var(--radius); text-decoration: none; color: inherit; transition: all 0.15s ease;">
    <span class="template-ext" style="font-family: var(--mono); font-size: 11px; font-weight: 700; color: var(--accent); background: rgba(255, 255, 255, 0.1); padding: 6px 10px; border-radius: var(--radius);">MD</span>
    <div class="template-meta" style="flex: 1; min-width: 0;">
      <strong style="display: block; font-size: 13px; color: var(--heading);">Markdown (.md)</strong>
      <span style="font-size: 11px; color: var(--muted);">Format developer untuk Neovim & VS Code</span>
    </div>
    <span style="font-size: 11px; font-family: var(--mono); color: var(--accent);">&darr; Unduh</span>
  </a>
</div>

## 4. Alur Pengajuan Catatan di Web
1. **Akses Halaman Upload**: Buka menu **Upload** di bilah navigasi utama atau menu bawah ponsel.
2. **Unggah Berkas Naskah**: Sistem dilengkapi konverter berkas otomatis. Kamu dapat mengunggah berkas Word (`.docx`), PDF Digital (`.pdf`), Teks (`.txt`), maupun Markdown (`.md`). Konten akan diekstrak langsung ke formulir.
3. **Lengkapi Metadata Naskah**:
   - **Judul Catatan**: Tulis judul materi yang spesifik dan jelas.
   - **Kategori**: Pilih bidang keilmuan yang sesuai.
   - **Nama Penulis & NIM**: Cantumkan identitas lengkap untuk atribusi kontribusi.
   - **Ringkasan (Abstrak)**: Berikan 1–2 kalimat ringkasan inti bahasan catatan.
   - **Tags (Opsional)**: Kata kunci pencarian yang dipisahkan tanda koma.
4. **Kirim & Peroleh Tiket Antrean**: Klik tombol **Ajukan**. Sistem akan menerbitkan kode tiket naskah (contoh: `SUB-1024`) sebagai bukti pengajuan.
5. **Kurasi & Publikasi**: Tim kurasi memeriksa kelayakan format dan orisinalitas naskah di panel moderasi. Setelah disetujui, catatan langsung tayang di katalog publik dan graf pengetahuan.

## 5. Etika & Standar Kontribusi
* **Orisinalitas Materi**: Naskah merupakan hasil penulisan mandiri atau laporan praktikum kelompok yang sah, bukan duplikasi tanpa izin.
* **Atribusi & Rujukan**: Cantumkan modul lab dosen, dokumentasi resmi, atau literatur yang dijadikan acuan pada bagian akhir naskah.
* **Kerapian Format**: Gunakan blok kode untuk sintaks terminal/pemrograman, sertakan hasil pengujian langkah kerja, dan terapkan bahasa yang lugas.

## 6. Kolaborasi Open-Source via Git & Pull Request
Bagi rekan-rekan mahasiswa teknik dan software engineering yang terbiasa bekerja di lingkungan terminal, Git, dan Neovim / VS Code, repositori KATAKATING dikembangkan secara terbuka (*open-source*). Kamu dapat berkontribusi langsung menambahkan modul catatan atau menyempurnakan fitur web melalui alur Git Pull Request:

1. **Clone Repositori**:
```bash
git clone https://github.com/muadzhdz/katakating.git
cd katakating
```

2. **Buat Naskah Baru**:
Tambahkan berkas catatan berformat Markdown di folder `notes/nama-catatan.md` dan daftarkan metadatanya di `notes/notes.json`.

3. **Uji Validasi & Build**:
```bash
npm install
npm test
npm run build
```

4. **Kirimkan Pull Request**:
Buka Pull Request ke branch `main` di repositori GitHub [muadzhdz/katakating](https://github.com/muadzhdz/katakating). Tim pengembang akan meninjau dan menggabungkan kontribusi kamu secara langsung ke naskah resmi!
