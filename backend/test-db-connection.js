#!/usr/bin/env node

/**
 * Database Connection Test Script
 * This script tests the MongoDB connection configuration
 */

require('dotenv').config();
const database = require('./config/database');

async function testDatabaseConnection() {
  console.log('🧪 Testing MongoDB connection...\n');
  
  try {
    // Test connection
    console.log('📡 Attempting to connect to MongoDB...');
    await database.connect();
    
    // Get connection status
    const status = database.getConnectionStatus();
    console.log('\n📊 Connection Status:');
    console.log(`   - Connected: ${status.isConnected}`);
    console.log(`   - Ready State: ${status.readyStateText} (${status.readyState})`);
    console.log(`   - Host: ${status.host || 'N/A'}`);
    console.log(`   - Database: ${status.name || 'N/A'}`);
    
    // Test database ping
    console.log('\n🏓 Testing database ping...');
    const pingResult = await database.testConnection();
    console.log(`   - Ping Result: ${pingResult.success ? '✅ Success' : '❌ Failed'}`);
    console.log(`   - Message: ${pingResult.message}`);
    
    // Disconnect
    console.log('\n📤 Disconnecting from MongoDB...');
    await database.disconnect();
    
    console.log('\n🎉 Database connection test completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('\n💥 Database connection test failed:');
    console.error(`   Error: ${error.message}`);
    
    if (error.message.includes('MONGODB_URI')) {
      console.log('\n💡 Tip: Make sure MONGODB_URI is set in your .env file');
      console.log('   Example: MONGODB_URI=mongodb://localhost:27017/portfolio');
    }
    
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Run the test
testDatabaseConnection();