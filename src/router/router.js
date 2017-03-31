'use strict';

import Router from 'koa-router';

import usersRouter from './../apps/users/router';
import authRouter from './../apps/auth/router';

const router = new Router({ prefix: '/api/v1' });

router
  .use('/users', usersRouter.routes(), usersRouter.allowedMethods())
  .use('/auth', authRouter.routes(), authRouter.allowedMethods());

export default router;
