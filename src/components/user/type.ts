/**
 * @overview
 * The User GraphQL object type definition.
 */

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} from 'graphql';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
});

export default UserType;
