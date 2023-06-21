const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.userId = decoded.userId;
      next();
    });
  } else {
    res.status(401).json({ message: 'Token is missing' });
  }
};
