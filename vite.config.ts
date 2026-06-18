import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as fs from 'fs';
import * as path from 'path';

/* ─────────────────────────────────────────────────────────────
   Multipart parser — works correctly with binary file data.
   Operates entirely on Buffers, never converts to string.
───────────────────────────────────────────────────────────── */
function parseMultipart(body: Buffer, contentType: string): { fileName: string; fileBuffer: Buffer } | null {
  const match = contentType.match(/boundary=(?:"([^"]+)"|([^\s;]+))/);
  if (!match) return null;
  const boundary = Buffer.from('--' + (match[1] ?? match[2]));

  // Split body on boundary markers
  const parts: Buffer[] = [];
  let start = 0;
  while (start < body.length) {
    const idx = indexOf(body, boundary, start);
    if (idx === -1) break;
    if (start > 0) parts.push(body.slice(start, idx - 2)); // strip trailing \r\n
    start = idx + boundary.length + 2; // skip \r\n after boundary
    if (body.slice(idx + boundary.length, idx + boundary.length + 2).toString() === '--') break;
  }

  for (const part of parts) {
    // Find header/body separator \r\n\r\n
    const sep = indexOf(part, Buffer.from('\r\n\r\n'), 0);
    if (sep === -1) continue;
    const header = part.slice(0, sep).toString('utf8');
    if (!header.includes('filename=')) continue;
    const fnMatch = header.match(/filename="([^"]+)"/);
    const fileName = (fnMatch?.[1] ?? `upload_${Date.now()}.bin`).replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileBuffer = part.slice(sep + 4); // skip \r\n\r\n
    return { fileName, fileBuffer };
  }
  return null;
}

function indexOf(haystack: Buffer, needle: Buffer, start: number): number {
  for (let i = start; i <= haystack.length - needle.length; i++) {
    if (haystack.slice(i, i + needle.length).equals(needle)) return i;
  }
  return -1;
}

/* ─────────────────────────────────────────────────────────────
   Vite dev server middleware — handles admin API endpoints
   so the admin panel works locally without Netlify CLI.
───────────────────────────────────────────────────────────── */
function localAdminPlugin() {
  return {
    name: 'local-admin-api',
    configureServer(server: any) {

      /* ── Save DB (dev only — also updates local db.json) ── */
      server.middlewares.use('/api/save-db', (req: any, res: any) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', () => {
          try {
            const db = JSON.parse(Buffer.concat(chunks).toString('utf8'));
            const dbPath = path.join(process.cwd(), 'public', 'data', 'db.json');
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(e) }));
          }
        });
      });

      /* ── List images ── */
      server.middlewares.use('/api/list-images', (req: any, res: any) => {
        if (req.method !== 'GET') { res.statusCode = 405; res.end(); return; }
        try {
          const dirs = [
            { dir: path.join(process.cwd(), 'public', 'uploads', 'images'), prefix: '/uploads/images' },
            { dir: path.join(process.cwd(), 'public', 'topics'), prefix: '/topics' },
          ];
          const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif']);
          const images: { url: string; name: string; folder: string }[] = [];
          for (const { dir, prefix } of dirs) {
            if (!fs.existsSync(dir)) continue;
            for (const file of fs.readdirSync(dir)) {
              if (exts.has(path.extname(file).toLowerCase())) {
                images.push({ url: `${prefix}/${file}`, name: file, folder: prefix.replace(/^\//, '') });
              }
            }
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(images));
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: String(e) }));
        }
      });

      /* ── Upload image ── */
      server.middlewares.use('/api/upload-image', (req: any, res: any) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', () => {
          try {
            const body = Buffer.concat(chunks);
            const contentType: string = req.headers['content-type'] ?? '';
            const parsed = parseMultipart(body, contentType);
            if (!parsed) throw new Error('Could not parse uploaded file');
            const { fileBuffer } = parsed;
            let { fileName } = parsed;

            const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images');
            fs.mkdirSync(uploadDir, { recursive: true });

            // Avoid filename collisions
            const ext = path.extname(fileName);
            const base = path.basename(fileName, ext);
            let finalName = fileName;
            let counter = 1;
            while (fs.existsSync(path.join(uploadDir, finalName))) {
              finalName = `${base}_${counter++}${ext}`;
            }

            fs.writeFileSync(path.join(uploadDir, finalName), fileBuffer);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, url: `/uploads/images/${finalName}`, name: finalName }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(e) }));
          }
        });
      });

      /* ── Upload CV ── */
      server.middlewares.use('/api/upload-cv', (req: any, res: any) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', () => {
          try {
            const body = Buffer.concat(chunks);
            const contentType: string = req.headers['content-type'] ?? '';
            const parsed = parseMultipart(body, contentType);
            if (!parsed) throw new Error('Could not parse uploaded file');
            const { fileName, fileBuffer } = parsed;

            const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'cv');
            fs.mkdirSync(uploadDir, { recursive: true });
            fs.writeFileSync(path.join(uploadDir, fileName), fileBuffer);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, url: `/uploads/cv/${fileName}` }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: String(e) }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localAdminPlugin()],
});
