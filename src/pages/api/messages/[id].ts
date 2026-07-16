import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { contacts } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { getAuthUser } from '../../../lib/auth';

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const db = await getDb();
  const body = await request.json();
  const id = parseInt(params.id!);

  await db.update(contacts).set({ isRead: body.isRead }).where(eq(contacts.id, id));

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const DELETE: APIRoute = async ({ params, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const db = await getDb();
  const id = parseInt(params.id!);
  await db.delete(contacts).where(eq(contacts.id, id));

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
