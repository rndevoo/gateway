/**
 * @overview The user routes.
 */
'use strict';

import Router from 'koa-router';

import { UserHandlers } from './handlers';
import { UserValidators } from './middleware';

const router = new Router();

router
  .get('/', UserValidators.detail, UserHandlers.detail)
  .patch('/', UserValidators.update, UserHandlers.update)
  .patch('/password', UserValidators.updatePassword, UserHandlers.update)
  .patch(
    '/preferences',
    UserValidators.updatePreferences,
    UserHandlers.updatePreferences
  );

export default router;
