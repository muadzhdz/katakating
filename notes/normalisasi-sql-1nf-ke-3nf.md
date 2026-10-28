---
id: normalisasi-sql-1nf-ke-3nf
title: "Cheat-Sheet Query SQL: Cara Cepat Normalisasi Data dari 1NF sampai 3NF"
category: Basis Data
author: Tim KataKating
date: 2026-09-23
readTime: 6 menit
initials: NORM
tags: ["database", "sql", "normalisasi", "mysql", "basis-data"]
summary: Metode cepat memecah tabel data yang berantakan menjadi tabel relasional yang memenuhi standar 1NF, 2NF, dan 3NF.
file: normalisasi-sql-1nf-ke-3nf.md
---

## 1. Masalah Utama: Tabel Unnormalized (UNF)
Di dunia nyata praktikum dan proyek industri, data mentah sering kali berasal dari file Excel atau Google Form yang berantakan. Kolom-kolomnya berisi banyak nilai dalam satu baris (*repeating groups*) atau data duplikat yang memicu *insert anomaly*, *update anomaly*, dan *delete anomaly*.

> [!STANDAR]
> Normalisasi adalah proses perancangan skema relasional untuk meminimalkan redundansi data tanpa kehilangan informasi (*lossless decomposition*). Standar praktikum Basis Data TRM mewajibkan minimal bentuk normal ketiga (3NF) untuk semua entitas transaksional.

Contoh data mentah (*Unnormalized Form*):
```text
NIM     | Nama_Mhs | Kode_MK        | Nama_MK        | Dosen        | Ruang | Nilai
24001   | Muadz    | TRM101, TRM102 | Linux, Web-Dev | Pak Budi     | R.301 | A, B+
24002   | Siti     | TRM101         | Linux          | Pak Budi     | R.301 | A
```

---

## 2. Langkah 1: Bentuk Normal Pertama (1NF)
**Aturan Mutlak 1NF**:
1. Setiap kolom wajib memiliki nilai atomik (satu sel hanya boleh berisi satu nilai tunggal).
2. Tidak boleh ada array atau koma dalam nilai sel.
3. Wajib menentukan Primary Key unik.

```sql
-- Skema Tabel 1NF: Mahasiswa_KRS_1NF
-- Primary Key komposit: (nim, kode_mk)
CREATE TABLE mahasiswa_krs_1nf (
  nim VARCHAR(15) NOT NULL,
  nama_mhs VARCHAR(100) NOT NULL,
  kode_mk VARCHAR(10) NOT NULL,
  nama_mk VARCHAR(100) NOT NULL,
  dosen VARCHAR(100) NOT NULL,
  ruang VARCHAR(20) NOT NULL,
  nilai VARCHAR(2),
  PRIMARY KEY (nim, kode_mk)
);
```

> [!KATING]
> Tips kating: Pada bentuk 1NF, jangan gunakan kolom JSON atau string dipisah koma. Jika sebuah entitas memiliki banyak item, jadikan baris tersendiri dan gunakan Primary Key gabungan (*composite key*).

---

## 3. Langkah 2: Bentuk Normal Kedua (2NF)
**Aturan Mutlak 2NF**:
1. Harus sudah memenuhi syarat 1NF.
2. Tidak boleh ada **ketergantungan fungsional sebagian** (*partial functional dependency*). Semua kolom non-key harus bergantung penuh pada seluruh Primary Key, bukan sebagiannya saja.

Pada tabel 1NF di atas:
* `nama_mhs` hanya bergantung pada `nim` (bukan pada `kode_mk`).
* `nama_mk`, `dosen`, dan `ruang` hanya bergantung pada `kode_mk` (bukan pada `nim`).
* Hanya kolom `nilai` yang benar-benar bergantung pada kombinasi `(nim, kode_mk)`.

### Solusi Pemisahan Tabel (Dekomposisi 2NF):
```sql
-- 1. Tabel Master Mahasiswa
CREATE TABLE mahasiswa (
  nim VARCHAR(15) PRIMARY KEY,
  nama_mhs VARCHAR(100) NOT NULL
);

-- 2. Tabel Master Mata Kuliah
CREATE TABLE mata_kuliah (
  kode_mk VARCHAR(10) PRIMARY KEY,
  nama_mk VARCHAR(100) NOT NULL,
  dosen VARCHAR(100) NOT NULL,
  ruang VARCHAR(20) NOT NULL
);

-- 3. Tabel Transaksi KRS / Nilai
CREATE TABLE krs_nilai (
  nim VARCHAR(15) NOT NULL,
  kode_mk VARCHAR(10) NOT NULL,
  nilai VARCHAR(2),
  PRIMARY KEY (nim, kode_mk),
  FOREIGN KEY (nim) REFERENCES mahasiswa(nim) ON DELETE CASCADE,
  FOREIGN KEY (kode_mk) REFERENCES mata_kuliah(kode_mk) ON DELETE RESTRICT
);
```

---

## 4. Langkah 3: Bentuk Normal Ketiga (3NF)
**Aturan Mutlak 3NF**:
1. Harus sudah memenuhi syarat 2NF.
2. Tidak boleh ada **ketergantungan transitif** (*transitive dependency*), yaitu kolom non-key yang bergantung pada kolom non-key lainnya.

Pada tabel `mata_kuliah` di 2NF:
* `ruang` sering kali melekat pada `dosen` atau jadwal kelas, bukan properti inheren dari mata kuliah itu sendiri. Jika dosen berganti, seluruh entri mata kuliah harus di-update (*update anomaly*).

### Solusi Pemisahan Tabel (3NF Sempurna):
```sql
-- Tabel Dosen Pengampu
CREATE TABLE dosen (
  id_dosen INT AUTO_INCREMENT PRIMARY KEY,
  nama_dosen VARCHAR(100) NOT NULL,
  ruang_kantor VARCHAR(20) NOT NULL
);

-- Tabel Mata Kuliah (Mengacu ke id_dosen via Foreign Key)
CREATE TABLE mata_kuliah_3nf (
  kode_mk VARCHAR(10) PRIMARY KEY,
  nama_mk VARCHAR(100) NOT NULL,
  sks INT NOT NULL DEFAULT 3,
  id_dosen INT NOT NULL,
  FOREIGN KEY (id_dosen) REFERENCES dosen(id_dosen)
);
```

> [!ERROR]
> Hindari normalisasi berlebihan (*over-normalization*) melebihi 3NF / BCNF untuk tugas praktikum semester 1-5, karena akan membuat query JOIN terlalu kompleks dan menurunkan performa baca pada laporan sederhana.

---

## 5. Ringkasan Cheat-Sheet SQL
```terminal
$ mysql -u root -p sistem_akademik_boash < skema_3nf.sql
# Output: Query OK, 4 tables created. All foreign keys verified.
```
Simpan file SQL di atas sebagai template praktikum Anda. Dengan skema 3NF ini, data dijamin konsisten dan siap dipakai untuk backend REST API maupun Laravel Eloquent.
