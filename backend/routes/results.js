const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.seat_name,
        c.candidate_name,
        COUNT(v.id) AS votes
      FROM candidates c
      JOIN seats s ON c.seat_id = s.id
      LEFT JOIN votes v ON c.id = v.candidate_id
      GROUP BY s.seat_name, c.candidate_name
      ORDER BY s.seat_name, votes DESC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;