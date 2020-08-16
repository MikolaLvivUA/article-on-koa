const uuid = require('uuid');

const { userService } = require('../../services');
const { responseStatusCodeEnum } = require('../../constants');
const { passwordHasher } = require('../../helpers');
const { CustomException } = require('../../exceptions');

module.exports = {
  createUser: async (ctx) => {
    try {
      const user = ctx.request.body;
      user.uuid = await uuid.v4();
      user.password = await passwordHasher(user.password);

      const newUser = await userService.createUser(user);

      const responseUser = {
        uuid: newUser.uuid,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        createdAt: newUser.createdAt
      };

      ctx.status = responseStatusCodeEnum.CREATED;
      ctx.body = { data: responseUser };
    } catch (e) {
      ctx.body = e.message;
      ctx.status = e.status;
    }
  },

  deleteUserByUuid: async (ctx) => {
    try {
      const { uuid } = ctx.params;
      const { user } = ctx;

      const foundUser = await userService.findUserByParams({ uuid });

      if (!foundUser) {
        throw new CustomException('User Not Found', responseStatusCodeEnum.NOT_FOUND);
      }

      if (foundUser.uuid !== user.uuid) {
        throw new CustomException('You can delete only your profile', responseStatusCodeEnum.FORBIDDEN);
      }

      await userService.deleteUserByParams(uuid);

      ctx.status = responseStatusCodeEnum.NO_CONTENT;
    } catch (e) {
      ctx.body = e.message;
      ctx.status = e.status;
    }
  }

};
