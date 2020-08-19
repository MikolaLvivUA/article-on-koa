const router = require('koa-router')();
const uuid = require('uuid');

const { articleService } = require('../../services');
const { responseStatusCodeEnum } = require('../../constants');
const { CustomException } = require('../../exceptions');
const { checkAccessTokenMiddleware } = require('../../middlewares');

// Get by uuid
router.get('/:uuid', async (ctx) => {
  try {
    const { uuid } = ctx.params;

    const article = await articleService.getArticleByUuid(uuid);

    if (!article) {
      throw new CustomException('Article Not Found', responseStatusCodeEnum.NOT_FOUND);
    }

    ctx.body = { data: article };
    ctx.status = responseStatusCodeEnum.OK;
  } catch (e) {
    ctx.body = e.message;
    ctx.status = e.status;
  }
});
// Get All articles
router.get('/', async (ctx) => {
  try {
    const {
      limit,
      offset
    } = ctx.query;

    const articles = await articleService.getAllArticles(+limit, +offset);
    const count = await articleService.getSizeOfAll();

    ctx.body = { data: { articles, count, pageCount: Math.ceil(count / limit) } };
    ctx.status = responseStatusCodeEnum.OK;
  } catch (e) {
    ctx.body = e.message;
    ctx.status = e.status;
  }
});

router.use(checkAccessTokenMiddleware);
// Create Article
router.post('/', async (ctx) => {
  try {
    const article = ctx.request.body;
    const { user } = ctx;

    article.uuid = await uuid.v4();
    article.authorUuid = user.uuid;

    const NewArticle = await articleService.createArticle(article);

    const responseArticle = {
      uuid: NewArticle.uuid,
      title: NewArticle.title,
      text: NewArticle.text,
      authorUuid: NewArticle.authorUuid.uuid
    };

    ctx.body = { data: responseArticle };
    ctx.status = responseStatusCodeEnum.CREATED;
  } catch (e) {
    ctx.body = e.message;
    ctx.status = e.status;
  }
});
// Update Article by uuid
router.patch('/:uuid', async (ctx) => {
  try {
    const updateData = ctx.request.body;
    const { uuid } = ctx.params;
    const { user } = ctx;

    const article = await articleService.getArticleByUuid(uuid);

    if (!article) {
      throw new CustomException('Article Not Found', responseStatusCodeEnum.NOT_FOUND);
    }

    if (article.authorUuid !== user.uuid) {
      throw new CustomException("You can't update foreign article", responseStatusCodeEnum.FORBIDDEN);
    }

    const updatedArticle = await articleService.updateArticleByUuid(uuid, updateData);

    ctx.body = { data: updatedArticle };
    ctx.status = responseStatusCodeEnum.CREATED;
  } catch (e) {
    ctx.body = e.message;
    ctx.status = e.status;
  }
});

router.delete('/:uuid', async (ctx) => {
  try {
    const { uuid } = ctx.params;
    const { user } = ctx;

    const article = await articleService.getArticleByUuid(uuid);

    if (!article) {
      throw new CustomException('Article Not Found', responseStatusCodeEnum.NOT_FOUND);
    }

    if (article.authorUuid !== user.uuid) {
      throw new CustomException("You can't update foreign article", responseStatusCodeEnum.FORBIDDEN);
    }

    await articleService.deleteArticleByUuid(uuid);

    ctx.status = responseStatusCodeEnum.NO_CONTENT;
  } catch (e) {
    ctx.body = e.message;
    ctx.status = e.status;
  }
});

module.exports = router;
