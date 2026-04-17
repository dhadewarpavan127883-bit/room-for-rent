const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// In-Memory Mode (No MongoDB required!)
console.log('Running in Mock/In-Memory Mode (No MongoDB needed)');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
