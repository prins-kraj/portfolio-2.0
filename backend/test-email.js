const emailService = require('./services/emailService');
require('dotenv').config();

async function testEmailService() {
  console.log('🧪 Testing Email Service...\n');

  try {
    // Test 1: Verify connection
    console.log('1. Testing email connection...');
    const connectionResult = await emailService.verifyConnection();
    console.log(`   Connection: ${connectionResult ? '✅ Success' : '❌ Failed'}\n`);

    if (!connectionResult) {
      console.log('❌ Email connection failed. Please check your email configuration.');
      return;
    }

    // Test 2: Send test email
    const testEmail = process.env.EMAIL_TO || 'test@example.com';
    console.log(`2. Sending test email to ${testEmail}...`);
    const testResult = await emailService.sendTestEmail(testEmail);
    console.log(`   Test Email: ${testResult.success ? '✅ Success' : '❌ Failed'}`);
    if (testResult.success) {
      console.log(`   Message ID: ${testResult.messageId}`);
    } else {
      console.log(`   Error: ${testResult.error}`);
    }
    console.log('');

    // Test 3: Send contact notification
    console.log('3. Testing contact notification email...');
    const sampleContactData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Test Contact Form Submission',
      message: 'This is a test message from the contact form to verify email functionality.',
      timestamp: new Date(),
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Test Browser)'
    };

    const notificationResult = await emailService.sendContactNotification(sampleContactData);
    console.log(`   Notification Email: ${notificationResult.success ? '✅ Success' : '❌ Failed'}`);
    if (notificationResult.success) {
      console.log(`   Message ID: ${notificationResult.messageId}`);
    } else {
      console.log(`   Error: ${notificationResult.error}`);
    }
    console.log('');

    // Test 4: Send auto-reply
    console.log('4. Testing auto-reply email...');
    const autoReplyResult = await emailService.sendAutoReply(sampleContactData);
    console.log(`   Auto-reply Email: ${autoReplyResult.success ? '✅ Success' : '❌ Failed'}`);
    if (autoReplyResult.success) {
      console.log(`   Message ID: ${autoReplyResult.messageId}`);
    } else {
      console.log(`   Error: ${autoReplyResult.error}`);
    }
    console.log('');

    console.log('🎉 Email service testing completed!');
    console.log('\n📧 If all tests passed, your email service is ready to use.');
    console.log('📝 Remember to update your .env file with your actual Gmail app password.');

  } catch (error) {
    console.error('❌ Email service test failed:', error.message);
  }
}

// Run the test
testEmailService().then(() => {
  process.exit(0);
}).catch(error => {
  console.error('💥 Test script error:', error);
  process.exit(1);
});