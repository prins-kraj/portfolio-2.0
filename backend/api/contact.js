const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const database = require('../config/database');
const contactRoutes = require('../routes/contact');
require('dotenv').config();

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip}`);
  next();
});

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      // Environment-specific origins
      process.env.CORS_ORIGIN,
      process.env.FRONTEND_URL,

      // Development origins
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5000',

      // Production origins
      'https://portfolio-gamma-azure-zm0bqy9dij.vercel.app',
      'https://portfolio-backend-nu-three.vercel.app',

      // Vercel preview deployments (wildcard pattern)
    ].filter(Boolean); // Remove undefined values

    // Check for Vercel preview deployments
    const isVercelPreview = origin && (
      origin.includes('vercel.app') ||
      origin.includes('portfolio-gamma-azure') ||
      origin.includes('portfolio-backend-nu')
    );

    if (allowedOrigins.includes(origin) || isVercelPreview) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Rate limiting - More restrictive for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: {
    success: false,
    error: {
      message: 'Too many contact form submissions, please try again later.',
      code: 'CONTACT_RATE_LIMIT_EXCEEDED'
    }
  }
});

app.use(contactLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Initialize database connection
let dbInitialized = false;
async function initializeDatabase() {
  if (!dbInitialized) {
    try {
      await database.connect();
      console.log('📊 Database connected for contact API');
      dbInitialized = true;
    } catch (error) {
      console.error('💥 Failed to connect to database:', error.message);
    }
  }
}

// Middleware to ensure database is connected
app.use(async (req, res, next) => {
  await initializeDatabase();
  next();
});

// Use contact routes
app.use('/', contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] Error:`, err.stack);

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: err.message
      }
    });
  }

  // Handle MongoDB errors
  if (err.name === 'MongoError' || err.name === 'MongooseError') {
    return res.status(500).json({
      success: false,
      error: {
        message: 'Database error occurred',
        code: 'DATABASE_ERROR'
      }
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Something went wrong!',
      code: err.code || 'INTERNAL_SERVER_ERROR'
    }
  });
});

module.exports = app;