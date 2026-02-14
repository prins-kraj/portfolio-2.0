const emailService = require('../services/emailService');
require('dotenv').config();

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    console.log('🧪 Testing email service...');
    
    // Initialize email service
    emailService.ensureInitialized();
    
    // Check status
    const status = emailService.getStatus();
    console.log('📧 Email service status:', status);

    // Try to verify connection
    console.log('🔍 Verifying email connection...');
    const isConnected = await emailService.verifyConnection();
    console.log('📧 Connection verified:', isConnected);

    if (!isConnected) {
      return res.status(500).json({
        success: false,
        error: 'Email service connection failed',
        status
      });
    }

    // Send test email
    console.log('📧 Sending test email...');
    const testEmail = req.body.email || process.env.EMAIL_TO;
    
    const result = await emailService.sendTestEmail(testEmail);
    console.log('📧 Test email result:', result);

    res.status(200).json({
      success: result.success,
      message: result.success ? 'Test email sent successfully!' : 'Failed to send test email',
      result,
      status
    });

  } catch (error) {
    console.error('❌ Test email error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
};
