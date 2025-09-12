const { Pool } = require('pg');
require('dotenv').config();

// This line correctly checks if the code is running on Vercel (production).
const isProduction = process.env.NODE_ENV === 'production';

// Start with the base connection string from your environment variables.
let connectionString = process.env.DATABASE_URL;

// DEBUG LOGS: Verify environment variables and connection string
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('Initial connection string:', connectionString);

// This is the CRITICAL FIX.
// In production, we programmatically add a parameter to the connection string
// to enforce a secure connection. This is required by cloud database providers.
if (isProduction && connectionString && !connectionString.includes('sslmode')) {
  connectionString = `${connectionString}?sslmode=require`;
}

// DEBUG LOG: Log final connection string and SSL config
console.log('Final connection string:', connectionString);
console.log('Using SSL config:', isProduction ? { rejectUnauthorized: false } : false);

const pool = new Pool({
  connectionString: connectionString,
  // This ssl object is ALSO CRITICAL. It tells the client to allow
  // the 'self-signed certificate' that the database is presenting.
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

// This helps debug any unexpected connection drops.
pool.on('error', (err, client) => {
  console.error('❌ Unexpected error on idle client', err);
});

// We export the initialized pool directly to ensure all other files
// import the exact same, correctly configured connection pool instance.
module.exports = pool;
