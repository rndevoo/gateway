'use strict';

export async function isAdminOrSelf (ctx, next) {
  // TODO: figure out a way to determine if user is himself
  return next();
}

export async function isAdmin (ctx, next) {
  const isAdmin = ctx.state.user.is_admin;
  if (isAdmin) {
    return next();
  } else {
    ctx.status = 401;
  }
}

export async function isSelf (ctx, next) {
  // TODO: figure out a way to determine if user is himself
  return next();
}
