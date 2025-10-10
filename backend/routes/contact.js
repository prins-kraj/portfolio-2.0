const express = require('express');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const emailService = require('../services/emailService');

const router = express.Router();

// Validation rules for contact form
const contactValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s\-']+$/)
    .withMessage('Name can only contain letters, spaces, hyphens, and apostrophes')
    .escape(), // Sanitize HTML entities
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .isLength({ max: 254 })
    .withMessage('Email cannot exceed 254 characters')
    .normalizeEmail(), // Normalize email format
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters')
    .escape(), // Sanitize HTML entities
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
    .escape() // Sanitize HTML entities
];

// Helper function to get client IP address
const getClientIP = (req) => {
  return req.ip || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
         '0.0.0.0';
};

// Helper function to format validation errors
const formatValidationErrors = (errors) => {
  return errors.array().map(error => ({
    field: error.path,
    message: error.msg,
    value: error.value
  }));
};

// POST /api/contact - Submit contact form
router.post('/', contactValidationRules, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: formatValidationErrors(errors)
        }
      });
    }

    const { name, email, subject, message } = req.body;
    const clientIP = getClientIP(req);
    const userAgent = req.get('User-Agent') || 'Unknown';

    // Additional security checks
    
    // Check for recent submissions from same IP (additional rate limiting)
    const recentSubmissions = await Contact.getRecentSubmissionsCount(clientIP, 3600000); // 1 hour
    if (recentSubmissions >= 5) {
      return res.status(429).json({
        success: false,
        error: {
          message: 'Too many submissions from this IP address. Please try again later.',
          code: 'IP_RATE_LIMIT_EXCEEDED'
        }
      });
    }

    // Check for duplicate submissions (spam prevention)
    const duplicateSubmission = await Contact.checkForDuplicates(email, message, 300000); // 5 minutes
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
      name,
      email,
      subject,
      message,
      ipAddress: clientIP,
      userAgent
    });

    // Save to database
    const savedSubmission = await contactSubmission.save();

    // Log successful submission (without sensitive data)
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

    // Debug email service status
    console.log('📧 Email service status:', emailService.getStatus());

    // Send email notifications (don't wait for completion to avoid delays)
    Promise.allSettled([
      emailService.sendContactNotification(emailData),
      emailService.sendAutoReply(emailData)
    ]).then(results => {
      const [notificationResult, autoReplyResult] = results;
      
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

    // Return success response (without sensitive data)
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
        code: 'INTERNAL_SERVER_ERROR'
      }
    });
  }
});

// POST /api/contact/init-email - Initialize email service (development only)
router.post('/init-email', async (req, res) => {
  try {
    // Only allow in development environment
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        error: {
          message: 'Email initialization endpoint is not available in production',
          code: 'FORBIDDEN'
        }
      });
    }

    console.log('🔄 Manually reinitializing email service...');
    emailService.reinitialize();
    
    const status = emailService.getStatus();
    const isConnected = await emailService.verifyConnection();
    
    res.json({
      success: true,
      message: 'Email service reinitialized',
      data: {
        status,
        connected: isConnected
      }
    });

  } catch (error) {
    console.error('❌ Email initialization error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to initialize email service',
        code: 'EMAIL_INIT_ERROR',
        details: error.message
      }
    });
  }
});

// POST /api/contact/test-email - Test email functionality (development only)
router.post('/test-email', async (req, res) => {
  try {
    // Only allow in development environment
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        success: false,
        error: {
          message: 'Test email endpoint is not available in production',
          code: 'FORBIDDEN'
        }
      });
    }

    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Email address is required',
          code: 'VALIDATION_ERROR'
        }
      });
    }

    // Verify email connection first
    const connectionVerified = await emailService.verifyConnection();
    if (!connectionVerified) {
      return res.status(500).json({
        success: false,
        error: {
          message: 'Email service connection failed',
          code: 'EMAIL_CONNECTION_ERROR'
        }
      });
    }

    // Send test email
    const result = await emailService.sendTestEmail(email);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Test email sent successfully',
        data: {
          messageId: result.messageId,
          response: result.response
        }
      });
    } else {
      res.status(500).json({
        success: false,
        error: {
          message: 'Failed to send test email',
          code: 'EMAIL_SEND_ERROR',
          details: result.error
        }
      });
    }

  } catch (error) {
    console.error('❌ Test email error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'An error occurred while testing email functionality',
        code: 'INTERNAL_SERVER_ERROR'
      }
    });
  }
});

// GET /api/contact/email-status - Check email service status
router.get('/email-status', async (req, res) => {
  try {
    // Get service status first
    const serviceStatus = emailService.getStatus();
    
    // Try to verify connection
    let isConnected = false;
    let connectionError = null;
    
    try {
      isConnected = await emailService.verifyConnection();
    } catch (error) {
      connectionError = error.message;
    }
    
    res.json({
      success: true,
      data: {
        serviceStatus,
        emailServiceConnected: isConnected,
        connectionError,
        emailHost: process.env.EMAIL_HOST || 'Not configured',
        emailPort: process.env.EMAIL_PORT || 'Not configured',
        emailUser: process.env.EMAIL_USER ? '***configured***' : 'Not configured',
        emailFrom: process.env.EMAIL_FROM || 'Not configured',
        emailTo: process.env.EMAIL_TO || 'Not configured'
      }
    });

  } catch (error) {
    console.error('❌ Email status check error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to check email service status',
        code: 'EMAIL_STATUS_ERROR',
        details: error.message
      }
    });
  }
});

// GET /api/contact/stats - Get contact form statistics (optional, for admin use)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: null,
          totalSubmissions: { $sum: 1 },
          todaySubmissions: {
            $sum: {
              $cond: [
                {
                  $gte: ['$timestamp', new Date(new Date().setHours(0, 0, 0, 0))]
                },
                1,
                0
              ]
            }
          },
          thisWeekSubmissions: {
            $sum: {
              $cond: [
                {
                  $gte: ['$timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalSubmissions: 0,
      todaySubmissions: 0,
      thisWeekSubmissions: 0
    };

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('❌ Error fetching contact stats:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch statistics',
        code: 'STATS_ERROR'
      }
    });
  }
});

module.exports = router;