import type { Handler } from '@netlify/functions';
import * as fs from 'fs';
import * as path from 'path';

const DB_PATH = path.join(process.cwd(), 'public', 'data', 'db.json');
const PASSWORD = process.env.VITE_ADMIN_PASSWORD;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body ?? '{}');

    if (!PASSWORD || body.password !== PASSWORD) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
    }

    const { password: _pw, ...dbData } = body;
    fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2), 'utf-8');

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
