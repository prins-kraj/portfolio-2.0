# Database Configuration

This directory contains the MongoDB database configuration for the portfolio backend API.

## Files

- `database.js` - Main database connection class with retry logic and error handling

## Features

### Connection Management
- **Automatic Retry Logic**: Attempts to reconnect up to 5 times with 5-second delays
- **Connection Pooling**: Maintains up to 10 socket connections for optimal performance
- **Graceful Shutdown**: Properly closes connections when the application terminates

### Authentication Support
- Supports both local MongoDB and MongoDB Atlas (cloud)
- Configurable authentication source (defaults to 'admin')
- Secure credential handling with masked logging

### Error Handling
- Specific error handling for authentication failures
- Network error detection and recovery
- Server selection timeout handling
- Comprehensive error logging

### Health Monitoring
- Connection status reporting
- Database ping testing
- Ready state monitoring
- Retry count tracking

## Environment Variables

Configure these variables in your `.env` file:

```bash
# Local MongoDB (no authentication)
MONGODB_URI=mongodb://localhost:27017/portfolio

# Local MongoDB (with authentication)
MONGODB_URI=mongodb://username:password@localhost:27017/portfolio

# MongoDB Atlas (cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Usage

### Basic Connection
```javascript
const database = require('./config/database');

// Connect to database
await database.connect();

// Get connection status
const status = database.getConnectionStatus();
console.log('Connected:', status.isConnected);

// Test connection health
const health = await database.testConnection();
console.log('Health:', health.success);

// Disconnect
await database.disconnect();
```

### Connection Status
The `getConnectionStatus()` method returns:
- `isConnected`: Boolean indicating connection state
- `readyState`: Mongoose connection ready state (0-3)
- `readyStateText`: Human-readable ready state
- `host`: Database host
- `name`: Database name
- `retryCount`: Current retry attempt count
- `maxRetries`: Maximum retry attempts allowed

### Ready States
- `0` - disconnected
- `1` - connected
- `2` - connecting
- `3` - disconnecting

## Testing

Test the database connection:

```bash
# Run database connection test
npm run test:db

# Or directly
node test-db-connection.js
```

## Security Features

1. **Credential Masking**: Database URIs are masked in logs to prevent credential exposure
2. **Authentication Source**: Configurable authentication database
3. **Write Concerns**: Ensures data durability with majority write concern
4. **Connection Limits**: Prevents connection pool exhaustion
5. **Timeout Handling**: Prevents hanging connections

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure MongoDB is running
   - Check if the port (27017) is accessible
   - Verify firewall settings

2. **Authentication Failed**
   - Check username and password in MONGODB_URI
   - Verify user has proper database permissions
   - Ensure authentication database is correct

3. **Network Timeout**
   - Check network connectivity
   - Verify MongoDB Atlas IP whitelist (if using cloud)
   - Increase serverSelectionTimeoutMS if needed

4. **Database Not Found**
   - MongoDB creates databases automatically on first write
   - Ensure proper database name in URI
   - Check user permissions for database creation

### Error Codes

- `18`: Authentication failed
- `11000`: Duplicate key error
- `16500`: Shard key error

## Performance Tuning

### Connection Pool Settings
- `maxPoolSize`: Maximum number of connections (default: 10)
- `serverSelectionTimeoutMS`: Server selection timeout (default: 5000ms)
- `socketTimeoutMS`: Socket timeout (default: 45000ms)

### Write Concerns
- `w: 'majority'`: Ensures writes are acknowledged by majority of replica set members
- `retryWrites: true`: Enables automatic retry of failed writes

## Monitoring

The database connection includes comprehensive logging:
- Connection attempts and successes
- Error details with specific error types
- Retry attempts with countdown
- Graceful shutdown notifications

All logs include timestamps and appropriate emoji indicators for easy identification.