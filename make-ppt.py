from PIL import Image, ImageDraw, ImageFont, ImagePath
import os

W, H = 1920, 1080
BG = "#0a0a0a"
GREEN = "#00ff41"
G2 = "#00cc33"
WHITE = "#e0e0e0"
DIM = "#777777"
DIM2 = "#555555"
CARD = "#141414"
C2 = "#1a1a1a"

FD = "/usr/share/fonts/TTF"
FB = os.path.join(FD, "JetBrainsMonoNerdFontPropo-Bold.ttf")
FR = os.path.join(FD, "JetBrainsMonoNerdFontPropo-Regular.ttf")
FM = os.path.join(FD, "JetBrainsMonoNerdFontMono-Medium.ttf")

def fn(p, s):
    return ImageFont.truetype(p, s)

def sl():
    i = Image.new("RGB", (W, H), BG)
    return i, ImageDraw.Draw(i)

def hd(d, t, n, sub=None):
    d.rectangle([80, 40, 1840, 44], fill=GREEN)
    d.text((80, 68), t, font=fn(FB, 38), fill=GREEN)
    if sub:
        d.text((80, 118), sub, font=fn(FR, 18), fill=DIM)
    d.text((1840, 1020), f"{n}/13", font=fn(FR, 15), fill="#333", anchor="rt")

def wr(d, t, f, mw):
    ws, l, ls = t.split(), "", []
    for w in ws:
        x = (l + " " + w).strip()
        b = d.textbbox((0, 0), x, font=f)
        if (b[2]-b[0]) <= mw:
            l = x
        else:
            if l: ls.append(l)
            l = w
    if l: ls.append(l)
    return ls

def tx(d, x, y, t, f, c=WHITE, mw=1760, ls=34):
    for L in wr(d, t, f, mw):
        d.text((x, y), L, font=f, fill=c)
        y += ls
    return y

def cmd(d, x, y, cmds, mw=1700):
    h = 16 + len(cmds)*32
    d.rounded_rectangle([x-20, y-14, x+mw+20, y+h], radius=8, fill="#0d0d0d")
    d.rounded_rectangle([x-20, y-14, x+mw+20, y+h], radius=8, fill=None, outline=C2, width=1)
    for c in cmds:
        d.text((x, y), f"$ {c}", font=fn(FM, 20), fill=GREEN)
        y += 32
    return y + 12

def cd(d, x, y, w, h, f=CARD):
    d.rounded_rectangle([x, y, x+w, y+h], radius=10, fill=f)

def sep(d, x, y, w):
    d.rectangle([x, y, x+w, y+1], fill=C2)

def arr(d, x, y, ln):
    d.line([x, y, x, y+ln], fill=GREEN, width=2)
    d.polygon([(x-5, y+ln-7), (x+5, y+ln-7), (x, y+ln+5)], fill=GREEN)

def nb(d, x, y, n, sz=36):
    r = sz//2
    d.ellipse([x-r, y-r, x+r, y+r], fill=GREEN)
    d.text((x, y), str(n), font=fn(FB, sz-8), fill=BG, anchor="mm")

def alc(d, x, y, w, h):
    """Card with left accent green bar"""
    cd(d, x, y, w, h)
    d.rounded_rectangle([x+3, y+10, x+5, y+h-10], radius=2, fill=GREEN)

def info_card(d, x, y, w, h, label, value):
    """Card with label on top, value below"""
    cd(d, x, y, w, h)
    d.text((x+w//2, y+22), label, font=fn(FR, 16), fill=DIM, anchor="mm")
    d.text((x+w//2, y+60), value, font=fn(FB, 20), fill=WHITE, anchor="mm")

##############################################################
# SLIDE 1 — COVER
##############################################################
i1, d1 = sl()
d1.text((960, 280), "THE PENGUIN CIRCLE", font=fn(FB, 82), fill=GREEN, anchor="mm")
d1.rectangle([640, 330, 1280, 334], fill=GREEN)
d1.text((960, 400), "Informasi Lengkap & Panduan Peserta", font=fn(FR, 34), fill=WHITE, anchor="mm")
d1.text((960, 460), "Session 0 — Persiapan + Alur Program 8 Segmen", font=fn(FR, 22), fill=DIM, anchor="mm")

# Terminal decoration
d1.rounded_rectangle([610, 530, 1310, 570], radius=6, fill="#0d0d0d")
d1.rounded_rectangle([610, 530, 1310, 570], radius=6, fill=None, outline=C2, width=1)
d1.text((960, 553), "Dari 0, Siap Jadi Hero.", font=fn(FM, 20), fill=GREEN, anchor="mm")

d1.text((960, 650), "Jumat, 12 Juni 2026  ·  15.30 WIB  ·  Lab Komputer PDBI", font=fn(FM, 22), fill=WHITE, anchor="mm")
d1.text((960, 700), "Divisi Kemahasiswaan", font=fn(FR, 18), fill=DIM, anchor="mm")
d1.text((960, 960), "From 0, To Hero.", font=fn(FR, 16), fill="#333", anchor="mm")

##############################################################
# SLIDE 2 — SEKILAS PROGRAM
##############################################################
i2, d2 = sl()
hd(d2, "Sekilas Program", 2, "Semua info penting dalam satu slide.")

# 6 info cards in 2 rows
info_data = [
    ("Nama Program", "The Penguin Circle"),
    ("Waktu", "Jumat, 15:30-17:30 WIB"),
    ("Tempat", "Lab Komputer PDBI"),
    ("Metode", "PPT 5-10 slide\n→ Demo → Praktik"),
    ("Total Sesi", "8 Segmen + 3 Buffer"),
    ("Kurikulum", "github.com/penguin-circle"),
]
for i, (lbl, val) in enumerate(info_data):
    col, row = i % 3, i // 3
    x = 120 + col * 570
    y = 210 + row * 200
    info_card(d2, x, y, 520, 170, lbl, val)

# Persyaratan section
sep(d2, 120, 640, 1680)
d2.text((120, 668), "Persyaratan", font=fn(FB, 24), fill=GREEN)

# 3 requirement cards horizontally
reqs = [
    ("WAJIB", "Laptop + WSL Ubuntu", "Windows 10+/11, RAM 4GB, Storage 10GB"),
    ("OPSI", "PC Lab Komputer", "Terminal bawaan Linux, tinggal login"),
    ("TIDAK", "HP / Termux / iSH", "Hanya laptop & PC Lab yang didukung"),
]
for i, (lbl, title, desc) in enumerate(reqs):
    x = 120 + i * 570
    cd(d2, x, 720, 520, 150)
    d2.text((x+150, 745), lbl, font=fn(FB, 18), fill=GREEN)
    d2.text((x+150, 775), title, font=fn(FB, 22), fill=WHITE)
    d2.text((x+150, 810), desc, font=fn(FR, 16), fill=DIM)
    # Icons as circles with initials
    icons = [("L", GREEN, x+80), ("P", DIM, x+160), ("X", "#555", x+240)]
    for ic_char, ic_color, icx in icons:
        d2.ellipse([icx-22, 750-22, icx+22, 750+22], fill="#0d0d0d", outline=C2)
        d2.text((icx, 750), ic_char, font=fn(FB, 22), fill=ic_color, anchor="mm")

d2.text((960, 980), "Panduan instalasi lengkap di persiapan-pertemuan-0.md", font=fn(FR, 16), fill=DIM, anchor="mm")

##############################################################
# SLIDE 3 — ALUR PER SEGMEN
##############################################################
i3, d3 = sl()
hd(d3, "Alur per Segmen", 3, "Setiap segmen terdiri dari 4 minggu + 1 minggu deadline.")

boxes_data = [
    ("MINGGU 1", "Belajar Command", "PPT singkat → Demo 1 command\n→ Praktik di WSL masing-masing"),
    ("MINGGU 2", "Lanjutan Materi", "Command baru + variasi\nPraktik mandiri sambil dibimbing"),
    ("MINGGU 3", "Pendalaman", "Studi kasus + error handling\nSiap-siap buat project"),
    ("MINGGU 4", "PROJECT WEEK", "Bikin & screen record video tugas\nDemo 3-5 command favorit"),
    ("DEADLINE", "+1 Minggu", "Upload ke YouTube (Unlisted)\nSubmit link via Google Form"),
    ("GALERI", "Tayang!", "Video muncul di website\nhttps://the-penguin-circle.vercel.app"),
]

box_w, box_h = 360, 105
gap = 28
total_h = len(boxes_data) * box_h + (len(boxes_data)-1) * gap
start_y = (1020 - total_h) // 2 + 80
cx = 960
bx = cx - box_w // 2

# Label on left
for i, (label, title, desc) in enumerate(boxes_data):
    y = start_y + i * (box_h + gap)
    cd(d3, bx, y, box_w, box_h)
    # Left color bar
    clr = GREEN if "DEADLINE" in label or "GALERI" in label else G2
    d3.rounded_rectangle([bx+4, y+8, bx+6, y+box_h-8], radius=2, fill=clr)
    # Week label
    d3.text((bx+22, y+10), label, font=fn(FB, 14), fill=clr)
    d3.text((bx+22, y+32), title, font=fn(FB, 22), fill=WHITE)
    d3.text((bx+22, y+60), desc, font=fn(FR, 14), fill=DIM)
    # Arrow connector (except last)
    if i < len(boxes_data) - 1:
        ay = y + box_h
        d3.line([cx, ay, cx, ay+gap], fill=GREEN, width=2)
        d3.polygon([(cx-5, ay+gap-6), (cx+5, ay+gap-6), (cx, ay+gap+4)], fill=GREEN)

# Right side info panel
d3.rounded_rectangle([1400, 230, 1850, 830], radius=12, fill=CARD)
d3.rounded_rectangle([1400, 230, 1850, 830], radius=12, fill=None, outline=C2, width=1)
d3.text((1625, 270), "Dalam 1 Sesi", font=fn(FB, 20), fill=GREEN, anchor="mm")

sesi_items = [
    ("15:30", "PPT + Demo", GREEN),
    ("15:50", "Praktik WSL", WHITE),
    ("16:30", "Istirahat", DIM),
    ("16:45", "Demo lanjutan", WHITE),
    ("17:00", "Q&A + Error", WHITE),
    ("17:25", "Recap + Push", G2),
]
ys = 310
for tm, act, cl in sesi_items:
    d3.text((1430, ys), tm, font=fn(FM, 14), fill=cl)
    d3.text((1510, ys), act, font=fn(FR, 16), fill=WHITE)
    ys += 40

d3.text((1625, 590), "Total Segmen", font=fn(FR, 16), fill=DIM, anchor="mm")
d3.text((1625, 630), "8 + 3 Buffer", font=fn(FB, 24), fill=GREEN, anchor="mm")

d3.text((1625, 690), "Juni 2026 — Jan 2027", font=fn(FR, 14), fill=DIM, anchor="mm")
d3.text((1625, 720), "Feb — Apr 2027 (Buffer)", font=fn(FR, 14), fill=DIM, anchor="mm")

##############################################################
# SLIDE 4 — 6 LANGKAH PERSIAPAN
##############################################################
i4, d4 = sl()
hd(d4, "6 Langkah Persiapan", 4, "Selesaiin semua sebelum datang ke Session 0. Total ~50 menit.")

steps = [
    ("1", "Install WSL Ubuntu", "Windows / Mac / PC Lab", "10-15 mnt"),
    ("2", "Bikin Akun GitHub", "github.com/signup — plan Free", "5 mnt"),
    ("3", "Bikin YouTube Channel", "youtube.com → Create channel", "3 mnt"),
    ("4", "Install Tools Awal", "htop, tree, neofetch, git, curl, wget", "5 mnt"),
    ("5", "Setup Git & SSH Key", "git config + ssh-keygen + add ke GitHub", "5 mnt"),
    ("6", "Clone Repo Organisasi", "kurikulum, template-submission, legacy", "3 mnt"),
]

for i, (num, title, desc, est) in enumerate(steps):
    col, row = i % 3, i // 3
    x = 110 + col * 570
    y = 210 + row * 350
    alc(d4, x, y, 530, 310)
    nb(d4, x+50, y+50, int(num), 44)
    d4.text((x+110, y+34), title, font=fn(FB, 24), fill=WHITE)
    d4.text((x+110, y+72), desc, font=fn(FR, 17), fill=DIM)
    # Time badge
    cd(d4, x+110, y+150, 90, 30, "#0d0d0d")
    d4.text((x+155, y+165), est, font=fn(FM, 13), fill=GREEN, anchor="mm")

d4.text((960, 980), "Gak perlu takut — semua step-by-step dan gratis.", font=fn(FR, 16), fill=DIM, anchor="mm")

##############################################################
# SLIDE 5 — WSL + GITHUB + YOUTUBE
##############################################################
i5, d5 = sl()
hd(d5, "Langkah 1-3: WSL, GitHub, YouTube", 5, "Tiga langkah pertama yang harus lo selesaiin.")

# WSL — left column
d5.text((100, 200), "WSL Ubuntu", font=fn(FB, 26), fill=GREEN)
d5.text((100, 240), "Windows — PowerShell Admin:", font=fn(FR, 17), fill=DIM)
cmd(d5, 120, 270, ["wsl --install", "wsl --version"], mw=480)
d5.text((120, 370), "Restart → Setup username & password", font=fn(FR, 16), fill=WHITE)
d5.text((120, 400), "sudo apt update && sudo apt upgrade -y", font=fn(FM, 16), fill=GREEN)
d5.text((100, 440), "MacOS:", font=fn(FB, 18), fill=WHITE)
d5.text((120, 470), "Terminal → install Homebrew", font=fn(FR, 16), fill=DIM)
d5.text((100, 510), "PC Lab:", font=fn(FB, 18), fill=WHITE)
d5.text((120, 540), "Boot → Login → Buka Terminal", font=fn(FR, 16), fill=DIM)

# Divider
d5.rectangle([680, 180, 682, 900], fill=C2)

# GitHub — middle column
d5.text((740, 200), "Akun GitHub", font=fn(FB, 26), fill=GREEN)
gh = [
    ("1", "Buka github.com/signup"),
    ("2", "Masukin email aktif"),
    ("3", "Bikin password (min 8)"),
    ("4", "Username profesional"),
    ("5", "Verifikasi email"),
    ("6", "Plan Free — gratis!"),
]
yg = 260
for num, t in gh:
    cd(d5, 750, yg, 480, 38, "#0d0d0d")
    nb(d5, 770, yg+19, int(num), 26)
    d5.text((800, yg+8), t, font=fn(FR, 16), fill=WHITE)
    yg += 48

d5.text((750, yg+14), "Username jadi identitas coding lo!", font=fn(FB, 14), fill=GREEN)

# Divider
d5.rectangle([1300, 180, 1302, 900], fill=C2)

# YouTube — right column
d5.text((1360, 200), "YouTube Channel", font=fn(FB, 26), fill=GREEN)
yt_data = [
    ("1", "Buka youtube.com"),
    ("2", "Create a channel"),
    ("3", "Get started"),
    ("4", "Isi nama pake nama asli"),
    ("5", "Selesai!"),
]
yy = 260
for num, t in yt_data:
    cd(d5, 1370, yy, 460, 38, "#0d0d0d")
    nb(d5, 1390, yy+19, int(num), 26)
    d5.text((1420, yy+8), t, font=fn(FR, 16), fill=WHITE)
    yy += 48

d5.text((1370, yy+14), "Gak perlu upload apa-apa dulu.", font=fn(FR, 16), fill=DIM)
d5.text((1370, yy+42), "Di segmen 4 nanti baru upload tugas.", font=fn(FR, 16), fill=WHITE)

##############################################################
# SLIDE 6 — TOOLS + GIT/SSH + CLONE
##############################################################
i6, d6 = sl()
hd(d6, "Langkah 4-6: Tools, Git/SSH, Clone Repo", 6, "Tiga langkah terakhir biar siap coding.")

# Tools — left
d6.text((100, 200), "Install Tools", font=fn(FB, 26), fill=GREEN)
cmd(d6, 120, 250, ["sudo apt update", "sudo apt install -y htop tree neofetch git curl wget"], mw=500)
d6.text((120, 360), "MacOS: brew install ...", font=fn(FR, 15), fill=DIM)

# Tool badges
tools = ["htop", "tree", "neofetch", "git", "curl", "wget"]
ytb = 400
for i, t in enumerate(tools):
    col, row = i % 2, i // 2
    cd(d6, 120+col*270, ytb+row*60, 250, 50)
    d6.text((245+col*270, ytb+row*60+14), t, font=fn(FM, 18), fill=GREEN, anchor="mm")
    d6.text((245+col*270, ytb+row*60+34), f"Segmen {['3','1','S0','5','3/4','3/4'][i]}", font=fn(FR, 12), fill=DIM, anchor="mm")

# Divider
d6.rectangle([680, 180, 682, 900], fill=C2)

# Git + SSH — middle
d6.text((740, 200), "Git Config & SSH Key", font=fn(FB, 26), fill=GREEN)
d6.text((740, 250), "Git Config:", font=fn(FR, 17), fill=DIM)
d6.text((760, 280), 'git config --global user.name "Nama"', font=fn(FM, 16), fill=GREEN)
d6.text((760, 310), 'git config --global user.email "email"', font=fn(FM, 16), fill=GREEN)
d6.text((740, 350), "SSH Key (biar push tanpa password):", font=fn(FR, 17), fill=DIM)
d6.text((760, 380), "ssh-keygen -t ed25519 -C \"email\"", font=fn(FM, 16), fill=GREEN)
d6.text((760, 410), "cat ~/.ssh/id_ed25519.pub", font=fn(FM, 16), fill=GREEN)
d6.text((740, 450), "Copy → github.com/settings/keys → Paste", font=fn(FR, 16), fill=WHITE)
d6.text((740, 480), "Verifikasi:", font=fn(FR, 17), fill=DIM)
d6.text((760, 510), "ssh -T git@github.com", font=fn(FM, 16), fill=GREEN)
d6.text((760, 540), "Output: Hi [nama]!", font=fn(FR, 16), fill=GREEN)

# Divider
d6.rectangle([1300, 180, 1302, 900], fill=C2)

# Clone — right
d6.text((1360, 200), "Clone Repo", font=fn(FB, 26), fill=GREEN)
d6.text((1360, 250), "Clone biar akses offline:", font=fn(FR, 17), fill=DIM)

repos = [
    ("kurikulum", "Materi 8 segmen"),
    ("template-submission", "Template tugas"),
    ("legacy", "Arsip (opsional)"),
]
yr = 290
for name, desc in repos:
    cd(d6, 1370, yr, 460, 60)
    d6.text((1388, yr+10), name, font=fn(FM, 18), fill=GREEN)
    d6.text((1388, yr+34), desc, font=fn(FR, 15), fill=DIM)
    yr += 75

d6.text((1370, yr+10), "Struktur folder:", font=fn(FR, 17), fill=DIM)
d6.text((1390, yr+45), "/home/kamu/", font=fn(FM, 15), fill=GREEN)
d6.text((1390, yr+75), "+-- kurikulum/", font=fn(FM, 15), fill=WHITE)
d6.text((1390, yr+105), "+-- template-submission/", font=fn(FM, 15), fill=WHITE)
d6.text((1390, yr+135), "+-- legacy/", font=fn(FM, 15), fill=DIM)

d6.text((960, 980), "Email git config harus SAMA dengan email GitHub!", font=fn(FB, 15), fill=GREEN, anchor="mm")

##############################################################
# SLIDE 7 — CARA SUBMIT VIDEO
##############################################################
i7, d7 = sl()
hd(d7, "Cara Submit Video Tugas", 7, "Setiap akhir segmen (minggu ke-4). Durasi: 1-2 menit.")

steps_sv = [
    ("1", "Screen Record", "Rekomendasi: OBS, Kazam, Game Bar\nDemo 3-5 command favorit"),
    ("2", "Upload YouTube", "Judul: The Penguin Circle — Segmen X — Nama\nVisibility: UNLISTED (jangan Public)"),
    ("3", "Copy Link", "Klik Share → Copy\nAtau copy dari URL browser"),
    ("4", "Google Form", "Isi Nama, Segmen, Link YouTube\nCentang konfirmasi → Kirim"),
]

for i, (num, title, desc) in enumerate(steps_sv):
    x = 100 + i * 440
    cd(d7, x, 210, 400, 300)
    # Big number at top
    nb(d7, x+200, 260, int(num), 58)
    d7.text((x+200, 320), title, font=fn(FB, 24), fill=WHITE, anchor="mm")
    d7.text((x+200, 370), desc, font=fn(FR, 16), fill=DIM, anchor="mm")
    # Arrow between steps
    if i < len(steps_sv) - 1:
        ax = x + 400
        d7.line([ax, 360, ax+35, 360], fill=GREEN, width=2)
        d7.polygon([(ax+35, 355), (ax+35, 365), (ax+42, 360)], fill=GREEN)

# Deadline info
sep(d7, 100, 550, 1720)
d7.text((100, 575), "Deadline:", font=fn(FB, 22), fill=GREEN)
d7.text((260, 575), "1 minggu setelah sesi terakhir (Minggu ke-4 + 7 hari). Form ditutup otomatis.", font=fn(FR, 18), fill=WHITE)

# Tool recommendations
d7.text((100, 625), "Rekomendasi Screen Recorder:", font=fn(FB, 18), fill=DIM)
recs = [
    ("Windows", "Game Bar (Win+G) / OBS Studio"),
    ("Linux", "OBS / Kazam / GNOME Recorder"),
    ("Mac", "QuickTime Player → Screen Recording"),
]
yr = 665
for plat, tool in recs:
    d7.text((120, yr), plat, font=fn(FM, 16), fill=GREEN)
    d7.text((280, yr), tool, font=fn(FR, 16), fill=WHITE)
    yr += 30

d7.text((960, 980), "Link Google Form: docs.google.com/forms/d/e/1FAIpQLSdYapIkh3-4iCG6mVnoLs8Gk0hZm7FvgwnqPBbPIJQPYlCFcg/viewform", font=fn(FR, 14), fill=DIM, anchor="mm")

##############################################################
# SLIDE 8 — TIPS UPLOAD YOUTUBE
##############################################################
i8, d8 = sl()
hd(d8, "Tips Upload YouTube", 8, "Biar video tugas lo aman & gak bermasalah.")

tips = [
    ("Unlisted", "Video cuma bisa dilihat yang punya link. Gak muncul di search/rekomendasi.", ""),
    ("Gak perlu edit", "Asal command jalan, suara jelas, udah cukup. Gak perlu efek-efek.", ""),
    ("Gak perlu wajah", "Screen record terminal aja. Gak perlu kamera wajah.", ""),
    ("Koneksi lambat?", "Upload dari kos/lab malem hari biar lebih cepet.", ""),
    ("Format Judul", "The Penguin Circle — Segmen X — [Nama Kamu]", "Contoh: The Penguin Circle — Segmen 1 — Ahmad Fauzi"),
]

for i, (title, desc, ex) in enumerate(tips):
    col, row = i % 2, i // 2
    x = 110 + col * 860
    y = 210 + row * 220
    alc(d8, x, y, 820, 185)
    nb(d8, x+45, y+45, i+1, 36)
    d8.text((x+80, y+32), title, font=fn(FB, 22), fill=GREEN)
    d8.text((x+80, y+70), desc, font=fn(FR, 17), fill=WHITE)
    if ex:
        cd(d8, x+80, y+120, 700, 38, "#0d0d0d")
        d8.text((x+95, y+126), ex, font=fn(FM, 14), fill=GREEN)

d8.text((960, 980), "Pastikan visibility UNLISTED — bukan Public, bukan Private!", font=fn(FB, 16), fill=GREEN, anchor="mm")

##############################################################
# SLIDE 9 — FAQ
##############################################################
i9, d9 = sl()
hd(d9, "FAQ — Pertanyaan Umum", 9, "Yang paling sering ditanyain peserta.")

faqs = [
    ("Video dinilai?", "Gak. Ini dokumentasi & portofolio kamu. Progress tracking aja."),
    ("Boleh pake musik?", "Boleh, asal suara command-nya masih kedengeran jelas."),
    ("Screen record pake apa?", "Windows: Game Bar/OBS. Linux: OBS/Kazam. Mac: QuickTime."),
    ("Lupa submit?", "Gapapa, tetap bisa ikut segmen selanjutnya. Tapi usahain submit."),
    ("Link salah?", "Submit ulang aja. Admin pake data terbaru."),
    ("Ketinggalan materi?", "Clone repo kurikulum — semua materi ada di sana."),
]

for i, (q, a) in enumerate(faqs):
    col, row = i % 2, i // 2
    x = 110 + col * 860
    y = 210 + row * 230
    # Q card
    cd(d9, x, y, 820, 80)
    d9.rounded_rectangle([x+6, y+8, x+8, y+72], radius=2, fill=GREEN)
    d9.text((x+24, y+16), "Q", font=fn(FB, 16), fill=GREEN)
    d9.text((x+48, y+18), q, font=fn(FB, 18), fill=WHITE)
    # A card
    cd(d9, x+20, y+90, 800, 65, "#0d0d0d")
    d9.text((x+38, y+102), "A", font=fn(FB, 14), fill="#555")
    d9.text((x+58, y+104), a, font=fn(FR, 16), fill=DIM)

##############################################################
# SLIDE 10 — CEKLIST FINAL
##############################################################
i10, d10 = sl()
hd(d10, "Ceklist Final", 10, "Centang semua sebelum berangkat ke Lab Komputer.")

cl_data = [
    ("WAJIB", ["  Laptop + Charger", "  WSL Ubuntu terinstall", "  sudo apt update & upgrade"]),
    ("AKUN", ["  GitHub + YouTube channel", "  SSH Key di GitHub", "  ssh -T git@github.com berhasil"]),
    ("TOOLS", ["  htop, tree, neofetch, git, curl, wget", "  git config user.name/email", "  Repo sudah di-clone"]),
    ("SUBMIT", ["  Paham cara screen record", "  Tahu format judul video", "  Tahu link Google Form"]),
]

# Left column — checklist
for i, (cat, items) in enumerate(cl_data):
    col, row = i % 2, i // 2
    x = 110 + col * 460
    y = 210 + row * 320
    cd(d10, x, y, 420, 295)
    d10.rounded_rectangle([x+8, y+10, x+10, y+285], radius=2, fill=GREEN)
    d10.text((x+24, y+16), cat, font=fn(FB, 18), fill=GREEN)
    for j, item in enumerate(items):
        d10.text((x+30, y+55+j*34), f"[ ] {item}", font=fn(FR, 17), fill=WHITE)

# Right — note
cd(d10, 1040, 210, 780, 305)
d10.text((1070, 240), "Tips:", font=fn(FB, 20), fill=GREEN)
tips_final = [
    "Gabung grup WA The Penguin Circle",
    "Follow Instagram @tmc.pdbi",
    "Install screen recorder (OBS / Game Bar)",
    "Catet pertanyaan buat Session 0",
    "Bawa charger laptop!",
]
for j, t in enumerate(tips_final):
    nb(d10, 1075, 310+j*44, j+1, 30)
    d10.text((1120, 298+j*44), t, font=fn(FR, 17), fill=WHITE)

# Timeline
cd(d10, 1040, 560, 780, 250)
d10.text((1070, 588), "Estimasi Waktu", font=fn(FB, 20), fill=GREEN)
tline = [
    ("H-3", "Install WSL + update", "20 mnt"),
    ("H-2", "GitHub + YouTube + SSH", "15 mnt"),
    ("H-1", "Tools + clone repo", "10 mnt"),
    ("H-0", "Ceklist final", "5 mnt"),
]
yt = 630
for day, act, est in tline:
    d10.text((1080, yt), day, font=fn(FM, 16), fill=GREEN)
    d10.text((1150, yt), act, font=fn(FR, 16), fill=WHITE)
    d10.text((1760, yt), est, font=fn(FM, 14), fill=DIM, anchor="rt")
    yt += 38

d10.text((1430, 800), "Total: ~50 menit", font=fn(FB, 18), fill=GREEN, anchor="mm")

##############################################################
# SLIDE 11 — TIMELINE 12 BULAN
##############################################################
i11, d11 = sl()
hd(d11, "Timeline 12 Bulan", 11, "8 Segmen Aktif (Juni 2026 — Jan 2027) + 3 Buffer (Feb — Apr 2027)")

segments = [
    ("JUN", "SEG-1", "CLI Navigasi & File"),
    ("JUL", "SEG-2", "Editor & Teks"),
    ("AGU", "SEG-3", "System Admin"),
    ("SEP", "SEG-4", "Jaringan & Remote"),
    ("OKT", "SEG-5", "Git & Version Control"),
    ("NOV", "SEG-6", "AI CLI & Prompt"),
    ("DES", "SEG-7", "Web Dev & Deploy"),
    ("JAN", "SEG-8", "Mobile Dev + Final"),
]

for i, (month, seg, topic) in enumerate(segments):
    x = 110 + i * 215
    y = 210
    cd(d11, x, y, 195, 280)
    # Month badge
    d11.rounded_rectangle([x+10, y+12, x+185, y+44], radius=6, fill=GREEN)
    d11.text((x+97, y+28), month, font=fn(FB, 16), fill=BG, anchor="mm")
    # Seg number
    d11.text((x+97, y+75), seg, font=fn(FB, 22), fill=GREEN, anchor="mm")
    # Topic
    d11.text((x+97, y+115), topic, font=fn(FR, 15), fill=WHITE, anchor="mm")
    # Connecting arrow
    if i < len(segments) - 1:
        d11.line([x+195, y+28, x+205, y+28], fill=GREEN, width=2)
        d11.polygon([(x+205, y+23), (x+205, y+33), (x+210, y+28)], fill=GREEN)

# Buffer section
sep(d11, 110, 520, 1700)
d11.text((110, 545), "Buffer (Februari — April 2027):", font=fn(FB, 20), fill=GREEN)

buffers = [
    ("Feb", "Kelas pengganti + workshop lanjutan"),
    ("Mar", "Review portofolio 1-on-1"),
    ("Apr", "Dokumentasi akhir + closing ceremony"),
]
for i, (m, d) in enumerate(buffers):
    x = 120 + i * 570
    by = 590
    cd(d11, x, by, 530, 100)
    d11.rounded_rectangle([x+8, by+8, x+10, by+92], radius=2, fill=GREEN)
    d11.text((x+24, by+16), m, font=fn(FB, 18), fill=GREEN)
    d11.text((x+24, by+52), d, font=fn(FR, 16), fill=WHITE)

# Key stats
cd(d11, 120, 730, 1700, 100, "#0d0d0d")
d11.text((400, 765), "32+ Pertemuan", font=fn(FB, 24), fill=GREEN, anchor="mm")
d11.text((960, 765), "8 Project", font=fn(FB, 24), fill=GREEN, anchor="mm")
d11.text((1520, 765), "1 Portofolio", font=fn(FB, 24), fill=GREEN, anchor="mm")

d11.text((960, 920), "Setiap segmen: 3 minggu materi + 1 minggu project.", font=fn(FR, 15), fill=DIM, anchor="mm")

##############################################################
# SLIDE 12 — TROUBLESHOOTING
##############################################################
i12, d12 = sl()
hd(d12, "Troubleshooting", 12, "Error umum & cara ngatasinnya.")

errors = [
    ("WSL: Virtualization disabled", "Restart → BIOS (F2/Del/F10) → Cari Intel VT / SVM Mode → Enable"),
    ("WSL: WSL 2 requires update", "PowerShell Admin: wsl --update && wsl --set-default-version 2"),
    ("SSH Key ditolak GitHub", "Pastikan email di ssh-keygen SAMA dengan email GitHub"),
    ("Lupa password WSL", "PowerShell Admin: wsl --unregister Ubuntu (data akan hilang)"),
    ("Repo clone error", "Cek koneksi internet. Pastikan git terinstall: git --version"),
    ("Ada error lain?", "Jangan panik. Tanya di grup WA, admin bantu satu-satu."),
]

for i, (err, sol) in enumerate(errors):
    col, row = i % 2, i // 2
    x = 110 + col * 860
    y = 210 + row * 120
    cd(d12, x, y, 820, 95)
    d12.rounded_rectangle([x+6, y+8, x+8, y+87], radius=2, fill=GREEN)
    d12.text((x+24, y+14), "!", font=fn(FB, 18), fill=GREEN)
    d12.text((x+48, y+16), err, font=fn(FB, 17), fill=WHITE)
    d12.text((x+48, y+50), sol, font=fn(FR, 15), fill=DIM)

d12.text((960, 980), "Tip: catet error lo di catatan-harian.md biar jadi dokumentasi pribadi.", font=fn(FR, 15), fill=DIM, anchor="mm")

##############################################################
# SLIDE 13 — KONTAK & PENUTUP
##############################################################
i13, d13 = sl()

# Minimal header
d13.rectangle([80, 40, 1840, 44], fill=GREEN)
d13.text((80, 68), "Kontak & Penutup", font=fn(FB, 38), fill=GREEN)
d13.text((1840, 1020), "13/13", font=fn(FR, 15), fill="#333", anchor="rt")

# Kontak cards
d13.text((80, 180), "Ada kendala? Hubungi kami:", font=fn(FB, 24), fill=GREEN)

kontaks = [
    ("Grup WA", "The Penguin Circle", "Diskusi cepat, tanya error, update info"),
    ("Instagram", "@tmc.pdbi", "Info terbaru, pengumuman, konten harian"),
    ("Website", "the-penguin-circle.vercel.app", "Kurikulum lengkap, galeri video, link daftar"),
    ("GitHub Org", "github.com/penguin-circle", "kurikulum, template-submission, legacy"),
]

for i, (label, value, desc) in enumerate(kontaks):
    col, row = i % 2, i // 2
    x = 110 + col * 860
    y = 240 + row * 150
    alc(d13, x, y, 820, 125)
    d13.text((x+24, y+16), label, font=fn(FB, 14), fill=GREEN)
    d13.text((x+24, y+42), value, font=fn(FB, 22), fill=WHITE)
    d13.text((x+24, y+78), desc, font=fn(FR, 16), fill=DIM)

# Closing message
sep(d13, 110, 560, 1700)
d13.text((960, 610), "From 0, To Hero.", font=fn(FB, 42), fill=GREEN, anchor="mm")
d13.text((960, 670), "8 bulan. 32 pertemuan. 8 project. 1 perjalanan.", font=fn(FR, 20), fill=WHITE, anchor="mm")
d13.text((960, 720), "Dari nggak bisa apa-apa, jadi bisa nulis script, pake Git, deploy website,", font=fn(FR, 18), fill=DIM, anchor="mm")
d13.text((960, 755), "dan ngobrol sama AI di terminal.", font=fn(FR, 18), fill=DIM, anchor="mm")

# Terminal block
d13.rounded_rectangle([610, 800, 1310, 860], radius=8, fill="#0d0d0d")
d13.rounded_rectangle([610, 800, 1310, 860], radius=8, fill=None, outline=C2, width=1)
d13.text((960, 815), "Siap mulai?", font=fn(FM, 18), fill=GREEN, anchor="mm")
d13.text((960, 843), "Jumat, 12 Juni 2026  |  15.30 WIB  |  Lab Komputer PDBI", font=fn(FM, 14), fill=DIM, anchor="mm")

d13.text((960, 960), "Divisi Kemahasiswaan — The Penguin Circle", font=fn(FR, 14), fill="#444", anchor="mm")

##############################################################
# COMPILE TO PDF
##############################################################
images = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13]
out = os.path.expanduser("~/Projects/the-penguin-circle/persiapan-session-0.pdf")

i1.save(out, "PDF", save_all=True, append_images=images[1:], resolution=72.0)
print(f"PDF saved to: {out}")
print(f"Pages: {len(images)} at {W}x{H}")
