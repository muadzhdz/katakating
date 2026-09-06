#!/home/whoami/venv/bin/python3
import sys, tty, termios, subprocess
from rich.console import Console, Group
from rich.panel import Panel
from rich.text import Text
from rich.align import Align
from rich.table import Table
from rich import box
from rich.layout import Layout
from rich.live import Live

console = Console()
TOTAL = 10

def get_qr(url):
    try:
        # Pake qrencode tanpa paksa margin biar dia ngitung sendiri yang pas buat UTF8
        # Tambah -m 2 buat safe space di terminal
        qr_raw = subprocess.run(
            ["qrencode", "-t", "utf8", "-m", "2", "-l", "L", url],
            capture_output=True, text=True
        ).stdout
        # Bersihin spasi di tiap baris tapi pertahanin struktur vertikal
        lines = [line.rstrip() for line in qr_raw.split("\n") if line.strip()]
        return Text("\n".join(lines), style="bold #00ff41")
    except Exception:
        return Text("[QR Code Error]", style="bold red")

def getch():
    fd = sys.stdin.fileno()
    old = termios.tcgetattr(fd)
    try:
        tty.setraw(fd)
        ch = sys.stdin.read(1)
        if ch == '\x1b':
            ch += sys.stdin.read(2)
        return ch
    finally:
        termios.tcsetattr(fd, termios.TCSADRAIN, old)

HEADERS = [
    ("PROGRAM KERJA",       "Raker Divisi Kemahasiswaan 2026/2027"),
    ("VISI & MISI",         "3 Pilar Program Kerja"),
    ("FILOSOFI",            "MSK memancing, Circle menampung"),
    ("STRUKTUR DIVISI",     "Ketua · Koordinator · 5 Anggota"),
    ("THE PENGUIN CIRCLE",  "8 Segmen · 32 Pertemuan · 8 Project"),
    ("MULTIMEDIA SV. KIT",  "8 Wajib + 8 Opsional"),
    ("KEGIATAN & PROKER",   "Partisipasi Aktif di Event Kampus"),
    ("TIMELINE 12 BULAN",   "4 Fase · Mei 2026 - April 2027"),
    ("WARISAN DIGITAL",     "Agar Ilmu Abadi di GitHub"),
    ("PENUTUP",             "From 0, To Hero"),
]

def make_header(num):
    title, subtitle = HEADERS[num - 1]
    hdr = Text(justify="center")
    hdr.append("\n\n")
    hdr.append(f"{title}\n", style="bold white")
    hdr.append("━━━━━━━━━━━━━━━━━━━━━━━━\n", style="green")
    hdr.append(f"{subtitle}", style="italic white")
    hdr.append("\n\n")
    return Panel(Align.center(hdr, vertical="middle"), border_style="#00ff41")

def make_footer(num):
    ftr = Text(f"Slide {num}/{TOTAL}  |  \u2190 \u2192 Navigate  |  q: Quit",
        style="bold white")
    return Panel(Align.center(ftr, vertical="middle"), border_style="#00ff41")

# ═══════════════════  SLIDES  ═══════════════════

def s1():
    text = Text.from_markup(
        "[bold #00ff41]Selamat Datang di Raker Divisi Kemahasiswaan[/]\n\n"
        "[bold white]The Penguin Circle[/]  ·  "
        "[#66ff66]Multimedia Survival Kit[/]  ·  [white]Warisan Digital[/]\n\n"
        "Mu'adz Hudzaifah\n"
        "[italic]Ketua Divisi Kemahasiswaan[/]\n\n"
        "PDBI \u2014 Politeknik Digital Boash Indonesia\n\n"
        "[bold #00ff41]6 Juni 2026[/]\n\n"
        "[dim]From 0, To Hero.[/]"
    )
    return Panel(Align.center(text, vertical="middle"), border_style="#00ff41", padding=(2, 4))

def s2():
    visi = Text.from_markup(
        "[bold #00ff41]Visi[/]\n\n"
        "Mewujudkan Divisi Kemahasiswaan\n"
        "sebagai pusat transformasi teknologi\n"
        "dan penguatan kompetensi digital\n"
        "melalui ekosistem pembelajaran\n"
        "yang mandiri serta kolaboratif."
    )
    misi = Text.from_markup(
        "[bold #00ff41]3 Misi[/]\n\n"
        "[bold white]1.[/] The Penguin Circle\n"
        "  Forum web dev/Git/AI coding gratis dari 0\n"
        "  [dim]8 segmen \u00b7 32 pertemuan \u00b7 8 project[/]\n\n"
        "[bold white]2.[/] Multimedia Survival Kit\n"
        "  Konten digital edukatif kolaborasi Kominfo\n"
        "  [dim]8 konten wajib \u00b7 8 konten opsional[/]\n\n"
        "[bold white]3.[/] Warisan Digital\n"
        "  Dokumentasi di GitHub agar tidak hilang\n"
        "  [dim]3 repo \u00b7 1 website[/]"
    )
    
    layout = Layout()
    layout.split_row(
        Layout(Panel(Align.center(visi, vertical="middle"), title="[bold white]VISI[/]", border_style="#00ff41", padding=(1, 2))),
        Layout(size=3, name="g"),
        Layout(Panel(Align.center(misi, vertical="middle"), title="[bold white]MISI[/]", border_style="#00ff41", padding=(1, 2)))
    )
    layout["g"].update("")
    return layout

def s3():
    text = Text.from_markup(
        "[bold white]BUKAN DIVISI TUKANG ACARA[/]\n"
        "[#66ff66]Tapi pusat transformasi teknologi untuk PDBI[/]\n\n"
        "[bold #00ff41]Alur Kerja[/]\n\n"
        "[bold white]Multimedia Survival Kit[/]  [dim](Branding + Pancingan)[/]\n"
        "  Poster & Video \u2500\u25b6 Orang liat \u2500\u25b6 Penasaran\n\n"
        "  [bold #00ff41]\u25bc[/]\n\n"
        "[bold white]The Penguin Circle[/]  [dim](Eksekusi + Dampak)[/]\n"
        "  Orang dateng \u2500\u25b6 Belajar \u2500\u25b6 Jadi bisa\n"
        "  Punya project & portofolio\n\n"
        "[italic]MSK bikin penasaran. Circle tampung yang penasaran.[/]"
    )
    return Panel(Align.center(text, vertical="middle"), border_style="#00ff41", padding=(2, 4))

def s4():
    t = Table(expand=True, box=box.SIMPLE, border_style="#00ff41")
    t.add_column("Jabatan", style="bold #00ff41")
    t.add_column("Nama", style="bold white")
    t.add_column("Tugas Utama", style="white")
    t.add_row("Ketua Divisi", "Mu'adz Hudzaifah", "Penggagas Circle, pengajar, kurikulum")
    t.add_row("Koordinator", "Ilham Y. Fadillah", "Koordinasi anggota, belajar bareng peserta")
    t.add_row("Anggota", "M. Hisyam Ariandra", "Belajar bareng peserta")
    t.add_row("Anggota", "Rassel Juliandri", "Belajar bareng peserta")
    t.add_row("Anggota", "Hayyan Kalam", "Belajar bareng peserta")
    t.add_row("Anggota", "Bayu Fajar. A", "Belajar bareng peserta")
    t.add_row("Anggota", "Kammila", "Belajar bareng peserta")

    note = Text.from_markup(
        "[italic dim]Anggota belajar BERSAMA peserta \u2014 bukan asisten. Inklusif dari 0.[/]"
    )

    layout = Layout()
    layout.split_column(\
        Layout(Panel(Align.center(t, vertical="middle"), border_style="#00ff41", padding=(1, 2)), ratio=4),
        Layout(size=1, name="g"),
        Layout(Panel(Align.center(note, vertical="middle"), border_style="#889b8d", padding=(0, 2)), ratio=1)
    )
    layout["g"].update("")
    return layout

def s5():
    left = Text.from_markup(
        "[bold #00ff41]Definisi[/]\n\n"
        "Forum belajar web development, Git,\n"
        "dan AI coding GRATIS untuk mahasiswa PDBI.\n"
        "Dari ide \u2192 rancangan \u2192 produk digital \n"
        "(frontend, database, auth, deploy).\n"
        "Dari 0 \u2014 tidak perlu basic coding.\n"
        "Tidak ada biaya. Tidak ada ikatan.\n\n"
        "[bold #00ff41]Metode 3+1[/]\n\n"
        "[bold white]3 Minggu:[/] Konsep \u2192 Demo AI Agent \u2192 Praktik\n"
        "[bold white]1 Minggu:[/] Video Submission\n\n"
        "[bold #00ff41]Logistik[/]\n\n"
        "Jumat, 15:30-17:30 WIB\n"
        "Lab Komputer PDBI\n"
        "Laptop + WSL + VS Code (wajib)\n"
        "PC Lab (opsi)  GRATIS"
    )
    t = Table(expand=True, box=box.SIMPLE, border_style="#00ff41")
    t.add_column("S", style="bold #00ff41")
    t.add_column("Bln", style="#00ff41")
    t.add_column("Topik", style="bold white")
    t.add_column("Project", style="dim white")
    for r in [
        ("S1", "Jun", "Navigasi & File", "Merapikan folder"),
        ("S2", "Jul", "Git & Rancangan Produk", "Blueprint produk"),
        ("S3", "Agu", "Web Dasar & Deploy", "Landing page online"),
        ("S4", "Sep", "Next.js & API", "API pertama"),
        ("S5", "Okt", "Backend & Database", "Data-driven web"),
        ("S6", "Nov", "Auth, Media & Polish", "Full-stack individual"),
        ("S7", "Des", "Kolaborasi Tim (Sprint 1)", "Working prototype"),
        ("S8", "Jan", "Produk Final & Penutup", "Deploy + warisan digital"),
    ]:
        t.add_row(*r)
    
    layout = Layout()
    layout.split_row(
        Layout(Panel(Align.center(left, vertical="middle"), title="[bold white]PENGUIN CIRCLE[/]", border_style="#00ff41", padding=(1, 2))),
        Layout(size=3, name="g"),
        Layout(Panel(Align.center(t, vertical="middle"), title="[bold white]8 SEGMEN[/]", border_style="#00ff41", padding=(1, 2)))
    )
    layout["g"].update("")
    return layout

def s6():
    wt = Table(expand=True, box=box.SIMPLE, border_style="#00ff41")
    wt.add_column("S", style="bold #00ff41")
    wt.add_column("Cheatsheet (Wajib)", style="bold white")
    for r in [
        ("S1", "5 Command Wajib Terminal"),
        ("S2", "Git 4 Langkah + Rancang Produk"),
        ("S3", "Bikin Website 5 Menit"),
        ("S4", "Apa Itu API"),
        ("S5", "Hubungin ke Database"),
        ("S6", "Debug Pakai AI"),
        ("S7", "Kerja Tim Rapi (Branch + PR)"),
        ("S8", "Recap 8 Bulan"),
    ]:
        wt.add_row(*r)

    right_text = Text.from_markup(
        "[bold #00ff41]8 Opsional (Video Tutorial)[/]\n\n"
        "[bold white]S1[/] 1 Menit Bikin Folder\n"
        "[bold white]S2[/] Git Nyelametin Project\n"
        "[bold white]S3[/] Ide ke Website Online\n"
        "[bold white]S4[/] Waiter API di Restoran\n"
        "[bold white]S5[/] Frontend Punya Otak\n"
        "[bold white]S6[/] Gak Takut Error Lagi\n"
        "[bold white]S7[/] Dua Orang Satu Project\n"
        "[bold white]S8[/] Montase 8 Bulan\n\n"
        "[bold #00ff41]Pembagian Tugas[/]\n\n"
        "[bold white]Kemahasiswaan:[/] Materi teknis, draft konten\n"
        "[bold white]Kominfo:[/] Desain poster, edit video, posting"
    )
    
    layout = Layout()
    layout.split_row(
        Layout(Panel(Align.center(wt, vertical="middle"), title="[bold white]8 KONTEN WAJIB[/]", border_style="#00ff41", padding=(1, 2))),
        Layout(size=3, name="g"),
        Layout(Panel(Align.center(right_text, vertical="middle"), title="[bold white]MSK DETAIL[/]", border_style="#00ff41", padding=(1, 2)))
    )
    layout["g"].update("")
    return layout

def s7():
    text = Text.from_markup(
        "[bold #00ff41]Proker Turunan & Kegiatan[/]\n\n"
        "[bold white]OMM[/] [dim](Proker - Sep)[/]\n"
        "  Demo CLI 15 menit + kumpulin nama calon peserta Circle\n\n"
        "[bold white]17 Agustusan[/] [yellow](Kegiatan - Agu)[/]\n"
        "  Tunjuk PJ dari anggota, supervisi jarak jauh\n\n"
        "[bold white]Makrab[/] [dim](Proker - Okt)[/]\n"
        "  Sesi sharing teknologi versi outdoor\n\n"
        "[bold white]Pekan Olahraga[/] [dim](Proker - Nov)[/]\n"
        "  Bantu sistem pendaftaran & klasemen\n\n"
        "[italic dim]Proker turunan dan kegiatan jalan BERSAMAAN.\n"
        "Prioritas: Circle dan MSK adalah inti. Sisanya didelegasikan.[/]"
    )
    return Panel(Align.center(text, vertical="middle"), border_style="#00ff41", padding=(2, 4))

def s8():
    t = Table(expand=True, box=box.SIMPLE, border_style="#00ff41")
    t.add_column("Bulan", style="bold #00ff41")
    t.add_column("Circle", style="bold white")
    t.add_column("MSK", style="#66ff66")
    t.add_column("Turunan", style="dim white")
    for r in [
        ("Mei",  "Persiapan: kurikulum, slides", "Briefing Kominfo",    "Admin himpunan"),
        ("Jun",  "S1 - Navigasi & File",         "Cheatsheet + video",  "-"),
        ("Jul",  "S2 - Git & Rancangan Produk",  "Cheatsheet + video",  "17-an (persiapan)"),
        ("Agu",  "S3 - Web Dasar & Deploy",      "Cheatsheet + video",  "OMM + 17-an"),
        ("Sep",  "S4 - Next.js & API",           "Cheatsheet + video",  "OMM lanjutan"),
        ("Okt",  "S5 - Backend & Database",      "Cheatsheet + video",  "Makrab"),
        ("Nov",  "S6 - Auth, Media & Polish",    "Cheatsheet + video",  "Por persiapan"),
        ("Des",  "S7 - Kolaborasi Tim (SPR1)",   "Cheatsheet + video",  "Por"),
        ("Jan",  "S8 - Produk Final (SPR2)",     "Cheatsheet + video",  "-"),
        ("Feb",  "Buffer: workshop lanjutan",    "Repost konten",       "-"),
        ("Mar",  "Buffer: review portofolio",    "-",                    "-"),
        ("Apr",  "Dokumentasi & regenerasi",     "Evaluasi konten",     "Evaluasi akhir"),
    ]:
        t.add_row(*r)

    note = Text.from_markup(
        "[bold #00ff41]4 FASE:[/] Fondasi (Mei-Jul)  \u2192  Branding (Agu-Sep)  "
        "\u2192  Ekspansi (Okt-Des)  \u2192  Regenerasi (Jan-Apr)"
    )

    layout = Layout()
    layout.split_column(
        Layout(Panel(Align.center(t, vertical="middle"), border_style="#00ff41", padding=(1, 2)), ratio=5),
        Layout(size=1, name="g"),
        Layout(Panel(Align.center(note, vertical="middle"), border_style="#00ff41", padding=(0, 2)), ratio=1)
    )
    layout["g"].update("")
    return layout

def s9():
    tanpa = Text.from_markup(
        "[bold #ff3355][X] Setiap tahun ngajar dari 0[/]\n"
        "[#ff3355][X] Ilmu ilang begitu lengser[/]\n"
        "[#ff3355][X] Angkatan baru bingung mulai[/]\n"
        "[#ff3355][X] Error yang sama terulang lagi[/]"
    )
    dengan = Text.from_markup(
        "[bold #00ff41][V] Angkatan depan punya referensi[/]\n"
        "[#00ff41][V] Ilmu abadi di GitHub Organisasi[/]\n"
        "[#00ff41][V] Tinggal git clone, tinggal baca[/]\n"
        "[#00ff41][V] Tips & error tercatat rapi[/]"
    )
    pilar = Text.from_markup(
        "[bold white]github.com/penguin-circle/[/]\n"
        "[#00ff41]kurikulum[/] | [#00ff41]legacy[/] | [#00ff41]template-submission[/] | [#00ff41]landing-page[/]",
        justify="center"
    )
    
    layout = Layout()
    layout.split_column(
        Layout(name="top"),
        Layout(size=1, name="g1"),
        Layout(Panel(Align.center(pilar, vertical="middle"), title="[bold #00ff41]4 PILAR[/]", border_style="#00ff41", padding=(1, 3)), ratio=1)
    )
    layout["top"].split_row(
        Layout(Panel(Align.center(tanpa, vertical="middle"), title="[bold #ff3355]TANPA WARISAN[/]", border_style="#ff3355", padding=(2, 4))),
        Layout(size=3, name="g2"),
        Layout(Panel(Align.center(dengan, vertical="middle"), title="[bold #00ff41]DENGAN WARISAN[/]", border_style="#00ff41", padding=(2, 4)))
    )
    layout["g1"].update("")
    layout["g2"].update("")
    return layout

def s10():
    url_full = "https://the-penguin-circle.vercel.app"
    url_qr = "the-penguin-circle.vercel.app"
    
    # Sisi Kiri: Teks Orisinil + Call to Action
    left_text = Text.from_markup(
        "[#00ff41]DIVISI KEMAHASISWAAN[/]\n"
        "[bold white]BUKAN DIVISI TUKANG ACARA[/]\n\n"
        "[#66ff66]Ini pusat transformasi teknologi untuk PDBI[/]\n\n"
        "Mu'adz Hudzaifah  |  @muadz_hdz\n"
        f"[#00ff41]{url_qr}[/]\n\n"
        "[bold #00ff41]Kunjungi website kami & daftar sekarang![/]\n\n"
        "[dim]Dukung proker kami. Kolaborasi untuk kemajuan PDBI.[/]\n"
        "[dim]Terbuka untuk masukan dan saran.[/]\n\n"
        "[bold #00ff41]From 0, To Hero.[/]"
    )

    # Sisi Kanan: QR Code Saja
    qr = get_qr(url_qr)
    
    layout = Layout()
    layout.split_row(
        Layout(Panel(Align.center(left_text, vertical="middle"), border_style="#00ff41", padding=(1, 2)), ratio=2),
        Layout(size=3, name="g"),
        Layout(Panel(Align.center(qr, vertical="middle"), title="[bold white]SCAN ME[/]", border_style="#00ff41", padding=(1, 2)), ratio=1)
    )
    layout["g"].update("")
    return layout

# ═══════════════════  MAIN  ═══════════════════

SLIDES = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10]

def generate_layout(num):
    layout = Layout()
    layout.split(
        Layout(size=10, name="header"),
        Layout(size=1, name="g1"),
        Layout(ratio=1, name="main"),
        Layout(size=1, name="g2"),
        Layout(size=3, name="footer")
    )
    layout["header"].update(make_header(num))
    layout["main"].update(SLIDES[num - 1]())
    layout["footer"].update(make_footer(num))
    layout["g1"].update("")
    layout["g2"].update("")
    return layout

def main():
    current = 0
    layout = generate_layout(current + 1)
    
    with Live(layout, screen=True, auto_refresh=False) as live:
        while True:
            live.update(generate_layout(current + 1))
            live.refresh()
            
            key = getch()
            if key == 'q' or key == '\x03':
                break
            elif key in ('n', '\x1b[C'):
                current = min(current + 1, TOTAL - 1)
            elif key in ('p', '\x1b[D'):
                current = max(current - 1, 0)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        pass
