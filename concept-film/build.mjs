// Builds the self-contained film page and (optionally) renders it to MP4.
//   npm install && node build.mjs            -> dist/bondi-for-parents.html
//   node build.mjs --render [--fps 30]       -> also dist/bondi-for-parents.mp4 (needs ffmpeg)
//   node build.mjs --stills 2,9,17           -> PNG stills at those seconds (for review)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, 'dist');
mkdirSync(dist, { recursive: true });
const args = process.argv.slice(2);
const opt = k => { const i = args.indexOf(k); return i < 0 ? null : (args[i + 1] ?? true); };

const font = (pkg, file, family, weight) => {
  const b64 = readFileSync(path.join(here, 'node_modules/@fontsource', pkg, 'files', file)).toString('base64');
  return `@font-face{font-family:${family};font-weight:${weight};font-style:normal;font-display:block;src:url(data:font/woff2;base64,${b64}) format('woff2')}`;
};
const fonts = [
  font('fredoka', 'fredoka-latin-600-normal.woff2', 'Fredoka', 600),
  ...[700, 800, 900].map(w => font('nunito', `nunito-latin-${w}-normal.woff2`, 'Nunito', w)),
].join('\n');
const html = readFileSync(path.join(here, 'src/film.html'), 'utf8').replace('/*FONTS*/', fonts);
const out = path.join(dist, 'bondi-for-parents.html');
writeFileSync(out, html);
console.log('wrote', out);

const stills = opt('--stills');
if (!opt('--render') && !stills) process.exit(0);

const { chromium } = await import('playwright');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('file://' + out + '?render');
await page.evaluate(() => window.__ready);
const grab = async t => {
  const url = await page.evaluate(t => { window.__frame(t); return document.getElementById('c').toDataURL('image/jpeg', .95); }, t);
  return Buffer.from(url.split(',')[1], 'base64');
};

if (stills) {
  for (const s of String(stills).split(',').map(Number)) {
    const url = await page.evaluate(t => { window.__frame(t); return document.getElementById('c').toDataURL('image/png'); }, s);
    const f = path.join(dist, `still-${String(s).replace('.', '_')}.png`);
    writeFileSync(f, Buffer.from(url.split(',')[1], 'base64')); console.log('wrote', f);
  }
}

if (opt('--render')) {
  const fps = Number(opt('--fps')) || 30;
  const dur = await page.evaluate(() => window.__dur);
  const wav = path.join(dist, 'soundtrack.wav');
  writeFileSync(wav, Buffer.from(await page.evaluate(() => window.__audio()), 'base64'));
  console.log('wrote', wav);
  const mp4 = path.join(dist, 'bondi-for-parents.mp4');
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(fps), '-i', '-',
    '-i', wav, '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    '-c:a', 'aac', '-b:a', '192k', '-shortest', mp4], { stdio: ['pipe', 'inherit', 'inherit'] });
  const n = Math.round(dur * fps);
  for (let i = 0; i < n; i++) {
    const buf = await grab(i / fps);
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 150 === 0) console.log(`frame ${i}/${n}`);
  }
  ff.stdin.end();
  await new Promise((res, rej) => ff.on('close', c => c ? rej(new Error('ffmpeg ' + c)) : res()));
  console.log('wrote', mp4);
}
await browser.close();
