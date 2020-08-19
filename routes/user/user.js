const router = require('koa-router')();
const uuid = require('uuid');

const { passwordHasher } = require('../../helpers');
const { responseStatusCodeEnum } = require('../../constants');
const { userService } = require('../../services');
const { CustomException } = require('../../exceptions');
const { chekIsEmailExistMiidleware, checkAccessTokenMiddleware } = require('../../middlewares');
// Create user
router.post('/', chekIsEmailExistMiidleware, async (ctx) => {
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
    ctx.body = e.status;
  }
});
// Delete User
router.delete('/:uuid', checkAccessTokenMiddleware, async (ctx) => {
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
    ctx.body = e.status;
  }
});

module.exports = router;
