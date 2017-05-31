/**
 * @overview
 * The root Query GraphQL object type definition.
 */

import {
  GraphQLObjectType,
} from 'graphql';

import UserType from './user';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: { type: UserType },
  },
});

export default QueryType;
