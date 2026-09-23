---
id: panduan-kontribusi
title: Panduan & Ketentuan Kontribusi Artikel Jurnal KATAKATING
category: Kontribusi & Panduan
author: Divisi Kemahasiswaan HIMATRA
date: 2026-09-23
readTime: 4 menit
tags: ["kontribusi", "panduan", "markdown", "open-source", "himatra", "boash", "fsti"]
summary: Syarat, ketentuan akademik, format metadata frontmatter, dan tata cara mengirimkan tulisan jurnal/artikel praktikum ke KATAKATING via formulir web atau GitHub Pull Request.
---

## 1. Semangat Komunitas Terbuka
KATAKATING dirancang sebagai **Knowledge Hub Mahasiswa Universitas Boash Terbuka**. Setiap mahasiswa atau civitas akademika dari seluruh program studi di Universitas Boash dipersilakan untuk menyumbangkan tulisan artikel praktikum, tips perkuliahan, maupun dokumentasi riset tugas akhir.

## 2. Syarat & Ketentuan Artikel yang Di-Acc (Diterima)
Agar kualitas jurnal dan artikel tetap terjaga kredibilitasnya, setiap naskah yang dikirimkan wajib memenuhi 5 kriteria utama:

1. **Berlandaskan Pengalaman & Telah Diuji (Tested)**:
   * Kode program, konfigurasi CLI, atau rangkaian yang dibahas harus sudah berhasil dicoba dan diverifikasi berjalan dengan baik (bukan sekadar tutorial copy-paste yang belum pernah dijalankan).
2. **Memiliki Referensi Akademik / Dokumentasi Resmi**:
   * Setiap artikel wajib mencantumkan minimal 1 referensi valid di akhir dokumen (buku teks, dokumentasi resmi vendor, IEEE/ACM, atau pedoman kampus).
3. **Bebas dari AI-Slop & Plagiasi**:
   * Hindari tulisan berbunga-bunga yang tidak memberikan solusi praktis. Gaya bahasa harus teknis, padat, dan langsung membedah solusi masalah.
4. **Format File Wajib Markdown (`.md`)**:
   * Seluruh artikel dikemas dalam format `.md` murni dengan metadata YAML di bagian awal file.
5. **Bahasa Indonesia Baku & Istilah Teknis yang Tepat**:
   * Gunakan Bahasa Indonesia yang jelas dengan istilah teknis internasional ditulis miring atau diapit code block jika berupa perintah terminal.

## 3. Format Template Markdown Wajib
Buat file baru di direktori `articles/` dengan penamaan: `nama-topik-singkat.md`. File wajib diawali dengan blok **Frontmatter** seperti contoh berikut:

```markdown
---
id: nama-topik-singkat
title: Judul Artikel yang Jelas dan Spesifik
category: Jaringan Komputer | Web & Tooling | Basis Data | Algoritma | Game & Multimedia | Akademik & Laporan
author: Nama Lengkap Penulis (NIM)
date: YYYY-MM-DD
readTime: X menit
tags: ["tag1", "tag2", "tag3"]
summary: Ringkasan 1-2 kalimat tentang masalah apa yang diselesaikan dan apa output dari artikel ini.
---

## 1. Tujuan Praktikum / Permasalahan
Jelaskan latar belakang masalah secara ringkas dan apa tujuan dari panduan ini.

## 2. Prasyarat Sistem
Software atau hardware apa saja yang dibutuhkan pembaca sebelum mulai.

## 3. Langkah Kerja & Penjelasan Kode
Tuliskan langkah-langkah secara runtut menggunakan heading dan blok kode:

```bash
echo "Perintah terminal di sini"
```

## 4. Troubleshooting / Potensi Kendala
Sebutkan error yang sering terjadi dan bagaimana cara mengatasinya.

## 5. Referensi & Sumber Rujukan
* Dokumentasi resmi atau buku referensi yang dijadikan acuan.
```

## 4. Tiga Jalur Pengiriman Artikel (Pilih yang Paling Mudah)

Kami ingin KATAKATING dapat diakses oleh **seluruh mahasiswa dari segala jurusan di Universitas Boash**, bukan hanya mereka yang menguasai Git atau koding. Anda bebas memilih salah satu dari 3 opsi berikut:

### Opsi 1: Formulir Web Otomatis (Direkomendasikan & Paling Cepat)
1. Buka menu **[Tulis Artikel](tulis.html)** di web KATAKATING.
2. Isi nama, program studi/NIM, kategori matkul, judul, ringkasan, materi praktikum, dan referensi.
3. Klik tombol **Kirim Draft via WhatsApp Redaksi** atau **Download File Markdown (.md)**.
4. Tim editorial kemahasiswaan akan langsung menerima dan memvalidasi artikel Anda.

### Opsi 2: Kirim File Microsoft Word (.docx) via WhatsApp
1. Jika Anda sudah memiliki laporan praktikum atau makalah dalam format Word (`.docx`):
2. Kirimkan langsung ke kontak WhatsApp Redaksi Kemahasiswaan melalui [Saluran Komunitas WhatsApp](https://chat.whatsapp.com/GzEfQkl53ZUBC9R2JF9CEf).
3. Tim redaksi Divisi Kemahasiswaan akan mengkonversi tulisan Anda ke format Markdown baku dan menerbitkannya atas nama Anda.

### Opsi 3: Jalur Open-Source (GitHub Pull Request)
Bagi mahasiswa yang ingin membangun portofolio kontribusi open-source nyata:
1. **Fork Repositori**: Buka repositori `https://github.com/muadzhdz/katakating` lalu klik tombol **Fork**.
2. **Buat File Baru**: Masukkan file artikel Anda ke dalam folder `articles/` di branch baru, contoh `feat/artikel-iot-lora`.
3. **Commit & Push**:
   ```bash
   git add articles/nama-topik.md
   git commit -m "feat(article): tambah panduan IoT LoRa oleh Budi"
   git push origin feat/artikel-iot-lora
   ```
4. **Buka Pull Request**: Masuk ke GitHub, klik **New Pull Request**. Tim kemahasiswaan akan mereview naskah Anda.

