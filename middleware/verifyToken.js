const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // console.log('Authorization Header:', req.headers.authorization);
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Token missing');

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};

module.exports = verifyToken;
