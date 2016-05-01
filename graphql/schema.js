var graphql = require('graphql');
var data = require('./data.json');

const humanType = new graphql.GraphQLObjectType({
  name: 'Human',
  fields: {
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
    name: { type: graphql.GraphQLString }
  }
});

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    human: {
      type: humanType,
      args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) }
      },
      resolve: function (root, args) {
        return data[args.id];
      }
    }
  }
});

const schema = new graphql.GraphQLSchema({
  query: queryType,
  types: [ humanType ]
});

module.exports = schema;
