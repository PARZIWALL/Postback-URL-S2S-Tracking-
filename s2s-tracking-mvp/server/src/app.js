// Express app setup for NeonDB PostgreSQL
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// Load .env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
	origin: 'http://localhost:3000'
}));
app.use(express.json());

// Prisma Client
const prisma = new PrismaClient();
app.locals.prisma = prisma; // so you can access it in route files via req.app.locals.prisma

// Routes
const clickRoutes = require('./routes/click');
const postbackRoutes = require('./routes/postback');
const affiliatesRoutes = require('./routes/affiliates');

app.use('/click', clickRoutes);        // GET /click?affiliate_id=...&campaign_id=...&click_id=...
app.use('/postback', postbackRoutes);  // GET /postback?affiliate_id=...&click_id=...&amount=...&currency=...
app.use('/affiliates', affiliatesRoutes); // GET /affiliates, etc.

// Health check
app.get('/', (req, res) => {
	res.json({ message: 'Affiliate system backend is running.' });
});

// Optional error handler
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
