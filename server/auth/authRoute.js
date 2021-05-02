const jwt = require('jsonwebtoken');

exports.authCheck = (req, res, next) => {
  const token = req.headers.authorization;

  const secret = process.env.SECRET;
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err);
        res.json({ message: 'invalid token received' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'no token received' });
  }
};
