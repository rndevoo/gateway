/**
 * @overview The activation routes.
 */
'use strict';

import Router from 'koa-router';

import jwt from './../../middleware/jwt';

import { ActivationHandlers } from './handlers';

const router = new Router();

router
  .get('/resend/', jwt, ActivationHandlers.resendEmail)
  .get('/', ActivationHandlers.activate);

export default router;
