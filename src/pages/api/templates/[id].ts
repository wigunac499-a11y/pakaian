import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { templates } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { getAuthUser } from '../../../lib/auth';
import { generateSlug } from '../../../lib/slug';

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const db = await getDb();
  const body = await request.json();
  const id = parseInt(params.id!);

  const slug = body.title ? generateSlug(body.title) : undefined;

  await db.update(templates).set({
    ...body,
    slug: slug || body.slug,
    updatedAt: new Date(),
  }).where(eq(templates.id, id));

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const DELETE: APIRoute = async ({ params, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const db = await getDb();
  const id = parseInt(params.id!);
  await db.delete(templates).where(eq(templates.id, id));

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
