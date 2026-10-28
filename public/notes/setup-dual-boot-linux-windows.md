---
id: setup-dual-boot-linux-windows
title: "Panduan Setup Dual-Boot Linux dan Windows untuk Praktikum Mahasiswa Baru"
category: Web & Tooling
author: Mu'adz Hudzaifah
date: 2026-09-22
readTime: 8 menit
initials: DUAL
tags: ["linux", "windows", "dual-boot", "arch", "ubuntu", "efi"]
summary: Langkah aman instalasi dual-boot Arch/Ubuntu dan Windows tanpa menghapus partisi EFI atau kehilangan lisensi bawaan laptop.
file: setup-dual-boot-linux-windows.md
---

## 1. Landasan & Persiapan Partisi
Banyak mahasiswa baru salah langkah saat ingin memasang Linux untuk praktikum jaringan atau pemrograman: mereka tanpa sengaja memformat partisi sistem Windows atau merusak EFI Bootloader bawaan pabrik (*OEM partition*).

> [!STANDAR]
> Jangan pernah menginstal Linux di laptop sebelum Anda mematikan fitur **Fast Startup** dan **BitLocker** di Windows. Jika Fast Startup aktif, partisi NTFS Windows akan terkunci dalam status *hibernated*, sehingga Linux tidak dapat membaca disk dengan aman.

### Langkah Persiapan di Windows:
1. Matikan **BitLocker Drive Encryption** di menu *Control Panel > BitLocker*.
2. Matikan **Fast Startup** via *Power Options > Choose what the power buttons do*.
3. Buka **Disk Management** (`diskmgmt.msc`), klik kanan pada partisi `C:`, pilih **Shrink Volume**.
4. Sisihkan ruang kosong (*Unallocated Space*) minimal **50 GB** untuk sistem Linux.

---

## 2. Setting BIOS / UEFI
Restart laptop dan masuk ke menu BIOS/UEFI (biasanya tombol `F2`, `F12`, atau `Del` saat logo laptop menyala):
1. **SATA Mode / Storage Controller**: Pastikan diatur ke **AHCI**, bukan *Intel RST / RAID On*. Jika masih RAID On, Linux installer tidak akan mendeteksi SSD NVMe Anda.
2. **Secure Boot**: Nonaktifkan (*Disabled*) jika Anda memasang distro seperti Arch Linux. Jika memasang Ubuntu atau Fedora, Secure Boot dapat dibiarkan aktif.

> [!ERROR]
> Mengubah mode SATA dari RST ke AHCI dapat membuat Windows bluescreen jika tidak dipersiapkan via *Safe Mode* terlebih dahulu. Jalankan `bcdedit /set {current} safeboot minimal` di cmd Windows sebelum mengubah mode SATA di BIOS.

---

## 3. Langkah Partisi Manual di Linux Installer
Saat masuk ke instalasi Linux (misal Ubuntu atau Archinstall), selalu pilih opsi **Manual Partitioning / Something Else**, BUKAN opsi *"Erase disk and install Linux"*.

Gunakan partisi EFI yang sudah ada dari Windows:
1. **EFI System Partition (ESP)**: Cari partisi bertipe `EFI` (ukuran biasanya 100 MB - 260 MB, format FAT32). Tetapkan *Mount Point* ke `/boot/efi` dan **JANGAN diformat**!
2. **Root Partition (`/`)**: Pada *Unallocated Space*, buat partisi format `ext4` atau `btrfs` dengan mount point `/`.
3. **Swap**: Jika RAM laptop 8 GB atau lebih, swap file sudah cukup; tidak wajib membuat partisi swap khusus.

```terminal
$ lsblk -f
# Output: nvme0n1p1  vfat   BOOT  /boot/efi (Windows Boot Manager + GRUB)
# Output: nvme0n1p2  ntfs   OS    (Windows 11)
# Output: nvme0n1p3  ext4   ROOT  / (Ubuntu / Arch Linux)
```

---

## 4. Konfigurasi GRUB & Os-Prober
Agar menu GRUB saat booting otomatis memuat pilihan Windows dan Linux:

> [!KATING]
> Tips kating: Di distro modern seperti Ubuntu 24.04 atau Arch Linux, fitur `os-prober` sering kali dinonaktifkan secara default untuk alasan keamanan. Pastikan Anda mengaktifkannya kembali di file konfigurasi `/etc/default/grub`.

```terminal
$ sudo apt install os-prober
$ sudo nano /etc/default/grub
# Tambahkan atau ubah baris berikut:
GRUB_DISABLE_OS_PROBER=false
$ sudo update-grub
```

Setelah `update-grub` dijalankan, terminal akan mendeteksi `Found Windows Boot Manager on /dev/nvme0n1p1@/EFI/Microsoft/Boot/bootmgfw.efi`. Sekarang laptop Anda siap dipakai praktikum dengan dual-boot yang bersih dan aman.
