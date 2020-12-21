const logger = require('koa-logger');
const Router = require('koa-router');
const Static = require('koa-static');
const routes = require('./routes');
const router = new Router();
const mountRoute = ({ method, path, handler }) => router[method](path, handler);

routes.forEach(mountRoute);

module.exports = (app) => app
  .use(logger())
  .use(Static('./public'))
  .use(router.routes())
  .use(router.allowedMethods());