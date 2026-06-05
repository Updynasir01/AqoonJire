const { Pool } = require('pg');

const host = process.env.DB_HOST || 'localhost';
const password = process.env.DB_PASSWORD;
const remote =
  host !== 'localhost' && host !== '127.0.0.1';

if (
  remote &&
  (typeof password !== 'string' || password.length === 0)
) {
  throw new Error(
    'DB_PASSWORD must be set in backend/.env for remote PostgreSQL (SCRAM auth). ' +
      'Ensure backend/.env loads before the pool is created (use src/loadEnv.js from CLI scripts).',
  );
}

const supabaseLike = /\.supabase\.(co|com)$/i.test(host);
const connectionTimeoutMillis = Number(
  process.env.DB_CONNECTION_TIMEOUT_MS || (remote ? 10000 : 2000),
);

const pool = new Pool({
  host,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'elearning_db',
  user: process.env.DB_USER || 'postgres',
  password,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis,
  ...(supabaseLike ? { ssl: { rejectUnauthorized: false } } : {}),
});

pool.on('connect', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('✅ Database connected');
  }
});

pool.on('error', (err) => {
  console.error('❌ Database error:', err.message);
});

// Helper: run a query
const query = (text, params) => pool.query(text, params);

// Helper: get a client for transactions
const getClient = () => pool.connect();

module.exports = { query, getClient, pool };
