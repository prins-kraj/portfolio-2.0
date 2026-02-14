const Contact = require('../models/Contact');
const emailService = require('../services/emailService');
const database = require('../config/database');
require('dotenv').config();

// Helper function to get client IP address
const getClientIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
         req.headers['x-real-ip'] ||
         '0.0.0.0';
};

// CORS headers
const setCorsHeaders = (res, origin) => {
  const allowedOrigins = [
    process.env.CORS_ORIGIN,
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://portfolio-gamma-azure-zm0bqy9dij.vercel.app',
    'https://portfolio-backend-sigma-olive.vercel.app',
  ].filter(Boolean);

  const isVercelPreview = origin && origin.includes('vercel.app');
  
  if (allowedOrigins.includes(origin) || isVercelPreview) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
};

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

module.exports = async (req, res) => {
  const origin = req.headers.origin;
  setCorsHeaders(res, origin);

  console.log(`📨 Contact API called: ${req.method} from ${origin}`);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      error: {
        message: 'Method not allowed',
        code: 'METHOD_NOT_ALLOWED'
      }
    });
    return;
  }

  try {
    // Initialize database
    await initializeDatabase();

    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'All fields are required',
          code: 'VALIDATION_ERROR',
          details: [
            { field: 'name', message: 'Name is required' },
            { field: 'email', message: 'Email is required' },
            { field: 'subject', message: 'Subject is required' },
            { field: 'message', message: 'Message is required' }
          ]
        }
      });
    }

    // Validate name
    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Name must be between 2 and 100 characters',
          code: 'VALIDATION_ERROR'
        }
      });
    }

    if (!/^[a-zA-Z\s\-']+$/.test(name)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
          code: 'VALIDATION_ERROR',
          details: [
            { field: 'name', message: 'Name can only contain letters, spaces, hyphens, and apostrophes', value: name }
          ]
        }
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Please provide a valid email address',
          code: 'VALIDATION_ERROR'
        }
      });
    }

    // Validate subject
    if (subject.length < 5 || subject.length > 200) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Subject must be between 5 and 200 characters',
          code: 'VALIDATION_ERROR'
        }
      });
    }

    // Validate message
    if (message.length < 10 || message.length > 1000) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Message must be between 10 and 1000 characters',
          code: 'VALIDATION_ERROR'
        }
      });
    }

    const clientIP = getClientIP(req);
    const userAgent = req.headers['user-agent'] || 'Unknown';

    // Check for recent submissions from same IP (rate limiting)
    const recentSubmissions = await Contact.countDocuments({
      ipAddress: clientIP,
      timestamp: { $gte: new Date(Date.now() - 3600000) } // 1 hour
    });

    if (recentSubmissions >= 5) {
      return res.status(429).json({
        success: false,
        error: {
          message: 'Too many submissions from this IP address. Please try again later.',
          code: 'IP_RATE_LIMIT_EXCEEDED'
        }
      });
    }

    // Check for duplicate submissions
    const duplicateSubmission = await Contact.findOne({
      email: email.trim().toLowerCase(),
      message: message.trim(),
      timestamp: { $gte: new Date(Date.now() - 300000) } // 5 minutes
    });

    if (duplicateSubmission) {
      return res.status(409).json({
        success: false,
        error: {
          message: 'Duplicate submission detected. Please wait before submitting again.',
          code: 'DUPLICATE_SUBMISSION'
        }
      });
    }

    // Create new contact submission
    const contactSubmission = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      ipAddress: clientIP,
      userAgent
    });

    // Save to database
    const savedSubmission = await contactSubmission.save();

    console.log(`📧 New contact submission received from ${email} at ${new Date().toISOString()}`);

    // Prepare email data
    const emailData = {
      name: savedSubmission.name,
      email: savedSubmission.email,
      subject: savedSubmission.subject,
      message: savedSubmission.message,
      timestamp: savedSubmission.timestamp,
      ipAddress: savedSubmission.ipAddress,
      userAgent: savedSubmission.userAgent
    };

    // Send email notifications (don't wait for completion)
    Promise.allSettled([
      emailService.sendContactNotification(emailData),
      emailService.sendAutoReply(emailData)
    ]).then(results => {
      const [notificationResult, autoReplyResult] = results;
      
      console.log('📧 Email sending results:', {
        notification: notificationResult.status,
        autoReply: autoReplyResult.status
      });
      
      if (notificationResult.status === 'fulfilled' && notificationResult.value.success) {
        console.log('✅ Contact notification email sent successfully');
      } else {
        console.error('❌ Failed to send contact notification email:', 
          notificationResult.reason || notificationResult.value?.error);
      }
      
      if (autoReplyResult.status === 'fulfilled' && autoReplyResult.value.success) {
        console.log('✅ Auto-reply email sent successfully');
      } else {
        console.error('❌ Failed to send auto-reply email:', 
          autoReplyResult.reason || autoReplyResult.value?.error);
      }
    }).catch(error => {
      console.error('❌ Unexpected error in email sending:', error);
    });

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        id: savedSubmission._id,
        timestamp: savedSubmission.timestamp,
        status: savedSubmission.status
      }
    });

  } catch (error) {
    console.error('❌ Contact form submission error:', error);

    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }));

      return res.status(400).json({
        success: false,
        error: {
          message: 'Data validation failed',
          code: 'MONGOOSE_VALIDATION_ERROR',
          details: validationErrors
        }
      });
    }

    if (error.name === 'MongoError' || error.name === 'MongooseError') {
      return res.status(500).json({
        success: false,
        error: {
          message: 'Database error occurred while saving your message. Please try again.',
          code: 'DATABASE_ERROR'
        }
      });
    }

    // Generic error response
    res.status(500).json({
      success: false,
      error: {
        message: 'An unexpected error occurred. Please try again later.',
        code: 'INTERNAL_SERVER_ERROR',
        details: error.message
      }
    });
  }
};
