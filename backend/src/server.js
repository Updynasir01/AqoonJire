require('./loadEnv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const routes = require('./routes/index');
const { handleMuxWebhook } = require('./controllers/muxController');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');
const { pool } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── SECURITY & CORS ──────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' } // Allow serving uploaded files
}));

// Accept one or more allowed origins (comma-separated in FRONTEND_URL),
// plus localhost for development.
const allowedOrigins = [
  ...(process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean),
  'http://localhost:3000',
  'http://localhost:3001'
];

app.use(cors({
  origin(origin, callback) {
    // Allow non-browser requests (no origin) and any whitelisted origin.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────
// Mux webhook needs raw body for signature verification.
app.post('/api/videos/webhook/mux', express.raw({ type: 'application/json' }), handleMuxWebhook);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ─── STATIC FILES (uploaded content) ─────────────────────────────────────
app.use('/uploads', express.static(path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads')));

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV
    });
  } catch {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

// ─── API ROUTES ───────────────────────────────────────────────────────────
app.use('/api', apiLimiter, routes);

// ─── ERROR HANDLING ───────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── START ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 E-Learning API running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   API Base: http://localhost:${PORT}/api\n`);
});

module.exports = app;
