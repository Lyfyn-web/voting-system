const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');

const router = express.Router();

// CAST VOTE
router.post('/', auth, async (req, res) => {
  try {
    const { seat_id, candidate_id } = req.body;
    const user_id = req.user.id;

    // Check if already voted for this seat
    const existingVote = await pool.query(
      'SELECT * FROM votes WHERE user_id=$1 AND seat_id=$2',
      [user_id, seat_id]
    );

    if (existingVote.rows.length > 0) {
      return res.status(400).json({
        message: 'You have already voted for this seat'
      });
    }

    // Insert vote
    await pool.query(
      `INSERT INTO votes(user_id, seat_id, candidate_id)
       VALUES($1, $2, $3)`,
      [user_id, seat_id, candidate_id]
    );

    res.json({
      message: 'Vote submitted successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;