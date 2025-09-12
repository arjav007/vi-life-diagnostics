const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// This line correctly checks if the code is running on Vercel (production).
const isProduction = process.env.NODE_ENV === 'production';

// Load the Supabase CA certificate
const supabaseCA = fs.readFileSync(path.join(__dirname, '../cert/supabase.crt')).toString();

// Start with the base connection string from your environment variables.
let connectionString = process.env.DATABASE_URL;

// DEBUG LOGS: Verify environment variables and connection string
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('Initial connection string:', connectionString);

// In production, add sslmode=require if not already present.
if (isProduction && connectionString && !connectionString.includes('sslmode')) {
  connectionString = `${connectionString}?sslmode=require`;
}

// DEBUG LOG: Log final connection string and SSL config
console.log('Final connection string:', connectionString);
console.log('Using SSL config:', isProduction ? { ca: supabaseCA, rejectUnauthorized: true } : false);

const pool = new Pool({
  connectionString: connectionString,
  ssl: isProduction 
    ? { 
        ca: supabaseCA, 
        rejectUnauthorized: false
      } 
    : false,
});

// This helps debug any unexpected connection drops.
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
});

// Export the initialized pool directly
module.exports = pool;
