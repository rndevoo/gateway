/**
 * @overview
 * The root Query GraphQL object type definition.
 */

import {
  GraphQLObjectType,
} from 'graphql';

import { UserType, userResolver } from './user';
import { MeetingType, meetingResolver } from './meeting';

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

export default QueryType;
