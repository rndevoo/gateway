/**
 * @overview The meetings routes.
 */
'use strict';

import Router from 'koa-router';

import { MeetingsHandlers } from './handlers';

const router = new Router();

router
  .get('/', MeetingsHandlers.list);

export default router;
