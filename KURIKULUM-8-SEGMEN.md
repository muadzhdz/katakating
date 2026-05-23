# KURIKULUM 8 SEGMEN THE PENGUIN CIRCLE — VERSI MENTOR
## Panduan Lengkap Mengajar 8 Segmen + 3 Bulan Buffer (Juni 2026 - April 2027)

> 📱 **Multimedia Survival Kit:** Setiap segmen punya jadwal konten (1 poster + 1 video)
> untuk media sosial. Lihat [`multimedia-survival-kit.md`](multimedia-survival-kit.md)
> untuk template caption, storyboard, & jadwal upload.

---

📘 **Cara Baca Dokumen Ini:**
Dokumen ini adalah pegangan lo sebagai mentor. Setiap segmen punya struktur:
1. **Tujuan Segmen** — apa yang harus dicapai
2. **Minggu 1-4** — breakdown tiap pertemuan dengan ⏱️ timing
3. **Materi Lengkap Command** — fungsi, perbedaan, analogi, contoh, error tips
4. **Tantangan per Minggu** — PR untuk peserta
5. **Project** — step-by-step simulasi lengkap

> 💡 **Perbedaan dari kurikulum 11 segmen:** Kurikulum ini menggabungkan beberapa segmen
> agar lebih padat dan efisien. Total 8 segmen aktif + 3 bulan buffer di akhir.

---

# 📌 SESSION 0 (1 Juni 2026)
## "Perkenalan & Setup Terminal"

> 🎯 **Tujuan:** Semua peserta punya terminal yang siap pakai, paham apa itu CLI,
> dan tau gambaran 8 bulan ke depan.
>
> ⚠️ **PENTING:** Peserta WAJIB menyelesaikan **[persiapan-pertemuan-0.md](persiapan-pertemuan-0.md)**
> SEBELUM datang. Session 0 fokus ke verifikasi & troubleshooting — BUKAN install dari scratch.
> Share file itu ke grup WA minimal H-3.

### Flow Lengkap (120 menit):

| Waktu | Durasi | Aktivitas | Persiapan |
|-------|--------|-----------|-----------|
| 15.30-15.45 | 15' | **Perkenalan Lingkaran** — Semua duduk melingkar. Perkenalan nama + angkatan + "satu hal yang lo pengen bisa di CLI" | Kertas nama (opsional) |
| 15.45-16.00 | 15' | **Apa itu The Penguin Circle?** — Naskah lo: *"Ini bukan kelas. Ini tempat ngulik bareng. Lo nggak bakal dijejelin teori. Lo bakal praktik, error, benerin sendiri, dan jadi jago."* | - |
| 16.00-16.20 | 20' | **Apa itu CLI & Linux?** — CLI vs GUI, analogi CLI = stik mobil / GUI = matic, industri pake CLI | Proyektor/laptop demo |
| 16.20-16.40 | 20' | **Kurikulum 8 Segmen** — Tunjukin poster kurikulum. Sorot: "S1 Navigasi, S2 Editor Teks, S3 Admin, S4 Jaringan, S5 Git, S6 AI CLI, S7 Web Dev, S8 Mobile Dev" | Poster kurikulum |
| 16.40-17.00 | 20' | **Verifikasi Instalasi** — Cek satu per satu: Ubuntu bisa dibuka? Git terinstall? SSH key ke GitHub? neofetch jalan? | Laptop masing-masing |
| 17.00-17.10 | 10' | **Tanda Hidup: neofetch** — Semua jalanin `neofetch` + `ssh -T git@github.com`. Screenshot, kirim ke grup. | - |
| 17.10-17.20 | 10' | **Clone Repo Organisasi** — `git clone` kurikulum & template-submission bareng-bareng | - |
| 17.20-17.30 | 10' | **Preview Segmen 1 + tanya jawab** | - |

### Naskah Penting Session 0:

**Naskah "Apa itu CLI":**
> *"CLI itu Command Line Interface. Layar hitam tempat lo ngomong sama komputer pake teks. Kenapa kita pake ini, bukan klik-klik?*
> *Coba bayangin: lo mau rename 100 file foto. Kalo pake GUI, lo klik kanan rename... satu-satu... 100 kali. Pake CLI, 1 baris command, 5 detik, beres.*
> *Ini yang bakal lo butuhin semester depan pas belajar Laravel, Flutter, Next.js. Semua pake terminal."*

**Naskah "Harapan 8 Bulan":**
> *"8 bulan dari sekarang, lo bakal:*
> 1. *Bisa navigasi file system tanpa mouse*
> 2. *Paham permission, proses sistem, jaringan dasar*
> 3. *Bisa pake Git buat backup project*
> 4. *Bisa pake AI CLI buat bikin website & aplikasi mobile*
> *Itu semua dicapai step by step, 1 minggu 1 pertemuan."*

---

# 📌 PHASE 1: CLI DASAR (JUNI - NOVEMBER) — 6 SEGMEN

---

# SEGMEN 1: NAVIGASI & MANAJEMEN FILE (JUNI)

## 🎯 Tujuan Segmen

Setelah segmen ini, peserta bisa:
- Tau posisi mereka di dalam sistem (pwd, ls, cd)
- Bikin folder dan file (mkdir, touch)
- Pindahin dan copy file (mv, cp)
- Hapus file dan folder (rm, rmdir)
- Paham struktur direktori Linux dan wildcard

---

## 📅 MINGGU 1: "Lo Disini" — Navigasi & Bikin Folder/File

> ⚠️ **CRITICAL WSL FIX:** Fresh WSL Ubuntu TIDAK punya folder default (Downloads, Pictures, dll).
> Karena itu, teaching order-nya: `pwd` → `ls` → `cd ~` → `mkdir Downloads` → `cd Downloads` →
> `mkdir Pictures` → `cd Pictures` → `cd ..`. Peserta HARUS bikin folder dulu sebelum `cd` ke dalamnya.

### Yang Bakal Dipelajari:
`pwd`, `ls`, `cd`, `mkdir`, `touch`

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Pemanasan** — Buka terminal. "Coba lo liat layar lo. Itu namanya shell. Dari sini lo bisa ngontrol seluruh komputer." |
| 10-15' | **pwd** — "Print Working Directory. Nunjukin posisi lo." |
| 15-20' | **ls** — "List. Nunjukin isi folder." Demo: `ls` → (mungkin kosong di WSL fresh) |
| 20-25' | **cd ~** — "Change Directory ke home. Rumah lo." |
| 25-30' | **mkdir** — **⚠️ PENTING: WSL fresh gak punya folder bawaan.** Demo: `mkdir Downloads` → `mkdir Pictures` → `mkdir Documents` |
| 30-35' | **cd ke folder baru** — "Sekarang lo baru bisa masuk." Demo: `cd Downloads` → `pwd` |
| 35-40' | **touch** — "Bikin file kosong." Demo: `touch catatan.txt` → `ls` |
| 40-50' | **cd ..** — "Naik satu level." Demo: `cd ..` → `pwd`. Juga `cd Pictures` → `cd ../Downloads` |
| 50-60' | **Praktik: "Jelajah Kampung Halaman"** — Bikin folder `latihan`, masuk, bikin 3 file, keluar |
| 60-75' | **Q&A + tantangan minggu ini** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `pwd` — Print Working Directory

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Nunjukin posisi lo sekarang di dalam folder |
| **Analogi** | Kayak lo ngecek Google Maps: "Gua sekarang di mana sih?" |
| **Contoh** | `pwd` → output: `/home/muadz` |
| **Error umum** | Nggak ada. Paling aman. |
| **Tips** | Pake `pwd` setiap kali lo bingung posisi. |

---

#### `ls` — List Directory

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Nampilin isi folder — file dan subfolder apa aja yang ada |
| **Analogi** | Kayak lo buka lemari dan liat isinya |
| **Contoh** | `ls` → output: `Downloads Documents Pictures` |

**Flag penting `ls`:**

| Command | Fungsi | Contoh Output |
|---------|--------|--------------|
| `ls` | List nama file/folder aja | `Downloads Documents Pictures` |
| `ls -l` | List detail (ukuran, tanggal, permission) | `drwxr-xr-x 2 user user 4096 May 13 15:30 Documents` |
| `ls -a` | List termasuk file tersembunyi | `. .. .bashrc Documents Downloads` |
| `ls -la` | List detail + file tersembunyi | `-rw-r--r-- 1 user user 123 May 13 .bashrc` |

**Kombinasi flag:**

| Command | Kegunaan |
|---------|----------|
| `ls -lh` | Ukuran file dalam format manusia (KB, MB) |
| `ls -lS` | Urutin dari yang paling gede |
| `ls -ltr` | Urutin dari yang paling lama |
| `ls *.txt` | Cuma file .txt aja (pake wildcard) |

**Error umum:**
- `ls /root` tanpa sudo → "Permission denied" (wajar, folder root)
- `ls folder_yang_gak_ada` → "No such file or directory"

---

#### `cd` — Change Directory

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Pindah ke folder lain |
| **Analogi** | Kayak lo jalan dari satu ruangan ke ruangan lain |
| **Contoh** | `cd Downloads` → masuk ke folder Downloads |

**Macam-macam `cd`:**

| Command | Ke Mana | Penjelasan |
|---------|---------|------------|
| `cd Downloads` | Masuk folder Downloads | Pindah ke folder yang ada di posisi sekarang |
| `cd ..` | Naik 1 folder ke atas | Kayak "balik ke ruangan sebelumnya" |
| `cd ~` | Pulang ke home folder | Home = rumah lo di Linux |
| `cd /` | Ke root system | Root = "paling atas" dari seluruh sistem |
| `cd -` | Balik ke folder sebelumnya | "Kembali ke tempat lo sebelumnya" |
| `cd ../..` | Naik 2 folder | Pindah ke kakeknya folder |

**Perbedaan PATH: Absolute vs Relative:**

| Jenis | Contoh | Penjelasan |
|-------|--------|------------|
| **Absolute path** | `cd /home/muadz/Documents` | Path lengkap dari root (`/`). Bisa dipake dari mana aja. |
| **Relative path** | `cd Documents` | Path dari posisi sekarang. Cuma bisa dipake kalo lo lagi di `/home/muadz` |

**Error umum:**
- **WSL fresh install:** `cd Downloads` → ERROR kalo `mkdir Downloads` belum dijalanin duluan!
- `cd Documents` pas lo lagi di `/etc` → "No such file or directory"

---

#### `mkdir` — Make Directory

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Bikin folder baru |
| **Analogi** | "Bikin laci baru di lemari" |
| **Contoh** | `mkdir tugas_kuliah` → bikin folder `tugas_kuliah` |

**Perbedaan `mkdir` vs `mkdir -p`:**

| Command | Fungsi | Kalo folder udah ada |
|---------|--------|---------------------|
| `mkdir project` | Bikin folder `project` | Error: "File exists" |
| `mkdir -p project` | Bikin folder `project` + parent kalo perlu | Aman aja |
| `mkdir -p a/b/c/d` | Bikin folder bertingkat sekaligus | Aman |

**Contoh keren `mkdir -p`:**
```bash
mkdir -p project_web/{public/{css,js,images},src/{components,utils}}
```
Ini bikin struktur folder kayak gini dalam 1 baris:
```
project_web/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
└── src/
    ├── components/
    └── utils/
```

**Error umum:**
- `mkdir a/b/c` — Error kalo folder a dan b belum ada. Makanya pake `-p`
- `mkdir Documents` pas folder itu udah ada — Error: "File exists"

---

#### `touch` — Bikin File Kosong

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Bikin file baru (kosong) atau update timestamp file |
| **Analogi** | "Kertas kosong baru" |
| **Contoh** | `touch catatan.txt` → bikin file `catatan.txt` |

**Perbedaan `touch` vs `nano`:**

| Command | Fungsi | Hasil |
|---------|--------|-------|
| `touch file.txt` | Bikin file KOSONG | File ada, isinya kosong |
| `nano file.txt` | Bikin file + LANGSUNG EDIT | File ada, langsung bisa ngetik |

**Kapan pake `touch`:**
```bash
touch file1.txt file2.txt file3.txt   # Bikin banyak file sekaligus
```

---

### 🧪 Tantangan Minggu 1 (PR):

> *"Buka terminal. Pake `pwd` buat cek posisi lo. Pake `ls` — apa yang muncul?*
> *Bikin folder `belajar_cli`, masuk ke dalemnya pake `cd`, bikin 3 file kosong pake `touch`: `catatan.txt`, `todo.txt`, `daftar.txt`.*
> *Pake `ls` buat verifikasi. Balik ke home pake `cd ~`.*
> *Catet: perintah apa aja yang lo pake, dan apa outputnya."*

---

## 📅 MINGGU 2: "Copy & Pindah" — Manipulasi File

### Yang Bakal Dipelajari:
`ls -la` (hidden files), `cp`, `cp -r`, `mv`, wildcard (`*`, `?`, `[]`), `cd -`

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review minggu lalu** — Ada yang error? Ada bingung soal WSL? |
| 10-15' | **ls -la & hidden files** — Jelasin `.bashrc`, `.gitconfig`, `.ssh/` |
| 15-25' | **cd - & cd variations** — Lenyap dengan `cd -` |
| 25-35' | **Demo: cp & cp -r** — Copy file vs folder |
| 35-45' | **Demo: mv** — Pindah + rename |
| 45-55' | **Demo: Wildcard** — `*`, `?`, `[]` |
| 55-65' | **Praktik bareng** — "Bikin struktur project dan copy file" |
| 65-75' | **Tantangan minggu ini** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `ls -la` — Hidden Files

File yang namanya dimulai dengan titik (`.`) itu **hidden file**. Biasa dipake buat file konfigurasi.

| File Hidden | Fungsinya |
|-------------|-----------|
| `.bashrc` | Konfigurasi terminal lo |
| `.gitconfig` | Konfigurasi Git |
| `.ssh/` | Folder buat kunci SSH |

**Tips:** Kalo lo liat file aneh yang mulai dengan dot, jangan dihapus sembarangan.

---

#### `cp` — Copy File/Folder

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Copy file dari satu tempat ke tempat lain |
| **Analogi** | "Fotokopi kertas. Aslinya tetap ada, hasil fotokopinya di tempat baru." |
| **Sintaks** | `cp [flag] sumber tujuan` |

**Perbedaan `cp` vs `cp -r`:**

| Command | Fungsi | Contoh |
|---------|--------|--------|
| `cp a.txt backup/` | Copy file `a.txt` ke folder `backup/` | ✅ file aja |
| `cp folder1/ backup/` | ❌ ERROR — "omitting directory" | ❌ folder, butuh -r |
| `cp -r folder1/ backup/` | Copy folder `folder1` ke `backup/` | ✅ folder+isi |

**Tips penting `cp`:**
```bash
cp file.txt backup/file.txt         # Copy + rename sekaligus
cp -r project/ project_backup/      # Backup folder project
cp *.jpg images/                    # Copy semua file .jpg ke folder images
cp -v file.txt backup/              # Tampilin proses (verbose)
cp -i file.txt backup/              # Minta konfirmasi kalo timpa (interactive)
```

**Error umum:**
- Lupa `-r` pas copy folder → "omitting directory"
- File tujuan udah ada → ketimpa tanpa peringatan (kecuali pake `-i`)

---

#### `mv` — Move atau Rename

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Memindahkan ATAU mengganti nama file/folder |
| **Analogi** | "Lo mindahin buku dari rak A ke rak B. Atau lo ganti sampul bukunya." |
| **Sintaks** | `mv [flag] sumber tujuan` |

**Perbedaan `cp` vs `mv`:**

| Situasi | `cp` | `mv` |
|---------|------|------|
| Aslinya masih ada? | ✅ Ya, tetap ada | ❌ Hilang, pindah |
| Fungsi utama | Gandakan | Pindahkan |
| Rename? | ❌ Nggak bisa | ✅ Bisa |
| Kecepatan | Lama (copy isi) | Cepet (ubah path aja) |

**Dua Fungsi `mv`:**

**1. Pindahin file:**
```bash
mv catatan.txt Documents/catatan.txt   # Pindah ke folder Documents
mv *.jpg Pictures/                      # Pindah semua jpg
```

**2. Rename file:**
```bash
mv catatan_lama.txt catatan_baru.txt   # Ganti nama
mv project/ project_2026/              # Rename folder juga bisa
```

**Contoh kombinasi:**
```bash
mv tugas.docx arsip/tugas_semester1.docx  # Pindah + rename sekaligus
```

**Error umum:**
- Lupa kalo `mv` itu mindahin, BUKAN copy → aslinya hilang
- Mv ke folder yang nggak ada → "No such file or directory"

---

#### Wildcard `*` dan `?`

| Pattern | Arti | Contoh |
|---------|------|--------|
| `*` | Semua karakter | `*.txt` = semua file yang berakhiran .txt |
| `?` | Satu karakter aja | `file?.txt` = file1.txt, file2.txt (bukan file10.txt) |
| `[abc]` | Salah satu karakter | `file[123].txt` = file1.txt, file2.txt, file3.txt |

**Contoh Wildcard:**
```bash
ls *.txt                    # Liat semua file teks
cp *.jpg images/            # Copy semua foto
rm *.log                    # Hapus semua file log
ls file???                  # Cari file dengan 4 karakter setelah "file"
```

---

### 🧪 Tantangan Minggu 2 (PR):

> *"Bikin folder `percobaan_copy`. Di dalamnya bikin 5 file .txt, 3 file .jpg (touch), 2 file .pdf.*
> *Praktikkin:*
> 1. *`cp *.jpg backup_jpg/` — copy semua jpg*
> 2. *`mv *.txt arsip_txt/` — pindahin semua txt*
> 3. *`cp *.pdf backup_pdf/` — copy semua pdf*
> 4. *Coba `ls ?` — apa yang muncul?*
> *Rekam hasilnya di file `hasil_wildcard.txt`."*

---

## 📅 MINGGU 3: "Bikin & Hapus" — Manajemen File Lanjutan

### Yang Bakal Dipelajari:
`rmdir`, `rm`, `rm -rf`, `rm -i`, `mkdir -p` bertingkat

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review minggu lalu** — Kumpulin PR wildcard |
| 10-25' | **Demo: mkdir -p** — Bikin folder bertingkat 1 baris |
| 25-40' | **Demo: rm & rmdir** — Bedanya hapus file vs folder kosong |
| 40-55' | **Demo: rm -rf** — Peringatan keras! |
| 55-65' | **Praktik: "Bikin & Hancurin Struktur"** |
| 65-75' | **Tantangan minggu ini** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `rmdir` vs `rm -rf` — Hapus Folder

**PERBEDAAN PENTING — INI YANG SERING BIKIN PANIK:**

| Command | Fungsi | Hapus folder berisi? |
|---------|--------|---------------------|
| `rmdir folder` | Hapus folder KOSONG aja | ❌ Error kalo ada isinya |
| `rm -rf folder` | Hapus folder BESERTA ISINYA | ✅ Paksa hapus semua |

| Aspek | `rmdir` | `rm -rf` |
|-------|---------|----------|
| **Kapan pake** | Kalo yakin foldernya kosong | Kalo yakin mau hapus semuanya |
| **Safety** | Aman — error kalo ada isi | Berbahaya — nggak ada konfirmasi |
| **Contoh sukses** | `rmdir kosong/` → folder hilang | `rm -rf project_lama/` → folder+isi hilang |
| **Contoh gagal** | `rmdir ada_isi/` → "Directory not empty" | Tetep jalan |

**Peringatan Keras `rm -rf`:**
```bash
rm -rf /   = hapus SELURUH sistem operasi. JANGAN PERNAH COBA.
rm -rf ~   = hapus SEMUA file pribadi lo. JANGAN COBA JUGA.
```

**Tips aman pake `rm -rf`:**
1. Selalu `ls` dulu folder yang mau dihapus
2. Kalo ragu, pake `rm -ri` (interactive — nanya tiap file)
3. Jangan pernah pake `sudo rm -rf` kalo nggak yakin 100%

---

#### `rm` — Hapus File

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Hapus file |
| **Contoh** | `rm file_lama.txt` |

**Flag penting `rm`:**

| Flag | Fungsi |
|------|--------|
| `rm -i file` | Minta konfirmasi tiap hapus (aman) |
| `rm -f file` | Paksa hapus tanpa konfirmasi |
| `rm -r folder` | Hapus folder rekursif |
| `rm -v file` | Tampilin prosesnya (verbose) |

**Trik:**
```bash
rm *.txt                 # Hapus semua file .txt
rm -rf folder/           # Hapus folder beserta isinya
```

---

### 🧪 Tantangan Minggu 3 (PR):

> *"Bikin folder `latihan_hapus`. Di dalamnya bikin 5 file (`a.txt` sampai `e.txt`) pake `touch`. Bikin subfolder `tmp` yang isi 2 file kosong.*
> *Praktikkin:*
> 1. *Hapus `e.txt` pake `rm`*
> 2. *Hapus subfolder `tmp` pake `rm -rf`*
> 3. *Coba `rmdir latihan_hapus` — liat errornya*
> 4. *Hapus folder `latihan_hapus` pake `rm -rf`*
> *Catet: error apa aja yang muncul dan kenapa."*

---

## 📅 MINGGU 4: PROJECT SEGMEN 1

### 💻 PROJECT: "Misi: Merapikan Folder Berantakan"

#### Deskripsi ke Peserta:
> *"Gua udah nyiapin 1 folder yang isinya berantakan banget. Ada file dimana-mana, folder kosong, dan file yang nggak jelas. Tugas lo: rapihin semuanya pake command yang udah lo pelajari."*

#### Simulasi Lengkap (Step-by-Step Mentor):

**Langkah 1: Mentor menyiapkan folder kekacauan:**

```bash
# Bikin folder utama
mkdir -p misi_rapihin
cd misi_rapihin

# Bikin file-file acak
touch catatan.txt data.txt tugas.txt
touch "file acak 1.txt" "file acak 2.txt"
echo "bakso" > makanan.txt
echo "nasi goreng" >> makanan.txt
echo "soto" >> makanan.txt
echo "bakso" >> makanan.txt
echo "air mineral" > minuman.txt
echo "jus jeruk" >> minuman.txt
echo "apel" > buah.txt
echo "pisang" >> buah.txt
echo "kangkung" > sayuran.txt
echo "bayam" >> sayuran.txt
echo "panci" > alat_rumah_tangga.txt
echo "wajan" >> alat_rumah_tangga.txt

# Bikin subfolder kosong
mkdir subfolder_kosong
mkdir subfolder_lain

# Bikin subfolder dengan file kosong
mkdir subfolder_isi_kosong
touch subfolder_isi_kosong/file1.txt
touch subfolder_isi_kosong/file2.txt

# Bikin file kosong
touch kosong1.txt kosong2.txt kosong3.txt

# Bikin folder tujuan
mkdir tugas_akhir
```

**Langkah 2: Yang dilakukan peserta:**

```bash
# 1. Liat kondisi awal
ls -la

# 2. Bikin folder kategori pake mkdir -p
mkdir -p kategori/{makanan,minuman,buah,sayuran,alat_rumah_tangga}

# 3. Pindahin file ke kategori masing-masing
mv makanan.txt kategori/makanan/
mv minuman.txt kategori/minuman/
mv buah.txt kategori/buah/
mv sayuran.txt kategori/sayuran/
mv alat_rumah_tangga.txt kategori/alat_rumah_tangga/

# 4. Hapus folder kosong pake rmdir
rmdir subfolder_kosong
rmdir subfolder_lain

# 5. Hapus folder berisi file kosong pake rm -rf
rm -rf subfolder_isi_kosong

# 6. Hapus file kosong
rm kosong1.txt kosong2.txt kosong3.txt

# 7. Pindahin file acak ke tugas_akhir
mv "file acak 1.txt" tugas_akhir/
mv "file acak 2.txt" tugas_akhir/
mv catatan.txt tugas_akhir/
mv data.txt tugas_akhir/
mv tugas.txt tugas_akhir/

# 8. Verifikasi hasil akhir
tree
```

**Hasil akhir yang diharapkan:**
```
.
├── kategori/
│   ├── alat_rumah_tangga/
│   │   └── alat_rumah_tangga.txt
│   ├── buah/
│   │   └── buah.txt
│   ├── makanan/
│   │   └── makanan.txt
│   ├── minuman/
│   │   └── minuman.txt
│   └── sayuran/
│       └── sayuran.txt
└── tugas_akhir/
    ├── catatan.txt
    ├── data.txt
    ├── file acak 1.txt
    ├── file acak 2.txt
    └── tugas.txt
```

**Kriteria Penilaian:**
- [ ] Folder `kategori` ada dengan 5 subfolder
- [ ] Setiap file ada di kategori yang benar
- [ ] Folder kosong udah dihapus
- [ ] File kosong udah dihapus
- [ ] File acak udah dipindah ke `tugas_akhir`
- [ ] Screen record + cam dikirim (max 10 menit)

---

# SEGMEN 2: EDITOR & PENGOLAHAN TEKS (JULI)

> 💡 **Segmen ini menggabungkan Segmen 2 (Editor & Manipulasi Teks) dan Segmen 3
> (Pencarian & Pengolahan Teks) dari kurikulum 11 segmen.**

## 🎯 Tujuan Segmen

Setelah segmen ini, peserta bisa:
- Bikin dan edit file teks dari terminal pake `nano`
- Baca isi file dengan berbagai cara (`cat`, `less`, `head`, `tail`)
- Ngolah teks (`wc`, `sort`, `uniq`, `nl`)
- Nyari file (`find`, `locate`, `which`)
- Nyari teks di dalam file (`grep`)
- Ngolah teks lanjutan (`cut`, `tr`, `diff`)

---

## 📅 MINGGU 1: Terminal Text Editor & Baca File

### Yang Bakal Dipelajari:
`nano`, `cat`, `less`, `more`, `head`, `tail`, `tail -f`

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review + tanya jawab Segmen 1** |
| 10-25' | **Demo nano** — Buka, ngetik, save, exit. Shortcut: Ctrl+O (save), Ctrl+X (exit), Ctrl+K (cut), Ctrl+U (paste) |
| 25-40' | **Demo: cat & less** — Baca file pendek vs panjang |
| 40-55' | **Demo: head, tail, tail -f** — Liat awal/akhir file |
| 55-65' | **Praktik bareng** — Bikin catatan kuliah pake nano, baca pake cat/less |
| 65-75' | **Q&A + tantangan** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `nano` — Terminal Text Editor

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Editor teks langsung di terminal. Bikin dan edit file tanpa GUI. |
| **Analogi** | Kaya Notepad, tapi di dalam terminal. Sederhana, ringan, nggak perlu mouse. |

**Cara Pake `nano`:**
```bash
nano file_baru.txt    # Bikin + buka file baru
nano file_lama.txt    # Buka file yang udah ada
```

**Shortcut Penting `nano`:**

| Shortcut | Fungsi | Analogi |
|----------|--------|---------|
| `Ctrl+O` | Simpan (Write Out) | Kayak Ctrl+S |
| `Ctrl+X` | Keluar (Exit) | Kayak Alt+F4 |
| `Ctrl+K` | Potong baris (Cut) | Kayak Ctrl+X |
| `Ctrl+U` | Tempel (Uncut) | Kayak Ctrl+V |
| `Ctrl+W` | Cari kata (Where is) | Kayak Ctrl+F |
| `Ctrl+G` | Bantuan (Get Help) | Kayak F1 |
| `Ctrl+A` | Ke awal baris | Kayak Home |
| `Ctrl+E` | Ke akhir baris | Kayak End |
| `Alt+A` | Mulai seleksi teks | Kayak Shift+arrow |

**Cara Save & Exit:**
1. `Ctrl+O` → Enter → (file tersimpan, nano masih terbuka)
2. `Ctrl+X` → (nano tertutup, balik ke terminal)
Atau langsung: `Ctrl+X` → `Y` → `Enter`

**Perbedaan `nano` vs `vim` vs `micro`:**

| Editor | Level | Gampang/Susah | Install |
|--------|-------|---------------|---------|
| `nano` | Pemula | ✅ Gampang banget | Udah built-in |
| `micro` | Menengah | ✅ Gampang (mirip GUI) | Perlu install |
| `vim` | Expert | ❌ Belajar dulu, klo hafal cepet | Udah built-in |

**Error umum:**
- `Ctrl+S` di nano = mengunci layar (bukan save!). Tekan `Ctrl+Q` buat unlock.
- Lupa save → `Ctrl+X` → nano nanya "Save modified buffer?" — Jawab `Y`

---

#### `cat` — ConcatéNate (Baca File)

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Nampilin isi file langsung di terminal |
| **Analogi** | "Lo buka lembaran kertas dan baca isinya langsung" |

**Perbedaan `cat` vs `less` vs `head` vs `tail`:**

| Command | Fungsi | Cocok buat file... | Cara baca |
|---------|--------|-------------------|-----------|
| `cat file` | Tampilkan semua | Pendek (< 50 baris) | Langsung semua |
| `less file` | Tampilkan per halaman | Panjang (> 50 baris) | Scroll pake arrow/space |
| `head file` | 10 baris pertama | Mau liat awal aja | Otomatis 10 baris |
| `tail file` | 10 baris terakhir | Mau liat akhir aja | Otomatis 10 baris |
| `tail -f file` | Ikuti perubahan | Log file realtime | Update otomatis |

**Contoh `cat`:**
```bash
cat catatan.txt                       # Tampilin isi catatan.txt
cat file1.txt file2.txt               # Tampilin file1 lalu file2
cat file1.txt file2.txt > gabungan.txt  # Gabungin 2 file jadi 1
```

**Contoh `less`:**
```bash
less file_panjang.txt    # Buka file, scroll pake arrow/spasi
# Di dalam less:
# q = keluar
# /kata = cari kata "kata"
# n = next match
# g = ke awal, G = ke akhir
```

**Contoh `head` & `tail`:**
```bash
head -n 5 file.txt         # 5 baris pertama
tail -n 20 file.txt        # 20 baris terakhir
tail -f server.log         # Pantau log secara realtime (Ctrl+C buat berhenti)
```

**Trik keren `tail -f`:**
```bash
tail -f storage/logs/laravel.log   # Laravel log
tail -f /var/log/syslog            # Sistem Linux log
```

**Error umum:**
- `cat file_gede_banget.txt` — terminal lo bakal penuh, pake `less` aja
- File belum ada → "No such file or directory"

---

### 🧪 Tantangan Minggu 1 (PR):

> *"Bikin file `biodata.txt` pake `nano`. Isinya: nama, NIM, prodi, hobi, cita-cita.*
> *Bikin file `daftar_belanja.txt` isi 15 item.*
> *Praktikkin:*
> 1. *`head -n 5 daftar_belanja.txt`*
> 2. *`tail -n 3 daftar_belanja.txt`*
> 3. *`cat daftar_belanja.txt`*
> *Catet hasilnya di file `hasil_baca.txt`."*

---

## 📅 MINGGU 2: Info & Pengolahan Teks

### Yang Bakal Dipelajari:
`wc`, `sort`, `uniq`, `nl`, operator `>` dan `>>` (redirect)

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | Review |
| 10-25' | **wc** — Hitung baris, kata, karakter |
| 25-40' | **sort & uniq** — Urutin & hapus duplikat |
| 40-50' | **nl** — Nomor baris |
| 50-60' | **Redirect** — `>` (timpa), `>>` (tambah) |
| 60-75' | **Praktik: "Analisis Data Teks"** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `wc` — Word Count

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Hitung jumlah baris, kata, dan karakter dalam file |
| **Contoh** | `wc catatan.txt` |

**Flag `wc`:**

| Flag | Fungsi | Contoh |
|------|--------|--------|
| `wc -l` | Hitung BARIS aja | `wc -l data.txt` → "25 data.txt" |
| `wc -w` | Hitung KATA aja | `wc -w data.txt` |
| `wc -c` | Hitung KARAKTER aja | `wc -c data.txt` |
| `wc file` | Baris + kata + karakter | `wc data.txt` |

**Trik keren:**
```bash
ls | wc -l                      # Hitung ada berapa file di folder ini
grep "error" log.txt | wc -l    # Hitung ada berapa baris error
```

---

#### `sort` — Mengurutkan

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Mengurutkan isi file berdasarkan abjad/angka |
| **Contoh** | `sort data.txt` |

**Perbedaan `sort` biasa vs `sort -n` vs `sort -r`:**

| Command | Fungsi | Contoh Input | Output |
|---------|--------|-------------|--------|
| `sort file` | Urut abjad | 2, 10, 1, 20 | 1, 10, 2, 20 |
| `sort -n file` | Urut angka (numerik) | 2, 10, 1, 20 | 1, 2, 10, 20 |
| `sort -r file` | Urut terbalik | a, b, c | c, b, a |
| `sort -u file` | Urut + hapus duplikat | a, a, b | a, b |

---

#### `uniq` — Unik (Hapus Duplikat)

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Hapus baris yang duplikat (BERURUTAN) |
| **Contoh** | `uniq data.txt` |

⚠️ **PENTING:** `uniq` cuma hapus duplikat KALO BARISNYA BERURUTAN. Makanya biasanya dipake setelah `sort`:
```bash
sort data.txt | uniq           # Urutin dulu, baru hapus duplikat
sort data.txt | uniq -c        # Hitung jumlah kemunculan tiap baris
sort data.txt | uniq -d        # Cuma tampilin yang duplikat
```

---

#### `nl` — Number Lines

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Nampilin file dengan nomor baris |
| **Contoh** | `nl catatan.txt` |

Mirip `cat -n`:
```bash
nl catatan.txt       # Beri nomor baris
cat -n catatan.txt   # Sama aja
```

---

### 🧪 Tantangan Minggu 2 (PR):

> *"Bikin file `data.txt` isi 10 nama buah (pisang, apel, jeruk, apel, mangga, jeruk, pisang, anggur, semangka, apel).*
> *Praktikkin:*
> 1. *`sort data.txt` — urutin abjad*
> 2. *`sort data.txt | uniq` — urutin + hapus duplikat*
> 3. *`sort data.txt | uniq -c` — hitung jumlah tiap buah*
> 4. *`wc -l data.txt` — jumlah baris*
> *Simpen hasilnya di file `analisis_buah.txt` pake redirect `>`*"

---

## 📅 MINGGU 3: Cari File & Teks

### Yang Bakal Dipelajari:
`find`, `locate`, `which`, `grep`, `grep -r`, `grep -i`, `grep -n`, `grep -c`

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | Review |
| 10-25' | **find & locate** — Cari file berdasarkan nama, ukuran, type |
| 25-30' | **which** — Cari lokasi program |
| 30-50' | **grep** — Cari teks dalam file. Flag -i, -r, -n, -c, -l, -v |
| 50-60' | **Pipe dengan grep** — `ls | grep`, `history | grep`, `ps aux | grep` |
| 60-75' | **Praktik bareng** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `find` — Cari File

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Nyari file/folder berdasarkan nama, ukuran, tanggal |
| **Analogi** | "Kayak lo nyari dokumen di lemari. Bisa nyari berdasarkan nama, ukuran, atau kapan terakhir dibuka." |
| **Sintaks** | `find [lokasi] [kriteria]` |

**Berdasarkan NAMA:**
```bash
find . -name "catatan.txt"           # Cari file catatan.txt di folder ini
find . -name "*.txt"                 # Cari semua file .txt
find /home -name "*.pdf"             # Cari semua pdf di /home
find . -iname "catatan.TXT"          # -iname = case insensitive
```

**Berdasarkan TYPE:**
```bash
find . -type f                       # Cuma file aja
find . -type d                       # Cuma folder aja
```

**Berdasarkan UKURAN:**
```bash
find . -size +100M                   # File lebih dari 100MB
find . -size -1k                     # File kurang dari 1KB
find . -size 0                       # File kosong
```

**Perbedaan `find` vs `locate`:**

| Aspek | `find` | `locate` |
|-------|--------|----------|
| **Kecepatan** | Lambat (scan realtime) | Cepet (pake database) |
| **Akurasi** | 100% realtime | Bisa outdated |
| **Kapan pake** | Butuh akurat | Butuh cepet |

```bash
locate catatan.txt                   # Cepet pake database
sudo updatedb                        # Update database locate
```

#### `which` — Cari Lokasi Program
```bash
which nano           # /usr/bin/nano
which python3        # /usr/bin/python3
```

---

#### `grep` — Global Regular Expression Print

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Nyari pola/teks tertentu di dalam file |
| **Analogi** | "Kayak lo nyari kata di buku tebel. `grep` langsung buka semua halaman dan tunjukin baris yang ada kata itu." |

**Command dasar `grep`:**
```bash
grep "bakso" makanan.txt             # Cari "bakso" di makanan.txt
grep "error" server.log              # Cari "error" di log
```

**Flag penting `grep`:**

| Flag | Fungsi | Contoh |
|------|--------|--------|
| `-i` | Abaikan huruf besar/kecil | `grep -i "multimedia" file.txt` |
| `-r` | Cari di semua file (rekursif) | `grep -r "TODO" .` |
| `-n` | Tampilin nomor baris | `grep -n "error" log.txt` → "10: error found" |
| `-c` | Hitung jumlah kemunculan | `grep -c "error" log.txt` → "5" |
| `-l` | Tampilin nama file aja | `grep -l "error" *.txt` |
| `-v` | Balik (cari yang TIDAK match) | `grep -v "public" config.txt` |

**Perbedaan `grep` vs `grep -r` vs `grep -i`:**

| Command | Mencari | Di mana | Case-sensitive? |
|---------|---------|---------|-----------------|
| `grep "data" file.txt` | kata "data" | file itu aja | ✅ Ya |
| `grep -ri "data" .` | kata "data" di semua file | folder ini + subfolder | ❌ Tidak |
| `grep -c "error" *.log` | jumlah "error" | semua file .log | ✅ Ya |

**Pipe dengan grep:**
```bash
ls | grep ".txt"                     # Cari file .txt di output ls
history | grep "git"                 # Cari perintah git di history
ps aux | grep "firefox"              # Cari proses firefox
```

---

### 🧪 Tantangan Minggu 3 (PR):

> *"Bikin folder `latihan_grep` dan isi 5 file teks. Di salah satu file, tulis kata 'rahasia'.*
> *Praktikkin:*
> 1. *`grep -r "rahasia" .` — cari kata rahasia di semua file*
> 2. *`find . -name "*.txt"` — cari semua file .txt*
> 3. *`find . -size 0` — cari file kosong*
> *Catet semua hasilnya."*

---

## 📅 MINGGU 4: Pengolahan Teks Lanjutan + PROJECT SEGMEN 2

### Yang Bakal Dipelajari:
`cut`, `tr`, `diff` + Project

### ⏱️ Sesi (60-90 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-15' | **cut** — Potong teks per kolom |
| 15-25' | **tr** — Ganti/hapus karakter |
| 25-35' | **diff** — Bandingkan 2 file |
| 35-90' | **💻 PROJECT** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `cut` — Potong Teks per Kolom

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Motong bagian tertentu dari setiap baris |
| **Contoh** | `cut -d: -f1 /etc/passwd` — ambil username |

```bash
echo "nama:email:telpon" | cut -d: -f1     # nama
echo "nama:email:telpon" | cut -d: -f2     # email
echo "nama:email:telpon" | cut -d: -f1,3   # nama:telpon
```

**Perbedaan `cut -d` vs `cut -c`:**

| Flag | Fungsi | Contoh |
|------|--------|--------|
| `-d:` | Pemisahnya karakter `:` | `cut -d: -f1` |
| `-c1-5` | Potong karakter ke 1-5 | `cut -c1-5 file.txt` |

```bash
ls -la | cut -d" " -f1               # Ambil permission aja
who | cut -d" " -f1                  # Ambil username aja
```

---

#### `tr` — Translate/Replace Karakter

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Ganti atau hapus karakter tertentu |
| **Contoh** | `cat file.txt | tr "a" "A"` — ganti a jadi A |

```bash
echo "hello world" | tr "a-z" "A-Z"        # HELLO WORLD
echo "Hello World" | tr " " "_"            # Hello_World
cat file.txt | tr ":" ","                  # Ganti : jadi , (CSV)
cat file.txt | tr -d " "                   # Hapus semua spasi
cat file.txt | tr -s "\n"                  # Gabungin baris kosong berurutan
```

---

#### `diff` — Bandingkan 2 File

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Nampilin perbedaan antara 2 file |
| **Contoh** | `diff file1.txt file2.txt` |

```bash
diff versi1.txt versi2.txt           # Liat bedanya
diff -u versi1.txt versi2.txt        # Unified format (lebih gampang dibaca)
```

**Output `diff`:**
```
1c1
< ini file versi 1
---
> ini file versi 2
```
Arti: baris 1 berubah (c=changed). `<` = isi file1. `>` = isi file2.

---

### 💻 PROJECT SEGMEN 2: "Membuat Catatan Kuliah & Analisis Teks"

#### Simulasi Lengkap:

```bash
# 1. Bikin folder project
mkdir project_catatan
cd project_catatan

# 2. Bikin 3 file catatan kuliah pake nano
nano pengantar_multimedia.txt
# Isi 5 baris:
# Multimedia adalah kombinasi teks, gambar, audio, video, dan animasi.
# Multimedia digunakan dalam pendidikan, hiburan, dan bisnis.
# Ada dua jenis multimedia: linear dan interaktif.
# Contoh multimedia linear adalah film dan video.
# Contoh multimedia interaktif adalah game dan aplikasi.

nano teknologi_web.txt
# Isi 7 baris:
# Teknologi web meliputi front-end, back-end, dan database.
# Front-end menggunakan HTML, CSS, dan JavaScript.
# Back-end menggunakan PHP, Python, atau JavaScript (Node.js).
# Framework front-end populer: React, Vue, Angular.
# Framework back-end populer: Laravel, Django, Express.
# Database yang umum: MySQL, PostgreSQL, MongoDB.
# Saat ini banyak developer menggunakan full-stack JavaScript.

nano desain_grafis.txt
# Isi 4 baris:
# Desain grafis adalah seni menyampaikan pesan melalui visual.
# Prinsip desain: keseimbangan, kontras, ritme, proporsi, kesatuan.
# Software desain: Adobe Photoshop, Illustrator, Canva.
# Desain grafis penting untuk branding dan pemasaran.

# 3. Gabungin semua file pake cat
cat pengantar_multimedia.txt > rangkuman.txt
cat teknologi_web.txt >> rangkuman.txt
cat desain_grafis.txt >> rangkuman.txt

# 4. Hitung statistik tiap file
wc *.txt

# 5. Cari kata "multimedia" di semua file
grep -n "multimedia" *.txt

# 6. Urutkan rangkuman
sort rangkuman.txt > rangkuman_terurut.txt

# 7. Bandingkan rangkuman asli vs terurut
diff rangkuman.txt rangkuman_terurut.txt

# 8. Ganti "multimedia" jadi "MM" pake tr
cat pengantar_multimedia.txt | tr "multimedia" "MM" > pengantar_singkat.txt

# 9. Hasil akhir
tree
# ├── desain_grafis.txt
# ├── pengantar_multimedia.txt
# ├── pengantar_singkat.txt
# ├── rangkuman.txt
# ├── rangkuman_terurut.txt
# └── teknologi_web.txt
```

---

# SEGMEN 3: SYSTEM ADMIN & TOOLS (AGUSTUS)

> 💡 **Segmen ini menggabungkan Segmen 4 (Permission & Sistem Kontrol) dan Segmen 5
> (Package Manager & Tools) dari kurikulum 11 segmen.**

## 🎯 Tujuan Segmen

Setelah segmen ini, peserta bisa:
- Paham konsep user, superuser, sudo
- Atur hak akses file (chmod, chown)
- Manajemen proses (ps, kill, top/htop)
- Install software lewat terminal (apt, brew)
- Download file dari internet (wget, curl)
- Pake tools multimedia (ffmpeg, imagemagick)
- Visualisasi struktur folder (tree)

---

## 📅 MINGGU 1: User, Superuser & File Permissions

### Yang Bakal Dipelajari:
`whoami`, `id`, `sudo`, `su`, `chmod`, `chown`

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review Segmen 2 + tanya jawab** |
| 10-20' | **whoami, id, sudo, su** — Siapa lo? Gimana jadi admin? |
| 20-35' | **Konsep Permission** — rwx, user/group/others |
| 35-50' | **chmod numerik & simbolik** — 755, 644, 600 |
| 50-60' | **chown** — Ganti pemilik file |
| 60-75' | **Praktik: "Jaga Rahasia"** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `whoami` — Siapa Saya?
```bash
whoami    # Output: muadz (nama user lo)
```

#### `id` — Detail User
```bash
id        # Output: uid=1000(muadz) gid=1000(muadz) groups=1000(muadz),4(adm)
```

#### `sudo` — Superuser Do

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Jalanin command sebagai admin (root) |
| **Analogi** | Kayak lo pake "Run as Administrator" di Windows |
| **Peringatan** | Jangan asal `sudo` — lo bisa hancurin sistem |

**Perbedaan command biasa vs sudo:**

| Tanpa sudo | Pake sudo |
|------------|-----------|
| `apt install nano` ❌ Permission denied | `sudo apt install nano` ✅ Berhasil |
| `rm -rf /etc` ❌ Permission denied | `sudo rm -rf /etc` ⚠️ SISTEM RUSAK! |
| `ls /root` ❌ Permission denied | `sudo ls /root` ✅ Bisa liat |

**Aman vs Berbahaya pake sudo:**

| ✅ Aman pake sudo | ❌ Jangan pernah |
|------------------|-----------------|
| `sudo apt update` | `sudo rm -rf /` |
| `sudo apt install firefox` | `sudo chmod 777 /` |
| `sudo systemctl restart apache2` | `sudo dd if=/dev/zero of=/dev/sda` |

#### `su` — Switch User
```bash
su -                   # Jadi root (butuh password root)
sudo su -              # Jadi root (pake password lo)
exit                   # Balik ke user sebelumnya
```

---

#### Konsep Permission Linux

Setiap file/folder punya **3 level akses** untuk **3 tipe user**:

```
-rwxr-xr-x  1 muadz  muadz  123 May 13 15:30 script.sh
^^^^^^^^^
|||||||||
|||└────└ Orang lain (others): r-x
||└─────── Group (group): r-x
└────────── Pemilik (user): rwx
```

**Arti huruf:**

| Huruf | Kepanjangan | Arti |
|-------|-------------|------|
| `r` | read | Baca isi file |
| `w` | write | Edit/hapus file |
| `x` | execute | Jalanin file (kalo program/script) |
| `-` | - | Nggak punya akses |

**Contoh pembacaan:**
```
-rw-r--r-- 1 muadz muadz 45 May 13 catatan.txt
```
- Pemilik (muadz): `rw-` → bisa baca dan tulis
- Group: `r--` → cuma bisa baca
- Others: `r--` → cuma bisa baca

---

#### `chmod` — Change Mode (Ubah Permission)

**Cara 1: Mode Numerik (PALING SERING DIPAKE)**

Setiap izin punya angka:
| Izin | Angka |
|------|-------|
| r | 4 |
| w | 2 |
| x | 1 |
| - | 0 |

| Kombinasi | Hitungan | Angka |
|-----------|----------|-------|
| `rwx` | 4+2+1 | 7 |
| `rw-` | 4+2+0 | 6 |
| `r-x` | 4+0+1 | 5 |
| `r--` | 4+0+0 | 4 |
| `---` | 0+0+0 | 0 |

**Contoh pake angka:**
```bash
chmod 755 script.sh     # rwxr-xr-x
chmod 644 catatan.txt   # rw-r--r--
chmod 600 rahasia.txt   # rw-------
chmod 777 semua.sh      # rwxrwxrwx (⚠️ SEMUA BISA NGAPAIN AJA)
```

**Tabel lengkap chmod:**

| Angka | Pemilik | Group | Others | Kapan pake |
|-------|---------|-------|--------|------------|
| 755 | rwx | r-x | r-x | File program/script umum |
| 644 | rw- | r-- | r-- | File teks biasa |
| 600 | rw- | --- | --- | File pribadi (rahasia) |
| 700 | rwx | --- | --- | Script pribadi |
| 777 | rwx | rwx | rwx | ⚠️ Berbahaya! |

**Cara 2: Mode Simbolik (Alternatif)**
```bash
chmod u+x script.sh     # Tambah execute untuk user (pemilik)
chmod g-w file.txt      # Hapus write untuk group
chmod o+r file.txt      # Tambah read untuk others
chmod a+x script.sh     # Tambah execute untuk semua
```

#### `chown` — Change Owner (Ganti Pemilik)
```bash
sudo chown muadz file.txt           # Ganti pemilik jadi muadz
sudo chown muadz:admin file.txt     # Ganti pemilik + group
sudo chown -R muadz folder/         # Ganti pemilik beserta isinya (rekursif)
```

**Perbedaan chmod vs chown:**

| Command | Fungsi | Contoh |
|---------|--------|--------|
| `chmod` | Atur IZIN (baca/tulis/jalanin) | `chmod 755 script.sh` |
| `chown` | Ganti PEMILIK | `chown muadz file.txt` |

---

### 🧪 Tantangan Minggu 1 (PR):

> *"Bikin file `rahasia.txt` isi kata 'Ini rahasia saya'. Pake `chmod 600` biar cuma lo yang bisa baca.*
> *Coba `cat rahasia.txt` — harusnya bisa.*
> *Bikin file `publik.txt` isi 'Untuk semua orang'. Pake `chmod 644`.*
> *Verifikasi pake `ls -la` — liat perbedaan permission-nya."*

---

## 📅 MINGGU 2: Proses & Informasi Sistem

### Yang Bakal Dipelajari:
`ps`, `kill`, `top`/`htop`, `uname`, `df`, `free`, `uptime`

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | Review |
| 10-25' | **ps & kill** — Liat dan matiin proses |
| 25-40' | **top/htop** — Task Manager terminal |
| 40-55' | **Info Sistem** — uname, df, free, uptime |
| 55-65' | **Praktik: "Admin Laptop Sendiri"** |
| 65-75' | **Tantangan** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `ps` — Process Status
```bash
ps               # Proses milik lo aja
ps aux           # Semua proses di sistem
ps aux | grep firefox   # Cari proses firefox
```

**Output `ps aux`:**
```
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
muadz     1234  0.5  2.0 123456 12345 ?        Ssl  15:30   0:01 firefox
```
- `PID`: nomor proses (buat ngekill)
- `%CPU`: pake CPU berapa persen
- `%MEM`: pake RAM berapa persen

#### `kill` — Matiin Proses
```bash
kill 1234              # Matiin proses dengan PID 1234
kill -9 1234           # Paksa matiin (force kill — SIGKILL)
kill -15 1234          # Matiin secara halus (SIGTERM)
```

**Perbedaan kill -9 vs kill -15:**

| Signal | Nomor | Fungsi | Safety |
|--------|-------|--------|--------|
| SIGTERM | 15 | "Tolong mati dong" | ✅ Aman, proses simpen data dulu |
| SIGKILL | -9 | "MATI LO!" | ⚠️ Paksa, data bisa ilang |

```bash
kill -15 1234          # Coba matiin halus dulu
kill -9 1234           # Kalo nggak mau mati, paksa
```

#### `top` / `htop` — Task Manager Terminal
```bash
top                # Task manager bawaan
htop               # Task manager keren (install: sudo apt install htop)
```

Di `htop`:
- `F3` — cari proses
- `F5` — liat tree
- `F9` — kill proses
- `q` — keluar

#### Informasi Sistem:
```bash
uname -a           # Info sistem operasi (kernel, arsitektur)
df -h              # Kapasitas hardisk (dalam format GB)
free -h            # Kapasitas RAM
uptime             # Berapa lama nyala sejak boot
```

---

### 🧪 Tantangan Minggu 2 (PR):

> *"Buka terminal. Jalanin:*
> 1. *`ps aux` — liat semua proses yang jalan*
> 2. *`uname -a` — catet info sistem lo*
> 3. *`df -h` — liat kapasitas hardisk*
> 4. *`free -h` — liat kapasitas RAM*
> 5. *`uptime` — liat berapa lama laptop lo nyala*
> *Catet semua hasilnya di file `spesifikasi_sistem.txt`."*

---

## 📅 MINGGU 3: Package Manager & Download Tools

### Yang Bakal Dipelajari:
`apt`, `brew`, `wget`, `curl`, `unzip`, `tar`

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | Review |
| 10-25' | **apt** — Install, update, hapus software |
| 25-35' | **brew** — Buat pengguna Mac |
| 35-50' | **wget & curl** — Download dari internet |
| 50-60' | **unzip & tar** — Ekstrak arsip |
| 60-75' | **Praktik: "Install & Download"** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `apt` — Advanced Package Tool (Ubuntu/Debian)

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Install, update, hapus software di Linux |
| **Analogi** | "Kayak Play Store atau App Store, tapi di terminal." |

**Command penting apt:**

| Command | Fungsi |
|---------|--------|
| `sudo apt update` | Update daftar package (cek versi terbaru) |
| `sudo apt upgrade` | Upgrade semua software yang ada |
| `sudo apt install firefox` | Install firefox |
| `sudo apt remove firefox` | Hapus firefox (konfigurasi nyisa) |
| `sudo apt purge firefox` | Hapus firefox + konfigurasinya |
| `sudo apt autoremove` | Hapus package yang nggak kepake |
| `apt search firefox` | Cari package |
| `apt show firefox` | Liat info package |

**Flow update yang benar:**
```bash
sudo apt update      # 1. Cek update
sudo apt upgrade     # 2. Install update (kalo ada)
```

**Untuk MacOS (brew):**
```bash
brew update
brew install neofetch
```

**Perbedaan apt vs brew:**

| Urusan | Linux (apt) | Mac (brew) |
|--------|-------------|------------|
| Install | `sudo apt install neofetch` | `brew install neofetch` |
| Hapus | `sudo apt remove neofetch` | `brew uninstall neofetch` |
| Update | `sudo apt update` | `brew update` |
| Cari | `apt search neofetch` | `brew search neofetch` |

---

#### `wget` — Web Get (Download dari Internet)
```bash
wget https://example.com/file.zip               # Download file
wget -O nama_baru.zip https://example.com/file.zip  # Download + rename
wget -c https://example.com/file_besar.zip       # Resume download
```

#### `curl` — Client URL (Download + API)
```bash
curl https://api.github.com/users/muadz          # Dapetin data JSON
curl -O https://example.com/file.zip             # Download file
curl -o nama_baru.zip https://example.com/file.zip  # Download + rename
```

**Perbedaan wget vs curl:**

| Aspek | `wget` | `curl` |
|-------|--------|--------|
| Simple download | ✅ | ✅ |
| Download folder (rekursif) | ✅ | ❌ |
| API testing (JSON) | ❌ | ✅ |
| Output ke terminal | ❌ | ✅ |
| Resume download | ✅ (`-c`) | ❌ |

#### `unzip` & `tar` — Ekstrak File
```bash
unzip file.zip                        # Ekstrak ZIP
unzip file.zip -d folder_tujuan       # Ekstrak ke folder tertentu
zip -r arsip.zip folder/              # Bikin ZIP

tar -xvf file.tar.gz                  # Ekstrak TAR.GZ
tar -xvf file.tar.gz -C folder/       # Ekstrak ke folder tertentu
tar -czvf arsip.tar.gz folder/        # Bikin TAR.GZ
```

**Penjelasan flag tar:**

| Flag | Arti |
|------|------|
| `-x` | Extract (ekstrak) |
| `-c` | Create (bikin) |
| `-z` | Pake gzip (buat .gz) |
| `-v` | Verbose (tampilin proses) |
| `-f` | File (nama filenya) |

---

### 🧪 Tantangan Minggu 3 (PR):

> *"Praktikkin install software:*
> 1. *`sudo apt update` — update daftar package*
> 2. *`sudo apt install htop tree neofetch -y` — install 3 tools*
> 3. *`tree --version` — verifikasi tree terinstall*
> 4. *`neofetch` — jalanin neofetch, screenshot*
> *Catet semua langkahnya."*

---

## 📅 MINGGU 4: Tools Multimedia + PROJECT SEGMEN 3

### Yang Bakal Dipelajari:
`ffmpeg`, `imagemagick`, `tree` + Project

### ⏱️ Sesi (60-90 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-15' | **ffmpeg** — Convert gambar/video |
| 15-25' | **imagemagick** — Resize, efek gambar |
| 25-35' | **tree** — Visualisasi folder |
| 35-90' | **💻 PROJECT** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### Install Tools:
```bash
sudo apt install ffmpeg imagemagick tree neofetch htop
```

#### `ffmpeg` — Tool Multimedia Superpower
```bash
# Convert gambar
ffmpeg -i foto.jpg foto.png           # JPG → PNG
ffmpeg -i foto.png foto.jpg           # PNG → JPG

# Convert video
ffmpeg -i video.mov video.mp4         # MOV → MP4
ffmpeg -i video.mp4 -ss 00:00:10 -t 5 clip.mp4  # Potong 5 detik

# Compress video
ffmpeg -i video.mp4 -vcodec libx264 -crf 28 compressed.mp4
```

#### `imagemagick` — Manipulasi Gambar
```bash
# Resize
convert foto.jpg -resize 50% foto_kecil.jpg
convert foto.jpg -resize 800x600 foto_baru.jpg

# Convert format
convert foto.jpg foto.png

# Efek
convert foto.jpg -negatif foto_negatif.jpg
convert foto.jpg -blur 0x8 foto_blur.jpg
```

#### `tree` — Struktur Folder Visual
```bash
tree                              # Liat struktur folder
tree -L 2                         # Kedalaman 2 level aja
tree -a                           # Termasuk hidden file
tree -h                           # Tampilin ukuran file
```

---

### 💻 PROJECT SEGMEN 3: "Admin Server & Toolkit Multimedia"

#### Simulasi Lengkap:

```bash
# ===== BAGIAN 1: Admin Server =====

# 1. Bikin folder server_lab
mkdir server_lab
cd server_lab

# 2. Bikin file-file
echo "Nama: Muadz" > data_mahasiswa.txt
echo "NIM: 12345" >> data_mahasiswa.txt
echo "Email: muadz@email.com" >> data_mahasiswa.txt

echo "Senin: 08.00-10.00 Praktikum Web" > jadwal_praktikum.txt
echo "Selasa: 10.00-12.00 Desain Grafis" >> jadwal_praktikum.txt

echo '#!/bin/bash' > aplikasi_rahasia.sh
echo 'echo "Aplikasi berjalan dengan sukses"' >> aplikasi_rahasia.sh

echo "Catatan pribadi: jangan lupa beli bakso" > catatan_pribadi.txt

# 3. Atur permission
chmod 644 data_mahasiswa.txt         # rw-r--r--
chmod 755 aplikasi_rahasia.sh        # rwxr-xr-x
chmod 600 catatan_pribadi.txt        # rw-------

# 4. Verifikasi
ls -la

# 5. Jalanin script
./aplikasi_rahasia.sh
# Output: Aplikasi berjalan dengan sukses

# ===== BAGIAN 2: Toolkit Multimedia =====

cd ..
mkdir toolkit_demo
cd toolkit_demo

# 6. Download gambar contoh
wget -O contoh.jpg https://picsum.photos/800/600

# 7. Convert format
ffmpeg -i contoh.jpg hasil_convert.png

# 8. Resize gambar
convert contoh.jpg -resize 50% hasil_resize.jpg

# 9. Liat struktur
tree -h

# 10. Screenshot spesifikasi
neofetch
```

---

# SEGMEN 4: JARINGAN & REMOTE ACCESS (SEPTEMBER)

## 🎯 Tujuan Segmen

Setelah segmen ini, peserta bisa:
- Tes koneksi jaringan (ping)
- Cek alamat IP (ip addr)
- Download file dari internet (curl, wget lanjutan)
- Remote server pake SSH
- Transfer file pake SCP

---

## 📅 MINGGU 1: Cek Jaringan Dasar

### Yang Bakal Dipelajari:
`ping`, `ip addr` / `ifconfig`, `curl -I`, `hostname`

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review Segmen 3** |
| 10-25' | **ping** — Tes koneksi ke server |
| 25-40' | **ip addr** — Cek alamat IP laptop |
| 40-55' | **hostname & curl -I** — Cek identitas & respon server |
| 55-75' | **Praktik: "Network Checkup"** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `ping` — Tes Koneksi

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Tes apakah suatu server bisa dijangkau |
| **Analogi** | "Kayak lo nelpon seseorang — 'Halo, bisa denger?' — `ping` ngirim paket kecil ke server dan nunggu jawaban." |

```bash
ping google.com                     # Ping terus sampe Ctrl+C
ping -c 4 google.com                # Ping 4 kali aja
ping -c 10 8.8.8.8                  # Ping ke IP Google DNS
```

**Output ping:**
```
PING google.com (142.250.0.46) 56(84) bytes of data.
64 bytes from 142.250.0.46: icmp_seq=1 ttl=118 time=12.3 ms
```
- `time=12.3ms` = waktu respon. Makin kecil makin cepet.
- Kalo `Request timeout` = server gak balas (mati/blokir)

#### `ip addr` / `ifconfig` — Cek IP
```bash
ip addr                # Linux — liat alamat IP
# Di output, cari: inet 192.168.1.10  ← ini IP laptop lo
```

**Perbedaan ip addr vs ifconfig:**

| Command | Ketersediaan |
|---------|-------------|
| `ip addr` | Bawaan Linux modern — lebih rapi |
| `ifconfig` | Perlu install (net-tools) — legacy |

#### `hostname` — Nama Komputer
```bash
hostname               # Tampilin nama komputer lo
hostname -I            # Tampilin alamat IP (huruf I besar)
```

---

### 🧪 Tantangan Minggu 1 (PR):

> *"Buka terminal. Catet semua hasil ini ke file `laporan_jaringan.txt`:*
> 1. *`hostname` — nama komputer lo*
> 2. *`hostname -I` — alamat IP lo*
> 3. *`ping -c 5 google.com` — tes koneksi ke Google*
> 4. *`ping -c 3 8.8.8.8` — tes ke DNS Google*
> *Dari hasil ping, catet: time rata-ratanya berapa ms?"*

---

## 📅 MINGGU 2: Transfer Data & API

### Yang Bakal Dipelajari:
`curl` lanjutan (GET, POST, header), `wget` lanjutan (resume, batch)

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | Review |
| 10-25' | **curl GET** — Download file, cek response |
| 25-35' | **curl API** — Pake public API (GitHub, cuaca) |
| 35-50' | **wget lanjutan** — Resume download, batch |
| 50-65' | **Praktik: "Ngobrol sama API Publik"** |
| 65-75' | **Tantangan** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `curl` lanjutan:
```bash
# Download file
curl -O https://example.com/file.pdf

# Cek response HTTP
curl -I https://google.com
# Output: HTTP/2 200 → berarti server hidup

# Pake public API
curl https://api.github.com/users/octocat
curl https://api.github.com/repos/opencode-ai/opencode

# Kirim data ke API
curl -X POST -H "Content-Type: application/json" \
  -d '{"nama":"Muadz"}' \
  https://api.example.com/user
```

#### `wget` lanjutan:
```bash
# Download file besar — bisa di-resume kalo putus
wget -c https://example.com/file_besar.zip

# Download banyak file dari daftar
wget -i daftar_link.txt

# Batasi kecepatan download
wget --limit-rate=200k https://example.com/file.zip
```

---

### 🧪 Tantangan Minggu 2 (PR):

> *"Interaksi sama API publik:*
> 1. *`curl -I https://google.com` — cek apakah Google hidup*
> 2. *`curl https://api.github.com/users/github` — dapetin data JSON*
> 3. *`curl -O https://www.google.com/robots.txt` — download robots.txt*
> *Catet semua langkah dan hasilnya."*

---

## 📅 MINGGU 3: SSH & Remote Access

### Yang Bakal Dipelajari:
`ssh`, `ssh-keygen`, `ssh-copy-id`, `scp`

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | Review |
| 10-25' | **ssh** — Login ke server remote |
| 25-40' | **ssh-keygen** — Bikin kunci SSH biar gak perlu password |
| 40-55' | **scp** — Transfer file via SSH |
| 55-75' | **Praktik: "SSH Simulasi"** (localhost kalo gak punya partner) |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `ssh` — Secure Shell (Remote Server)
```bash
ssh user@192.168.1.100               # Masuk ke server remote
ssh -p 2222 user@192.168.1.100       # Port kustom (kalo bukan 22)
```

**Skenario khas SSH:**
```bash
ssh muadz@203.0.113.10
# Password: ****
# $ whoami   # → muadz
# $ pwd      # → /home/muadz
# $ exit     # Balik ke laptop lo
```

#### `ssh-keygen` — Bikin Kunci SSH
```bash
ssh-keygen -t rsa -b 4096            # Bikin kunci SSH
# Hasil:
# /home/muadz/.ssh/id_rsa       (kunci PRIVAT — jangan dishare!)
# /home/muadz/.ssh/id_rsa.pub   (kunci PUBLIK — bisa dishare)

ssh-copy-id user@192.168.1.100      # Kirim kunci publik ke server
# Selanjutnya login tanpa password!
```

**Analogi kunci SSH:**
> *"Kunci privat = kunci rumah lo (jangan dikasih ke siapapun). Kunci publik = gembok (lo bisa pasang di server mana aja)."*

#### `scp` — Secure Copy (Transfer file via SSH)
```bash
scp file.txt user@192.168.1.100:/home/user/    # Upload file
scp user@192.168.1.100:/home/user/file.txt .   # Download file
scp -r folder/ user@192.168.1.100:/home/user/  # Upload folder
```

---

### 🧪 Tantangan Minggu 3 (PR):

> *"Simulasi SSH ke localhost:*
> 1. *`ssh-keygen -t rsa -b 4096` — bikin kunci SSH*
> 2. *`ls -la ~/.ssh/` — liat kunci yang kebikin*
> 3. *`cat ~/.ssh/id_rsa.pub` — liat kunci publik lo*
> *Catet: apa bedanya file id_rsa vs id_rsa.pub?"*

---

## 📅 MINGGU 4: PROJECT SEGMEN 4

### 💻 PROJECT: "Network Detective"

#### Simulasi Lengkap:

```bash
# 1. Bikin folder project
mkdir network_detective
cd network_detective

# 2. Buat laporan jaringan
echo "=== LAPORAN JARINGAN ===" > laporan_jaringan.txt
echo "Waktu: $(date)" >> laporan_jaringan.txt
echo "" >> laporan_jaringan.txt

# 3. Catat nama komputer & IP
echo "=== Identitas ===" >> laporan_jaringan.txt
echo "Hostname: $(hostname)" >> laporan_jaringan.txt
echo "IP Address:" >> laporan_jaringan.txt
ip addr | grep "inet " >> laporan_jaringan.txt 2>/dev/null
echo "" >> laporan_jaringan.txt

# 4. Tes koneksi
echo "=== Ping ke Google (5x) ===" >> laporan_jaringan.txt
ping -c 5 google.com >> laporan_jaringan.txt 2>&1
echo "" >> laporan_jaringan.txt

# 5. Cek apakah website hidup
echo "=== Cek HTTP Response ===" >> laporan_jaringan.txt
curl -I https://google.com -m 5 >> laporan_jaringan.txt 2>&1
echo "" >> laporan_jaringan.txt

# 6. Download file contoh
echo "=== Download Test ===" >> laporan_jaringan.txt
curl -o contoh_download.txt https://www.google.com/robots.txt 2>/dev/null
echo "Download selesai" >> laporan_jaringan.txt
echo "" >> laporan_jaringan.txt

# 7. Simulasi SCP ke localhost
mkdir -p penerima
cp laporan_jaringan.txt penerima/   # Simulasi SCP

# 8. Cek hasil
cat laporan_jaringan.txt

# 9. Tampilkan struktur
tree -h
```

---

# SEGMEN 5: GIT & VERSION CONTROL (OKTOBER)

## 🎯 Tujuan Segmen

Setelah segmen ini, peserta bisa:
- Inisialisasi repository Git
- Stage, commit, dan liat history
- Bikin dan pindah branch
- Push project ke GitHub
- Clone repository dari GitHub

---

## 📅 MINGGU 1: Git Dasar

### Yang Bakal Dipelajari:
`git init`, `git status`, `git add`, `git commit`, `git log`

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Apa itu Git?** — Analogi: "Kayak save point di game. Lo bisa balik kapan aja." |
| 10-20' | **git init & git status** — Bikin repo, cek status |
| 20-35' | **git add** — Stage file (dari untracked → staged) |
| 35-50' | **git commit** — Simpen perubahan (staged → committed) |
| 50-60' | **git log** — Liat history commit |
| 60-75' | **Praktik: "Commit Pertamaku"** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### Apa itu Git?

| Aspek | Penjelasan |
|-------|-----------|
| **Fungsi** | Nyimpen history perubahan file. Lo bisa balik ke versi sebelumnya kapan aja. |
| **Analogi** | "Kayak 'Ctrl+Z' super canggih buat seluruh project. Save point tiap kali selesai ngerjain sesuatu." |

**Alur Git:**
```
Working Directory → (git add) → Staging Area → (git commit) → Repository
```

#### `git init` — Bikin Repository
```bash
mkdir project-git-pertamaku
cd project-git-pertamaku
git init
# Output: Initialized empty Git repository in project-git-pertamaku/.git/
```

#### `git status` — Cek Status
```bash
echo "Halo Git" > README.md
git status
# Output:
# On branch master
# No commits yet
# Untracked files:
#   README.md
```

#### `git add` — Stage File
```bash
git add README.md                    # Stage 1 file
git add .                            # Stage semua file
git add *.txt                        # Stage semua file .txt
```

#### `git commit` — Simpan Perubahan
```bash
git commit -m "Initial commit: menambahkan README"
```

**Tips pesan commit yang baik:**

| ❌ Jelek | ✅ Bagus |
|----------|----------|
| `update file` | `Menambahkan fitur login` |
| `fix` | `Memperbaiki bug di halaman utama` |
| `asdf` | `Update README dengan dokumentasi API` |

#### `git log` — Liat History
```bash
git log            # Liat semua commit
git log --oneline  # Liat commit dalam 1 baris
git log --graph    # Liat branch visual
```

---

### 🧪 Tantangan Minggu 1 (PR):

> *"Bikin folder `latihan_git`, `cd` ke dalamnya, jalanin `git init`.*
> *Bikin file `catatan.txt`, isi: "Hari ini belajar Git di The Penguin Circle".*
> *Jalanin `git status` — liat file dalam status untracked.*
> *Jalanin `git add catatan.txt` — stage file.*
> *Jalanin `git commit -m "Catatan pertama"` — commit.*
> *Jalanin `git log --oneline` — liat history commit pertamamu!"*

---

## 📅 MINGGU 2: Branching

### Yang Bakal Dipelajari:
`git branch`, `git checkout`, `git merge`

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | Review — cek hasil PR commit pertama |
| 10-25' | **Konsep Branch** — Kenapa perlu cabang? |
| 25-40' | **git branch & git checkout** — Bikin & pindah branch |
| 40-55' | **git merge** — Gabungin branch |
| 55-65' | **Praktik: "Fitur Baru di Branch Sendiri"** |
| 65-75' | **Tantangan** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `git branch` — Cabang

```bash
git branch                           # Liat daftar branch
git branch fitur-login               # Bikin branch baru
git checkout fitur-login             # Pindah ke branch fitur-login
git checkout -b fitur-login          # Bikin + pindah sekaligus
```

**Kenapa branch?**

| Branch | Fungsi |
|--------|--------|
| `main` / `master` | Branch utama — kode yang udah stabil |
| `fitur-x` | Lagi ngembangin fitur baru — aman, gak ngaruh ke main |
| `bugfix-y` | Lagi benahin error |

#### `git merge` — Gabungin Branch
```bash
git checkout main                    # Pindah ke main dulu
git merge fitur-login                # Gabungin fitur-login ke main
```

**Visualisasi Branch:**
```
main:    A---B---C---D
              \
fitur-login:   E---F
→ Setelah merge: A---B---C---D---F'
```

---

### 🧪 Tantangan Minggu 2 (PR):

> *"Pake folder `latihan_git` dari minggu lalu.*
> 1. *Bikin branch baru: `git checkout -b percobaan`*
> 2. *Bikin file baru `fitur.txt`, isi "Fitur percobaan"*
> 3. *Add dan commit: `git add .` lalu `git commit -m "Percobaan di branch baru"`*
> 4. *Balik ke main: `git checkout main` — liat `fitur.txt` hilang?*
> 5. *Gabungin: `git merge percobaan` — sekarang `fitur.txt` muncul lagi*
> *Catet: kenapa pas checkout main file fitur.txt ilang?"*

---

## 📅 MINGGU 3: Remote & GitHub

### Yang Bakal Dipelajari:
`git remote add`, `git push`, `git pull`, `git clone`

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | Review + konsep remote |
| 10-25' | **Bikin repo di GitHub** — lewat browser |
| 25-40' | **git remote add & git push** — Upload ke GitHub |
| 40-55' | **git pull & git clone** — Download dari GitHub |
| 55-75' | **Praktik: "Push Project ke GitHub"** |

---

### 📖 MATERI LENGKAP COMMAND:

---

#### `git remote add` — Hubungin ke GitHub
```bash
git remote add origin https://github.com/username/repo.git
git remote -v                        # Liat remote
```

#### `git push` — Upload ke GitHub
```bash
git push -u origin main              # Upload pertama (setel upstream)
git push                             # Upload selanjutnya
```

#### `git pull` — Download dari GitHub
```bash
git pull origin main                 # Ambil perubahan terbaru
```

#### `git clone` — Copy Repository
```bash
git clone https://github.com/username/repo.git   # Download repo orang
```

**Flow kerja Git yang benar:**
```bash
# 1. Bikin repo di GitHub (via browser)
# 2. Clone ke laptop
git clone https://github.com/username/nama-repo.git
cd nama-repo

# 3. Kerjain sesuatu
echo "Update" >> README.md

# 4. Simpen perubahan
git add .
git commit -m "Update README"

# 5. Upload
git push
```

---

### 🧪 Tantangan Minggu 3 (PR):

> *"Buat akun GitHub kalo belum punya.*
> *Bikin repository baru di GitHub (publik, dengan README).*
> *Clone repo itu ke laptop: `git clone https://github.com/username/nama-repo.git`*
> *Edit README.md pake nano, tambahin baris baru.*
> *Add, commit, push: `git add .` → `git commit -m "Update README"` → `git push`*
> *Cek di GitHub browser — file harus udah terupdate!"*

---

## 📅 MINGGU 4: PROJECT SEGMEN 5

### 💻 PROJECT: "Backup Tugas Kuliah ke GitHub"

#### Simulasi Lengkap:

```bash
# 1. Bikin folder tugas kuliah
mkdir tugas_kuliah_trm
cd tugas_kuliah_trm

# 2. Bikin README
nano README.md
# Isi:
# # Tugas Kuliah TRM
# **Nama:** [Nama lo]
# **NIM:** [NIM lo]
# Repository ini berisi tugas-tugas kuliah.

# 3. Bikin struktur folder tugas
mkdir -p tugas/{web,desain,basis_data,mobile}

# 4. Isi tiap folder dengan file tugas
echo "Tugas 1: Membuat website profil" > tugas/web/tugas1.txt
echo "Tugas 2: Layout dengan CSS" > tugas/web/tugas2.txt
echo "Desain poster kampus" > tugas/desain/tugas1.txt
echo "ERD basis data perpustakaan" > tugas/basis_data/tugas1.txt

# 5. Bikin .gitignore
nano .gitignore
# Isi:
# *.log
# node_modules/
# .DS_Store

# 6. Inisialisasi Git
git init

# 7. Add semua file
git add .
git status   # Verifikasi semua file ke-stage

# 8. Commit pertama
git commit -m "Initial commit: struktur folder tugas kuliah"

# 9. Bikin repo di GitHub
echo "Buka github.com → New repository → nama: tugas-kuliah-trm"

# 10. Hubungin remote
git remote add origin https://github.com/username/tugas-kuliah-trm.git

# 11. Push ke GitHub
git push -u origin main

# 12. Verifikasi
echo "Cek: https://github.com/username/tugas-kuliah-trm"

# 13. Bonus: bikin branch baru
git checkout -b eksperimen
touch coba-coba.txt
git add coba-coba.txt
git commit -m "Eksperimen di branch sendiri"
git checkout main
```

---

# SEGMEN 6: AI CLI & PROMPT ENGINEERING (NOVEMBER)

## 🎯 Tujuan Segmen

Setelah segmen ini, peserta bisa:
- Paham bedanya AI CLI vs ChatGPT web
- Install dan pake AI CLI (opencode, Claude Code, atau GitHub Copilot)
- Nulis prompt yang efektif buat coding
- Evaluasi hasil output AI

---

## 📅 MINGGU 1: Pengenalan AI CLI

### Yang Bakal Dipelajari:
Apa itu AI CLI, perbedaan dengan ChatGPT, installasi, prompt dasar

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Apa itu AI CLI?** — Bedanya dengan ChatGPT web |
| 10-25' | **Demo AI CLI** — Install dan jalanin pertama kali |
| 25-45' | **Prompt Dasar** — "Bantu saya bikin file HTML..." |
| 45-60' | **Praktik: "Tanya Apa Aja"** — Setiap peserta kasih 3 pertanyaan |
| 60-75' | **Diskusi: Prompt Bagus vs Jelek** |

---

### 📖 MATERI LENGKAP:

---

#### Apa Bedanya AI CLI vs ChatGPT?

| Aspek | AI CLI (opencode, Claude Code) | ChatGPT Web |
|-------|-------------------------------|-------------|
| **Jalan di** | Terminal lo | Browser |
| **Bisa akses file** | ✅ Bisa baca file di laptop lo | ❌ Gabisa |
| **Bisa jalanin command** | ✅ Bisa eksekusi langsung | ❌ Cuma ngasih tau |
| **Bisa bikin file** | ✅ Bikin, edit, hapus file | ❌ Gabisa |
| **Privasi** | Kode lo di laptop sendiri | Data dikirim ke server |

#### Cara Install AI CLI:

**opencode (Rekomendasi):**
```bash
curl -fsSL https://opencode.ai/install.sh | sh
```

**GitHub Copilot CLI:**
```bash
npm install -g @githubnext/github-copilot-cli
```

**Claude Code (Anthropic):**
```bash
npm install -g @anthropic-ai/claude-code
```

#### Panduan Prompt Dasar

**Struktur Prompt yang Baik:**
1. **Konteks** — "Aku lagi di folder project ini"
2. **Tugas** — "Bantu aku bikin file..."
3. **Spesifikasi** — "...dengan fitur A, B, C"
4. **Format Output** — "Tolong pake Tailwind CSS"

| Prompt Jelek | Prompt Bagus |
|-------------|--------------|
| "Bantu saya" | "Bantu saya bikin script bash untuk rename semua file .jpg di folder ini menjadi format YYYY-MM-DD-1.jpg, dst" |
| "Bikin website" | "Bikin file HTML dengan tema portofolio pribadi yang terdiri dari header, section about, dan footer. Pake Tailwind CSS" |
| "Error" | "Saya dapat error 'Permission denied' pas jalanin `./script.sh`. Ini output `ls -la script.sh`: [output]. Kenapa?" |

---

### 🧪 Tantangan Minggu 1 (PR):

> *"Install AI CLI (opencode atau GitHub Copilot). Catet proses installasinya.*
> *Tanyain 3 pertanyaan soal CLI ke AI:*
> 1. *"Apa bedanya `cp` dan `mv`?"*
> 2. *"Gimana cara hapus folder beserta isinya?"*
> 3. *"Bantu saya bikin file HTML sederhana dengan tombol yang bisa diklik"*
> *Simpan semua prompt dan jawaban di file `log_ai.txt`."*

---

## 📅 MINGGU 2: Prompt Engineering untuk Coding

### Yang Bakal Dipelajari:
Teknik prompt: context chaining, few-shot, spesifikasi detail, iterative refinement

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | Review — diskusi hasil prompt peserta |
| 10-25' | **Context Chaining** — "Berdasarkan file sebelumnya, bantu saya..." |
| 25-40' | **Few-Shot Prompting** — Kasih contoh di prompt |
| 40-55' | **Iterative Refinement** — "Ubah bagian X jadi Y..." |
| 55-75' | **Praktik: "Prompt Lomba"** — 2 orang 1 kelompok, giliran prompt |

---

### 📖 MATERI LENGKAP:

---

#### Teknik Prompt Engineering

**1. Context Chaining:**
```
Prompt 1: "Bantu saya bikin file index.html portofolio"
Prompt 2: "Sekarang tambahin file style.css buat styling" 
Prompt 3: "Di index.html, tambahin section kontak di bawah about"
```

**2. Few-Shot (Kasih Contoh):**
```
"Bantu saya bikin file daftar_buah.txt dengan format:
apel: 5000
pisang: 3000
[saya mau nambah 5 buah lagi dengan format yang sama]"
```

**3. Spesifikasi Detail:**
```
❌ "Bikin kalkulator"
✅ "Bikin kalkulator sederhana pake HTML+CSS+JS dalam 1 file.
Fitur: tambah, kurang, kali, bagi. Tampilan pake grid 4x4.
Background putih, tombol abu-abu, angka hitam."
```

**4. Iterative Refinement:**
```
Prompt 1: "Bikin halaman web portofolio"
Prompt 2: "Background-nya ganti jadi biru tua (#1a1a2e)"
Prompt 3: "Font heading-nya pake 'Poppins' dari Google Fonts"
```

---

### 🧪 Tantangan Minggu 2 (PR):

> *"Pake AI CLI. Minta tolong bikin file HTML+CSS untuk halaman profil diri lo.*
> *Pertama: "Bantu saya bikin halaman profil pribadi pake HTML dan CSS."*
> *Kedua: "Tambahin foto profil (pake placeholder), nama, deskripsi singkat."*
> *Ketiga: "Bikin responsif — kalo di HP, layoutnya vertikal."*
> *Simpan file HTML dan CSS hasilnya."*

---

## 📅 MINGGU 3: AI untuk Troubleshooting & Scripting

### Yang Bakal Dipelajari:
Debug error dengan AI, bikin script bash dengan AI

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | Review |
| 10-30' | **AI untuk Debug** — Copy error message, minta solusi |
| 30-50' | **AI untuk Scripting** — "Bikin script bash yang..." |
| 50-60' | **Etika & Limitasi AI** — Jangan asal percaya, verifikasi! |
| 60-75' | **Praktik: "Bikin Script Otomatis"** |

---

### 📖 MATERI LENGKAP:

---

#### Debug dengan AI

Ketika dapat error, jangan panik. Copy error message ke AI:

```
"Waktu jalanin `./script.sh` saya dapat error:
'bash: ./script.sh: Permission denied'
Output ls -la: -rw-r--r-- 1 user user 32 May 13 script.sh
Kenapa dan gimana fixnya?"
```

AI akan jawab: "Permission denied karena file-nya gak punya execute permission. Fix: `chmod +x script.sh`"

#### Bikin Script Bash dengan AI

```
"Bantu saya bikin script bash bernama backup.sh yang:
1. Bikin folder backup_YYYYMMDD (tanggal hari ini)
2. Copy semua file .txt dari folder ini ke folder backup
3. Tampilin pesan 'Backup selesai!'"
```

#### Etika & Limitasi AI:

| ✅ Boleh | ❌ Jangan |
|----------|-----------|
| Minta AI jelasin command | Copy-paste kode tanpa paham |
| Minta AI bantu debug | Masukkin password/token ke prompt |
| Minta AI bikin struktur project | Percaya 100% tanpa tes |
| Minta AI saran arsitektur | Minta AI ngerjain tugas kuliah |

---

### 🧪 Tantangan Minggu 3 (PR):

> *"Pake AI CLI, minta tolong:*
> *"Bantu saya bikin script bash bernama `organize.sh` yang:*  
> 1. *Bikin folder `images`, `documents`, `others`*  
> 2. *Pindahin file .jpg dan .png ke `images`*  
> 3. *Pindahin file .pdf dan .docx ke `documents`*  
> 4. *Sisanya ke `others`*  
> 5. *Tampilin struktur folder setelahnya"*  
> *Jalanin script-nya. Screenshot hasilnya."*

---

## 📅 MINGGU 4: PROJECT SEGMEN 6

### 💻 PROJECT: "AI CLI Assistant — Portfolio Prompt Engineering"

#### Simulasi Lengkap:

```bash
# 1. Bikin folder project
mkdir project_ai_portfolio
cd project_ai_portfolio

# 2. Bikin file prompt_log.txt untuk mencatat
nano prompt_log.txt
```

**Prompt 1 — Bikin struktur:**
```
"Bantu saya bikin folder struktur untuk website portofolio pribadi.
Butuh folder: css, js, images. Dan file index.html."
```

**Prompt 2 — Bikin halaman:**
```
"Bikin file index.html dengan:
- Header: nama lo + navigasi (Home, About, Projects, Contact)
- Section Hero: judul 'Halo! Saya [Nama]' + subtitle
- Section About: paragraf tentang diri lo
- Footer: copyright 2026
Pake semantic HTML5."
```

**Prompt 3 — Styling:**
```
"Bikin file style.css di folder css/ untuk index.html.
Warna tema: biru navy (#0a192f) dan hijau (#64ffda).
Font: 'Inter' dari Google Fonts.
Bikin responsif (mobile-first).
Animasi: fade-in saat scroll."
```

**Prompt 4 — Interaktivitas:**
```
"Tambahin JavaScript di file script.js di folder js/:
- Smooth scroll saat klik navigasi
- Tombol 'Kembali ke atas' muncul setelah scroll 300px
- Form kontak (hanya validasi, gak usah backend)"
```

**Yang harus dikumpulkan:**
1. File `prompt_log.txt` (berisi semua prompt + output)
2. File `index.html`, `style.css`, `script.js` yang berfungsi
3. Screenshot hasil di browser
4. Screen record (max 10 menit)

---

# 📌 PHASE 2: AI + PROJECT SIMULATION (DESEMBER - JANUARI) — 2 SEGMEN

---

# SEGMEN 7: PROJECT PLANNING + WEB DEV DENGAN AI (DESEMBER)

> 💡 **Segmen ini menggabungkan Segmen 9 (Project Planning) dan Segmen 10
> (Web Dev dengan AI) dari kurikulum 11 segmen.**

## 🎯 Tujuan Segmen

Setelah segmen ini, peserta bisa:
- Merancang project secara terstruktur di file .md
- Nentuin fitur, tampilan, alur pengguna, dan teknologi
- Bikin website pake AI CLI berdasarkan rancangan

---

## 📅 MINGGU 1: Project Planning — Konsep & Fitur

### Yang Bakal Dipelajari:
Bikin `rancangan_project.md`, nentuin masalah, target user, fitur utama

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Kenapa Planning Penting?** — "Kalo gagal planning = planning buat gagal" |
| 10-30' | **Struktur Rancangan Project.md** — Demo bikin dari awal |
| 30-45' | **Mind Mapping Fitur** — Tulis semua fitur yang lo bayangin |
| 45-60' | **Prioritas Fitur** — MVP (Minimum Viable Product) |
| 60-75' | **Mulai nulis rancangan** |

---

### 📖 MATERI LENGKAP:

---

#### Struktur Rancangan Project

Setiap project harus punya file `rancangan_project.md` dengan struktur ini:

```markdown
# Rancangan Project: [Nama Aplikasi]

## 1. Konsep
- Nama aplikasi: 
- Masalah apa yang diselesaikan: 
- Target user: 
- Platform: Web / Mobile

## 2. Fitur Utama
- Fitur 1: 
- Fitur 2: 
- Fitur 3: 
- Fitur MVP (minimal): 

## 3. Tampilan (UI/UX)
- Halaman apa aja yang ada: 
- Warna tema: 
- Font: 
- Layout: 

## 4. Alur Pengguna
1. User buka aplikasi → ...
2. User klik ... → ...
3. User masukin data... → ...

## 5. Teknologi
- Frontend: HTML + CSS / React / Next.js
- Backend: Laravel / Express / None (static)
- Database: MySQL / PostgreSQL / None
- Deployment: Vercel / Netlify / Server sendiri
```

---

#### Contoh Rancangan Project:

```markdown
# Rancangan Project: Aplikasi Catatan Online

## 1. Konsep
- Nama aplikasi: Catat.in
- Masalah: Saya sering lupa catatan kuliah ketinggalan di laptop
- Target user: Mahasiswa
- Platform: Web

## 2. Fitur Utama
- Fitur 1: Tambah catatan baru (judul + isi)
- Fitur 2: Liat daftar semua catatan
- Fitur 3: Hapus catatan
- Fitur 4: Edit catatan
- Fitur MVP: Tambah dan liat catatan aja

## 3. Tampilan
- Halaman: Home (daftar catatan), Detail catatan, Form tambah
- Warna: Putih background, biru (#3B82F6) buat aksen
- Font: Inter

## 4. Alur Pengguna
1. User buka web → liat daftar catatan
2. User klik "Tambah Catatan" → isi form
3. User klik "Simpan" → catatan muncul di daftar

## 5. Teknologi
- Frontend: HTML + CSS + JavaScript
- Backend: None (local storage aja)
- Database: Browser Local Storage
- Deployment: Vercel
```

---

### 🧪 Tantangan Minggu 1 (PR):

> *"Bikin file `rancangan_project.md` untuk project website impian lo.*
> *Isi semua bagian: Konsep, Fitur, Tampilan, Alur Pengguna, Teknologi.*
> *Yang paling penting: jelasin MASALAH yang mau diselesain."*

---

## 📅 MINGGU 2: Project Planning — Review & Finalisasi

### Yang Bakal Dipelajari:
Review rancangan, presentasi ke pasangan, finalisasi, persiapan coding

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-15' | **Presentasi Berpasangan** — Tunjukin rancangan ke pasangan, minta feedback |
| 15-30' | **Revisi Rancangan** — Update berdasarkan feedback |
| 30-45' | **Finalisasi** — Rancangan siap jadi acuan coding |
| 45-60' | **Setup Folder Project** — Bikin folder sesuai struktur |
| 60-75' | **Persiapan Minggu Depan** — "Minggu depan kita coding bareng AI!" |

---

### 🧪 Tantangan Minggu 2 (PR):

> *"Finalisasi `rancangan_project.md` berdasarkan feedback dari pasangan.*
> *Bikin folder project sesuai struktur yang lo rencanain.*
> *Bikin file `catatan_perancangan.txt` — catet: apa yang berubah dari rancangan awal?"*

---

## 📅 MINGGU 3: Web Dev dengan AI — Setup & Frontend

### Yang Bakal Dipelajari:
Bikin project web dari rancangan pake AI CLI

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review Rancangan** — Buka `rancangan_project.md` |
| 10-25' | **Prompt AI: Bikin Struktur** — "Baca file rancangan_project.md dan bantu saya..." |
| 25-45' | **Review Output AI** — Apa yang kebikin? Apa yang kurang? |
| 45-60' | **Iterasi** — Minta AI tambahin fitur / perbaiki |
| 60-75' | **Catet Semua Prompt** — Ke `prompt_log.txt` |

---

### 📖 MATERI LENGKAP:

---

#### Prompt Utama untuk AI CLI:

**Prompt 1 — Baca Rancangan + Bikin Struktur:**
```
Baca file rancangan_project.md (ada di folder ini) dan pahami konsepnya.
Bantu saya membuat project [nama] dari awal.
Buatkan struktur folder dan file-file yang diperlukan.
Gunakan HTML + CSS + JavaScript (static website).
```

**Prompt 2 — Iterasi Tampilan:**
```
Di file index.html, ubah bagian header jadi sticky navigation.
Background-nya pake gradient dari putih ke biru muda.
Tambahin animasi hover di tombol.
```

**Prompt 3 — Tambah Fitur:**
```
Tambahin fitur pencarian: user bisa ngetik di search bar
dan daftar catatan akan terfilter secara realtime.
```

#### Alur Kerja Web Dev dengan AI:

```
1. Buka terminal di folder project
2. Jalanin prompt AI utama
3. Review hasil — cek file yang kebikin
4. Buka index.html di browser — liat hasilnya
5. Kalo kurang满意的 → prompt lagi buat iterasi
6. Ulangi sampai sesuai rancangan
```

---

### 🧪 Tantangan Minggu 3 (PR):

> *"Pake AI CLI, prompt: 'Baca file rancangan_project.md dan bantu saya bikin project dari awal. Bikin semua file yang diperlukan.'*
> *Buka hasilnya di browser.*
> *Catet di `prompt_log.txt`:*
> 1. *Prompt yang lo kasih*
> 2. *File apa aja yang kebikin*
> 3. *Apa yang berhasil / gagal*
> 4. *Screenshot hasil di browser"*

---

## 📅 MINGGU 4: PROJECT SEGMEN 7

### 💻 PROJECT: "From Plan to Product — Website Pake AI"

#### Simulasi Lengkap:

```bash
# 1. Bikin folder project (kalo belum)
mkdir project_web_saya
cd project_web_saya

# 2. Copy rancangan_project.md ke folder ini
cp /path/to/rancangan_project.md .

# 3. Prompt AI — bikin dari rancangan
# "Baca file rancangan_project.md dan bantu saya membuat project [nama aplikasi].
#  Saya ingin project HTML+CSS+JS static. Bikin semua file yang diperlukan.
#  Pastikan hasilnya bisa dibuka langsung di browser."

# 4. Evaluasi hasil
ls -la
# Cek file apa aja yang kebikin

# 5. Buka di browser
xdg-open index.html  # Atau buka manual

# 6. Iterasi — prompt perbaikan
# "Tambahin [fitur X] seperti yang dijelaskan di rancangan_project.md"
# "Ubah warna tombol jadi hijau (#10b981)"
# "Bikin footer tetap di bawah meskipun konten pendek"

# 7. Final testing
# Cek semua link
# Cek responsif (F12 → toggle device toolbar)
# Cek semua fitur sesuai rancangan

# 8. Dokumentasi
nano promp_log.txt
# Isi:
# Prompt 1: "Baca file..."
# Prompt 2: "Tambahin..."
# Prompt 3: "Ubah warna..."

# 9. Push ke GitHub (kalo udah belajar S5)
git init
git add .
git commit -m "Project web: [nama aplikasi]"
git remote add origin https://github.com/username/project-web.git
git push -u origin main
```

**Kriteria Penilaian:**
- [ ] `rancangan_project.md` lengkap (konsep, fitur, tampilan, alur, teknologi)
- [ ] Website berfungsi di browser
- [ ] Sesuai dengan rancangan (minimal fitur MVP)
- [ ] Responsif (bisa dibuka di HP)
- [ ] `prompt_log.txt` berisi semua prompt yang dipake
- [ ] Screen record demo (max 15 menit)

---

# SEGMEN 8: MOBILE DEV + WARISAN DIGITAL (JANUARI)

> 💡 **Segmen ini menggabungkan Segmen 11 (Mobile Dev dengan AI) dan dokumentasi
> Warisan Digital dari kurikulum 11 segmen.**

## 🎯 Tujuan Segmen

Setelah segmen ini, peserta bisa:
- Bikin project Flutter atau React Native dengan AI CLI
- Paham struktur dasar project mobile
- Ngedokumentasikan semua yang udah dipelajari selama 8 segmen
- Bikin "warisan digital" buat angkatan selanjutnya

---

## 📅 MINGGU 1: Mobile Dev dengan AI — Flutter / React Native

### Yang Bakal Dipelajari:
Apa itu mobile dev, Flutter vs React Native, bikin project dengan AI

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Mobile Dev 101** — Bedanya web vs mobile. Flutter vs React Native |
| 10-25' | **Install Framework** — Flutter SDK atau Node.js/React Native |
| 25-45' | **Prompt AI: Bikin Project** — "Bantu saya bikin project Flutter/React Native..." |
| 45-60' | **Review Struktur Project** — Liat folder dan file yang kebikin |
| 60-75' | **Jalanin di Emulator/Web** — `flutter run -d chrome` atau `npx react-native start` |

---

### 📖 MATERI LENGKAP:

---

#### Flutter vs React Native

| Aspek | Flutter | React Native |
|-------|---------|--------------|
| **Bahasa** | Dart | JavaScript |
| **Perusahaan** | Google | Meta (Facebook) |
| **Performa** | Lebih cepat (compiled native) | Baik (JS bridge) |
| **UI** | Widget sendiri | Native components |
| **Belajar** | Perlu belajar Dart | Kalo udah paham React, gampang |

#### AI Prompt untuk Flutter:

```
"Bantu saya membuat project Flutter baru bernama 'aplikasi_saya' dengan:
- Halaman utama berisi teks 'Halo dari The Penguin Circle'
- Sebuah tombol 'Klik Saya' yang munculin dialog
- Background warna biru muda
- Gunakan StatefulWidget"
```

#### AI Prompt untuk React Native:

```
"Bantu saya membuat project React Native baru bernama 'AplikasiSaya' dengan:
- Halaman utama berisi teks 'Halo dari The Penguin Circle'
- Sebuah tombol yang munculin alert saat ditekan
- Background warna biru muda
- Gunakan StyleSheet untuk styling"
```

---

### 🧪 Tantangan Minggu 1 (PR):

> *"Pake AI CLI, minta bikin project mobile (pilih Flutter ATAU React Native).*
> *Catet: framework mana yang lo pilih dan kenapa.*
> *Prompt: "Bantu saya membuat project [Flutter/React Native] sederhana dengan halaman utama berisi teks 'Halo dari The Penguin Circle' dan sebuah tombol."*
> *Jalanin project-nya. Screenshot hasilnya."*

---

## 📅 MINGGU 2: Mobile Dev — Navigasi & Input Form

### Yang Bakal Dipelajari:
Navigasi antar halaman, input form, list view — semua via AI CLI

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | Review project minggu lalu |
| 10-25' | **AI Prompt: Navigasi** — "Tambah halaman kedua..." |
| 25-40' | **AI Prompt: Input Form** — "Tambah form input teks..." |
| 40-55' | **AI Prompt: List View** — "Tampilin daftar item..." |
| 55-75' | **Iterasi & Testing** |

---

### 📖 MATERI LENGKAP:

---

#### Prompt untuk Navigasi:

**Flutter:**
```
Tambah halaman kedua bernama DetailPage.
Dari halaman utama, kalo tombol ditekan, pindah ke DetailPage.
Halaman DetailPage punya tombol "Kembali".
```

**React Native:**
```
Install React Navigation dan buat Stack Navigator.
Halaman utama punya tombol ke halaman kedua.
Halaman kedua punya tombol "Kembali".
```

#### Prompt untuk Input Form:

**Flutter:**
```
Tambah form input di halaman utama:
- TextField buat nama
- TextField buat email
- Tombol "Simpan" yang munculin snackbar "Data tersimpan"
```

**React Native:**
```
Tambah form input di halaman utama:
- TextInput buat nama
- TextInput buat email
- Tombol "Simpan" yang munculin Alert "Data tersimpan"
```

#### Prompt untuk List View:

**Flutter:**
```
Tambah ListView yang nampilin daftar item:
- Item 1: "Belajar CLI"
- Item 2: "Belajar Git"
- Item 3: "Belajar AI"
Setiap item bisa diklik dan munculin snackbar nama item.
```

**React Native:**
```
Tambah FlatList yang nampilin daftar item:
- Item 1: "Belajar CLI"
- Item 2: "Belajar Git"
- Item 3: "Belajar AI"
Setiap item bisa diklik dan munculin alert nama item.
```

---

### 🧪 Tantangan Minggu 2 (PR):

> *"Lanjutin project mobile dari minggu lalu. Pake AI CLI buat:*  
> 1. *Tambah halaman kedua (navigasi)*  
> 2. *Tambah form input*  
> 3. *Tambah ListView/daftar item*  
> *Catet semua prompt di `prompt_log.txt`. Screenshot setiap tahap."*

---

## 📅 MINGGU 3: Mobile Dev — Finalisasi & Polish

### Yang Bakal Dipelajari:
Debug, polish UI, testing di device nyata

### ⏱️ Sesi (60-75 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-15' | **Debug Error** — Prompt error message ke AI |
| 15-30' | **Polish UI** — "Ubah tema warna...", "Rapihin layout..." |
| 30-45' | **Testing di Device Nyata** — Konekin HP, jalanin app |
| 45-60' | **Final Fixes** — Perbaiki bug terakhir |
| 60-75' | **Siap-siap Dokumentasi** |

---

### 📖 MATERI LENGKAP:

---

#### Debug Mobile dengan AI:

```
Error: "flutter: Error: NoSuchMethodError: The method '[]' was called on null."
Saya dapet error ini pas tekan tombol Simpan. 
Ini kode saya: [copy paste kode]
Apa yang salah?
```

#### Polish UI Prompts:

```
"Ubah tema warna aplikasi jadi biru navy dan putih"
"Bikin card untuk setiap item di list dengan shadow dan rounded corners"
"Tambah icon di samping teks tombol"
"Bikin loading indicator pas data lagi di-load"
```

---

### 🧪 Tantangan Minggu 3 (PR):

> *"Finalisasi project mobile lo:*  
> 1. *Fix semua error yang muncul*  
> 2. *Polish UI (rapihin layout, warna, font)*  
> 3. *Tes di browser/emulator/device nyata*  
> 4. *Catet semua error dan solusinya di `debug_log.txt`*  
> 5. *Screenshot halaman final"*

---

## 📅 MINGGU 4: Warisan Digital & Penutupan

### Yang Bakal Dipelajari:
Dokumentasi perjalanan 8 segmen, bikin warisan buat angkatan depan

### ⏱️ Sesi (90-120 menit):

| Waktu | Aktivitas |
|-------|-----------|
| 0-15' | **Refleksi 8 Bulan** — Diskusi: "Apa yang paling berkesan?" |
| 15-35' | **Bikin Warisan Digital** — Struktur folder warisan |
| 35-55' | **Nulis Pesan** — `pesan_untuk_angkatan_selanjutnya.txt` |
| 55-75' | **Kumpulin Semua File** — Rapihin semua project ke 1 folder |
| 75-90' | **Closing Circle** — Makan-makan, foto bareng, sertifikat |
| 90-120' | **Bebas — sharing / ngobrol / tanya apa aja** |

---

### 📖 MATERI LENGKAP:

---

#### Struktur Warisan Digital

Setiap peserta bikin folder `warisan_circle` dengan struktur:

```
warisan_circle/
├── catatan_perjalanan.md       # Refleksi pribadi
├── pesan_untuk_angkatan_selanjutnya.txt  # Pesan buat adik kelas
├── command_cheatsheet.md       # Kumpulan semua command yang dipelajari
├── prompt_log_complete.txt     # Semua prompt AI yang dicatat
│
├── segmen_1_navigasi/          # Project S1
├── segmen_2_teks/              # Project S2
├── segmen_3_admin/             # Project S3
├── segmen_4_jaringan/          # Project S4
├── segmen_5_git/               # Project S5
├── segmen_6_ai/                # Project S6
├── segmen_7_web/               # Project S7
└── segmen_8_mobile/            # Project S8
```

#### Template `pesan_untuk_angkatan_selanjutnya.txt`:

```
Hai angkatan selanjutnya!

Aku [nama], peserta The Penguin Circle batch [tahun].
Selama 8 bulan, aku belajar dari nol banget sampai bisa bikin website dan
aplikasi mobile pake AI. Ini beberapa pesan buat kalian:

1. [Paling penting] — Jangan takut error. Error adalah guru terbaik.
2. [Tips] — Catet semua command yang lo pelajari.
3. [Semangat] — Kalo aku bisa, kalian pasti bisa!

Yang paling aku ingat dari sesi ini: [cerita paling berkesan]

Semangat!
[nama]
```

#### Template `command_cheatsheet.md`:

```markdown
# Command Cheatsheet — The Penguin Circle

## Segmen 1: Navigasi & File
| Command | Fungsi |
|---------|--------|
| pwd | Cek posisi |
| ls | Liat isi folder |
| cd | Pindah folder |
| mkdir | Bikin folder |
| touch | Bikin file |
| cp | Copy file |
| mv | Pindah/rename |
| rm | Hapus file |
| rm -rf | Hapus folder+isi |

## Segmen 2: Editor & Teks
| Command | Fungsi |
|---------|--------|
| nano | Edit teks |
| cat | Baca file |
| less | Baca file panjang |
| head | 10 baris pertama |
| tail | 10 baris terakhir |
| wc | Hitung baris/kata |
| sort | Urutin file |
| uniq | Hapus duplikat |
| find | Cari file |
| grep | Cari teks dalam file |
| cut | Potong teks per kolom |
| tr | Ganti karakter |
| diff | Bandingkan 2 file |

## Segmen 3: Admin & Tools
| Command | Fungsi |
|---------|--------|
| sudo | Jalanin sebagai admin |
| chmod | Atur izin file |
| chown | Ganti pemilik |
| ps | Liat proses |
| kill | Matiin proses |
| apt | Install software |
| wget | Download file |
| curl | Pake API |
| ffmpeg | Convert multimedia |
| convert | Manipulasi gambar |
| tree | Liat struktur folder |

## Segmen 4: Jaringan
| Command | Fungsi |
|---------|--------|
| ping | Tes koneksi |
| ip addr | Cek IP |
| ssh | Remote server |
| ssh-keygen | Bikin kunci SSH |
| scp | Transfer file via SSH |

## Segmen 5: Git
| Command | Fungsi |
|---------|--------|
| git init | Bikin repo |
| git add | Stage file |
| git commit | Simpen perubahan |
| git push | Upload ke GitHub |
| git pull | Download dari GitHub |
| git branch | Bikin cabang |
| git merge | Gabungin cabang |

## Segmen 6: AI CLI
| Prompt Teknik | Fungsi |
|---------------|--------|
| Context Chaining | Prompt bertahap |
| Few-Shot | Kasih contoh |
| Iterative Refinement | Perbaiki bertahap |
| Spesifikasi Detail | Jelasin eksplisit |
```

---

### 💻 PROJECT SEGMEN 8: "Warisan Digital & Closing"

#### Yang Harus Dikumpulkan:

**Bagian 1: Project Mobile (Minggu 1-3)**
- File project Flutter/React Native yang berfungsi
- Minimal: halaman utama + navigasi + form input
- Screen record demo (max 10 menit)

**Bagian 2: Warisan Digital (Minggu 4)**
- Folder `warisan_circle/` dengan struktur lengkap
- File `catatan_perjalanan.md` — refleksi pribadi
- File `pesan_untuk_angkatan_selanjutnya.txt`
- File `command_cheatsheet.md`
- File `prompt_log_complete.txt` (semua prompt dari S6-S8)

---

## 💎 PENUTUP

8 bulan. 32 pertemuan. 8 project. 3 bulan buffer.

Dari yang nggak tau `ls` → bisa bikin web & mobile pake AI. Itu perjalanan yang gila banget.

Lo sebagai mentor tinggal jalanin step by step. Minggu demi minggu.
Yang paling penting: **konsisten.** Jumat di Pendopo. 60-90 menit.
Nggak perlu muluk-muluk. Yang penting ada progress tiap minggu.

**Gaspol, The Penguin Circle!** 🔥

---

# 📌 BUFFER (FEBRUARI - APRIL 2027)
## "Make-up Classes & Free Exploration"

### Tujuan Buffer:

3 bulan terakhir dikhususkan untuk:
1. **Make-up kelas** — Peserta yang ketinggalan bisa ngejar
2. **Project lanjutan** — Lanjutin project S7/S8
3. **Eksplorasi bebas** — Topik yang belum dibahas
4. **Portfolio building** — Bikin portfolio GitHub

### Struktur Buffer:

| Bulan | Fokus | Kegiatan |
|-------|-------|----------|
| **Februari 2027** | Make-up S1-S3 | Bagi yang ketinggalan navigasi, teks, admin |
| **Maret 2027** | Make-up S4-S6 | Bagi yang ketinggalan jaringan, git, AI CLI |
| **April 2027** | Portfolio & Bebas | Bikin portfolio GitHub, eksplorasi topik baru |

### Format Make-up:

```
Minggu 1: Review materi yang terlewat (mentor jelasin ulang 30 menit)
Minggu 2: Praktik + ngerjain project yang terlewat
Minggu 3: Presentasi hasil make-up
Minggu 4: Bebas — diskusi / eksplorasi / tanya apa aja
```

### Topik Eksplorasi Bebas (Ide untuk Mentor):

- Docker dasar (`docker run`, `docker ps`, `docker-compose`)
- Linux servers (Nginx, Apache)
- Database CLI (MySQL, SQLite dari terminal)
- Python scripting
- API development dasar
- Deployment (Vercel, Netlify, Railway)
- Linux desktop customization (Hyprland, i3, bspwm)

---

## 📋 RINGKASAN 8 SEGMEN

| Segmen | Bulan | Topik | Minggu 1 | Minggu 2 | Minggu 3 | Minggu 4 |
|--------|-------|-------|----------|----------|----------|----------|
| **S0** | 1 Juni | Perkenalan + Setup | - | - | - | - |
| **S1** | Juni | Navigasi & File | pwd, ls, cd, mkdir, touch | cp, mv, wildcard, ls -la | rm, rmdir, rm -rf | **Project: Merapikan Folder** |
| **S2** | Juli | Editor & Teks | nano, cat, less, head, tail | wc, sort, uniq, nl | find, locate, grep | cut, tr, diff + **Project** |
| **S3** | Agustus | Admin & Tools | sudo, chmod, chown | ps, kill, top, uname | apt, wget, curl, unzip | ffmpeg, imagemagick + **Project** |
| **S4** | September | Jaringan | ping, ip addr, hostname | curl API, wget lanjutan | ssh, ssh-keygen, scp | **Project: Network Detective** |
| **S5** | Oktober | Git | init, add, commit, log | branch, checkout, merge | remote, push, pull, clone | **Project: Backup ke GitHub** |
| **S6** | November | AI CLI | Install, prompt dasar | Prompt engineering | Troubleshooting | **Project: Portfolio AI** |
| **S7** | Desember | Planning + Web | rancangan_project.md | Review & finalisasi | Web dev dengan AI | **Project: From Plan to Product** |
| **S8** | Januari | Mobile + Warisan | Flutter/RN dasar | Navigasi & form | Finalisasi & polish | **Warisan Digital + Closing** |
| **Buffer** | Feb-Apr | Make-up | - | - | - | - |

---

> *"The only way to learn a new programming language is by writing programs in it."*
> — Dennis Ritchie
