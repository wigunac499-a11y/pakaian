import type { APIRoute } from 'astro';
import { getDb } from '../../db';
import { admins } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword, createToken } from '../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Username dan password wajib diisi.' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = await getDb();
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));

    if (!admin || !verifyPassword(password, admin.password)) {
      return new Response(JSON.stringify({ error: 'Username atau password salah.' }), {
        status: 401, headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = createToken({ id: admin.id, username: admin.username });
    cookies.set('token', token, {
      httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 60 * 60 * 24 * 7
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Terjadi kesalahan server.' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
};
