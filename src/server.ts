/**
 * @overview
 * The microservice's entry point.
 *
 * Here, we listen to messages in the logging queue and log them. Just that.
 * But useful for centralized logging.
 *
 * @author Diego Stratta <strattadb@gmail>
 * @license GPL-3.0
 */

import * as dotenv from 'dotenv';

const NODE_ENV = process.env.NODE_ENV;
// Load environmental variables from file if not running in production.
if (NODE_ENV !== 'production') {
  dotenv.config({ path: '../.env'});
}

import spdy from 'spdy';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import * as amqplib from 'amqplib';

import logger from './config/winston';
import tls from './config/tls';

const RABBITMQ_SERVER_URL = process.env.RABBITMQ_SERVER_URL;

async function main () {
  // First, we need to connect to the AMQP server.
  const conn = await amqplib.connect(RABBITMQ_SERVER_URL);
  logger.info(`Connection to RabbitMQ server at ${RABBITMQ_SERVER_URL} established.`);

  const ch: amqplib.Channel = await conn.createChannel();

}

main();
