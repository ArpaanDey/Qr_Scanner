
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
  res.json({ message: 'Authentication API is running.' });
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 4000;

async function startServer() {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    throw new Error('MONGODB_URI and JWT_SECRET must be configured.');
  }

  await connectDB();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
} 

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});   


