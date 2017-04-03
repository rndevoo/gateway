/**
 * @overview The activation routes.
 */
'use strict';

import Router from 'koa-router';

import { ActivationHandlers } from './handlers';

const router = new Router();

router
  .get('/send/:id', ActivationHandlers.sendEmail)
  .get('/:token', ActivationHandlers.activate);

export default router;
