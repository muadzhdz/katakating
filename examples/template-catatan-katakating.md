---
title: Panduan & Kerangka Penulisan Naskah KATAKATING
author: [Nama Lengkap Anda]
npm: [NIM / NPM Mahasiswa]
institution: Universitas Boash
category: Kontribusi & Panduan
date: 2026-09-27
tags: [katakating, panduan, boash, template, open-source]
---

# Panduan & Kerangka Penulisan Naskah KATAKATING

Dokumen ini adalah template resmi sekaligus panduan penyusunan naskah untuk dipublikasikan di repositori bersama **KATAKATING — Knowledge Hub Mahasiswa Universitas Boash**.

---

## 1. Tentang KATAKATING (Knowledge Hub Universitas Boash)

**KATAKATING** (berasal dari ungkapan *"Kata Kakak Tingkat"*) adalah platform repositori pengetahuan mandiri, terbuka, dan bebas bloat yang dirancang untuk seluruh mahasiswa Universitas Boash.

Tujuan utama proyek ini adalah:
1. **Pewarisan Ilmu Teruji:** Menyimpan catatan praktikum, konfigurasi sistem, dan ringkasan materi kuliah agar adik-adik tingkat tidak perlu mengulang kesalahan teknis yang sama.
2. **Keterbukaan Lintas Mahasiswa:** Membuka akses belajar bagi seluruh mahasiswa Universitas Boash tanpa sekat kaku.
3. **Dokumentasi Berkualitas Tinggi:** Menyajikan naskah akademik yang rapi, terstruktur, bebas plagiasi, serta memiliki standar pengujian yang jelas.

---

## 2. Struktur Baku Penulisan Naskah di KATAKATING

Setiap naskah yang Anda ajukan ke redaksi disarankan memuat 5 bagian esensial berikut:

### Bagian I: Pendahuluan & Latar Belakang Masalah
Jelaskan konteks materi atau tugas perkuliahan yang Anda bahas:
* Mata kuliah dan modul praktikum terkait.
* Masalah apa yang sering membuat mahasiswa bingung atau mengalami error saat mengerjakan tugas ini.
* Tujuan akhir yang akan dicapai setelah membaca naskah Anda.

### Bagian II: Prasyarat Sistem & Persiapan Lingkungan
Sebutkan spesifikasi atau perangkat yang dibutuhkan secara terperinci:
* Sistem operasi yang digunakan (misal: Arch Linux, Ubuntu 24.04, Windows 11 WSL2).
* Versi bahasa pemrograman, runtime, atau SDK (contoh: Go 1.23, Node.js 22, Flutter 3.24).
* Ekstensi editor atau pustaka dependensi yang wajib diinstal.

### Bagian III: Langkah Implementasi & Panduan Praktis
Tuliskan tahapan teknis secara runut dari awal hingga selesai:
* Gunakan subjudul (`### Langkah 1`, `### Langkah 2`, dst.) agar mudah dinavigasi.
* Sertakan baris perintah terminal (CLI) atau cuplikan kode yang bersih.

Contoh penulisan perintah terminal:
```bash
# Verifikasi dependensi sebelum menjalankan build
gcc --version
make check
```

Contoh cuplikan kode terstruktur:
```python
def hitung_margin_kertas(panjang_cm, lebar_cm):
    """Memvalidasi ukuran kertas standar laporan akademik 4-4-3-3."""
    margin_kiri = 4.0
    margin_atas = 4.0
    margin_kanan = 3.0
    margin_bawah = 3.0
    return panjang_cm - (margin_kiri + margin_kanan)
```

### Bagian IV: Analisis Hasil & Troubleshooting Kendala
Bagian ini adalah nilai paling berharga dari sebuah catatan KATAKATING:
* Tunjukkan bukti bahwa implementasi berhasil (log keluaran terminal atau deskripsi hasil akhir).
* Tuliskan minimal 1–2 kendala umum (pitfalls) yang sempat Anda temui beserta solusi mengatasinya.

### Bagian V: Kesimpulan & Pesan dari Kakak Tingkat (Pro-Tips)
Berikan rangkuman padat dan catatan pribadi Anda:
* Tips praktis saat asistensi dengan asisten laboratorium atau dosen pengampu.
* Cara mengoptimalkan waktu pengerjaan tugas serupa di masa mendatang.

---

## 3. Ketentuan Etika & Integritas Akademik

1. **Orisinalitas Naskah:** Tulis penjelasan menggunakan gaya bahasa Anda sendiri. Hindari menyalin mentah-mentah modul dosen tanpa elaborasi personal.
2. **Keamanan Informasi:** Jangan pernah menyertakan kata sandi pribadi, token API rahasia, atau kredensial basis data kampus di dalam naskah.
3. **Pencantuman Rujukan:** Cantumkan tautan ke dokumentasi resmi atau modul ajar yang menjadi referensi tulisan Anda di bagian penutup.

---

## 4. Informasi Kontributor & Kontak Diskusi

* **Nama Penulis:** [Isi Nama Anda]
* **NIM / NPM:** [Isi NIM Anda]
* **Angkatan:** [Contoh: 2024 / 2025]
* **Tautan GitHub / Portofolio:** [https://github.com/username-anda]
* **Catatan Admin:** Naskah ini diajukan untuk antrean moderasi KATAKATING Knowledge Hub.
