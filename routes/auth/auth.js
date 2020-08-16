const router = require('koa-router')();

const { authController } = require('../../controllers');
const { checkAccessTokenMiddleware } = require('../../middlewares');

router.post('/', authController.loginUser);
router.post('/logout', checkAccessTokenMiddleware, authController.logout);

module.exports = router;
