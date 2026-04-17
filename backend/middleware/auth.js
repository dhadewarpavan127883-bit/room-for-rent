const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    const splitToken = token.split(' ')[1]; // Expected 'Bearer <token>'
    const decoded = jwt.verify(splitToken || token, process.env.JWT_SECRET);
    req.user = decoded; // { id: userId }
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
