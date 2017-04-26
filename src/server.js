// @flow

/**
 * @overview The production server's entry point.
 *
 * This is the central server of LetsMeet. Here we import everything we need
 * and starting the server wihtout setting env variables(only in production).
 *
 * In development, we export the start function @see {@link start} and call it
 * there @see {@link index.js} after loading all environmental variables.
 *
 * @author Diego Stratta <strattadb@gmail.com>
 * @license GPL-3.0
 */
'use strict';

import Koa from 'koa';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import Boom from 'boom';
import logger from './config/winston';

import { default as db, mongoConnectionString } from './config/db';
import queryParser from './middleware/queryParser';
import errorHandler from './middleware/errorHandler';
import router from './router/router';

// Connect to the MongoDB database.
db.open(mongoConnectionString);

const app = new Koa();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Plug in the middleware.
app
  .use(errorHandler)
  .use(koaLogger())
  .use(queryParser)
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods({
    throw: true,
    notImplemented: () => Boom.notImplemented(),
    methodNotAllowed: () => Boom.methodNotAllowed(),
  }));

/**
 * In development we want to load env variables before we start the server.
 * @see {@link index.js}
 */
if (NODE_ENV === 'production') {
  start();
}

/**
 * @name start
 * @function
 *
 * @description
 * Just a wrapper for starting the server.
 */
export function start () {
  app.listen(PORT, () => {
    logger.info(`LetsMeet server running in ${NODE_ENV} mode on port ${PORT}`);
  });
}
