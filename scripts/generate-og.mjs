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
      <!-- Vector Brand Logo V1 -->
      <g transform="translate(0, 0) scale(0.26)">
        <path fill="#ffffff" d="m85.51,82.22c-2.54-.14-5.14,0-7.61-.51-1.85-.39-3.86-1.28-5.23-2.55-7.26-6.74-14.36-13.66-21.47-20.56-2.28-2.21-5.01-2.51-7.4-.97-3.81,2.45-7.84,3.13-12.19,2.96-5.31-.21-10.69.09-15.93-.61-7.43-.99-14.16-8.4-15.18-15.84-.67-4.93-.83-9.86.45-14.72,1.79-6.78,9.62-14.12,17.4-14.04,5.09.05,10.19-.2,15.27.09,1.69.09,3.47,1.2,4.92,2.25,1.62,1.17,2.87,2.86,4.37,4.22,2.42,2.2,3.62,2.18,5.94-.09,4.4-4.3,8.74-8.66,13.13-12.98,2.25-2.21,4.59-4.33,6.81-6.56,1.53-1.54,3.34-2.2,5.46-2.2,4.13,0,8.27.09,12.39-.05,1.91-.06,2.9.85,3.67,2.36.8,1.57.06,2.72-.99,3.79-7.92,8.11-15.86,16.22-23.77,24.34-1.68,1.72-3.3,3.49-4.94,5.25-2.25,2.41-2.29,4.19.06,6.63,5.11,5.3,10.24,10.57,15.42,15.8,5.76,5.82,11.53,11.63,17.4,17.34,1.42,1.39,1.64,2.83,1,4.43-.64,1.61-1.98,2.28-3.8,2.13-1.72-.14-3.45-.03-5.18-.03,0,.04,0,.09,0,.13ZM20.44,38.38c-.12-4.07-1.36-6.11-3.77-6.73-3.57-.92-6.14,1.35-6.62,5.84-.31,2.91,1.83,6.15,4.46,6.74,2.36.53,4.9-1.2,5.69-3.97.22-.78.21-1.62.24-1.89Zm16.7-.34c-.13-.92-.17-1.68-.36-2.39-.72-2.77-2.62-4.32-5.07-4.21-2.46.11-4.3,1.81-4.65,4.62-.19,1.53-.12,3.15.14,4.67.31,1.78,2.69,3.56,4.48,3.53,2.2-.04,3.93-1.01,4.77-3.11.41-1.02.49-2.17.69-3.12Z"/>
        <path fill="#ffffff" d="m125.01,0c2.31.18,4.63.31,6.94.55,2.6.27,3.8,2.69,2.11,4.62-3.71,4.23-7.57,8.32-11.48,12.38-6.04,6.27-12.18,12.45-18.26,18.69-1.71,1.76-1.63,4.14.13,5.92,9.56,9.67,19.12,19.33,28.67,29.01,1.58,1.61,3.07,3.26,2.73,5.86-.35,2.57-2.24,4.59-4.84,4.66-3.06.09-6.13.16-9.18-.03-1.17-.07-2.58-.59-3.4-1.4-12.8-12.59-25.53-25.23-38.23-37.92-2.45-2.45-2.34-4.3.1-6.78,10.04-10.24,20.25-20.33,30.06-30.79C113.62,1.3,117.15-.03,121.61.15c1.13.05,2.25,0,3.38,0,0-.05,0-.1.01-.16Z"/>
      </g>
      <text x="44" y="17" fill="#ffffff" font-size="20" font-weight="800" font-family="'JetBrains Mono', -apple-system, sans-serif" letter-spacing="2">KATAKATING</text>
      <text x="225" y="17" fill="#71717a" font-size="13" font-weight="600" font-family="'JetBrains Mono', monospace" letter-spacing="1.5">// BOASH KNOWLEDGE BASE</text>
      
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

  // Also include guides from Cloudflare D1 API
  try {
    if (fs.existsSync(path.join(rootDir, '.env'))) {
      const envLines = fs.readFileSync(path.join(rootDir, '.env'), 'utf8').split('\n');
      for (const line of envLines) {
        const m = line.match(/^([^#=]+)=(.*)$/);
        if (m) {
          const k = m[1].trim();
          const v = m[2].trim().replace(/^['"](.*)['"]$/, '$1');
          if (!process.env[k]) process.env[k] = v;
        }
      }
    }
    const API_URL = process.env.PUBLIC_API_URL || 'https://katakating.pages.dev';
    const res = await fetch(`${API_URL}/api/guides`);
    if (res.ok) {
      const dbGuides = await res.json();
      if (Array.isArray(dbGuides)) {
        for (const g of dbGuides) {
          if (!notes.find(n => n.id === g.id)) {
            notes.push({
              id: g.id,
              title: g.title,
              category: g.category || 'PRAKTIKUM',
              author: g.author_name || 'Kontributor Boash',
              readTime: '5m baca',
              initials: g.initials || (g.title ? g.title.substring(0, 4).toUpperCase() : 'DOC'),
              tags: Array.isArray(g.prodi_tags) ? g.prodi_tags : ['praktikum'],
              summary: g.summary || g.title,
            });
          }
        }
      }
    }
  } catch (err) {
    // Gracefully fallback to local notes
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

  // 2. Generate OG for each note (1200x630 standard metadata)
  for (const note of notes) {
    try {
      const ogSvg = createOgSvg(note);
      const resvg = new Resvg(ogSvg, { fitTo: { mode: 'width', value: 1200 } });
      const pngPath = path.join(publicOgDir, `${note.id}.png`);
      fs.writeFileSync(pngPath, resvg.render().asPng());

      console.log(`[generate-og] Rendered: ${note.id}.png`);
    } catch (err) {
      console.error(`[generate-og] Error rendering for ${note.id}:`, err.message);
    }
  }

  console.log('[generate-og] All OG images generated successfully!');
}

run();
