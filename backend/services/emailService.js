const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

// Ensure dotenv is loaded
require('dotenv').config();

class EmailService {
  constructor() {
    this.transporter = null;
    this.templates = new Map();
    this.initialized = false;
    // Don't initialize immediately in serverless
  }

  // Force reinitialize the transporter
  reinitialize() {
    this.transporter = null;
    this.initialized = false;
    this.initializeTransporter();
  }

  // Debug method to check service status
  getStatus() {
    return {
      initialized: this.initialized,
      hasTransporter: !!this.transporter,
      emailUser: process.env.EMAIL_USER ? '***configured***' : 'Not set',
      emailHost: process.env.EMAIL_HOST || 'Not set',
      emailPort: process.env.EMAIL_PORT || 'Not set',
      emailFrom: process.env.EMAIL_FROM ? '***configured***' : 'Not set',
      emailTo: process.env.EMAIL_TO ? '***configured***' : 'Not set'
    };
  }

  // Initialize the email transporter
  initializeTransporter() {
    try {
      // Check if required environment variables are set
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn('⚠️ Email credentials not configured. Email functionality will be disabled.');
        this.initialized = false;
        return;
      }

      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false // Allow self-signed certificates
        },
        // Serverless optimizations
        pool: false, // Disable connection pooling for serverless
        maxConnections: 1,
        maxMessages: 1
      });

      this.initialized = true;
      console.log('📧 Email transporter initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize email transporter:', error.message);
      this.initialized = false;
      this.transporter = null;
    }
  }

  // Verify email configuration
  async verifyConnection() {
    try {
      this.ensureInitialized();
      
      if (!this.transporter) {
        return false;
      }

      await this.transporter.verify();
      console.log('✅ Email server connection verified');
      return true;
    } catch (error) {
      console.error('❌ Email server connection failed:', error.message);
      return false;
    }
  }

  // Load and compile email template
  async loadTemplate(templateName) {
    try {
      if (this.templates.has(templateName)) {
        return this.templates.get(templateName);
      }

      const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.hbs`);
      
      let templateContent;
      try {
        templateContent = await fs.readFile(templatePath, 'utf8');
      } catch (fileError) {
        console.warn(`⚠️ Template file not found: ${templatePath}, using fallback`);
        // Return a fallback template
        return handlebars.compile(this.getFallbackTemplate(templateName));
      }
      
      const compiledTemplate = handlebars.compile(templateContent);
      this.templates.set(templateName, compiledTemplate);
      return compiledTemplate;
    } catch (error) {
      console.error(`❌ Failed to load email template ${templateName}:`, error.message);
      // Return a fallback template
      return handlebars.compile(this.getFallbackTemplate(templateName));
    }
  }

  // Get fallback template content
  getFallbackTemplate(templateName) {
    if (templateName === 'contact-notification') {
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> {{name}}</p>
          <p><strong>Email:</strong> {{email}}</p>
          <p><strong>Subject:</strong> {{subject}}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">{{message}}</div>
          <p><strong>Timestamp:</strong> {{timestamp}}</p>
        </div>
      `;
    } else if (templateName === 'auto-reply') {
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Thank you for contacting me!</h2>
          <p>Hi {{name}},</p>
          <p>Thank you for reaching out through my portfolio contact form!</p>
          <p>I have received your message regarding "{{subject}}" and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Prince Kumar</p>
        </div>
      `;
    }
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>{{subject}}</h2>
        <p>{{message}}</p>
      </div>
    `;
  }

  // Ensure transporter is initialized
  ensureInitialized() {
    if (!this.initialized || !this.transporter) {
      console.log('📧 Initializing email transporter...');
      this.initializeTransporter();
    }
  }

  // Send contact form notification email
  async sendContactNotification(contactData) {
    try {
      console.log('📧 Starting sendContactNotification...');
      this.ensureInitialized();
      
      if (!this.transporter) {
        console.warn('⚠️ Email transporter not available - skipping notification email');
        return {
          success: false,
          error: 'Email service not configured'
        };
      }

      console.log('📧 Loading contact-notification template...');
      const template = await this.loadTemplate('contact-notification');
      
      const emailData = {
        ...contactData,
        timestamp: new Date(contactData.timestamp).toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        portfolioUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
      };

      console.log('📧 Compiling email template...');
      const htmlContent = template(emailData);

      const mailOptions = {
        from: {
          name: 'Portfolio Contact Form',
          address: process.env.EMAIL_FROM
        },
        to: process.env.EMAIL_TO,
        subject: `New Contact Form Submission: ${contactData.subject}`,
        html: htmlContent,
        text: this.generatePlainTextEmail(contactData), // Fallback plain text
        replyTo: contactData.email,
        headers: {
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal',
          'X-Mailer': 'Portfolio Contact Form'
        }
      };

      console.log('📧 Sending email to:', process.env.EMAIL_TO);
      const result = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Contact notification email sent successfully:', result.messageId);
      return {
        success: true,
        messageId: result.messageId,
        response: result.response
      };

    } catch (error) {
      console.error('❌ Failed to send contact notification email:', error.message);
      console.error('❌ Error stack:', error.stack);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Send auto-reply email to the contact form submitter
  async sendAutoReply(contactData) {
    try {
      console.log('📧 Starting sendAutoReply...');
      this.ensureInitialized();
      
      if (!this.transporter) {
        console.warn('⚠️ Email transporter not available - skipping auto-reply email');
        return {
          success: false,
          error: 'Email service not configured'
        };
      }

      console.log('📧 Loading auto-reply template...');
      const template = await this.loadTemplate('auto-reply');
      
      const emailData = {
        name: contactData.name,
        subject: contactData.subject,
        portfolioUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
        ownerName: 'Prince Kumar',
        ownerEmail: process.env.EMAIL_TO
      };

      console.log('📧 Compiling auto-reply template...');
      const htmlContent = template(emailData);

      const mailOptions = {
        from: {
          name: 'Prince Kumar',
          address: process.env.EMAIL_FROM
        },
        to: contactData.email,
        subject: `Thank you for contacting me - ${contactData.subject}`,
        html: htmlContent,
        text: this.generateAutoReplyPlainText(contactData),
        headers: {
          'X-Priority': '3',
          'X-MSMail-Priority': 'Normal',
          'X-Mailer': 'Portfolio Contact Form'
        }
      };

      console.log('📧 Sending auto-reply to:', contactData.email);
      const result = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Auto-reply email sent successfully:', result.messageId);
      return {
        success: true,
        messageId: result.messageId,
        response: result.response
      };

    } catch (error) {
      console.error('❌ Failed to send auto-reply email:', error.message);
      console.error('❌ Error stack:', error.stack);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate plain text version of contact notification
  generatePlainTextEmail(contactData) {
    return `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject}

Message:
${contactData.message}

Submitted: ${new Date(contactData.timestamp).toLocaleString('en-US', {
  timeZone: 'Asia/Kolkata'
})}

IP Address: ${contactData.ipAddress || 'Unknown'}
User Agent: ${contactData.userAgent || 'Unknown'}

---
This email was sent from your portfolio contact form.
    `.trim();
  }

  // Generate plain text version of auto-reply
  generateAutoReplyPlainText(contactData) {
    return `
Hi ${contactData.name},

Thank you for reaching out through my portfolio contact form!

I have received your message regarding "${contactData.subject}" and will get back to you as soon as possible, typically within 24-48 hours.

In the meantime, feel free to explore my portfolio and connect with me on social media.

Best regards,
Prince Kumar

---
This is an automated response. Please do not reply to this email.
If you need immediate assistance, you can reach me at ${process.env.EMAIL_TO}
    `.trim();
  }

  // Test email functionality
  async sendTestEmail(toEmail) {
    try {
      this.ensureInitialized();
      
      if (!this.transporter) {
        throw new Error('Email transporter not initialized - check your email configuration');
      }

      const mailOptions = {
        from: {
          name: 'Portfolio Test',
          address: process.env.EMAIL_FROM
        },
        to: toEmail,
        subject: 'Portfolio Email Service Test',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #3B82F6;">Email Service Test</h2>
            <p>This is a test email to verify that your portfolio email service is working correctly.</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p>If you received this email, your email configuration is working properly!</p>
          </div>
        `,
        text: `
Portfolio Email Service Test

This is a test email to verify that your portfolio email service is working correctly.

Timestamp: ${new Date().toLocaleString()}

If you received this email, your email configuration is working properly!
        `.trim()
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Test email sent successfully:', result.messageId);
      return {
        success: true,
        messageId: result.messageId,
        response: result.response
      };

    } catch (error) {
      console.error('❌ Failed to send test email:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Create and export a singleton instance
const emailService = new EmailService();

module.exports = emailService;