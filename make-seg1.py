from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1920, 1080
BG = "#0a0a0a"
GRN = "#00ff41"
G2 = "#00cc33"
WHT = "#e0e0e0"
DIM = "#777777"
DIM2 = "#555555"
CARD = "#141414"
C2 = "#1a1a1a"
WARN = "#ff6600"
OUT_DIR = os.path.expanduser("~/Projects/the-penguin-circle")

FD = "/usr/share/fonts/TTF"
FB = os.path.join(FD, "JetBrainsMonoNerdFontPropo-Bold.ttf")
FR = os.path.join(FD, "JetBrainsMonoNerdFontPropo-Regular.ttf")
FM = os.path.join(FD, "JetBrainsMonoNerdFontMono-Medium.ttf")

def fn(p, s): return ImageFont.truetype(p, s)

def sl():
    i = Image.new("RGB", (W, H), BG)
    return i, ImageDraw.Draw(i)

def hd(d, t, n, sub=None):
    d.rectangle([80, 40, 1840, 44], fill=GRN)
    d.text((80, 68), t, font=fn(FB, 36), fill=GRN)
    if sub: d.text((80, 116), sub, font=fn(FR, 17), fill=DIM)
    d.text((1840, 1020), n, font=fn(FR, 14), fill="#333", anchor="rt")

def wr(d, t, f, mw):
    ws, l, ls = t.split(), "", []
    for w in ws:
        x = (l + " " + w).strip()
        b = d.textbbox((0, 0), x, font=f)
        if (b[2]-b[0]) <= mw: l = x
        else:
            if l: ls.append(l)
            l = w
    if l: ls.append(l)
    return ls

def tx(d, x, y, t, f, c=WHT, mw=1760, ls=34):
    for L in wr(d, t, f, mw):
        d.text((x, y), L, font=f, fill=c)
        y += ls
    return y

def cmd(d, x, y, cmds, mw=1700):
    h = 16 + len(cmds)*32
    d.rounded_rectangle([x-20, y-14, x+mw+20, y+h], radius=8, fill="#0d0d0d")
    d.rounded_rectangle([x-20, y-14, x+mw+20, y+h], radius=8, fill=None, outline=C2, width=1)
    for c in cmds:
        d.text((x, y), f"$ {c}", font=fn(FM, 19), fill=GRN)
        y += 32
    return y + 10

def cd(d, x, y, w, h, f=CARD):
    d.rounded_rectangle([x, y, x+w, y+h], radius=10, fill=f)

def alc(d, x, y, w, h, a=GRN):
    cd(d, x, y, w, h)
    d.rounded_rectangle([x+3, y+10, x+5, y+h-10], radius=2, fill=a)

def nb(d, x, y, n, sz=32):
    r = sz//2
    d.ellipse([x-r, y-r, x+r, y+r], fill=GRN)
    d.text((x, y), str(n), font=fn(FB, sz-6), fill=BG, anchor="mm")

def sep(d, x, y, w):
    d.rectangle([x, y, x+w, y+1], fill=C2)

def flag_badge(d, x, y, label, c=GRN):
    d.rounded_rectangle([x-6, y-8, x+d.textbbox((0,0),label,font=fn(FM,14))[2]-x+10, y+22], radius=4, fill="#0d0d0d", outline=C2)
    d.text((x, y+5), label, font=fn(FM, 14), fill=c)

def tip(d, x, y, text, mw=1700):
    d.text((x, y), "", font=fn(FM, 16), fill=GRN)
    return tx(d, x+20, y, text, fn(FR, 15), DIM, mw-20, 26)

def warn_card(d, x, y, w, h):
    cd(d, x, y, w, h)
    d.rounded_rectangle([x+3, y+10, x+5, y+h-10], radius=2, fill=WARN)

def save_pdf(images, name):
    path = os.path.join(OUT_DIR, name)
    images[0].save(path, "PDF", save_all=True, append_images=images[1:], resolution=72.0)
    print(f"  {name} — {len(images)} halaman")
    return path

def cover(title, sub, detail, num):
    i, d = sl()
    d.text((960, 260), "THE PENGUIN CIRCLE", font=fn(FB, 70), fill=GRN, anchor="mm")
    d.rectangle([680, 310, 1240, 314], fill=GRN)
    d.text((960, 370), title, font=fn(FR, 36), fill=WHT, anchor="mm")
    d.text((960, 425), sub, font=fn(FR, 24), fill=DIM, anchor="mm")
    d.rounded_rectangle([660, 490, 1260, 530], radius=6, fill="#0d0d0d")
    d.rounded_rectangle([660, 490, 1260, 530], radius=6, fill=None, outline=C2, width=1)
    d.text((960, 510), detail, font=fn(FM, 18), fill=GRN, anchor="mm")
    d.text((960, 620), "Dari 0, Siap Jadi Hero.", font=fn(FR, 20), fill=DIM, anchor="mm")
    d.text((960, 670), "Divisi Kemahasiswaan — Lab Komputer PDBI", font=fn(FR, 16), fill=DIM, anchor="mm")
    d.text((960, 960), "Segmen 1 · Navigasi & Manajemen File", font=fn(FR, 15), fill="#333", anchor="mm")
    return i, d

def tujuan_slide(mod, mod_num, goals, cmds_list, page_num):
    i, d = sl()
    hd(d, f"Tujuan {mod}", page_num, f"Apa yang bakal lo kuasai di {mod}")
    y = 200
    for g in goals:
        cd(d, 120, y, 1680, 48)
        d.rounded_rectangle([124, y+6, 126, y+42], radius=2, fill=GRN)
        d.text((145, y+14), g, font=fn(FR, 18), fill=WHT)
        y += 62
    y += 10
    sep(d, 120, y, 1680)
    y += 20
    d.text((120, y), "Command yang dipelajari:", font=fn(FB, 20), fill=GRN)
    y += 34
    for c in cmds_list:
        cd(d, 140, y, 220, 36, "#0d0d0d")
        d.text((150, y+7), c, font=fn(FM, 16), fill=GRN)
        y += 46
    return i, d

def praktik_slide(title, langkah, page_num):
    i, d = sl()
    hd(d, title, page_num, "Praktik bareng step-by-step")
    y = 190
    for j, (lbl, desc) in enumerate(langkah):
        cd(d, 120, y, 1680, 56)
        nb(d, 150, y+28, j+1, 30)
        d.text((190, y+10), lbl, font=fn(FB, 16), fill=GRN)
        d.text((190, y+34), desc, font=fn(FM, 14), fill=DIM)
        y += 66
    return i, d

def comp_table(d, x, y, title, rows):
    """Comparison table with two columns"""
    d.text((x, y), title, font=fn(FB, 20), fill=GRN)
    y += 34
    d.text((x, y), "SITUASI", font=fn(FB, 14), fill=GRN)
    d.text((x+300, y), "COMMAND", font=fn(FB, 14), fill=GRN)
    d.text((x+680, y), "HASIL", font=fn(FB, 14), fill=GRN)
    y += 4
    sep(d, x, y+28, 780)
    y += 38
    for situasi, command, hasil in rows:
        d.text((x, y), situasi, font=fn(FR, 14), fill=DIM)
        d.text((x+300, y), command, font=fn(FM, 14), fill=GRN)
        d.text((x+680, y), hasil, font=fn(FR, 14), fill=WHT)
        y += 28
    return y


###########################################################################
# SEG-1-M1-NAVIGASI.pdf (7 slide)
###########################################################################
print("M1 — Navigasi & Bikin File...")

# S1 — Cover
s1, d1 = cover("SEGMEN 1 · MINGGU 1", "Navigasi & Bikin File", "pwd  ls  cd  mkdir  touch", "01/07")

# S2 — Tujuan
s2, d2 = tujuan_slide("Minggu 1", 4, [
    "Tahu posisi di dalam sistem pake pwd",
    "Bisa liat isi folder pake ls + flags",
    "Pindah antar folder pake cd",
    "Bikin folder baru pake mkdir",
    "Bikin file kosong pake touch",
], ["pwd", "ls", "cd", "mkdir", "touch"], "02/07")

# S3 — pwd
s3, d3 = sl()
hd(d3, "pwd — Print Working Directory", "03/07", "Nunjukin posisi lo sekarang")
y = 200
alc(d3, 100, y, 800, 120)
d3.text((120, y+14), "Fungsi", font=fn(FB, 18), fill=GRN)
d3.text((120, y+48), "Nunjukin posisi lo sekarang di dalam folder. Output-nya berupa absolute path.", font=fn(FR, 17), fill=WHT)
d3.text((120, y+84), "Analogi: kayak lo ngecek Google Maps — gua sekarang di mana?", font=fn(FR, 15), fill=DIM)
alc(d3, 920, y, 800, 120)
d3.text((940, y+14), "Contoh", font=fn(FB, 18), fill=GRN)
cmd(d3, 960, y+42, ["pwd", "pwd"], 760)
alc(d3, 100, y+150, 1620, 90)
d3.text((120, y+164), "Output", font=fn(FB, 18), fill=GRN)
d3.text((120, y+198), "/home/muadz", font=fn(FM, 20), fill=GRN)
d3.text((120, y+204), "/home/muadz  ←  ini posisi lo", font=fn(FR, 15), fill=DIM)
alc(d3, 100, y+270, 1620, 70)
d3.text((120, y+284), "Tips", font=fn(FB, 18), fill=GRN)
d3.text((120, y+318), "Pake pwd setiap kali lo bingung posisi. Ini command paling aman — gak pernah error!", font=fn(FR, 16), fill=WHT)
d3.text((960, 980), "Ini command paling simpel. Coba jalanin sekarang!", font=fn(FR, 14), fill=DIM, anchor="mm")

# S4 — ls
s4, d4 = sl()
hd(d4, "ls — List Directory", "04/07", "Nampilin isi folder — file & subfolder")
y = 200
alc(d4, 100, y, 800, 100)
d4.text((120, y+14), "Fungsi", font=fn(FB, 18), fill=GRN)
d4.text((120, y+48), "Nampilin isi folder — file dan subfolder apa aja yang ada.", font=fn(FR, 17), fill=WHT)
d4.text((120, y+76), "Analogi: kayak lo buka lemari dan liat isinya.", font=fn(FR, 15), fill=DIM)
alc(d4, 920, y, 800, 100)
d4.text((940, y+14), "Contoh", font=fn(FB, 18), fill=GRN)
cmd(d4, 960, y+42, ["ls", "ls -l", "ls -la"], 760)
y += 130
sep(d4, 100, y, 1720)
y += 18
d4.text((100, y), "Flag Penting ls", font=fn(FB, 20), fill=GRN)
y += 32
flags_ls = [
    ("ls", "List nama file/folder aja", "Downloads Documents"),
    ("ls -l", "List detail (ukuran, tanggal, permission)", "drwxr-xr-x 2 user ..."),
    ("ls -a", "List termasuk file tersembunyi", ". .. .bashrc Documents"),
    ("ls -la", "List detail + hidden files", "-rw-r--r-- 1 user ..."),
    ("ls -lh", "Ukuran file format manusia (KB, MB)", "4.0K Documents"),
    ("ls *.txt", "Cuma file .txt aja (pake wildcard)", "catatan.txt data.txt"),
]
for cmd_txt, desc, ex in flags_ls:
    cd(d4, 120, y, 1680, 34)
    d4.text((140, y+8), cmd_txt, font=fn(FM, 15), fill=GRN)
    d4.text((400, y+8), desc, font=fn(FR, 15), fill=WHT)
    d4.text((1000, y+8), ex, font=fn(FR, 13), fill=DIM)
    y += 40
alc(d4, 120, y+6, 1680, 50)
d4.text((140, y+18), "Error umum:", font=fn(FB, 15), fill=GRN)
d4.text((320, y+18), "ls /root → Permission denied (wajar)   |   ls folder_yang_gak_ada → No such file or directory", font=fn(FR, 14), fill=WHT)

# S5 — cd
s5, d5 = sl()
hd(d5, "cd — Change Directory", "05/07", "Pindah antar folder di sistem")
y = 200
alc(d5, 100, y, 800, 110)
d5.text((120, y+14), "Fungsi", font=fn(FB, 18), fill=GRN)
d5.text((120, y+48), "Pindah ke folder lain. Bisa pake absolute path atau relative path.", font=fn(FR, 17), fill=WHT)
d5.text((120, y+82), "Analogi: kayak lo jalan dari satu ruangan ke ruangan lain.", font=fn(FR, 15), fill=DIM)
alc(d5, 920, y, 800, 110)
d5.text((940, y+14), "Contoh", font=fn(FB, 18), fill=GRN)
cmd(d5, 960, y+42, ["cd Downloads", "cd ..", "cd ~", "cd /"], 760)
y += 140
sep(d5, 100, y, 1720)
y += 18
d5.text((100, y), "Macam-macam cd", font=fn(FB, 20), fill=GRN)
y += 32
cd_types = [
    ("cd Downloads", "Masuk folder Downloads", "Relative path"),
    ("cd ..", "Naik 1 folder ke atas", "Kayak balik ke ruangan sebelumnya"),
    ("cd ~", "Pulang ke home folder", "Home = rumah lo di Linux"),
    ("cd /", "Ke root system", "Paling atas dari seluruh sistem"),
    ("cd -", "Balik ke folder sebelumnya", "Kembali ke tempat sebelumnya"),
    ("cd ../..", "Naik 2 folder", "Pindah ke kakeknya folder"),
]
for cmd_txt, desc, note in cd_types:
    cd(d5, 120, y, 1680, 32)
    d5.text((140, y+7), cmd_txt, font=fn(FM, 15), fill=GRN)
    d5.text((460, y+7), desc, font=fn(FR, 15), fill=WHT)
    d5.text((1000, y+7), note, font=fn(FR, 13), fill=DIM)
    y += 38
warn_card(d5, 120, y+10, 1680, 60)
d5.text((140, y+24), "⚠️ WSL Fresh Install:", font=fn(FB, 15), fill=WARN)
d5.text((380, y+24), "cd Downloads → ERROR kalo mkdir Downloads belum dijalanin duluan! WSL fresh gak punya folder bawaan.", font=fn(FR, 14), fill=WHT)
y += 70
sep(d5, 120, y, 1720)
y += 16
d5.text((120, y), "Absolute Path vs Relative Path", font=fn(FB, 18), fill=GRN)
y += 30
d5.text((140, y), "Absolute: cd /home/muadz/Documents — path lengkap dari root (/). Bisa dipake dari mana aja.", font=fn(FR, 15), fill=WHT)
y += 26
d5.text((140, y), "Relative: cd Documents — path dari posisi sekarang. Cuma bisa kalo lo lagi di /home/muadz.", font=fn(FR, 15), fill=WHT)

# S6 — mkdir & touch
s6, d6 = sl()
hd(d6, "mkdir & touch — Bikin Folder & File", "06/07", "Bikin folder baru & file kosong")
y = 200
alc(d6, 100, y, 1720, 80, GRN)
d6.text((120, y+14), "mkdir — Make Directory", font=fn(FB, 20), fill=GRN)
d6.text((120, y+48), "Bikin folder baru | Analogi: 'Bikin laci baru di lemari'", font=fn(FR, 17), fill=WHT)
y += 100
cmd(d6, 140, y, ["mkdir tugas_kuliah", "mkdir -p project/src/css", "mkdir -p a/b/c/d"], 1640)
y += 64
cd(d6, 140, y, 1640, 40)
d6.text((160, y+10), "mkdir vs mkdir -p: tanpa -p error kalo folder parent belum ada. Pake -p aman — bikin otomatis.", font=fn(FR, 15), fill=GRN)
y += 60
alc(d6, 100, y, 1720, 80, GRN)
d6.text((120, y+14), "touch — Bikin File Kosong", font=fn(FB, 20), fill=GRN)
d6.text((120, y+48), "Bikin file baru (kosong) atau update timestamp | Analogi: 'Kertas kosong baru'", font=fn(FR, 17), fill=WHT)
y += 100
cmd(d6, 140, y, ["touch catatan.txt", "touch file1.txt file2.txt file3.txt"], 1640)
y += 56
cd(d6, 140, y, 1640, 40)
d6.text((160, y+10), "touch vs nano: touch bikin file kosong doang | nano bikin file + langsung ngetik isinya", font=fn(FR, 15), fill=DIM)
y += 60
sep(d6, 100, y, 1720)
y += 18
d6.text((100, y), "Contoh keren mkdir -p dengan curly braces:", font=fn(FB, 18), fill=GRN)
y += 32
cmd(d6, 140, y, ["mkdir -p project_web/{public/{css,js,images},src/{components,utils}}"], 1640)
y += 46
d6.text((140, y), "Bikin 7 folder cuma dalam 1 baris! project_web/{public/{css,js,images},src/{components,utils}}", font=fn(FR, 14), fill=DIM)

# S7 — Praktik + PR
s7, d7 = sl()
hd(d7, "Praktik: Jelajah Kampung Halaman", "07/07", "Praktikkin semua command yang udah dipelajari")

y = 200
d7.text((100, y), "Tugas Praktik:", font=fn(FB, 22), fill=GRN)
y += 34

tasks = [
    ("$ pwd", "Cek posisi lo sekarang. Catet output-nya."),
    ("$ ls", "Liat isi folder. Apa yang muncul?"),
    ("$ cd ~", "Pulang ke home dulu"),
    ("$ mkdir Downloads", "Bikin folder Downloads (kalo WSL fresh, ini WAJIB)"),
    ("$ mkdir Pictures Documents", "Bikin 2 folder lagi"),
    ("$ cd Downloads", "Masuk ke folder Downloads"),
    ("$ pwd", "Verifikasi — sekarang lo di /home/nama/Downloads"),
    ("$ touch catatan.txt todo.txt", "Bikin 2 file kosong"),
    ("$ ls", "Verifikasi — file-nya muncul"),
    ("$ cd ..", "Balik ke home"),
]
for i, (cmd_text, desc) in enumerate(tasks):
    cd(d7, 120, y, 1680, 34)
    d7.text((140, y+7), cmd_text, font=fn(FM, 14), fill=GRN)
    d7.text((540, y+7), desc, font=fn(FR, 15), fill=WHT)
    y += 39

y += 8
sep(d7, 100, y, 1720)
y += 14
cd(d7, 120, y, 1680, 70, "#0d0d0d")
d7.text((140, y+14), "PR Minggu 1:", font=fn(FB, 17), fill=GRN)
d7.text((140, y+44), "Bikin folder belajar_cli → masuk → bikin 3 file (catatan.txt, todo.txt, daftar.txt) → ls verifikasi → cd ~", font=fn(FR, 14), fill=WHT)
y += 78
tip(d7, 120, y, "Catet semua command yang lo pake + output-nya di catatan-harian.md. Ini jadi dokumentasi pribadi lo.", 1720)

save_pdf([s1, s2, s3, s4, s5, s6, s7], "SEG-1-M1-Navigasi.pdf")

###########################################################################
# SEG-1-M2-MANIPULASI.pdf (7 slide)
###########################################################################
print("M2 — Copy, Pindah & Wildcard...")

s1, d1 = cover("SEGMEN 1 · MINGGU 2", "Copy, Pindah & Wildcard", "cp  mv  ls -la  wildcard", "01/07")

s2, d2 = tujuan_slide("Minggu 2", 4, [
    "Paham hidden files & cara liatnya pake ls -la",
    "Copy file & folder pake cp dan cp -r",
    "Pindahin dan rename file pake mv",
    "Pake wildcard (*, ?, []) buat operasi massal",
], ["ls -la", "cp", "cp -r", "mv", "wildcard"], "02/07")

# S3 — Hidden Files + ls -la
s3, d3 = sl()
hd(d3, "Hidden Files & ls -la", "03/07", "File yang namanya dimulai dengan titik (.)")
y = 200
alc(d3, 100, y, 800, 100)
d3.text((120, y+14), "Apa itu Hidden Files?", font=fn(FB, 18), fill=GRN)
d3.text((120, y+48), "File yang namanya dimulai dengan titik (.) nggak muncul di ls biasa.", font=fn(FR, 17), fill=WHT)
d3.text((120, y+76), "Dipakai buat file konfigurasi sistem.", font=fn(FR, 15), fill=DIM)
alc(d3, 920, y, 800, 100)
d3.text((940, y+14), "Cara Liat", font=fn(FB, 18), fill=GRN)
cmd(d3, 960, y+42, ["ls -la", "ls -a"], 760)
y += 130
sep(d3, 100, y, 1720)
y += 18
d3.text((100, y), "Hidden Files Penting:", font=fn(FB, 20), fill=GRN)
y += 34
hidden = [
    (".bashrc", "Konfigurasi terminal lo — prompt, alias, PATH"),
    (".gitconfig", "Konfigurasi Git — nama, email, SSH key"),
    (".ssh/", "Folder buat kunci SSH — biar push tanpa password"),
    (".gitignore", "File yang diabaikan Git — node_modules, .env"),
]
for name, desc in hidden:
    cd(d3, 120, y, 1680, 38)
    d3.text((140, y+8), name, font=fn(FM, 16), fill=GRN)
    d3.text((340, y+8), desc, font=fn(FR, 15), fill=WHT)
    y += 44
y += 4
tip(d3, 100, y, "Kalo lo liat file aneh mulai dengan dot, jangan dihapus sembarangan! Itu file konfigurasi penting.", 1720)

# S4 — cp & cp -r
s4, d4 = sl()
hd(d4, "cp — Copy File & Folder", "04/07", "Gandain file dari satu tempat ke tempat lain")
y = 200
alc(d4, 100, y, 800, 100)
d4.text((120, y+14), "Fungsi", font=fn(FB, 18), fill=GRN)
d4.text((120, y+48), "Copy file dari satu tempat ke tempat lain. Aslinya tetap ada.", font=fn(FR, 17), fill=WHT)
d4.text((120, y+76), "Analogi: 'Fotokopi kertas — aslinya tetap, hasilnya di tempat baru.'", font=fn(FR, 15), fill=DIM)
alc(d4, 920, y, 800, 100)
d4.text((940, y+14), "Contoh", font=fn(FB, 18), fill=GRN)
cmd(d4, 960, y+42, ["cp catatan.txt backup/", "cp -r project/ backup/", "cp *.jpg images/"], 760)
y += 130
sep(d4, 100, y, 1720)
y += 18
d4.text((100, y), "cp vs cp -r — Perbedaan Penting:", font=fn(FB, 20), fill=GRN)
y += 34
cp_data = [
    ("Copy file (.txt, .jpg)", "cp a.txt backup/", "✅ Berhasil"),
    ("Copy folder tanpa -r", "cp folder1/ backup/", "❌ ERROR: omitting directory"),
    ("Copy folder PAKE -r", "cp -r folder1/ backup/", "✅ Folder + isinya tercopy"),
]
y = comp_table(d4, 120, y, "", cp_data)
y += 10
sep(d4, 120, y, 1720)
y += 14
d4.text((120, y), "Flag Penting cp:", font=fn(FB, 17), fill=GRN)
y += 28
flags_cp = [
    ("cp -v file.txt backup/", "Tampilin proses (verbose)"),
    ("cp -i file.txt backup/", "Minta konfirmasi kalo timpa (interactive)"),
    ("cp -a folder/ backup/", "Archive — copy persis termasuk permission"),
]
for f, d in flags_cp:
    d4.text((140, y), f, font=fn(FM, 15), fill=GRN)
    d4.text((560, y), d, font=fn(FR, 15), fill=WHT)
    y += 26
y += 6
tip(d4, 120, y, "Lupa -r pas copy folder = error 'omitting directory'. Biasain pake -r kalo copy folder.", 1720)

# S5 — mv
s5, d5 = sl()
hd(d5, "mv — Move & Rename", "05/07", "Pindahin ATAU ganti nama file")
y = 200
alc(d5, 100, y, 800, 100)
d5.text((120, y+14), "Fungsi", font=fn(FB, 18), fill=GRN)
d5.text((120, y+48), "Memindahkan ATAU mengganti nama file/folder.", font=fn(FR, 17), fill=WHT)
d5.text((120, y+76), "Analogi: 'Lo mindahin buku dari rak A ke rak B. Atau ganti sampulnya.'", font=fn(FR, 15), fill=DIM)
alc(d5, 920, y, 800, 100)
d5.text((940, y+14), "Contoh", font=fn(FB, 18), fill=GRN)
cmd(d5, 960, y+42, ["mv catatan.txt Documents/", "mv lama.txt baru.txt", "mv *.jpg Pictures/"], 760)
y += 130
sep(d5, 100, y, 1720)
y += 18
d5.text((100, y), "Dua Fungsi mv:", font=fn(FB, 20), fill=GRN)
y += 34
d5.text((120, y), "1. MIND AHIN file:", font=fn(FB, 16), fill=WHT)
y += 26
cmd(d5, 160, y, ["mv catatan.txt Documents/catatan.txt", "mv *.jpg Pictures/"], 1560)
y += 56
d5.text((120, y), "2. RENAME file:", font=fn(FB, 16), fill=WHT)
y += 26
cmd(d5, 160, y, ["mv catatan_lama.txt catatan_baru.txt", "mv project/ project_2026/"], 1560)
y += 56
sep(d5, 120, y, 1620)
y += 16
d5.text((120, y), "cp vs mv — Kapan Pake Yang Mana?", font=fn(FB, 18), fill=GRN)
y += 32
cmp_data = [
    ("Aslinya masih ada?", "✅ Ya", "❌ Hilang"),
    ("Fungsi utama", "Gandakan", "Pindahkan"),
    ("Bisa rename?", "❌", "✅"),
    ("Kecepatan", "Lama (copy isi)", "Cepet (ubah path aja)"),
]
for sit, c, m in cmp_data:
    d5.text((140, y), sit, font=fn(FR, 15), fill=DIM)
    d5.text((500, y), c, font=fn(FR, 15), fill=GRN)
    d5.text((900, y), m, font=fn(FR, 15), fill=WHT)
    y += 26
y += 6
tip(d5, 120, y, "mv itu mindahin, BUKAN copy! Aslinya hilang. Kalo mau aslinya tetap ada, pake cp.", 1720)

# S6 — Wildcard
s6, d6 = sl()
hd(d6, "Wildcard — Operasi File Massal", "06/07", "Pake * ? [] buat milih banyak file sekaligus")
y = 200
alc(d6, 100, y, 800, 100)
d6.text((120, y+14), "Apa itu Wildcard?", font=fn(FB, 18), fill=GRN)
d6.text((120, y+48), "Karakter spesial yang mewakili huruf/angka. Buat milih banyak file dalam 1 command.", font=fn(FR, 17), fill=WHT)
d6.text((120, y+76), "Analogi: 'Kata-kata sakti yang bisa manggil banyak file sekaligus.'", font=fn(FR, 15), fill=DIM)
alc(d6, 920, y, 800, 100)
d6.text((940, y+14), "Contoh", font=fn(FB, 18), fill=GRN)
cmd(d6, 960, y+42, ["ls *.txt", "cp *.jpg images/", "rm *.log", "ls file???"], 760)
y += 130
sep(d6, 100, y, 1720)
y += 18
d6.text((100, y), "3 Jenis Wildcard:", font=fn(FB, 20), fill=GRN)
y += 34
wc_data = [
    ("*", "Semua karakter", "*.txt = semua file berakhiran .txt"),
    ("?", "Satu karakter aja", "file?.txt = file1.txt (bukan file10.txt)"),
    ("[abc]", "Salah satu dari", "file[123].txt = file1, file2, file3"),
]
for symbol, arti, contoh in wc_data:
    cd(d6, 120, y, 1680, 48)
    d6.text((140, y+14), symbol, font=fn(FM, 22), fill=GRN)
    d6.text((240, y+16), arti, font=fn(FR, 16), fill=WHT)
    d6.text((700, y+16), contoh, font=fn(FM, 14), fill=DIM)
    y += 56
y += 6
tip(d6, 100, y, "Wildcard bisa dipake di command mana aja: ls, cp, mv, rm. Coba praktikkin sendiri!", 1720)

# S7 — Tantangan PR
s7, d7 = sl()
hd(d7, "Tantangan Minggu 2", "07/07", "PR: Praktikkin wildcard & manipulasi file")
y = 200
d7.text((100, y), "Bikin folder percobaan_copy dan praktikkin:", font=fn(FB, 20), fill=GRN)
y += 38
tantangan = [
    ("1. Bikin 5 file .txt, 3 file .jpg (touch), 2 file .pdf", ""),
    ("2. cp *.jpg backup_jpg/", "Copy semua jpg"),
    ("3. mv *.txt arsip_txt/", "Pindahin semua txt"),
    ("4. cp *.pdf backup_pdf/", "Copy semua pdf"),
    ("5. Coba ls ?", "Liat apa yang muncul"),
    ("6. Catet hasil di file hasil_wildcard.txt", "Pake echo >> atau nano"),
]
for i, (cmd_text, desc) in enumerate(tantangan):
    if desc:
        cd(d7, 120, y, 1680, 42)
        d7.text((140, y+8), cmd_text, font=fn(FM, 15), fill=GRN)
        d7.text((820, y+10), desc, font=fn(FR, 15), fill=WHT)
        y += 48
    else:
        d7.text((140, y+8), cmd_text, font=fn(FR, 17), fill=WHT)
        y += 30

y += 12
cd(d7, 120, y, 1680, 70, "#0d0d0d")
d7.text((140, y+14), "Tips:", font=fn(FB, 16), fill=GRN)
d7.text((140, y+42), "Catet semua perintah, error, dan hasil di catatan-harian.md. Ini buat portofolio lo!", font=fn(FR, 14), fill=WHT)

save_pdf([s1, s2, s3, s4, s5, s6, s7], "SEG-1-M2-Manipulasi.pdf")

###########################################################################
# SEG-1-M3-HAPUS.pdf (6 slide)
###########################################################################
print("M3 — Hapus & Folder Bertingkat...")

s1, d1 = cover("SEGMEN 1 · MINGGU 3", "Hapus & Folder Bertingkat", "rm  rmdir  rm -rf  mkdir -p", "01/06")

s2, d2 = tujuan_slide("Minggu 3", 4, [
    "Bedain rm (file) vs rmdir (folder kosong)",
    "Pake rm -rf dengan aman & paham resikonya",
    "Bikin folder bertingkat pake mkdir -p",
    "Paham peringatan keras rm -rf / dan cara aman",
], ["rm", "rmdir", "rm -rf", "mkdir -p"], "02/06")

# S3 — rm & rmdir
s3, d3 = sl()
hd(d3, "rm & rmdir — Hapus File & Folder", "03/06", "Bedanya hapus file vs hapus folder")
y = 200
alc(d3, 100, y, 1720, 70)
d3.text((120, y+14), "rm — Remove File", font=fn(FB, 18), fill=GRN)
d3.text((120, y+44), "Hapus file. Kalau folder, ERROR kalo gak pake -r.", font=fn(FR, 16), fill=WHT)
y += 90
cmd(d3, 140, y, ["rm file_lama.txt", "rm -i file.txt", "rm -f file.txt", "rm *.txt"], 1640)
y += 56
alc(d3, 100, y, 1720, 70)
d3.text((120, y+14), "rmdir — Remove Directory (Folder Kosong)", font=fn(FB, 18), fill=GRN)
d3.text((120, y+44), "Hapus folder — CUMA KALO KOSONG. Error kalo ada isinya.", font=fn(FR, 16), fill=WHT)
y += 90
cmd(d3, 140, y, ["rmdir folder_kosong/", "rmdir ada_isi/", "rm -r ada_isi/"], 1640)
y += 56
sep(d3, 100, y, 1720)
y += 16
d3.text((100, y), "Perbedaan rm & rmdir:", font=fn(FB, 18), fill=GRN)
y += 32
rm_data = [
    ("Hapus 1 file", "rm file.txt", "✅ Berhasil"),
    ("Hapus folder kosong", "rmdir folderkosong/", "✅ Berhasil"),
    ("Hapus folder berisi", "rmdir ada_isi/", "❌ Directory not empty"),
    ("Hapus folder berisi", "rm -rf ada_isi/", "✅ Paksa hapus semua"),
]
y = comp_table(d3, 120, y, "", rm_data)
y += 8
tip(d3, 100, y, "Flag rm: -i (konfirmasi), -f (paksa), -r (rekursif folder), -v (verbose/tampilin proses)", 1720)

# S4 — rm -rf
s4, d4 = sl()
hd(d4, "rm -rf — PERINGATAN KERAS!", "04/06", "Command paling berbahaya yang harus lo tau")
y = 200
cd(d4, 100, y, 1720, 90, "#0d0d0d")
d4.rounded_rectangle([100, y, 1820, y+90], radius=10, fill=None, outline=WARN, width=2)
d4.text((960, y+24), "⚠️  JANGAN PERNAH JALANIN INI  ⚠️", font=fn(FB, 28), fill=WARN, anchor="mm")
d4.text((960, y+62), "rm -rf /   =   HAPUS SELURUH SISTEM OPERASI", font=fn(FM, 20), fill=WHT, anchor="mm")
y += 110

sep(d4, 100, y, 1720)
y += 18
d4.text((100, y), "rmdir vs rm -rf:", font=fn(FB, 20), fill=GRN)
y += 34
warn_data = [
    ("Folder kosong", "rmdir folderkosong/", "Aman", GRN),
    ("Folder berisi", "rmdir ada_isi/", "Error: not empty", WARN),
    ("Folder berisi", "rm -rf ada_isi/", "Paksa hapus semua", GRN),
    ("SELURUH SISTEM", "rm -rf /", "⚠️ SISTEM HANCUR!", WARN),
]
for sit, cmd_txt, hasil, clr in warn_data:
    cd(d4, 120, y, 1680, 36)
    d4.text((140, y+8), sit, font=fn(FR, 15), fill=DIM)
    d4.text((480, y+8), cmd_txt, font=fn(FM, 15), fill=clr)
    d4.text((960, y+8), hasil, font=fn(FB, 15), fill=clr)
    y += 42

y += 10
cd(d4, 120, y, 1680, 100)
d4.text((140, y+14), "3 Tips Aman Pake rm -rf:", font=fn(FB, 17), fill=GRN)
d4.text((140, y+40), "1. Selalu ls dulu folder yang mau dihapus — biar tau isinya", font=fn(FR, 15), fill=WHT)
d4.text((140, y+62), "2. Kalo ragu, pake rm -ri (interactive — nanya tiap file)", font=fn(FR, 15), fill=WHT)
d4.text((140, y+84), "3. Jangan pernah sudo rm -rf kalo gak yakin 100%", font=fn(FB, 15), fill=GRN)

# S5 — mkdir -p
s5, d5 = sl()
hd(d5, "mkdir -p — Folder Bertingkat", "05/06", "Bikin folder bertingkat dalam 1 baris")
y = 200
alc(d5, 100, y, 1720, 80)
d5.text((120, y+14), "Masalah: Tanpa -p, error kalo folder parent belum ada", font=fn(FB, 17), fill=GRN)
d5.text((120, y+44), "mkdir a/b/c → ERROR (folder a dan b belum ada). Solusi: mkdir -p a/b/c", font=fn(FR, 16), fill=WHT)
y += 100
d5.text((100, y), "Perbandingan:", font=fn(FB, 20), fill=GRN)
y += 34
mkr = [
    ("mkdir project", "Bikin folder project", "Error kalo udah ada"),
    ("mkdir -p project", "Bikin + aman", "Aman aja"),
    ("mkdir -p a/b/c/d", "Bikin bertingkat", "Aman — bikin semua parent"),
]
for sit, cmd_txt, hasil in mkr:
    cd(d5, 120, y, 1680, 36)
    d5.text((140, y+8), sit, font=fn(FR, 15), fill=DIM)
    d5.text((480, y+8), cmd_txt, font=fn(FM, 15), fill=GRN)
    d5.text((960, y+8), hasil, font=fn(FR, 15), fill=WHT)
    y += 42

y += 6
sep(d5, 100, y, 1720)
y += 16
d5.text((100, y), "Contoh Keren — 1 Baris Bikin 7 Folder:", font=fn(FB, 18), fill=GRN)
y += 32
cmd(d5, 140, y, ["mkdir -p project_web/{public/{css,js,images},src/{components,utils}}"], 1640)
y += 42
d5.text((140, y), "Hasilnya:", font=fn(FR, 16), fill=WHT)
y += 26
d5.text((140, y), "project_web/{public/{css,js,images},src/{components,utils}}", font=fn(FM, 14), fill=DIM)
y += 20
d5.text((140, y), "→ public/css  public/js  public/images  src/components  src/utils", font=fn(FR, 14), fill=GRN)
y += 22
tip(d5, 100, y, "Biasain pake mkdir -p daripada mkdir aja. Lebih aman & gak error kalo foldernya udah ada.", 1720)

# S6 — Tantangan
s6, d6 = sl()
hd(d6, "Tantangan Minggu 3", "06/06", "PR: Bikin & Hancurin Struktur Folder")
y = 200
d6.text((100, y), "Bikin folder latihan_hapus dan praktikkin:", font=fn(FB, 20), fill=GRN)
y += 38
lgn = [
    ("1. Bikin 5 file: touch a.txt b.txt c.txt d.txt e.txt", ""),
    ("2. Bikin subfolder tmp dengan 2 file kosong", "mkdir tmp && touch tmp/x.txt tmp/y.txt"),
    ("3. Hapus e.txt pake rm", "rm e.txt"),
    ("4. Hapus subfolder tmp pake rm -rf", "rm -rf tmp/"),
    ("5. Coba rmdir latihan_hapus — liat ERROR", "rmdir latihan_hapus/"),
    ("6. Hapus folder pake rm -rf", "rm -rf latihan_hapus/"),
    ("7. Catet semua error & kenapa terjadi", "nano catatan-error.txt"),
]
for i, (cmd_text, desc) in enumerate(lgn):
    if desc:
        cd(d6, 120, y, 1680, 42)
        d6.text((140, y+8), cmd_text, font=fn(FM, 15), fill=GRN)
        d6.text((980, y+10), desc, font=fn(FR, 14), fill=DIM)
        y += 48
    else:
        d6.text((140, y+8), cmd_text, font=fn(FR, 17), fill=WHT)
        y += 34

y += 10
cd(d6, 120, y, 1680, 70, "#0d0d0d")
d6.text((140, y+14), "Yang perlu dicatet:", font=fn(FB, 16), fill=GRN)
d6.text((140, y+42), "Error apa aja yang muncul? Kenapa itu terjadi? Catet di catatan-harian.md!", font=fn(FR, 14), fill=WHT)

save_pdf([s1, s2, s3, s4, s5, s6], "SEG-1-M3-Hapus.pdf")

###########################################################################
# SEG-1-M4-PROJECT.pdf (6 slide)
###########################################################################
print("M4 — Project Segmen 1...")

s1, d1 = cover("SEGMEN 1 · MINGGU 4", "Project: Merapikan Folder Berantakan", "Final Project — Semua Command", "01/06")

# S2 — Deskripsi Project
s2, d2 = sl()
hd(d2, "Deskripsi Project", "02/06", "Misi: Merapikan Folder Berantakan")
y = 200
cd(d2, 100, y, 1720, 100)
d2.rounded_rectangle([103, y+8, 106, y+92], radius=2, fill=GRN)
d2.text((120, y+18), "Ceritanya:", font=fn(FB, 18), fill=GRN)
d2.text((120, y+50), "Gua udah nyiapin 1 folder yang isinya berantakan banget. Ada file dimana-mana, folder kosong, dan file nggak jelas. Tugas lo: rapihin semuanya pake command yang udah lo pelajari selama 3 minggu ini.", font=fn(FR, 16), fill=WHT)
d2.text((120, y+72), "Folder penuh file acak. Tugas lo: bikin kategori, pindahin, hapus sampah, verifikasi.", font=fn(FR, 15), fill=DIM)
y += 120
sep(d2, 100, y, 1720)
y += 20
d2.text((100, y), "Command yang dipake di project ini:", font=fn(FB, 20), fill=GRN)
y += 34
cmds_p = [
    ("Membuat struktur", "mkdir -p, touch"),
    ("Melihat kondisi", "ls -la, tree"),
    ("Memindahkan file", "mv"),
    ("Menyalin file", "cp"),
    ("Menghapus sampah", "rm, rmdir, rm -rf"),
]
for cmd_txt, desc in cmds_p:
    d2.text((140, y), cmd_txt, font=fn(FR, 15), fill=DIM)
    d2.text((480, y), desc, font=fn(FM, 15), fill=GRN)
    y += 28
y += 10
tip(d2, 100, y, "Goal akhir: folder rapi dengan kategori yang jelas, tanpa sampah, tanpa folder kosong.", 1720)

# S3 — Langkah 1-3
s3, d3 = sl()
hd(d3, "Project — Langkah 1-3", "03/06", "Setup & Kategorisasi")
y = 200
alc(d3, 100, y, 1720, 55, GRN)
d3.text((120, y+18), "Langkah 1: Mentor sudah menyiapkan folder misi_rapihin. Clone atau buat sendiri.", font=fn(FR, 16), fill=WHT)
y += 70
d3.text((100, y), "Langkah 1: Liat kondisi awal", font=fn(FB, 18), fill=GRN)
y += 30
cmd(d3, 140, y, ["cd misi_rapihin", "ls -la"], 1640)
y += 56
d3.text((100, y), "Langkah 2: Bikin folder kategori (1 baris!)", font=fn(FB, 18), fill=GRN)
y += 30
cmd(d3, 140, y, ["mkdir -p kategori/{makanan,minuman,buah,sayuran,alat_rumah_tangga}"], 1640)
y += 48
cd(d3, 140, y, 1620, 40)
d3.text((160, y+10), "mkdir -p + curly braces = bikin 5 folder kategori dalam 1 baris.", font=fn(FR, 15), fill=GRN)
y += 60
d3.text((100, y), "Langkah 3: Pindahin file ke kategori masing-masing", font=fn(FB, 18), fill=GRN)
y += 30
cmd(d3, 140, y, ["mv makanan.txt kategori/makanan/", "mv minuman.txt kategori/minuman/", "mv buah.txt kategori/buah/"], 1640)

# S4 — Langkah 4-7
s4, d4 = sl()
hd(d4, "Project — Langkah 4-7", "04/06", "Bersihin Sampah & Beresin File Acak")
y = 200
d4.text((100, y), "Langkah 4: Pindahin sisa kategori", font=fn(FB, 18), fill=GRN)
y += 30
cmd(d4, 140, y, ["mv sayuran.txt kategori/sayuran/", "mv alat_rumah_tangga.txt kategori/alat_rumah_tangga/"], 1640)
y += 56
d4.text((100, y), "Langkah 5: Hapus folder kosong", font=fn(FB, 18), fill=GRN)
y += 30
cmd(d4, 140, y, ["rmdir subfolder_kosong", "rmdir subfolder_lain"], 1640)
y += 56
d4.text((100, y), "Langkah 6: Hapus folder berisi + file kosong", font=fn(FB, 18), fill=GRN)
y += 30
cmd(d4, 140, y, ["rm -rf subfolder_isi_kosong", "rm kosong1.txt kosong2.txt kosong3.txt"], 1640)
y += 56
d4.text((100, y), "Langkah 7: Pindahin file acak ke tugas_akhir", font=fn(FB, 18), fill=GRN)
y += 30
cmd(d4, 140, y, ["mv 'file acak 1.txt' tugas_akhir/", "mv 'file acak 2.txt' tugas_akhir/", "mv catatan.txt data.txt tugas.txt tugas_akhir/"], 1640)
y += 64
tip(d4, 100, y, "Catet: pake kutip buat file yang namanya ada spasi. Contoh: mv 'file acak 1.txt' folder/", 1720)

# S5 — Hasil Akhir
s5, d5 = sl()
hd(d5, "Project — Hasil Akhir", "05/06", "Verifikasi pake tree — Folder Rapi!")
y = 200
alc(d5, 100, y, 1720, 55)
d5.text((120, y+18), "Langkah 8: Verifikasi hasil akhir pake tree", font=fn(FB, 18), fill=GRN)
y += 70
cmd(d5, 140, y, ["tree"], 1640)
y += 50
d5.text((100, y), "Hasil akhir yang diharapkan:", font=fn(FB, 20), fill=GRN)
y += 34
tree_lines = [
    ".",
    "+-- kategori/",
    "|   +-- alat_rumah_tangga/  → alat_rumah_tangga.txt",
    "|   +-- buah/               → buah.txt",
    "|   +-- makanan/            → makanan.txt",
    "|   +-- minuman/            → minuman.txt",
    "|   +-- sayuran/            → sayuran.txt",
    "+-- tugas_akhir/",
    "    +-- catatan.txt  data.txt  tugas.txt",
    "    +-- file acak 1.txt  file acak 2.txt",
]
for i, line in enumerate(tree_lines):
    c = GRN if i == 0 or "+-- kategori/" in line or "+-- tugas_akhir/" in line else WHT
    d5.text((140, y), line, font=fn(FM, 14), fill=c)
    y += 24
y += 4
tip(d5, 100, y, "Kalo output tree lo mirip kayak di atas — SELAMAT! Lo berhasil! Folder lo rapi.", 1720)

# S6 — Kriteria + Submit
s6, d6 = sl()
hd(d6, "Kriteria & Cara Submit", "06/06", "Pastiin semua checklist terpenuhi")
y = 200
d6.text((100, y), "Checklist Project:", font=fn(FB, 22), fill=GRN)
y += 38
cl = [
    "Folder kategori ada dengan 5 subfolder (makanan, minuman, buah, sayuran, alat_rumah_tangga)",
    "Setiap file ada di kategori yang benar",
    "Folder kosong (subfolder_kosong, subfolder_lain) udah dihapus",
    "File kosong (kosong1-3) udah dihapus",
    "File acak udah dipindah ke tugas_akhir",
    "tree jalan & nunjukkin struktur rapi",
]
for item in cl:
    d6.text((130, y), f"[ ]  {item}", font=fn(FR, 16), fill=WHT)
    y += 30

y += 14
sep(d6, 100, y, 1720)
y += 20
d6.text((100, y), "Cara Submit:", font=fn(FB, 20), fill=GRN)
y += 32
submit = [
    ("1. Screen record", "Rekam terminal lo demo 3-5 command (1-2 menit)"),
    ("2. Upload YouTube", "Judul: The Penguin Circle — Segmen 1 — [Nama] — Unlisted"),
    ("3. Copy link", "Klik Share → Copy link"),
    ("4. Google Form", "Isi nama, segmen 1, paste link, centang, kirim"),
]
for step, desc in submit:
    cd(d6, 120, y, 1680, 44)
    d6.text((140, y+8), step, font=fn(FB, 16), fill=GRN)
    d6.text((380, y+10), desc, font=fn(FR, 14), fill=WHT)
    y += 52

y += 6
d6.text((100, y), "Deadline: 1 minggu setelah sesi terakhir (Minggu ke-4 + 7 hari). Form ditutup otomatis.", font=fn(FB, 15), fill=GRN)

save_pdf([s1, s2, s3, s4, s5, s6], "SEG-1-M4-Project.pdf")

print("\nSemua file PDF berhasil digenerate!")
print("Output:")
for f in ["SEG-1-M1-Navigasi.pdf", "SEG-1-M2-Manipulasi.pdf", "SEG-1-M3-Hapus.pdf", "SEG-1-M4-Project.pdf"]:
    p = os.path.join(OUT_DIR, f)
    if os.path.exists(p):
        sz = os.path.getsize(p)
        print(f"  {f}  ({sz//1024}KB)")
