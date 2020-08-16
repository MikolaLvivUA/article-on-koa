const router = require('koa-router')();

const { articleController } = require('../../controllers');
const { checkAccessTokenMiddleware } = require('../../middlewares');

router.get('/:uuid', articleController.getArticleByUuid);
router.get('/', articleController.getAllArticles);

router.use(checkAccessTokenMiddleware);
router.post('/', articleController.createArticle);
router.patch('/:uuid', articleController.updateArticleByUuid);
router.delete('/:uuid', articleController.deleteArticleByUuid);

module.exports = router;
