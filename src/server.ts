/**
 * @overview
 * The API gateway's entry point. It exposes a GraphQL API.
 *
 * Its purpose is to act as an interface between the client and the
 * microsevices.
 *
 * @author Diego Stratta <strattadb@gmail>
 * @license GPL-3.0
 */

import * as spdy from 'spdy';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as koaLogger from 'koa-logger';
import * as amqplib from 'amqplib';

import logger from './config/winston';
import tls from './config/tls';

import rabbitmqChannel from './middleware/rabbitmqChannel';

const NODE_ENV = process.env.NODE_ENV;
const RABBITMQ_SERVER_URL = process.env.RABBITMQ_SERVER_URL;
const PORT = process.env.PORT;

/**
 * @name main
 * @function
 *
 * @description
 * The application main function.
 */
async function main () {
  // First, we need to connect to the AMQP server.
  const conn = await amqplib.connect(RABBITMQ_SERVER_URL);
  logger.info(`Connection to RabbitMQ server at ${RABBITMQ_SERVER_URL} established.`);

  const ch: amqplib.Channel = await conn.createChannel();

  const app = new Koa();

  // Plug in the middleware.
  app
    .use(koaLogger())
    .use(bodyParser())
    .use(rabbitmqChannel(ch));

  // Create the HTTP/2 server. We use `as any` because TS likes to mess with me.
  const server = spdy.createServer(tls, app.callback() as any);

  server.listen(PORT, () => logger.info(`API gateway server listening on port ${PORT} on ${NODE_ENV} mode.`));
}

main();
