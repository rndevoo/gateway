/**
 * @overview Middleware using qs to parse the querystring.
 */
'use strict';

import qs from 'qs';

/**
 * @name queryParser
 * @function
 *
 * @description
 * Just a middleware wrapping qs and assigning to ctx.state.query.
 * It passes the parsed query to ctx.state.query because Koa
 * doesn't support nested objects in ctx.query.
 */
export default async function queryParser (ctx, next) {
  ctx.state.query = qs.parse(ctx.querystring);
  return next();
}
