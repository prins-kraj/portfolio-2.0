const mongoose = require('mongoose');

class DatabaseConnection {
  constructor() {
    this.isConnected = false;
    this.retryCount = 0;
    this.maxRetries = 3; // Reduced for serverless
    this.retryDelay = 2000; // Reduced delay for serverless
  }

  async connect() {
    try {
      // Check if already connected
      if (mongoose.connection.readyState === 1) {
        this.isConnected = true;
        console.log('✅ MongoDB already connected (reusing connection)');
        return true;
      }

      const mongoUri = process.env.MONGODB_URI;
      
      if (!mongoUri) {
        throw new Error('MONGODB_URI environment variable is not defined');
      }

      // Optimized MongoDB connection options for serverless
      const options = {
        maxPoolSize: 5, // Reduced pool size for serverless
        serverSelectionTimeoutMS: 10000, // Reduced timeout
        socketTimeoutMS: 30000, // Reduced socket timeout
        // bufferMaxEntries: 0, // Removed - not supported in newer mongoose
        // bufferCommands: false, // Removed - not supported in newer mongoose
        retryWrites: true, // Enable retryable writes
        w: 'majority', // Write concern for data durability
      };

      await mongoose.connect(mongoUri, options);
      
      this.isConnected = true;
      this.retryCount = 0;
      
      console.log(`✅ MongoDB connected successfully to: ${this.getMaskedUri(mongoUri)}`);
      
      return true;
    } catch (error) {
      this.isConnected = false;
      
      // Handle specific MongoDB errors
      if (error.name === 'MongoServerError' && error.code === 18) {
        console.error(`❌ MongoDB authentication failed: Invalid credentials`);
        throw new Error('Database authentication failed. Please check your credentials.');
      } else if (error.name === 'MongoNetworkError') {
        console.error(`❌ MongoDB network error: ${error.message}`);
      } else if (error.name === 'MongoServerSelectionError') {
        console.error(`❌ MongoDB server selection error: ${error.message}`);
      } else {
        console.error(`❌ MongoDB connection failed:`, error.message);
      }
      
      // Retry logic for recoverable errors (reduced for serverless)
      if (this.retryCount < this.maxRetries && !error.message.includes('authentication')) {
        this.retryCount++;
        console.log(`🔄 Retrying connection in ${this.retryDelay / 1000} seconds... (Attempt ${this.retryCount}/${this.maxRetries})`);
        
        await this.delay(this.retryDelay);
        return this.connect();
      } else {
        if (error.message.includes('authentication')) {
          console.error(`💥 Authentication error - not retrying.`);
        } else {
          console.error(`💥 Max retry attempts (${this.maxRetries}) reached. Database connection failed.`);
        }
        throw error;
      }
    }
  }

  async disconnect() {
    try {
      // Don't disconnect in serverless - let Vercel handle it
      if (process.env.VERCEL) {
        console.log('📤 Skipping disconnect in serverless environment');
        return;
      }
      
      await mongoose.disconnect();
      this.isConnected = false;
      console.log('📤 MongoDB disconnected successfully');
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error.message);
      throw error;
    }
  }

  getConnectionStatus() {
    const readyStates = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      readyStateText: readyStates[mongoose.connection.readyState] || 'unknown',
      host: mongoose.connection.host,
      name: mongoose.connection.name,
      retryCount: this.retryCount,
      maxRetries: this.maxRetries
    };
  }

  // Test database connection
  async testConnection() {
    try {
      await mongoose.connection.db.admin().ping();
      return { success: true, message: 'Database connection is healthy' };
    } catch (error) {
      return { success: false, message: `Database connection test failed: ${error.message}` };
    }
  }

  // Mask sensitive information in URI for logging
  getMaskedUri(uri) {
    return uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
  }

  // Utility method for delays
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Event listeners for connection monitoring
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('📤 Mongoose disconnected from MongoDB');
});

// Graceful shutdown handling (skip in serverless)
if (!process.env.VERCEL) {
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.log('📤 MongoDB connection closed through app termination');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error during graceful shutdown:', error.message);
      process.exit(1);
    }
  });
}

module.exports = new DatabaseConnection();