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
  const titleLines = wrapText(title, 32).slice(0, 3);
  const summaryLines = wrapText(summary, 55).slice(0, 2);

  const titleSvgLines = titleLines.map((line, i) => {
    return `<tspan x="80" dy="${i === 0 ? 0 : 54}">${escapeXml(line)}</tspan>`;
  }).join('');

  const summarySvgLines = summaryLines.map((line, i) => {
    return `<tspan x="80" dy="${i === 0 ? 0 : 32}">${escapeXml(line)}</tspan>`;
  }).join('');

  const tagsStr = (tags || []).slice(0, 4).map(t => `#${t}`).join('   ');

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0b0e" />
        <stop offset="50%" stop-color="#101318" />
        <stop offset="100%" stop-color="#07080a" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>
      </pattern>
      <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4ade80" stop-opacity="0.8" />
        <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.8" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bgGrad)" />
    <rect width="1200" height="630" fill="url(#grid)" />

    <!-- Outer Tech Frame -->
    <rect x="24" y="24" width="1152" height="582" rx="20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
    <rect x="26" y="26" width="1148" height="578" rx="18" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" />

    <!-- Top Accent Bar -->
    <rect x="24" y="24" width="1152" height="4" fill="url(#glow)" rx="2" />

    <!-- Header / Brand -->
    <g transform="translate(80, 80)">
      <rect x="0" y="0" width="10" height="24" fill="#4ade80" rx="2" />
      <text x="22" y="19" fill="#ffffff" font-size="20" font-weight="800" font-family="system-ui, -apple-system, sans-serif" letter-spacing="2">KATAKATING</text>
      <text x="180" y="19" fill="#71717a" font-size="14" font-weight="600" font-family="monospace" letter-spacing="1.5">// BOASH KNOWLEDGE HUB</text>
      
      <!-- Category Badge -->
      <rect x="800" y="-4" width="240" height="32" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
      <text x="920" y="17" fill="#e4e4e7" font-size="12" font-weight="700" font-family="system-ui, sans-serif" text-anchor="middle" letter-spacing="1">${escapeXml(category || 'PANDUAN')}</text>
    </g>

    <!-- Main Title -->
    <text x="80" y="200" fill="#f4f4f5" font-size="44" font-weight="800" font-family="system-ui, -apple-system, sans-serif" letter-spacing="-0.5">
      ${titleSvgLines}
    </text>

    <!-- Summary -->
    <text x="80" y="380" fill="#a1a1aa" font-size="20" font-weight="400" font-family="system-ui, -apple-system, sans-serif" line-height="1.5">
      ${summarySvgLines}
    </text>

    <!-- Divider -->
    <line x1="80" y1="465" x2="1120" y2="465" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

    <!-- Footer Area -->
    <g transform="translate(80, 500)">
      <!-- Initials Monogram -->
      <rect x="0" y="0" width="48" height="48" rx="8" fill="#18181b" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
      <text x="24" y="30" fill="#4ade80" font-size="16" font-weight="800" font-family="monospace" text-anchor="middle">${escapeXml(initials || 'KT')}</text>

      <!-- Author & Metadata -->
      <text x="64" y="20" fill="#ffffff" font-size="16" font-weight="700" font-family="system-ui, sans-serif">by ${escapeXml(author || 'Mahasiswa Boash')}</text>
      <text x="64" y="42" fill="#71717a" font-size="13" font-weight="500" font-family="monospace">${escapeXml(readTime || '5m baca')} • Teruji &amp; Terverifikasi</text>

      <!-- Tags & Domain -->
      <text x="1040" y="20" fill="#a1a1aa" font-size="13" font-weight="600" font-family="monospace" text-anchor="end">${escapeXml(tagsStr)}</text>
      <text x="1040" y="42" fill="#4ade80" font-size="14" font-weight="700" font-family="monospace" text-anchor="end">katakating.vercel.app</text>
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

  return `<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="storyBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#090a0d" />
        <stop offset="40%" stop-color="#12151b" />
        <stop offset="100%" stop-color="#050608" />
      </linearGradient>
      <pattern id="storyGrid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1.5"/>
      </pattern>
      <linearGradient id="storyGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#4ade80" />
        <stop offset="100%" stop-color="#38bdf8" />
      </linearGradient>
    </defs>

    <rect width="1080" height="1920" fill="url(#storyBg)" />
    <rect width="1080" height="1920" fill="url(#storyGrid)" />

    <!-- Tech Border Card -->
    <rect x="40" y="80" width="1000" height="1760" rx="36" fill="rgba(16,18,24,0.7)" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
    <rect x="40" y="80" width="1000" height="8" fill="url(#storyGlow)" rx="4" />

    <!-- Top Badge -->
    <g transform="translate(90, 180)">
      <rect x="0" y="0" width="12" height="32" fill="#4ade80" rx="3" />
      <text x="28" y="26" fill="#ffffff" font-size="28" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="2">KATAKATING</text>
      <text x="28" y="60" fill="#71717a" font-size="18" font-weight="600" font-family="monospace">// BOASH KNOWLEDGE HUB</text>
      
      <rect x="660" y="0" width="240" height="44" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
      <text x="780" y="28" fill="#e4e4e7" font-size="16" font-weight="800" font-family="system-ui, sans-serif" text-anchor="middle">${escapeXml(category || 'PANDUAN')}</text>
    </g>

    <!-- Big Center Monogram Box -->
    <g transform="translate(90, 360)">
      <rect x="0" y="0" width="140" height="140" rx="24" fill="#18181b" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
      <text x="70" y="84" fill="#4ade80" font-size="44" font-weight="900" font-family="monospace" text-anchor="middle">${escapeXml(initials || 'KT')}</text>
    </g>

    <!-- Title -->
    <text x="90" y="620" fill="#ffffff" font-size="64" font-weight="900" font-family="system-ui, sans-serif" letter-spacing="-1">
      ${titleSvgLines}
    </text>

    <!-- Summary Box -->
    <rect x="80" y="980" width="920" height="340" rx="20" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
    <text x="120" y="1035" fill="#4ade80" font-size="18" font-weight="800" font-family="monospace" letter-spacing="2">// INTISARI PRAKTIKUM</text>
    <text x="120" y="1090" fill="#d4d4d8" font-size="28" font-weight="400" font-family="system-ui, sans-serif" line-height="1.6">
      ${summarySvgLines}
    </text>

    <!-- Bottom Author & CTA -->
    <g transform="translate(90, 1480)">
      <text x="0" y="40" fill="#ffffff" font-size="32" font-weight="800" font-family="system-ui, sans-serif">by ${escapeXml(author || 'Mahasiswa Boash')}</text>
      <text x="0" y="85" fill="#a1a1aa" font-size="22" font-weight="600" font-family="monospace">${escapeXml(readTime || '5m baca')} • Catatan Teruji &amp; Terkurasi</text>

      <rect x="0" y="140" width="900" height="90" rx="18" fill="#ffffff" />
      <text x="450" y="196" fill="#090a0d" font-size="26" font-weight="900" font-family="system-ui, sans-serif" text-anchor="middle" letter-spacing="1">BACA LENGKAP DI KATAKATING.VERCEL.APP ↗</text>
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
    author: 'Mahasiswa Universitas Boash',
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
