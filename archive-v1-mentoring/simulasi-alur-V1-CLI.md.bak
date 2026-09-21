# The Penguin Circle — Simulasi Alur Lengkap

> Panduan komprehensif dari sisi Mentor (lo) dan sisi Peserta.
> Mencakup seluruh siklus: persiapan, 8 segmen, 3 buffer, warisan digital.

---

## Daftar Isi

1. [Arsitektur 3 Repo](#1-arsitektur-3-repo)
2. [Persiapan (Mei 2026)](#2-persiapan-mei-2026)
3. [Flow Per Segmen — Mingguan](#3-flow-per-segmen--mingguan)
4. [Flow Per Segmen — Project Week](#4-flow-per-segmen--project-week)
5. [Timeline 12 Bulan](#5-timeline-12-bulan)
6. [Siklus Submission](#6-siklus-submission)
7. [Multimedia Survival Kit (Overlap)](#7-multimedia-survival-kit-overlap)
8. [Warisan Digital (Akhir Tahun)](#8-warisan-digital-akhir-tahun)
9. [Referensi Cepat GitHub](#9-referensi-cepat-github)
10. [Diagram Alur](#10-diagram-alur)

---

## 1. Arsitektur 3 Repo

```
github.com/penguin-circle/
│
├── kurikulum/                  ← PEGANGAN MENTOR (lo & calon penerus)
│   ├── README.md                  — Daftar isi repo
│   ├── KURIKULUM-8-SEGMEN.md      — Silabus 8 segmen lengkap (waktu, command, error, project)
│   ├── DESIGN.md                  — Design system (warna, font, komponen UI)
│   └── SIMULASI-ALUR.md           — File ini: panduan operasional mentoŗ
│
├── template-submission/        ← TEMPLATE TUGAS PESERTA (di-fork)
│   ├── README.md                  — Cara fork & pake
│   ├── catatan-harian.md          — Template catatan tiap sesi
│   └── daftar-project.md          — Template daftar link project
│
└── legacy/                     ← WARISAN DIGITAL (public archive)
    ├── SEG-01_Navigasi-File/       — Per segmen:
    │   ├── README.md                    Command list + tips
    │   ├── scripts/                     Script terbaik peserta
    │   └── projects/                    Daftar project + link video
    ├── SEG-02_Editor-Teks/         ...
    ├── ... sampe SEG-08
    ├── prompt-library/              Kumpulan prompt AI yang teruji
    │   ├── git-prompts.md
    │   ├── debug-prompts.md
    │   ├── web-dev-prompts.md
    │   └── useful-prompts.md
    └── pesan-angkatan/             Pesan dari peserta buat angkatan depan
        └── template_pesan.txt          Template isi pesan
```

### Siapa Ngapain di Repo Mana

| Repo | Mentor | Peserta | Publik? |
|------|--------|---------|---------|
| `kurikulum/` | **Baca** & update materi | - (gak perlu akses) | Bisa, tp gak relevan buat umum |
| `template-submission/` | Bikin & maintain template | **Fork, isi, push** tiap sesi | Ya |
| `legacy/` | **Arsipkan** script & daftar project | Kirim link video → mentor arsip | Ya |

---

## 2. Persiapan (Mei 2026)

### 2a. Yang Dilakuin Mentor (Lo)

| Deadline | Aktivitas | Detail |
|----------|-----------|--------|
| H-30 (Mei) | Finalisasi kurikulum | 8 segmen × 4 minggu, command list, error tips, project |
| H-30 | Bikin DESIGN.md | Design system, warna `#00ff41`, font JetBrains Mono |
| H-30 | Setup GitHub Org | 3 repo: kurikulum, template-submission, legacy |
| H-21 | Push template-submission | README, catatan-harian.md, daftar-project.md |
| H-21 | Bikin website & deploy | Vercel: the-penguin-circle.vercel.app |
| H-21 | Bikin Google Form | Link submission tugas tiap segmen |
| H-14 | Bikin persiapan-pertemuan-0.md | Panduan instalasi WSL, GitHub, SSH, tools |
| H-14 | Bikin informasi-peserta.md | Panduan tugas, FAQ, alur per segmen |
| H-7 | Bikin slides TUI (Rich Python) | Slide presentasi untuk Session 0 & Materi |
| H-7 | Bikin PPT 5-10 slide per segmen | Konsep + command + contoh |
| H-3 | Briefing anggota divisi | Bagi tugas: Hisyam, Rassel, Hayyan, Ilham, Bayu, Kammila |
| H-1 | Test semua command di terminal | Pastikan ga error, siapin error umum + solusi |
| H-0 | Cek proyektor, sound, layout lab | Pastikan PC lab functional |

### 2b. Yang Dilakuin Peserta (Berdasarkan persiapan-pertemuan-0.md)

| Deadline | Aktivitas | Detail | Estimasi |
|----------|-----------|--------|----------|
| H-3 | Install WSL Ubuntu | PowerShell: `wsl --install` | 20 menit |
| H-3 | Update & upgrade | `sudo apt update && sudo apt upgrade -y` | 10 menit |
| H-2 | Bikin akun GitHub | github.com/signup | 5 menit |
| H-2 | Bikin YouTube Channel | youtube.com → Create a channel | 3 menit |
| H-2 | Bikin SSH Key | `ssh-keygen` → add ke GitHub Settings | 5 menit |
| H-1 | Install tools | `sudo apt install -y htop tree neofetch git curl wget` | 5 menit |
| H-1 | Git config | `git config --global user.name/email` | 2 menit |
| H-1 | Clone repo organisasi | `git clone` kurikulum, template-submission, legacy | 3 menit |
| H-1 | Fork template-submission | Ke akun masing-masing | 2 menit |
| H-0 | Ceklist final | Laptop, charger, WSL, akun, SSH, tools | 5 menit |

### 2c. Hasil Persiapan

**Di laptop peserta setelah semua selesai:**
```
/home/nama/
├── kurikulum/                    ← clone dari penguin-circle/kurikulum
├── template-submission/          ← clone dari HASIL FORK (bukan dari org)
└── legacy/                       ← clone dari penguin-circle/legacy
```

**Catatan penting:**
- Peserta **fork dulu** `template-submission` ke akun masing-masing
- Baru `git clone` dari HASIL FORK (bukan dari org langsung)
- Biar bisa push — kalo clone dari org langsung, ga bisa push

---

## 3. Flow Per Segmen — Mingguan

### 3a. Dalam 1 Sesi (Jumat 15:30-17:30, Minggu 1-3)

Setiap segmen punya 3 minggu materi + 1 minggu project.

#### Sebelum Sesi (Mentor)

1. Buka `kurikulum/KURIKULUM-8-SEGMEN.md`
2. Baca segmen & minggu yang akan diajar
3. Siapin PPT 5-10 slide:
   - Slide 1: Judul segmen
   - Slide 2-3: Konsep singkat (kenapa ini penting?)
   - Slide 4-8: Command per command (nama, fungsi, contoh)
   - Slide 9-10: Error umum + tips
4. Test semua command di terminal — pastikan work
5. Siapin contoh kasus error + cara troubleshoot

#### Saat Sesi (60 menit efektif, 120 menit total)

| Waktu | Mentor | Peserta | Durasi |
|-------|--------|---------|--------|
| 15:30-15:45 | Buka PPT, jelasin konsep & tujuan sesi | Nonton, catat | 15' |
| 15:45-15:50 | Demo command #1 di terminal (proyektor) | Nonton, catat syntax | 5' |
| 15:50-16:00 | Keliling, bantu yang error | **Praktik command #1** di WSL masing-masing | 10' |
| 16:00-16:05 | Demo command #2 | Nonton | 5' |
| 16:05-16:15 | Keliling, bantu yang error | **Praktik command #2** | 10' |
| 16:15-16:20 | Demo command #3 | Nonton | 5' |
| 16:20-16:30 | Keliling, bantu yang error | **Praktik command #3** | 10' |
| 16:30-16:45 | Istirahat (sholat ashar bagi yang mau) | Istirahat | 15' |
| 16:45-16:50 | Demo command #4-5 (lebih cepet) | Nonton | 5' |
| 16:50-17:10 | Keliling, fokus ke yang ketinggalan | Praktik & kejar ketertinggalan | 20' |
| 17:10-17:25 | Q&A, bahas error yang muncul | Tanya, sharing error | 15' |
| 17:25-17:30 | Recap, ingetin catat & push | Catat di catatan-harian.md | 5' |

**Flow demo-praktik (loop):**
```
┌─────────────────────────────────────────────────┐
│  1. Mentor: "Command ini fungsinya buat ..."     │
│  2. Mentor: "Ketik ini di terminal lo: [cmd]"    │
│  3. Mentor jalanin command → tunjukkin output     │
│  4. Peserta: jalanin command yang sama            │
│  5. Mentor: nunggu, bantu yang error              │
│  6. Kalo semua udah OK → lanjut command berikut   │
│  7. Ulang dari langkah 1                          │
└─────────────────────────────────────────────────┘
```

#### Setelah Sesi

| Mentor | Peserta |
|--------|---------|
| Catat presensi (siapa hadir) | Buka `catatan-harian.md` di folder `template-submission/` |
| Catat command yang paling sering error | Isi: command yang dipelajari hari ini |
| Catat peserta yang butuh perhatian khusus | Isi: error yang muncul + solusinya |
| Evaluasi: terlalu cepet/lambat? | Isi: tips untuk diri sendiri |
| Update kurikulum kalo ada revisi | `git add . && git commit -m "Sesi X - Y" && git push` |

### 3b. Detail Peran Anggota Divisi

6 anggota (Hisyam, Rassel, Hayyan, Ilham, Bayu, Kammila) belajar **BERSAMA** peserta — bukan co-mentor.

| Peran | Tugas |
|-------|-------|
| Ilham (Koordinator) | Koordinasi jadwal, admin Google Form, bantu kumpulin link video |
| Hisyam | Duduk di barisan belakang — bantu peserta yang error duluan sebelum mentor dateng |
| Rassel | Fokus ke peserta yang paling lambat — damping 1-on-1 |
| Hayyan | Catat error unik yang muncul — jadi bahan FAQ kumulatif |
| Bayu | Siapin PC lab (pastikan login, terminal siap) sebelum sesi mulai |
| Kammila | Bantu operasional: presensi, bagikan panduan print-out, dokumentasi foto |

---

## 4. Flow Per Segmen — Project Week

Minggu ke-4 setiap segmen adalah **Project Week**.

### Sebelum Sesi

| Mentor | Peserta |
|--------|---------|
| Siapin deskripsi project: "Demo 3-5 command yang lo pelajari di segmen ini. Screen record 1-2 menit." | - |
| Siapin contoh video project (lo bisa buat contoh 1 menit) | - |
| Pastikan Google Form submission udah aktif | - |

### Saat Sesi

| Waktu | Aktivitas |
|-------|-----------|
| 15:30-15:45 | Mentor jelasin tugas: "Lo bebas demo command apa aja. Yang penting lo bisa jalanin & jelasin." |
| 15:45-16:00 | Mentor demo contoh screen record + upload |
| 16:00-17:00 | **Peserta praktik & screen record** — mentor & anggota keliling bantu |
| 17:00-17:15 | Q&A — kendala screen record, upload, dll |
| 17:15-17:30 | Mentor ingetin deadline (1 minggu setelah sesi) |

### Setelah Sesi (+7 Hari Deadline)

| Mentor | Peserta |
|--------|---------|
| Nunggu link masuk ke Google Form | **1. Screen record** (OBS/Kazam/Game Bar) — demo 3-5 command |
| Cek link satu per satu | 2. **Upload ke YouTube** — judul: `The Penguin Circle — Segmen X — Nama` |
| Kalo link rusak/privasi salah, chat WA peserta | 3. **Visibility: Unlisted** (jangan Public/Private) |
| Tandai siapa yang udah submit | 4. **Copy link** — paste ke Google Form |
| - | 5. **Submit Google Form** — Nama, Segmen, Link YouTube, Konfirmasi |

### Setelah Deadline

| Mentor |
|--------|
| Buka Google Form → export ke Sheet |
| Pilih 3-5 video terbaik |
| Ambil link videonya, embed ke website (the-penguin-circle.vercel.app) |
| Pilih script terbaik (peserta yang ngasih script keren) → push ke `legacy/SEG-XX/scripts/` |
| Update `daftar-project.md` di `legacy/SEG-XX/projects/` dengan link video semua peserta |

---

## 5. Timeline 12 Bulan

### 8 Segmen Aktif (Juni 2026 - Januari 2027)

| Bulan | Segmen | Topik | Mentor Action | Peserta Action |
|-------|--------|-------|---------------|----------------|
| **Juni** | S1 | CLI Navigasi & File (`pwd`, `ls`, `cd`, `mkdir`, `rm`, `cp`, `mv`) | Ajarin command + error handling | Praktik navigasi, bikin folder, hapus file |
| **Juli** | S2 | Editor & Teks (`nano`, `cat`, `grep`, `echo`) | Demo nano + text processing | Bikin file, edit pake nano, grep keyword |
| **Agustus** | S3 | System Admin (`sudo`, `chmod`, `chown`, `whoami`, `su`, `ps`, `kill`, `htop`, `apt`, `wget`, `curl`, `zip`, `unzip`, `tar`, `tree`) | Demo permission + process management | Install/uninstall apps, manage proses |
| **September** | S4 | Jaringan & Remote (`ping`, `ip addr`, `ifconfig`, `curl`, `wget`, `ssh`) | Demo koneksi jaringan, SSH ke PC lab | Ping, cek IP, download, SSH remote |
| **Oktober** | S5 | Git & Version Control (`init`, `add`, `commit`, `push`, `pull`, `branch`) | Ajarin git workflow lengkap | Init repo, commit, push ke GitHub |
| **November** | S6 | AI CLI & Prompt (`opencode`, `gemini-cli`, `prompt engineering`) | Demo AI tools + cara bikin prompt efektif | Bikin script pake AI, automate task |
| **Desember** | S7 | Web Dev & Deploy (`HTML/CSS`, `static site`, `Vercel deploy`) | Demo bikin + deploy website sederhana | Bikin website pribadi, deploy online |
| **Januari** | S8 | Mobile Dev + Warisan Digital | Recap + isi legacy + closing | Bikin app sederhana + isi pesan-angkatan |

### 3 Bulan Buffer (Februari - April 2027)

| Bulan | Aktivitas Mentor | Aktivitas Peserta |
|-------|------------------|-------------------|
| **Februari** | Kelas pengganti buat yang ketinggalan sesi. Workshop lanjutan (topik request peserta). Repost konten MSK terbaik. | Ngejar ketertinggalan. Ikut workshop tambahan. |
| **Maret** | Review portofolio peserta 1-on-1. Evaluasi kurikulum buat angkatan depan. Siapin regenerasi. | Konsultasi portofolio. Isi pesan-angkatan. |
| **April** | Dokumentasi akhir. Push semua script & project ke `legacy/`. Tutup lingkaran — serah terima ke angkatan depan. | Closing ceremony. Selesai. |

---

## 6. Siklus Submission

### Diagram Alur Video Tugas

```
PESERTA
  1. Screen record terminal (1-2 menit)
  2. Upload ke YouTube (Unlisted)
  3. Copy link video
  4. Buka Google Form
  5. Isi: Nama, Segmen, Link YouTube
  6. Submit
       │
       ▼
MENTOR
  7. Buka Google Form (export Sheet)
  8. Cek link (valid? privacy correct?)
  9. Pilih video terbaik
  10. Embed video di website (admin only)
  11. Update daftar-project.md di legacy/
       │
       ▼
LEGACY/SEG-XX/projects/
  12. Setiap peserta punya baris di tabel:
      | Nama | Link Video |
  13. Script keren → arsip ke legacy/SEG-XX/scripts/
```

### Google Form Structure

| Field | Type | Notes |
|-------|------|-------|
| Nama Lengkap | Short text | - |
| Angkatan | Short text | Contoh: "2025" |
| Segmen | Dropdown | Segmen 1 - Segmen 8 |
| Link YouTube | Short text | Harus diawali `https://youtube.com/` |
| Konfirmasi | Checkbox | "Saya sudah membaca aturan submission" |
| Catatan Tambahan | Paragraph | Opsional |

### Kriteria Video Layak Embed

1. **Aspect ratio**: Landscape > Portrait
2. **Durasi**: 1-2 menit (maks 3 menit)
3. **Isi**: Demo 3-5 command, ada suara (jelasin apa yang diketik)
4. **Kualitas**: Terminal jelas terbaca, ga blur
5. **Link**: Unlisted (bisa di-embed), bukan Private

---

## 7. Multimedia Survival Kit (Overlap)

MSK jalan **bersamaan** dengan Circle — bukan terpisah.

### Per Segmen (8 Segmen × 2 Konten)

Setiap segmen produksi:

| No | Konten | Wajib/Opsional | Format | Platform |
|----|--------|---------------|--------|----------|
| 1 | **Cheatsheet command segmen** | Wajib | Poster/Carousel (1080×1080) | IG Feed |
| 2 | **Video tutorial singkat** | Opsional | Video (1080×1920, maks 60 detik) | IG Reels |

### Pembagian Tugas

| Tim | Tanggung Jawab |
|-----|----------------|
| **Kemahasiswaan** (lo + anggota) | Materi teknis, draft konten, screenshot/record, caption |
| **Kominfo** | Desain poster/carousel, edit video, jadwal posting IG |

### Timeline Produksi per Segmen

| Minggu | Aktivitas MSK |
|--------|---------------|
| Minggu 1 | Lo bikin draft konten (materi cheatsheet) |
| Minggu 2 | Lo passing ke Kominfo buat didesain |
| Minggu 3 | Kominfo selesai desain, review bareng |
| Minggu 4 | **Posting** — pas Project Week (biar engaging) |

---

## 8. Warisan Digital (Akhir Tahun)

### Yang Diarsipkan ke `legacy/`

#### 1. Script Terbaik (per Segmen)
Di akhir setiap segmen, lo pilih 2-3 script terbaik dari peserta:
```
legacy/SEG-03_System-Admin/scripts/
├── monitoring-cpu.sh       ← script keren si Ahmad
├── backup-otomatis.sh      ← script keren si Budi
└── cleanup-temp.sh         ← script keren si Citra
```

#### 2. Daftar Project Peserta (per Segmen)
```
legacy/SEG-XX/projects/daftar-project.md
| Nama | Link Video | Script |
|------|------------|--------|
| Ahmad Fauzi | https://youtu.be/... | monitoring-cpu.sh |
```

#### 3. Prompt Library (Kumulatif per Tahun)
Prompt AI yang udah teruji dan lolos kurasi:
```
legacy/prompt-library/
├── git-prompts.md           ← "Batalin commit terakhir"
├── debug-prompts.md         ← "Ada error ini, tolong bantu"
├── web-dev-prompts.md       ← "Bikin navbar responsive"
└── useful-prompts.md        ← Lain-lain
```

#### 4. Pesan Angkatan (Januari, Sesi Terakhir)
Setiap peserta isi `template_pesan.txt` — dikumpulin, diarsip:
```
legacy/pesan-angkatan/
├── 2026/
│   ├── ahmad-fauzi.txt
│   ├── budi-santoso.txt
│   └── ...
└── template_pesan.txt
```

### Format Pesan Angkatan

Isi template_pesan.txt:
```
Halo adik-adik angkatan [TAHUN]!

The Penguin Circle adalah [kesan lo dalam 1-2 kalimat].

Beberapa hal yang gue harap gue tau dari awal:
1. [tips 1]
2. [tips 2]
3. [tips 3]

Error yang paling sering gue temuin:
- [error] → [solusi]

Pesan terakhir:
[pesan motivasi singkat]

— [Nama Lengkap], Angkatan [TAHUN]
```

---

## 9. Referensi Cepat GitHub

### 9a. Fork template-submission

```bash
# 1. Buka https://github.com/penguin-circle/template-submission
# 2. Klik "Fork" (pojok kanan atas)
# 3. Pilih akun lo sebagai owner
# 4. Hasil: github.com/[username-lo]/template-submission

# 5. Clone hasil fork (bukan dari org!)
git clone https://github.com/[username-lo]/template-submission.git
cd template-submission
```

### 9b. Setup Awal (Peserta)

```bash
# Rename folder biar lebih representatif
mv template-submission the-penguin-circle
cd ~/the-penguin-circle

# Bikin folder per segmen (dilakukan bertahap, bukan sekaligus)
mkdir SEG-01_Navigasi-File
```

### 9c. Setelah Sesi (Peserta — Dilakukan Setiap Minggu)

```bash
cd ~/the-penguin-circle

# Isi catatan harian dulu (manual pakai nano)
nano catatan-harian.md

# Setelah selesai nulis:
git add .
git commit -m "Sesi 1.1 - command dasar"
git push
```

### 9d. Pas Project Week (Peserta)

```bash
cd ~/the-penguin-circle
mkdir -p SEG-01_Navigasi-File/projects
cp script-saya.sh SEG-01_Navigasi-File/projects/
nano SEG-01_Navigasi-File/projects/README.md   # atau catatan project

git add .
git commit -m "SEG-1 project: navigasi & file"
git push
```

### 9e. Mentor Arsip ke legacy

```bash
git clone https://github.com/penguin-circle/legacy.git
cd legacy

# Update daftar project
nano SEG-01_Navigasi-File/projects/daftar-project.md

# Copy script dari peserta
cp ~/Downloads/script-ahmad.sh SEG-01_Navigasi-File/scripts/

git add .
git commit -m "SEG-1: arsip project & scripts"
git push
```

### 9f. Update Kurikulum (Mentor)

```bash
cd ~/kurikulum
nano KURIKULUM-8-SEGMEN.md   # revisi atau tambah catatan
git add .
git commit -m "Revisi SEG-3: tambah error tips systemctl"
git push
```

---

## 10. Diagram Alur

```
                    ┌─────────────────────────┐
                    │   MENTOR (LO)            │
                    │   penguin-circle/        │
                    │   kurikulum/             │
                    └──────┬──────────────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
    ┌──────────────┐ ┌──────────┐ ┌──────────────┐
    │   SEBELUM    │ │  SAAT    │ │   SETELAH    │
    │ SESI:        │ │ SESI:    │ │ SESI:        │
    │ • Baca       │ │ • PPT    │ │ • Catat      │
    │   kurikulum  │ │ • Demo   │ │   presensi   │
    │ • Siapin PPT │ │ • Peserta│ │ • Evaluasi   │
    │ • Test cmd   │ │   praktik│ │ • Revisi     │
    └──────────────┘ └──────────┘ │   kurikulum  │
                                  └──────┬───────┘
                                         │
                          ┌──────────────┼──────────────┐
                          ▼              ▼              ▼
                  ┌────────────┐ ┌────────────┐ ┌────────────┐
                  │ GOOGLE     │ │ WEBSITE    │ │ LEGACY/    │
                  │ FORM       │ │ the-penguin│ │ github.com/│
                  │ (link      │ │ -circle    │ │ penguin-   │
                  │  video)    │ │ .vercel.app│ │ circle/    │
                  └────────────┘ └────────────┘ └────────────┘
                          ▲
                          │
                  ┌───────┴────────┐
                  │   PESERTA      │
                  │   fork dari    │
                  │ template-      │
                  │ submission/    │
                  └────────────────┘
```

### Alur Sederhana (1 Siklus)

```
╔══════════════════════════════════════════════════════════╗
║                    1 SIKLUS PER SEGMEN                   ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  ┌──────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐ ║
║  │ MINGGU 1 │   │ MINGGU 2│   │ MINGGU 3│   │ MINGGU 4│ ║
║  │ Materi   │→  │ Materi  │→  │ Materi  │→  │ PROJECT │ ║
║  │ Dasar    │   │ Lanjut  │   │ Daleman │   │ WEEK    │ ║
║  └──────────┘   └─────────┘   └─────────┘   └────┬────┘ ║
║                                                   │      ║
║                                                   ▼      ║
║                                          ┌────────────────║
║                                          │ PESERTA:       ║
║                                          │ screen record  ║
║                                          │ → YouTube      ║
║                                          │ → Google Form  ║
║                                          └───────┬────────║
║                                                  │        ║
║                                                  ▼        ║
║                                          ┌────────────────║
║                                          │ MENTOR:        ║
║                                          │ cek link       ║
║                                          │ → embed web    ║
║                                          │ → arsip legacy ║
║                                          └────────────────║
╚══════════════════════════════════════════════════════════╝
```

---

## Lampiran: Command References

### Git Commands (Peserta)

| Situasi | Command |
|---------|---------|
| Setup awal | `git config --global user.name "Nama"` |
| Setup awal | `git config --global user.email "email"` |
| Cek status | `git status` |
| Stage semua | `git add .` |
| Commit | `git commit -m "pesan"` |
| Push | `git push origin main` |
| Tarik update | `git pull origin main` |
| Liat history | `git log --oneline` |

### Git Commands (Mentor — push ke org)

| Situasi | Command |
|---------|---------|
| Clone repo org | `git clone https://github.com/penguin-circle/kurikulum.git` |
| Tarik update | `git pull origin main` |
| Stage & commit | `git add . && git commit -m "update SEG-1"` |
| Push | `git push origin main` |

---

> **Dokumen ini:** `SIMULASI-ALUR.md`
> **Repo:** `github.com/penguin-circle/kurikulum`
> **The Penguin Circle** — Divisi Kemahasiswaan PDBI 2026/2027
> **From 0, To Hero.**
