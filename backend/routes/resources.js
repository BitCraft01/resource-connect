const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config({ override: true });

// Debug: print what env vars are being used
console.log('DB Config:', {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD || undefined,
  port: parseInt(process.env.DB_PORT),
});

router.get('/', async (req, res) => {
  try {
    console.log('GET /resources hit');
    const { category } = req.query;
    let query = `
      SELECT r.*, c.name as category_name, c.icon, ci.name as city_name
      FROM resources r
      JOIN categories c ON r.category_id = c.id
      JOIN cities ci ON r.city_id = ci.id
    `;
    const params = [];
    if (category) {
      query += ` WHERE c.name = $1`;
      params.push(category);
    }
    const result = await pool.query(query, params);
    console.log('Rows returned:', result.rows.length);
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, c.name as category_name, c.icon, ci.name as city_name
       FROM resources r
       JOIN categories c ON r.category_id = c.id
       JOIN cities ci ON r.city_id = ci.id
       WHERE r.id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;