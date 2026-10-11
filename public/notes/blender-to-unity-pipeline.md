---
id: blender-to-unity-pipeline
title: Pipeline Export Aset 3D Blender ke Unity 2022 LTS (Fix Skala & Rotasi)
category: Game & Multimedia
author: Divisi Kemahasiswaan HIMATRA
date: 2026-09-21
readTime: 5 menit
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
