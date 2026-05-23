# The Penguin Circle — Persiapan Pertemuan 0

> Dokumen ini berisi **semua yang harus peserta siapkan SEBELUM datang** ke Session 0.
> Kalau ada kendala, chat admin di grup WA.

---

## Daftar Isi

1. [Instalasi WSL Ubuntu](#1-instalasi-wsl-ubuntu)
2. [Bikin Akun GitHub](#2-bikin-akun-github)
3. [Bikin YouTube Channel](#3-bikin-youtube-channel)
4. [Install Tools Awal](#4-install-tools-awal)
5. [Setup Git + SSH Key](#5-setup-git--ssh-key)
6. [Clone Repo Organisasi](#6-clone-repo-organisasi)
7. [Ceklist Final Sebelum Datang](#7-ceklist-final-sebelum-datang)

---

## 1. Instalasi WSL Ubuntu

### Syarat Sistem

| Item | Minimal |
|------|---------|
| OS | Windows 10 build 19041+ atau Windows 11 |
| RAM | 4 GB |
| Storage | 10 GB free |
| Virtualization | Harus aktif (cek di Task Manager > Performance > Virtualization: Enabled) |

### Step-by-step (10-15 menit)

#### Langkah 1 — Aktifkan WSL

Buka **PowerShell sebagai Administrator** (klik kanan Start → Windows PowerShell (Admin) / Terminal (Admin)), lalu jalankan:

```powershell
wsl --install
```

Ini otomatis:
- Mengaktifkan fitur WSL
- Menginstall WSL 2
- Menginstall Ubuntu secara default

> Jika perintah di atas error atau lambat, alternatif manual:
> ```powershell
> dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
> dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
> ```
> Lalu restart, buka Microsoft Store, cari "Ubuntu", klik Install.

#### Langkah 2 — Restart & Setup Ubuntu

1. Restart laptop setelah instalasi selesai
2. Setelah restart, cari "Ubuntu" di Start Menu, klik
3. Tunggu proses instalasi (1-2 menit)
4. **Bikin username & password**:
   ```
   Enter new UNIX username: muadz     ← isi nama kamu (tanpa spasi)
   New password: *******               ← isi password (gak muncul titik/huruf)
   ```
5. Selesai! Terminal Ubuntu siap dipakai.

#### Langkah 3 — Update & Upgrade

Jalankan perintah berikut satu per satu:

```bash
sudo apt update
sudo apt upgrade -y
```

> **Note:** WSL fresh install TIDAK punya folder bawaan kayak Downloads, Pictures, Documents. Nanti di Segmen 1 kita akan bikin sendiri.

#### Langkah 4 — Verifikasi Instalasi

```bash
wsl --version
```

Output yang diharapkan:
```
WSL version: 2.x.x.x
Kernel version: 5.x.x
```

### Untuk Pengguna Mac

MacOS udah pake terminal Unix bawaan — **gak perlu WSL**.

Cukup:
1. Buka **Terminal** (cmd+spasi, ketik "Terminal")
2. Pastikan **Homebrew** terinstall:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Selesai — MacOS siap dipakai.

### Untuk Pengguna PC Lab (Tanpa WSL)

PC Lab pake Linux langsung — **gak perlu WSL**. Tinggal boot, login, buka terminal. Tapi lebih baik bawa laptop sendiri biar bisa latihan di rumah.

---

## 2. Bikin Akun GitHub

### Kenapa?

- **Menyimpan portofolio** project CLI, script, dan web yang bakal lo buat
- **Kolaborasi** — ngirim tugas, ikut project bareng
- **Wajib** buat Segmen 5 (Git & Version Control) dan Segmen 7 (Web Dev)

### Step-by-step (5 menit)

1. Buka https://github.com/signup
2. Masukin email (pake email aktif, bisa email kampus)
3. Bikin password (min 8 karakter, ada huruf + angka)
4. Pilih username — contoh: `ahmadfauzi` atau `ahmad-fauzi23`
   - Pakai nama asli atau nama panggilan yang profesional
   - Ini bakal jadi identitas lo di dunia coding
5. Verifikasi email (cek inbox/spam, klik link dari GitHub)
6. Pilih plan: **Free** (gratis, gak perlu bayar)

### Selesai! ✅

Setelah selesai, catet username GitHub lo. Nanti dipake buat clone repo dan push project.

---

## 3. Bikin YouTube Channel

### Kenapa?

- Tempat upload **video tugas** tiap akhir segmen
- Mode **Unlisted** — cuma orang yang punya link yang bisa nonton
- Gratis, pake Google Account yang sama

### Step-by-step (3 menit)

1. Buka https://youtube.com
2. Klik logo profil pojok kanan atas → **Create a channel**
3. Pilih **"Get started"**
4. Isi nama channel:
   ```
   Nama: Ahmad Fauzi     ← pakai nama asli aja
   ```
5. Klik **Create channel**

### Selesai! ✅

Channel lo udah jadi. Gak perlu upload apa-apa dulu — nanti pas akhir segmen baru upload video tugas.

---

## 4. Install Tools Awal

Tools ini bakal dipake mulai dari Session 0 dan Segmen 1.

### Di WSL Ubuntu / Linux

```bash
sudo apt update
sudo apt install -y htop tree neofetch git curl wget
```

Penjelasan tiap tools:

| Tools | Fungsi | Dipake di Segmen |
|-------|--------|-----------------|
| `htop` | Task Manager di terminal | Segmen 3 |
| `tree` | Liat struktur folder secara visual | Segmen 1 |
| `neofetch` | Info sistem keren (pake di Session 0) | Session 0 |
| `git` | Version control (WAJIB) | Segmen 5 |
| `curl` | Download & API | Segmen 3 & 4 |
| `wget` | Download file | Segmen 3 & 4 |

### Di MacOS

```bash
brew install htop tree neofetch git curl wget
```

### Di PC Lab

Tools biasanya udah terinstall. Kalo belum, tinggal `sudo apt install` sama kayak di WSL.

---

## 5. Setup Git + SSH Key

### 5a. Git Config — Nama & Email

Config ini wajib biar setiap commit lo tercatat dengan identitas yang bener.

```bash
git config --global user.name "Ahmad Fauzi"
git config --global user.email "ahmadfauzi@email.com"
```

Ganti dengan nama dan email asli lo. Email harus SAMA dengan email yang dipake daftar GitHub.

Verifikasi:
```bash
git config --global --list
```

### 5b. Bikin SSH Key (agar push ke GitHub tanpa password)

#### Kenapa SSH Key?
Biar lo bisa push (upload) project ke GitHub tanpa perlu login tiap kali.

#### Step-by-step:

```bash
# 1. Bikin kunci SSH
ssh-keygen -t ed25519 -C "emailkamu@email.com"

# 2. Enter 3x (accept default)
# Output: Your identification has been saved in ~/.ssh/id_ed25519
#         Your public key has been saved in ~/.ssh/id_ed25519.pub

# 3. Tampilin kunci publik
cat ~/.ssh/id_ed25519.pub
```

Copy output dari langkah 3 (mulai dari `ssh-ed25519` sampai email). Lalu:

1. Buka https://github.com/settings/keys
2. Klik **New SSH Key**
3. Title: `Laptop Saya`
4. Key: paste hasil copy tadi
5. Klik **Add SSH Key**

Verifikasi:
```bash
ssh -T git@github.com
```
Output yang diharapkan:
```
Hi ahmadfauzi! You've successfully authenticated...
```

---

## 6. Clone Repo Organisasi

Repo organisasi berisi bahan belajar, template, dan kurikulum. Clone biar bisa diakses offline.

### Yang perlu di-clone:

```bash
# 1. Kurikulum — materi lengkap 8 segmen
git clone https://github.com/penguin-circle/kurikulum.git

# 2. Template submission — template buat submit tugas (kosong, isi sendiri)
git clone https://github.com/penguin-circle/template-submission.git

# 3. Legacy — arsip kurikulum versi sebelumnya (opsional, buat referensi)
git clone https://github.com/penguin-circle/legacy.git
```

### Hasil setelah clone:

```
/home/namakamu/
├── kurikulum/            ← Materi belajar (tinggal baca)
├── template-submission/  ← Template tugas (isi sendiri)
└── legacy/               ← Kurikulum lama (opsional)
```

**Tips:** Kalo repo berubah (ada update), tinggal:
```bash
git pull
```
di dalam folder masing-masing.

---

## 7. Ceklist Final Sebelum Datang

> Centang semua sebelum berangkat ke Lab:

### Wajib

- [ ] Laptop + Charger
- [ ] WSL Ubuntu sudah terinstall dan bisa dibuka
- [ ] `sudo apt update && sudo apt upgrade` sudah jalan

### Akun

- [ ] Akun GitHub sudah jadi — catet username
- [ ] YouTube Channel sudah jadi
- [ ] SSH Key sudah ditambahkan ke GitHub

### Tools

- [ ] `htop`, `tree`, `neofetch`, `git`, `curl`, `wget` terinstall
- [ ] `git config --global user.name` dan `user.email` sudah diisi
- [ ] `ssh -T git@github.com` berhasil (tampilin nama lo)

### Repo

- [ ] `kurikulum` sudah di-clone
- [ ] `template-submission` sudah di-clone

### Lain-lain

- [ ] Gabung grup WA The Penguin Circle
- [ ] Follow Instagram @tmc.pdbi buat info terbaru
- [ ] Install aplikasi screen record (OBS Studio / Kazam / Game Bar)
- [ ] Catet pertanyaan — apa yang pengen lo tanyain di Session 0

---

## Timeline Persiapan

| H- | Yang Dilakuin | Estimasi |
|----|---------------|----------|
| H-3 | Install WSL + update | 20 menit |
| H-2 | Bikin GitHub + YouTube + SSH | 15 menit |
| H-1 | Install tools + clone repo | 10 menit |
| H-0 | Cek ceklist final | 5 menit |

Total: **~50 menit**. Gak sampe 1 jam, bro.

---

## Troubleshooting

### WSL error "Virtualization is disabled"

1. Restart laptop → masuk BIOS (tekan F2/Del/F10 pas booting)
2. Cari **Intel Virtualization Technology** atau **SVM Mode** → Enable
3. Save & exit

### WSL error "WSL 2 requires an update"

```powershell
# Di PowerShell Admin:
wsl --update
wsl --set-default-version 2
```

### SSH Key ditolak GitHub

1. Pastikan email di `ssh-keygen` SAMA dengan email GitHub
2. Cek kunci publik udah di-paste dengan bener di GitHub Settings
3. Coba lagi: `ssh -T git@github.com`

### Lupa password WSL

Di PowerShell Admin:
```powershell
wsl --unregister Ubuntu
wsl --install
```
Ini ngulangin instalasi dari awal — semua data di WSL akan ilang.

### Ada error lain?

Tanyain aja di grup WA. Jangan panik — admin bantu satu-satu.
