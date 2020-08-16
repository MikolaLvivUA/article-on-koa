const { ArticleModel } = require('../../database');

module.exports = {
  createArticle: async (article) => {
    const newArticleModel = new ArticleModel(article);

    const newArticle = await newArticleModel.save();

    return newArticle;
  },

  getArticleByUuid: async (uuid) => {
    const article = await ArticleModel.findOne({ uuid });

    return article;
  },

  getAllArticles: async (limit, offset) => {
    const article = await ArticleModel.find().limit(limit).skip(offset);

    return article;
  },

  updateArticleByUuid: async (uuid, updateData) => {
    const updatedArticle = await ArticleModel.findOneAndUpdate({ uuid }, updateData, { new: true });

    return updatedArticle;
  },

  deleteArticleByUuid: async (uuid) => {
    await ArticleModel.findOneAndDelete({ uuid });
  },

  getSizeOfAll: async () => {
    const count = await ArticleModel.countDocuments();

    return count;
  }
};
