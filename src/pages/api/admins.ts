import type { APIRoute } from 'astro';
import { db } from '../../db';
import { admins } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { getAuthUser, hashPassword } from '../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  try {
    const { username, email, password, role } = await request.json();
    if (!username || !email || !password) {
      return new Response(JSON.stringify({ error: 'Semua field wajib diisi.' }), { status: 400 });
    }
    db.insert(admins).values({
      username, email, password: hashPassword(password), role: role || 'admin', createdAt: new Date().toISOString(),
    }).run();
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: 'Username atau email sudah ada.' }), { status: 500 });
  }
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  try {
    const { id, username, email, password, role, isActive } = await request.json();
    const data: any = { username, email, role, isActive };
    if (password) data.password = hashPassword(password);
    db.update(admins).set(data).where(eq(admins.id, id)).run();
    return new Response(JSON.stringify({ success: true }));
  } catch {
    return new Response(JSON.stringify({ error: 'Gagal.' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const { id } = await request.json();
  db.delete(admins).where(eq(admins.id, id)).run();
  return new Response(JSON.stringify({ success: true }));
};
