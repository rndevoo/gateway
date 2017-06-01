/**
 * @overview
 * The main router.
 */

import * as Router from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';

import schema from './schema';

const router = new Router();

router
  .get('/graphql', graphqlKoa({ schema }))
  .post('/graphql', graphqlKoa({ schema }));

const NODE_ENV = process.env.NODE_ENV;

// We only want GraphiQL in development.
if (NODE_ENV === 'development') {
  router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
}

export default router;
