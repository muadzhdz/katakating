---
id: algoritma-struktur-data-dasar
title: Implementasi Struktur Data Stack & Queue pada Praktikum Pemrograman
category: Algoritma & Struktur Data
author: Mu'adz Hudzaifah
date: 2026-09-21
readTime: 6 menit
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
