require('dotenv').config();
const emailService = require('./services/emailService');

console.log('🔍 Debugging Email Service...\n');

// Check environment variables
console.log('Environment Variables:');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***SET***' : 'NOT SET');
console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
console.log('EMAIL_TO:', process.env.EMAIL_TO);
console.log('EMAIL_SECURE:', process.env.EMAIL_SECURE);
console.log('');

// Check email service status
console.log('Email Service Status:');
console.log(emailService.getStatus());
console.log('');

// Try to reinitialize
console.log('Attempting to reinitialize email service...');
emailService.reinitialize();
console.log('After reinitialize:', emailService.getStatus());
console.log('');

// Test connection
console.log('Testing email connection...');
emailService.verifyConnection().then(result => {
  console.log('Connection test result:', result);
  process.exit(0);
}).catch(error => {
  console.error('Connection test error:', error);
  process.exit(1);
});