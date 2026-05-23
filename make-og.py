from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new('RGBA', (W, H), (10, 10, 10, 255))
draw = ImageDraw.Draw(img)

# ─── GANTI FONT PATH KALO BERBEDA ───
FONT_ASC = '/usr/share/fonts/TTF/JetBrainsMonoNerdFontMono-Bold.ttf'
FONT_TXT = '/usr/share/fonts/TTF/JetBrainsMonoNLNerdFont-Regular.ttf'

# ─── SESUAIKAN UKURAN ───
SIZE_ASC = 10    # ukuran ASCII logo
SIZE_SUB = 13    # ukuran subtitle
SIZE_STA = 11    # ukuran stats
LINE_H = 13      # jarak antar baris ASCII

# ─── WARNA ───
GREEN = (0, 255, 65)
GREEN_DIM = (0, 200, 55)

# ─── ASCII LOGO ───
ASCII = """\
████████╗██╗  ██╗███████╗    ██████╗ ███████╗███╗   ██╗ ██████╗ ██╗   ██╗██╗███╗   ██╗     ██████╗██╗██████╗  ██████╗██╗     ███████╗
╚══██╔══╝██║  ██║██╔════╝    ██╔══██╗██╔════╝████╗  ██║██╔════╝ ██║   ██║██║████╗  ██║    ██╔════╝██║██╔══██╗██╔════╝██║     ██╔════╝
   ██║   ███████║█████╗      ██████╔╝█████╗  ██╔██╗ ██║██║  ███╗██║   ██║██║██╔██╗ ██║    ██║     ██║██████╔╝██║     ██║     █████╗
   ██║   ██╔══██║██╔══╝      ██╔═══╝ ██╔══╝  ██║╚██╗██║██║   ██║██║   ██║██║██║╚██╗██║    ██║     ██║██╔══██╗██║     ██║     ██╔══╝
   ██║   ██║  ██║███████╗    ██║     ███████╗██║ ╚████║╚██████╔╝╚██████╔╝██║██║ ╚████║    ╚██████╗██║██║  ██║╚██████╗███████╗███████╗
   ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝     ╚══════╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚══════╝"""

SUB = 'Lab Komputer — Jumat, 12 Juni 2026 • 15:30 WIB'
STATS = '8 Segmen  •  32 Pertemuan  •  8 Project  •  0 Rupiah'

# ─── GAMBAR ───
f_asc = ImageFont.truetype(FONT_ASC, SIZE_ASC)
f_sub = ImageFont.truetype(FONT_TXT, SIZE_SUB)
f_sta = ImageFont.truetype(FONT_TXT, SIZE_STA)

lines = ASCII.split('\n')

# Cari lebar maksimum (baris terlebar) — biar alignment konsisten
max_tw = max(draw.textbbox((0, 0), l, font=f_asc)[2] - draw.textbbox((0, 0), l, font=f_asc)[0] for l in lines)
base_x = (W - max_tw) // 2  # posisi x untuk semua baris (centered)

th = len(lines) * LINE_H
sy = (H - th) // 2 - 10

y = sy
for l in lines:
    draw.text((base_x, y), l, fill=GREEN, font=f_asc)
    y += LINE_H

sep_y = y + 10
draw.line([(W//2 - 150, sep_y), (W//2 + 150, sep_y)], fill=GREEN_DIM, width=1)

bb = draw.textbbox((0, 0), SUB, font=f_sub)
draw.text(((W - (bb[2]-bb[0]))//2, sep_y + 14), SUB, fill=GREEN, font=f_sub)

bb = draw.textbbox((0, 0), STATS, font=f_sta)
draw.text(((W - (bb[2]-bb[0]))//2, sep_y + 38), STATS, fill=GREEN_DIM, font=f_sta)

img.save('og-image.png')
print("✅ og-image.png saved — ubah SIZE_ASC, LINE_H dll. lalu jalankan ulang")
