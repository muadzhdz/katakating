---
id: setup-flutter-android-sdk-cli-windows
title: Panduan Lengkap Install Flutter & Android SDK Headless via Terminal di Windows (Tanpa Android Studio)
category: Web & Tooling
author: Mu'adz Hudzaifah
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

### Masalah 9: adb : The term 'adb' is not recognized
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
