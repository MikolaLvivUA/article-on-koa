const Koa = require('koa');
const koaBody = require('koa-body');
const koaHelmet = require('koa-helmet');

const koaLogger = require('koa-logger');
const cors = require('@koa/cors');
require('dotenv').config();

const { PORT } = require('./config');
const { apiRouter } = require('./routes');
require('./database');

const app = new Koa();

app.use(koaBody());

app.use(koaHelmet());
app.use(koaLogger());
app.use(cors());

app.use(apiRouter.routes());

app.use(apiRouter.allowedMethods());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err, ctx) => {
  // eslint-disable-next-line no-console
  console.log(err);
  ctx.body = { error: err.message };
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server listen on port ${PORT}  http://localhost:${PORT}`);
});
