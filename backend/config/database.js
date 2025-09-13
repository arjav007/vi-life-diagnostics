const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// Create a secure SSL configuration object for production
let sslConfig = false;
if (isProduction) {
  // 1. Build a reliable, absolute path to your certificate file
  // This path goes from this file (in 'config'), up one level to 'backend', then into 'cert'
  const certPath = path.resolve(__dirname, '..', 'cert', 'supabase.crt');

  // 2. Check if the certificate file exists before trying to read it
  if (fs.existsSync(certPath)) {
    sslConfig = {
      rejectUnauthorized: true, // This is crucial for security
      ca: fs.readFileSync(certPath).toString(), // Provide the certificate content
    };
    console.log('✅ SSL certificate loaded for production.');
  } else {
    console.error('❌ SSL certificate not found at:', certPath);
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // 3. Use the secure SSL config in production, or no SSL in development
  ssl: sslConfig,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
});

module.exports = pool;