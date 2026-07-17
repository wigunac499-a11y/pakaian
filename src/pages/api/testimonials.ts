import type { APIRoute } from 'astro';
import { db } from '../../db';
import { testimonials } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { getAuthUser } from '../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });
  try {
    const body = await request.json();
    db.insert(testimonials).values({ ...body, isPublished: body.isPublished !== false, createdAt: new Date().toISOString() }).run();
    return new Response(JSON.stringify({ success: true }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch { return new Response(JSON.stringify({ error: 'Gagal.' }), { status: 500 }); }
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });
  try {
    const body = await request.json();
    const { id, ...data } = body;
    db.update(testimonials).set(data).where(eq(testimonials.id, id)).run();
    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch { return new Response(JSON.stringify({ error: 'Gagal.' }), { status: 500 }); }
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });
  try {
    const { id } = await request.json();
    db.delete(testimonials).where(eq(testimonials.id, id)).run();
    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch { return new Response(JSON.stringify({ error: 'Gagal.' }), { status: 500 }); }
};
