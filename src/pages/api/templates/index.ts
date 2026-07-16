import type { APIRoute } from 'astro';
import { getDb } from '../../../db';
import { templates } from '../../../db/schema';
import { getAuthUser } from '../../../lib/auth';
import { generateSlug } from '../../../lib/slug';

export const POST: APIRoute = async ({ request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  try {
    const db = await getDb();
    const body = await request.json();

    const slug = generateSlug(body.title);

    await db.insert(templates).values({
      title: body.title,
      slug,
      category: body.category,
      description: body.description,
      features: body.features || null,
      image: body.image || null,
      demoUrl: body.demoUrl || null,
      price: body.price || null,
      isPublished: body.isPublished !== false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Gagal menambah template.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
