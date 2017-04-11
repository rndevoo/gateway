/**
 * @overview Middleware to parse the querystring.
 */
'use strict';

import qs from 'qs';

/**
 * @name queryParser
 * @function
 *
 * @description
 * Parses filters, fields, pagination and sorts from the querystring and
 * saves then in ctx.state.
 */
export default async function queryParser (ctx, next) {
  const query = qs.parse(ctx.querystring);

  ctx.state.fields = query.fields || [];
  ctx.state.sorts = query.sorts || [];
  ctx.state.filters = query || {};
  ctx.state.page = parseInt(query.page, 10) || 1;
  ctx.state.perPage = parseInt(query.perPage, 10) || 10;

  // Delete the non filter properties.
  delete ctx.state.filters.sorts;
  delete ctx.state.filters.fields;
  delete ctx.state.filters.page;
  delete ctx.state.filters.perPage;

  return next();
}
