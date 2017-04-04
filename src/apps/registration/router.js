/**
 * @overview The registration routes.
 */
'use strict';

import Router from 'koa-router';

import { registrationValidator } from './validators';
import { RegistrationHandlers } from './handlers';

const router = new Router();

router
  .post('/', registrationValidator, RegistrationHandlers.registrate);

export default router;
