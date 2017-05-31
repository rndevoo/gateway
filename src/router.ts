/**
 * @overview
 * The main router.
 */

import Router from 'koa-router';
import graphql from 'graphql-server-koa';

import schema from './schema';

const router = new Router();

router
  .get('/graphql', graphql({ schema }))
  .post('/graphql', graphql({ schema }));

export default router;
