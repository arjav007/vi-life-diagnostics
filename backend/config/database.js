const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// Start with the base connection string from your environment variables
let connectionString = process.env.DATABASE_URL;

// FIX: This is the final and most important change.
// In production, we will programmatically add a parameter to the connection string
// to enforce a secure connection, which resolves the 'self-signed certificate' error.
if (isProduction && connectionString && !connectionString.includes('sslmode')) {
  connectionString = `${connectionString}?sslmode=require`;
}

const pool = new Pool({
  connectionString: connectionString,
  // This ssl object is kept as a fallback for maximum compatibility.
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err, client) => {
  console.error('❌ Unexpected error on idle client', err);
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL Connected');
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    if (!isProduction) {
      process.exit(1);
    }
    throw error;
  }
};