// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(`❌ Error: ${err.message}`);
    res.status(err.statusCode || 500).json({
      error: err.message || 'Server Error',
    });
  };
  
  module.exports = errorHandler;
  