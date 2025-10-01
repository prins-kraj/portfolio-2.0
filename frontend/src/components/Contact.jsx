import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaLinkedin, 
  FaGithub, 
  FaPaperPlane,
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/personalInfo';
import { submitContactForm } from '../services/contactService';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [submitMessage, setSubmitMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Form validation rules
  const validateField = (name, value) => {
    const errors = {};

    switch (name) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          errors.name = 'Name must be at least 2 characters';
        } else if (value.trim().length > 100) {
          errors.name = 'Name cannot exceed 100 characters';
        } else if (!/^[a-zA-Z\s\-']+$/.test(value.trim())) {
          errors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }
        break;

      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          errors.email = 'Please enter a valid email address';
        } else if (value.trim().length > 254) {
          errors.email = 'Email cannot exceed 254 characters';
        }
        break;

      case 'subject':
        if (!value.trim()) {
          errors.subject = 'Subject is required';
        } else if (value.trim().length < 5) {
          errors.subject = 'Subject must be at least 5 characters';
        } else if (value.trim().length > 200) {
          errors.subject = 'Subject cannot exceed 200 characters';
        }
        break;

      case 'message':
        if (!value.trim()) {
          errors.message = 'Message is required';
        } else if (value.trim().length < 10) {
          errors.message = 'Message must be at least 10 characters';
        } else if (value.trim().length > 1000) {
          errors.message = 'Message cannot exceed 1000 characters';
        }
        break;

      default:
        break;
    }

    return errors;
  };

  // Handle input changes with real-time validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear submit status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
      setSubmitMessage('');
    }

    // Real-time validation
    const fieldError = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      ...fieldError,
      // Clear error if field is now valid
      ...(Object.keys(fieldError).length === 0 && { [name]: undefined })
    }));
  };

  // Validate entire form
  const validateForm = () => {
    const errors = {};
    
    Object.keys(formData).forEach(field => {
      const fieldError = validateField(field, formData[field]);
      Object.assign(errors, fieldError);
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      setSubmitStatus('error');
      setSubmitMessage('Please fix the errors above and try again.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage(result.message);
        
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setFieldErrors({});
      } else {
        setSubmitStatus('error');
        
        // Handle validation errors from server
        if (result.error.details && Array.isArray(result.error.details)) {
          const serverErrors = {};
          result.error.details.forEach(error => {
            serverErrors[error.field] = error.message;
          });
          setFieldErrors(serverErrors);
          setSubmitMessage('Please fix the errors and try again.');
        } else {
          setSubmitMessage(result.error.message);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
          Get In Touch
        </h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Have a project in mind or want to discuss opportunities? 
          I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <motion.div variants={itemVariants}>
          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-heading font-semibold text-text-primary mb-6">
              Send Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background/50 border rounded-lg text-text-primary placeholder-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                    fieldErrors.name ? 'border-red-500' : 'border-border/30'
                  }`}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {fieldErrors.name && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <FaExclamationTriangle className="text-xs" />
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background/50 border rounded-lg text-text-primary placeholder-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                    fieldErrors.email ? 'border-red-500' : 'border-border/30'
                  }`}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
                {fieldErrors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <FaExclamationTriangle className="text-xs" />
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-background/50 border rounded-lg text-text-primary placeholder-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${
                    fieldErrors.subject ? 'border-red-500' : 'border-border/30'
                  }`}
                  placeholder="What's this about?"
                  disabled={isSubmitting}
                />
                {fieldErrors.subject && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <FaExclamationTriangle className="text-xs" />
                    {fieldErrors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-background/50 border rounded-lg text-text-primary placeholder-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-vertical ${
                    fieldErrors.message ? 'border-red-500' : 'border-border/30'
                  }`}
                  placeholder="Tell me about your project or inquiry..."
                  disabled={isSubmitting}
                />
                <div className="flex justify-between items-center mt-1">
                  {fieldErrors.message ? (
                    <p className="text-sm text-red-400 flex items-center gap-1">
                      <FaExclamationTriangle className="text-xs" />
                      {fieldErrors.message}
                    </p>
                  ) : (
                    <span></span>
                  )}
                  <span className="text-xs text-text-secondary">
                    {formData.message.length}/1000
                  </span>
                </div>
              </div>

              {/* Submit Status Message */}
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg flex items-center gap-2 ${
                    submitStatus === 'success' 
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <FaCheckCircle className="text-lg flex-shrink-0" />
                  ) : (
                    <FaExclamationTriangle className="text-lg flex-shrink-0" />
                  )}
                  <span className="text-sm">{submitMessage}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-primary/50 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div> 
       {/* Contact Information */}
        <motion.div variants={itemVariants} className="space-y-8">
          {/* Contact Details */}
          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-heading font-semibold text-text-primary mb-6">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              {/* Email */}
              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border/20 hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FaEnvelope className="text-primary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Email</p>
                  <p className="text-text-primary font-medium">{personalInfo.email}</p>
                </div>
                <FaExternalLinkAlt className="text-text-secondary/60 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              {/* Phone */}
              <motion.a
                href={`tel:${personalInfo.phone}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border/20 hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <FaPhone className="text-secondary text-lg" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Phone</p>
                  <p className="text-text-primary font-medium">{personalInfo.phone}</p>
                </div>
                <FaExternalLinkAlt className="text-text-secondary/60 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-border/20">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-accent text-lg" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Location</p>
                  <p className="text-text-primary font-medium">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-border/20">
            <h3 className="text-2xl font-heading font-semibold text-text-primary mb-6">
              Connect With Me
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.filter(link => ['LinkedIn', 'GitHub'].includes(link.name)).map((link, index) => {
                const IconComponent = link.name === 'LinkedIn' ? FaLinkedin : FaGithub;
                
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-3 p-6 bg-background/50 rounded-lg border border-border/20 hover:border-primary/30 transition-all duration-200 group"
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${link.color}20` }}
                    >
                      <IconComponent 
                        className="text-2xl transition-colors"
                        style={{ color: link.color }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-text-primary font-medium">{link.name}</p>
                      <div className="flex items-center gap-1 text-text-secondary/60 text-sm">
                        <span>Visit Profile</span>
                        <FaExternalLinkAlt className="text-xs" />
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="text-center p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-border/20"
          >
            <h4 className="text-lg font-heading font-semibold text-text-primary mb-2">
              Let's Build Something Amazing Together
            </h4>
            <p className="text-text-secondary text-sm">
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a chat about technology and development.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;