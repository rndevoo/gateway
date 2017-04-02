'use strict';

import Router from 'koa-router';

import jwt from './../../middlewares/jwt';
import { UserHandlers } from './handlers';
import { isAdmin, isAdminOrSelf } from './../../middlewares/permissions';

const router = new Router();

router
  .get('/', jwt, isAdmin, UserHandlers.list)
  .get('/:id', UserHandlers.retrieve)
  .delete('/:id', jwt, isAdminOrSelf, UserHandlers.delete);

export default router;
