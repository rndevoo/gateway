'use strict';

import Router from 'koa-router';

import jwt from './../../middlewares/jwt';
import { AuthHandlers } from './handlers';

const router = new Router();

router
  .post('/login', AuthHandlers.login)
  .post('/refresh', jwt, AuthHandlers.refresh)
  .post('/password', jwt);

export default router;
