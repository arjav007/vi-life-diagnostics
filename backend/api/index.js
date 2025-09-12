
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');


// FIX: Corrected all paths to go up one level ('../') from the 'api' directory
const { pool } = require('../config/database');
const authMiddleware = require('../middleware/auth');
const errorHandler = require('../middleware/errorHandler');
const validation = require('../middleware/validation');
const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/users');
const packageRoutes = require('../routes/packages');
const reportRoutes = require('../routes/reports');
const bookingRoutes = require('../routes/bookings');


dotenv.config();

const app = express();


// CRITICAL FIX: Trust proxy for Vercel deployment
app.set('trust proxy', 1);


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
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://vi-life-diagnostics.vercel.app', 'https://www.vlifediagnostics.com']
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


// Static files
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
    console.error('Health check failed:', error);
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


// --- Your other endpoints ---
app.post('/api/contact', validation.validateContact, (req, res) => {
  res.json({ message: 'Contact endpoint placeholder' });
});


app.get('/api/locations', (req, res) => {
  res.json({ message: 'Locations endpoint placeholder' });
});


app.get('/api/search/packages', (req, res) => {
  res.json({ message: 'Package search endpoint placeholder' });
});


app.get('/api/blogs', (req, res) => {
  res.json({ message: 'Blogs endpoint placeholder' });
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


// Export the app for Vercel
module.exports = app;
