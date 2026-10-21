import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

test('catalog.json exists and is valid JSON', () => {
  const p = resolve(process.cwd(), 'catalog.json');
  assert.equal(existsSync(p), true, 'catalog.json must exist');
  const raw = readFileSync(p, 'utf-8');
  const data = JSON.parse(raw);
  assert.equal(Array.isArray(data), true, 'catalog must be an array');
  assert.ok(data.length > 0, 'catalog should have at least 1 entry');
});

test('each guide in catalog conforms to schema', () => {
  const p = resolve(process.cwd(), 'catalog.json');
  const catalog = JSON.parse(readFileSync(p, 'utf-8'));
  const ids = new Set();

  for (const guide of catalog) {
    assert.ok(guide.id, 'guide must have an id');
    assert.ok(!ids.has(guide.id), `duplicate id: ${guide.id}`);
    ids.add(guide.id);

    assert.ok(typeof guide.title === 'string' && guide.title.length > 5, `guide ${guide.id} title too short`);
    assert.ok(typeof guide.summary === 'string' && guide.summary.length > 10, `guide ${guide.id} summary too short`);
    assert.ok(typeof guide.author === 'string', `guide ${guide.id} author missing`);
    assert.ok(Array.isArray(guide.prodi_tags) && guide.prodi_tags.length > 0, `guide ${guide.id} prodi_tags missing`);
    assert.ok(typeof guide.initials === 'string' && guide.initials.length >= 2, `guide ${guide.id} initials invalid`);
  }
});
