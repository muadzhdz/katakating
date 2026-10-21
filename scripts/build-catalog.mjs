import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CATALOG_PATH = resolve(process.cwd(), 'catalog.json');

if (!existsSync(CATALOG_PATH)) {
  console.error('Error: catalog.json not found');
  process.exit(1);
}

const raw = readFileSync(CATALOG_PATH, 'utf-8');
const catalog = JSON.parse(raw);

if (!Array.isArray(catalog)) {
  console.error('Error: catalog.json must be an array of guides');
  process.exit(1);
}

const ids = new Set();
const allowedCategories = ['systems-network', 'web-software', 'multimedia-3d', 'iot-hardware', 'mkdu-fondasi'];

for (const item of catalog) {
  if (!item.id || typeof item.id !== 'string') {
    throw new Error(`Invalid or missing ID in item: ${JSON.stringify(item)}`);
  }
  if (ids.has(item.id)) {
    throw new Error(`Duplicate ID found: ${item.id}`);
  }
  ids.add(item.id);

  if (!item.title || !item.summary || !item.author) {
    throw new Error(`Missing required fields in item: ${item.id}`);
  }
  if (!allowedCategories.includes(item.category)) {
    throw new Error(`Invalid category "${item.category}" in item: ${item.id}. Allowed: ${allowedCategories.join(', ')}`);
  }
  if (!Array.isArray(item.prodi_tags) || item.prodi_tags.length === 0) {
    throw new Error(`prodi_tags must be a non-empty array in item: ${item.id}`);
  }
}

console.log(`[>] Catalog verified successfully: ${catalog.length} guides loaded across categories.`);
