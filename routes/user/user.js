const router = require('koa-router')();

const { userController } = require('../../controllers');
const { chekIsEmailExistMiidleware, checkAccessTokenMiddleware } = require('../../middlewares');

router.post('/', chekIsEmailExistMiidleware, userController.createUser);
router.delete('/:uuid', checkAccessTokenMiddleware, userController.deleteUserByUuid);

module.exports = router;
