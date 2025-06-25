const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token
  if (!token) return res.status(401).json({ message: 'Unauthorized' }); // If token missing

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = user; // Attach user info to request
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' }); // Token invalid
  }
};