const jwt = require('jsonwebtoken');

const {
  ACCESS_JWT_SECRET_WORD, REFRESH_JWT_SECRET_WORD, ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME
} = require('../config');

module.exports = async () => {
  const accessToken = await jwt.sign({}, 'secret', { expiresIn: ACCESS_TOKEN_LIFETIME });
  const refreshToken = await jwt.sign({}, REFRESH_JWT_SECRET_WORD, { expiresIn: REFRESH_TOKEN_LIFETIME });

  return {
    accessToken,
    refreshToken
  };
};
