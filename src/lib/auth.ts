import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { Cookies } from 'astro';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function createToken(payload: { id: number; username: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { id: number; username: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; username: string };
  } catch {
    return null;
  }
}

export function getAuthUser(cookies: Cookies): { id: number; username: string } | null {
  const token = cookies.get('token')?.value;
  if (!token) return null;
  return verifyToken(token);
}
