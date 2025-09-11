const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Import database connection
const { pool } = require('./config/database'); // We only need the pool for routes

// Import middleware
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const validation = require('./middleware/validation');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const packageRoutes = require('./routes/packages');
const reportRoutes = require('./routes/reports');
const bookingRoutes = require('./routes/bookings');

// Load environment variables (useful for local development)
dotenv.config();

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many authentication attempts, please try again later.' },
});

app.use(limiter);
app.use('/api/auth', authLimiter);

// CORS configuration
// ⚠️ REMINDER: Add your Vercel production URL to the origin array below!
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-vercel-url.vercel.app', 'https://www.vlifediagnostics.com'] 
    : ['http://localhost:3001', 'http://127.0.0.1:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Compression and logging
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files (Vercel handles this differently, but it's safe to keep for local dev)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({
      status: 'healthy',
      database: 'connected',
      server_time: result.rows[0].now,
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: 'Database connection failed'
    });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/reports', authMiddleware, reportRoutes);
app.use('/api/bookings', bookingRoutes);

// Contact form endpoint
app.post('/api/contact', validation.validateContact, async (req, res) => {
  // ... (your existing logic is fine)
});

// Location endpoints
app.get('/api/locations', async (req, res) => {
  // ... (your existing logic is fine)
});

// Package search endpoint
app.get('/api/search/packages', async (req, res) => {
  // ... (your existing logic is fine)
});

// Blog endpoints (basic)
app.get('/api/blogs', async (req, res) => {
  // ... (your existing logic is fine)
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use(errorHandler);

// Vercel will handle the server lifecycle. We no longer need app.listen() or graceful shutdown.
// All the code below has been removed.
// - startServer() function
// - process.on() listeners for SIGTERM, SIGINT, uncaughtException, etc.

// Export the app for Vercel
module.exports = app;