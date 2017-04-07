/**
 * @overview The users routes.
 */
'use strict';

import Router from 'koa-router';

import jwt from './../../middleware/jwt';
import { UsersHandlers } from './handlers';
import { UsersValidators } from './middleware';
import { isAdmin, isAdminOrSelf } from './../../middleware/permissions';

const router = new Router();

router
  .get('/', jwt, isAdmin, UsersHandlers.list)
  .get('/:id', UsersHandlers.detail)
  .post('/', UsersValidators.create, UsersHandlers.create)
  .delete('/:id', jwt, isAdminOrSelf, UsersHandlers.delete);

export default router;
