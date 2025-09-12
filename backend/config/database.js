const { Pool } = require('pg');
require('dotenv').config();

// Use connection string for serverless deployment (preferred method)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // Increased for serverless
});

// Alternative: Individual environment variables (if you prefer this approach)
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 10000,
// });

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL Connected to Supabase');
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.error('Check your DATABASE_URL environment variable');
    // Don't exit process in serverless environment
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    throw error;
  }
};

// Handle pool errors
pool.on('error', (err, client) => {
  console.error('❌ Unexpected error on idle client', err);
});

module.exports = { pool, connectDB };