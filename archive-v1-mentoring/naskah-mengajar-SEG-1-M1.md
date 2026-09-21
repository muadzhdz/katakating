# Panduan Mengajar — SEG-1 M1: Navigasi & Bikin File

> Panduan lengkap buat lo sebagai mentor: naskah per-slide, timing, simulasi error, dan tips ngajar.

---

## ⏱️ Timeline Sesi (60-75 menit)

| Waktu | Durasi | Aktivitas | Slide |
|-------|--------|-----------|-------|
| 0-2' | 2' | Buka terminal, proyektor siap, pastiin semua dapet | - |
| 2-5' | 3' | **Pemanasan** — "Ini terminal. Lo bakal tinggal di sini 8 bulan." | 1 |
| 5-10' | 5' | **Tujuan Minggu Ini** — jelasin target | 2 |
| 10-18' | 8' | **pwd** — demo + praktik | 3 |
| 18-28' | 10' | **ls** — demo + flags + praktik | 4 |
| 28-38' | 10' | **cd** — demo + all variations + ⚠️ WSL fix | 5 |
| 38-48' | 10' | **mkdir & touch** — demo + flags | 6 |
| 48-58' | 10' | **Praktik "Jelajah Kampung Halaman"** | 7 |
| 58-65' | 7' | Q&A + error troubleshooting | - |
| 65-70' | 5' | Recap + kasih PR | 7 (bawah) |

---

## 📜 Naskah Per Slide

### Slide 1 — Cover

> **Yg lo lakuin:** Buka slide 1 di proyektor. Terminal lo juga harus udah terbuka.
>
> **Naskah:**
> *"Selamat datang di Segmen 1 — Navigasi & Manajemen File.*
>
> *Ini adalah slide pertama dari perjalanan 8 bulan kita. Dan kita mulai dari yang paling dasar: navigasi file.*
>
> *Kenapa navigasi? Karena kalo lo gak tau posisi lo di dalam komputer, lo gak bakal bisa ngapa-ngapain. Bayangin lo main game tapi gak tau map-nya. Sama aja.*
>
> *Di pertemuan ini, lo bakal belajar: pwd, ls, cd, mkdir, dan touch. Lima command. Satu jam. Selesai."*
>
> **Durasi:** ~2 menit
> **Transisi:** Klik → slide 2

—

### Slide 2 — Tujuan Minggu Ini

> **Yg lo lakuin:** Tunjukin slide 2. Baca poin-poinnya.
>
> **Naskah:**
> *"Ini target kita hari ini. Di akhir sesi, lo harus bisa:*
> - *Tahu posisi lo di sistem — pwd*
> - *Liat isi folder — ls*
> - *Pindah antar folder — cd*
> - *Bikin folder — mkdir*
> - *Bikin file kosong — touch*
>
> *Kedengerannya sepele? Iya. Tapi dari sini semuanya dimulai. Kalo lo gak bisa navigasi, lo gak bakal bisa ngapa-ngapain di segmen selanjutnya."*
>
> **Durasi:** ~1 menit
> **Transisi:** Klik → slide 3

—

### Slide 3 — pwd

> **Yg lo lakuin:** Puter layar ke terminal lo. Demo langsung.
>
> **Naskah:**
> *"Command pertama: pwd. Print Working Directory.*
>
> *Ini adalah command paling simpel dan paling aman. Nggak akan pernah error. Fungsinya cuma satu: nunjukin posisi lo sekarang.*
>
> *Analogi: kayak lo ngecek Google Maps — 'Gue sekarang di mana?'*
>
> *Demo:*
> ```bash
> $ pwd
> /home/muadz
> ```
>
> *Nah, itu posisi lo sekarang. Di /home/[nama lo]. Itu adalah home folder. Rumah lo di Linux.*
>
> *Sekarang giliran lo. Jalanin di terminal masing-masing:*
> ```bash
> $ pwd
> ```
>
> *Keluar output apa? Catet. Kalo beda sama punya gue, gapapa — wajar."*
>
> **Praktik peserta:** 30-60 detik. Mentor keliling, bantu yang error.
>
> **Error umum:**
> - Gak ada error untuk pwd. Paling aman.
>
> **Durasi:** ~2 menit demo + 2 menit praktik = 4 menit
> **Transisi:** *"Udah? Semua dapet output? Bagus. Lanjut."* → slide 4

—

### Slide 4 — ls

> **Yg lo lakuin:** Buka slide 4. Jelasin dari slide, lalu demo di terminal.
>
> **Naskah:**
> *"Command kedua: ls. List Directory.*
>
> *Fungsinya: nunjukin isi folder. File dan subfolder apa aja yang ada di posisi lo sekarang.*
>
> *Analogi: kayak lo buka lemari dan liat isinya — ada baju apa aja di dalem.*
>
> *Demo:*
> ```bash
> $ ls
> ```
>
> *Kalo WSL fresh, mungkin outputnya kosong. Atau cuma ada beberapa folder kayak Documents sama Downloads.*
>
> *Tapi ls itu lebih sakti dari itu. Lo bisa tambahin flag — semacem 'setting-an' biar outputnya lebih detail. Liat ini:*
>
> *(Baca dari slide)*
> - `ls` — biasa aja
> - `ls -l` — detail: ukuran, tanggal, permission
> - `ls -a` — termasuk file tersembunyi (yang mulai dengan titik)
> - `ls -la` — detail + hidden. Paling sering dipake.
> - `ls -lh` — ukuran file pake format KB/MB
>
> *Sekarang giliran lo. Jalanin satu per satu:*
> ```bash
> $ ls
> $ ls -l
> $ ls -la
> $ ls -lh
> ```
>
> *Liat perbedaannya? Semakin lama flag-nya, semakin detail outputnya."*
>
> **Praktik peserta:** 1-2 menit. Mentor keliling.
>
> **Demo lanjutan (opsional kalo ada waktu):**
> *"Satu lagi. Lo juga bisa cari file tertentu pake ls:*
> ```bash
> $ ls *.txt
> ```
> *Ini namanya wildcard. Nanti kita bahas detail di Minggu 2."*
>
> **Error umum:**
> - `ls /root` → Permission denied. *"Ini wajar — folder root adalah folder superuser. Lo sebagai user biasa gak bisa akses."*
> - `ls folder_yang_gak_ada` → No such file or directory. *"Folder yang dimaksud gak ada. Cek lagi nama folder lo."*
>
> **Durasi:** ~3 menit demo + 3 menit praktik = 6 menit
> **Transisi:** *"Udah paham? ls buat liat isi folder. Tapi gimana caranya pindah ke folder lain?"* → slide 5

—

### Slide 5 — cd

> **Yg lo lakuin:** Buka slide 5. Jelasin dari slide sambil demo di terminal.
>
> **Naskah:**
> *"Command ketiga: cd. Change Directory.*
>
> *Fungsinya: pindah ke folder lain. Kayak lo jalan dari satu ruangan ke ruangan lain.*
>
> *Demo dasar:*
> ```bash
> $ pwd
> /home/muadz
> $ ls
> Downloads Documents
> $ cd Downloads
> $ pwd
> /home/muadz/Downloads
> ```
>
> *Liat? Abis cd, posisi lo berubah dari /home/muadz jadi /home/muadz/Downloads."*
>
> *"Tapi cd itu ada banyak macemnya. Liat slide:*
> - `cd Downloads` — masuk folder Downloads
> - `cd ..` — naik 1 folder ke atas
> - `cd ~` — pulang ke home folder
> - `cd /` — ke root system (paling atas)
> - `cd -` — balik ke folder sebelumnya
> - `cd ../..` — naik 2 folder"
>
> **⚠️ PENTING: Peringatin soal WSL fresh install:**
> ```bash
> $ cd Downloads
> ```
> *Ini ERROR kalo lo belum pernah jalanin mkdir Downloads duluan!**
>
> *Kenapa? WSL fresh install itu kosong total. Nggak punya folder Downloads, Documents, Pictures kayak Windows atau Mac.*
>
> *Jadi kalo lo baru install WSL, jangan coba-coba cd ke folder yang belum lo bikin. Nanti kita bikin dulu pake mkdir."*
>
> **Praktik peserta:**
> *"Oke, sekarang ikutin gue:*
> ```bash
> $ pwd                 # catet posisi lo
> $ cd /                # ke root
> $ pwd                 # liat posisi sekarang
> $ ls                  # liat isi root
> $ cd ~                # balik ke home
> $ pwd                 # verifikasi — udah balik?"
> ```
>
> **Jelasin Absolute vs Relative Path (dari slide):**
> *"Path itu ada 2 jenis.*
> - *Absolute: mulai dari / — contoh: cd /home/muadz/Documents*
> - *Relative: dari posisi sekarang — contoh: cd Documents (kalo lo lagi di /home/muadz)*
>
> *Absolute path bisa dipake dari mana aja. Relative path cuma bisa kalo lo ada di folder yang bener."*
>
> **Error umum:**
> - `cd Documents` pas di `/etc` → "No such file or directory". *"Lo lagi di /etc, gak ada folder Documents di sana. Pake absolute path: cd /home/nama/Documents."*
>
> **Durasi:** ~4 menit demo + 3 menit praktik = 7 menit
> **Transisi:** *"Udah bisa pindah-pindah? Bagus. Sekarang kita belajar bikin folder sama file baru."* → slide 6

—

### Slide 6 — mkdir & touch

> **Yg lo lakuin:** Buka slide 6.
>
> **Naskah bagian mkdir:**
> *"Command keempat: mkdir. Make Directory.*
>
> *Fungsinya: bikin folder baru. Kayak lo bikin laci baru di lemari.*
>
> *Demo:*
> ```bash
> $ cd ~                # pastiin di home
> $ mkdir tugas_kuliah  # bikin folder
> $ ls                  # liat — folder tugas_kuliah muncul
> ```
>
> *"Tapi ada 2 cara pake mkdir:*
> - `mkdir project` — kalo foldernya udah ada, error
> - `mkdir -p project` — aman. Kalo udah ada, diemin aja. Kalo belum, bikin.
>
> *Makanya biasain pake -p. Lebih aman."*
>
> **Naskah bagian touch:**
> *"Command kelima: touch.*
>
> *Fungsinya: bikin file kosong.*
>
> *Demo:*
> ```bash
> $ touch catatan.txt   # bikin file catatan.txt
> $ ls                  # liat — catatan.txt muncul
> ```
>
> *"Perbedaan touch vs nano:*
> - `touch file.txt` — bikin file KOSONG
> - `nano file.txt` — bikin file + LANGSUNG NGEDIT"
>
> **Demo: Bikin banyak file sekaligus:**
> ```bash
> $ touch file1.txt file2.txt file3.txt
> $ ls
> ```
>
> **Demo keren mkdir -p dengan curly braces:**
> *"Ini yang bikin mkdir -p jadi powerfull. Lo bisa bikin 7 folder cuma dalam 1 baris:*
> ```bash
> $ mkdir -p project_web/{public/{css,js,images},src/{components,utils}}
> $ tree
> ```
> *Hasilnya: project_web dengan 7 subfolder. Coba liat pake tree — kalo tree belum terinstall, pake ls -R."*
>
> **Praktik peserta:**
> *"Oke, ikutin:*
> ```bash
> $ cd ~
> $ mkdir latihan
> $ cd latihan
> $ touch catatan.txt todo.txt daftar.txt
> $ ls
> ```"
>
> **Error umum:**
> - `mkdir a/b/c` kalo a & b belum ada → error. Solusi: `mkdir -p a/b/c`
> - `mkdir Documents` kalo udah ada → error "File exists". Solusi: `mkdir -p Documents`
>
> **Durasi:** ~5 menit demo + 3 menit praktik = 8 menit
> **Transisi:** *"Semua udah bisa? Sekarang kita praktikkin semua command yang udah dipelajari."* → slide 7

—

### Slide 7 — Praktik "Jelajah Kampung Halaman"

> **Yg lo lakuin:** Buka slide 7. Baca dari slide sambil lo demo bareng.
>
> **Naskah:**
> *"Ini praktik terakhir kita. Buka terminal lo dan ikutin step by step. Jalanin dulu, baru lanjut.*
>
> *Step 1:*
> ```bash
> $ pwd
> ```
> *Catet outputnya. Lo lagi di mana?*
>
> *Step 2:*
> ```bash
> $ ls
> ```
> *Apa yang muncul? Mungkin kosong kalo lo WSL fresh.*
>
> *Step 3:*
> ```bash
> $ cd ~
> ```
> *Pulang ke home.*
>
> *Step 4 (PENTING kalo WSL fresh):*
> ```bash
> $ mkdir Downloads
> ```
> *Bikin folder Downloads. Ini WAJIB kalo WSL fresh biar cd ke Downloads gak error.*
>
> *Step 5:*
> ```bash
> $ mkdir Pictures Documents
> ```
> *Bikin 2 folder lagi.*
>
> *Step 6:*
> ```bash
> $ cd Downloads
> $ pwd
> ```
> *Verifikasi — sekarang lo di /home/nama/Downloads.*
>
> *Step 7:*
> ```bash
> $ touch catatan.txt todo.txt
> ```
> *Bikin 2 file kosong.*
>
> *Step 8:*
> ```bash
> $ ls
> ```
> *Verifikasi — file catatan.txt sama todo.txt harusnya muncul.*
>
> *Step 9:*
> ```bash
> $ cd ..
> $ pwd
> ```
> *Balik ke home. Posisi lo sekarang /home/nama lagi."*
>
> **Durasi:** lo demo cepet + peserta praktik = ~8 menit
>
> **Setelah praktik:**
> *"Gimana? Ada yang error?* (tanya ke kelas)*
>
> *Yang error paling umum:*
> - *cd Downloads error — berarti lo lupa mkdir Downloads duluan*
> - *touch error — pastiin lo ada di folder yang bener pake pwd*
> - *ls munculnya beda — wajar, tiap orang isi foldernya beda*
>
> *Yang udah beres, bagus. Lo baru aja ngerasain jadi pengguna CLI beneran."*
>
> **Kasih PR:**
> *"PR minggu ini:*
> 1. *Bikin folder belajar_cli*
> 2. *Masuk ke dalemnya*
> 3. *Bikin 3 file: catatan.txt, todo.txt, daftar.txt*
> 4. *ls verifikasi*
> 5. *cd ~ balik*
> 6. *Catet semua command & output di catatan-harian.md lo"*
>
> **Transisi (penutup):**
> *"Selesai untuk hari ini. Minggu depan kita lanjut ke cp, mv, dan wildcard. Kalo ada yang error atau bingung, tanya di grup WA. Jangan malu."
> **Tutup terminal, matiin proyektor.**

---

## 🎯 Tips Ngajar

### Sebelum Sesi
1. **Test semua command** di terminal lo sendiri — pastiin gak ada yang error
2. **Bikin folder WSL fresh** dari awal buat simulasi peserta baru
3. **Siapin contoh error** — tunjukkin ke peserta biar mereka tau kalo error itu wajar

### Saat Sesi
1. **Jangan kebanyakan ngomong** — setiap kali lo selesai demo, langsung suruh peserta praktik. Jangan lo demo 10 command dulu baru mereka praktik.
2. **Keliling** — jalan ke belakang, liat layar peserta. Bantu yang error duluan.
3. **Pake analogi** — setiap command harus ada analoginya (pwd = maps, ls = buka lemari, cd = jalan antar ruangan)
4. **Normalisin error** — kalo ada peserta yang error, bilang "Nah, itu error yang bagus. Liat, outputnya bilang No such file or directory. Artinya foldernya gak ada. Solusinya gimana?"

### Error Handling — Yang Paling Sering Muncul

| Error | Penyebab | Yang Lo Bilang ke Peserta |
|-------|----------|--------------------------|
| `cd Downloads` error | WSL fresh, belum mkdir | "Lo belum bikin folder Downloads. Jalanin mkdir Downloads dulu." |
| `pwd` not found | Bukan di terminal WSL | "Lo lagi di PowerShell/CMD. Buka Ubuntu dari Start Menu." |
| `mkdir: cannot create directory` | Folder udah ada | "Udah ada. Pake mkdir -p biar aman." |
| Output ls kosong | Folder emang kosong | "Itu normal. Folder baru isinya kosong. Bikin file dulu pake touch." |

### Flow Ideal Sesi

```
  [2'] Buka — slide 1
  [1'] Tujuan — slide 2
  [4'] pwd demo+praktik — slide 3
  [6'] ls demo+flags+praktik — slide 4
  [7'] cd demo+path+praktik — slide 5
  [8'] mkdir+touch demo+praktik— slide 6
  [8'] Praktik bareng — slide 7
  [7'] Q&A + troubleshooting
  [5'] Recap + PR
  ──────────────
  ~50 menit ■ cukup santai
```

---

## 📝 Command Summary Buat Lo

Ini command yang harus lo hafal (dan siap dijawab kalo peserta nanya):

| Command | Fungsi | Flag Penting |
|---------|--------|-------------|
| `pwd` | Print Working Directory | - |
| `ls` | List directory | `-l` `-a` `-la` `-lh` |
| `cd` | Change directory | `..` `~` `/` `-` |
| `mkdir` | Make directory | `-p` |
| `touch` | Bikin file kosong | - |

> **Golden rule ngajar:** Demo 1 command → langsung suruh praktik. Jangan demo semua dulu.
> Keliling, bantu yang error, baru lanjut command berikutnya.

---

*Selamat ngajar, bro. Peserta lo bakal kaget betapa gampangnya CLI setelah sesi ini.*
