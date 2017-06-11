/**
 * @overview
 * The root Query GraphQL object type definition.
 */

import {
  GraphQLObjectType,
} from 'graphql';

import { UserType } from '../user';
import { MeetingType } from '../meeting';

import {
  userResolver
} from './resolvers';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      resolve: userResolver,
    },
    meeting: {
      type: MeetingType,
    },
  },
});

export { QueryType };
