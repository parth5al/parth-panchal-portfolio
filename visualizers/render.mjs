// Renders a visualizer to stills or a looping MP4 using headless Chrome (WebGL + WebCodecs).
//
//   node visualizers/render.mjs 01-prism-orb still 0,7.5,15
//   node visualizers/render.mjs 01-prism-orb video            -> visualizers/01-prism-orb/out/prism-orb-30s.mp4
//   extra query params:  node visualizers/render.mjs 01-prism-orb video "w=3840&ss=1&mbps=60&name=prism-orb-4k.mp4"
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const [viz = '01-prism-orb', mode = 'still', arg = '0', extra = ''] = process.argv.slice(2);
const dir = path.join(ROOT, viz);
const outDir = path.join(dir, 'out');
fs.mkdirSync(outDir, { recursive: true });
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let chrome;
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (req.method === 'POST') {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      const body = Buffer.concat(chunks);
      if (url.pathname === '/log') console.log('[page]', body.toString());
      else if (url.pathname === '/save') {
        const name = path.basename(url.searchParams.get('name') || 'out.bin').replace(/[^\w.\-]/g, '_');
        fs.writeFileSync(path.join(outDir, name), body);
        console.log('saved', path.join(outDir, name), (body.length / 1e6).toFixed(2) + 'MB');
      } else if (url.pathname === '/done') { finish(0); }
      res.end('ok');
    });
    return;
  }
  const file = path.join(dir, url.pathname === '/' ? 'index.html' : path.normalize(url.pathname));
  if (!file.startsWith(dir) || !fs.existsSync(file)) { res.statusCode = 404; return res.end(); }
  res.setHeader('Content-Type', file.endsWith('.html') ? 'text/html' : file.endsWith('.mp4') ? 'video/mp4' : 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});

function finish(code) {
  try { chrome?.kill(); } catch {}
  server.close();
  setTimeout(() => process.exit(code), 200);
}

server.listen(0, '127.0.0.1', () => {
  const port = server.address().port;
  const pageUrl = `http://127.0.0.1:${port}/?${mode === 'video' ? `render=1&${arg === '0' ? '' : arg}` : `still=${arg}`}&${extra}`;
  console.log('opening', pageUrl);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'viz-chrome-'));
  chrome = spawn(CHROME, [
    '--headless=new', `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check',
    '--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--enable-webgl',
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
    '--window-size=1280,720', pageUrl,
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  chrome.stderr.on('data', d => { const s = d.toString(); if (/error/i.test(s) && !/DEPRECATED|dbus|GCM|CVDisplayLink/i.test(s)) process.stderr.write('[chrome] ' + s); });
  chrome.on('exit', c => { console.log('chrome exited', c); finish(c ?? 1); });
});
