/**
 * @overview The main router file.
 * Here we import all other sub-routers and include them in this one.
 */
'use strict';

import Router from 'koa-router';

import usersRouter from './../apps/users/router';
import authRouter from './../apps/auth/router';
import activationRouter from './../apps/activation/router';
import registrationRouter from './../apps/registration/router';

const API_VERSION = 1;
const router = new Router({ prefix: `/api/v${API_VERSION}` });

router
  .use('/users', usersRouter.routes(), usersRouter.allowedMethods())
  .use('/auth', authRouter.routes(), authRouter.allowedMethods())
  .use('/activation', activationRouter.routes(), activationRouter.allowedMethods())
  .use('/registration', registrationRouter.routes(), registrationRouter.allowedMethods());

export default router;
