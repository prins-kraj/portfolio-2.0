// Simple test endpoint to debug Vercel deployment
module.exports = async (req, res) => {
  try {
    console.log('Test endpoint called:', req.method, req.url);
    
    res.status(200).json({
      success: true,
      message: 'Test endpoint working',
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      headers: req.headers,
      env: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        hasMongoUri: !!process.env.MONGODB_URI
      }
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
};