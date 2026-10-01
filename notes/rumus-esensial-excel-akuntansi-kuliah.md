---
id: rumus-esensial-excel-akuntansi-kuliah
title: Rumus Esensial Excel untuk Tugas Kuliah, Olah Data & Akuntansi
category: Olah Data & Office
author: BEM & Perwakilan Prodi Akuntansi
date: 2026-09-28
readTime: 6 menit
tags: ["excel", "office", "akuntansi", "olah-data", "vlookup", "statistik"]
summary: Kumpulan rumus penting Microsoft Excel yang wajib dikuasai mahasiswa semua jurusan untuk menyelesaikan tugas laporan, olah data praktikum, dan tabel keuangan tanpa repot menghitung manual.
---

## 1. Pendahuluan
Banyak mahasiswa non-IT maupun teknik sering merasa kewalahan ketika dosen meminta olah data tabel di Microsoft Excel atau Google Sheets. Faktanya, 90% tugas perkuliahan hanya membutuhkan 5 formula dasar ini untuk selesai dengan cepat dan akurat.

---

## 2. Lima Rumus Wajib Mahasiswa

### 2.1. VLOOKUP & XLOOKUP (Pencarian Data Lintas Tabel)
Digunakan untuk mengambil data dari tabel referensi secara otomatis tanpa menyalin satu per satu.

* **Sintaks Dasar VLOOKUP:**
  ```text
  =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
  ```
* **Contoh Kasus:** Mengisi nama mahasiswa berdasarkan NIM dari tabel master:
  ```text
  =VLOOKUP(A2, MasterMahasiswa!$A$2:$C$100, 2, FALSE)
  ```
* **Tips Kating:** Selalu gunakan tanda dollar (`$`) pada range tabel referensi agar formula tidak bergeser saat di-*drag* ke bawah.

### 2.2. IF Bertingkat (Konversi Nilai Angka ke Huruf)
Digunakan untuk membuat logika bertingkat, sangat sering dipakai pada tugas simulasi nilai kuliah:

```text
=IF(B2>=85, "A", IF(B2>=75, "B", IF(B2>=65, "C", IF(B2>=50, "D", "E"))))
```

### 2.3. COUNTIF & COUNTIFS (Menghitung Frekuensi Bersyarat)
Menghitung jumlah data yang memenuhi kriteria tertentu (misal: menghitung berapa responden yang memilih opsi 'Setuju' pada kuesioner tugas):

```text
=COUNTIF(C2:C120, "Setuju")
```

### 2.4. SUMIFS (Total Penjumlahan Bersyarat)
Menjumlahkan angka hanya jika memenuhi kategori tertentu (sangat penting untuk mata kuliah Akuntansi dan Manajemen Operasional):

```text
=SUMIFS(D2:D100, B2:B100, "TRM", C2:C100, "Lunas")
```

### 2.5. Text Manipulation: TRIM & PROPER (Merapikan Data Berantakan)
Seringkali data yang dicopy dari Google Form atau WhatsApp memuat spasi ganda atau huruf kapital tak beraturan:
* `=TRIM(A2)` &mdash; Menghapus spasi berlebih di awal, tengah, dan akhir kata.
* `=PROPER(A2)` &mdash; Mengubah teks menjadi format baku (Huruf pertama kapital di setiap kata).

---

## 3. Pivot Table dalam 3 Klik
Jika tabel data memiliki ratusan baris, jangan hitung manual satu per satu:
1. Blok seluruh tabel (`Ctrl + A`).
2. Klik tab **Insert** > pilih **PivotTable** > klik **OK**.
3. Tarik kolom kategori ke bagian **Rows** dan kolom angka ke bagian **Values**.
4. Laporan ringkasan selesai dalam 5 detik.
