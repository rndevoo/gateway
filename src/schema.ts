/**
 * @overview
 * The GraphQL schema definition.
 */

 import { GraphQLSchema } from 'graphql';

 import QueryType from './types/query';

 const schema = new GraphQLSchema({ query: QueryType });

 export default schema;
