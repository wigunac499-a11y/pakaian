import type { APIRoute } from 'astro';
import { getDb } from '../../db';
import { contacts } from '../../db/schema';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone, template_id, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Nama, email, dan pesan wajib diisi.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Format email tidak valid.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const db = await getDb();
    await db.insert(contacts).values({
      name,
      email,
      phone: phone || null,
      templateId: template_id ? parseInt(template_id) : null,
      message,
      isRead: false,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, message: 'Pesan berhasil dikirim!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Terjadi kesalahan server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
