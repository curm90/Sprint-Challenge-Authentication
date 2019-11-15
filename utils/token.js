const jwt = require('jsonwebtoken');

module.exports = function generateToken(user) {
  const payload = {
    subject: user.id,
    roles: ['student']
  };
  const options = {
    expiresIn: '1d'
  };

  const result = jwt.sign(payload, process.env.SECRET, options);

  return result;
};
