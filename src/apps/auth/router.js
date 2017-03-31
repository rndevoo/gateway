'use strict';

import Router from 'koa-router';

const router = new Router();

router
  .post('/login')
  .post('/password')
  .post('/refresh');

export default router;
