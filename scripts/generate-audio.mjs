#!/usr/bin/env node
/**
 * scripts/generate-audio.mjs
 * KataKating - AI Neural Text-to-Speech Generation Pipeline
 * Uses Microsoft Edge Neural TTS (msedge-tts) with Indonesian Neural Voices:
 * - id-ID-ArdiNeural (Male, senior kating mentor tone)
 * - id-ID-GadisNeural (Female, clear educator tone)
 * Outputs optimized 24kHz 48kbps mono MP3 to public/audio/<id>.mp3
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const AUDIO_DIR = path.join(rootDir, 'public', 'audio');
const NOTES_CATALOG = path.join(rootDir, 'notes', 'notes.json');
const NOTES_DIR = path.join(rootDir, 'notes');

// Default Voice: Ardi (natural Indonesian male mentor)
const DEFAULT_VOICE = 'id-ID-ArdiNeural';

// Parse command line flags
const args = process.argv.slice(2);
const forceFlag = args.includes('--force');
const allFlag = args.includes('--all');
const targetIdArg = args.find(a => a.startsWith('--id='));
const targetId = targetIdArg ? targetIdArg.split('=')[1] : null;
const voiceArg = args.find(a => a.startsWith('--voice='));
const selectedVoice = voiceArg ? voiceArg.split('=')[1] : DEFAULT_VOICE;

// Pronunciation dictionary for Indonesian tech & academic terms
const PRONUNCIATION_MAP = [
  [/4-4-3-3/g, 'empat, empat, tiga, tiga'],
  [/WSL2/g, 'W S L dua'],
  [/WSL/g, 'W S L'],
  [/Ubuntu\s*24\.04/gi, 'Ubuntu dua puluh empat titik nol empat'],
  [/Ubuntu\s*22\.04/gi, 'Ubuntu dua puluh dua titik nol empat'],
  [/VS\s*Code/gi, 'V S Code'],
  [/Visual\s*Studio\s*Code/gi, 'Visual Studio Code'],
  [/Node\.js/gi, 'Node J S'],
  [/NVM/g, 'N V M'],
  [/PHP/g, 'P H P'],
  [/HTML/g, 'H T M L'],
  [/CSS/g, 'C S S'],
  [/JavaScript/gi, 'JavaScript'],
  [/TypeScript/gi, 'TypeScript'],
  [/JSON/g, 'J S O N'],
  [/API/g, 'A P I'],
  [/CLI/g, 'C L I'],
  [/GUI/g, 'G U I'],
  [/URL/g, 'U R L'],
  [/HTTP/g, 'H T T P'],
  [/HTTPS/g, 'H T T P S'],
  [/SQL/gi, 'S Q L'],
  [/MySQL/gi, 'My S Q L'],
  [/PostgreSQL/gi, 'Postgre S Q L'],
  [/SQLite/gi, 'S Q Light'],
  [/D1\b/g, 'D satu'],
  [/TA\b/g, 'Tugas Akhir'],
  [/PKL\b/g, 'P K L'],
  [/TRM\b/g, 'T R M'],
  [/LKM\b/g, 'L K M'],
  [/KRS\b/g, 'K R S'],
  [/KTM\b/g, 'K T M'],
  [/BIOS\/UEFI/gi, 'Bios atau U E F I'],
  [/BIOS/gi, 'Bios'],
  [/UEFI/gi, 'U E F I'],
  [/VT-x\s*\/\s*AMD-V/gi, 'V T x atau A M D V'],
  [/VT-x/gi, 'V T x'],
  [/AMD-V/gi, 'A M D V'],
  [/(\d+)\s*cm\b/gi, '$1 sentimeter'],
  [/(\d+)\s*pt\b/gi, '$1 poin'],
  [/(\d+)\s*mm\b/gi, '$1 milimeter'],
  [/(\d+)\s*GB\b/gi, '$1 giga byte'],
  [/(\d+)\s*MB\b/gi, '$1 mega byte'],
  [/(\d+)\s*kbps\b/gi, '$1 kilobit per detik'],
  [/v(\d+)\.(\d+)\.(\d+)/gi, 'versi $1 titik $2 titik $3'],
  [/v(\d+)\.(\d+)/gi, 'versi $1 titik $2'],
  [/--version/g, 'minus minus version'],
  [/--install/g, 'minus minus install'],
  [/--lts/g, 'minus minus L T S'],
  [/&bull;/g, ' '],
  [/&mdash;/g, ' - '],
  [/&&/g, ' dan '],
  [/&amp;/g, ' dan '],
  [/&/g, ' dan '],
  [/ > /g, ', lalu '],
  [/\s*>\s*/g, ' '],
];

/**
 * Escapes XML special characters for safe inclusion in SSML <speak> blocks
 */
function escapeXml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Sanitizes markdown content into natural, conversational Indonesian speech
 */
function sanitizeMarkdownToSpeech(rawContent, meta = {}) {
  // 1. Strip Frontmatter
  let text = rawContent.replace(/^---[\s\S]*?---/, '').trim();

  // 2. Build friendly spoken intro
  const title = meta.title || '';
  const author = meta.author || 'Kating Boash';
  const summary = meta.summary || '';
  
  let intro = `Panduan Kata Kating Boash. Judul: ${title}. `;
  if (author) intro += `Disusun oleh ${author}. `;
  if (summary) intro += `${summary} `;
  intro += 'Berikut adalah uraian panduan lengkapnya.\n\n';

  // 3. Transform Callouts into spoken announcements
  text = text.replace(/>\s*\[!KATING\]\s*\n?([\s\S]*?)(?=\n\n|\n(?=[^>])|$)/gi, (m, c) => {
    const clean = c.replace(/^>\s*/gm, '').trim();
    return `Tips praktis dari kating: ${clean}.\n\n`;
  });
  text = text.replace(/>\s*\[!STANDAR\]\s*\n?([\s\S]*?)(?=\n\n|\n(?=[^>])|$)/gi, (m, c) => {
    const clean = c.replace(/^>\s*/gm, '').trim();
    return `Standar pedoman laporan: ${clean}.\n\n`;
  });
  text = text.replace(/>\s*\[!(?:ERROR|WARNING|CAUTION)\]\s*\n?([\s\S]*?)(?=\n\n|\n(?=[^>])|$)/gi, (m, c) => {
    const clean = c.replace(/^>\s*/gm, '').trim();
    return `Peringatan error penting: ${clean}.\n\n`;
  });
  text = text.replace(/>\s*\[!(?:NOTE|INFO|TIP)\]\s*\n?([\s\S]*?)(?=\n\n|\n(?=[^>])|$)/gi, (m, c) => {
    const clean = c.replace(/^>\s*/gm, '').trim();
    return `Catatan penting: ${clean}.\n\n`;
  });

  // 4. Transform terminal / CLI blocks into polite summaries
  text = text.replace(/```(?:terminal|console|cli|bash|sh|powershell|cmd)([\s\S]*?)```/gi, (m, code) => {
    const lines = code.trim().split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#') && !l.startsWith('//'))
      .map(l => l.replace(/^\$\s*/, ''));
    if (lines.length === 1 && lines[0].length < 60) {
      return `Perintah terminal yang dijalankan: ${lines[0]}.\n\n`;
    }
    return 'Langkah ini menjalankan perintah terminal yang dapat langsung disimak pada halaman panduan.\n\n';
  });

  // 5. Transform tables and remaining code blocks
  text = text.replace(/\|[^\n]+\|\n\|[-:| ]+\|\n(?:\|[^\n]+\|\n?)+/g, '\nRincian tabel parameter dapat disimak langsung pada catatan.\n\n');
  text = text.replace(/\|/g, ', ');
  text = text.replace(/<[^>]+>/g, '');
  text = text.replace(/```[\s\S]*?```/g, 'Potongan kode atau konfigurasi dapat disimak langsung pada tampilan layar.\n\n');

  // 6. Headings into natural spoken section transitions
  text = text.replace(/^##\s+(?:(\d+(?:\.\d+)*)\.?\s*)?(.+)$/gm, (m, num, hText) => {
    const cleanTitle = hText.replace(/[*_`]/g, '').trim();
    return `\nBagian ${num ? num + ', ' : ''}${cleanTitle}.\n`;
  });
  text = text.replace(/^###\s+(?:(\d+(?:\.\d+)*)\.?\s*)?(.+)$/gm, (m, num, hText) => {
    const cleanTitle = hText.replace(/[*_`]/g, '').trim();
    return `\nLangkah ${num ? num + ', ' : ''}${cleanTitle}.\n`;
  });
  text = text.replace(/^####+\s+(.+)$/gm, (m, hText) => {
    return `${hText.replace(/[*_`]/g, '').trim()}.\n`;
  });

  // 7. Lists & inline markup
  text = text.replace(/^\s*[\*\-]\s+/gm, 'Poin: ');
  text = text.replace(/^\s*\d+\.\s+/gm, 'Langkah: ');
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/`([^`]+)`/g, '$1');
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/^>\s*/gm, '');

  // 8. If text is excessively long (over 4000 chars), condense to high-yield audio guide (~3-5 mins)
  if (text.length > 4000) {
    const paragraphs = text.split('\n\n').map(p => p.trim()).filter(Boolean);
    const keyParagraphs = [];
    for (const p of paragraphs) {
      if (
        p.startsWith('Bagian') ||
        p.startsWith('Langkah') ||
        p.includes('Tips praktis') ||
        p.includes('Peringatan') ||
        p.includes('Catatan penting') ||
        p.includes('Solusi') ||
        p.includes('Tujuan') ||
        keyParagraphs.length < 4
      ) {
        keyParagraphs.push(p);
      }
    }
    text = keyParagraphs.join('\n\n');
  }

  // 9. Apply pronunciation replacements
  let fullText = intro + text;
  for (const [pattern, replacement] of PRONUNCIATION_MAP) {
    fullText = fullText.replace(pattern, replacement);
  }

  // 10. Friendly outro
  fullText += '\n\nDemikian panduan kali ini. Selamat mencoba dan semoga sukses dalam praktikum rekan-rekan.';

  // 11. Clean up extra spaces, duplicate punctuation, and multiple blank lines
  fullText = fullText
    .replace(/[ \t]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\.{2,}/g, '.')
    .replace(/,\s*,/g, ',')
    .trim();

  return fullText;
}

/**
 * Splits long text into chunks of <= maxChunkSize characters at paragraph or sentence boundaries
 */
function splitIntoChunks(text, maxChunkSize = 900) {
  if (text.length <= maxChunkSize) return [text];

  const chunks = [];
  const paragraphs = text.split('\n\n');
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    if ((currentChunk + '\n\n' + paragraph).length <= maxChunkSize) {
      currentChunk = currentChunk ? `${currentChunk}\n\n${paragraph}` : paragraph;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      
      // If single paragraph is larger than maxChunkSize, split by sentence
      if (paragraph.length > maxChunkSize) {
        const sentences = paragraph.split(/(?<=[.?!])\s+/);
        let sentChunk = '';
        for (const sentence of sentences) {
          if ((sentChunk + ' ' + sentence).length <= maxChunkSize) {
            sentChunk = sentChunk ? `${sentChunk} ${sentence}` : sentence;
          } else {
            if (sentChunk) chunks.push(sentChunk);
            sentChunk = sentence;
          }
        }
        if (sentChunk) currentChunk = sentChunk;
        else currentChunk = '';
      } else {
        currentChunk = paragraph;
      }
    }
  }

  if (currentChunk) chunks.push(currentChunk);
  return chunks;
}

/**
 * Synthesizes a text chunk to an in-memory MP3 Buffer using a dedicated fresh msedge-tts connection
 */
async function synthesizeChunk(text, voice = selectedVoice, maxIdleMs = 20000, maxTotalMs = 120000) {
  const safeText = escapeXml(text);
  const tts = new MsEdgeTTS({ connectionTimeoutMs: 15000, synthesisTimeoutMs: maxTotalMs });
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  return new Promise((resolve, reject) => {
    let isSettled = false;
    let idleTimer = null;
    const totalTimer = setTimeout(() => {
      if (!isSettled) {
        isSettled = true;
        clearTimeout(idleTimer);
        try { tts.close(); } catch(e){}
        reject(new Error(`TTS stream total timeout of ${maxTotalMs / 1000}s exceeded`));
      }
    }, maxTotalMs);

    const resetIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(totalTimer);
          try { tts.close(); } catch(e){}
          reject(new Error(`TTS idle timeout (${maxIdleMs / 1000}s without data)`));
        }
      }, maxIdleMs);
    };

    resetIdle();

    try {
      const { audioStream } = tts.toStream(safeText);
      const buffers = [];
      audioStream.on('data', chunk => {
        resetIdle();
        buffers.push(chunk);
      });
      audioStream.on('end', () => {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(idleTimer);
          clearTimeout(totalTimer);
          try { tts.close(); } catch(e){}
          resolve(Buffer.concat(buffers));
        }
      });
      audioStream.on('error', err => {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(idleTimer);
          clearTimeout(totalTimer);
          try { tts.close(); } catch(e){}
          reject(err);
        }
      });
    } catch (e) {
      if (!isSettled) {
        isSettled = true;
        clearTimeout(idleTimer);
        clearTimeout(totalTimer);
        try { tts.close(); } catch(e){}
        reject(e);
      }
    }
  });
}

/**
 * Main execution loop
 */
async function main() {
  console.log('[KATAKATING TTS] Inisialisasi pipeline audio neural...');
  console.log(`[KATAKATING TTS] Suara aktif: ${selectedVoice}`);
  console.log(`[KATAKATING TTS] Format: 24kHz 48kbps Mono MP3`);

  // Ensure public/audio directory exists
  if (!fs.existsSync(AUDIO_DIR)) {
    fs.mkdirSync(AUDIO_DIR, { recursive: true });
  }

  // Read catalog
  if (!fs.existsSync(NOTES_CATALOG)) {
    console.error(`[ERROR] File katalog catatan tidak ditemukan: ${NOTES_CATALOG}`);
    process.exit(1);
  }

  let catalog = JSON.parse(fs.readFileSync(NOTES_CATALOG, 'utf8'));

  // Also discover approved guides from Cloudflare D1 API if reachable
  try {
    const API_URL = process.env.PUBLIC_API_URL || 'https://katakating.pages.dev';
    const res = await fetch(`${API_URL}/api/guides`, { signal: AbortSignal.timeout(3500) });
    if (res.ok) {
      const dbGuides = await res.json();
      if (Array.isArray(dbGuides)) {
        for (const g of dbGuides) {
          if (!catalog.find(n => n.id === g.id)) {
            const hasLocalFile = fs.existsSync(path.join(NOTES_DIR, `${g.id}.md`));
            const hasContent = g.content && g.content.length > 200 && g.content !== g.summary;
            if (hasLocalFile || hasContent) {
              // If markdown file doesn't exist locally yet, write it so it can be synthesized
              if (!hasLocalFile && hasContent) {
                fs.writeFileSync(path.join(NOTES_DIR, `${g.id}.md`), g.content, 'utf8');
              }
              catalog.push({
                id: g.id,
                title: g.title,
                category: g.category || 'Praktikum',
                author: g.author_name || 'Kontributor Boash',
                summary: g.summary || g.title,
                file: `${g.id}.md`
              });
            }
          }
        }
      }
    }
  } catch (e) {
    // Graceful offline fallback
  }

  let targetNotes = catalog;

  if (targetId) {
    targetNotes = catalog.filter(n => n.id === targetId);
    if (targetNotes.length === 0) {
      console.error(`[ERROR] Catatan dengan ID '${targetId}' tidak ditemukan di katalog.`);
      process.exit(1);
    }
  }

  console.log(`[KATAKATING TTS] Memproses ${targetNotes.length} catatan...`);

  let generatedCount = 0;
  let skippedCount = 0;

  for (const note of targetNotes) {
    const outFile = path.join(AUDIO_DIR, `${note.id}.mp3`);
    const noteFilePath = path.join(NOTES_DIR, note.file || `${note.id}.md`);

    if (!fs.existsSync(noteFilePath)) {
      console.warn(`[SKIP] Naskah markdown untuk '${note.id}' tidak ditemukan di ${noteFilePath}`);
      continue;
    }

    const noteStat = fs.statSync(noteFilePath);
    if (!forceFlag && fs.existsSync(outFile)) {
      const outStat = fs.statSync(outFile);
      // Skip if output is newer than markdown file
      if (outStat.mtimeMs > noteStat.mtimeMs && outStat.size > 1000) {
        console.log(`[CACHE HIT] Audio untuk '${note.id}' sudah mutakhir (${(outStat.size / 1024).toFixed(1)} KB). Gunakan --force untuk render ulang.`);
        skippedCount++;
        continue;
      }
    }

    console.log(`\n[SYNTHESIZING] ${note.id} ("${note.title}")`);
    const rawContent = fs.readFileSync(noteFilePath, 'utf8');
    const spokenText = sanitizeMarkdownToSpeech(rawContent, note);
    const chunks = splitIntoChunks(spokenText);

    console.log(`  - Panjang naskah lisan: ${spokenText.length} karakter (${chunks.length} bagian)`);
    const startTime = Date.now();

    try {
      const audioParts = [];
      for (let i = 0; i < chunks.length; i++) {
        process.stdout.write(`  - Mengirim bagian ${i + 1}/${chunks.length} ke neural engine... `);
        let partBuffer = null;
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            partBuffer = await synthesizeChunk(chunks[i], selectedVoice, 25000);
            break;
          } catch (err) {
            console.warn(`\n    (percobaan ${attempt} gagal: ${err.message})`);
            await new Promise(r => setTimeout(r, 1200));
          }
        }
        if (!partBuffer) {
          throw new Error(`Gagal sintesis bagian ${i + 1}`);
        }
        audioParts.push(partBuffer);
        console.log(`selesai (${(partBuffer.length / 1024).toFixed(1)} KB)`);
      }

      const finalMp3 = Buffer.concat(audioParts);
      fs.writeFileSync(outFile, finalMp3);

      // Also copy to dist/audio if dist exists
      const distAudioDir = path.join(rootDir, 'dist', 'audio');
      if (fs.existsSync(distAudioDir)) {
        fs.writeFileSync(path.join(distAudioDir, `${note.id}.mp3`), finalMp3);
      }

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const sizeKb = (finalMp3.length / 1024).toFixed(1);

      console.log(`  [SUCCESS] Berhasil disimpan di public/audio/${note.id}.mp3 (${sizeKb} KB dalam ${elapsed}s)`);
      generatedCount++;
    } catch (err) {
      console.error(`  [ERROR] Gagal memproses audio untuk '${note.id}':`, err.message || err);
    }
  }

  console.log(`\n========================================`);
  console.log(`[KATAKATING TTS] Ringkasan: ${generatedCount} dibuat, ${skippedCount} lewati cache.`);
  console.log(`========================================\n`);
}

main().catch(err => {
  console.error('[FATAL ERROR]', err);
  process.exit(1);
});
