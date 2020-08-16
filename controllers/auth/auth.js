const { authService, userService } = require('../../services');
const { responseStatusCodeEnum } = require('../../constants');
const { CustomException } = require('../../exceptions');
const { passwordHashVerificator, tokenGenerator } = require('../../helpers');

module.exports = {

  loginUser: async (ctx) => {
    try {
      const { email, password } = ctx.request.body;

      const user = await userService.findUserByParams({ email });

      if (!user) {
        throw new CustomException('NO USER', responseStatusCodeEnum.NOT_FOUND);
      }

      const isPasswordValid = await passwordHashVerificator(password, user.password);

      if (!isPasswordValid) {
        throw new CustomException('Something wrong check password or email', responseStatusCodeEnum.BAD_REQUEST);
      }

      const tokens = await tokenGenerator();

      await authService.createTokenPair(tokens, user.uuid);

      ctx.body = tokens;
    } catch (e) {
      ctx.body = { error: e.message };
      ctx.status = e.status;
      // await next(e);
    }
  },

  logout: async (ctx) => {
    try {
      const token = ctx.request.get('Authorization');

      await authService.deleteTokenPairByAccessToken(token);

      ctx.body = 'User has been logout';
      ctx.status = responseStatusCodeEnum.OK;
    } catch (e) {
      ctx.body = { error: e.message };
      ctx.status = e.status;
    }
  }
};
