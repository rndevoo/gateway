/**
 * @overview Middleware to parse querystring filters, fields and sorts.
 */
'use strict';

/**
 * @name parseFiltersFieldsAndSorts
 * @function
 *
 * @description
 * Parses filters fields and sorts from the querystring and saves then in
 * ctx.state.
 */
export default async function parseFiltersFieldsAndSorts (ctx, next) {
  ctx.state.fields = ctx.state.query.fields || [];
  ctx.state.sorts = ctx.state.query.sorts || [];
  ctx.state.filters = ctx.state.query || {};

  // Delete the non filter properties.
  delete ctx.state.filters.sorts;
  delete ctx.state.filters.fields;

  return next();
}
