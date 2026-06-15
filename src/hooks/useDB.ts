import { useState, useEffect } from 'react';
import type { DB } from '../types/db';

let cached: DB | null = null;

export function useDB() {
  const [data, setData] = useState<DB | null>(cached);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cached) return;
    fetch('/data/db.json?t=' + Date.now())
      .then(r => {
        if (!r.ok) throw new Error('Failed to load data');
        return r.json() as Promise<DB>;
      })
      .then(d => {
        cached = d;
        setData(d);
        setLoading(false);
      })
      .catch(e => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  /** Call this after admin saves to bust the cache */
  const invalidate = () => { cached = null; };

  return { data, loading, error, invalidate };
}
