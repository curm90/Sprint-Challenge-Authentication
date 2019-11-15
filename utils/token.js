const jwt = require('jsonwebtoken');

module.exports = function generateToken(user) {
  const payload = {
    subject: user.id,
    roles: ['student']
  };
  const options = {
    expiresIn: '1d'
  };

  const result = jwt.sign(payload, 'keep it secret keep it safe', options);

  return result;
};
