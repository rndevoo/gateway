/**
 * @overview The server's entry point.
 * @author Diego Stratta <strattadb@gmail.com>
 */
'use strict';

import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';

if (process.env.NODE_ENV != 'production') {
  dotenv.load({ path: `${__dirname}/../.env` });
}

// This is a hack due to node not supporting ES modules
const router = require('./router/router').default;

const app = new Koa();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

  .listen(PORT, () => {
    console.log(`LetsMeet server running in ${NODE_ENV} mode on port ${PORT}`);
  });
