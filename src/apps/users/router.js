/**
 * @overview The users routes.
 */
'use strict';

import Router from 'koa-router';

import jwt from './../../middleware/jwt';
import { UsersHandlers } from './handlers';
import { UsersValidators } from './middleware';
import { isAdmin  } from './../../middleware/permissions';

const router = new Router();

router
  .get('/', jwt, isAdmin, UsersValidators.list, UsersHandlers.list)
  .get('/:id', UsersValidators.detail, UsersHandlers.detail)
  .post('/', UsersValidators.create, UsersHandlers.create)
  .delete('/:id', jwt, isAdmin, UsersHandlers.delete);

export default router;
