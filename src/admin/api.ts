import type { DB } from '../types/db';

export async function saveDB(db: DB, password: string): Promise<void> {
  const res = await fetch('/.netlify/functions/save-db', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...db, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error ?? 'Save failed');
  }
}

/** Dev-only: write to local file system via a simple local server.
 *  In production on Netlify, save-db function handles it.
 *  In local dev (vite), we write directly via a custom vite plugin.
 */
export async function saveDBLocal(db: DB): Promise<void> {
  const res = await fetch('/api/save-db', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(db),
  });
  if (!res.ok) throw new Error('Local save failed');
}
