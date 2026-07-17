import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { contacts } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { getAuthUser } from '../../../lib/auth';

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const body = await request.json();
  const id = parseInt(params.id!);

  db.update(contacts).set({ isRead: body.isRead }).where(eq(contacts.id, id)).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const DELETE: APIRoute = async ({ params, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const id = parseInt(params.id!);
  db.delete(contacts).where(eq(contacts.id, id)).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
