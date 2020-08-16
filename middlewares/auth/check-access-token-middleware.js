const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const { CustomException } = require('../../exceptions');
const { responseStatusCodeEnum } = require('../../constants');
const { ACCESS_JWT_SECRET_WORD } = require('../../config'); // TODO Doesn't work with enum

module.exports = async (ctx, next) => {
  try {
    const token = ctx.request.get('Authorization');

    if (!token) {
      throw new CustomException('No Token', responseStatusCodeEnum.BAD_REQUEST);
    }

    await jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        throw new CustomException(err.message, responseStatusCodeEnum.UNAUTHORIZED);
      }

      return decoded;
    });

    const userByToken = await authService.findUserByToken(token);

    if (!userByToken) {
      throw new CustomException('Token is not valid', responseStatusCodeEnum.UNAUTHORIZED);
    }
    ctx.user = userByToken;

    await next();
  } catch (e) {
    ctx.body = { error: e.message };
    ctx.status = e.status;
    // await next(e);
  }
};
