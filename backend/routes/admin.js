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

// GET ALL SEATS
router.get('/seats', auth, admin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, seat_name FROM seats ORDER BY id'
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE SEAT
router.post('/seat', auth, admin, async (req, res) => {
  try {
    const { seat_name } = req.body;

    await pool.query(
      'INSERT INTO seats(seat_name) VALUES($1)',
      [seat_name]
    );

    res.json({
      message: 'Seat created successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD CANDIDATE
router.post('/candidate', auth, admin, async (req, res) => {
  try {
    const { seat_id, candidate_name } = req.body;

    await pool.query(
      'INSERT INTO candidates(seat_id, candidate_name) VALUES($1, $2)',
      [seat_id, candidate_name]
    );

    res.json({
      message: 'Candidate added successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});