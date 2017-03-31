'use strict';

import Router from 'koa-router';

import usersRouter from './users/router';

const router = new Router({
  prefix: '/api/v1',
});

router
  .use('/users', usersRouter.routes(), usersRouter.allowedMethods());

export default router;
