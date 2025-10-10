import axios from 'axios';

// Normalize API base URL (remove trailing slash if present)
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to true if you need to send cookies
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('📤 API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('📥 API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Submit contact form data
 * @param {Object} formData - Contact form data
 * @param {string} formData.name - User's name
 * @param {string} formData.email - User's email
 * @param {string} formData.subject - Message subject
 * @param {string} formData.message - Message content
 * @returns {Promise<Object>} API response
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post('/api/contact', formData);
    return {
      success: true,
      data: response.data,
      message: response.data.message || 'Message sent successfully!'
    };
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      return {
        success: false,
        error: {
          status,
          message: data.error?.message || 'Failed to send message',
          code: data.error?.code || 'UNKNOWN_ERROR',
          details: data.error?.details || []
        }
      };
    } else if (error.request) {
      // Network error
      return {
        success: false,
        error: {
          message: 'Network error. Please check your connection and try again.',
          code: 'NETWORK_ERROR'
        }
      };
    } else {
      // Other error
      return {
        success: false,
        error: {
          message: 'An unexpected error occurred. Please try again.',
          code: 'UNKNOWN_ERROR'
        }
      };
    }
  }
};

/**
 * Get contact form statistics (optional)
 * @returns {Promise<Object>} API response with stats
 */
export const getContactStats = async () => {
  try {
    const response = await api.get('/api/contact/stats');
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Failed to fetch contact stats:', error);
    return {
      success: false,
      error: {
        message: 'Failed to fetch statistics',
        code: 'STATS_ERROR'
      }
    };
  }
};

/**
 * Check email service status
 * @returns {Promise<Object>} API response with email service status
 */
export const checkEmailStatus = async () => {
  try {
    const response = await api.get('/api/contact/email-status');
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Failed to check email status:', error);
    return {
      success: false,
      error: {
        message: 'Failed to check email service status',
        code: 'EMAIL_STATUS_ERROR'
      }
    };
  }
};

/**
 * Send test email (development only)
 * @param {string} email - Email address to send test email to
 * @returns {Promise<Object>} API response
 */
export const sendTestEmail = async (email) => {
  try {
    const response = await api.post('/api/contact/test-email', { email });
    return {
      success: true,
      data: response.data.data,
      message: response.data.message || 'Test email sent successfully!'
    };
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      return {
        success: false,
        error: {
          status,
          message: data.error?.message || 'Failed to send test email',
          code: data.error?.code || 'UNKNOWN_ERROR'
        }
      };
    } else if (error.request) {
      return {
        success: false,
        error: {
          message: 'Network error. Please check your connection and try again.',
          code: 'NETWORK_ERROR'
        }
      };
    } else {
      return {
        success: false,
        error: {
          message: 'An unexpected error occurred. Please try again.',
          code: 'UNKNOWN_ERROR'
        }
      };
    }
  }
};

export default api;