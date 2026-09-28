---
id: git-workflow-conflict-detached-head
title: Mengatasi Detached HEAD & Merge Conflict pada Git Kolaboratif
category: Git & Version Control
author: Mu'adz Hudzaifah
date: 2026-09-21
readTime: 5 menit
tags: ["git", "github", "detached-head", "conflict", "devops"]
summary: Panduan pemecahan masalah (troubleshooting) ketika commit tersangkut di detached HEAD atau branch lokal bentrok dengan commit rekan kelompok di repository GitHub.
---

## 1. Masalah 1: "You are in 'detached HEAD' state"

### Apa Penyebabnya?
Detached HEAD terjadi ketika Anda melakukan `git checkout <commit-hash>` ke commit tertentu di masa lalu, alih-alih checkout ke sebuah nama branch (seperti `main`). Jika Anda melakukan commit dalam kondisi ini, commit tersebut tidak terikat pada branch mana pun dan bisa terhapus oleh proses *garbage collector* (`git gc`).

### Solusi Pemulihan (Recovery):
Jangan panik! Selama Anda belum menutup terminal atau menjalankan command berbahaya, seluruh commit masih ada. Amankan dengan cara membuat branch baru di posisi commit saat ini:

```bash
# 1. Simpan commit melayang ke branch baru bernama 'recovery-work'
git branch recovery-work

# 2. Kembali ke branch utama Anda
git checkout main

# 3. Gabungkan commit yang sudah diamankan tadi ke branch utama
git merge recovery-work

# 4. Hapus branch temporary jika sudah rapi
git branch -d recovery-work
```

## 2. Masalah 2: Merge Conflict saat `git pull`

### Apa Penyebabnya?
Rekan tim Anda telah mengubah file atau baris kode yang sama, lalu melakukan push ke GitHub terlebih dahulu. Saat Anda menjalankan `git pull`, Git tidak bisa memutuskan baris mana yang harus dipertahankan.

### Solusi Step-by-Step Menggunakan Stash & Rebase:
Cara paling bersih untuk menghindari riwayat commit kusut (*merge commits spam*):

```bash
# 1. Simpan sementara perubahan yang belum dicommit
git stash

# 2. Ambil update terbaru dari GitHub dan letakkan commit Anda di paling atas
git pull --rebase origin main

# 3. Kembalikan perubahan lokal Anda
git stash pop

# 4. Buka file yang berstatus CONFLICT di VS Code
# Pilih: 'Accept Current Change', 'Accept Incoming Change', atau 'Accept Both'

# 5. Setelah selesai resolved, tambahkan ke staging dan lanjutkan rebase
git add .
git rebase --continue

# 6. Push kembali ke GitHub dengan riwayat yang lurus dan rapi
git push origin main
```

## 3. Konvensi Commit Pesan (Conventional Commits)
Gunakan standar prefix commit pesan berikut agar riwayat commit tugas Anda profesional di mata dosen penguji:

* `feat:` Menambahkan fitur baru (contoh: `feat(auth): tambah login mahasiswa`)
* `fix:` Memperbaiki bug (contoh: `fix(api): perbaiki error response 500`)
* `docs:` Perubahan dokumen (contoh: `docs(laporan): update bab 2 landasan teori`)
* `refactor:` Restrukturisasi kode tanpa mengubah fungsionalitas

## 4. Referensi
* Chacon, S., & Straub, B. (2014). *Pro Git (2nd Edition)*. Apress.
* Conventional Commits 1.0.0 Specification (https://www.conventionalcommits.org/).
