/**
 * @overview Permissions as middleware.
 */
'use strict';

import Boom from 'boom';

export async function isAdminOrSelf (ctx, next) {
  // TODO: figure out a way to determine if user is himself
  return next();
}

/**
 * @function
 * @name isAdmin
 *
 * @description
 * Middleware to check if given user is admin or not.
 */
export async function isAdmin (ctx, next) {
  const isAdmin = ctx.state.user.isAdmin;
  if (isAdmin) {
    return next();
  } else {
    throw Boom.forbidden('You don\'t have the right permissions to see this');
  }
}

export async function isSelf (ctx, next) {
  // TODO: figure out a way to determine if user is himself
  return next();
}
