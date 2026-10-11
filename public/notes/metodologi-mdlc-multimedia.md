---
id: metodologi-mdlc-multimedia
title: Penerapan Metodologi MDLC (Luther-Sutopo) pada Skripsi Multimedia
category: Metodologi Penelitian
author: Divisi Kemahasiswaan HIMATRA
date: 2026-09-21
readTime: 6 menit
tags: ["mdlc", "skripsi", "metodologi", "multimedia", "luther-sutopo", "tugas-akhir"]
summary: Penjelasan komprehensif 6 tahapan siklus Multimedia Development Life Cycle (Concept, Design, Material, Assembly, Testing, Distribution) yang diakui penguji sidang.
---

## 1. Pengantar Metodologi
Dalam pengembangan produk multimedia interaktif (seperti game edukasi, media pembelajaran interaktif, animasi 3D, atau aplikasi VR/AR), metodologi yang paling umum digunakan dan diakui di kalangan akademisi adalah **Multimedia Development Life Cycle (MDLC)** yang dikembangkan oleh Luther (1994) dan dimodifikasi oleh Sutopo (2003).

Metodologi ini terdiri dari 6 tahapan sekuensial yang fleksibel:

```text
[1. Concept] ──> [2. Design] ──> [3. Material Collecting]
                                           │
[6. Distribution] <── [5. Testing] <── [4. Assembly]
```

## 2. Rincian 6 Tahapan MDLC pada Bab III Skripsi

### Tahap 1: Concept (Pengonsepan)
Menentukan tujuan awal aplikasi, tema, dan target audiens (apakah anak usia dini, mahasiswa, atau umum).
* *Output Nyata*: Rumusan batasan proyek, genre game/media, dan identifikasi kebutuhan pengguna.

### Tahap 2: Design (Perancangan)
Membuat cetak biru detail dari tampilan dan alur interaksi aplikasi sebelum masuk ke proses pembuatan aset.
* *Output Nyata*:
  * **Storyboard**: Sketsa tiap scene visual beserta deskripsi audio/interaksi.
  * **Navigation Structure**: Diagram alur hierarki halaman (Linear, Hierarchical, atau Matrix).
  * **Use Case & Activity Diagram**: Jika melibatkan interaksi logika pemrograman kompleks.

### Tahap 3: Material Collecting (Pengumpulan Bahan)
Mengumpulkan seluruh aset mentah yang dibutuhkan sesuai dengan spesifikasi di tahap perancangan:
* Audio (Sound Effect, Background Music berlisensi bebas royalti).
* Gambar, Tekstur 2D, dan Referensi Karakter.
* Model 3D dasar (jika tidak membuat sendiri dari nol).

### Tahap 4: Assembly (Pembuatan)
Tahap implementasi di mana seluruh materi visual dan audio disatukan di dalam engine authoring tool (seperti Unity Engine, Unreal, Godot, atau Blender):
* Penulisan skrip interaksi logika (C#, Python, atau visual scripting).
* Penataan antarmuka pengguna (UI/UX layout) dan integrasi fisika.

### Tahap 5: Testing (Pengujian)
Menguji apakah aplikasi berjalan sesuai dengan spesifikasi dan bebas dari cacat (bug):
* **Black-Box Testing**: Menguji fungsionalitas tombol dan alur tanpa melihat kode sumber.
* **Alpha & Beta Testing**: Pengujian langsung kepada kelompok pengguna terbatas.
* **UAT (User Acceptance Test)**: Menggunakan kuesioner skala Likert (SUS / System Usability Scale).

### Tahap 6: Distribution (Pendistribusian)
Tahap akhir di mana aplikasi diekspor menjadi build yang siap digunakan pengguna:
* Kompilasi file executable (`.apk` untuk Android, `.exe` untuk PC Windows).
* Penyusunan buku manual penggunaan aplikasi dan penyimpanan arsip source code di GitHub.

## 3. Referensi
* Luther, A. C. (1994). *Authoring Interactive Multimedia*. AP Professional.
* Sutopo, A. H. (2003). *Multimedia Interaktif dengan Flash*. Graha Ilmu.
* Panduan Penulisan Proposal & Skripsi TRM Boash.
