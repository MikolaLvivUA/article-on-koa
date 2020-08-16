const apiRouter = require('koa-router')({ prefix: '/api' });

const { userRouter } = require('../user');
const { authRouter } = require('../auth');
const { articleRouter } = require('../article');

apiRouter.use('/users', userRouter.routes());
apiRouter.use('/auth', authRouter.routes());
apiRouter.use('/article', articleRouter.routes());

module.exports = apiRouter;
