const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const voteRoutes = require('./routes/vote');
const resultRoutes = require('./routes/results');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Voting System API is running 🚀'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});