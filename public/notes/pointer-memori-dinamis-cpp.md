---
id: pointer-memori-dinamis-cpp
title: "Solusi Memahami Pointer dan Alokasi Memori Dinamis C/C++ Tanpa Segfault"
category: Algoritma & Pemrograman
author: Mu'adz Hudzaifah
date: 2026-09-22
readTime: 7 menit
initials: PTR
tags: ["cpp", "c", "pointer", "memory", "segfault", "algoritma"]
summary: Tips visual memahami alamat memori, dereferencing, malloc, free, dan smart pointers di C++ agar praktikum algoritma bebas error.
file: pointer-memori-dinamis-cpp.md
---

## 1. Anatomi Pointer: Alamat vs Nilai
Momok terbesar mahasiswa semester 2 dan 3 di praktikum Struktur Data adalah pesan error keramat: `Segmentation fault (core dumped)`. Segfault terjadi saat program Anda mencoba mengakses alamat memori yang tidak valid atau bukan hak miliknya di sistem operasi.

> [!STANDAR]
> Pointer pada dasarnya hanyalah sebuah variabel biasa yang menyimpan angka hexadecimal: angka tersebut merupakan alamat fisik sel memori (RAM) tempat data lain berada.
> * Operator `&` (*Address-of*): Mengambil alamat memori suatu variabel.
> * Operator `*` (*Dereference*): Mengambil atau mengubah nilai yang ditunjuk oleh alamat tersebut.

Visualisasi logika pointer:
```text
Variabel biasa:
int nilai = 42;          --> [Alamat: 0x7ffd98] = [Nilai: 42]

Variabel pointer:
int* ptr = &nilai;       --> [Alamat: 0x7ffd10] = [Nilai: 0x7ffd98]
*ptr = 100;              --> Mengubah isi sel 0x7ffd98 menjadi 100!
```

---

## 2. Dynamic Memory: Stack vs Heap
1. **Stack Memory**: Dikelola otomatis oleh compiler. Ukurannya terbatas (~8 MB per thread di Linux). Cocok untuk variabel lokal di dalam fungsi. Saat fungsi selesai, memori otomatis musnah.
2. **Heap Memory**: Dialokasikan secara manual oleh programmer saat runtime menggunakan `malloc()` di C atau `new` di C++. Tidak otomatis musnah, sehingga wajib dibebaskan dengan `free()` atau `delete`.

```cpp
#include <iostream>

void contohAlokasiManual() {
    // Alokasi memori dinamis di heap untuk 5 integer
    int* data = (int*) malloc(5 * sizeof(int));
    
    // SELALU periksa apakah pointer berhasil dialokasikan
    if (data == nullptr) {
        std::cerr << "Gagal mengalokasikan RAM!" << std::endl;
        return;
    }

    for (int i = 0; i < 5; i++) {
        data[i] = (i + 1) * 10;
    }

    // Bebaskan memori setelah selesai untuk mencegah memory leak
    free(data);
    data = nullptr; // Mencegah dangling pointer!
}
```

> [!ERROR]
> **Dangling Pointer Warning**: Jangan pernah membiarkan pointer menunjuk ke alamat yang sudah di-`free()`. Selalu beri nilai `ptr = nullptr;` setelah pembebasan agar program Anda tidak secara tak sengaja menulis data liar ke memori kernel.

---

## 3. Cara Modern C++ (Smart Pointers)
Di standar industri modern (C++17 dan C++20), penggunaan pointer mentah (*raw pointers*) dan manual `delete` sudah sangat dihindari karena rawan kebocoran memori (*memory leaks*). Gunakan `std::unique_ptr` dari header `<memory>`:

```cpp
#include <iostream>
#include <memory>

struct Node {
    int id;
    std::string nama;
};

int main() {
    // Unique pointer otomatis membebaskan memori saat keluar dari scope!
    auto node = std::make_unique<Node>();
    node->id = 101;
    node->nama = "Sensor Suhu Boash";

    std::cout << "Node ID: " << node->id << " - " << node->nama << std::endl;
    // Tidak butuh delete node; tidak ada risiko segfault!
    return 0;
}
```

> [!KATING]
> Tips kating: Saat praktikum C/C++, selalu compile kode Anda dengan flag debugging address sanitizer: `g++ -fsanitize=address -g main.cpp -o main`. Jika ada bug *out-of-bounds* atau *double free*, compiler akan langsung menunjukkan nomor baris yang salah dengan presisi tinggi!

```terminal
$ g++ -fsanitize=address -g main.cpp -o main && ./main
# Output: AddressSanitizer: 0 errors detected. Memory safe.
```
