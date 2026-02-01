const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const database = require('../config/database');
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
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP, please try again later.',
      code: 'RATE_LIMIT_EXCEEDED'
    }
  }
});

app.use(generalLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Initialize database connection
let dbInitialized = false;
async function initializeDatabase() {
  if (!dbInitialized) {
    try {
      await database.connect();
      console.log('📊 Database connected for serverless function');
      dbInitialized = true;
    } catch (error) {
      console.error('💥 Failed to connect to database:', error.message);
    }
  }
}

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio API Server Running',
    timestamp: new Date().toISOString(),
    origin: req.get('Origin'),
    corsOrigin: process.env.CORS_ORIGIN,
    frontendUrl: process.env.FRONTEND_URL
  });
});

// CORS test endpoint
app.get('/cors-test', (req, res) => {
  res.json({
    success: true,
    message: 'CORS is working correctly',
    origin: req.get('Origin'),
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/health', async (req, res) => {
  try {
    await initializeDatabase();
    const dbStatus = database.getConnectionStatus();
    const dbTest = await database.testConnection();

    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: {
        connected: dbStatus.isConnected,
        readyState: dbStatus.readyState,
        readyStateText: dbStatus.readyStateText,
        host: dbStatus.host,
        name: dbStatus.name,
        retryCount: dbStatus.retryCount,
        maxRetries: dbStatus.maxRetries,
        testResult: dbTest
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: {
        message: 'Health check failed',
        details: error.message
      }
    });
  }
});

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

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found',
      code: 'NOT_FOUND'
    }
  });
});

// Serverless function handler
module.exports = async (req, res) => {
  await initializeDatabase();
  return app(req, res);
};