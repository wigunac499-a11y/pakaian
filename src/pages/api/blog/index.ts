import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { blogPosts } from '../../../db/schema';
import { getAuthUser } from '../../../lib/auth';
import { generateSlug } from '../../../lib/slug';

export const POST: APIRoute = async ({ request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  try {
    const db = await getDb();
    const body = await request.json();

    const slug = generateSlug(body.title);

    await db.insert(blogPosts).values({
      title: body.title,
      slug,
      excerpt: body.excerpt || null,
      content: body.content,
      coverImage: body.coverImage || null,
      metaTitle: body.metaTitle || body.title,
      metaDescription: body.metaDescription || body.excerpt,
      author: body.author || 'Admin',
      isPublished: body.isPublished !== false,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal menambah artikel.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
