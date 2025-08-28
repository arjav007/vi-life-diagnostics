const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Import database connection
const { pool, connectDB } = require('./config/database');

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

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.'
  },
});

app.use(limiter);
app.use('/api/auth', authLimiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://vlifediagnostics.com', 'https://www.vlifediagnostics.com']
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
    // Check database connection
    const result = await pool.query('SELECT NOW()');
    
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      server_time: result.rows[0].now,
      version: process.env.npm_package_version || '1.0.0'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
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
  try {
    const { name, email, phone, message, subject } = req.body;
    
    // Store contact inquiry in database
    const query = `
      INSERT INTO contact_inquiries (name, email, phone, message, subject, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id
    `;
    
    const result = await pool.query(query, [name, email, phone, message, subject]);
    
    // Here you would typically send an email notification
    // await emailService.sendContactNotification({ name, email, phone, message, subject });
    
    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully. We will get back to you soon.',
      inquiry_id: result.rows[0].id
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry. Please try again later.'
    });
  }
});

// Location endpoints
app.get('/api/locations', async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        name,
        address,
        city,
        state,
        pincode,
        phone,
        email,
        latitude,
        longitude,
        operating_hours,
        services,
        is_active
      FROM locations 
      WHERE is_active = true 
      ORDER BY city, name
    `;
    
    const result = await pool.query(query);
    
    res.json({
      success: true,
      locations: result.rows
    });
  } catch (error) {
    console.error('Locations fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch locations'
    });
  }
});

// Package search endpoint
app.get('/api/search/packages', async (req, res) => {
  try {
    const { q, category, price_range, sort = 'name' } = req.query;
    
    let query = `
      SELECT 
        id, name, slug, description, price, original_price, 
        parameter_count, category, duration, sample_type,
        is_featured, is_active
      FROM packages 
      WHERE is_active = true
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (q) {
      paramCount++;
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${q}%`);
    }
    
    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }
    
    if (price_range) {
      const [min, max] = price_range.split('-').map(Number);
      if (min) {
        paramCount++;
        query += ` AND price >= $${paramCount}`;
        params.push(min);
      }
      if (max) {
        paramCount++;
        query += ` AND price <= $${paramCount}`;
        params.push(max);
      }
    }
    
    // Add sorting
    const validSorts = ['name', 'price', 'popularity', 'created_at'];
    const sortField = validSorts.includes(sort) ? sort : 'name';
    query += ` ORDER BY ${sortField} ASC`;
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      packages: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error('Package search error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search packages'
    });
  }
});

// Blog endpoints (basic)
app.get('/api/blogs', async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const offset = (page - 1) * limit;
    
    let query = `
      SELECT 
        id, title, slug, excerpt, content, author,
        category, featured_image, published_at, reading_time,
        meta_title, meta_description
      FROM blog_posts 
      WHERE is_published = true
    `;
    
    const params = [limit, offset];
    let paramCount = 2;
    
    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }
    
    query += ` ORDER BY published_at DESC LIMIT $1 OFFSET $2`;
    
    const result = await pool.query(query, params);
    
    // Get total count
    let countQuery = `SELECT COUNT(*) FROM blog_posts WHERE is_published = true`;
    const countParams = [];
    
    if (category) {
      countQuery += ` AND category = $1`;
      countParams.push(category);
    }
    
    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);
    
    res.json({
      success: true,
      blogs: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Blogs fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs'
    });
  }
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

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  
  // Close database connections
  await pool.end();
  
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  
  // Close database connections
  await pool.end();
  
  process.exit(0);
});

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log('✅ Database connected successfully');
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📋 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
      
      if (process.env.NODE_ENV !== 'production') {
        console.log(`📖 API Documentation: http://localhost:${PORT}/api/health`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer();

module.exports = app;