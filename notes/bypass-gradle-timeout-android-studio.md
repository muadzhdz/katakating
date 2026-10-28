---
id: bypass-gradle-timeout-android-studio
title: "Solusi Mengatasi Build Timeout dan Error Gradle pada Android Studio"
category: Web & Tooling
author: Tim KataKating
date: 2026-09-22
readTime: 6 menit
initials: GRAD
tags: ["android", "gradle", "mobile", "build", "java", "kotlin"]
summary: Trik mengonfigurasi gradle.properties dan offline mode agar kompilasi aplikasi mobile tidak stuck berjam-jam saat koneksi lab lambat.
file: bypass-gradle-timeout-android-studio.md
---

## 1. Penyebab Gradle Stuck & Download Gagal
Ketika praktikum pemrograman mobile berlangsung serentak di lab komputer kampus, puluhan mahasiswa mengakses jaringan Wi-Fi yang sama untuk mengunduh dependensi Gradle dari Google Maven (`dl.google.com`) dan Maven Central.

Akibatnya, Android Studio menampilkan error:
* `Read timed out` atau `Connection reset by peer`.
* `Gradle build running...` berputar terus tanpa henti selama lebih dari 30 menit.
* `Could not resolve com.android.tools.build:gradle:8.x.x`.

---

## 2. Optimasi Alokasi RAM di `gradle.properties`
Secara default, Gradle daemon hanya dialokasikan 1.5 GB RAM, sehingga saat kompilasi file Java/Kotlin berlangsung, garbage collector JVM bekerja berlebihan dan menyebabkan sistem *lag*.

Buka file `gradle.properties` (bisa di folder project atau direktori global `~/.gradle/gradle.properties`), lalu tambahkan baris berikut:

```properties
# Tingkatkan batas heap memori JVM menjadi 4GB (atau 2GB untuk laptop 8GB)
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m -XX:+HeapDumpOnOutOfMemoryError

# Aktifkan kompilasi paralel antar modul
org.gradle.parallel=true

# Aktifkan cache build lokal
org.gradle.caching=true

# Aktifkan daemon agar proses build berikutnya instan
org.gradle.daemon=true

# Nonaktifkan check timeout jaringan berlebih
systemProp.http.connectionTimeout=120000
systemProp.http.socketTimeout=120000
```

> [!STANDAR]
> Mengaktifkan `org.gradle.caching=true` dan `org.gradle.parallel=true` dapat memangkas durasi build hingga **65%** pada proses kompilasi kedua dan seterusnya (*incremental build*).

---

## 3. Solusi Mirror Maven Indonesia / Cloudflare Cache
Jika repository Maven Google lambat, buka file `settings.gradle.kts` atau `build.gradle`, tambahkan mirror terdekat atau prioritaskan repository lokal:

```groovy
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
```

> [!KATING]
> Tips kating: Jika Anda sudah pernah sukses melakukan build di rumah, sebelum berangkat ke lab kampus aktifkan fitur **Toggle Offline Mode** di panel kanan atas Android Studio (ikon dua panah sejajar dengan strip). Dengan *Offline Mode*, Gradle sama sekali tidak akan mencoba download ke internet dan murni menggunakan cache lokal laptop Anda!

---

## 4. Eksekusi Build Cepat via Terminal Headless
Hindari selalu menekan tombol hijau segitiga di Android Studio saat hanya ingin mengecek error sintaks. Gunakan perintah terminal:

```terminal
$ ./gradlew assembleDebug --offline --parallel
# Output: BUILD SUCCESSFUL in 4s. 28 actionable tasks: 2 executed, 26 up-to-date.
```

Dengan perintah di atas, APK debug selesai dalam hitungan detik tanpa tersandera masalah koneksi lab.
