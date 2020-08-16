const { userService } = require('../../services');
const { CustomException } = require('../../exceptions');
const { responseStatusCodeEnum } = require('../../constants');

module.exports = async (ctx, next) => {
  try {
    const { email } = ctx.request.body;

    const userByEmail = await userService.findUserByParams({ email });

    if (userByEmail) {
      throw new CustomException('User Already Exist', responseStatusCodeEnum.BAD_REQUEST);
    }

    await next();
  } catch (e) {
    ctx.body = e.message;
    ctx.status = e.status;
  }
};
