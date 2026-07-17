import type { APIRoute } from 'astro';
import { db } from '../../db';
import { faqs } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { getAuthUser } from '../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  try {
    const body = await request.json();
    db.insert(faqs).values({ ...body, isPublished: body.isPublished !== false, createdAt: new Date().toISOString() }).run();
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: 'Gagal.' }), { status: 500 });
  }
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  try {
    const body = await request.json();
    const { id, ...data } = body;
    db.update(faqs).set(data).where(eq(faqs.id, id)).run();
    return new Response(JSON.stringify({ success: true }));
  } catch {
    return new Response(JSON.stringify({ error: 'Gagal.' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const { id } = await request.json();
  db.delete(faqs).where(eq(faqs.id, id)).run();
  return new Response(JSON.stringify({ success: true }));
};
