'use strict';

import Router from 'koa-router';

import { isAdmin } from './../../middlewares/permissions';

const router = new Router();

router
  .get('/')
  .get('/:id');

export default router;
