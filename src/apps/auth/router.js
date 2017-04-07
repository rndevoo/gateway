'use strict';

import Router from 'koa-router';

import jwt from './../../middleware/jwt';
import { AuthHandlers } from './handlers';

const router = new Router();

router
  .post('/login', AuthHandlers.login);

export default router;
