import { useState, useEffect } from 'react';
import type { DB } from '../types/db';
import { supabase } from '../lib/supabase';

let cached: DB | null = null;

export function useDB() {
  const [data, setData]       = useState<DB | null>(cached);
  const [loading, setLoading] = useState(!cached);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (cached) return;

    supabase
      .from('portfolio')
      .select('data')
      .eq('id', 1)
      .single()
      .then(({ data: row, error: err }) => {
        if (err) {
          setError(err.message);
        } else {
          cached = row?.data as DB;
          setData(cached);
        }
        setLoading(false);
      });
  }, []);

  /** Bust the in-memory cache so the next component mount re-fetches */
  const invalidate = () => { cached = null; };

  return { data, loading, error, invalidate };
}
