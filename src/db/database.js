import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function initDatabase() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS participantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      institucion TEXT NOT NULL,
      grupo TEXT NOT NULL,
      asistio INTEGER DEFAULT 0
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS lista_espera (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      institucion TEXT NOT NULL,
      grupo TEXT NOT NULL,
      asistio INTEGER DEFAULT 0
    )
  `);

  console.log('✅ Tablas creadas exitosamente');
}
