# The Penguin Circle — Persiapan Pertemuan 0

> Dokumen ini berisi **semua yang harus peserta siapkan SEBELUM datang** ke Session 0.
> Kalau ada kendala, chat admin di grup WA.

---

## Daftar Isi

1. [Instalasi WSL Ubuntu](#1-instalasi-wsl-ubuntu)
2. [Instalasi VS Code](#2-instalasi-vs-code)
3. [Bikin Akun GitHub](#3-bikin-akun-github)
4. [Install Tools Awal](#4-install-tools-awal)
5. [Setup Git + SSH Key](#5-setup-git--ssh-key)
6. [Install AI Agent](#6-install-ai-agent)
7. [Clone Repo Organisasi](#7-clone-repo-organisasi)
8. [Ceklist Final Sebelum Datang](#8-ceklist-final-sebelum-datang)

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

## 2. Instalasi VS Code

### Kenapa?

- **VS Code** adalah tempat lo melihat & mengelola hasil kerja (file markdown & kode)
- AI Agent menulis file di terminal, lo buka & koreksi di VS Code
- Ini jadi "editor utama" The Penguin Circle (bukan nano/editor terminal)

### Step-by-step (5 menit)

1. Buka https://code.visualstudio.com
2. Klik **Download for Windows** (atau untuk Mac/Linux sesuai OS lo)
3. Jalankan installer, ikuti default (centang "Add to PATH" bila muncul)
4. Buka VS Code, lalu install ekstensi penting:

| Ekstensi | Fungsi |
|----------|--------|
| **WSL** (Microsoft) | Bisa buka folder Linux WSL langsung dari VS Code |
| **Live Server** (Ritwick Dey) | Preview HTML langsung di browser |
| **Prettier** | Merapikan format kode otomatis |
| **Tailwind CSS IntelliSense** | Bantuan penulisan Tailwind (Segmen 4+) |

### Verifikasi

1. Buka WSL Ubuntu → ketik `code .` 
2. VS Code harus terbuka dari terminal WSL
3. Kalo belum, buka VS Code → Ctrl+Shift+P → "WSL: Connect to WSL"

---

## 3. Bikin Akun GitHub

### Kenapa?

- **Menyimpan portofolio** project web yang lo buat
- **Kolaborasi** — ngirim tugas, kerja tim (Segmen 7-8)
- **Wajib** buat Segmen 2 (Git & Perancangan Produk) dan seterusnya

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
| `htop` | Task Manager di terminal | Sepanjang sesi (opsional) |
| `tree` | Liat struktur folder secara visual | Segmen 1 |
| `neofetch` | Info sistem keren (pake di Session 0) | Session 0 |
| `git` | Version control (WAJIB) | Segmen 2+ |
| `curl` | Download & API | Sambil jalan (opsional) |
| `wget` | Download file | Sambil jalan (opsional) |

### Node.js & npm (WAJIB untuk Segmen 4+)

```bash
sudo apt install -y nodejs npm
```

> **Note:** Versi bawaan Ubuntu kadang lawas. Cara paling mudah mengupdate Node.js:
> ```bash
> # Install Node.js LTS via NodeSource
> curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
> sudo apt install -y nodejs
> ```
> Verifikasi: `node -v` dan `npm -v`

### Di MacOS

```bash
brew install htop tree neofetch git curl wget node
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

## 6. Install AI Agent

> AI Agent adalah "kru kerja" lo sepanjang The Penguin Circle. Dia menulis file
> (dokumen & kode) atas perintah lo. Lo yang mengarahkan, dia yang mengeksekusi.
> Kalau belum bisa install, jangan khawatir — kita bantu bareng di Session 0.

### Pilihan AI Agent

| AI Agent | Cara Install | Catatan |
|----------|--------------|---------|
| **opencode** | `curl -fsSL https://opencode.ai/install.sh | sh` | Rekomendasi, gratis, jalan di terminal |
| **Claude Code** (Anthropic) | `npm install -g @anthropic-ai/claude-code` | Perlu akun, ada batasan gratis |
| **Gemini CLI** (Google) | `npm install -g @google/gemini-cli` | Perlu API key |

### Verifikasi

```bash
# Contoh untuk opencode
opencode
```

Jika muncul helo/antarmuka percakapan di terminal — berhasil.

---

## 7. Clone Repo Organisasi

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

## 8. Ceklist Final Sebelum Datang

> Centang semua sebelum berangkat ke Lab:

### Wajib

- [ ] Laptop + Charger
- [ ] WSL Ubuntu sudah terinstall dan bisa dibuka
- [ ] `sudo apt update && sudo apt upgrade` sudah jalan

### VS Code

- [ ] VS Code sudah terinstall
- [ ] Ekstensi WSL, Live Server, Prettier sudah terpasang
- [ ] `code .` dari terminal WSL bisa membuka VS Code

### Akun

- [ ] Akun GitHub sudah jadi — catet username
- [ ] SSH Key sudah ditambahkan ke GitHub

### Tools

- [ ] `htop`, `tree`, `neofetch`, `git`, `curl`, `wget` terinstall
- [ ] Node.js & npm terinstall (`node -v` berjalan)
- [ ] `git config --global user.name` dan `user.email` sudah diisi
- [ ] `ssh -T git@github.com` berhasil (tampilin nama lo)

### AI Agent

- [ ] AI Agent sudah terinstall (opencode / claude / gemini)
- [ ] `opencode` (atau sesuai pilihan) bisa dibuka di terminal

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
| H-2 | Bikin GitHub + SSH + Install VS Code | 20 menit |
| H-2 | Install Node.js, Git, tools, AI Agent | 15 menit |
| H-1 | Clone repo + ceklist final | 10 menit |
| H-0 | Verifikasi di Session 0 | 5 menit |

Total: **~70 menit**. Gak sampe 1,5 jam, bro.

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

### VS Code tidak membuka folder WSL

1. Pastikan ekstensi **WSL** terinstall di VS Code (versi Windows)
2. Buka VS Code → klik logo hijau pojok kiri bawah → "Connect to WSL"
3. Baru buka folder (File → Open Folder) di dalam WSL

### Node.js versi terlalu lama

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

### Lupa password WSL

Di PowerShell Admin:
```powershell
wsl --unregister Ubuntu
wsl --install
```
Ini ngulangin instalasi dari awal — semua data di WSL akan ilang.

### AI Agent tidak bisa diinstall

- Pastikan `curl` terinstall: `sudo apt install curl -y`
- Pastikan koneksi internet stabil (kadang butuh proxy/VPN)
- Tanya admin di grup WA — kita bantu bareng di Session 0

### Ada error lain?

Tanyain aja di grup WA. Jangan panik — admin bantu satu-satu.