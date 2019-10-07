const port = process.env.PORT;
const router = require('./router');
const koa = require('koa');
const app = new koa();

router(app).listen(port,
  () => console.log('Sever Started', { port })
);