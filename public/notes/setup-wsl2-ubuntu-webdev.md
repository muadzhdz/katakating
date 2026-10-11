---
id: setup-wsl2-ubuntu-webdev
title: Setup Lengkap WSL2 Ubuntu 24.04 untuk Web Development
category: Web & Tooling
author: Mu'adz Hudzaifah
date: 2026-09-21
readTime: 6 menit
tags: ["linux", "wsl2", "ubuntu", "webdev", "nodejs", "php"]
summary: Panduan instalasi dan konfigurasi native Linux kernel di Windows menggunakan WSL2 untuk kebutuhan praktikum web, lengkap dengan NVM, PHP, dan VS Code integration.
---

## 1. Tujuan Praktikum
Menyiapkan environment pengembangan web berbasis Linux di dalam sistem operasi Windows tanpa perlu dual-boot atau virtual machine yang berat. Menghilangkan kendala incompatibilitas package Linux pada praktikum pemrograman web dan jaringan.

## 2. Prasyarat Sistem
* Windows 10 (Build 19041+) atau Windows 11.
* Virtualization Technology (VT-x / AMD-V) telah aktif di BIOS/UEFI.
* Koneksi internet untuk download package Ubuntu.

## 3. Langkah Instalasi

### 3.1. Install WSL2 & Ubuntu 24.04
Buka PowerShell dengan hak akses Administrator (**Run as Administrator**), lalu jalankan perintah berikut:

```bash
# Install WSL kernel dan distro Ubuntu terbaru
wsl --install -d Ubuntu-24.04
```

Setelah proses download selesai, restart komputer jika diminta oleh sistem Windows.

### 3.2. Update Repositori & Package Esensial
Buka terminal Ubuntu yang baru dipasang, lalu buat username dan password UNIX Anda. Selanjutnya, perbarui repositori:

```bash
# Update index repositori dan upgrade paket
sudo apt update && sudo apt upgrade -y

# Install build tools dan curl
sudo apt install -y build-essential curl wget git unzip
```

### 3.3. Pasang Node.js via NVM (Node Version Manager)
Hindari memasang Node.js langsung via `apt` karena versinya sering tertinggal. Gunakan NVM agar versi Node mudah disesuaikan dengan modul praktikum:

```bash
# Download & install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Muat ulang konfigurasi bash
source ~/.bashrc

# Pasang Node.js versi LTS (Long Term Support)
nvm install --lts
nvm use --lts
node -v && npm -v
```

### 3.4. Pasang Stack PHP & Composer (Praktikum Web Backend)
Untuk praktikum backend Laravel atau PHP native:

```bash
# Pasang PHP CLI dan ekstensi umum
sudo apt install -y php-cli php-mbstring php-xml php-curl php-zip php-mysql

# Pasang Composer (Dependency Manager PHP)
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php --install-dir=/usr/local/bin --filename=composer
php -r "unlink('composer-setup.php');"
composer --version
```

## 4. Integrasi dengan Visual Studio Code
1. Buka VS Code di Windows.
2. Pasang ekstensi resmi **WSL** dari Microsoft (ID: `ms-vscode-remote.remote-wsl`).
3. Buka terminal Ubuntu WSL, arahkan ke folder proyek Anda, lalu ketik:
```bash
code .
```
VS Code di Windows akan otomatis terhubung ke Linux subsystem dengan performa I/O native.

## 5. Troubleshooting & Solusi
* **Error: WslRegisterDistribution failed with error: 0x80370102**
  * *Penyebab*: Fitur virtualisasi CPU belum diaktifkan di BIOS.
  * *Solusi*: Masuk ke BIOS saat boot (tekan F2/Del), cari menu CPU Configuration, aktifkan **Intel Virtualization Technology** atau **AMD SVM**.
* **I/O Lambat saat `npm install` atau `composer install`**
  * *Penyebab*: Proyek ditaruh di drive Windows (`/mnt/c/...`).
  * *Solusi*: Selalu simpan file proyek di dalam filesystem Linux native, misalnya di `~/projects/` (`/home/username/projects/`).

## 6. Referensi & Dokumen Terkait
* Microsoft Docs: *Install WSL on Windows 10/11* (https://learn.microsoft.com/en-us/windows/wsl/install)
* Ubuntu Server Guide: *Ubuntu 24.04 LTS Noble Numbat Documentation*.
* Standar Toolchain Lab Multimedia Universitas Boash.
