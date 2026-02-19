import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/youngblood',
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// ─── Create Tables ──────────────────────────────────────────────────────────

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      short_description TEXT NOT NULL,
      full_description TEXT NOT NULL,
      day TEXT NOT NULL,
      month TEXT NOT NULL,
      year TEXT NOT NULL DEFAULT '2025',
      borough TEXT NOT NULL,
      play_type TEXT NOT NULL,
      featured BOOLEAN NOT NULL DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS event_images (
      id SERIAL PRIMARY KEY,
      event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      url TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS members (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      age INTEGER NOT NULL,
      joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export { pool, initDB };
