/**
 * @overview The user routes.
 */
'use strict';

import Router from 'koa-router';

import { UserHandlers } from './handlers';
import { UserValidators } from './middleware';

const router = new Router();

router
  .get('/', UserValidators.detail, UserHandlers.detail);

export default router;
