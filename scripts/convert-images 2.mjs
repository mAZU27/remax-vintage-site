// ============================================================
// Responsive image builder for the premium photography set.
//
// Drop the source photos (PNG or JPG) into  public/images/  then run:
//   npm run images
//
// For every source <name>.<ext> it emits, in the same folder:
//   <name>-768.webp   <name>-1280.webp   <name>-1920.webp   (primary)
//   <name>-1280.jpg                                          (fallback)
//
// Why these formats: the photos are large PNGs. WebP is the primary
// delivery format (≈30-40% lighter than JPG at equal quality); a single
// 1280-wide JPG is the universal <picture> fallback. A PNG fallback for a
// *photograph* would be several times heavier for zero visible gain, so we
// deliberately use JPG — the correct fallback for photographic content.
//
// Generated variants (anything ending in -<width>.webp/.jpg) are skipped as
// inputs, so re-running is safe and idempotent.
// ============================================================
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const DIR = path.resolve('public/images');
const WIDTHS = [1920, 1280, 768];
const FALLBACK_WIDTH = 1280;
const WEBP = { quality: 80, effort: 6 };
const JPG = { quality: 80, mozjpeg: true };
const WARN_KB = 150; // flag any 768w webp heavier than this (per brief)

const isSource = (f) => /\.(png|jpe?g)$/i.test(f) && !/-\d+\.(webp|jpe?g)$/i.test(f);
const kb = (bytes) => (bytes / 1024).toFixed(1);

async function run() {
  let files;
  try {
    files = (await readdir(DIR)).filter(isSource).sort();
  } catch {
    console.error(`✗ Pasta não encontrada: ${DIR}\n  Cria public/images/ e coloca lá as fotografias.`);
    process.exit(1);
  }
  if (!files.length) {
    console.error(`✗ Sem fotografias-fonte em ${DIR} (esperado .png ou .jpg).`);
    process.exit(1);
  }

  console.log(`→ ${files.length} fonte(s) em public/images/\n`);
  const warnings = [];

  for (const file of files) {
    const name = file.replace(/\.(png|jpe?g)$/i, '');
    const input = path.join(DIR, file);
    const meta = await sharp(input).metadata();
    console.log(`• ${file}  (${meta.width}×${meta.height})`);

    for (const w of WIDTHS) {
      if (meta.width && w > meta.width) {
        console.log(`    ${w}w  — ignorado (fonte só tem ${meta.width}px)`);
        continue;
      }
      const out = path.join(DIR, `${name}-${w}.webp`);
      await sharp(input).resize({ width: w, withoutEnlargement: true }).webp(WEBP).toFile(out);
      const size = (await stat(out)).size;
      const flag = w === 768 && size / 1024 > WARN_KB ? '  ⚠ >150KB' : '';
      console.log(`    ${w}w  webp  ${kb(size)} KB${flag}`);
      if (flag) warnings.push(`${name}-768.webp = ${kb(size)} KB`);
    }

    const fb = path.join(DIR, `${name}-${FALLBACK_WIDTH}.jpg`);
    await sharp(input).resize({ width: FALLBACK_WIDTH, withoutEnlargement: true }).jpeg(JPG).toFile(fb);
    console.log(`    ${FALLBACK_WIDTH}w  jpg   ${kb((await stat(fb)).size)} KB  (fallback)\n`);
  }

  if (warnings.length) {
    console.log('⚠ Acima de 150 KB a 768w — comprimir mais (baixar quality ou recortar):');
    warnings.forEach((w) => console.log(`   ${w}`));
  } else {
    console.log('✓ Todas as variantes 768w abaixo de 150 KB.');
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
