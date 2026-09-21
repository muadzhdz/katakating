# Panduan Mengajar — SEG-1 M2: Copy, Pindah & Wildcard

> Panduan lengkap buat lo sebagai mentor: naskah per-slide, timing, simulasi error, dan tips ngajar.

---

## Timeline Sesi (50-60 menit)

| Waktu | Durasi | Aktivitas | Slide |
|-------|--------|-----------|-------|
| 0-2' | 2' | Buka terminal, proyektor siap | - |
| 2-5' | 3' | **Pemanasan** — "Minggu 1 lo udah bisa navigasi. Sekarang lo jadi tukang beres-beres." | 1 |
| 5-8' | 3' | **Tujuan Minggu Ini** — jelasin target | 2 |
| 8-22' | 14' | **cp & cp -r** — demo copy file/folder + flags + error handling | 3 |
| 22-36' | 14' | **mv** — demo mindahin vs rename + perbandingan cp vs mv | 4 |
| 36-48' | 12' | **Wildcard** — demo *, ?, [abc] | 5 |
| 48-55' | 7' | **Tantangan PR** + Q&A | 6 |
| 55-60' | 5' | Recap + kasih PR | 6 (bawah) |

---

## Naskah Per Slide

### Slide 1 — Cover

> **Yg lo lakuin:** Buka slide 1 di proyektor.
>
> **Naskah:**
> *"Selamat datang di Minggu 2 — Copy, Pindah & Wildcard.*
>
> *Minggu lalu lo udah belajar navigasi: pwd, ls, cd, mkdir, touch. Lo udah bisa jalan-jalan di dalam sistem.*
>
> *Nah, minggu ini lo belajar manipulasi file. Copy, pindahin, rename, dan operasi massal pake wildcard.*
>
> *Intinya: kalo Minggu 1 lo jadi turis yang liat-liat, minggu ini lo jadi tukang beres-beres yang beneran megang dan mindahin barang.*
>
> *Command yang bakal lo kuasai: cp, mv, dan wildcard."*
>
> **Durasi:** ~2 menit
> **Transisi:** Klik → slide 2

---

### Slide 2 — Tujuan Minggu Ini

> **Yg lo lakuin:** Tunjukin slide 2. Baca poin-poinnya.
>
> **Naskah:**
> *"Ini target kita hari ini. Di akhir sesi, lo harus bisa:*
> - *Copy file & folder pake cp dan cp -r*
> - *Pindahin dan rename file pake mv*
> - *Pake wildcard (*, ?, []) buat operasi massal*
>
> *cp buat gandain file. mv buat mindahin atau rename. Wildcard buat milih banyak file dalam 1 command.*
>
> *Tiga command aja. Tapi ini fundamental banget buat kerja di terminal."*
>
> **Durasi:** ~1 menit
> **Transisi:** Klik → slide 3

---

### Slide 3 — cp & cp -r

> **Yg lo lakuin:** Buka slide 3. Jelasin dari slide, lalu demo di terminal.
>
> **Naskah:**
> *"Command pertama: cp. Singkatan dari copy.*
>
> *Fungsinya: menggandakan file dari satu tempat ke tempat lain. Aslinya tetap ada.*
>
> *Analogi: kayak lo fotokopi kertas. Kertas aslinya tetap di tangan lo, hasil fotokopinya ada di tempat lain.*
>
> *Demo dasar:*
> ```bash
> $ cd ~
> $ touch catatan.txt
> $ mkdir backup
> $ cp catatan.txt backup/
> $ ls backup/
> ```
> *Liat? catatan.txt sekarang ada di 2 tempat: di home dan di backup.*
>
> *Tapi cp itu ada aturannya. Kalo lo mau copy folder, lo HARUS pake -r. Kalo gak, error.*
>
> *Liat tabel di slide:*
> - Copy file → cp a.txt backup/ → berhasil
> - Copy folder tanpa -r → cp folder1/ backup/ → ERROR: omitting directory
> - Copy folder PAKE -r → cp -r folder1/ backup/ → berhasil
>
> *Demo error:*
> ```bash
> $ mkdir proyek
> $ cp proyek backup/
> ```
> *Nah, liat errornya? 'omitting directory'. Ini error yang paling sering muncul pas pake cp.*
>
> *Sekarang pake -r:*
> ```bash
> $ cp -r proyek backup/
> $ ls backup/
> ```
> *Berhasil.*
>
> *Selain -r, ada flag lain yang berguna:*
> - cp -v — verbose, nunjukin prosesnya
> - cp -i — interactive, minta konfirmasi kalo mau timpa file yang udah ada
> - cp -a — archive, copy persis termasuk permission
>
> *Praktik skrg:*
> ```bash
> $ cd ~
> $ mkdir percobaan_cp
> $ cd percobaan_cp
> $ touch file1.txt file2.txt
> $ mkdir backup
> $ cp file1.txt backup/
> $ ls backup/
> ```
>
> **Praktik peserta:** 3-4 menit. Mentor keliling, pastiin mereka liat error 'omitting directory'.
>
> **Error umum:**
> - cp folder backup/ → "omitting directory". *"Lo lupa -r. Folder harus pake -r."*
> - cp file.txt backup/ kalo backup/ belum ada → error. *"Bikin dulu folder backup-nya pake mkdir."*
>
> **Durasi:** ~5 menit demo + 4 menit praktik = 9 menit
> **Transisi:** *"Udah bisa copy? Sekarang kita belajar mindahin file."* → slide 4

---

### Slide 4 — mv

> **Yg lo lakuin:** Buka slide 4. Jelasin dari slide, lalu demo di terminal.
>
> **Naskah:**
> *"Command: mv. Move. Atau rename.*
>
> *Yang bikin mv unik: dia punya DUA fungsi. Bisa mindahin file, BISA JUGA ganti nama file.*
>
> *Analogi: kayak lo mindahin buku dari rak A ke rak B. Atau ganti sampul buku.*
>
> *Fungsi 1 — MINDAHIN:*
> ```bash
> $ mv catatan.txt Documents/
> ```
> *catatan.txt pindah dari home ke Documents. Aslinya HILANG. Gak kayak cp yang aslinya tetap.*
>
> *Fungsi 2 — RENAME:*
> ```bash
> $ mv catatan_lama.txt catatan_baru.txt
> ```
> *Namanya berubah. Tapi isinya tetap. Path-nya juga tetap di folder yang sama.*
>
> *Liat tabel cp vs mv di slide:*
> - cp: aslinya ada, mv: aslinya hilang
> - cp: gandakan, mv: pindahkan
> - cp: gak bisa rename, mv: bisa
> - cp: lama (copy isi), mv: cepet (ubah path aja)
>
> *Praktik skrg:*
> ```bash
> $ cd ~
> $ touch dokumen.txt
> $ mkdir arsip
> $ mv dokumen.txt arsip/
> $ ls                    # dokumen.txt udah gak ada di sini
> $ ls arsip/             # dia pindah ke sini
> ```
>
> *Sekarang rename:*
> ```bash
> $ mv arsip/dokumen.txt arsip/catatan.txt
> $ ls arsip/             # namanya berubah jadi catatan.txt
> ```
>
> **Praktik peserta:** 2-3 menit.
>
> **Error umum:**
> - mv file.txt folder_yang_gak_ada/ → error. *"Folder tujuan harus udah ada. Bikin dulu."*
>
> **Penting:**
> *"Inget: mv itu MINDAHIN, BUKAN COPY! Aslinya hilang. Kalo lo mau aslinya tetap ada, pake cp."*
>
> **Durasi:** ~4 menit demo + 3 menit praktik = 7 menit
> **Transisi:** *"Udah bisa mindahin? Sekarang kita belajar yang paling powerfull: wildcard."* → slide 5

---

### Slide 5 — Wildcard

> **Yg lo lakuin:** Buka slide 5. Jelasin dari slide, lalu demo di terminal.
>
> **Naskah:**
> *"Wildcard itu BUKAN command baru, tapi fitur yang bisa dipake di command mana aja.*
>
> *Wildcard itu karakter spesial yang mewakili huruf atau angka. Gunanya: milih banyak file sekaligus dalam 1 command.*
>
> *Analogi: kayak kata-kata sakti yang bisa manggil banyak file sekaligus.*
>
> *Ada 3 jenis wildcard:*
>
> *1. * (bintang) — SEMUA karakter*
> ```bash
> $ ls *.txt
> ```
> *Ini nampilin semua file yang berakhiran .txt. Berapa pun jumlahnya.*
>
> *2. ? (tanda tanya) — SATU karakter aja*
> ```bash
> $ ls file?.txt
> ```
> *Ini milih file1.txt, file2.txt, fileA.txt — tapi BUKAN file10.txt (karena ? cuma 1 karakter)*
>
> *3. [abc] — SALAH SATU dari pilihan*
> ```bash
> $ ls file[123].txt
> ```
> *Ini milih file1.txt, file2.txt, file3.txt — tapi BUKAN file4.txt.*
>
> *Demo langsung:*
> ```bash
> $ cd ~
> $ mkdir wildcard_demo && cd wildcard_demo
> $ touch catatan.txt data.txt file1.txt file2.txt file10.txt fileA.txt
> $ ls *.txt              # semua .txt
> $ ls file?.txt          # file1, file2, fileA — tapi BUKAN file10
> $ ls file[12].txt       # file1, file2 — tapi BUKAN fileA
> ```
>
> *Wildcard bisa dipake di command mana aja:*
> ```bash
> $ cp *.jpg images/      # copy semua jpg
> $ mv *.txt arsip/       # pindahin semua txt
> ```
>
> *Praktik skrg:*
> ```bash
> $ cd ~
> $ mkdir wildcard_latihan && cd wildcard_latihan
> $ touch catatan.txt data.txt catatan.md data.md
> $ touch file1.txt file2.txt file10.txt
> $ ls *.txt              # prediksi: apa yang muncul?
> $ ls file?.txt          # prediksi: apa yang beda?
> $ ls file[12].txt       # prediksi: mana yang muncul?
> ```
>
> **Praktik peserta:** 3-4 menit. Suruh mereka prediksi dulu sebelum jalanin command.
>
> **Error umum:**
> - Wildcard gak cocok sama file mana pun → output kosong (bukan error). *"Artinya gak ada file yang cocok sama pola lo."*
>
> **Durasi:** ~5 menit demo + 4 menit praktik = 9 menit
> **Transisi:** *"Udah paham wildcard? Sekarang tantangan minggu ini."* → slide 6

---

### Slide 6 — Tantangan PR

> **Yg lo lakuin:** Buka slide 6. Baca tugas satu per satu.
>
> **Naskah:**
> *"Ini PR minggu ini. Kita bakal praktikkin wildcard dan manipulasi file step-by-step.*
>
> *Tugasnya:*
> 1. *mkdir percobaan_copy — bikin folder baru*
> 2. *cd percobaan_copy — masuk ke dalem foldernya*
> 3. *touch file{1..5}.txt foto{1..3}.jpg dok{1..2}.pdf — bikin 10 file cuma dalam 1 baris pake curly braces!*
> 4. *mkdir backup_jpg arsip_txt backup_pdf — bikin folder tujuan buat masing-masing kategori*
> 5. *cp *.jpg backup_jpg/ — copy semua file .jpg ke backup_jpg*
> 6. *mv *.txt arsip_txt/ — pindahin semua file .txt ke arsip_txt*
> 7. *cp *.pdf backup_pdf/ — copy semua file .pdf ke backup_pdf*
> 8. *ls ? — output-nya kosong. Wajar! Karena ? itu wildcard buat 1 karakter doang, sementara gak ada file yang namanya cuma 1 karakter.*
> 9. *nano hasil_wildcard.txt — catet semua perintah yang lo jalanin dan hasilnya*
>
> *Yang penting: catet semua error yang muncul. Kenapa itu terjadi?*
>
> *Ini buat portofolio lo. Minggu depan kita masuk ke rm & rmdir."*
>
> **Tips:**
> *"Suruh mereka catet perintah, error, dan hasil di nano. Biasain pake nano dari sekarang."*
>
> **Durasi:** ~5 menit jelasin + 2 menit Q&A
>
> **Transisi:**
> *"Oke, itu untuk minggu ini. Minggu depan kita belajar rm, rmdir, dan rm -rf — command yang bisa bikin lo tersenyum atau nangis."
> **Tutup terminal, matiin proyektor.**

---

## Tips Ngajar

### Sebelum Sesi
1. **Siapin folder demo** — bikin folder ~/m2_demo dengan isi file acak buat demo cp, mv, wildcard
2. **Test wildcard** — pastiin file1.txt, file10.txt, fileA.txt ada biar perbedaan ? vs * keliatan
3. **Siapin error** — tunjukkin error "omitting directory" pas cp folder tanpa -r. Ini pelajaran berharga.

### Saat Sesi
1. **Jangan takut error** — malah tunjukkin error ke peserta. "Liat, ini error yang bakal sering lo temui. Solusinya gampang: tambahin -r."
2. **Prediksi wildcard** — suruh peserta tebak output wildcard sebelum jalanin. Ini bikin mereka mikir.
3. **Keliling** — wildcard sering bikin bingung. Bantu yang keliatan pusing.
4. **Tekanin cp vs mv** — ini yang paling sering ketuker. "cp = aslinya ada. mv = aslinya hilang."

### Error Handling — Yang Paling Sering Muncul

| Error | Penyebab | Yang Lo Bilang ke Peserta |
|-------|----------|--------------------------|
| cp: omitting directory | Copy folder tanpa -r | "Folder harus pake -r. Coba cp -r." |
| cp: cannot stat | File sumber gak ada | "Cek nama file lo pake ls. Mungkin salah ketik." |
| mv: cannot stat | File sumber gak ada | "Cek path-nya. File yang mau lo pindahin gak ada di sini." |
| ls *.txt kosong | Gak ada file .txt | "Bikin dulu file .txt pake touch." |

### Flow Ideal Sesi

```
  [2'] Buka — slide 1
  [3'] Tujuan — slide 2
  [9'] cp + cp -r — slide 3
  [7'] mv — slide 4
  [9'] Wildcard — slide 5
  [7'] Tantangan + Q&A — slide 6
  ──────────────
  ~37 menit ■ santai banget
```

---

## Command Summary Buat Lo

| Command | Fungsi | Flag Penting |
|---------|--------|-------------|
| `cp` | Copy file/folder | `-r` `-v` `-i` `-a` |
| `mv` | Move / Rename | - |
| `*` | Wildcard — semua karakter | - |
| `?` | Wildcard — satu karakter | - |
| `[abc]` | Wildcard — salah satu dari | - |

> **Golden rule ngajar:** Demo 1 command → langsung suruh praktik. Jangan demo semua dulu.
> Keliling, bantu yang error, baru lanjut command berikutnya.

---

*Selamat ngajar, bro. Minggu 2 ini lebih ringan (cuma 3 command). Fokus ke praktik aja.*
