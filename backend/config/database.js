const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// Create a secure SSL configuration object for production
let sslConfig = false;
if (isProduction) {
  if (process.env.SUPABASE_CA_CERT) {
    sslConfig = {
      rejectUnauthorized: true, // This is the secure default
      ca: process.env.SUPABASE_CA_CERT, // Provide the certificate from the environment variable
    };
    console.log('✅ Production SSL configuration loaded.');
  } else {
    console.error('❌ FATAL: SUPABASE_CA_CERT environment variable not set for production.');
  }
}

// Create a single, reusable pool instance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig, // Use the secure config in production, or no SSL in development
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle database client', err);
});

// Export the single pool instance
module.exports = pool;