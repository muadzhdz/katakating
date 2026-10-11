import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const tmpDir = '/tmp/katakating-docx-template';
fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(path.join(tmpDir, '_rels'), { recursive: true });
fs.mkdirSync(path.join(tmpDir, 'word', '_rels'), { recursive: true });

const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

const dotRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

const docRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`;

const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading1"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t>LAPORAN PRAKTIKUM UNIVERSITAS BOASH</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>Judul Modul Praktikum</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Nama Penulis: [Nama Lengkap Anda]</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>NIM: [24903460014]</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Kategori: Akademik &amp; Laporan</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t>BAB I: TUJUAN PRAKTIKUM</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>1. Memahami konsep dasar modul praktikum.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>2. Mampu mempraktikkan pengujian teknis secara mandiri.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t>BAB II: LANGKAH-LANGKAH KERJA</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Langkah 1: Buka terminal dan lakukan konfigurasi awal.</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Langkah 2: Jalankan pengujian modul dan catat hasilnya.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:rPr><w:b/></w:rPr><w:t>BAB III: KESIMPULAN</w:t></w:r>
    </w:p>
    <w:p>
      <w:r><w:t>Praktikum berhasil diselesaikan sesuai spesifikasi modul.</w:t></w:r>
    </w:p>
  </w:body>
</w:document>`;

fs.writeFileSync(path.join(tmpDir, '[Content_Types].xml'), contentTypes);
fs.writeFileSync(path.join(tmpDir, '_rels', '.rels'), dotRels);
fs.writeFileSync(path.join(tmpDir, 'word', '_rels', 'document.xml.rels'), docRels);
fs.writeFileSync(path.join(tmpDir, 'word', 'document.xml'), documentXml);

const targetDocx = path.resolve('public', 'templates', 'template-laporan-praktikum.docx');
execSync(`cd "${tmpDir}" && zip -r -q "${targetDocx}" .`);
console.log('Successfully created:', targetDocx);
