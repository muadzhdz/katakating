from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new('RGBA', (W, H), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

FONT = '/usr/share/fonts/TTF/JetBrainsMonoNerdFontMono-Bold.ttf'
SIZE = 10
LINE_H = 13
GREEN = (0, 255, 65, 255)

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

# Trim transparent edges
img = img.crop(img.getbbox())

img.save('og-logo-transparent.png')
print("✅ og-logo-transparent.png saved — transparent bg, trimmed")
