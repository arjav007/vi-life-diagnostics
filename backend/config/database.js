const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

// Securely configure SSL for production
const sslConfig = isProduction 
  ? {
      rejectUnauthorized: true,
      ca: process.env.SUPABASE_CA_CERT,
    }
  : false;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: sslConfig,
});

module.exports = pool;