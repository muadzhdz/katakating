-- ====================================================================
-- [>] README — Boash Knowledge Base & Lab Survival Guide Schema
-- ====================================================================

-- 1. Guides Table (Master Catalog)
create table if not exists public.guides (
  id text primary key,
  title text not null,
  summary text not null,
  content text not null,
  author_name text not null,
  author_npm text,
  category text not null,
  prodi_tags text[] not null default '{}',
  semester integer not null default 1,
  initials text not null,
  accent text default '#00ff66',
  video_url text,
  diagram_url text,
  views_count integer not null default 0,
  copy_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Submissions Table (Staging queue for student drafts)
create table if not exists public.submissions (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  author_name text not null,
  author_npm text,
  author_email text,
  category text not null,
  prodi_tags text[] not null default '{}',
  semester integer not null default 1,
  summary text not null,
  content text not null,
  status text not null default 'pending_review',
  submitted_at timestamptz not null default now()
);

-- 3. Enable RLS
alter table public.guides enable row level security;
alter table public.submissions enable row level security;

-- Policies for Guides
create policy "Allow public read access to guides"
  on public.guides for select
  using (true);

create policy "Allow service_role full access to guides"
  on public.guides for all
  using (auth.role() = 'service_role');

-- Policies for Submissions
create policy "Allow anonymous insert to submissions"
  on public.submissions for insert
  with check (true);

create policy "Allow service_role full access to submissions"
  on public.submissions for all
  using (auth.role() = 'service_role');

-- 4. Initial Seed Data (10 Master Guides across FSTI)
insert into public.guides (id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, views_count, copy_count)
values
(
  'setup-dual-boot-linux-windows',
  'Panduan Setup Dual-Boot Linux dan Windows untuk Praktikum Mahasiswa Baru',
  'Langkah aman instalasi dual-boot Arch/Ubuntu dan Windows tanpa menghapus partisi EFI atau kehilangan lisensi bawaan laptop.',
  '## Persiapan Partisi\n1. Matikan Fast Startup dan BitLocker di Windows.\n2. Sisakan unallocated space minimal 60GB di Disk Management.\n3. Siapkan USB flashdisk dengan Ventoy atau Rufus (GPT partition scheme).\n\n```bash\nsudo parted -l\nsudo fdisk -l\n```\n\n## Instalasi Bootloader\nPastikan partisi EFI (ESP) di-mount ke /boot atau /efi agar GRUB atau systemd-boot mendeteksi entri Windows Boot Manager secara otomatis.',
  'Mu''adz Hudzaifah',
  '24903460014',
  'systems-network',
  array['TRM', 'IF', 'SRK', 'Mekatronika'],
  1,
  'DB',
  '#00ff66',
  142,
  45
),
(
  'pointer-memori-dinamis-cpp',
  'Solusi Memahami Pointer dan Alokasi Memori Dinamis C/C++ Tanpa Segfault',
  'Tips visual memahami alamat memori, dereferencing, malloc, free, dan smart pointers di C++ agar praktikum algoritma bebas error.',
  '## Anatomi Pointer\nPointer adalah variabel yang menyimpan alamat memori variabel lain. Jangan pernah melakukan dereferensi pointer NULL!\n\n```c\nint a = 42;\nint *p = &a; // p menunjuk ke alamat a\nprintf("Nilai: %d, Alamat: %p\\n", *p, (void*)p);\n```\n\n## Pencegahan Memory Leak\nSetiap kali menggunakan `malloc()` atau `new`, pastikan ada pasangan `free()` atau `delete` yang dipanggil tepat waktu.',
  'Mu''adz Hudzaifah',
  '24903460014',
  'web-software',
  array['TRM', 'IF', 'Mekatronika'],
  1,
  'PT',
  '#00ff66',
  89,
  23
),
(
  'normalisasi-sql-1nf-ke-3nf',
  'Cheat-Sheet Query SQL: Cara Cepat Normalisasi Data dari 1NF sampai 3NF',
  'Metode cepat memecah tabel data yang berantakan menjadi tabel relasional yang memenuhi standar 1NF, 2NF, dan 3NF.',
  '## Tahapan Normalisasi\n- 1NF: Hilangkan kolom berulang, pastikan setiap sel bernilai atomik (satu nilai tunggal).\n- 2NF: Harus sudah 1NF, dan hilangkan dependensi parsial (setiap atribut non-kunci bergantung penuh pada Primary Key).\n- 3NF: Harus sudah 2NF, dan hilangkan dependensi transitif (tidak ada ketergantungan antar atribut non-kunci).\n\n```sql\nCREATE TABLE mahasiswa (\n  npm VARCHAR(12) PRIMARY KEY,\n  nama VARCHAR(100) NOT NULL,\n  kode_prodi VARCHAR(5) REFERENCES prodi(kode)\n);\n```',
  'Ardi Haryanto',
  '24903460043',
  'web-software',
  array['TRM', 'IF', 'SI'],
  2,
  'NF',
  '#22c55e',
  112,
  38
),
(
  'render-blender-crash-gpu-hemat-daya',
  'Cara Mengatasi Render Blender Sering Crash pada Laptop Tanpa GPU Tambahan',
  'Trik optimasi setting render Cycles dan Eevee agar tidak freeze atau close sendiri saat rendering tugas 3D di laptop standar.',
  '## Langkah Optimasi\n1. Buka Edit -> Preferences -> System -> Cycles Render Devices. Pilih HIP atau OptiX jika didukung, atau set ke CPU.\n2. Turunkan Tile Size ke 64x64 atau 128x128 untuk menghemat VRAM.\n3. Aktifkan Denoising (OpenImageDenoise) dan batasi Max Samples ke 128–256.\n4. Tutup aplikasi browser berat saat proses render berlangsung.',
  'Ardi Haryanto',
  '24903460043',
  'multimedia-3d',
  array['TRM'],
  3,
  'BL',
  '#34d399',
  76,
  19
),
(
  'simulasi-esp32-dht22-wokwi',
  'Langkah Simulasi ESP32 dan Sensor DHT22 di Wokwi Sebelum Turun ke Hardware Fisik',
  'Panduan lengkap wiring virtual diagram.json, konfigurasi MQTT broker publik, dan pengujian OLED SSD1306 di Wokwi.',
  '## Wiring Pin ESP32 DevKit v1\n- OLED SSD1306: SCL -> GPIO 22, SDA -> GPIO 21\n- Sensor DHT22: Data -> GPIO 15\n- Status LED: Anoda (+) -> GPIO 2\n\n```cpp\n#include <WiFi.h>\n#include <PubSubClient.h>\n#include \"DHTesp.h\"\n\nconst char* mqtt_server = \"broker.emqx.io\";\nWiFiClient espClient;\nPubSubClient client(espClient);\n```\n\nJalankan simulasi di browser secara instan tanpa khawatir merusak modul mikrokontroler fisik!',
  'Mu''adz Hudzaifah',
  '24903460014',
  'iot-hardware',
  array['TRM', 'Mekatronika', 'SRK'],
  5,
  'WK',
  '#00ff66',
  204,
  67
),
(
  'bypass-gradle-timeout-android-studio',
  'Solusi Mengatasi Build Timeout dan Error Gradle pada Android Studio',
  'Trik mengonfigurasi gradle.properties dan offline mode agar kompilasi aplikasi mobile tidak stuck berjam-jam saat koneksi lab lambat.',
  '## Modifikasi gradle.properties\nTambahkan konfigurasi alokasi RAM dan parallel build berikut:\n\n```properties\norg.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m -XX:+HeapDumpOnOutOfMemoryError\norg.gradle.parallel=true\norg.gradle.caching=true\nandroid.useAndroidX=true\n```\n\nAktifkan toggle Toggle Offline Mode di toolbar Gradle saat dependensi sudah terunduh sekali.',
  'Muhammad Bariq',
  '24903460055',
  'web-software',
  array['TRM', 'IF'],
  5,
  'AS',
  '#10b981',
  165,
  52
)
on conflict (id) do nothing;
