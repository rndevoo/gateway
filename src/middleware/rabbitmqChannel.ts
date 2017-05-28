/**
 * @overview
 * Middleware to hook the RabbitMQ channel to the Koa application context.
 * Once this plugin is installed, you can access RabbitMQ's channel with
 * `ctx.state.channel`.
 */

import { Channel } from 'amqplib';
import { Context } from 'koa';

export default function rabbitmqChannel (channel: Channel) {
  return async function middleware (ctx: Context, next: Function) {
    ctx.state.channel = channel;

    return next();
  };
}
