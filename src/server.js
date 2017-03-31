'use strict';

import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';

import router from './router';

const app = new Koa();

const PORT = process.env.PORT || 8080;

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`LetsMeet server running on port: ${PORT}`);
});
