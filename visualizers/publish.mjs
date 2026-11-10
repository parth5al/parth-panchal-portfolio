// Publishes visualizers to the website (public/explorations/<slug>/):
//   index.html   live WebGL version (the detail page runs this in an iframe)
//   preview.mp4  light 480p loop that plays when a card is hovered
//   poster.jpg   still shown on the card before it plays
//
//   node visualizers/publish.mjs              (all)
//   node visualizers/publish.mjs 02-convergence
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(ROOT, '..', 'public', 'explorations');

// folder -> site slug, and the moment used for the poster
const VIZ = {
  '01-prism-orb':   { slug: 'prism-orb',   poster: 3 },
  '02-convergence': { slug: 'convergence', poster: 13 },
  '03-signal':      { slug: 'signal',      poster: 11 },
};

const only = process.argv[2];
const render = (folder, mode, arg, extra = '') =>
  execFileSync('node', [path.join(ROOT, 'render.mjs'), folder, mode, arg, extra], { stdio: 'inherit' });

for (const [folder, { slug, poster }] of Object.entries(VIZ)) {
  if (only && only !== folder) continue;
  const out = path.join(ROOT, folder, 'out');
  const dest = path.join(PUBLIC, slug);
  fs.mkdirSync(dest, { recursive: true });
  console.log(`\n== ${folder} -> public/explorations/${slug}`);

  fs.copyFileSync(path.join(ROOT, folder, 'index.html'), path.join(dest, 'index.html'));

  // 854x480 loop, lighter grain so it compresses cleanly at a small bitrate
  render(folder, 'video', 'w=854&ss=2&mbps=2&grain=0.035&name=preview.mp4');
  fs.copyFileSync(path.join(out, 'preview.mp4'), path.join(dest, 'preview.mp4'));

  render(folder, 'still', String(poster), 'w=1280');
  const png = path.join(out, `still-${poster.toFixed(2)}.png`);
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', png, '--out', path.join(dest, 'poster.jpg')], { stdio: 'ignore' });
  fs.rmSync(png);

  const kb = f => (fs.statSync(path.join(dest, f)).size / 1024).toFixed(0) + 'KB';
  console.log(`   index.html ${kb('index.html')} · preview.mp4 ${kb('preview.mp4')} · poster.jpg ${kb('poster.jpg')}`);
}
