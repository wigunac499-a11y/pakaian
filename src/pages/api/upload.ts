import type { APIRoute } from 'astro';
import { getAuthUser } from '../../lib/auth';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export const POST: APIRoute = async ({ request, cookies }) => {
  const user = getAuthUser(cookies);
  if (!user) return new Response('Unauthorized', { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) return new Response(JSON.stringify({ error: 'No file' }), { status: 400 });

    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const dir = join(process.cwd(), 'public', 'uploads');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, filename), Buffer.from(await file.arrayBuffer()));

    return new Response(JSON.stringify({ url: `/uploads/${filename}` }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Upload failed' }), { status: 500 });
  }
};
