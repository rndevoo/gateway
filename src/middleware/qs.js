/**
 * @overview Middleware using qs to parse the querystring.
 */
'use strict';

import qs from 'qs';

export default function () {
  /**
   * @name queryParser
   * @function
   *
   * @description
   * Just a middleware wrapping qs and assigning to ctx.query.
   * It passes the parsed query to ctx.state.query because Koa
   * doesn't support nested objects in ctx.query.
   */
  return async function queryParser (ctx, next) {
    ctx.state.query = qs.parse(ctx.querystring);
    return next();
  };
}
