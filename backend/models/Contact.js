const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
    validate: {
      validator: function (value) {
        // Allow letters, spaces, hyphens, and apostrophes
        return /^[a-zA-Z\s\-']+$/.test(value);
      },
      message: 'Name can only contain letters, spaces, hyphens, and apostrophes'
    }
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    maxlength: [254, 'Email cannot exceed 254 characters'],
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: 'Please provide a valid email address'
    }
  },

  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    minlength: [5, 'Subject must be at least 5 characters long'],
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },

  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },

  // Security and tracking fields
  ipAddress: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Validate IPv4 and IPv6 addresses
        return validator.isIP(value);
      },
      message: 'Invalid IP address format'
    }
  },

  userAgent: {
    type: String,
    required: true,
    maxlength: [500, 'User agent string too long']
  },

  // Timestamp with automatic creation
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },

  // Status for tracking (optional for future use)
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'archived'],
    default: 'new'
  },

  // Flag for spam detection (optional for future use)
  isSpam: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  collection: 'contact_submissions'
});

// Indexes for performance and security
contactSchema.index({ email: 1, timestamp: -1 });
contactSchema.index({ ipAddress: 1, timestamp: -1 });
contactSchema.index({ timestamp: -1 });
contactSchema.index({ status: 1 });

// Pre-save middleware for additional data sanitization
contactSchema.pre('save', function (next) {
  // Additional sanitization
  this.name = this.name.replace(/\s+/g, ' '); // Replace multiple spaces with single space
  this.subject = this.subject.replace(/\s+/g, ' ');
  this.message = this.message.replace(/\s+/g, ' ');

  // Remove any potential HTML/script tags for security
  const stripHtml = (str) => str.replace(/<[^>]*>/g, '');
  this.name = stripHtml(this.name);
  this.subject = stripHtml(this.subject);
  this.message = stripHtml(this.message);

  next();
});

// Static method to get recent submissions count for rate limiting
contactSchema.statics.getRecentSubmissionsCount = async function (ipAddress, timeWindow = 3600000) {
  const since = new Date(Date.now() - timeWindow);
  return await this.countDocuments({
    ipAddress: ipAddress,
    timestamp: { $gte: since }
  });
};

// Static method to check for potential spam (duplicate submissions)
contactSchema.statics.checkForDuplicates = async function (email, message, timeWindow = 300000) {
  const since = new Date(Date.now() - timeWindow);
  return await this.findOne({
    email: email,
    message: message,
    timestamp: { $gte: since }
  });
};

// Instance method to sanitize data before sending in response
contactSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  // Remove sensitive fields from response
  delete obj.ipAddress;
  delete obj.userAgent;
  delete obj.__v;
  return obj;
};

// Virtual for formatted timestamp
contactSchema.virtual('formattedTimestamp').get(function () {
  return this.timestamp.toISOString();
});

// Ensure virtual fields are serialized
contactSchema.set('toJSON', { virtuals: true });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;