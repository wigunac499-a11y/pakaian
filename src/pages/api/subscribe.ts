import type { APIRoute } from 'astro';
import { db } from '../../db';
import { subscribers } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Email tidak valid.' }), { status: 400 });
    }

    const existing = db.select().from(subscribers).where(eq(subscribers.email, email)).all();
    if (existing.length > 0) {
      return new Response(JSON.stringify({ message: 'Email sudah terdaftar!' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    db.insert(subscribers).values({ email, createdAt: new Date().toISOString() }).run();
    return new Response(JSON.stringify({ success: true, message: 'Berlangganan berhasil!' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Gagal.' }), { status: 500 });
  }
};
