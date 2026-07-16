import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import 'dotenv/config';

let db: ReturnType<typeof drizzle<typeof schema>>;

export async function getDb() {
  if (!db) {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    db = drizzle(connection, { schema, mode: 'default' });
  }
  return db;
}
