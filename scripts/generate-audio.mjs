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
  text = text.replace(/```(?:terminal|console|cli|bash|sh)([\s\S]*?)```/gi, (m, code) => {
    const lines = code.trim().split('\n')
      .map(l => l.trim())
      .filter(l => l && !l.startsWith('#'))
      .map(l => l.replace(/^\$\s*/, ''));
    if (lines.length === 1) {
      return `Perintah terminal yang dijalankan: ${lines[0]}.\n\n`;
    }
    if (lines.length > 1 && lines.length <= 3) {
      return `Perintah terminal yang dijalankan meliputi: ${lines.join(', dilanjutkan dengan ')}.\n\n`;
    }
    return 'Daftar perintah terminal lengkap dapat disalin langsung dari kotak perintah pada halaman.\n\n';
  });

  // 5. Transform generic code blocks
  text = text.replace(/```[\s\S]*?```/g, 'Potongan kode atau struktur dokumen dapat Anda simak langsung pada tampilan layar.\n\n');

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

  // 8. Apply pronunciation replacements
  let fullText = intro + text;
  for (const [pattern, replacement] of PRONUNCIATION_MAP) {
    fullText = fullText.replace(pattern, replacement);
  }

  // 9. Friendly outro
  fullText += '\n\nDemikian panduan kali ini. Selamat mencoba dan semoga sukses dalam praktikum rekan-rekan.';

  // 10. Clean up extra spaces, duplicate punctuation, and multiple blank lines
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
function splitIntoChunks(text, maxChunkSize = 1500) {
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
 * Synthesizes a text chunk to an in-memory MP3 Buffer using msedge-tts with automatic retry
 */
async function synthesizeChunkWithRetry(voice, text, maxRetries = 3) {
  const safeText = escapeXml(text);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

      const buffer = await new Promise((resolve, reject) => {
        let isSettled = false;
        const timer = setTimeout(() => {
          if (!isSettled) {
            isSettled = true;
            reject(new Error('TTS socket timed out after 20s'));
          }
        }, 20000);

        try {
          const { audioStream } = tts.toStream(safeText);
          const buffers = [];
          audioStream.on('data', chunk => buffers.push(chunk));
          audioStream.on('end', () => {
            if (!isSettled) {
              isSettled = true;
              clearTimeout(timer);
              resolve(Buffer.concat(buffers));
            }
          });
          audioStream.on('error', err => {
            if (!isSettled) {
              isSettled = true;
              clearTimeout(timer);
              reject(err);
            }
          });
        } catch (e) {
          if (!isSettled) {
            isSettled = true;
            clearTimeout(timer);
            reject(e);
          }
        }
      });

      return buffer;
    } catch (err) {
      if (attempt < maxRetries) {
        console.warn(`    (Percobaan ${attempt} gagal, mencoba kembali dalam 1.5 detik: ${err.message || err})`);
        await new Promise(r => setTimeout(r, 1500));
      } else {
        throw err;
      }
    }
  }
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

  const catalog = JSON.parse(fs.readFileSync(NOTES_CATALOG, 'utf8'));
  let targetNotes = catalog;

  if (targetId) {
    targetNotes = catalog.filter(n => n.id === targetId);
    if (targetNotes.length === 0) {
      console.error(`[ERROR] Catatan dengan ID '${targetId}' tidak ditemukan di katalog.`);
      process.exit(1);
    }
  } else if (!allFlag) {
    // Default initial guides to build audio for
    const priorityIds = ['format-margin-laporan-4433', 'setup-wsl2-ubuntu-webdev'];
    targetNotes = catalog.filter(n => priorityIds.includes(n.id));
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
        const partBuffer = await synthesizeChunkWithRetry(selectedVoice, chunks[i]);
        audioParts.push(partBuffer);
        console.log(`selesai (${(partBuffer.length / 1024).toFixed(1)} KB)`);
      }

      const finalMp3 = Buffer.concat(audioParts);
      fs.writeFileSync(outFile, finalMp3);
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
