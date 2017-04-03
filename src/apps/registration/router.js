/**
 * @overview The registration routes.
 */
'use strict';

import Router from 'koa-router';

import { RegistrationHandlers } from './handlers';

const router = new Router();

router
  .post('/', RegistrationHandlers.registrate);

export default router;
