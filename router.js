const logger = require('koa-logger');
const Router = require('koa-router');
const Static = require('koa-static');
const routes = require('./routes');

const router = new Router();

routes.forEach(
  (route) => router[route.method](route.path, route.handler)
);

module.exports = (app) => app
  .use(logger())
  .use(Static('./public'))
  .use(router.routes())
  .use(router.allowedMethods());