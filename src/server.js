/**
 * @overview The server's entry point.
 * @author Diego Stratta <strattadb@gmail.com>
 */
'use strict';

import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';

import { default as db, mongoConnectionString } from './config/db';
import router from './router/router';

db.open(mongoConnectionString);

const app = new Koa();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

if (NODE_ENV === 'production') {
  start();
}

export default function start () {
  app.listen(PORT, () => {
    console.log(`LetsMeet server running in ${NODE_ENV} mode on port ${PORT}`);
  });
}
