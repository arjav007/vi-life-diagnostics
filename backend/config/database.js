const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// Use connection string for Supabase (serverless/production safe)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Handle pool errors
pool.on('error', (err, client) => {
  console.error('❌ Unexpected error on idle client', err);
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL Connected to Supabase');
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.error('Check your DATABASE_URL environment variable');
    // Don't exit process in serverless production environment
    if (!isProduction) {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = { pool, connectDB };
