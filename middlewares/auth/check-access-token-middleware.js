const jwt = require('jsonwebtoken');
const util = require('util');

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

    const asyncVerify = util.promisify(jwt.verify);

    await asyncVerify(token, 'secret');

    const userByToken = await authService.findUserByToken(token);

    if (!userByToken) {
      throw new CustomException('Token is not valid', responseStatusCodeEnum.UNAUTHORIZED);
    }
    ctx.user = userByToken;

    await next();
  } catch (e) {
    ctx.body = { error: e.message };
    ctx.body = e.status || 500;
    // await next(e);
  }
};
