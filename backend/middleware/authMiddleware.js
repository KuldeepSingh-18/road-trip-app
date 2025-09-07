// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        console.error('❌ Auth failed: User not found for token');
        return res.status(401).json({ error: 'User not found' });
      }

      next();
    } else {
      console.error('❌ No token provided in Authorization header');
      return res.status(401).json({ error: 'No token, authorization denied' });
    }
  } catch (err) {
    console.error('❌ Token error:', err.message);
    return res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = { protect };
