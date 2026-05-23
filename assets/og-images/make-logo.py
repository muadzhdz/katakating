from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new('RGBA', (W, H), (10, 10, 10, 255))
draw = ImageDraw.Draw(img)

FONT = '/usr/share/fonts/TTF/JetBrainsMonoNerdFontMono-Bold.ttf'
SIZE = 10
LINE_H = 13
GREEN = (0, 255, 65)

ASCII = """\
████████╗██╗  ██╗███████╗    ██████╗ ███████╗███╗   ██╗ ██████╗ ██╗   ██╗██╗███╗   ██╗     ██████╗██╗██████╗  ██████╗██╗     ███████╗
╚══██╔══╝██║  ██║██╔════╝    ██╔══██╗██╔════╝████╗  ██║██╔════╝ ██║   ██║██║████╗  ██║    ██╔════╝██║██╔══██╗██╔════╝██║     ██╔════╝
   ██║   ███████║█████╗      ██████╔╝█████╗  ██╔██╗ ██║██║  ███╗██║   ██║██║██╔██╗ ██║    ██║     ██║██████╔╝██║     ██║     █████╗
   ██║   ██╔══██║██╔══╝      ██╔═══╝ ██╔══╝  ██║╚██╗██║██║   ██║██║   ██║██║██║╚██╗██║    ██║     ██║██╔══██╗██║     ██║     ██╔══╝
   ██║   ██║  ██║███████╗    ██║     ███████╗██║ ╚████║╚██████╔╝╚██████╔╝██║██║ ╚████║    ╚██████╗██║██║  ██║╚██████╗███████╗███████╗
   ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚═╝     ╚══════╝╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝     ╚═════╝╚═╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚══════╝"""

f = ImageFont.truetype(FONT, SIZE)

lines = ASCII.split('\n')
max_tw = max(draw.textbbox((0, 0), l, font=f)[2] - draw.textbbox((0, 0), l, font=f)[0] for l in lines)
base_x = (W - max_tw) // 2

th = len(lines) * LINE_H
sy = (H - th) // 2

y = sy
for l in lines:
    draw.text((base_x, y), l, fill=GREEN, font=f)
    y += LINE_H

img.save('og-logo.png')
print("✅ og-logo.png saved — logo-only version")
