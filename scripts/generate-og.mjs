import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicOgDir = path.join(rootDir, 'public', 'og');
const notesJsonPath = path.join(rootDir, 'notes', 'notes.json');

if (!fs.existsSync(publicOgDir)) {
  fs.mkdirSync(publicOgDir, { recursive: true });
}

// Automatically sync root notes/ and catalog.json to public/
const publicNotesDir = path.join(rootDir, 'public', 'notes');
const srcNotesDir = path.join(rootDir, 'notes');
if (fs.existsSync(srcNotesDir)) {
  fs.cpSync(srcNotesDir, publicNotesDir, { recursive: true });
}
const srcCatalog = path.join(rootDir, 'catalog.json');
const publicCatalog = path.join(rootDir, 'public', 'catalog.json');
if (fs.existsSync(srcCatalog)) {
  fs.copyFileSync(srcCatalog, publicCatalog);
}

function escapeXml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxCharsPerLine = 38) {
  const words = (text || '').split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function createOgSvg({ title, category, author, readTime, initials, tags, summary }) {
  const titleLines = wrapText(title, 34).slice(0, 3);
  const summaryLines = wrapText(summary, 58).slice(0, 2);

  const titleSvgLines = titleLines.map((line, i) => {
    return `<tspan x="80" dy="${i === 0 ? 0 : 54}">${escapeXml(line)}</tspan>`;
  }).join('');

  const summarySvgLines = summaryLines.map((line, i) => {
    return `<tspan x="80" dy="${i === 0 ? 0 : 32}">${escapeXml(line)}</tspan>`;
  }).join('');

  const tagsStr = (tags || []).slice(0, 4).map(t => `#${t}`).join('   ');
  const safeAuthor = escapeXml(author || "Mu'adz Hudzaifah");

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="#090a0d" />
    <rect width="1200" height="630" fill="url(#grid)" />

    <!-- Outer Frame -->
    <rect x="28" y="28" width="1144" height="574" rx="14" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" />
    <rect x="36" y="36" width="1128" height="558" rx="10" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1" />

    <!-- Header / Brand -->
    <g transform="translate(80, 84)">
      <!-- Mono prompt indicator -->
      <text x="0" y="20" fill="#ffffff" font-size="18" font-weight="700" font-family="'JetBrains Mono', monospace">&gt;</text>
      <text x="24" y="20" fill="#ffffff" font-size="20" font-weight="800" font-family="'JetBrains Mono', -apple-system, sans-serif" letter-spacing="2">KATAKATING</text>
      <text x="205" y="20" fill="#71717a" font-size="13" font-weight="600" font-family="'JetBrains Mono', monospace" letter-spacing="1.5">// BOASH KNOWLEDGE BASE</text>
      
      <!-- Category Badge -->
      <rect x="800" y="-2" width="240" height="30" rx="5" fill="#14151a" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
      <text x="920" y="18" fill="#e4e4e7" font-size="11" font-weight="700" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="1.5">${escapeXml((category || 'PANDUAN').toUpperCase())}</text>
    </g>

    <!-- Main Title -->
    <text x="80" y="210" fill="#ffffff" font-size="44" font-weight="800" font-family="system-ui, -apple-system, sans-serif" letter-spacing="-0.5">
      ${titleSvgLines}
    </text>

    <!-- Summary -->
    <text x="80" y="385" fill="#a1a1aa" font-size="20" font-weight="400" font-family="system-ui, -apple-system, sans-serif">
      ${summarySvgLines}
    </text>

    <!-- Divider -->
    <line x1="80" y1="465" x2="1120" y2="465" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

    <!-- Footer Area -->
    <g transform="translate(80, 502)">
      <!-- Initials Monogram -->
      <rect x="0" y="0" width="46" height="46" rx="6" fill="#14151a" stroke="rgba(255,255,255,0.2)" stroke-width="1.2" />
      <text x="23" y="29" fill="#ffffff" font-size="15" font-weight="800" font-family="'JetBrains Mono', monospace" text-anchor="middle">${escapeXml(initials || 'KK')}</text>

      <!-- Author & Metadata -->
      <text x="62" y="19" fill="#ffffff" font-size="15" font-weight="700" font-family="system-ui, sans-serif">by ${safeAuthor}</text>
      <text x="62" y="40" fill="#71717a" font-size="12" font-weight="500" font-family="'JetBrains Mono', monospace">${escapeXml(readTime || '5m baca')} // Teruji &amp; Terverifikasi</text>

      <!-- Tags & Domain -->
      <text x="1040" y="19" fill="#71717a" font-size="12" font-weight="500" font-family="'JetBrains Mono', monospace" text-anchor="end">${escapeXml(tagsStr)}</text>
      <text x="1040" y="40" fill="#ffffff" font-size="13" font-weight="700" font-family="'JetBrains Mono', monospace" text-anchor="end">katakating.vercel.app</text>
    </g>
  </svg>`;
}

function createStorySvg({ title, category, author, readTime, initials, summary }) {
  const titleLines = wrapText(title, 22).slice(0, 4);
  const summaryLines = wrapText(summary, 32).slice(0, 5);

  const titleSvgLines = titleLines.map((line, i) => {
    return `<tspan x="90" dy="${i === 0 ? 0 : 72}">${escapeXml(line)}</tspan>`;
  }).join('');

  const summarySvgLines = summaryLines.map((line, i) => {
    return `<tspan x="90" dy="${i === 0 ? 0 : 44}">${escapeXml(line)}</tspan>`;
  }).join('');

  const safeAuthor = escapeXml(author || "Mu'adz Hudzaifah");

  return `<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="storyGrid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1.5"/>
      </pattern>
    </defs>

    <rect width="1080" height="1920" fill="#090a0d" />
    <rect width="1080" height="1920" fill="url(#storyGrid)" />

    <!-- Outer Card Frame -->
    <rect x="40" y="80" width="1000" height="1760" rx="28" fill="#0d0e12" stroke="rgba(255,255,255,0.12)" stroke-width="2" />

    <!-- Top Brand Header -->
    <g transform="translate(90, 180)">
      <text x="0" y="28" fill="#ffffff" font-size="28" font-weight="900" font-family="'JetBrains Mono', monospace">&gt;</text>
      <text x="32" y="28" fill="#ffffff" font-size="28" font-weight="900" font-family="'JetBrains Mono', sans-serif" letter-spacing="2">KATAKATING</text>
      <text x="32" y="64" fill="#71717a" font-size="16" font-weight="600" font-family="'JetBrains Mono', monospace" letter-spacing="1.5">// BOASH KNOWLEDGE BASE</text>
      
      <rect x="660" y="0" width="240" height="42" rx="6" fill="#14151a" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
      <text x="780" y="27" fill="#e4e4e7" font-size="15" font-weight="800" font-family="'JetBrains Mono', monospace" text-anchor="middle">${escapeXml((category || 'PANDUAN').toUpperCase())}</text>
    </g>

    <!-- Initials Box -->
    <g transform="translate(90, 360)">
      <rect x="0" y="0" width="130" height="130" rx="16" fill="#14151a" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
      <text x="65" y="78" fill="#ffffff" font-size="44" font-weight="900" font-family="'JetBrains Mono', monospace" text-anchor="middle">${escapeXml(initials || 'KK')}</text>
    </g>

    <!-- Title -->
    <text x="90" y="610" fill="#ffffff" font-size="64" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="-1">
      ${titleSvgLines}
    </text>

    <!-- Summary Box -->
    <rect x="80" y="980" width="920" height="340" rx="16" fill="#14151a" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
    <text x="120" y="1035" fill="#71717a" font-size="16" font-weight="800" font-family="'JetBrains Mono', monospace" letter-spacing="2">// INTISARI PRAKTIKUM</text>
    <text x="120" y="1090" fill="#d4d4d8" font-size="28" font-weight="400" font-family="system-ui, sans-serif" line-height="1.6">
      ${summarySvgLines}
    </text>

    <!-- Bottom Author & CTA -->
    <g transform="translate(90, 1480)">
      <text x="0" y="40" fill="#ffffff" font-size="32" font-weight="800" font-family="system-ui, sans-serif">by ${safeAuthor}</text>
      <text x="0" y="85" fill="#71717a" font-size="20" font-weight="600" font-family="'JetBrains Mono', monospace">${escapeXml(readTime || '5m baca')} // Catatan Teruji &amp; Terkurasi</text>

      <rect x="0" y="140" width="900" height="84" rx="12" fill="#ffffff" />
      <text x="450" y="193" fill="#090a0d" font-size="22" font-weight="900" font-family="'JetBrains Mono', monospace" text-anchor="middle" letter-spacing="1">BACA LENGKAP DI KATAKATING.VERCEL.APP ↗</text>
    </g>
  </svg>`;
}

async function run() {
  console.log('[generate-og] Reading notes from:', notesJsonPath);
  let notes = [];
  try {
    const raw = fs.readFileSync(notesJsonPath, 'utf8');
    notes = JSON.parse(raw);
  } catch (err) {
    console.error('[generate-og] Failed to read notes.json:', err.message);
    process.exit(1);
  }

  // 1. Generate default site OG
  const defaultSvg = createOgSvg({
    title: 'KATAKATING — Boash Student Notes & Knowledge Hub',
    category: 'REPOSITORY',
    author: "Mu'adz Hudzaifah & Tim KataKating",
    readTime: 'Dokumentasi Teruji',
    initials: 'KK',
    tags: ['boash', 'praktikum', 'catatan', 'multimedia'],
    summary: 'Pusat catatan praktikum mandiri, panduan belajar bersama, template laporan 4-4-3-3, dan dokumentasi terbuka mahasiswa Universitas Boash.'
  });

  const defaultResvg = new Resvg(defaultSvg, { fitTo: { mode: 'width', value: 1200 } });
  fs.writeFileSync(path.join(publicOgDir, 'default.png'), defaultResvg.render().asPng());
  console.log('[generate-og] Generated default.png');

  // 2. Generate OG for each note (both 1200x630 and IG Story 1080x1920)
  for (const note of notes) {
    try {
      const ogSvg = createOgSvg(note);
      const resvg = new Resvg(ogSvg, { fitTo: { mode: 'width', value: 1200 } });
      const pngPath = path.join(publicOgDir, `${note.id}.png`);
      fs.writeFileSync(pngPath, resvg.render().asPng());

      const storySvg = createStorySvg(note);
      const resvgStory = new Resvg(storySvg, { fitTo: { mode: 'width', value: 1080 } });
      const storyPngPath = path.join(publicOgDir, `story-${note.id}.png`);
      fs.writeFileSync(storyPngPath, resvgStory.render().asPng());

      console.log(`[generate-og] Rendered: ${note.id}.png & story-${note.id}.png`);
    } catch (err) {
      console.error(`[generate-og] Error rendering for ${note.id}:`, err.message);
    }
  }

  console.log('[generate-og] All OG images generated successfully!');
}

run();
