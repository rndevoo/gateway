'use strict';

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
    ctx.throw(401);
  }
}

export async function isSelf (ctx, next) {
  // TODO: figure out a way to determine if user is himself
  return next();
}
