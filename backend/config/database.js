const { Pool } = require('pg');
const fs = require('fs'); // 1. Import the File System module to read files
const path = require('path'); // 2. Import the Path module for reliable path handling
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

// 3. Build a reliable, absolute path to your certificate file
// It navigates from this file (in 'config') up one level to 'backend', then into 'cert'
const certPath = path.resolve(__dirname, '..', 'cert', 'supabase.crt');

// 4. Create the secure SSL configuration object
const sslConfig = {
  rejectUnauthorized: true, // This is crucial for security
  ca: fs.readFileSync(certPath).toString(), // Provide the certificate content
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // 5. Use the secure SSL config only in production
  ssl: isProduction ? sslConfig : false, 
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
});

module.exports = pool;