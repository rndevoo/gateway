/**
 * @overview The main router file.
 * Here we import all other sub-routers and include them in this one.
 */
'use strict';

import Router from 'koa-router';

import jwt from './../middleware/jwt';

import usersRouter from './../apps/users/router';
import userRouter from './../apps/user/router';
import authRouter from './../apps/auth/router';
import activationRouter from './../apps/activation/router';

const API_VERSION = 1;
const router = new Router({ prefix: `/api/v${API_VERSION}` });

router
  .use('/users', usersRouter.routes(), usersRouter.allowedMethods())
  .use('/user', jwt, userRouter.routes(), userRouter.allowedMethods())
  .use('/auth', authRouter.routes(), authRouter.allowedMethods())
  .use('/activation', activationRouter.routes(), activationRouter.allowedMethods());

export default router;
