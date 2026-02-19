import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pool, initDB } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// ─── Query Helpers ───────────────────────────────────────────────────────────

const ALL_EVENTS_SQL = `
  SELECT e.*, STRING_AGG(ei.url, '||' ORDER BY ei.sort_order) as image_urls
  FROM events e
  LEFT JOIN event_images ei ON ei.event_id = e.id
  GROUP BY e.id
  ORDER BY e.id ASC
`;

const FEATURED_EVENTS_SQL = `
  SELECT e.*, STRING_AGG(ei.url, '||' ORDER BY ei.sort_order) as image_urls
  FROM events e
  LEFT JOIN event_images ei ON ei.event_id = e.id
  WHERE e.featured = true
  GROUP BY e.id
  ORDER BY e.id ASC
`;

const EVENT_BY_ID_SQL = `
  SELECT e.*, STRING_AGG(ei.url, '||' ORDER BY ei.sort_order) as image_urls
  FROM events e
  LEFT JOIN event_images ei ON ei.event_id = e.id
  WHERE e.id = $1
  GROUP BY e.id
`;

function formatEvent(row) {
  return {
    id: row.id,
    title: row.title,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    day: row.day,
    month: row.month,
    year: row.year,
    borough: row.borough,
    playType: row.play_type,
    featured: !!row.featured,
    images: row.image_urls ? row.image_urls.split('||') : [],
  };
}

// ─── Admin Auth ──────────────────────────────────────────────────────────────

const ADMIN_USER = process.env.ADMIN_USER || 'youngblood';
const ADMIN_PASS = process.env.ADMIN_PASS || 'rebellion2025';

const activeTokens = new Set();

function generateToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !activeTokens.has(token)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// POST admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = generateToken();
    activeTokens.add(token);
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

// POST create event (admin only)
app.post('/api/admin/events', requireAdmin, async (req, res) => {
  const { title, shortDescription, fullDescription, day, month, year, borough, playType, featured, images } = req.body;

  if (!title || !shortDescription || !fullDescription || !day || !month || !borough || !playType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO events (title, short_description, full_description, day, month, year, borough, play_type, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [title, shortDescription, fullDescription, day, month, year || '2025', borough, playType, !!featured]
    );
    const eventId = result.rows[0].id;

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await pool.query(
          'INSERT INTO event_images (event_id, url, sort_order) VALUES ($1, $2, $3)',
          [eventId, images[i], i]
        );
      }
    }

    const { rows } = await pool.query(EVENT_BY_ID_SQL, [eventId]);
    res.status(201).json(formatEvent(rows[0]));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create event' });
  }
});

// PUT update event (admin only)
app.put('/api/admin/events/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, shortDescription, fullDescription, day, month, year, borough, playType, featured, images } = req.body;

  if (!title || !shortDescription || !fullDescription || !day || !month || !borough || !playType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      `UPDATE events SET title=$1, short_description=$2, full_description=$3, day=$4, month=$5, year=$6, borough=$7, play_type=$8, featured=$9
       WHERE id=$10 RETURNING id`,
      [title, shortDescription, fullDescription, day, month, year || '2025', borough, playType, !!featured, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ error: 'Event not found' });

    // Replace images
    await pool.query('DELETE FROM event_images WHERE event_id = $1', [id]);
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await pool.query(
          'INSERT INTO event_images (event_id, url, sort_order) VALUES ($1, $2, $3)',
          [id, images[i], i]
        );
      }
    }

    const { rows } = await pool.query(EVENT_BY_ID_SQL, [id]);
    res.json(formatEvent(rows[0]));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update event' });
  }
});

// DELETE event (admin only)
app.delete('/api/admin/events/:id', requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM event_images WHERE event_id = $1', [id]);
    const result = await pool.query('DELETE FROM events WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete event' });
  }
});

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET all events
app.get('/api/events', async (req, res) => {
  try {
    const featured = req.query.featured;
    const { rows } = await pool.query(featured === 'true' ? FEATURED_EVENTS_SQL : ALL_EVENTS_SQL);
    res.json(rows.map(formatEvent));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET single event
app.get('/api/events/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(EVENT_BY_ID_SQL, [parseInt(req.params.id)]);
    if (rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(formatEvent(rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// POST new member signup
app.post('/api/members', async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ error: 'Name, email, and age are required' });
  }

  const ageNum = parseInt(age);
  if (ageNum < 18 || ageNum > 24) {
    return res.status(400).json({ error: 'YOUNGBLOOD is for ages 18-24' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO members (name, email, age) VALUES ($1, $2, $3) RETURNING id',
      [name, email, ageNum]
    );
    res.status(201).json({
      message: 'Welcome to YOUNGBLOOD',
      member: { id: result.rows[0].id, name, email, age: ageNum },
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'You are already part of the rebellion' });
    }
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET all members (admin)
app.get('/api/members', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM members ORDER BY joined_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'alive', rebellion: 'active' });
});

// ─── Start ────────────────────────────────────────────────────────────────────

initDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚡ YOUNGBLOOD server running on http://0.0.0.0:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
