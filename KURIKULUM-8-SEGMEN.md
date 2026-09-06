# KURIKULUM 8 SEGMEN THE PENGUIN CIRCLE — VERSI MENTOR

## Panduan Lengkap Mengajar 8 Segmen Berbasis "Produk Nyata" (Juni 2026 - Januari 2027)

> **Filosofi baru:** The Penguin Circle bukan lagi kelas CLI murni. Ini adalah
> **simulasi pembuatan produk digital** yang relevan dengan mata kuliah Teknologi
> Rekayasa Multimedia. Kita belajar **alur** — bagaimana sebuah ide berubah menjadi
> aplikasi web utuh yang hidup di internet — dengan memanfaatkan tiga alat utama:
> **AI Agent** (untuk menulis kode & dokumen), **Git/GitHub** (untuk versi & kolaborasi),
> dan **VS Code** (untuk melihat & mengelola hasil kerja).

> 📱 **Multimedia Survival Kit:** Setiap segmen punya jadwal konten (1 poster + 1 video).
> Lihat [`multimedia-survival-kit.md`](multimedia-survival-kit.md).

---

## Cara Baca Dokumen Ini

Dokumen ini adalah pegangan lo sebagai mentor. Setiap segmen punya struktur:

1. **🎯 Tujuan Segmen** — apa yang harus dicapai peserta
2. **📅 Modul 1-4** — breakdown tiap minggu dengan ⏱️ timing, prompt AI, dan peran
3. **⚙️ Alur Kerja (Workflow)** — cara terminal, VS Code, Git, dan AI bekerja sama
4. **🤖 Prompt AI Contoh** — prompt yang bisa lo demo ke peserta
5. **🧪 Tugas per Modul** — PR untuk peserta
6. **💻 Project Segmen** — hasil akhir yang ditargetkan

---

## 📌 SESSION 0 (1 Juni 2026)
## "Perkenalan & Setup Lingkungan Kerja"

> 🎯 **Tujuan:** Semua peserta punya lingkungan kerja siap pakai: terminal WSL Ubuntu,
> VS Code, Git, akun GitHub, dan AI Agent. Paham gambaran 8 bulan ke depan.

### Yang Disiapkan Peserta SEBELUM Datang (persiapan-pertemuan-0.md)

| Item | Cara Install | Estimasi |
|------|--------------|----------|
| WSL Ubuntu | PowerShell: `wsl --install` | 20 menit |
| Update & upgrade | `sudo apt update && sudo apt upgrade -y` | 10 menit |
| VS Code | Unduh dari code.visualstudio.com, install di Windows | 5 menit |
| Ekstensi VS Code (WSL, Live Server, Prettier) | Buka VS Code → Extensions | 3 menit |
| Akun GitHub | github.com/signup | 5 menit |
| SSH Key | `ssh-keygen` → tambah ke GitHub Settings | 5 menit |
| Node.js & npm | `sudo apt install nodejs npm` lalu upgrade | 10 menit |
| Git | `sudo apt install git` | 3 menit |
| Git config | `git config --global user.name / user.email` | 2 menit |

### Flow Session 0 (120 menit)

| Waktu | Durasi | Aktivitas |
|-------|--------|-----------|
| 15.30-15.45 | 15' | **Perkenalan Lingkaran** — nama + angkatan + "satu hal yang pengen lo bisa" |
| 15.45-16.00 | 15' | **Apa itu The Penguin Circle?** — "Bukan kelas teori. Tempat ngulik, bikin, dan ngerjain produk nyata." |
| 16.00-16.20 | 20' | **Konsep 3 Alat** — AI Agent + VS Code + Git. Demo kecil: nunjukin AI Agent bikin file HTML |
| 16.20-16.40 | 20' | **Kurikulum 8 Segmen** — tunjukin roadmap: dari repo kosong → web app penuh |
| 16.40-17.00 | 20' | **Verifikasi Instalasi** — cek satu per satu (WSL, VS Code, Git, Node, SSH) |
| 17.00-17.10 | 10' | **Tanda Hidup** — jalanin `neofetch` + `ssh -T git@github.com`, screenshot kirim ke grup |
| 17.10-17.20 | 10' | **Tes AI Agent Pertama** — bikin file HTML sederhana via AI Agent |
| 17.20-17.30 | 10' | **Preview Segmen 2 + tanya jawab** |

---

# 📌 PHASE 1: PONDASI PRODUK DIGITAL (JUNI - SEPTEMBER)

---

# SEGMEN 1: NAVIGASI & SISTEM FILE (JUNI)
## "Mengenal Rumah Baru Lo: Terminal"

### 🎯 Tujuan Segmen

Setelah segmen ini, peserta bisa:
- Tau posisi di dalam sistem (`pwd`, `ls`, `cd`)
- Bikin, pindahin, copy, dan hapus file/folder (`mkdir`, `touch`, `mv`, `cp`, `rm`)
- Memahami konsep editor: **kita menggunakan VS Code untuk menulis & melihat file**,
  bukan `nano`/`echo` (kecuali untuk quick-test kecil di terminal)
- Setup Git & GitHub agar siap untuk segmen berikutnya

> ⚠️ **Catatan:** Karena produksi web akan dilakukan di VS Code, segmen ini fokus
> pada **navigasi & manajemen file** sebagai dasar — bukan pada editor teks terminal.
> Di sini kita menanamkan mentalitas: *"terminal untuk perintah, VS Code untuk konten."*

---

## 📅 MODUL 1: "Lo Disini" — Navigasi Dasar

### Yang Dipelajari
`pwd`, `ls`, `cd`, `mkdir`, `touch`

### ⏱️ Sesi (60-75 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Pemanasan** — Buka terminal WSL. "Ini layar hitam yang bakal jadi sahabat lo." |
| 10-15' | **pwd** — Print Working Directory. "Di mana posisi lo sekarang?" |
| 15-20' | **ls** — List. "Apa isi folder ini?" |
| 20-25' | **cd ~** — "Pulang ke rumah/home lo." |
| 25-30' | **mkdir** — "Bikin laci baru di lemari." |
| 30-35' | **cd ke folder baru** — gabungin `mkdir` + `cd` |
| 35-40' | **touch** — "Bikin kertas kosong." |
| 40-50' | **cd ..** — "Naik satu level." |
| 50-60' | **Praktik** — Bikin struktur folder project |
| 60-75' | **Q&A + tugas minggu ini** |

### 🧪 Tugas Modul 1

> Bikin folder `belajar_circle`, masuk, buat 3 folder (`docs`, `assets`, `scripts`),
> isi tiap folder dengan file kosong pake `touch`. Verifikasi pake `ls`. Balik ke home pake `cd ~`.

---

## 📅 MODUL 2: Copy, Pindah, dan Wildcard

### Yang Dipelajari
`ls -la`, `cp`, `cp -r`, `mv`, wildcard (`*`, `?`)

### ⏱️ Sesi (60-75 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review minggu lalu** |
| 10-15' | **ls -la** — liat file tersembunyi (`.bashrc`, `.gitconfig`, `.ssh/`) |
| 15-25' | **cp & cp -r** — copy file vs folder |
| 25-35' | **mv** — pindah + rename |
| 35-45' | **Wildcard** — `*`, `?` buat batch |
| 45-55' | **Praktik bareng** — bikin struktur & copy file |
| 55-75' | **Tugas minggu ini** |

### 🧪 Tugas Modul 2

> Bikin folder `percobaan_copy`, isi 5 file `.txt`, 3 file `.jpg`, 2 file `.pdf` (pakai `touch`).
> Praktikkan `cp *.jpg backup/`, `mv *.txt arsip/`, `cp -r folder backup/`.

---

## 📅 MODUL 3: Hapus dan Struktur Bertingkat

### Yang Dipelajari
`rm`, `rmdir`, `rm -rf`, `mkdir -p`

### ⏱️ Sesi (60-75 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review minggu lalu** |
| 10-25' | **mkdir -p** — bikin folder bertingkat 1 baris |
| 25-40' | **rm & rmdir** — hapus file vs folder kosong |
| 40-55' | **rm -rf** — peringatan keras! |
| 55-65' | **Praktik** — "Bikin & hancurin struktur biar berani" |
| 65-75' | **Tugas minggu ini** |

> ⚠️ **Peringatan keras:`rm -rf /` = hapus seluruh sistem. JANGAN PERNAH dicoba.**

### 🧪 Tugas Modul 3

> Bikin `latihan_hapus`, isi 5 file (`a.txt`-`e.txt`) + subfolder `tmp` berisi 2 file.
> Hapus `e.txt` pake `rm`, hapus `tmp` pake `rm -rf`, coba `rmdir latihan_hapus` (lihat error-nya),
> lalu hapus semuanya pake `rm -rf`. Catat error yang muncul.

---

## 📅 MODUL 4: PROJECT SEGMEN 1 + Setup Git

### 💻 PROJECT: "Dev Machine Siap Tempur"

#### Deskripsi ke Peserta
> *"Lo sekarang punya kuasa penuh atas file system lo. Tugas lo: siapin 'dev machine' —*
> *folder kerja yang rapi + pastiin Git dan GitHub udah nyambung — biar Segmen 2 langsung gas."*

#### Simulasi Lengkap

```bash
# 1. Bikin struktur folder kerja pribadi
mkdir -p ~/dev
mkdir -p ~/dev/the-penguin-circle
cd ~/dev/the-penguin-circle

# 2. Inisialisasi Git (ini yang bakal jadi "save point" lo)
git init

# 3. Cek konfigurasi Git
git config --global user.name
git config --global user.email

# 4. Kalo belum di-set:
git config --global user.name "Nama Lo"
git config --global user.email "email-lo@gmail.com"

# 5. Tes koneksi SSH ke GitHub
ssh -T git@github.com
# Harusnya: "Hi <username>! You've successfully authenticated"

# 6. Jalankan perintah sistem ringan (buat pemanasan)
sudo apt update
```

#### Kriteria Penilaian

- [ ] Folder `~/dev/the-penguin-circle` ada dan sudah `git init`
- [ ] `git config` terisi nama & email
- [ ] `ssh -T git@github.com` sukses (bukan error)
- [ ] Screen record 1-2 menit mendemonstrasikan perintah file yang dipelajari

---

# SEGMEN 2: GIT & PERANCANGAN PRODUK (JULI)
## "Kolaborasi, Prompting, dan Blueprint Produk"

### 🎯 Tujuan Segmen

- Memahami **AI Agent** sebagai alat kerja utama di terminal WSL
- Menguasai **flow Git + GitHub** (init, add, commit, push, pull, clone, branch)
- Menggunakan **AI Agent untuk menghasilkan dokumen rancangan** (PRD, DESIGN, README)
- Berbasis **proyek individual** yang menjadi fondasi produk pribadi tiap peserta

> ⚠️ **Perubahan penting dari kurikulum lama:**
> - Kita **TIDAK** lagi menulis file dokumen pakai `nano`/`echo`.
> - Semua konten (markdown dokumen, kode web) ditulis oleh **AI Agent** di terminal WSL,
>   lalu dibuka & dikelola di **VS Code**.
> - Jadi: **terminal = eksekusi AI**, **VS Code = editor/inspeksi hasil**.

### ⚙️ Alur Kerja (Workflow) Inti Segmen 2

```
1. Buka WSL Ubuntu (terminal) di folder project
2. Jalankan AI Agent: opencode / claude (dari terminal)
3. "Curhat" kebutuhan lo ke AI Agent → AI menulis file (.md, kode, dsb.)
4. Buka hasilnya di VS Code untuk melihat & mengoreksi
5. Simpan & backup perubahan via Git → commit → push ke GitHub
```

---

## 📅 MODUL 1: Setup AI Agent & Konsep Prompting

### Yang Dipelajari
Install AI Agent, konsep prompt yang baik, VS Code + terminal workflow

### ⏱️ Sesi (60-90 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-15' | **Apa itu AI Agent?** — bedanya dengan ChatGPT web (dia bisa akses & ubah file di laptop) |
| 15-30' | **Install AI Agent** — `curl -fsSL https://opencode.ai/install.sh | sh` (contoh opencode) |
| 30-45' | **Prompt Pertama** — "Bantu saya bikin file README.md di folder ini berisi pengenalan project" |
| 45-60' | **Lihat hasil di VS Code** — buka file `.md` yang AI tulis |
| 60-75' | **Konsep Prompt Bagus vs Jelek** — detail, konteks, spesifikasi |
| 75-90' | **Praktik: "Tanya Apa Aja"** — tiap peserta coba 3 prompt |

### 🤖 Prompt AI Contoh

**Prompt buruk:**
```
Bantu saya bikin readme
```

**Prompt bagus:**
```
Bantu saya membuat file README.md di folder ini.

Konteks: ini adalah folder untuk project personal website portofolio saya.
Target user: saya mahasiswa, recruiter, dan calon klien.
Isi README dengan: judul project, deskripsi singkat, teknologi yang dipakai,
cara menjalankan project, dan kontak saya.

Gunakan bahasa Indonesia yang santai tapi profesional.
```

### 🧪 Tugas Modul 1

> Install AI Agent di WSL. Catat proses install-nya.
> Tanyakan 3 pertanyaan ke AI Agent: (1) "Apa bedanya `cp` dan `mv`?",
> (2) "Bagaimana cara menghapus folder beserta isinya?", (3) "Buatkan file HTML sederhana
> dengan tombol yang bisa diklik." Simpan semua jawaban di file `log_ai.txt` (buat lewat AI agent).

---

## 📅 MODUL 2: Git Dasar untuk Dokumen Rancangan

### Yang Dipelajari
`git init`, `git add`, `git commit`, `git log`, `git status`

### ⏱️ Sesi (60-75 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Apa itu Git?** — "Save point di game. Lo bisa balik kapan aja." |
| 10-20' | **git init & git status** |
| 20-35' | **git add** — stage file |
| 35-50' | **git commit** — simpan perubahan, cek history `git log` |
| 50-60' | **Praktik** — commit dokumen yang sudah dibuat Modul 1 |
| 60-75' | **Tugas minggu ini** |

### 🧪 Tugas Modul 2

> Di folder project: `git init`. Pakai AI Agent untuk membuat 1 file dokumentasi
> (misal `CATATAN.md` berisi rencana website). `git add .`, `git commit -m "Dokumen pertama"`,
> lalu `git log --oneline`.

---

## 📅 MODUL 3: GitHub Remote & Sinkronisasi

### Yang Dipelajari
`git remote add`, `git push`, `git pull`, `git clone`

### ⏱️ Sesi (60-75 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review + konsep remote** — "GitHub = cloud backup project lo" |
| 10-25' | **Bikin repo di GitHub** (via browser) |
| 25-40' | **git remote add & git push** — upload pertama |
| 40-55' | **git pull** — sinkronkan perubahan |
| 55-75' | **Praktik: "Push Project ke GitHub"** |

#### Alur Lengkap Push Pertama

```bash
# Sudah punya repo local. Sekarang hubungkan ke GitHub.
git remote add origin git@github.com:username/nama-repo.git
git branch -M main
git push -u origin main
```

### 🧪 Tugas Modul 3

> Bikin repo publik baru di GitHub (dengan README). Clone ke laptop.
> Edit README pakai AI Agent, lalu add → commit → push. Cek di browser GitHub — harus terupdate.

---

## 📅 MODUL 4: PROJECT SEGMEN 2
### 💻 PROJECT: "Product Blueprint — Rancangan Produk Web"

#### Deskripsi ke Peserta
> *"Di segmen ini lo udah bisa 'memerintah' AI untuk menulis dokumen & ngatur versi via Git.*
> *Sekarang waktunya rancang produk web pertama lo: lengkapin dokumen blueprint-nya,
> *simpen di GitHub, biar Segmen 3 tinggal eksekusi jadi website beneran."*

#### File Blueprint yang Harus Ada (dibuat via AI Agent)

Buat folder project dengan struktur minimal:

```
nama-project/
├── README.md            ← pengenalan project & cara menjalankan
├── PRD.md               ← Product Requirements Document (konsep & fitur)
├── DESIGN.md            ← desain: warna, font, layout, halaman
└── RENCANA.md           ← roadmap fitur MVP sampai versi penuh
```

**PRD.md** — struktur:

```markdown
# PRD — [Nama Produk]

## 1. Konsep
- Nama produk:
- Masalah yang diselesaikan:
- Target user:
- Platform: Web

## 2. Fitur Utama
- Fitur 1:
- Fitur 2:
- Fitur MVP (minimal):

## 3. Tampilan (UI/UX)
- Halaman yang akan dibuat:
- Warna tema:
- Font / layout:

## 4. Alur Pengguna
1. User membuka website → ...
2. User mengklik ... → ...
```

**DESIGN.md** — struktur:

```markdown
# Design — [Nama Produk]

## Palet Warna
- Primary / aksen:
- Background:
- Teks:

## Tipografi
- Font judul:
- Font teks:

## Komponen
- Navigasi, Hero, Footer, Kartu, Tombol
```

#### 🤖 Prompt AI yang Disarankan (untuk tiap file)

**Untuk PRD.md:**
```
Buat file PRD.md untuk project website [konsep lo, misal "portofolio pribadi"].

Konteks: ini proyek individu untuk The Penguin Circle, audience = calon klien & recruiter.
Tuliskan konsep, masalah, target user, fitur utama, fitur MVP, tampilan (warna/font/layout),
halaman yang akan dibuat, dan alur pengguna.
Gunakan bahasa Indonesia santai-profesional.
```

#### Kriteria Penilaian

- [ ] Folder project berisi 4 file markdown (`README`, `PRD`, `DESIGN`, `RENCANA`)
- [ ] Setiap file dihasilkan dengan bantuan AI Agent (bukan diketik manual)
- [ ] Project sudah di-push ke GitHub (repo publik/private sesuai keinginan)
- [ ] Terdapat minimal 3 commit dengan pesan jelas
- [ ] Screen record 1-2 menit: "curhat ke AI → file .md terbuat → commit → push"

---

# SEGMEN 3: WEB DASAR — LANDING PAGE STATIS (AGUSTUS)
## "Ide Jadi Tampilan: HTML, CSS, JavaScript + Deploy"

### 🎯 Tujuan Segmen

- Mengubah blueprint (PRD/DESIGN) menjadi **landing page statis** (HTML + CSS + JS)
- Memanfaatkan **AI Agent** untuk menulis & men-debug kode web dasar
- **Deploy pertama kali ke Vercel** — website lo online!

> ⚠️ **Catatan:** Lo TIDAK perlu hafal semua syntax HTML/CSS/JS. Lo belajar **membaca
> hasil kode yang AI tulis**, memahami struktur dasarnya, dan mengarahkan AI untuk
> mengubah tampilan. Ini simulasi peran "product owner" + "junior frontend".

---

## 📅 MODUL 1: HTML Dasar — Struktur Halaman

### Yang Dipelajari
`<html>`, `<head>`, `<body>`, `<header>`, `<section>`, `<footer>`, `<nav>`, semantic HTML

### ⏱️ Sesi (60-75 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Dari blueprint ke kode** — buka `PRD.md` & `DESIGN.md` |
| 10-20' | **Konsep HTML** — "kerangka/struktur halaman" |
| 20-35' | **Demo AI**: prompt selama bikin `index.html` dari DESIGN.md |
| 35-45' | **Buka di VS Code + Live Server** — liat hasilnya di browser |
| 45-55' | **Baca struktur** — header, section, footer |
| 55-65' | **Iterasi AI** — ubah teks & tambah section |
| 65-75' | **Tugas minggu ini** |

#### 🤖 Prompt AI Contoh (bikin landing)

```
Baca file DESIGN.md dan PRD.md di folder ini, lalu buat index.html.

Ini website portofolio pribadi [nama lo]. Struktur yang diinginkan:
- Bagian Hero (judul besar + subtitle + tombol)
- Bagian Tentang Saya (paragraf singkat)
- Bagian Proyek (kartu proyek, 3 kartu)
- Bagian Kontak (alamat email)
- Footer
Gunakan semantic HTML5. Beri komentar baris sederhana biar mudah dipahami.
```

### 🧪 Tugas Modul 1

> Pakai AI Agent untuk membuat `index.html` dari DESIGN lo. Buka di VS Code + Live Server.
> Iterasi: minta AI tambahin 1 section lagi. Catat semua prompt di `log_ai.txt`.

---

## 📅 MODUL 2: CSS Dasar — Styling & Responsive

### Yang Dipelajari
Selector, property dasar, flexbox/grid dasar, responsive (media query), warna/font

### ⏱️ Sesi (60-75 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review HTML minggu lalu** |
| 10-25' | **Konsep CSS** — "baju/penampilan halaman" (selector, property) |
| 25-40' | **Demo AI**: prompt selama membuat `style.css` dari DESIGN.md (warna, font) |
| 40-50' | **Lihat di browser** — styling mulai bekerja |
| 50-60' | **Responsive** — minta AI bikin mobile-friendly (media query) |
| 60-75' | **Tugas minggu ini** |

#### 🤖 Prompt AI Contoh (styling)

```
Buat file style.css untuk index.html yang sudah ada.

Gunakan palet warna dari DESIGN.md (tuliskan hex-nya). Font pakai Google Fonts
(misal Inter atau Poppins). Layout:
- Hero full-width, teks di tengah
- Konten max-width 1100px, di tengah
- Kartu proyek pakai flex-wrap / grid responsive (1 kolom di HP, 3 kolom di desktop)
Beri jarak (padding/margin) yang nyaman dan animasi hover sederhana di tombol.
```

### 🧪 Tugas Modul 2

> Jika belum ada, minta AI buat `style.css`. Terapkan tema DESIGN lo (warna, font).
> Pastikan responsif di HP (coba lewat DevTools). Catat prompt di `log_ai.txt`.

---

## 📅 MODUL 3: JavaScript Dasar — Interaktivitas

### Yang Dipelajari
`const/let`, fungsi, event (klik), DOM sederhana, kondisi `if/else`

### ⏱️ Sesi (60-75 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review CSS minggu lalu** |
| 10-20' | **Konsep JavaScript** — "otak/perilaku halaman" |
| 20-30' | **Demo AI**: bikin `script.js` (misal smooth scroll, menu mobile, form submit) |
| 30-45' | **Interaksi pertama** — tombol, form, scroll |
| 45-60' | **Debug dengan AI** — copy error ke AI, minta solusi |
| 60-75' | **Tugas minggu ini** |

#### 🤖 Prompt AI Contoh (interaktivitas)

```
Buat file script.js untuk index.html dan style.css yang sudah ada.
Tambahkan:
1. Smooth scroll saat navigasi diklik
2. Tombol "kembali ke atas" muncul setelah scroll 300px
3. Validasi sederhana form kontak (semua input wajib diisi)
Tulis dalam JavaScript vanilla (tanpa library). Beri komentar.
```

### 🧪 Tugas Modul 3

> Minta AI buat `script.js` dengan minimal 2 interaksi (misal menu & validasi form).
> Test di browser. Catat semua prompt di `log_ai.txt`.

---

## 📅 MODUL 4: PROJECT SEGMEN 3 — Deploy ke Vercel
### 💻 PROJECT: "First Live Product — Website Lo Online!"

#### Deskripsi ke Peserta
> *"Landing page lo udah jadi dan keren. Sekarang waktunya naik ke internet!*
> *Deploy ke Vercel (gratis) dan hubungin dengan GitHub biar tiap 'commit' otomatis online."*

#### Alur Deploy ke Vercel (Gratis)

1. **Push project ke GitHub** (jika belum):
   ```bash
   git add .
   git commit -m "Landing page portofolio v1"
   git push origin main
   ```
2. **Buka vercel.com** → sign up dengan GitHub
3. **Import project** → pilih repo GitHub lo
4. **Pilih framework**: untuk project statis (HTML/CSS/JS) pilih "Other" → Vercel akan mendeteksi otomatis
5. Klik **Deploy** → tunggu selesai → dapat URL `https://nama-lo.vercel.app`

#### Timeline Deploy di Kelas

| Waktu | Aktivitas |
|-------|-----------|
| 0-15' | Jelasin konsep "deploy" & kenapa Vercel (gratis, auto-deploy dari GitHub) |
| 15-30' | Semua push project ke GitHub |
| 30-50' | Semua import ke Vercel & deploy bareng-bareng |
| 50-65' | Share URL — kelas "galeri" kepo hasil temen |
| 65-75' | Recap: dari blueprint → web online dalam 1 bulan |

#### Kriteria Penilaian

- [ ] Project ada di GitHub (repo pribadi)
- [ ] Website online di Vercel (punya URL `*.vercel.app`)
- [ ] Landing page berisi: Hero, Tentang, Proyek, Kontak, Footer
- [ ] Responsif (bisa dibuka di HP)
- [ ] Minimal 2 interaksi JavaScript (menu, form, tombol)
- [ ] `log_ai.txt` berisi semua prompt AI yang dipakai

---

# SEGMEN 4: NEXT.JS + API ROUTES (SEPTEMBER)
## "Dari Halaman Statis Menjadi Framework Modern"

### 🎯 Tujuan Segmen

- Memindahkan  landing page statis ke **Next.js** (React) — framework yang dipakai di matkul
- Memahami konsep **komponen** & **routing** di Next.js
- Mengenal **API Routes** Next.js (`app/api`) — fondasi backend

> ⚠️ **Kenapa Next.js?** Karena itu yang dipakai matkul TRM. Di segmen ini kita belajar
> **membaca & mengarahkan AI** untuk mem-build app Next.js — bukan menghafal syntax React.

---

## 📅 MODUL 1: Setup Project Next.js

### Yang Dipelajari
`create-next-app`, struktur folder Next.js (`app/`, `components/`, `public/`), scalar route

### ⏱️ Sesi (75-90 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-15' | **Apa itu Next.js & React?** — komponen, routing, mengapa framework |
| 15-30' | **Demo**: `npx create-next-app@latest` (pilih TS, Tailwind, App Router) |
| 30-45' | **Jelajah struktur** — `app/layout.tsx`, `app/page.tsx`, `app/globals.css` |
| 45-60' | **Jalankan dev server** — `npm run dev` → buka `localhost:3000` |
| 60-75' | **Demo AI**: prompt untuk isi ulang halaman utama (hero, about) |
| 75-90' | **Tugas minggu ini** |

#### 🤖 Prompt AI Contoh (setup)

```
Bantu saya memprogram project Next.js ini.

Saya punya file DESIGN.md dan PRD.md. Buatkan halaman utama (`app/page.tsx`)
menjadi landing page dengan: Hero, Tentang, Proyek, Kontak, Footer.
Gunakan komponen Tailwind CSS sederhana, layout rapi dan responsif.
Buat komponen-komponen (misal Navbar, Hero, Card, Footer) di folder `components/`.
Gunakan bahasa komentar singkat agar mudah dipahami.
```

### 🧪 Tugas Modul 1

> Setup project Next.js lo. Buka struktur folder di VS Code. Jalankan `npm run dev`.
> Minta AI Agent untuk membuat halaman utama dari DESIGN lo.

---

## 📅 MODUL 2: Komponen & Routing

### Yang Dipelajari
Komponen React, props, layout, routing antar halaman (`app/about/page.tsx`)

### ⏱️ Sesi (60-75 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review setup minggu lalu** |
| 10-25' | **Konsep komponen** — "kotak LEGO yang bisa dipakai ulang" |
| 25-40' | **Demo AI**: refactor halaman jadi komponen-komponen |
| 40-55' | **Routing** — bikin halaman `/about` dan `/projects` |
| 55-65' | **Navigasi antar halaman** — `Link` dari `next/link` |
| 65-75' | **Tugas minggu ini** |

#### 🤖 Prompt AI Contoh (routing)

```
Tambahkan halaman `/about` di project Next.js ini.
Isi dengan narasi pribadi (tulis 3-5 paragraf tentang saya sebagai mahasiswa TRM),
dengan layout yang konsisten dengan halaman utama (pakai komponen Navbar & Footer
yang sudah ada). Bawa link di navigasi ke halaman ini lewat next/link.
```

### 🧪 Tugas Modul 2

> Refactor halaman utama jadi komponen (Navbar, Hero, Card, Footer).
> Bikin minimal 2 halaman (`/` dan `/about`) dengan navigasi antar halaman.

---

## 📅 MODUL 3: Pengenalan API Routes

### Yang Dipelajari
Apa itu API, JSON, `route.ts` di `app/api`, GET sederhana

### ⏱️ Sesi (60-75 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review routing minggu lalu** |
| 10-25' | **Konsep API** — "pelayan yang ngambil data" (analog = waiter) |
| 25-40' | **Demo**: bikin `app/api/hello/route.ts` → GET balikin JSON |
| 40-55' | **Fetch di halaman** — halaman ambil data dari API (client/server component) |
| 55-65' | **Lihat di browser** — `localhost:3000/api/hello` |
| 65-75' | **Tugas minggu ini** |

#### 🤖 Prompt AI Contoh (API sederhana)

```
Buat endpoint API di `app/api/hello/route.ts` yang merespons request GET
dengan JSON berisi: message "Halo dari The Penguin Circle!" dan timestamp.
Lalu buat komponen di halaman utama yang mengambil data dari endpoint ini
dan menampilkannya (pakai fetch + useEffect atau komponen server async).
```

### 🧪 Tugas Modul 3

> Buat 1 endpoint API sederhana dan tampilkan datanya di halaman. Catat flow-nya.

---

## 📅 MODUL 4: PROJECT SEGMEN 4 — "Next-Gen Web"
### 💻 PROJECT: Migrasi Landing Page ke Next.js + Deploy Ulang

#### Deskripsi ke Peserta
> *"Landing page statis lo udah online. Sekarang bawa ke level Next.js —*
> *dengan komponen, routing multi-halaman, dan API Route pertama.*
> *Deploy ke Vercel lagi (Vercel auto-mendeteksi Next.js)."*

#### Alur Pengerjaan

1. **Migrasi konten** — minta AI bawa isi landing page statis ke komponen Next.js
2. **Multi-halaman** — buat `/`, `/about`, `/projects`
3. **API Route** — buat 1 endpoint & tampilkan di satu halaman
4. **Deploy** — push ke GitHub → Vercel auto-build Next.js

#### Kriteria Penilaian

- [ ] Project Next.js (komponen + routing + Tailwind)
- [ ] Minimal 3 halaman (`/`, `/about`, `/projects`) dengan navigasi
- [ ] Minimal 1 API Route yang dipanggil dari halaman
- [ ] Online di Vercel (auto-deploy dari GitHub)
- [ ] `log_ai.txt` berisi semua prompt AI

---

# 📌 PHASE 2: FULL-STACK & DATABASE (OKTOBER - NOVEMBER)

---

# SEGMEN 5: BACKEND & DATABASE (OKTOBER)
## "Konsep Backend + Supabase sebagai Database"

### 🎯 Tujuan Segmen

- Memahami bedanya **frontend**, **backend**, dan **database**
- Mengenal **Supabase** sebagai Backend-as-a-Service (DB + API + Auth)
- Menghubungkan **Next.js API Routes ke Supabase** untuk operasi CRUD

> ⚠️ **Klarifikasi penting yang lo (mentor) harus sampaikan:** Supabase itu BaaS —
> sudah menyediakan **database PostgreSQL** + **API** + **auth** dalam satu layanan gratis.
> Jadi untuk project, kita gunakan Supabase sebagai "backend + database" sekaligus.
> Laravel/matkul tetap kita singgung sebagai pembanding (backend tradisional).

---

## 📅 MODUL 1: Konsep Backend & Perbandingan

### Yang Dipelajari
Client vs server, REST API, JSON, perbandingan Laravel vs Supabase (BaaS)

### ⏱️ Sesi (60-75 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Frontend vs Backend vs Database** — analogi restoran |
| 10-25' | **Apa itu API?** — request/response, GET/POST, JSON |
| 25-40' | **Perbandingan**: Laravel (backend tradisional) vs Supabase (BaaS) |
| 40-55' | **Demo**: liat endpoint Supabase/PokéAPI, response JSON |
| 55-65' | **Konsep Database** — tabel, kolom, baris, relasi |
| 65-75' | **Tugas minggu ini** |

#### Penjelasan yang Disampaikan ke Peserta

| Konsep | Analogi |
|--------|---------|
| Frontend | Pelayan yang menyajikan makanan ke pelanggan (yang dilihat user) |
| Backend | Koki yang mengolah pesanan (logika & aturan) |
| Database | Gudang penyimpanan bahan & pesanan |
| API | Menu/formulir pesanan antar bagian |

#### Perbandingan Laravel vs Supabase

| Aspek | Laravel (tradisional) | Supabase (BaaS) |
|-------|----------------------|-----------------|
| Backend | Lo tulis kode PHP sendiri | Disediakan otomatis |
| Database | Lo set-up MySQL/Postgres | PostgreSQL tersedia |
| API | Lo buat route sendiri | Auto-dapat REST API |
| Auth | Lo bangun sendiri | Auth siap pakai |
| Deploy | Perlu server (bayar/ribet) | Cloud gratis (tier) |

### 🧪 Tugas Modul 1

> Bikin `CATATAN_BACKEND.md` (pakai AI agent) berisi ringkasan: apa itu frontend,
> backend, database, API, dan perbedaan Laravel vs Supabase. Commit ke repo.

---

## 📅 MODUL 2: Setup Supabase & Tabel Pertama

### Yang Dipelajari
Buat project Supabase, buat tabel, isi data via dashboard, RLS dasar

### ⏱️ Sesi (60-75 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Konsep Database** diulang singkat (tabel, kolom, tipe data) |
| 10-25' | **Buat project Supabase** (supabase.com, gratis) |
| 25-40' | **Buat tabel pertama** (misal `proyek`) via dashboard/SQL editor |
| 40-55' | **Isi data** + lihat lewat SQL editor & dashboard |
| 55-65' | **Konsep tipe data** — text, integer, timestamp, boolean |
| 65-75' | **Tugas minggu ini** |

#### Struktur Tabel Contoh (project portofolio)

```
Tabel: proyek
- id       (int8, identity, PK)
- judul    (text)
- deskripsi (text)
- link     (text)
- dibuat_pada (timestamptz, default now())
```

#### 🤖 Prompt AI Contoh (SQL)

```
Saya menggunakan Supabase. Bantu saya membuat tabel bernama "proyek" untuk
mendata project portofolio. Kolom: id (primary key), judul, deskripsi, link,
dibuat_pada (default now). Berikan SQL yang bisa saya jalankan di SQL editor
Supabase beserta 3 contoh data (INSERT).
```

### 🧪 Tugas Modul 2

> Buat project Supabase gratis. Buat 1 tabel untuk project lo dan isi minimal 3 baris data
> lewat SQL editor. Screenshot tabel & data.

---

## 📅 MODUL 3: Hubungkan Next.js API Routes ke Supabase

### Yang Dipelajari
Install `@supabase/supabase-js`, buat API Route (GET semua, POST tambah), env variables

### ⏱️ Sesi (60-90 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review** — tabel sudah dibuat |
| 10-20' | **Install Supabase client** — `npm install @supabase/supabase-js` |
| 20-30' | **Simpan kredensial** — `NEXT_PUBLIC_SUPABASE_URL` & `ANON_KEY` di `.env.local` |
| 30-50' | **Demo AI**: buat `app/api/proyek/route.ts` (GET list, POST tambah) |
| 50-65' | **Test endpoint** — buka `localhost:3000/api/proyek`, POST lewat `curl`/Postman |
| 65-80' | **Tampilkan di halaman** — fetch dari API, render list |
| 80-90' | **Tugas minggu ini** |

#### 🤖 Prompt AI Contoh (API → Supabase)

```
Buat file `app/api/proyek/route.ts` di project Next.js ini.

Gunakan @supabase/supabase-js dengan NEXT_PUBLIC_SUPABASE_URL dan
NEXT_PUBLIC_SUPABASE_ANON_KEY dari .env.local.
- GET: ambil semua data dari tabel "proyek", urutkan "dibuat_pada" desc, return JSON.
- POST: terima JSON {judul, deskripsi, link}, insert ke tabel, return hasil.
Tangani error dan kembalikan status code yang tepat.
```

### 🧪 Tugas Modul 3

> Hubungkan Next.js ke Supabase. Buat endpoint GET & POST untuk tabel `proyek`.
> Tampilkan data di satu halaman. Jangan commit key — pastikan `.env.local` masuk `.gitignore`.

---

## 📅 MODUL 4: PROJECT SEGMEN 5 — "Data-Driven Web"
### 💻 PROJECT: Website Dinamis dengan Database

#### Deskripsi ke Peserta
> *"Website lo sekarang bukan lagi 'teks mati' — datanya hidup di database Supabase.*
> *Bikin halaman yang nyimpen & nampilin data project lo lewat API Route Next.js."*

#### Kriteria Penilaian

- [ ] Project Supabase aktif (gratis) dengan minimal 1 tabel
- [ ] Next.js sudah terhubung ke Supabase (API Route & env)
- [ ] Halaman bisa **menampilkan** data dari database (GET)
- [ ] Halaman bisa **menambah** data (POST) — via form sederhana
- [ ] `.env.local` tidak ter-commit (ada di `.gitignore`)
- [ ] Online di Vercel (jangan lupa set env variable di dashboard Vercel juga)
- [ ] `log_ai.txt` berisi semua prompt AI

---

# SEGMEN 6: AUTH, MEDIA, & POLISH (NOVEMBER)
## "Website Lengkap: Login, Upload Gambar, dan Kerapian"

### 🎯 Tujuan Segmen

- Menambahkan **autentikasi** (login & register) via Supabase Auth
- Mengintegrasikan **Cloudinary** untuk upload & tampil gambar/media
- **Polish & debugging** sampai website rapi dan profesional
- Menghasilkan **aplikasi full-stack individual yang final & deployed**

---

## 📅 MODUL 1: Supabase Auth — Login & Register

### Yang Dipelajari
Supabase Auth, halaman login/register, proteksi akses

### ⏱️ Sesi (75-90 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Konsep autentikasi** — kenapa perlu login |
| 10-30' | **Set up Supabase Auth** — aktifkan email/password di dashboard |
| 30-50' | **Demo AI**: bikin halaman login & register (pakai Supabase auth) |
| 50-65' | **Alur login** — simpan session, cek status login |
| 65-80' | **Proteksi** — halaman admin hanya untuk yang login |
| 80-90' | **Tugas minggu ini** |

#### 🤖 Prompt AI Contoh (Auth)

```
Tambahkan sistem login & register ke project Next.js ini menggunakan Supabase Auth.

Buat file `lib/supabase.ts` (client), halaman `/login` dan `/register` (form + handle),
serta sebuah halaman `/admin` yang terproteksi — hanya bisa diakses jika user sudah login
(cek session, redirect ke /login jika belum). Gunakan @supabase/supabase-js.
```

### 🧪 Tugas Modul 1

> Aktifkan Supabase Auth. Buat halaman login & register yang bekerja. Buat 1 halaman
> yang terproteksi. Catat prompt di `log_ai.txt`.

---

## 📅 MODUL 2: Cloudinary — Upload Media

### Yang Dipelajari
Buat akun Cloudinary (free), upload gambar, dapatkan URL, tampilkan di frontend

### ⏱️ Sesi (75-90 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Konsep media/asset** — kenapa butuh layanan media (storage + CDN) |
| 10-25' | **Buat akun Cloudinary** (free) — ambil cloud name & API key |
| 25-40' | **Konsep upload** — dari form ke Cloudinary (via API Route untuk signature) |
| 40-60' | **Demo AI**: integrasi upload & tampil gambar |
| 60-75' | **Simpan URL di Supabase** — gambar terhubung ke data project |
| 75-90' | **Tugas minggu ini** |

#### 🤖 Prompt AI Contoh (Cloudinary + Supabase)

```
Integrasikan upload gambar ke project Next.js ini:

1. Buat endpoint `app/api/cloudinary/signature/route.ts` untuk menghasilkan
   upload signature (pakai cloudinary sdk + cloud_name, api_key, api_secret dari env).
2. Di halaman form project, tambahkan input file. Setelah user pilih gambar,
   upload langsung ke Cloudinary (unsigned/signed) dan dapatkan secure_url.
3. Simpan secure_url ke kolom "gambar" pada tabel "proyek" di Supabase saat POST.
4. Di halaman daftar project, tampilkan gambar thumbnail.
Tangani loading dan error.
```

### 🧪 Tugas Modul 2

> Buat akun Cloudinary (free). Integrasikan upload gambar ke form project.
> Simpan URL gambar di Supabase & tampilkan thumbnail. Jangan commit secret key.

---

## 📅 MODUL 3: Polish, Debugging, dan Struktur Rapi

### Yang Dipelajari
Error handling, UX polish, responsive, code cleanup, refactor

### ⏱️ Sesi (60-90 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Review fitur yang udah ada** |
| 10-25' | **Debugging dengan AI** — paste error → AI bantu solusi |
| 25-40' | **Error handling** — loading state, empty state, error message |
| 40-55' | **UX polish** — rapikan spacing, warna, font, transisi |
| 55-70' | **Responsive & cross-device** — pastikan keliatan bagus di HP & desktop |
| 70-90' | **Tugas minggu ini** |

#### 🤖 Prompt AI Contoh (debug)

```
Saya mendapat error berikut saat menjalankan `npm run dev`:
[tempel error message di sini]

Ini bagian kode yang relevan:
[tempel kode]

Jelaskan penyebabnya secara simpel dan berikan perbaikan. Setelah itu jalankan
perintah untuk memverifikasi aplikasi berjalan tanpa error.
```

### 🧪 Tugas Modul 3

> Rapikan website: tambah loading state, empty state, error message. Perbaiki semua error
> yang muncul. Pastikan responsif di HP. Catat semua proses fix di `Catatan_Polish.md`.

---

## 📅 MODUL 4: PROJECT SEGMEN 6 — "Full-Stack Final (Individual)"
### 💻 PROJECT: Aplikasi Web Utuh + Deploy Final

#### Deskripsi ke Peserta
> *"Semua elemen udah lengkap: frontend Next.js, backend/database Supabase, media Cloudinary,*
> *dan login. Sekarang satukan semuanya jadi satu aplikasi utuh yang rapi dan deploy ke Vercel."*

#### Kriteria Penilaian

- [ ] Frontend Next.js (komponen, routing, Tailwind, responsive)
- [ ] API Routes Next.js tersambung ke Supabase (CRUD)
- [ ] Datanya hidup di database Supabase
- [ ] Login/register bekerja (Supabase Auth) + halaman admin terproteksi
- [ ] Upload gambar ke Cloudinary & tampil di halaman
- [ ] Polish: loading, empty, error state; UI rapi
- [ ] Deploy final ke Vercel (semua env ter-set di Vercel dashboard)
- [ ] `log_ai.txt` + `Catatan_Polish.md` lengkap

---

# 📌 PHASE 3: KOLABORASI TIM & PRODUK FINAL (DESEMBER - JANUARI)

---

# SEGMEN 7: SIMULASI PRODUK TIM — SPRINT 1 (DESEMBER)
## "Merancang & Membangun Bersama Tim"

### 🎯 Tujuan Segmen

- Membentuk **tim 2 orang** (peran Frontend & Backend/Data)
- Membimbing tim **merancang produk nyata** (konsep, PRD, design, API, database)
- Memanfaatkan **Git colab** (branch, merge, pull request, resolve conflict)
- Membangun **working prototype** dengan bantuan AI Agent

> ⚠️ **Peran anggota:** Satu orang **Frontend** (fokus UI & integrasi tampilan),
> satu orang **Backend/Data** (fokus schema DB, logic API, integrasi Supabase/Cloudinary).
> Dua-duanya tetap belajar bareng — tapi punya tanggung jawab utama masing-masing.

---

## 📅 MODUL 1: Pembentukan Tim & Pemilihan Studi Kasus

### Yang Dipelajari
Kerja tim, riset ide, prioritas fitur, MVP, milestone

### ⏱️ Sesi (90-120 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-20' | **Apa itu simulasi tim & MVP** — kenapa kolaborasi itu penting |
| 20-40' | **Pembagian tim 2 orang** + tentukan peran (Frontend / Backend) |
| 40-60' | **Brainstorming ide** — daftar kandidat ± 5 ide aplikasi web |
| 60-80' | **Pilih 1 studi kasus** — pertimbangkan: bisa dikerjakan, ada datanya, menarik |
| 80-100' | **Tentukan fitur MVP** — pilih yang masuk segmen ini |
| 100-120' | **Bagi tugas awal** — siapa riset apa |

#### 🤖 Prompt AI Contoh (brainstorming)

```
Kami adalah tim 2 orang (satu frontend, satu backend) untuk membuat aplikasi web
sebagai project kelompok. Bantu kami brainstorm 5 ide aplikasi web sederhana yang:
1. Bisa dikerjakan dalam 2 bulan oleh 2 orang
2. Punya kebutuhan CRUD data + login + upload gambar (atau media)
3. Relevan dengan mahasiswa TRM / sehari-hari

Untuk tiap ide, berikan: nama, masalah yang diselesaikan, target user,
fitur MVP (3-5), dan data/API yang kira-kira dibutuhkan.
```

### 🧪 Tugas Modul 1

> Tim finalisasi ide + `PRD.md` versi tim (konsep, masalah, target user, fitur MVP,
> alur pengguna). List yang dibuat lewat AI Agent, dirawat di VS Code.

---

## 📅 MODUL 2: Git Workflow Kolaborasi

### Yang Dipelajari
1 repo bersama, clone, branch per fitur, pull request, merge, resolve conflict

### ⏱️ Sesi (75-90 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-10' | **Konsep kolaborasi Git** — branch, PR, merge |
| 10-25' | **Satu repo bersama** — satu orang bikin repo, yang lain di-invite sebagai collaborator |
| 25-40' | **Clone & branch** — tiap anggota bikin branch sendiri |
| 40-55' | **Pull request & merge** — gabungkan perubahan dengan review |
| 55-70' | **Resolve conflict** — apa itu & cara menyelesaikannya |
| 70-90' | **Praktik** — tiap anggota commit di branch, push, buat PR, merge |

#### Alur Git Colab (harus dikuasai)

```bash
# 1. Backend/Frontend: clone repo bersama
git clone git@github.com:username/repo-tim.git
cd repo-tim

# 2. Sebelum mulai kerja, selalu tarik update terbaru
git pull origin main

# 3. Bikin branch sendiri buat fitur
git checkout -b fitur/login

# 4. Kerja, commit, lalu push branch
git add .
git commit -m "feat: halaman login"
git push origin fitur/login

# 5. Di GitHub → buat Pull Request → review → merge ke main

# 6. Tarik hasil merge ke local
git checkout main
git pull origin main
```

### 🧪 Tugas Modul 2

> Bikin repo tim bersama. Tiap anggota bikin branch masing-masing (misal `frontend-ui`,
> `backend-api`). Masing-masing buat 1 file/fitur, push, buat Pull Request, dan merge.
> Latihan resolve konflik (dua-duanya edit file yang sama) biar paham.

---

## 📅 MODUL 3: Eksekusi Backend & Database (Tim)

### Yang Dipelajari
Bikin schema database, RLS policy, contract API, backend API routes

### ⏱️ Sesi (90-120 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-15' | **Pembagian kerja jelas** — backend fokus schema+API, frontend siapin layout |
| 15-40' | **Backend: buat schema Supabase** (tabel produk/data tim + relasi) via SQL |
| 40-60' | **Backend: atur RLS policy** — siapa boleh baca/tulis data |
| 60-85' | **Backend: buat API Routes** (CRUD) di `app/api` |
| 85-105' | **Test endpoint** — pastikan GET/POST/PUT/DELETE bekerja |
| 105-120' | **Dokumentasi API** — tulis kontrak API (endpoint, method, body) |

#### 🤖 Prompt AI Contoh (schema SQL tim)

```
Bantu rancang schema database Supabase untuk aplikasi [nama produk] kami.

Kebutuhan: [tulis kebutuhan produk, misal: daftar menu kasir dengan harga & stok,
user, dan transaksi]. Buatkan SQL pembuatan tabel + relasi + contoh data.
Jelaskan kolom dan tipe datanya.
```

### 🧪 Tugas Modul 3

> Backend: schema & API Routes tim selesai & teruji. Frontend: kerangka layout & halaman
> dasar siap (struktur kosong menunggu data). Kontrak API ditulis di `API.md`.

---

## 📅 MODUL 4: PROJECT SEGMEN 7 — "Working Prototype Tim"
### 💻 PROJECT: Prototipe Berfungsi — API + Database Selesai

#### Deskripsi ke Peserta
> *"Tim lo udah punya: ide, PRD, repo bersama, dan API + database yang jalan.*
> *Modul ini mengunci 'working prototype' — API & data tim yang bisa dijalankan & diuji.*
> *Frontend siap diisi di Segmen 8."*

#### Kriteria Penilaian (Akhir Segmen 7)

- [ ] Tim terbentuk (2 orang) dengan peran jelas
- [ ] `PRD.md` tim, `API.md` (kontrak API), `README.md` tim lengkap
- [ ] Repo GitHub bersama dengan collaborator
- [ ] Schema database + RLS policy di Supabase tim
- [ ] API Routes (CRUD) bekerja & teruji (POSTman/curl/browser)
- [ ] Frontend punya kerangka halaman (belum wajib full data)
- [ ] Sejarah Git menunjukkan pola branch → PR → merge yang rapi
- [ ] Semua dokumen dibuat via AI Agent, dikelola di VS Code

---

# SEGMEN 8: SIMULASI PRODUK TIM — SPRINT 2 & PENUTUP (JANUARI)
## "Menyelesaikan, Mengintegrasikan, dan Merayakan"

### 🎯 Tujuan Segmen

- Menyelesaikan **frontend** tim dan **mengintegrasikan** dengan API & database yang ada
- **Polish, debugging, dan deploy final** produk tim
- **Penutupan & warisan digital** untuk angkatan berikutnya

---

## 📅 MODUL 1: Integrasi Frontend dengan API (Tim)

### Yang Dipelajari
Frontend render data dari API tim, form post data, upload media (Cloudinary)

### ⏱️ Sesi (90-120 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-15' | **Review prototipe Segmen 7** |
| 15-40' | **Frontend**: hubungkan halaman ke API tim (fetch GET, tampilkan list) |
| 40-65' | **Frontend**: buat form untuk input data (POST ke API Supabase) |
| 65-85' | **Media**: integrasikan upload Cloudinary ke produk tim |
| 85-100' | **Auth**: hubungkan login/register tim (bila diperlukan produk) |
| 100-120' | **Bug triage** — daftar & bereskan isu |

#### 🤖 Prompt AI Contoh (integrasi frontend)

```
Di project Next.js tim ini, saya bertugas frontend. Bantu saya:
1. Menampilkan data dari endpoint API `GET /api/[resource]` di halaman daftar.
2. Membuat form untuk menambah data baru (kirim ke `POST /api/[resource]`).
3. Menampilkan state loading & empty.
Buat komponen yang rapi dengan Tailwind, dan jelaskan cara kerjanya.
```

### 🧪 Tugas Modul 1

> Frontend tim berhasil menampilkan & menambah data via API tim. Upload media (jika ada)
> bekerja. Status: website tim punya alur lengkap (baca + tulis data).

---

## 📅 MODUL 2: Debugging & Polish (Tim)

### Yang Dipelajari
Test end-to-end, fix error, UX polish, responsif, optimasi dasar

### ⏱️ Sesi (90-120 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-20' | **Debugging dengan AI** — kumpulkan error, selesaikan bareng |
| 20-45' | **Test alur lengkap** — register → login → tambah data → edit → hapus → tampil |
| 45-70' | **UX polish** — kerapian, spacing, warna, loading, empty, error state |
| 70-90' | **Responsif** — pastikan bagus di HP & desktop |
| 90-105' | **Perbaikan terakhir** — selesaikan isu sisa |
| 105-120' | **Siap deploy final** |

#### Ceklist Test End-to-End

- [ ] User bisa register & login
- [ ] User bisa menambah data (form bekerja, data masuk DB)
- [ ] User bisa melihat daftar data (GET bekerja)
- [ ] User bisa edit & hapus data (bila fitur ada)
- [ ] Media/upload bekerja
- [ ] Semua halaman bisa diakses dari menu navigasi
- [ ] Tidak ada error di console browser

### 🧪 Tugas Modul 2

> Tim menyelesaikan seluruh isu + polish. Produk tim siap deploy. Dokumentasikan
> proses debug di `Catatan_Sprint2.md`.

---

## 📅 MODUL 3: Deploy Final & Presentasi Tim

### Yang Dipelajari
Deploy ke Vercel, set environment, presentasi produk

### ⏱️ Sesi (90-120 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-15' | **Review produk final** |
| 15-35' | **Deploy ke Vercel** — set semua env (Supabase, Cloudinary) di dashboard |
| 35-50' | **Uji live** — pastikan aplikasi jalan di URL publik |
| 50-75' | **Persiapan presentasi** — tiap tim siapin demo 3-5 menit |
| 75-105' | **Presentasi tim** — tiap tim demo produknya ke kelas |
| 105-120' | **Feedback & evaluasi** |

#### Struktur Presentasi Tim (3-5 menit)

1. Nama produk & masalah yang diselesaikan
2. Demo singkat (live, bukan screenshot)
3. Arsitektur: frontend, backend/DB, media, auth
4. Kesulitan yang dihadapi & solusinya
5. Satu hal yang paling bangga

### 🧪 Tugas Modul 3

> Produk tim online di Vercel. Setiap tim menyiapkan & mempresentasikan produk final.

---

## 📅 MODUL 4: PENUTUP — Warisan Digital & Closing Circle

### Yang Dipelajari
Refleksi, dokumentasi perjalanan, pesan untuk angkatan berikutnya

### ⏱️ Sesi (90-120 menit)

| Waktu | Aktivitas |
|-------|-----------|
| 0-15' | **Refleksi 8 bulan** — diskusi "apa yang paling berkesan?" |
| 15-35' | **Bikin warisan digital** — `warisan_circle/` dengan semua project + portofolio |
| 35-55' | **Tulis pesan** — `pesan_untuk_angkatan_selanjutnya.txt` via AI Agent |
| 55-75' | **Rapikan semua project** — pastikan semua repo rapi & publik (portofolio) |
| 75-90' | **Closing Circle** — makan-makan, foto, sertifikat |
| 90-120' | **Bebas** — sharing / ngobrol / tanya apa aja |

#### Struktur Warisan Digital

```
warisan_circle/
├── catatan_perjalanan.md        # Refleksi pribadi
├── pesan_untuk_angkatan_selanjutnya.txt
├── link_portofolio.md           # Daftar semua URL produk (S3/S4/S6/S8)
├── prompt_log_complete.txt      # Semua prompt AI dari S2-S8
├── repo_pribadi/                # Project individual (S2-S6)
└── repo_tim/                    # Project tim (S7-S8)
```

---

# 📌 BUFFER (FEBRUARI - APRIL 2027)
## "Make-up Classes & Free Exploration"

### Tujuan Buffer

1. **Make-up kelas** — peserta yang ketinggalan bisa ngejar
2. **Project lanjutan** — lanjutkan & perbanyak produk tim
3. **Eksplorasi bebas** — topik yang belum dibahas
4. **Portofolio building** — siapkan portofolio GitHub buat magang/kerja/tugas

### Struktur Buffer

| Bulan | Fokus | Kegiatan |
|-------|-------|----------|
| **Februari 2027** | Make-up S2-S3 | Ketinggalan Git, prompting, atau landing page? Kejar di sini |
| **Maret 2027** | Make-up S4-S6 | Ketinggalan Next.js, Supabase, atau Cloudinary? Kejar di sini |
| **April 2027** | Portofolio & Bebas | Rapikan portofolio GitHub, eksplorasi topik baru |

### Format Make-up

```
Minggu 1: Review materi yang terlewat (mentor jelasin ulang 30 menit)
Minggu 2: Praktik + ngerjain project yang terlewat
Minggu 3: Presentasi hasil make-up
Minggu 4: Bebas — diskusi / eksplorasi / tanya apa aja
```

### Topik Eksplorasi Bebas (Ide untuk Mentor)

- Database CLI / SQL lanjutan
- API development & integrasi pihak ketiga
- Technical writing / dokumentasi yang baik
- SEO & performance dasar website
- UI/UX design lanjutan
- GitHub Actions / CI/CD sederhana

---

# 📋 RINGKASAN 8 SEGMEN

| Segmen | Bulan | Topik | Output Kunci |
|--------|-------|-------|--------------|
| **S0** | 1 Juni | Perkenalan + Setup | Dev machine siap |
| **S1** | Juni | Navigasi & File + Git setup | Dev machine + Git siap |
| **S2** | Juli | AI Agent + Git + Perancangan | Product Blueprint (.md) di GitHub |
| **S3** | Agustus | Web Dasar (HTML/CSS/JS) + Deploy | Landing page online (Vercel) |
| **S4** | September | Next.js + API Routes | Website Next.js multi-halaman |
| **S5** | Oktober | Backend konsep + Supabase | Data-driven web (CRUD) |
| **S6** | November | Auth + Media + Polish | Full-stack app final (individual) |
| **S7** | Desember | Kolaborasi tim + Sprint 1 | Working prototype tim (API+DB) |
| **S8** | Januari | Sprint 2 + Deploy + Penutup | Produk tim final + warisan |
| **Buffer** | Feb-Apr | Make-up & eksplorasi | Portofolio final |

---

## Peta Perjalanan Keterampilan

```
Segmen:    1       2        3        4         5        6         7      8
          ┌─────┐ ┌─────┐ ┌─────┐ ┌──────┐ ┌─────┐ ┌──────┐ ┌──────┐ ┌──────┐
Terminal:  ████░  ░░░░░   ░░░░░  ░░░░░░   ░░░░░  ░░░░░░  ░░░░░░  ░░░░░░
Git/GitHub:░░░░░ █████   ███░░  ██████   █████  ██████  ██████  ██████
AI Agent:  ░░░░░  █████  █████  ██████   █████  ██████  ██████  ██████
HTML/CSS/JS:░░░ ░░░░░  █████  ███░░░   ░░░░░  ░░░░░░  ░░░░░░  ░░░░░░
Next.js:   ░░░░░  ░░░░░  ░░░░░  ██████   █████  ██████  ██████  ██████
Supabase:  ░░░░░  ░░░░░  ░░░░░  ░░░░░░   █████  ██████  ██████  ██████
Cloudinary:░░░░░  ░░░░░  ░░░░░  ░░░░░░   ░░░░░  ██████  ██████  ██████
Kolaborasi:░░░░░  ░░░░░  ░░░░░  ░░░░░░   ░░░░░  ░░░░░░  ██████  ██████
Deploy:    ░░░░░  ░░░░░  █████  ██████   █████  ██████  ██████  ██████
```

---

## Alur Data Arsitektur (Dijadikan acuan produk akhir)

```
                    ┌───────────────────────────────────────────┐
                    │            [Next.js App] (Vercel)          │
                    │  Frontend + API Routes (app/api)           │
                    └───────┬───────────────────────┬────────────┘
                            │                       │
              HTTP / JSON   │                       │  upload media
                            ▼                       ▼
                 ┌──────────────────┐      ┌──────────────────────┐
                 │  [Supabase]      │      │   [Cloudinary]       │
                 │  Database (PG)   │      │   Media / Gambar     │
                 │  API + Auth      │      │   CDN URL            │
                 └──────────────────┘      └──────────────────────┘
```

---

# LAMPIRAN: Referensi Cepat Peran Alat

| Alat | Peran | Kapan Dipakai |
|------|-------|---------------|
| **Terminal WSL** | Menjalankan AI Agent & perintah | Setiap sesi (jalankan AI, git, perintah) |
| **VS Code** | Melihat, mengelola, & mengoreksi hasil AI | Setiap sesi (buka file .md & kode) |
| **AI Agent** | Menulis & men-debug file (dokumen & kode) | Setiap sesi (inti workflow) |
| **Git & GitHub** | Version control & kolaborasi | Setiap sesi (backup & tim) |
| **Vercel** | Deployment frontend (gratis) | S3, S4, S6, S8 |
| **Supabase** | Database + API + Auth (BaaS, gratis) | S5, S6, S7, S8 |
| **Cloudinary** | Media storage & CDN (gratis) | S6, S7, S8 |

---

> **Dokumen ini:** `KURIKULUM-8-SEGMEN.md`
> **The Penguin Circle** — Divisi Kemahasiswaan, Himpunan Mahasiswa TRM (HIMATRA)
> **Filosofi:** *"Dari ide, menjadi data, menjadi antarmuka, menjadi produk hidup di internet."*
> **From 0, To Product.** 🐧
