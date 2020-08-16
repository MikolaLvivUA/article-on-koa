const mongoose = require('mongoose');

const { dbCollectionName } = require('../../../constants');

const { Schema } = mongoose;

const articleSchema = new Schema({
  uuid: {
    type: String,
    required: true
  },
  authorUuid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model(dbCollectionName.ARTICLE, articleSchema);
