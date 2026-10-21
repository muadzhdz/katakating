// scripts/seed-d1.mjs
import fs from 'node:fs';
import path from 'node:path';

function escapeSql(str) {
  if (str === null || str === undefined) return "''";
  return "'" + String(str).replace(/'/g, "''") + "'";
}

const rootDir = process.cwd();
const notesJsonPath = path.join(rootDir, 'notes', 'notes.json');
const catalogJsonPath = path.join(rootDir, 'catalog.json');
const migrationSqlPath = path.join(rootDir, 'supabase', 'migrations', '20260923000000_create_readme_schema.sql');

const guides = new Map();

// 1. Load catalog.json
if (fs.existsSync(catalogJsonPath)) {
  const catalog = JSON.parse(fs.readFileSync(catalogJsonPath, 'utf8'));
  for (const item of catalog) {
    guides.set(item.id, {
      id: item.id,
      title: item.title,
      summary: item.summary,
      content: item.content || item.summary,
      author_name: item.author || 'Mu\'adz Hudzaifah',
      author_npm: item.npm || '24903460014',
      category: item.category || 'Umum',
      prodi_tags: JSON.stringify(item.prodi_tags || ['TRM']),
      semester: item.semester || 1,
      initials: item.initials || 'DOC',
      accent: item.accent || '#00ff66',
      video_url: item.video_url || '',
      diagram_url: item.diagram_url || '',
      views_count: item.views || 50,
      copy_count: item.copies || 12,
      created_at: '2026-09-23 10:00:00'
    });
  }
}

// 2. Extract full content from supabase migration seed if available
if (fs.existsSync(migrationSqlPath)) {
  const sql = fs.readFileSync(migrationSqlPath, 'utf8');
  // Simple regex or parse values
  for (const [id, guide] of guides.entries()) {
    const match = sql.indexOf(`'${id}'`);
    if (match !== -1) {
      // Find content inside the tuple
      const sub = sql.slice(match, match + 2000);
      const parts = sub.split("',\n  '");
      if (parts.length >= 4) {
        // parts[0]: id, parts[1]: title, parts[2]: summary, parts[3]: content
        const rawContent = parts[3].split("',\n  '")[0];
        if (rawContent && rawContent.length > 20) {
          guide.content = rawContent.replace(/''/g, "'");
        }
      }
    }
  }
}

// 3. Load notes/notes.json and markdown files (highest quality source of truth)
if (fs.existsSync(notesJsonPath)) {
  const notes = JSON.parse(fs.readFileSync(notesJsonPath, 'utf8'));
  for (const item of notes) {
    let mdContent = '';
    const mdPath = path.join(rootDir, 'notes', item.file || `${item.id}.md`);
    if (fs.existsSync(mdPath)) {
      mdContent = fs.readFileSync(mdPath, 'utf8');
    } else {
      mdContent = item.summary || item.title;
    }

    guides.set(item.id, {
      id: item.id,
      title: item.title,
      summary: item.summary,
      content: mdContent,
      author_name: item.author || 'Mahasiswa Boash',
      author_npm: item.npm || '24903460014',
      category: item.category || 'Praktikum',
      prodi_tags: JSON.stringify(item.tags || ['praktikum']),
      semester: item.semester || 1,
      initials: item.initials || 'DOC',
      accent: '#00ff66',
      video_url: '',
      diagram_url: '',
      views_count: 120,
      copy_count: 35,
      created_at: item.date ? `${item.date} 10:00:00` : '2026-10-19 10:00:00'
    });
  }
}

console.log(`[seed-d1] Collected ${guides.size} master guides for D1.`);

const sqlLines = [];
sqlLines.push('-- D1 Seed SQL Generated automatically');

for (const g of guides.values()) {
  sqlLines.push(`
INSERT INTO guides (
  id, title, summary, content, author_name, author_npm, category, prodi_tags, semester, initials, accent, video_url, diagram_url, views_count, copy_count, created_at, updated_at
) VALUES (
  ${escapeSql(g.id)},
  ${escapeSql(g.title)},
  ${escapeSql(g.summary)},
  ${escapeSql(g.content)},
  ${escapeSql(g.author_name)},
  ${escapeSql(g.author_npm)},
  ${escapeSql(g.category)},
  ${escapeSql(g.prodi_tags)},
  ${g.semester},
  ${escapeSql(g.initials)},
  ${escapeSql(g.accent)},
  ${escapeSql(g.video_url)},
  ${escapeSql(g.diagram_url)},
  ${g.views_count},
  ${g.copy_count},
  ${escapeSql(g.created_at)},
  ${escapeSql(g.created_at)}
) ON CONFLICT(id) DO UPDATE SET
  title = excluded.title,
  summary = excluded.summary,
  content = excluded.content,
  author_name = excluded.author_name,
  category = excluded.category,
  prodi_tags = excluded.prodi_tags,
  initials = excluded.initials,
  updated_at = datetime('now');
`);
}

// Also seed a verified admin profile in profiles table
sqlLines.push(`
INSERT INTO profiles (
  id, email, full_name, avatar_url, github_username, nim, prodi, role, created_at, updated_at
) VALUES (
  'admin-katakating',
  'katakating@gmail.com',
  'Admin KataKating',
  '',
  'muadzhdz',
  'ADMIN-01',
  'Pengelola KataKating',
  'admin',
  datetime('now'),
  datetime('now')
) ON CONFLICT(id) DO UPDATE SET
  role = 'admin';
`);

const outPath = path.join(rootDir, 'd1', 'seed.sql');
fs.writeFileSync(outPath, sqlLines.join('\n'), 'utf8');
console.log(`[seed-d1] Successfully written seed SQL to: ${outPath}`);
