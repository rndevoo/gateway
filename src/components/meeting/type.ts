/**
 * @overview
 * The Meeting GraphQL object type definition.
 */

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql';

const MeetingType = new GraphQLObjectType({
  name: 'Meeting',
  fields: {
    id: { type: GraphQLID },
  },
});

export { MeetingType };
