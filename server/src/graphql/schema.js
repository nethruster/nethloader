import {GraphQLSchema} from 'graphql';

import Query from './query';

export default new GraphQLSchema({
  query: Query
});
