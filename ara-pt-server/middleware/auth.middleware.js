const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers.cookie && req.headers.cookie.split('; ').find(row => row.startsWith('access_token='));
  token = token && token.split('=')[1];
  if (!token) {
    return res.status(401).send({ message: 'No token provided!' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({ message: 'Unauthorized!' });
    }
    req.user = user;
    req.userId = user.id;
    next();
  });
};

module.exports = { verifyToken };