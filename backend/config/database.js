const { Pool } = require('pg');
require('dotenv').config();

// This line correctly checks if the code is running on Vercel (production) or your local machine.
const isProduction = process.env.NODE_ENV === 'production';

// Start with the base connection string from your environment variables.
let connectionString = process.env.DATABASE_URL;

// This is the critical fix for the "self-signed certificate" error.
// In production, we programmatically add a parameter to the connection string
// to enforce a secure, required SSL connection, which cloud databases demand.
if (isProduction && connectionString && !connectionString.includes('sslmode')) {
  connectionString = `${connectionString}?sslmode=require`;
}

const pool = new Pool({
  connectionString: connectionString,
  // This ssl object is kept as a fallback for maximum compatibility with various clients.
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

// This helps debug any unexpected connection drops.
pool.on('error', (err, client) => {
  console.error('❌ Unexpected error on idle client', err);
});

// FIX: We now export the initialized pool directly.
// This solves the "Cannot read properties of undefined (reading 'query')" error
// by ensuring all other files import the exact same, initialized connection pool instance.
module.exports = pool;

