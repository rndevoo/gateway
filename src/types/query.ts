/**
 * @overview
 * The root Query GraphQL object type definition.
 */

import {
  GraphQLObjectType,
} from 'graphql';

import UserType from './user';
import MeetingType from './meeting';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      async resolve () {

      },
    },
    meeting: {
      type: MeetingType,
      async resolve (obj, { id }, { ch }) {

      },
    },
  },
});

export default QueryType;
