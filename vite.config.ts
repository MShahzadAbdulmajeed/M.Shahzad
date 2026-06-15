import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as fs from 'fs';
import * as path from 'path';

// Local dev plugin — handles /api/save-db and /api/upload-cv
function localAdminPlugin() {
  return {
    name: 'local-admin-api',
    configureServer(server: any) {
      // Save DB
      server.middlewares.use('/api/save-db', (req: any, res: any) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        let body = '';
        req.on('data', (c: any) => { body += c; });
        req.on('end', () => {
          try {
            const db = JSON.parse(body);
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

      // List images in public/uploads/images and public/topics
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
                images.push({ url: `${prefix}/${file}`, name: file, folder: prefix.replace('/', '') });
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

      // Upload image
      server.middlewares.use('/api/upload-image', (req: any, res: any) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', () => {
          try {
            const body = Buffer.concat(chunks);
            const contentType: string = req.headers['content-type'] || '';
            const boundaryMatch = contentType.match(/boundary=(.+)/);
            if (!boundaryMatch) throw new Error('No boundary');
            const boundary = '--' + boundaryMatch[1];
            const bodyStr = body.toString('binary');
            const parts = bodyStr.split(boundary);
            let fileBuffer: Buffer | null = null;
            let fileName = `upload_${Date.now()}.jpg`;
            for (const part of parts) {
              if (part.includes('filename=')) {
                const fnMatch = part.match(/filename="(.+?)"/);
                if (fnMatch) fileName = fnMatch[1].replace(/[^a-zA-Z0-9._-]/g, '_');
                const headerEnd = part.indexOf('\r\n\r\n');
                if (headerEnd !== -1) {
                  const content = part.slice(headerEnd + 4, part.lastIndexOf('\r\n'));
                  fileBuffer = Buffer.from(content, 'binary');
                }
              }
            }
            if (!fileBuffer) throw new Error('No file data');
            const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'images');
            fs.mkdirSync(uploadDir, { recursive: true });
            // Avoid collisions
            let finalName = fileName;
            let counter = 1;
            while (fs.existsSync(path.join(uploadDir, finalName))) {
              const ext = path.extname(fileName);
              finalName = `${path.basename(fileName, ext)}_${counter++}${ext}`;
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
      server.middlewares.use('/api/upload-cv', (req: any, res: any) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', () => {
          try {
            const body = Buffer.concat(chunks);
            // Parse multipart boundary
            const contentType: string = req.headers['content-type'] || '';
            const boundaryMatch = contentType.match(/boundary=(.+)/);
            if (!boundaryMatch) throw new Error('No boundary');
            const boundary = '--' + boundaryMatch[1];
            const parts = body.toString('binary').split(boundary);
            let fileBuffer: Buffer | null = null;
            let fileName = 'resume.pdf';
            for (const part of parts) {
              if (part.includes('filename=')) {
                const fnMatch = part.match(/filename="(.+?)"/);
                if (fnMatch) fileName = fnMatch[1];
                const headerEnd = part.indexOf('\r\n\r\n');
                if (headerEnd !== -1) {
                  const content = part.slice(headerEnd + 4, part.lastIndexOf('\r\n'));
                  fileBuffer = Buffer.from(content, 'binary');
                }
              }
            }
            if (!fileBuffer) throw new Error('No file data');
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
