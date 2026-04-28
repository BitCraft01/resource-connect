const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
require('dotenv').config({ override: true });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD || undefined,
  port: parseInt(process.env.DB_PORT),
});

// Middleware to check admin role
const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// GET all users (admin only)
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ADD new resource (admin only)
router.post('/resources', requireAdmin, async (req, res) => {
  const { name, description, simple_description, category_id, address, phone, hours, requires_id, walk_in_available } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO resources 
        (name, description, simple_description, category_id, city_id, address, phone, hours, requires_id, walk_in_available)
       VALUES ($1, $2, $3, $4, 1, $5, $6, $7, $8, $9)
       RETURNING *`,
      [name, description, simple_description, category_id, address, phone, hours, requires_id, walk_in_available]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE resource (admin only)
router.put('/resources/:id', requireAdmin, async (req, res) => {
  const { name, description, simple_description, category_id, address, phone, hours, requires_id, walk_in_available } = req.body;
  try {
    const result = await pool.query(
      `UPDATE resources SET
        name=$1, description=$2, simple_description=$3, category_id=$4,
        address=$5, phone=$6, hours=$7, requires_id=$8, walk_in_available=$9
       WHERE id=$10 RETURNING *`,
      [name, description, simple_description, category_id, address, phone, hours, requires_id, walk_in_available, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE resource (admin only)
router.delete('/resources/:id', requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM resources WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;