const mongoose = require('mongoose');
const config = require('../config');

const DataBaseURL = `mongodb://${config.DATABASE_HOST}:${config.DATABASE_PORT}/${config.DATABASE_NAME}`;

mongoose.connect(DataBaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('error', console.log.bind(console, 'MONGO ERROR'));

module.exports = db;
