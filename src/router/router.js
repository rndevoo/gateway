'use strict';

import Router from 'koa-router';

import usersRouter from './../apps/users/router';
import authRouter from './../apps/auth/router';
import activationRouter from './../apps/activation/router';
import registrationRouter from './../apps/registration/router';

const router = new Router({ prefix: '/api/v1' });

router
  .use('/users', usersRouter.routes(), usersRouter.allowedMethods())
  .use('/auth', authRouter.routes(), authRouter.allowedMethods())
  .use('/activation', activationRouter.routes(), activationRouter.allowedMethods())
  .use('/registration', registrationRouter.routes(), registrationRouter.allowedMethods());

export default router;
