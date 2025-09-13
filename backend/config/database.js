const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// Create a secure SSL configuration object for production
let sslConfig = false;
if (isProduction) {
  // Check if the certificate content is available in the environment variable
  if (process.env.SUPABASE_CA_CERT) {
    sslConfig = {
      rejectUnauthorized: true, // This is crucial for security
      ca: process.env.SUPABASE_CA_CERT, // Provide the certificate content from the variable
    };
    console.log('✅ SSL configuration loaded from environment variable.');
  } else {
    console.error('❌ FATAL: SUPABASE_CA_CERT environment variable not set for production.');
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Use the secure SSL config in production, or no SSL in development
  ssl: sslConfig,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
});

module.exports = pool;