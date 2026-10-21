-- D1 Seed SQL Generated automatically

INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'setup-dual-boot-linux-windows',
  'Panduan Setup Dual-Boot Linux dan Windows untuk Praktikum Mahasiswa Baru',
  'Langkah aman instalasi dual-boot Arch/Ubuntu dan Windows tanpa menghapus partisi EFI atau kehilangan lisensi bawaan laptop.',
  'Langkah aman instalasi dual-boot Arch/Ubuntu dan Windows tanpa menghapus partisi EFI atau kehilangan lisensi bawaan laptop.',
  'Mu''adz Hudzaifah',
  '24903460014',
  'systems-network',
  '["TRM","IF","SRK","Mekatronika"]',
  1,
  'DB',
  '#00ff66',
  '',
  '',
  142,
  45,
  '2026-09-23 10:00:00',
  '2026-09-23 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'pointer-memori-dinamis-cpp',
  'Solusi Memahami Pointer dan Alokasi Memori Dinamis C/C++ Tanpa Segfault',
  'Tips visual memahami alamat memori, dereferencing, malloc, free, dan smart pointers di C++ agar praktikum algoritma bebas error.',
  'Tips visual memahami alamat memori, dereferencing, malloc, free, dan smart pointers di C++ agar praktikum algoritma bebas error.',
  'Mu''adz Hudzaifah',
  '24903460014',
  'web-software',
  '["TRM","IF","Mekatronika"]',
  1,
  'PT',
  '#00ff66',
  '',
  '',
  89,
  23,
  '2026-09-23 10:00:00',
  '2026-09-23 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'normalisasi-sql-1nf-ke-3nf',
  'Cheat-Sheet Query SQL: Cara Cepat Normalisasi Data dari 1NF sampai 3NF',
  'Metode cepat memecah tabel data yang berantakan menjadi tabel relasional yang memenuhi standar 1NF, 2NF, dan 3NF.',
  'Metode cepat memecah tabel data yang berantakan menjadi tabel relasional yang memenuhi standar 1NF, 2NF, dan 3NF.',
  'Tim KataKating',
  '24903460014',
  'web-software',
  '["TRM","IF","SI"]',
  2,
  'NF',
  '#22c55e',
  '',
  '',
  112,
  38,
  '2026-09-23 10:00:00',
  '2026-09-23 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'render-blender-crash-gpu-hemat-daya',
  'Cara Mengatasi Render Blender Sering Crash pada Laptop Tanpa GPU Tambahan',
  'Trik optimasi setting render Cycles dan Eevee agar tidak freeze atau close sendiri saat rendering tugas 3D di laptop standar.',
  'Trik optimasi setting render Cycles dan Eevee agar tidak freeze atau close sendiri saat rendering tugas 3D di laptop standar.',
  'Tim KataKating',
  '24903460014',
  'multimedia-3d',
  '["TRM"]',
  3,
  'BL',
  '#34d399',
  '',
  '',
  76,
  19,
  '2026-09-23 10:00:00',
  '2026-09-23 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'simulasi-esp32-dht22-wokwi',
  'Langkah Simulasi ESP32 dan Sensor DHT22 di Wokwi Sebelum Turun ke Hardware Fisik',
  'Panduan lengkap wiring virtual diagram.json, konfigurasi MQTT broker publik, dan pengujian OLED SSD1306 di Wokwi.',
  'Panduan lengkap wiring virtual diagram.json, konfigurasi MQTT broker publik, dan pengujian OLED SSD1306 di Wokwi.',
  'Mu''adz Hudzaifah',
  '24903460014',
  'iot-hardware',
  '["TRM","Mekatronika","SRK"]',
  5,
  'WK',
  '#00ff66',
  '',
  '',
  204,
  67,
  '2026-09-23 10:00:00',
  '2026-09-23 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'bypass-gradle-timeout-android-studio',
  'Solusi Mengatasi Build Timeout dan Error Gradle pada Android Studio',
  'Trik mengonfigurasi gradle.properties dan offline mode agar kompilasi aplikasi mobile tidak stuck berjam-jam saat koneksi lab lambat.',
  'Trik mengonfigurasi gradle.properties dan offline mode agar kompilasi aplikasi mobile tidak stuck berjam-jam saat koneksi lab lambat.',
  'Tim KataKating',
  '24903460014',
  'web-software',
  '["TRM","IF"]',
  5,
  'AS',
  '#10b981',
  '',
  '',
  165,
  52,
  '2026-09-23 10:00:00',
  '2026-09-23 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'ai-chat-vs-ai-cli',
  'AI Chat vs AI CLI: Alat Paling Powerful untuk Mahasiswa Teknologi & Software',
  'Panduan komparasi lengkap AI chat vs AI CLI coding agent untuk mahasiswa: instalasi, alur kerja, etika belajar, dan rekomendasi alat terbaik.',
  '---
id: ai-chat-vs-ai-cli
title: AI Chat vs AI CLI: Alat Paling Powerful untuk Mahasiswa Teknologi & Software
category: Algoritma & Pemrograman
author: Faris Aghna
date: 2026-10-19
readTime: 8 menit
initials: AICL
tags: ["algoritma", "ai", "cli", "terminal", "claude", "gemini", "opencode", "mahasiswa"]
summary: Panduan komparasi lengkap AI chat vs AI CLI coding agent untuk mahasiswa: instalasi, alur kerja, etika belajar, dan rekomendasi alat terbaik.
---

# AI CLI: Alat Paling Powerful untuk Mahasiswa Teknologi & Software

> Panduan untuk mahasiswa baru yang masih memakai AI chat biasa (copy-paste kode bolak-balik) untuk hampir semua hal.
> Informasi perintah instalasi dan persyaratan diverifikasi dari dokumentasi resmi pada **6 Oktober 2026**. Fitur, harga, dan kuota gratis di bidang ini berubah cepat, jadi selalu cek tautan resmi sebelum memutuskan berlangganan.

---

## 1. Apa itu AI CLI?

**AI CLI** (juga disebut *AI coding agent* atau *terminal agent*) adalah program AI yang dijalankan **di terminal**, di dalam folder proyekmu. Berbeda dengan chatbot di browser, AI CLI:

- **Membaca file proyekmu secara langsung** (tidak perlu copy-paste).
- **Mengedit file** dan membuat file baru.
- **Menjalankan perintah** (install dependency, jalankan test, `git commit`, dll.) atas izinmu.
- **Mengulang sendiri** sampai tugas selesai: menulis kode → menjalankan → membaca error → memperbaiki.

Singkatnya: AI chat itu **konsultan yang hanya bisa bicara**, AI CLI itu **rekan kerja yang duduk di komputermu dan bisa mengetik**.

---

## 2. Kenapa AI CLI Jauh Lebih Efektif daripada AI Chat Biasa

| Aspek | AI Chat (browser) | AI CLI (terminal) |
|---|---|---|
| **Konteks proyek** | Harus kamu tempel manual; sering terpotong atau salah | Membaca seluruh struktur repo sendiri |
| **Alur kerja** | Copy kode → paste → jalankan → copy error → paste lagi | Sekali perintah, AI menjalankan dan memperbaiki sendiri |
| **Edit file** | Kamu yang menerapkan perubahan | Langsung mengedit file (dengan persetujuanmu) |
| **Verifikasi** | AI menebak apakah kodenya jalan | Bisa menjalankan test/build dan melihat hasil nyata |
| **Git** | Manual | Bisa membuat branch, commit, dan menjelaskan diff |
| **Tugas multi-file** | Sangat melelahkan | Memang dirancang untuk ini (refactor, fitur lintas file) |
| **Otomasi** | Tidak bisa | Bisa dipanggil dari script dan CI |
| **Ekstensi** | Terbatas | Mendukung MCP (hubungkan ke database, GitHub, dokumentasi, dll.) |

### Contoh nyata perbedaannya

**Dengan AI chat:**
1. Kamu mendapat error build.
2. Copy error → paste ke chat.
3. AI menjawab dengan tebakan karena tidak melihat file aslinya.
4. Kamu edit manual, jalankan lagi, error baru, ulangi.

**Dengan AI CLI:**
```
> perbaiki error build ini dan pastikan test lulus
```
AI membuka file yang relevan, memperbaiki, menjalankan `npm run build` dan `npm test`, lalu melaporkan hasilnya.

### Kenapa ini penting khususnya untuk mahasiswa

1. **Tugas dan proyek kuliah** sering berupa repo multi-file; di sinilah AI chat paling kewalahan.
2. **Belajar codebase baru** (misalnya proyek open source atau proyek kelompok): minta AI menjelaskan struktur repo dengan konteks nyata.
3. **Kebiasaan kerja industri**: terminal, git, dan test adalah bahasa sehari-hari engineer. AI CLI membiasakanmu dengan alur itu.
4. **Freelance / magang**: pekerjaan yang dulu butuh berjam-jam (setup proyek, boilerplate, bugfix kecil) bisa selesai jauh lebih cepat.

---

## 3. Peringatan Jujur (Baca Ini!)

AI CLI itu kuat, tetapi bukan tanpa risiko. Beberapa hal yang harus dipahami sejak awal:

- **Jangan jadikan AI pengganti belajar.** Kalau semua kode kamu delegasikan tanpa dipahami, kamu akan kesulitan saat ujian, wawancara kerja, atau saat AI salah (dan AI memang bisa salah). Pakai AI untuk **mempercepat**, bukan untuk **menghindari** pemahaman. Cara sehat: minta AI menjelaskan setiap perubahan, lalu coba tulis ulang bagian sederhananya sendiri.
- **Selalu pakai Git.** Karena AI bisa mengedit banyak file sekaligus, `git init` dan commit sebelum memulai sesi supaya mudah dibatalkan (`git diff`, `git restore`).
- **Baca setiap perintah dan diff sebelum menyetujui.** Jangan asal mengaktifkan mode "auto-approve" sebelum paham risikonya; agen bisa menjalankan perintah di komputermu.
- **Jangan biarkan AI mengakses rahasia.** File `.env`, API key, dan password jangan sampai ikut terkirim atau ter-commit.
- **Hati-hati dengan `curl ... | bash`.** Perintah instalasi seperti ini menjalankan script dari internet. Pastikan URL-nya berasal dari **dokumentasi resmi** (tautan di bawah), bukan dari blog acak.
- **Cek kebijakan kampus/dosen** soal penggunaan AI untuk tugas. Menyerahkan hasil AI tanpa disclosure bisa dianggap pelanggaran akademik.
- **AI chat tetap berguna**, bahkan sering lebih baik untuk belajar konsep (lihat bagian 4). AI CLI unggul khusus untuk pekerjaan yang menyentuh file dan kode proyek.

---

## 4. Belajar vs Bekerja: Kapan AI Chat Justru Lebih Baik

Bagian sebelumnya menekankan **efisiensi kerja**. Untuk **belajar**, gambarnya berbeda, dan AI chat punya keunggulan yang nyata.

### Kenapa AI chat bisa menghasilkan lebih banyak pembelajaran

| Aspek | AI Chat | AI CLI |
|---|---|---|
| **Pola interaksi** | Dialog bolak-balik: bertanya, dibantah, diminta menjelaskan ulang | Berorientasi hasil: beri instruksi, tunggu selesai |
| **Peran kamu** | Terlibat aktif: mengetik, memutuskan, memahami tiap langkah | Mudah menjadi penonton saat AI mengerjakan semuanya |
| **Kecepatan** | Lebih lambat, sehingga ada waktu mencerna | Cepat, sehingga mudah melewatkan pemahaman |
| **Format belajar** | Cocok untuk analogi, kuis, penjelasan bertahap, dan diskusi konsep | Kurang cocok untuk eksplorasi konsep murni |
| **Kesulitan produktif** | Kamu masih menulis kode dan menemui error sendiri | Error sering langsung diselesaikan AI sebelum kamu sempat memikirkannya |

Prinsip umum dalam ilmu belajar mendukung arah ini: pemahaman cenderung lebih kuat ketika kamu **aktif** (menjelaskan, mencoba mengingat tanpa melihat jawaban, menyelesaikan masalah sendiri), bukan hanya membaca atau menonton hasil jadi. Proses bergelut dengan error dan salah paham sering kali adalah bagian dari belajar itu sendiri.

### Catatan penting agar tidak salah kaprah

- **Ini lebih tepat disebut hipotesis yang masuk akal, bukan fakta yang sudah mapan.** Penelitian tentang AI dan hasil belajar masih berkembang dan hasilnya beragam. Jangan menganggap klaim "chat pasti lebih mendidik" sebagai kepastian.
- **Yang menentukan adalah cara pakai, bukan jenis alatnya.** AI chat yang dipakai untuk copy-paste jawaban tanpa dipikirkan sama pasifnya dengan AI CLI yang dibiarkan bekerja sendiri. Sebaliknya, AI CLI bisa dipakai secara aktif (lihat tips di bawah).
- **Interaktif tidak otomatis berarti belajar.** Sesi chat yang panjang bisa terasa produktif padahal kamu hanya membaca jawaban. Ukurannya: bisakah kamu menjelaskan ulang atau menulis ulang solusinya tanpa melihat?

### Pembagian peran yang disarankan

| Tujuanmu | Alat yang cocok |
|---|---|
| Memahami konsep baru (pointer, async, normalisasi database, dll.) | **AI chat** sebagai tutor |
| Latihan soal, kuis, simulasi wawancara teknis | **AI chat** |
| Meninjau kode yang **kamu tulis sendiri** dan meminta umpan balik | **AI chat** (tempel potongan kodenya) |
| Memahami struktur proyek besar yang belum kamu kenal | **AI CLI** (mode baca saja) |
| Menyelesaikan pekerjaan berulang, boilerplate, setup, bugfix kecil | **AI CLI** |
| Fitur lintas banyak file, refactor, menjalankan test otomatis | **AI CLI** |

### Prompt contoh untuk memakai AI chat sebagai tutor

```
Saya mahasiswa semester awal. Jelaskan konsep [topik] dengan analogi sehari-hari.
Setelah itu, JANGAN langsung beri jawaban latihan: ajukan 3 pertanyaan bertahap
untuk menguji pemahaman saya, dan koreksi jawaban saya satu per satu.
```

```
Ini kode yang saya tulis sendiri: [kode]. Jangan tulis ulang. Beri petunjuk
tentang bug-nya (tanpa solusi lengkap) dan tanyakan apa yang menurut saya salah.
```

### Cara memakai AI CLI tanpa kehilangan kesempatan belajar

- Mulai dari **mode baca saja / perencanaan** dan minta AI menjelaskan sebelum mengubah apa pun.
- **Tulis dulu bagian sederhananya sendiri**, lalu minta AI meninjau dan membandingkan dengan pendekatannya.
- Setelah AI selesai, minta: *"Jelaskan setiap perubahan ini seolah saya mahasiswa semester 2."*
- Sesekali kerjakan tugas **tanpa AI** untuk menguji apakah kemampuanmu benar-benar berkembang.

**Kesimpulan:** gunakan **AI chat untuk memahami**, dan **AI CLI untuk mengeksekusi** apa yang sudah kamu pahami. Mahasiswa yang hanya memakai salah satunya akan kehilangan separuh manfaatnya.

---

## 5. Persiapan Awal (Berlaku untuk Semua Provider)

1. **Terminal.** Windows: PowerShell atau [WSL](https://learn.microsoft.com/windows/wsl/install) (WSL sering lebih mulus untuk alat berbasis Linux). macOS/Linux: terminal bawaan.
2. **Git** terpasang (`git --version`).
3. **Node.js** (untuk beberapa CLI yang dipasang via npm). Gunakan versi LTS terbaru; GitHub Copilot CLI misalnya mensyaratkan Node.js 22+ jika dipasang lewat npm.
4. **Akun** di provider yang dipilih (lihat persyaratan per provider di bawah).
5. Sebuah **folder proyek** (di dalamnya jalankan perintah CLI).

Alur umum semua AI CLI sama:

```bash
cd folder-proyekmu
<nama-cli>        # contoh: claude / codex / gemini / copilot / opencode
# login saat pertama kali, lalu mulai mengetik instruksi
```

---

## 6. Perbedaan Setup per Provider

### Ringkasan cepat

| CLI | Perintah | Cara instalasi utama | Syarat akses | Cocok untuk |
|---|---|---|---|---|
| **Claude Code** (Anthropic) | `claude` | Installer native / Homebrew / WinGet | Akun Pro, Max, Team, Enterprise, atau Console (API). **Paket gratis Claude.ai tidak termasuk** | Pekerjaan agentik yang kompleks, refactor lintas file |
| **Codex CLI** (OpenAI) | `codex` | `npm i -g @openai/codex` / Homebrew / WinGet | Paket ChatGPT berbayar yang mencakup Codex, atau API key OpenAI | Pengguna ekosistem OpenAI/ChatGPT; open source |
| **Gemini CLI** (Google) | `gemini` | `npm i -g @google/gemini-cli` / Homebrew | Login dengan akun Google (ada tier gratis; cek kuota terbaru) atau API key | Mencoba tanpa biaya; open source |
| **GitHub Copilot CLI** | `copilot` | `npm i -g @github/copilot` / WinGet / Homebrew / script | Langganan GitHub Copilot aktif | Sudah memakai GitHub/Copilot; cek program pelajar |
| **OpenCode** (open source) | `opencode` | Script `curl` / npm / Homebrew / Scoop / Chocolatey | Akun/API key provider model pilihanmu (75+ provider didukung) | Fleksibel: bebas pilih model, termasuk model lokal |

> **Catatan:** Tabel di atas adalah ringkasan. Detail terbaru (harga, kuota, model yang tersedia) selalu mengikuti dokumentasi resmi masing-masing.

---

### 6.1 Claude Code (Anthropic)

**Instalasi** (dari dokumentasi resmi):

```bash
# macOS / Linux / WSL
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Homebrew (macOS)
brew install --cask claude-code

# WinGet (Windows)
winget install Anthropic.ClaudeCode
```

**Mulai & login:**
```bash
cd folder-proyekmu
claude          # ikuti proses login di browser saat pertama kali
claude --version   # verifikasi instalasi
```

**Persyaratan akses:** memerlukan akun Pro, Max, Team, Enterprise, atau Console; paket gratis Claude.ai tidak menyertakan akses Claude Code. Tersedia juga ekstensi VS Code dan aplikasi desktop.

**Tautan resmi:**
- Setup: https://code.claude.com/docs/en/setup
- Quickstart: https://code.claude.com/docs/en/quickstart

---

### 6.2 Codex CLI (OpenAI)

**Instalasi:**

```bash
# npm
npm install -g @openai/codex

# Homebrew (macOS)
brew install --cask codex

# WinGet (Windows)
winget install OpenAI.Codex
```

**Mulai & login:**
```bash
codex --version   # verifikasi
cd folder-proyekmu
codex             # pilih login dengan akun ChatGPT atau API key
```

**Persyaratan akses:** akun ChatGPT dengan akses Codex (tersedia di paket berbayar tertentu) **atau** API key OpenAI (penagihan berbasis pemakaian). Codex CLI bersifat open source (lisensi Apache-2.0) dan menyimpan konfigurasi di `~/.codex/config.toml`. Dukungan Windows native bisa berbeda dari macOS/Linux; dokumentasi resmi menyarankan WSL pada Windows.

**Tautan resmi:**
- Dokumentasi CLI: https://developers.openai.com/codex/cli
- Quickstart: https://developers.openai.com/codex/quickstart
- Repositori: https://github.com/openai/codex

---

### 6.3 Gemini CLI (Google)

**Instalasi:**

```bash
# npm
npm install -g @google/gemini-cli

# Homebrew (macOS/Linux)
brew install gemini-cli

# Coba tanpa instalasi permanen
npx @google/gemini-cli
```

**Mulai & login:**
```bash
cd folder-proyekmu
gemini            # pilih "Login with Google" lalu ikuti proses di browser
```

**Persyaratan akses:** login dengan akun Google pribadi menyediakan tier gratis; alternatifnya memakai API key (Google AI Studio / Google Cloud). Besaran kuota gratis dan model yang tercakup **berubah dari waktu ke waktu** dan terdapat perbedaan angka antar-versi dokumentasi, sehingga **cek halaman resmi** untuk angka terkini. Gemini CLI bersifat open source (Apache 2.0). Konfigurasi MCP dilakukan di `~/.gemini/settings.json`.

**Tautan resmi:**
- Repositori & dokumentasi: https://github.com/google-gemini/gemini-cli

---

### 6.4 GitHub Copilot CLI

**Instalasi:**

```bash
# npm (semua platform; perlu Node.js 22+)
npm install -g @github/copilot

# WinGet (Windows)
winget install GitHub.Copilot

# Homebrew (macOS/Linux)
brew install copilot-cli

# Script (macOS/Linux)
curl -fsSL https://gh.io/copilot-install | bash
```

**Mulai & login:**
```bash
cd folder-proyekmu
copilot           # ikuti proses autentikasi GitHub
```

**Persyaratan akses:** langganan GitHub Copilot aktif. Jika Copilot kamu berasal dari organisasi/institusi, kebijakan Copilot CLI harus diaktifkan oleh administrator organisasi. Dokumentasi menandai fitur ini sebagai *public preview* (dapat berubah).

**Tips mahasiswa:** GitHub memiliki program untuk pelajar ([GitHub Education / Student Developer Pack](https://education.github.com/pack)). Cek di sana apakah kamu memenuhi syarat untuk akses Copilot gratis. Syarat dan cakupannya perlu diverifikasi langsung di situs tersebut.

**Tautan resmi:**
- Instalasi: https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli

---

### 6.5 OpenCode (Open Source, Bebas Pilih Model)

OpenCode berbeda dari empat di atas: ia **tidak terikat satu penyedia model**. Kamu memasang alatnya, lalu menghubungkannya ke provider pilihanmu (Anthropic, OpenAI, Google, model lokal, dan banyak lainnya).

**Instalasi:**

```bash
# Script (macOS/Linux/WSL)
curl -fsSL https://opencode.ai/install | bash

# npm
npm install -g opencode-ai

# Homebrew
brew install opencode

# Windows
scoop install opencode      # atau: choco install opencode
```

**Mulai & hubungkan provider:**
```bash
cd folder-proyekmu
opencode
opencode auth login    # pilih provider dan masukkan API key / login
```

**Persyaratan akses:** tergantung provider model yang kamu hubungkan (API key atau langganan di provider tersebut). Di dalam sesi kamu bisa berganti model (`/models`).

**Tautan resmi:**
- Situs: https://opencode.ai
- Dokumentasi: https://opencode.ai/docs

---

## 7. Perbedaan Konsep Setup yang Perlu Dipahami

Walaupun perintahnya berbeda, hanya ada **tiga jenis perbedaan** utama:

1. **Cara instalasi**: native installer, npm, atau package manager (Homebrew/WinGet/Scoop). Semuanya berujung pada satu perintah di terminal.
2. **Cara autentikasi**:
   - **Login akun/langganan** (Claude, ChatGPT, Google, GitHub): biaya tetap bulanan, kuota ada batasnya.
   - **API key**: bayar sesuai pemakaian (per token). Fleksibel tetapi **bisa membengkak jika tidak dipantau**, jadi pasang batas pengeluaran di dashboard provider.
3. **Keterikatan model**: Claude Code, Codex, Gemini CLI, dan Copilot CLI terutama menjalankan model dari ekosistem masing-masing (Copilot mendukung beberapa model), sedangkan OpenCode menjembatani banyak provider.

---

## 8. Alur Kerja Pemula yang Disarankan

```bash
# 1. Buat / masuk ke proyek dan aktifkan git
cd proyek-kuliah
git init && git add . && git commit -m "baseline sebelum pakai AI"

# 2. Jalankan AI CLI pilihanmu
claude   # atau codex / gemini / copilot / opencode

# 3. Mulai dari tugas read-only untuk belajar
> jelaskan struktur proyek ini dan cara menjalankannya

# 4. Lanjut ke perubahan kecil dan spesifik
> tambahkan validasi email pada form register dan jelaskan perubahannya

# 5. Tinjau hasilnya
git diff
```

### Tips prompt yang baik
- **Spesifik:** "Tambahkan penanganan error pada fungsi login" lebih baik daripada "perbaiki kodenya".
- **Beri konteks:** stack yang dipakai, batasan, dan hasil yang diharapkan.
- **Minta rencana dulu** untuk tugas besar, baru eksekusi.
- **Minta penjelasan** untuk setiap perubahan agar kamu benar-benar belajar.
- **Satu tugas per sesi** supaya konteks tetap bersih.

---

## 9. Mana yang Sebaiknya Dipilih?

| Situasimu | Pertimbangan |
|---|---|
| Ingin mencoba tanpa mengeluarkan uang | Gemini CLI (tier gratis; cek kuota terbaru) atau cek program pelajar GitHub untuk Copilot |
| Sudah berlangganan ChatGPT | Codex CLI |
| Sudah berlangganan Claude (Pro/Max) | Claude Code |
| Sudah memakai GitHub Copilot di editor | Copilot CLI |
| Ingin bebas pindah-pindah model / pakai model lokal | OpenCode |

Tidak ada satu jawaban yang pasti paling baik untuk semua orang: kualitas hasil bergantung pada model, tugas, dan gaya kerjamu. Cara terbaik adalah **mencoba dua atau tiga dengan tugas nyata yang sama**, lalu membandingkannya sendiri.

---

## 10. Daftar Tautan Resmi

| Provider | Tautan |
|---|---|
| Claude Code | https://code.claude.com/docs/en/setup |
| Claude Code (Quickstart) | https://code.claude.com/docs/en/quickstart |
| OpenAI Codex CLI | https://developers.openai.com/codex/cli |
| OpenAI Codex (Quickstart) | https://developers.openai.com/codex/quickstart |
| OpenAI Codex (GitHub) | https://github.com/openai/codex |
| Gemini CLI | https://github.com/google-gemini/gemini-cli |
| GitHub Copilot CLI | https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli |
| GitHub Education (program pelajar) | https://education.github.com/pack |
| OpenCode | https://opencode.ai/docs |

---

## 11. Keterbatasan Dokumen Ini

- Perintah instalasi dan persyaratan akses diverifikasi dari dokumentasi resmi atau repositori resmi masing-masing provider. **Harga, kuota gratis, daftar model, dan status fitur (misalnya *preview*) tidak dicantumkan secara pasti** karena sering berubah; rujuk tautan resmi.
- Klaim "paling powerful" adalah penilaian untuk **pekerjaan yang berhubungan dengan kode proyek**, bukan untuk semua jenis tugas AI.
- Pernyataan bahwa AI chat dapat memberi pembelajaran lebih banyak (bagian 4) adalah penalaran berdasarkan prinsip umum pembelajaran aktif, bukan hasil studi spesifik yang saya verifikasi di dokumen ini.
- Program pelajar (mis. GitHub Education) belum diverifikasi syarat dan cakupan terkininya di dokumen ini.',
  'Faris Aghna',
  '24903460014',
  'Algoritma & Pemrograman',
  '["algoritma","ai","cli","terminal","claude","gemini","opencode","mahasiswa"]',
  1,
  'AICL',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-10-19 10:00:00',
  '2026-10-19 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'setup-flutter-android-sdk-cli-windows',
  'Panduan Lengkap Install Flutter & Android SDK Headless via Terminal di Windows (Tanpa Android Studio)',
  'Panduan instalasi Flutter SDK dan Android Command-Line Tools (cmdline-tools & adb) secara headless murni via terminal PowerShell di Windows tanpa perlu menginstal Android Studio yang memakan puluhan gigabyte.',
  '---
id: setup-flutter-android-sdk-cli-windows
title: Panduan Lengkap Install Flutter & Android SDK Headless via Terminal di Windows (Tanpa Android Studio)
category: Web & Tooling
author: Mu''adz Hudzaifah
date: 2026-09-24
readTime: 12 menit
initials: FLUT
tags: ["flutter", "dart", "android", "sdk", "adb", "windows", "terminal", "cli", "sdkmanager"]
summary: Panduan instalasi Flutter SDK dan Android Command-Line Tools (cmdline-tools & adb) secara headless murni via terminal PowerShell di Windows tanpa perlu menginstal Android Studio yang memakan puluhan gigabyte. Dilengkapi ensiklopedia perintah CLI Flutter serta inventaris pemecahan masalah teruji.
---

## 1. Tujuan & Latar Belakang
Dalam praktikum rekayasa perangkat lunak mobile, keterbatasan spesifikasi laptop mahasiswa sering kali menjadi kendala utama. Instalasi standar Android Studio dengan emulator grafis dapat menghabiskan ruang penyimpanan lebih dari 15-20 GB serta memakan konsumsi RAM di atas 6-8 GB hanya untuk menjalankan IDE.

Panduan ini mendokumentasikan pendekatan **Headless Command-Line Interface (CLI)** murni di Windows 10/11. Dengan metode ini:
* Kita hanya memasang **Flutter SDK** dan **Android Command-line Tools** resmi dari Google.
* Ruang disk yang digunakan terpangkas drastis (hanya ~3-4 GB).
* Perintah diagnostik `flutter doctor`, pengelola paket `adb`, serta workflow `flutter run` dan `flutter build apk` dapat dijalankan secepat kilat langsung dari PowerShell atau Windows Terminal, dengan teks editor ringan seperti VS Code atau Neovim.

## 2. Prasyarat Sistem & Persiapan Tooling

### 2.1. Memeriksa & Mengaktifkan Windows Package Manager (Winget)
`winget` adalah pengelola paket resmi dari Microsoft untuk Windows 10/11 yang memungkinkan instalasi aplikasi langsung dari baris perintah terminal.

Sebelum memulai, periksa apakah `winget` sudah aktif di sistem Anda:
```powershell
winget --version
```

> **Bagaimana jika perintah winget tidak dikenali? (Cara Mengaktifkan Winget)**
> * **Opsi 1 (Paling Mudah via Microsoft Store):** Buka aplikasi **Microsoft Store**, cari **"App Installer"** (diterbitkan resmi oleh Microsoft Corporation), lalu klik tombol **Dapatkan (Get)** atau **Perbarui (Update)**.
> * **Opsi 2 (Murni Terminal / Headless tanpa Store):** Buka PowerShell (Run as Administrator), lalu jalankan perintah berikut untuk mengunduh dan memasang bundle resmi dari repositori GitHub Microsoft:
> ```powershell
> $wingetUrl = "https://github.com/microsoft/winget-cli/releases/latest/download/Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle"
> Invoke-WebRequest -Uri $wingetUrl -OutFile "$env:TEMP\winget.msixbundle"
> Add-AppxPackage -Path "$env:TEMP\winget.msixbundle"
> Remove-Item "$env:TEMP\winget.msixbundle" -Force
> ```

## 3. Langkah Instalasi Step-by-Step via PowerShell

> Buka **Windows Terminal** atau **PowerShell** dengan hak akses Administrator (**Run as Administrator**) untuk kelancaran eksekusi perintah di bawah.

### 3.1. Pasang Git [BISA DI-SKIP JIKA SUDAH TERPASANG]

> **TIPS UX / HEMAT WAKTU:**
> Sudah pernah menginstal Git sebelumnya? Cek dulu di terminal Anda:
> ```powershell
> git --version
> ```
> Jika terminal menampilkan versi (misalnya `git version 2.4x.x`), **ANDA BISA LANGSUNG MELEWATI (SKIP)** langkah instalasi Git ini dan langsung melompat ke **Langkah 3.2 (Instalasi OpenJDK)**! Jangan buang waktu menginstal ulang hal yang sudah ada.

Jika Git belum terpasang, pasang dengan perintah satu baris berikut:
```powershell
winget install --id Git.Git -e --source winget --accept-source-agreements --accept-package-agreements
```

> **Checkpoint Keberhasilan:**
> Buka jendela terminal baru, ketik `git --version`. Output harus menampilkan versi Git yang terpasang.

### 3.2. Pasang OpenJDK (Java Development Kit)
Flutter dan Android build toolchain membutuhkan Java Virtual Machine (disarankan JDK 17 LTS atau versi Microsoft OpenJDK):

```powershell
winget install --id Microsoft.OpenJDK.17 -e --source winget --accept-source-agreements --accept-package-agreements
```

> **Checkpoint Keberhasilan:**
> Ketik `java -version`. Output harus menampilkan informasi runtime Java OpenJDK.

### 3.3. Clone Flutter SDK & Registrasi PATH
Hindari menaruh Flutter di direktori dengan proteksi hak akses khusus seperti `C:\Program Files\`. Tempatkan pada folder khusus pengembangan seperti `C:\src\flutter`.

```powershell
# 1. Buat folder root C:\src
New-Item -ItemType Directory -Path "C:\src" -Force

# 2. Clone Flutter channel stable menggunakan shallow clone agar proses cepat dan hemat bandwidth
cd C:\src
git clone --depth 1 -b stable https://github.com/flutter/flutter.git C:\src\flutter

# 3. Daftarkan bin Flutter ke User Environment PATH
$CurrentPath = [Environment]::GetEnvironmentVariable("Path", "User")
$FlutterBin = "C:\src\flutter\bin"

if ($CurrentPath -notlike "*$FlutterBin*") {
    [Environment]::SetEnvironmentVariable("Path", "$CurrentPath;$FlutterBin", "User")
    Write-Host "[OK] Flutter ditambahkan ke PATH." -ForegroundColor Green
}
```

Jalankan perintah berikut sekali untuk memicu inisialisasi awal Dart SDK internal:
```powershell
$env:Path = "C:\src\flutter\bin;$env:Path"
flutter --version
```

> **Checkpoint Keberhasilan:**
> Perintah `flutter --version` menampilkan nomor versi Flutter channel stable dan Dart SDK.

### 3.4. Pasang Android Platform-Tools (ADB & Fastboot)
Untuk mendapatkan perintah `adb` resmi secara instan tanpa mengunduh seluruh Android Studio yang berat:

```powershell
# 1. Buat direktori induk Android SDK
New-Item -ItemType Directory -Path "C:\Android\android-sdk" -Force

# 2. Unduh paket Platform-Tools resmi Google menggunakan curl.exe (bawaan Windows, sangat cepat)
$zipAdb = "$env:TEMP\platform-tools.zip"
curl.exe -L -o $zipAdb "https://dl.google.com/android/repository/platform-tools-latest-windows.zip"

# 3. Ekstrak langsung menggunakan tar.exe bawaan Windows
tar.exe -xf $zipAdb -C "C:\Android\android-sdk"
Remove-Item $zipAdb -Force

# 4. Tes verifikasi ADB
& "C:\Android\android-sdk\platform-tools\adb.exe" version
```

### 3.5. Pasang Android Command-Line Tools (cmdline-tools)
`cmdline-tools` menyediakan utilitas vital `sdkmanager` untuk mengunduh Android Build-Tools, Platforms, dan menyetujui lisensi SDK.

```powershell
$cmdDir = "C:\Android\android-sdk\cmdline-tools"
New-Item -ItemType Directory -Path $cmdDir -Force

# Unduh archive cmdline-tools
$zipCmd = "$env:TEMP\cmdline-tools.zip"
curl.exe -L -o $zipCmd "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"

# Ekstrak arsip
tar.exe -xf $zipCmd -C $cmdDir
Remove-Item $zipCmd -Force

# FIX STRUKTUR DIREKTORI (SYARAT MUTLAK sdkmanager):
# sdkmanager memerlukan letak folder: cmdline-tools\latest\bin
if (Test-Path "$cmdDir\cmdline-tools") {
    if (Test-Path "$cmdDir\latest") { Remove-Item "$cmdDir\latest" -Recurse -Force }
    Rename-Item -Path "$cmdDir\cmdline-tools" -NewName "latest"
}

# Verifikasi sdkmanager
& "$cmdDir\latest\bin\sdkmanager.bat" --version
```

### 3.6. Konfigurasi Environment Variables Permanen
Konfigurasikan variabel `ANDROID_HOME`, `JAVA_HOME`, serta gabungkan seluruh folder bin ke variabel `PATH`:

```powershell
# 1. Set ANDROID_HOME permanen
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Android\android-sdk", "User")

# 2. Set JAVA_HOME permanen jika belum ada
$JavaInstall = (Get-Item "C:\Program Files\Microsoft\jdk*").FullName | Select-Object -First 1
if ($JavaInstall) {
    [Environment]::SetEnvironmentVariable("JAVA_HOME", $JavaInstall, "User")
}

# 3. Masukkan path adb dan sdkmanager ke PATH permanen
$CurrentPath = [Environment]::GetEnvironmentVariable("Path", "User")
$AndroidPaths = "C:\Android\android-sdk\cmdline-tools\latest\bin;C:\Android\android-sdk\platform-tools"

if ($CurrentPath -notlike "*platform-tools*") {
    [Environment]::SetEnvironmentVariable("Path", "$CurrentPath;$AndroidPaths", "User")
}

Write-Host "[OK] Konfigurasi Environment Variables selesai!" -ForegroundColor Green
```

> **Refresh sesi terminal saat ini:**
> ```powershell
> $env:ANDROID_HOME = "C:\Android\android-sdk"
> $env:Path = "C:\src\flutter\bin;C:\Android\android-sdk\cmdline-tools\latest\bin;C:\Android\android-sdk\platform-tools;$env:Path"
> ```

### 3.7. Unduh Komponen Android API & Setujui Lisensi
Jalankan `sdkmanager` untuk memasang platform target (API 34 dan 36) beserta build-tools, lalu setujui seluruh perjanjian lisensi Google:

```powershell
# Pasang Platform SDK dan Build-Tools terbaru
sdkmanager "platforms;android-34" "platforms;android-36" "build-tools;34.0.0" "build-tools;36.0.0"

# Setujui semua lisensi Android SDK secara otomatis
echo y,y,y,y,y,y,y,y | sdkmanager --licenses
```

Hubungkan lokasi SDK tersebut ke konfigurasi internal Flutter:
```powershell
# Tautkan direktori SDK ke Flutter
flutter config --android-sdk "C:\Android\android-sdk"

# Terima lisensi pada sisi Flutter doctor
flutter doctor --android-licenses
```

## 4. Verifikasi Akhir: Diagnostik flutter doctor

Jalankan perintah diagnosa menyeluruh:
```powershell
flutter doctor -v
```

Hasil verifikasi yang tampil di terminal:
```text
[✓] Flutter (Channel stable, 3.47.5, on Microsoft Windows [Version 10.0.26200.8037], locale en-ID)
    • Flutter version 3.47.5 on channel stable at C:\src\flutter
    • Dart version 3.13.4, DevTools version 2.60.0

[✓] Windows Version (Windows 11 or higher, 25H2)

[✓] Android toolchain - develop for Android devices (Android SDK version 36.0.0)
    • Android SDK at C:\Android\android-sdk
    • Platform android-36, build-tools 36.0.0
    • ANDROID_HOME = C:\Android\android-sdk
    • Java binary at: C:\Program Files\Microsoft\jdk-25.0.4.101-hotspot\bin\java.exe
    • All Android licenses accepted.

[✓] Chrome - develop for the web
[✓] Connected device (3 available)
[✓] Network resources

• No issues found!
```

## 5. Ensiklopedia Lengkap Perintah Flutter CLI

Berikut daftar lengkap seluruh perintah Flutter CLI yang sering digunakan dalam pengembangan aplikasi, beserta fungsi, opsi (flags), dan contoh penggunaannya:

### 5.1. flutter create
Digunakan untuk menginisialisasi proyek Flutter baru dengan struktur kode standar.
```powershell
# Membuat proyek standar
flutter create my_app

# Menentukan organization domain (package name id) dan nama proyek
flutter create --org com.boash.praktikum --project-name inventory_app my_inventory

# Membuat proyek hanya untuk platform tertentu (menghemat ukuran folder)
flutter create --platforms=android,web my_web_mobile_app

# Membuat modul atau plugin package
flutter create --template=package my_custom_package
```

### 5.2. flutter doctor
Mendiagnosis kesiapan environment pengembang dan memverifikasi dependensi sistem.
```powershell
# Cek ringkas
flutter doctor

# Cek verbose dengan detail path file, binary compiler, dan JDK
flutter doctor -v

# Menyetujui lisensi Android
flutter doctor --android-licenses
```

### 5.3. flutter devices & flutter emulators
Mengecek perangkat fisik atau virtual yang tersambung ke komputer.
```powershell
# Menampilkan semua perangkat yang terdeteksi (ponsel fisik via ADB, browser Chrome/Edge, Desktop)
flutter devices

# Menampilkan daftar emulator Android virtual yang tersedia di sistem
flutter emulators

# Menjalankan emulator tertentu
flutter emulators --launch <emulator_id>
```

### 5.4. flutter run
Menjalankan aplikasi dalam siklus development dengan fitur Hot Reload interaktif.
```powershell
# Menjalankan pada perangkat default yang terdeteksi
flutter run

# Menjalankan pada perangkat spesifik (cek device id dari flutter devices)
flutter run -d chrome
flutter run -d <android_device_id>

# Mode eksekusi
flutter run --debug     # Mode standar dengan debug symbols & Hot Reload
flutter run --profile   # Mode benchmarking performa
flutter run --release   # Mode rilis penuh dengan kompilasi AOT teroptimasi
```

> **Tombol Pintas Selama flutter run Berjalan di Terminal:**
> * `r` : **Hot Reload** (memperbarui UI seketika tanpa me-reset state aplikasi).
> * `R` : **Hot Restart** (me-restart seluruh lifecycle state aplikasi dari awal).
> * `p` : Menampilkan panduan visual rendering (overlay garis panduan widget).
> * `c` : Membersihkan layar terminal konsol.
> * `v` : Membuka tautan debugger Flutter DevTools di browser.
> * `q` : Keluar dan menghentikan aplikasi.

### 5.5. flutter build
Mengompilasi source code Dart menjadi binary produksi akhir.
```powershell
# Mengompilasi APK Android (Universal APK)
flutter build apk --release

# Mengompilasi Split APK berdasarkan arsitektur CPU (arm64, armeabi-v7a, x86_64)
# Hasil ukuran file per APK jauh lebih kecil!
flutter build apk --split-per-abi

# Mengompilasi Android App Bundle (.aab) untuk publikasi di Google Play Store
flutter build appbundle --release

# Mengompilasi aplikasi Web (tersimpan di build/web/)
flutter build web --release

# Mengompilasi file biner dengan obfuscation kode (keamanan reverse-engineering)
flutter build apk --obfuscate --split-debug-info=/<symbols-path>
```

### 5.6. flutter pub
Manajer package & dependensi pustaka Dart (mirip `npm` pada Node.js atau `pip` pada Python).
```powershell
# Mengunduh seluruh pustaka yang terdaftar di pubspec.yaml
flutter pub get

# Menambahkan dependency baru langsung dari terminal (otomatis update pubspec.yaml)
flutter pub add http
flutter pub add provider
flutter pub add --dev flutter_lints

# Menghapus dependency
flutter pub remove http

# Menganalisis dependency yang versinya sudah tertinggal (outdated)
flutter pub outdated

# Memperbarui dependency ke versi semver terbaru
flutter pub upgrade

# Memperbaiki cache paket pub yang korup di komputer lokal
flutter pub cache repair
```

### 5.7. flutter clean
Menghapus seluruh folder `build/` dan file cache sementara. Sangat disarankan dijalankan ketika terjadi error kompilasi aneh atau setelah mengubah dependensi native Android/Gradle.
```powershell
flutter clean
flutter pub get
```

### 5.8. flutter analyze & flutter test
Menguji kualitas dan integritas kode program.
```powershell
# Static code analysis (mendeteksi linting issues, dead code, dan potensi bug)
flutter analyze

# Menjalankan automated unit test dan widget test
flutter test

# Menjalankan test pada file spesifik
flutter test test/widget_test.dart
```

### 5.9. flutter config
Mengatur konfigurasi global framework Flutter.
```powershell
# Menyetel direktori Android SDK secara manual
flutter config --android-sdk "C:\Android\android-sdk"

# Menyetel direktori Java Development Kit (JDK)
flutter config --jdk-dir "C:\Program Files\Microsoft\jdk-17"

# Menonaktifkan kompilasi Windows Desktop (menghilangkan warning Visual Studio jika hanya fokus ke Android/Web)
flutter config --no-enable-windows-desktop

# Mengaktifkan atau menonaktifkan fitur preview
flutter config --enable-web
```

### 5.10. flutter channel & flutter upgrade
Mengatur rilis framework Flutter.
```powershell
# Melihat channel rilis aktif (stable, beta, master)
flutter channel

# Berpindah ke channel stable
flutter channel stable

# Memperbarui Flutter framework dan Dart SDK ke versi rilis terbaru
flutter upgrade
```

### 5.11. flutter attach & flutter logs
Membantu debugging pada aplikasi yang sudah terpasang.
```powershell
# Menampilkan log stream real-time dari perangkat yang sedang menjalankan aplikasi
flutter logs

# Menghubungkan terminal debugger ke aplikasi Flutter yang sudah running di ponsel
flutter attach
```

## 6. Troubleshooting: Solusi Lengkap Semua Masalah & Bug flutter doctor

### Masalah 1: cmdline-tools component is missing pada flutter doctor
* **Gejala:** 
  ```text
  [!] Android toolchain
      ✗ cmdline-tools component is missing
      Run `path/to/sdkmanager --install "cmdline-tools;latest"`
  ```
* **Penyebab:** Folder commandlinetools hasil ekstraksi tidak berada pada subfolder bernama `latest`.
* **Solusi:** 
  Pastikan struktur direktori di `C:\Android\android-sdk` berbentuk:
  `C:\Android\android-sdk\cmdline-tools\latest\bin\sdkmanager.bat`
  Jika masih berada di `cmdline-tools\cmdline-tools\bin`, ganti nama folder dalamnya menjadi `latest`:
  ```powershell
  Rename-Item -Path "C:\Android\android-sdk\cmdline-tools\cmdline-tools" -NewName "latest"
  ```

### Masalah 2: Error Could not determine SDK root saat mengeksekusi sdkmanager
* **Gejala:** Saat menjalankan `sdkmanager --version`, muncul pesan error:
  `Error: Could not determine SDK root.`
* **Penyebab:** Google mewajibkan `sdkmanager` diletakkan di dalam path bertingkat `<ANDROID_HOME>/cmdline-tools/<version>/bin`. Jika dijalankan langsung dari `cmdline-tools/bin`, ia tidak mengenali lokasi root SDK.
* **Solusi:** Pindahkan ke struktur `cmdline-tools/latest/bin` dan pastikan environment variable `ANDROID_HOME` telah diset ke `C:\Android\android-sdk`.

### Masalah 3: Android license status unknown atau Some Android licenses not accepted
* **Gejala:**
  ```text
  [!] Android toolchain
      ! Some Android licenses not accepted. To resolve this, run: flutter doctor --android-licenses
  ```
* **Penyebab:** Belum ada tanda persetujuan digital pada direktori `C:\Android\android-sdk\licenses`.
* **Solusi:**
  Jalankan perintah berikut di PowerShell untuk menyetujui seluruh lisensi secara instan:
  ```powershell
  echo y,y,y,y,y,y,y,y | & "C:\Android\android-sdk\cmdline-tools\latest\bin\sdkmanager.bat" --licenses
  flutter doctor --android-licenses
  ```

### Masalah 4: No valid Android SDK platforms found in platforms. Directory was empty
* **Gejala:** Flutter mengenali folder Android SDK, namun folder `platforms` masih kosong.
* **Penyebab:** Belum pernah mengunduh package Android Platform API via `sdkmanager`.
* **Solusi:**
  Pasang platform SDK yang diminta (biasanya API 34 atau API 36):
  ```powershell
  sdkmanager "platforms;android-34" "platforms;android-36"
  ```

### Masalah 5: Flutter requires Android SDK 36 and the Android BuildTools 28.0.3
* **Gejala:** Flutter meminta versi Android API yang lebih tinggi dari yang telah terpasang.
* **Penyebab:** Flutter versi 3.47+ mensyaratkan target compile minimum Android 14/15/16 (API 34-36).
* **Solusi:**
  Pasang build-tools dan platforms versi yang diminta:
  ```powershell
  sdkmanager "platforms;android-36" "build-tools;36.0.0"
  ```

### Masalah 6: Tanda silang merah pada Visual Studio - develop Windows apps
* **Gejala:**
  ```text
  [✗] Visual Studio - develop Windows apps
      ✗ Visual Studio not installed; this is necessary to develop Windows apps.
  ```
* **Penyebab:** Flutter secara bawaan mendukung pembuatan software Windows Desktop (`.exe`), yang memerlukan Visual Studio C++ Compiler.
* **Solusi:**
  * Jika target praktikum Anda adalah **Aplikasi Mobile (Android) & Web**, Anda **TIDAK PERLU** menginstal Visual Studio yang berukuran belasan gigabyte ini.
  * Cukup nonaktifkan target Windows Desktop agar `flutter doctor` bersih 100%:
    ```powershell
    flutter config --no-enable-windows-desktop
    ```
  * Jika di kemudian hari Anda memang ingin membuat aplikasi desktop Windows, pasang workload "Desktop development with C++" dari Visual Studio Community installer.

### Masalah 7: JAVA_HOME is not set atau JDK Versi Konflik
* **Gejala:** Gradle atau Flutter mengeluh tidak menemukan compiler Java.
* **Penyebab:** Variabel `JAVA_HOME` belum diset atau salah mengarah ke versi Java lama (misalnya Java 8).
* **Solusi:**
  Tentukan path Java ke direktori root JDK 17 atau JDK terbaru:
  ```powershell
  [Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Microsoft\jdk-17", "User")
  flutter config --jdk-dir "C:\Program Files\Microsoft\jdk-17"
  ```

### Masalah 8: Error PowerShell ExecutionPolicy (File cannot be loaded because running scripts is disabled)
* **Gejala:** Script `.ps1` atau utilitas CLI gagal dieksekusi di terminal PowerShell.
* **Penyebab:** Kebijakan keamanan default Windows membatasi script eksternal.
* **Solusi:**
  Buka PowerShell dan izinkan script yang ditandatangani lokal:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
  ```

### Masalah 9: adb : The term ''adb'' is not recognized
* **Penyebab:** Folder `C:\Android\android-sdk\platform-tools` belum terdaftar di environment variable `PATH`.
* **Solusi:**
  Jalankan perintah penambahan PATH:
  ```powershell
  $current = [Environment]::GetEnvironmentVariable("Path", "User")
  [Environment]::SetEnvironmentVariable("Path", "$current;C:\Android\android-sdk\platform-tools", "User")
  ```
  Tutup dan buka kembali jendela terminal PowerShell.

### Masalah 10: Git Long Path Issue pada Windows (Filename too long)
* **Gejala:** Saat checkout repository Flutter atau paket pub yang dalam, muncul error:
  `error: unable to create file ...: Filename too long`
* **Penyebab:** Batasan historis MAX_PATH (260 karakter) pada Windows.
* **Solusi:**
  Aktifkan dukungan Long Path pada Git secara global:
  ```powershell
  git config --system core.longpaths true
  ```

## 7. Referensi & Bacaan Lanjutan
Untuk memperdalam pemahaman dan memantau rilis pembaruan komponen, silakan merujuk pada dokumentasi resmi berikut:
1. **Flutter Official Windows Installation Guide:**  
   [https://docs.flutter.dev/get-started/install/windows](https://docs.flutter.dev/get-started/install/windows)
2. **Android Command-Line Tools & sdkmanager Documentation:**  
   [https://developer.android.com/tools/sdkmanager](https://developer.android.com/tools/sdkmanager)
3. **Android Debug Bridge (adb) Official Manual:**  
   [https://developer.android.com/tools/adb](https://developer.android.com/tools/adb)
4. **Microsoft Windows Package Manager (Winget) Docs:**  
   [https://learn.microsoft.com/windows/package-manager/winget/](https://learn.microsoft.com/windows/package-manager/winget/)
5. **Microsoft Build of OpenJDK Documentation & Downloads:**  
   [https://learn.microsoft.com/java/openjdk/download](https://learn.microsoft.com/java/openjdk/download)
6. **Dart Tools & Pub CLI Reference:**  
   [https://dart.dev/tools/pub/cmd](https://dart.dev/tools/pub/cmd)
',
  'Mu''adz Hudzaifah',
  '24903460014',
  'Web & Tooling',
  '["flutter","dart","android","sdk","adb","windows","terminal","cli"]',
  1,
  'FLUT',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-24 10:00:00',
  '2026-09-24 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'setup-wsl2-ubuntu-webdev',
  'Setup Lengkap WSL2 Ubuntu 24.04 untuk Web Development',
  'Panduan instalasi dan konfigurasi native Linux kernel di Windows menggunakan WSL2 untuk kebutuhan praktikum web, lengkap dengan NVM, PHP, dan VS Code integration.',
  '---
id: setup-wsl2-ubuntu-webdev
title: Setup Lengkap WSL2 Ubuntu 24.04 untuk Web Development
category: Web & Tooling
author: Mu''adz Hudzaifah
date: 2026-09-21

initials: WSL
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
php -r "copy(''https://getcomposer.org/installer'', ''composer-setup.php'');"
php composer-setup.php --install-dir=/usr/local/bin --filename=composer
php -r "unlink(''composer-setup.php'');"
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
',
  'Mu''adz Hudzaifah',
  '24903460014',
  'Web & Tooling',
  '["linux","wsl2","ubuntu","webdev","nodejs","php"]',
  1,
  'WSL',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-21 10:00:00',
  '2026-09-21 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'format-margin-laporan-4433',
  'Standar Baku Format Margin Laporan Praktikum & TA (4-4-3-3)',
  'Panduan tata letak layout dokumen akademik Universitas Boash. Aturan margin 4-4-3-3, pemisahan nomor romawi dengan angka arab via section break, dan struktur baku bab.',
  '---
id: format-margin-laporan-4433
title: Standar Baku Format Margin Laporan Praktikum & TA (4-4-3-3)
category: Akademik & Laporan
author: Tim KataKating
date: 2026-09-21

initials: 4433
tags: ["akademik", "laporan", "word", "margin", "skripsi", "boash"]
summary: Panduan tata letak layout dokumen akademik Universitas Boash. Aturan margin 4-4-3-3, pemisahan nomor romawi dengan angka arab via section break, dan struktur baku bab.
---

## 1. Landasan Aturan
Berdasarkan Pedoman Penulisan Karya Tulis Ilmiah & Laporan Praktikum Universitas Boash, setiap laporan resmi wajib mematuhi ketentuan tata letak kertas A4 untuk menjamin kerapihan saat proses penjilidan hard-cover maupun soft-cover.

## 2. Spesifikasi Halaman & Margin
Ukuran kertas baku adalah **A4 (210 x 297 mm)** dengan rincian batas margin:

* **Batas Kiri (Left)**: `4 cm` (Dilebihkan 1 cm untuk jilid / binding).
* **Batas Atas (Top)**: `4 cm`.
* **Batas Kanan (Right)**: `3 cm`.
* **Batas Bawah (Bottom)**: `3 cm`.
* **Jenis & Ukuran Font**: Times New Roman, 12 pt.
* **Spasi Paragraf**: 1.5 Lines (Before: 0pt, After: 0pt).

## 3. Langkah Konfigurasi di Microsoft Word

### 3.1. Setting Margin
1. Masuk ke tab **Layout** > klik **Margins** > pilih **Custom Margins**.
2. Masukkan nilai:
   * Top: `4 cm`
   * Left: `4 cm`
   * Bottom: `3 cm`
   * Right: `3 cm`
3. Pastikan **Apply to** diatur ke **Whole document**, lalu klik OK.

### 3.2. Penomoran Halaman Berbeda (Romawi vs Angka Arab)
Seringkali laporan dicoret karena nomor halaman cover muncul angka ''1'' atau nomor kata pengantar bersambung dengan bab isi. Solusinya adalah **Section Break**:

1. Letakkan kursor di baris paling akhir lembar Kata Pengantar / Daftar Isi.
2. Masuk ke tab **Layout** > **Breaks** > pilih **Next Page**.
3. Klik ganda pada area Footer di halaman Bab 1.
4. Pada tab Header & Footer, **nonaktifkan opsi "Link to Previous"**.
5. Klik **Page Number** > **Format Page Numbers**:
   * Halaman awal (Romawi): pilih format `i, ii, iii...` > Start at `i`.
   * Halaman Bab 1 (Arab): pilih format `1, 2, 3...` > Start at `1`.

## 4. Struktur Baku Bab Laporan Praktikum
```text
COVER / JUDUL LAPORAN
LEMBAR PENGESAHAN (Jika TA / PKL)
KATA PENGANTAR (Halaman: i)
DAFTAR ISI (Halaman: ii)
DAFTAR GAMBAR & TABEL (Halaman: iii)
BAB I   : PENDAHULUAN (Tujuan, Manfaat, Batasan) (Halaman: 1)
BAB II  : LANDASAN TEORI
BAB III : LANGKAH KERJA / METODOLOGI
BAB IV  : ANALISIS & HASIL PENGUJIAN
BAB V   : KESIMPULAN & SARAN
DAFTAR PUSTAKA
LAMPIRAN
```

## 5. Tips Pemeriksaan Sebelum Cetak
* **Cek Konsistensi Heading**: Gunakan panel navigasi (`Ctrl + F` > Headings) untuk memastikan seluruh Bab dan Sub-bab terdeteksi secara hierarkis.
* **Hindari Orphan Line**: Jangan biarkan 1 baris kalimat terakhir menggantung sendirian di halaman berikutnya.
* **Format Gambar & Tabel**: Nomor tabel diletakkan di **atas tabel**, sedangkan nomor gambar diletakkan di **bawah gambar**.

## 6. Referensi
* Buku Pedoman Penulisan Tugas Akhir & Skripsi Universitas Boash (Edisi 2024).
* Standar Publikasi Ilmiah IEEE / APA Style edisi ke-7.
',
  'Tim KataKating',
  '24903460014',
  'Akademik & Laporan',
  '["akademik","laporan","word","margin","skripsi","boash"]',
  1,
  '4433',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-21 10:00:00',
  '2026-09-21 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'jaringan-routing-vlan-cisco',
  'Konfigurasi Inter-VLAN Routing & Trunking pada Cisco Packet Tracer',
  'Tutorial konfigurasi jaringan switch layer-2 dan router on-a-stick untuk memisahkan segmentasi traffic mahasiswa dan dosen di lab praktikum.',
  '---
id: jaringan-routing-vlan-cisco
title: Konfigurasi Inter-VLAN Routing & Trunking pada Cisco Packet Tracer
category: Jaringan Komputer
author: Mu''adz Hudzaifah
date: 2026-09-21

initials: VLAN
tags: ["jaringan", "cisco", "vlan", "routing", "packet-tracer", "networking"]
summary: Tutorial konfigurasi jaringan switch layer-2 dan router on-a-stick untuk memisahkan segmentasi traffic mahasiswa dan dosen di lab praktikum.
---

## 1. Tujuan Praktikum
Memahami konsep segmentasi Local Area Network menggunakan Virtual LAN (VLAN) dan mengonfigurasi Router-on-a-Stick (802.1Q Encapsulation) pada Cisco IOS agar host yang berada pada subnet VLAN berbeda dapat saling berkomunikasi secara terkontrol.

## 2. Topologi & Alokasi Subnet
* **Switch**: Cisco Catalyst 2960
* **Router**: Cisco 2911
* **VLAN 10 (Mahasiswa)**:
  * Network: `192.168.10.0/24`
  * Gateway: `192.168.10.1`
* **VLAN 20 (Dosen)**:
  * Network: `192.168.20.0/24`
  * Gateway: `192.168.20.1`

## 3. Langkah Konfigurasi

### 3.1. Konfigurasi VLAN pada Switch
Buka CLI Switch 2960 dan daftarkan database VLAN:

```cisco
Switch> enable
Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name VLAN_MAHASISWA
Switch(config-vlan)# exit

Switch(config)# vlan 20
Switch(config-vlan)# name VLAN_DOSEN
Switch(config-vlan)# exit
```

### 3.2. Penentuan Access Port ke PC Client
Arahkan port FastEthernet 0/1 ke VLAN 10 dan FastEthernet 0/2 ke VLAN 20:

```cisco
# Port untuk PC Mahasiswa
Switch(config)# interface FastEthernet 0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
Switch(config-if)# exit

# Port untuk PC Dosen
Switch(config)# interface FastEthernet 0/2
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 20
Switch(config-if)# exit
```

### 3.3. Konfigurasi Trunking Port ke Router
Port uplink yang mengarah ke router (misal GigabitEthernet 0/1) wajib diatur ke mode Trunk agar membawa paket dari banyak VLAN:

```cisco
Switch(config)# interface GigabitEthernet 0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# exit
```

### 3.4. Konfigurasi Sub-Interface (Router-on-a-Stick)
Pada Router 2911, aktifkan interface fisik dan buat sub-interface virtual untuk tiap ID VLAN:

```cisco
Router> enable
Router# configure terminal
Router(config)# interface GigabitEthernet 0/0
Router(config-if)# no shutdown
Router(config-if)# exit

# Sub-interface VLAN 10
Router(config)# interface GigabitEthernet 0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config-subif)# exit

# Sub-interface VLAN 20
Router(config)# interface GigabitEthernet 0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
Router(config-subif)# exit
```

## 4. Pengujian & Verifikasi
1. Atur IP Address di PC Mahasiswa: `192.168.10.10`, Subnet: `255.255.255.0`, Gateway: `192.168.10.1`.
2. Atur IP Address di PC Dosen: `192.168.20.10`, Subnet: `255.255.255.0`, Gateway: `192.168.20.1`.
3. Buka Command Prompt pada PC Mahasiswa, jalankan ping lintas VLAN:
```bash
ping 192.168.20.10
```
Jika konfigurasi benar, ping pertama mungkin RTO (karena ARP discovery), lalu paket berikutnya akan menghasilkan status **Reply from 192.168.20.10: bytes=32 time=1ms TTL=127**.

## 5. Referensi
* Cisco Networking Academy: *CCNA Routing and Switching - Introduction to Networks*.
* Tanenbaum, A. S., & Wetherall, D. J. (2011). *Computer Networks (5th Edition)*.
',
  'Mu''adz Hudzaifah',
  '24903460014',
  'Jaringan Komputer',
  '["jaringan","cisco","vlan","routing","packet-tracer","networking"]',
  1,
  'VLAN',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-21 10:00:00',
  '2026-09-21 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'basis-data-relasional-normalisasi',
  'Panduan Praktis Normalisasi Basis Data (1NF, 2NF, 3NF)',
  'Memahami teknik dekomposisi tabel anomali menjadi bentuk normal 1NF, 2NF, dan 3NF pada studi kasus sistem akademik kampus.',
  '---
id: basis-data-relasional-normalisasi
title: Panduan Praktis Normalisasi Basis Data (1NF, 2NF, 3NF)
category: Basis Data
author: Tim KataKating
date: 2026-09-21

initials: SQL
tags: ["database", "sql", "normalisasi", "mysql", "basis-data"]
summary: Memahami teknik dekomposisi tabel anomali menjadi bentuk normal 1NF, 2NF, dan 3NF pada studi kasus sistem akademik kampus.
---

## 1. Tujuan Praktikum
Menghilangkan redundansi data, anomali penyisipan (insert anomaly), anomali penghapusan (delete anomaly), dan anomali pembaruan (update anomaly) pada perancangan database relasional sistem informasi akademik.

## 2. Studi Kasus: Tabel Unnormalized (UNF)
Bayangkan sebuah tabel laporan nilai mahasiswa yang belum dinormalisasi:

| NIM | Nama | Kode_MK | Nama_MK | SKS | Dosen | Ruang | Nilai |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 230101 | Budi | MK01, MK02 | Web, IoT | 3, 3 | Pak Adi, Bu Siti | R1, R2 | A, B+ |

Masalah: Terdapat multi-valued attribute (satu kolom berisi banyak nilai sekaligus).

## 3. Tahapan Normalisasi

### 3.1. Bentuk Normal Pertama (1NF)
**Syarat 1NF**: Setiap sel atribut hanya boleh bernilai tunggal (atomic value) dan tidak ada repeating group.

*Solusi*: Pecah baris yang memiliki multi-value menjadi baris tersendiri:

```sql
-- Struktur tabel Mahasiswa_Nilai_1NF
-- Primary Key gabungan: (NIM, Kode_MK)
CREATE TABLE nilai_1nf (
  nim VARCHAR(10),
  nama_mhs VARCHAR(100),
  kode_mk VARCHAR(10),
  nama_mk VARCHAR(100),
  sks INT,
  dosen_pengampu VARCHAR(100),
  nilai VARCHAR(2),
  PRIMARY KEY (nim, kode_mk)
);
```

### 3.2. Bentuk Normal Kedua (2NF)
**Syarat 2NF**: Sudah memenuhi 1NF, dan **tidak boleh ada partial dependency** (ketergantungan parsial), di mana atribut non-key hanya bergantung pada sebagian Primary Key.

*Analisis*:
* `nama_mhs` hanya bergantung pada `nim` (bukan pada `kode_mk`).
* `nama_mk` dan `sks` hanya bergantung pada `kode_mk` (bukan pada `nim`).

*Solusi*: Pecah menjadi 3 entitas terpisah:
1. `Mahasiswa (NIM, Nama)`
2. `Mata_Kuliah (Kode_MK, Nama_MK, SKS, Dosen)`
3. `KRS_Nilai (NIM, Kode_MK, Nilai)`

### 3.3. Bentuk Normal Ketiga (3NF)
**Syarat 3NF**: Sudah memenuhi 2NF, dan **tidak boleh ada transitive dependency** (ketergantungan transitif), di mana atribut non-key bergantung pada atribut non-key lainnya.

*Analisis pada tabel Mata_Kuliah*:
Jika satu dosen memiliki NIP dan No_Telp di tabel Mata Kuliah, maka `No_Telp` bergantung pada `NIP`, padahal `NIP` bukan primary key tabel Mata Kuliah.

*Solusi 3NF*: Buat tabel Dosen tersendiri:
1. `mahasiswa (nim [PK], nama)`
2. `dosen (nip [PK], nama_dosen, email)`
3. `mata_kuliah (kode_mk [PK], nama_mk, sks, nip_dosen [FK])`
4. `krs_nilai (id_krs [PK], nim [FK], kode_mk [FK], nilai)`

## 4. DDL Skrip SQL Standar 3NF
```sql
CREATE TABLE dosen (
  nip VARCHAR(20) PRIMARY KEY,
  nama_dosen VARCHAR(100) NOT NULL
);

CREATE TABLE mata_kuliah (
  kode_mk VARCHAR(10) PRIMARY KEY,
  nama_mk VARCHAR(100) NOT NULL,
  sks TINYINT NOT NULL,
  nip_dosen VARCHAR(20),
  FOREIGN KEY (nip_dosen) REFERENCES dosen(nip)
);

CREATE TABLE mahasiswa (
  nim VARCHAR(10) PRIMARY KEY,
  nama_mhs VARCHAR(100) NOT NULL
);

CREATE TABLE krs_nilai (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nim VARCHAR(10) NOT NULL,
  kode_mk VARCHAR(10) NOT NULL,
  nilai CHAR(2),
  FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
  FOREIGN KEY (kode_mk) REFERENCES mata_kuliah(kode_mk)
);
```

## 5. Referensi
* Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database System Concepts (7th Edition)*.
* Elmasri, R., & Navathe, S. B. (2015). *Fundamentals of Database Systems*.
',
  'Tim KataKating',
  '24903460014',
  'Basis Data',
  '["database","sql","normalisasi","mysql","basis-data"]',
  1,
  'SQL',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-21 10:00:00',
  '2026-09-21 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'algoritma-struktur-data-dasar',
  'Implementasi Struktur Data Stack & Queue pada Praktikum Pemrograman',
  'Memahami logika LIFO (Last In First Out) dan FIFO (First In First Out) dengan implementasi Python murni serta analisis kompleksitas waktu O(1).',
  '---
id: algoritma-struktur-data-dasar
title: Implementasi Struktur Data Stack & Queue pada Praktikum Pemrograman
category: Algoritma & Struktur Data
author: Mu''adz Hudzaifah
date: 2026-09-21

initials: ALGO
tags: ["algoritma", "struktur-data", "python", "stack", "queue"]
summary: Memahami logika LIFO (Last In First Out) dan FIFO (First In First Out) dengan implementasi Python murni serta analisis kompleksitas waktu O(1).
---

## 1. Tujuan Praktikum
Memahami cara kerja mekanisme penyimpanan data linier dinamis dan mengimplementasikan struktur data Stack dan Queue dari nol tanpa menggunakan library bawaan instan.

## 2. Konsep Stack (LIFO: Last In, First Out)
Elemen yang terakhir dimasukkan adalah elemen yang pertama kali dikeluarkan. Contoh di dunia nyata: tumpukan piring atau tombol *Undo* pada text editor.

### Operasi Utama Stack:
* `push(item)`: Menambah elemen ke puncak stack (O(1)).
* `pop()`: Mengambil & menghapus elemen teratas (O(1)).
* `peek()`: Melihat elemen teratas tanpa menghapusnya (O(1)).

### Implementasi Stack di Python:
```python
class Stack:
    def __init__(self):
        self._items = []

    def is_empty(self):
        return len(self._items) == 0

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack underflow: stack kosong!")
        return self._items.pop()

    def peek(self):
        if self.is_empty():
            return None
        return self._items[-1]

    def size(self):
        return len(self._items)

# Pengujian:
s = Stack()
s.push("BAB 1")
s.push("BAB 2")
print("Top:", s.peek())  # Output: BAB 2
print("Pop:", s.pop())    # Output: BAB 2
print("Now Top:", s.peek()) # Output: BAB 1
```

## 3. Konsep Queue (FIFO: First In, First Out)
Elemen yang pertama kali masuk adalah yang pertama kali dilayani. Contoh: antrian tiket bioskop atau antrian cetak print spooler.

### Implementasi Queue Efisien dengan `collections.deque`:
Jika menggunakan list biasa di Python, operasi `pop(0)` memiliki kompleksitas $O(n)$ karena seluruh elemen harus digeser. Menggunakan `collections.deque` menjamin $O(1)$ untuk kedua ujung antrian:

```python
from collections import deque

class Queue:
    def __init__(self):
        self._items = deque()

    def is_empty(self):
        return len(self._items) == 0

    def enqueue(self, item):
        self._items.append(item)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue underflow: antrian kosong!")
        return self._items.popleft()

    def size(self):
        return len(self._items)

# Pengujian Antrian:
q = Queue()
q.enqueue("Mahasiswa A")
q.enqueue("Mahasiswa B")
print("Dilayani:", q.dequeue()) # Output: Mahasiswa A
print("Antrian sisa:", q.size()) # Output: 1
```

## 4. Referensi
* Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2009). *Introduction to Algorithms (3rd Edition)*. MIT Press.
* Modul Praktikum Struktur Data & Algoritma TRM Boash.
',
  'Mu''adz Hudzaifah',
  '24903460014',
  'Algoritma & Pemrograman',
  '["algoritma","struktur-data","python","stack","queue"]',
  1,
  'ALGO',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-21 10:00:00',
  '2026-09-21 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'wokwi-esp32-mqtt-hivemq',
  'Simulasi Telemetri ESP32 & MQTT HiveMQ di Browser (Tanpa Alat Fisik)',
  'Tutorial membuat simulasi monitoring sensor suhu virtual di Wokwi dan mempublikasikan data telemetry real-time ke broker publik MQTT tanpa membeli modul hardware.',
  '---
id: wokwi-esp32-mqtt-hivemq
title: Simulasi Telemetri ESP32 & MQTT HiveMQ di Browser (Tanpa Alat Fisik)
category: IoT & Embedded
author: Mu''adz Hudzaifah
date: 2026-09-21

initials: MQTT
tags: ["iot", "esp32", "mqtt", "wokwi", "hivemq", "arduino"]
summary: Tutorial membuat simulasi monitoring sensor suhu virtual di Wokwi dan mempublikasikan data telemetry real-time ke broker publik MQTT tanpa membeli modul hardware.
---

## 1. Tujuan Praktikum
Menyelesaikan praktikum Internet of Things (IoT) protokol Machine-to-Machine (M2M) menggunakan MQTT (Message Queuing Telemetry Transport) tanpa kendala hardware rusak, kekurangan kabel jumper, atau ketiadaan router WiFi fisik.

## 2. Prasyarat & Lingkungan
* Akses browser ke simulator online gratis: [Wokwi.com](https://wokwi.com).
* Broker MQTT Publik: `broker.hivemq.com` (Port TCP: 1883).
* MQTT Client Dashboard: MQTTX Desktop Client atau web client di `http://www.hivemq.com/demos/websocket-client/`.

## 3. Rangkaian Virtual di Wokwi
1. Buka Wokwi, buat proyek baru: **ESP32 Arduino**.
2. Tambahkan komponen sensor suhu dan kelembaban **DHT22**.
3. Hubungkan pin:
   * `VCC DHT22` -> `3V3 ESP32`
   * `GND DHT22` -> `GND ESP32`
   * `SDA DHT22` -> `GPIO 15 ESP32`

## 4. Kode Lengkap Arduino / C++

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHTesp.h>

const int DHT_PIN = 15;
DHTesp dhtSensor;

// Konfigurasi WiFi Wokwi Virtual
const char* ssid = "Wokwi-GUEST";
const char* password = "";

// Konfigurasi MQTT Broker Publik
const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;
const char* mqtt_topic = "boash/trm/telemetry/suhu";

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.println("Menghubungkan ke Virtual WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Terkoneksi!");
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Mencoba koneksi MQTT...");
    String clientId = "ESP32Boash-" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("Terhubung ke HiveMQ Broker!");
    } else {
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  dhtSensor.setup(DHT_PIN, DHTesp::DHT22);
  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  TempAndHumidity data = dhtSensor.getTempAndHumidity();
  String payload = "{\"suhu\":" + String(data.temperature, 2) + 
                   ",\"lembab\":" + String(data.humidity, 1) + "}";
                   
  client.publish(mqtt_topic, payload.c_str());
  Serial.println("Publikasi data: " + payload);
  delay(3000);
}
```

## 5. Pengujian & Monitoring
1. Klik tombol **Play (Simulate)** di Wokwi.
2. Buka web dashboard HiveMQ WebSocket Client di tab browser baru.
3. Hubungkan ke `broker.hivemq.com` port `8000` (atau 8884 SSL).
4. Klik **Subscribe to topic**, masukkan topik: `boash/trm/telemetry/suhu`.
5. Klik sensor DHT22 di simulator Wokwi untuk mengubah suhu. Anda akan melihat payload JSON diterima secara instan tanpa jeda!

## 6. Referensi
* Oasis Standard: *MQTT Version 5.0 Specification*.
* Wokwi Documentation: *ESP32 WiFi Simulation*.
',
  'Mu''adz Hudzaifah',
  '24903460014',
  'IoT & Embedded',
  '["iot","esp32","mqtt","wokwi","hivemq","arduino"]',
  1,
  'MQTT',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-21 10:00:00',
  '2026-09-21 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'git-workflow-conflict-detached-head',
  'Mengatasi Detached HEAD & Merge Conflict pada Git Kolaboratif',
  'Panduan pemecahan masalah (troubleshooting) ketika commit tersangkut di detached HEAD atau branch lokal bentrok dengan commit rekan kelompok di repository GitHub.',
  '---
id: git-workflow-conflict-detached-head
title: Mengatasi Detached HEAD & Merge Conflict pada Git Kolaboratif
category: Git & Version Control
author: Mu''adz Hudzaifah
date: 2026-09-21

initials: GIT
tags: ["git", "github", "detached-head", "conflict", "devops"]
summary: Panduan pemecahan masalah (troubleshooting) ketika commit tersangkut di detached HEAD atau branch lokal bentrok dengan commit rekan kelompok di repository GitHub.
---

## 1. Masalah 1: "You are in ''detached HEAD'' state"

### Apa Penyebabnya?
Detached HEAD terjadi ketika Anda melakukan `git checkout <commit-hash>` ke commit tertentu di masa lalu, alih-alih checkout ke sebuah nama branch (seperti `main`). Jika Anda melakukan commit dalam kondisi ini, commit tersebut tidak terikat pada branch mana pun dan bisa terhapus oleh proses *garbage collector* (`git gc`).

### Solusi Pemulihan (Recovery):
Jangan panik! Selama Anda belum menutup terminal atau menjalankan command berbahaya, seluruh commit masih ada. Amankan dengan cara membuat branch baru di posisi commit saat ini:

```bash
# 1. Simpan commit melayang ke branch baru bernama ''recovery-work''
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
# Pilih: ''Accept Current Change'', ''Accept Incoming Change'', atau ''Accept Both''

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
',
  'Mu''adz Hudzaifah',
  '24903460014',
  'Git & DevOps',
  '["git","github","detached-head","conflict","devops"]',
  1,
  'GIT',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-21 10:00:00',
  '2026-09-21 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'blender-to-unity-pipeline',
  'Pipeline Export Aset 3D Blender ke Unity 2022 LTS (Fix Skala & Rotasi)',
  'Panduan export FBX dari Blender 4.x ke engine Unity agar model tidak miring rotasi -90 derajat pada sumbu X dan skala objek proporsional 1:1.',
  '---
id: blender-to-unity-pipeline
title: Pipeline Export Aset 3D Blender ke Unity 2022 LTS (Fix Skala & Rotasi)
category: Game & Multimedia
author: Tim KataKating
date: 2026-09-21

initials: BLND
tags: ["blender", "unity", "3d", "gamedev", "fbx", "multimedia"]
summary: Panduan export FBX dari Blender 4.x ke engine Unity agar model tidak miring rotasi -90 derajat pada sumbu X dan skala objek proporsional 1:1.
---

## 1. Latar Belakang Masalah
Blender menggunakan sistem koordinat **Right-Handed Z-Up**, sedangkan Unity menggunakan sistem koordinat **Left-Handed Y-Up**. Akibatnya, jika model 3D diekspor secara default tanpa penyesuaian:
1. Model di Unity Inspector akan memiliki rotasi `X: -90°`.
2. Skala model sering berubah menjadi raksasa `Scale: 100` atau mikro `Scale: 0.01`.
3. Rigging / Armature karakter bisa patah atau terbalik arah.

## 2. Langkah di Blender Sebelum Export

### 2.1. Terapkan Seluruh Transformasi
1. Di Object Mode, pilih model dan armature yang ingin diekspor.
2. Tekan shortcut:
```text
Ctrl + A  >  Apply All Transforms
```
Langkah ini mereset Location menjadi (0,0,0), Rotation menjadi (0,0,0), dan Scale menjadi (1,1,1).

### 2.2. Setting Origin Point
Pastikan titik pivot (Origin Point) berada di dasar bawah model (tempat kaki menyentuh tanah) agar snapping objek ke ground/terrain di Unity tepat:
* Masuk ke menu **Object** > **Set Origin** > **Origin to 3D Cursor** (setelah cursor diposisikan di titik terbawah).

## 3. Konfigurasi Export FBX
Masuk ke menu **File** > **Export** > **FBX (.fbx)**, lalu sesuaikan parameter panel kanan:

1. **Include**:
   * Centang: `[x] Selected Objects`
   * Object Types: Pilih `Mesh` dan `Armature` (tahan tombol Shift).
2. **Transform**:
   * Scale: `1.00`
   * Apply Scalings: Pilih **FBX Units Scale**
   * Forward: `-Z Forward`
   * Up: `Y Up`
   * Centang: `[x] Apply Transform` *(Fitur kunci untuk mencegah rotasi -90° di Unity!)*
3. **Armature** (Jika model memiliki tulang):
   * Hilangkan centang: `[ ] Add Leaf Bones` (mencegah penambahan bone ekstra di ujung hierarki).

## 4. Konfigurasi Import di Unity 2022 LTS
1. Drag file `.fbx` ke panel Project di folder `Assets/Models/`.
2. Klik aset model tersebut, pada panel **Inspector**:
   * Masuk ke tab **Model**: Pastikan *Convert Units* dicentang.
   * Masuk ke tab **Rig**: Jika karakter humanoid, ubah Animation Type menjadi **Humanoid**, klik *Apply*, lalu cek konfigurasi di tombol *Configure*.
   * Masuk ke tab **Materials**: Ubah Location menjadi *Use External Materials (Legacy)* jika ingin mengekstrak tekstur dan material.

## 5. Referensi
* Unity Manual: *Importing Objects From Blender (2022.3 LTS)*.
* Blender 4.x Manual: *FBX Format Exporter Options*.
',
  'Tim KataKating',
  '24903460014',
  'Game & Multimedia',
  '["blender","unity","3d","gamedev","fbx","multimedia"]',
  1,
  'BLND',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-21 10:00:00',
  '2026-09-21 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'metodologi-mdlc-multimedia',
  'Penerapan Metodologi MDLC (Luther-Sutopo) pada Skripsi Multimedia',
  'Penjelasan komprehensif 6 tahapan siklus Multimedia Development Life Cycle (Concept, Design, Material, Assembly, Testing, Distribution) yang diakui penguji sidang.',
  '---
id: metodologi-mdlc-multimedia
title: Penerapan Metodologi MDLC (Luther-Sutopo) pada Skripsi Multimedia
category: Metodologi Penelitian
author: Tim KataKating
date: 2026-09-21

initials: MDLC
tags: ["mdlc", "skripsi", "metodologi", "multimedia", "luther-sutopo", "tugas-akhir"]
summary: Penjelasan komprehensif 6 tahapan siklus Multimedia Development Life Cycle (Concept, Design, Material, Assembly, Testing, Distribution) yang diakui penguji sidang.
---

## 1. Pengantar Metodologi
Dalam pengembangan produk multimedia interaktif (seperti game edukasi, media pembelajaran interaktif, animasi 3D, atau aplikasi VR/AR), metodologi yang paling umum digunakan dan diakui di kalangan akademisi adalah **Multimedia Development Life Cycle (MDLC)** yang dikembangkan oleh Luther (1994) dan dimodifikasi oleh Sutopo (2003).

Metodologi ini terdiri dari 6 tahapan sekuensial yang fleksibel:

```text
[1. Concept] ──> [2. Design] ──> [3. Material Collecting]
                                           │
[6. Distribution] <── [5. Testing] <── [4. Assembly]
```

## 2. Rincian 6 Tahapan MDLC pada Bab III Skripsi

### Tahap 1: Concept (Pengonsepan)
Menentukan tujuan awal aplikasi, tema, dan target audiens (apakah anak usia dini, mahasiswa, atau umum).
* *Output Nyata*: Rumusan batasan proyek, genre game/media, dan identifikasi kebutuhan pengguna.

### Tahap 2: Design (Perancangan)
Membuat cetak biru detail dari tampilan dan alur interaksi aplikasi sebelum masuk ke proses pembuatan aset.
* *Output Nyata*:
  * **Storyboard**: Sketsa tiap scene visual beserta deskripsi audio/interaksi.
  * **Navigation Structure**: Diagram alur hierarki halaman (Linear, Hierarchical, atau Matrix).
  * **Use Case & Activity Diagram**: Jika melibatkan interaksi logika pemrograman kompleks.

### Tahap 3: Material Collecting (Pengumpulan Bahan)
Mengumpulkan seluruh aset mentah yang dibutuhkan sesuai dengan spesifikasi di tahap perancangan:
* Audio (Sound Effect, Background Music berlisensi bebas royalti).
* Gambar, Tekstur 2D, dan Referensi Karakter.
* Model 3D dasar (jika tidak membuat sendiri dari nol).

### Tahap 4: Assembly (Pembuatan)
Tahap implementasi di mana seluruh materi visual dan audio disatukan di dalam engine authoring tool (seperti Unity Engine, Unreal, Godot, atau Blender):
* Penulisan skrip interaksi logika (C#, Python, atau visual scripting).
* Penataan antarmuka pengguna (UI/UX layout) dan integrasi fisika.

### Tahap 5: Testing (Pengujian)
Menguji apakah aplikasi berjalan sesuai dengan spesifikasi dan bebas dari cacat (bug):
* **Black-Box Testing**: Menguji fungsionalitas tombol dan alur tanpa melihat kode sumber.
* **Alpha & Beta Testing**: Pengujian langsung kepada kelompok pengguna terbatas.
* **UAT (User Acceptance Test)**: Menggunakan kuesioner skala Likert (SUS / System Usability Scale).

### Tahap 6: Distribution (Pendistribusian)
Tahap akhir di mana aplikasi diekspor menjadi build yang siap digunakan pengguna:
* Kompilasi file executable (`.apk` untuk Android, `.exe` untuk PC Windows).
* Penyusunan buku manual penggunaan aplikasi dan penyimpanan arsip source code di GitHub.

## 3. Referensi
* Luther, A. C. (1994). *Authoring Interactive Multimedia*. AP Professional.
* Sutopo, A. H. (2003). *Multimedia Interaktif dengan Flash*. Graha Ilmu.
* Panduan Penulisan Proposal & Skripsi TRM Boash.
',
  'Tim KataKating',
  '24903460014',
  'Metodologi Penelitian',
  '["mdlc","skripsi","metodologi","multimedia","luther-sutopo","tugas-akhir"]',
  1,
  'MDLC',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-21 10:00:00',
  '2026-09-21 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'panduan-kontribusi',
  'Panduan Berbagi Catatan & Panduan di KATAKATING',
  'Panduan sederhana bagi mahasiswa untuk berbagi catatan kuliah, rangkuman materi, dan panduan praktikum di KATAKATING.',
  '---
id: panduan-kontribusi
title: Panduan Berbagi Catatan & Panduan di KATAKATING
category: Kontribusi & Panduan
author: Tim KATAKATING
date: 2026-09-27
initials: DOCS
tags: ["panduan", "kontribusi", "mahasiswa", "boash", "catatan", "praktikum"]
summary: Panduan lengkap alur kontribusi, unduh template naskah multi-format (DOCX, TXT, MD), dan proses kurasi catatan di KATAKATING.
---

## 1. Dari Mahasiswa, untuk Mahasiswa
KATAKATING adalah wadah repositori terbuka bagi mahasiswa Universitas Boash untuk saling berbagi catatan praktikum, rangkuman materi perkuliahan, dan panduan akademik mandiri.

Tujuan portal ini adalah memastikan catatan dan pengalaman lab yang telah dipelajari dapat terdokumentasi rapi, terstruktur, serta bermanfaat bagi sesama rekan mahasiswa dan angkatan selanjutnya.

## 2. Kategori Catatan yang Didukung
Naskah dapat diajukan sesuai rumpun bidang keilmuan yang tersedia:
1. **Jaringan Komputer**: Konfigurasi router, switch, VLAN, routing statis/dinamis, subnetting, dan simulasi Cisco Packet Tracer.
2. **Web & Tooling**: Panduan frontend/backend, instalasi environment, WSL2, Docker, Node.js, dan framework web modern.
3. **Basis Data**: Perancangan ERD, sintaks SQL, normalisasi tabel (1NF hingga 3NF), PostgreSQL, dan MySQL.
4. **Algoritma & Pemrograman**: Struktur data, rekursi, algoritma sorting/searching dalam C++, Java, atau Python.
5. **IoT & Embedded System**: Skema mikrokontroler ESP32/Arduino, protokol MQTT, sensor, dan simulasi Wokwi.
6. **Game & Multimedia**: Pemodelan 3D Blender, pipeline Unity, audio, dan metodologi MDLC.
7. **Akademik & Laporan**: Format margin baku 4-4-3-3, tata tulis ilmiah, template Word, dan panduan sidang tugas akhir.
8. **Git & DevOps**: Workflow branching, mitigasi merge conflict, CI/CD pipeline, dan deployment cloud.

## 3. Unduh Template Naskah Praktikum
Untuk mempermudah penulisan, telah disediakan tiga pilihan format berkas siap pakai yang dapat diunduh dan disesuaikan:

<div class="template-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin: 20px 0 28px;">
  <a href="/templates/template-laporan-praktikum.docx" download class="template-item" title="Unduh format Microsoft Word (.docx)" style="display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: var(--panel); border: 1px solid var(--line-strong); border-radius: var(--radius); text-decoration: none; color: inherit; transition: all 0.15s ease;">
    <span class="template-ext" style="font-family: var(--mono); font-size: 11px; font-weight: 700; color: #3b82f6; background: rgba(59, 130, 246, 0.12); padding: 6px 10px; border-radius: var(--radius);">DOCX</span>
    <div class="template-meta" style="flex: 1; min-width: 0;">
      <strong style="display: block; font-size: 13px; color: var(--heading);">Microsoft Word (.docx)</strong>
      <span style="font-size: 11px; color: var(--muted);">Format standar dokumen praktikum</span>
    </div>
    <span style="font-size: 11px; font-family: var(--mono); color: var(--accent);">&darr; Unduh</span>
  </a>

  <a href="/templates/template-laporan-praktikum.txt" download class="template-item" title="Unduh format Notepad Teks (.txt)" style="display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: var(--panel); border: 1px solid var(--line-strong); border-radius: var(--radius); text-decoration: none; color: inherit; transition: all 0.15s ease;">
    <span class="template-ext" style="font-family: var(--mono); font-size: 11px; font-weight: 700; color: #10b981; background: rgba(16, 185, 129, 0.12); padding: 6px 10px; border-radius: var(--radius);">TXT</span>
    <div class="template-meta" style="flex: 1; min-width: 0;">
      <strong style="display: block; font-size: 13px; color: var(--heading);">Notepad / Plain Text (.txt)</strong>
      <span style="font-size: 11px; color: var(--muted);">Teks baku tanpa ketergantungan software</span>
    </div>
    <span style="font-size: 11px; font-family: var(--mono); color: var(--accent);">&darr; Unduh</span>
  </a>

  <a href="/templates/template-laporan-praktikum.md" download class="template-item" title="Unduh format Markdown (.md)" style="display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: var(--panel); border: 1px solid var(--line-strong); border-radius: var(--radius); text-decoration: none; color: inherit; transition: all 0.15s ease;">
    <span class="template-ext" style="font-family: var(--mono); font-size: 11px; font-weight: 700; color: var(--accent); background: rgba(255, 255, 255, 0.1); padding: 6px 10px; border-radius: var(--radius);">MD</span>
    <div class="template-meta" style="flex: 1; min-width: 0;">
      <strong style="display: block; font-size: 13px; color: var(--heading);">Markdown (.md)</strong>
      <span style="font-size: 11px; color: var(--muted);">Format developer untuk Neovim & VS Code</span>
    </div>
    <span style="font-size: 11px; font-family: var(--mono); color: var(--accent);">&darr; Unduh</span>
  </a>
</div>

## 4. Alur Pengajuan Catatan di Web
1. **Akses Halaman Upload**: Buka menu **Upload** di bilah navigasi utama atau menu bawah ponsel.
2. **Unggah Berkas Naskah**: Sistem dilengkapi konverter berkas otomatis. Kamu dapat mengunggah berkas Word (`.docx`), PDF Digital (`.pdf`), Teks (`.txt`), maupun Markdown (`.md`). Konten akan diekstrak langsung ke formulir.
3. **Lengkapi Metadata Naskah**:
   - **Judul Catatan**: Tulis judul materi yang spesifik dan jelas.
   - **Kategori**: Pilih bidang keilmuan yang sesuai.
   - **Nama Penulis & NIM**: Cantumkan identitas lengkap untuk atribusi kontribusi.
   - **Ringkasan (Abstrak)**: Berikan 1–2 kalimat ringkasan inti bahasan catatan.
   - **Tags (Opsional)**: Kata kunci pencarian yang dipisahkan tanda koma.
4. **Kirim & Peroleh Tiket Antrean**: Klik tombol **Ajukan**. Sistem akan menerbitkan kode tiket naskah (contoh: `SUB-1024`) sebagai bukti pengajuan.
5. **Kurasi & Publikasi**: Tim kurasi memeriksa kelayakan format dan orisinalitas naskah di panel moderasi. Setelah disetujui, catatan langsung tayang di katalog publik dan graf pengetahuan.

## 5. Etika & Standar Kontribusi
* **Orisinalitas Materi**: Naskah merupakan hasil penulisan mandiri atau laporan praktikum kelompok yang sah, bukan duplikasi tanpa izin.
* **Atribusi & Rujukan**: Cantumkan modul lab dosen, dokumentasi resmi, atau literatur yang dijadikan acuan pada bagian akhir naskah.
* **Kerapian Format**: Gunakan blok kode untuk sintaks terminal/pemrograman, sertakan hasil pengujian langkah kerja, dan terapkan bahasa yang lugas.

## 6. Kolaborasi Open-Source via Git & Pull Request
Bagi rekan-rekan mahasiswa teknik dan software engineering yang terbiasa bekerja di lingkungan terminal, Git, dan Neovim / VS Code, repositori KATAKATING dikembangkan secara terbuka (*open-source*). Kamu dapat berkontribusi langsung menambahkan modul catatan atau menyempurnakan fitur web melalui alur Git Pull Request:

1. **Clone Repositori**:
```bash
git clone https://github.com/muadzhdz/katakating.git
cd katakating
```

2. **Buat Naskah Baru**:
Tambahkan berkas catatan berformat Markdown di folder `notes/nama-catatan.md` dan daftarkan metadatanya di `notes/notes.json`.

3. **Uji Validasi & Build**:
```bash
npm install
npm test
npm run build
```

4. **Kirimkan Pull Request**:
Buka Pull Request ke branch `main` di repositori GitHub [muadzhdz/katakating](https://github.com/muadzhdz/katakating). Tim pengembang akan meninjau dan menggabungkan kontribusi kamu secara langsung ke naskah resmi!
',
  'Tim KataKating',
  '24903460014',
  'Kontribusi & Panduan',
  '["panduan","kontribusi","mahasiswa","boash","catatan","praktikum"]',
  1,
  'DOCS',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-27 10:00:00',
  '2026-09-27 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'rumus-esensial-excel-akuntansi-kuliah',
  'Rumus Esensial Excel untuk Tugas Kuliah, Olah Data & Akuntansi',
  'Kumpulan rumus penting Microsoft Excel yang wajib dikuasai mahasiswa semua jurusan untuk menyelesaikan tugas laporan, olah data praktikum, dan tabel keuangan tanpa repot menghitung manual.',
  '---
id: rumus-esensial-excel-akuntansi-kuliah
title: Rumus Esensial Excel untuk Tugas Kuliah, Olah Data & Akuntansi
category: Olah Data & Office
author: BEM & Perwakilan Prodi Akuntansi
date: 2026-09-28
readTime: 6 menit
tags: ["excel", "office", "akuntansi", "olah-data", "vlookup", "statistik"]
summary: Kumpulan rumus penting Microsoft Excel yang wajib dikuasai mahasiswa semua jurusan untuk menyelesaikan tugas laporan, olah data praktikum, dan tabel keuangan tanpa repot menghitung manual.
---

## 1. Pendahuluan
Banyak mahasiswa non-IT maupun teknik sering merasa kewalahan ketika dosen meminta olah data tabel di Microsoft Excel atau Google Sheets. Faktanya, 90% tugas perkuliahan hanya membutuhkan 5 formula dasar ini untuk selesai dengan cepat dan akurat.

---

## 2. Lima Rumus Wajib Mahasiswa

### 2.1. VLOOKUP & XLOOKUP (Pencarian Data Lintas Tabel)
Digunakan untuk mengambil data dari tabel referensi secara otomatis tanpa menyalin satu per satu.

* **Sintaks Dasar VLOOKUP:**
  ```text
  =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
  ```
* **Contoh Kasus:** Mengisi nama mahasiswa berdasarkan NIM dari tabel master:
  ```text
  =VLOOKUP(A2, MasterMahasiswa!$A$2:$C$100, 2, FALSE)
  ```
* **Tips Kating:** Selalu gunakan tanda dollar (`$`) pada range tabel referensi agar formula tidak bergeser saat di-*drag* ke bawah.

### 2.2. IF Bertingkat (Konversi Nilai Angka ke Huruf)
Digunakan untuk membuat logika bertingkat, sangat sering dipakai pada tugas simulasi nilai kuliah:

```text
=IF(B2>=85, "A", IF(B2>=75, "B", IF(B2>=65, "C", IF(B2>=50, "D", "E"))))
```

### 2.3. COUNTIF & COUNTIFS (Menghitung Frekuensi Bersyarat)
Menghitung jumlah data yang memenuhi kriteria tertentu (misal: menghitung berapa responden yang memilih opsi ''Setuju'' pada kuesioner tugas):

```text
=COUNTIF(C2:C120, "Setuju")
```

### 2.4. SUMIFS (Total Penjumlahan Bersyarat)
Menjumlahkan angka hanya jika memenuhi kategori tertentu (sangat penting untuk mata kuliah Akuntansi dan Manajemen Operasional):

```text
=SUMIFS(D2:D100, B2:B100, "TRM", C2:C100, "Lunas")
```

### 2.5. Text Manipulation: TRIM & PROPER (Merapikan Data Berantakan)
Seringkali data yang dicopy dari Google Form atau WhatsApp memuat spasi ganda atau huruf kapital tak beraturan:
* `=TRIM(A2)` &mdash; Menghapus spasi berlebih di awal, tengah, dan akhir kata.
* `=PROPER(A2)` &mdash; Mengubah teks menjadi format baku (Huruf pertama kapital di setiap kata).

---

## 3. Pivot Table dalam 3 Klik
Jika tabel data memiliki ratusan baris, jangan hitung manual satu per satu:
1. Blok seluruh tabel (`Ctrl + A`).
2. Klik tab **Insert** > pilih **PivotTable** > klik **OK**.
3. Tarik kolom kategori ke bagian **Rows** dan kolom angka ke bagian **Values**.
4. Laporan ringkasan selesai dalam 5 detik.
',
  'BEM & Mahasiswa Akuntansi',
  '24903460014',
  'Akademik & Laporan',
  '["excel","office","akuntansi","olah-data","vlookup","statistik"]',
  1,
  'EXCL',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-28 10:00:00',
  '2026-09-28 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  'tata-cara-sopan-menghubungi-dosen-kating',
  'Tata Cara & Etika Sopan Menghubungi Dosen serta Kakak Tingkat',
  'Panduan sopan dan templat pesan WhatsApp siap pakai saat ingin berkonsultasi mengenai tugas, meminta izin tidak hadir, atau meminta bimbingan kepada kakak tingkat tanpa rasa canggung.',
  '---
id: tata-cara-sopan-menghubungi-dosen-kating
title: Tata Cara & Etika Sopan Menghubungi Dosen serta Kakak Tingkat
category: Tips & Mentoring
author: Tim Katakating & Himpunan Mahasiswa
date: 2026-09-28
readTime: 3 menit
tags: ["mentoring", "etika", "whatsapp", "dosen", "tips-kuliah", "kating"]
summary: Panduan sopan dan templat pesan WhatsApp siap pakai saat ingin berkonsultasi mengenai tugas, meminta izin tidak hadir, atau meminta bimbingan kepada kakak tingkat tanpa rasa canggung.
---

## 1. Prinsip Dasar Komunikasi Akademik
Menghubungi dosen atau kakak tingkat sering kali membuat mahasiswa baru merasa ragu dan segan. Kunci utama adalah:
1. Perhatikan waktu (hubungi pada hari dan jam kerja: Senin &ndash; Jumat, pukul 08.00 &ndash; 16.00 WIB).
2. Hindari kata singkatan tidak baku (*ass*, *dgn*, *sy*, *kpn*).
3. Selalu perkenalkan identitas secara lengkap di awal pesan.

---

## 2. Struktur Formula Pesan 5 Elemen
Setiap pesan formal wajib memuat 5 elemen ini secara ringkas:
1. **Salam Pembuka:** Selamat pagi / siang Bapak/Ibu Dosen...
2. **Identitas Diri:** Nama lengkap, Program Studi, Angkatan, dan NIM.
3. **Maksud & Tujuan:** To-the-point tanpa berbelit-belit.
4. **Permohonan Maaf:** Maaf mengganggu waktu Bapak/Ibu...
5. **Ucapan Terima Kasih:** Terima kasih banyak atas waktu dan perhatian Bapak/Ibu.

---

## 3. Templat Pesan WhatsApp Siap Pakai

### 3.1. Konsultasi Tugas ke Dosen Pengampu
```text
Selamat pagi Bapak/Ibu [Nama Dosen],
Mohon maaf mengganggu waktunya.

Saya [Nama Lengkap], mahasiswa program studi [Nama Prodi] angkatan [Tahun] dengan NIM [Nomor Induk Mahasiswa], peserta mata kuliah [Nama Mata Kuliah] kelas [Kelas].

Terkait tugas [Nama Tugas] yang diberikan pada pertemuan kemarin, terdapat satu hal pada bagian [Nama Bagian] yang ingin saya konfirmasikan kepada Bapak/Ibu.

Apakah sekiranya Bapak/Ibu memiliki waktu luang di kampus hari ini atau besok untuk saya berkonsultasi secara singkat?

Terima kasih banyak atas waktu dan arahan Bapak/Ibu.
```

### 3.2. Menghubungi Kakak Tingkat untuk Meminta Saran Catatan Kuliah
```text
Halo Kak [Nama Kating], selamat siang.
Mohon maaf mengganggu waktunya.

Saya [Nama Lengkap] adik tingkat angkatan [Tahun] dari prodi [Nama Prodi]. 
Saya mendapatkan kontak Kakak dari himpunan mahasiswa.

Saat ini saya sedang menempuh mata kuliah [Nama Mata Kuliah] dan mengalami sedikit kendala pada [Sebutkan Kendala, misal: aturan margin laporan / software praktikum]. 

Jika Kakak sedang senggang, apakah boleh saya bertanya sedikit mengenai tips praktikum di mata kuliah ini Kak?

Terima kasih banyak sebelumnya Kak!
```
',
  'Tim Katakating & Himpunan Mahasiswa',
  '24903460014',
  'Akademik & Laporan',
  '["mentoring","etika","whatsapp","dosen","tips-kuliah","kating"]',
  1,
  'ETIK',
  '#00ff66',
  '',
  '',
  120,
  35,
  '2026-09-28 10:00:00',
  '2026-09-28 10:00:00'
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');


INSERT INTO profiles (
  id, email, full_name, avatar_url, github_username, nim, prodi, role, created_at, updated_at
) VALUES (
  'admin-katakating',
  'katakating@gmail.com',
  'Admin KataKating',
  '',
  'muadzhdz',
  'ADMIN-01',
  'Pengelola KataKating',
  'admin',
  datetime('now'),
  datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  role = 'admin';
