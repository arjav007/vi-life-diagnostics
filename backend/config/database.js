const { Pool } = require('pg');
require('dotenv').config();

// Disable SSL certificate validation globally (last resort workaround)

const isProduction = process.env.NODE_ENV === 'production';

let connectionString = process.env.DATABASE_URL;

// Add sslmode=require if not present (good practice)
if (isProduction && connectionString && !connectionString.includes('sslmode=')) {
  connectionString = `${connectionString}${connectionString.includes('?') ? '&' : '?'}sslmode=require`;
}

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('Final connection string:', connectionString);
console.log('Using SSL config: true (global TLS validation disabled)');

const pool = new Pool({
  connectionString,
  ssl: isProduction ? true : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
});

module.exports = pool;
