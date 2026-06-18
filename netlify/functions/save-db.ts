import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const PASSWORD      = process.env.VITE_ADMIN_PASSWORD;
const SUPABASE_URL  = process.env.VITE_SUPABASE_URL!;
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_ROLE_KEY!;  // never exposed to browser

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body ?? '{}');

    // Auth check
    if (!PASSWORD || body.password !== PASSWORD) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    if (!SUPABASE_URL || !SERVICE_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Supabase env vars not configured' }),
      };
    }

    // Service-role client — bypasses RLS, can write
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false },
    });

    const { data: dbData } = body;

    const { error } = await supabase
      .from('portfolio')
      .upsert({ id: 1, data: dbData, updated_at: new Date().toISOString() });

    if (error) throw new Error(error.message);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(e) }),
    };
  }
};
