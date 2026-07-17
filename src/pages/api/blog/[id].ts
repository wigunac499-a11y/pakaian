import type { APIRoute } from 'astro';
import { db } from '../../../db';
import { blogPosts } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { getAuthUser } from '../../../lib/auth';
import { generateSlug } from '../../../lib/slug';

export const PUT: APIRoute = async ({ params, request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const body = await request.json();
  const id = parseInt(params.id!);

  const slug = body.title ? generateSlug(body.title) : undefined;

  db.update(blogPosts).set({
    ...body,
    slug: slug || body.slug,
    updatedAt: new Date().toISOString(),
  }).where(eq(blogPosts.id, id)).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const DELETE: APIRoute = async ({ params, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  const id = parseInt(params.id!);
  db.delete(blogPosts).where(eq(blogPosts.id, id)).run();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
};
