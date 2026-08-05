const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Dashboard statistics
router.get('/stats', auth, admin, async (req, res) => {
  try {
    const users = await pool.query('SELECT COUNT(*) FROM users');
    const votes = await pool.query('SELECT COUNT(*) FROM votes');
    const seats = await pool.query('SELECT COUNT(*) FROM seats');
    const candidates = await pool.query('SELECT COUNT(*) FROM candidates');

    res.json({
      users: users.rows[0].count,
      votes: votes.rows[0].count,
      seats: seats.rows[0].count,
      candidates: candidates.rows[0].count
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;