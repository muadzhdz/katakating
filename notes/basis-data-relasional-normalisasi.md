---
id: basis-data-relasional-normalisasi
title: Panduan Praktis Normalisasi Basis Data (1NF, 2NF, 3NF)
category: Basis Data
author: Divisi Kemahasiswaan HIMATRA
date: 2026-09-21
readTime: 6 menit
tags: ["database", "sql", "normalisasi", "mysql", "basis-data"]
summary: Memahami teknik dekomposisi tabel anomali menjadi bentuk normal 1NF, 2NF, dan 3NF pada studi kasus sistem akademik kampus.
---

## 1. Tujuan Praktikum
Menghilangkan redundansi data, anomali penyisipan (insert anomaly), anomali penghapusan (delete anomaly), dan anomali pembaruan (update anomaly) pada perancangan database relasional sistem informasi akademik.

## 2. Studi Kasus: Tabel Unnormalized (UNF)
Bayangkan sebuah tabel laporan nilai mahasiswa yang belum dinormalisasi:

| NIM | Nama | Kode_MK | Nama_MK | SKS | Dosen | Ruang | Nilai |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 230101 | Budi | MK01, MK02 | Web, IoT | 3, 3 | Pak Adi, Bu Siti | R1, R2 | A, B+ |

Masalah: Terdapat multi-valued attribute (satu kolom berisi banyak nilai sekaligus).

## 3. Tahapan Normalisasi

### 3.1. Bentuk Normal Pertama (1NF)
**Syarat 1NF**: Setiap sel atribut hanya boleh bernilai tunggal (atomic value) dan tidak ada repeating group.

*Solusi*: Pecah baris yang memiliki multi-value menjadi baris tersendiri:

```sql
-- Struktur tabel Mahasiswa_Nilai_1NF
-- Primary Key gabungan: (NIM, Kode_MK)
CREATE TABLE nilai_1nf (
  nim VARCHAR(10),
  nama_mhs VARCHAR(100),
  kode_mk VARCHAR(10),
  nama_mk VARCHAR(100),
  sks INT,
  dosen_pengampu VARCHAR(100),
  nilai VARCHAR(2),
  PRIMARY KEY (nim, kode_mk)
);
```

### 3.2. Bentuk Normal Kedua (2NF)
**Syarat 2NF**: Sudah memenuhi 1NF, dan **tidak boleh ada partial dependency** (ketergantungan parsial), di mana atribut non-key hanya bergantung pada sebagian Primary Key.

*Analisis*:
* `nama_mhs` hanya bergantung pada `nim` (bukan pada `kode_mk`).
* `nama_mk` dan `sks` hanya bergantung pada `kode_mk` (bukan pada `nim`).

*Solusi*: Pecah menjadi 3 entitas terpisah:
1. `Mahasiswa (NIM, Nama)`
2. `Mata_Kuliah (Kode_MK, Nama_MK, SKS, Dosen)`
3. `KRS_Nilai (NIM, Kode_MK, Nilai)`

### 3.3. Bentuk Normal Ketiga (3NF)
**Syarat 3NF**: Sudah memenuhi 2NF, dan **tidak boleh ada transitive dependency** (ketergantungan transitif), di mana atribut non-key bergantung pada atribut non-key lainnya.

*Analisis pada tabel Mata_Kuliah*:
Jika satu dosen memiliki NIP dan No_Telp di tabel Mata Kuliah, maka `No_Telp` bergantung pada `NIP`, padahal `NIP` bukan primary key tabel Mata Kuliah.

*Solusi 3NF*: Buat tabel Dosen tersendiri:
1. `mahasiswa (nim [PK], nama)`
2. `dosen (nip [PK], nama_dosen, email)`
3. `mata_kuliah (kode_mk [PK], nama_mk, sks, nip_dosen [FK])`
4. `krs_nilai (id_krs [PK], nim [FK], kode_mk [FK], nilai)`

## 4. DDL Skrip SQL Standar 3NF
```sql
CREATE TABLE dosen (
  nip VARCHAR(20) PRIMARY KEY,
  nama_dosen VARCHAR(100) NOT NULL
);

CREATE TABLE mata_kuliah (
  kode_mk VARCHAR(10) PRIMARY KEY,
  nama_mk VARCHAR(100) NOT NULL,
  sks TINYINT NOT NULL,
  nip_dosen VARCHAR(20),
  FOREIGN KEY (nip_dosen) REFERENCES dosen(nip)
);

CREATE TABLE mahasiswa (
  nim VARCHAR(10) PRIMARY KEY,
  nama_mhs VARCHAR(100) NOT NULL
);

CREATE TABLE krs_nilai (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nim VARCHAR(10) NOT NULL,
  kode_mk VARCHAR(10) NOT NULL,
  nilai CHAR(2),
  FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
  FOREIGN KEY (kode_mk) REFERENCES mata_kuliah(kode_mk)
);
```

## 5. Referensi
* Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database System Concepts (7th Edition)*.
* Elmasri, R., & Navathe, S. B. (2015). *Fundamentals of Database Systems*.
