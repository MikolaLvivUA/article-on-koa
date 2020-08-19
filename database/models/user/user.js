const mongoose = require('mongoose');

const { dbCollectionName } = require('../../../constants');

const { Schema } = mongoose;

const tokenSubSchema = {
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
};

const userSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  authTokens: [tokenSubSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date
  },
});

module.exports = mongoose.model(dbCollectionName.USER, userSchema);
