const jwt = require('jsonwebtoken');

module.exports = (user) => {
  // payload, secret, options
  const payload = {
    id: user.id,
    username: user.email,
  };
  const secret = process.env.SECRET;

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
};
