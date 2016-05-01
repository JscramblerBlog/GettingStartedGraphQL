var target = require('../graphql/schema');
var graphql = require('graphql');
var should = require('should');

describe('A GraphQL schema', function () {
  it('has a human type', function (done) {
    const query = `
      query IntrospectionHumanTypeQuery {
        __type(name: "Human") {
          name
        }
      }
    `;

    graphql.graphql(target, query).then(function (result) {
      should(result.data.__type.name).equal('Human');

      done();
    });
  });

  it('has a human type with fields', function (done) {
    const query = `
      query IntrospectionHumanFieldsQuery {
        __type(name: "Human") {
          fields {
            name
            type {
              name
              kind
              ofType {
                name
              }
            }
          }
        }
      }
    `;

    graphql.graphql(target, query).then(function (result) {
      const humanFields = result.data.__type.fields;

      should(humanFields[0].name).equal('id');
      should(humanFields[0].type.kind).equal('NON_NULL');
      should(humanFields[0].type.ofType.name).equal('Int');

      should(humanFields[1].name).equal('name');
      should(humanFields[1].type.name).equal('String');

      done();
    });
  });

  it('allows querying human type', function (done) {
    const query = `
      query IntrospectionQueryHumanTypeQuery {
        __schema {
          queryType {
            fields {
              name
              args {
                name
                type {
                  kind
                  ofType {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    graphql.graphql(target, query).then(function (result) {
      const humanQuery = result.data.__schema.queryType.fields[0];

      should(humanQuery.name).equal('human');
      should(humanQuery.args[0].name).equal('id');
      should(humanQuery.args[0].type.kind).equal('NON_NULL');
      should(humanQuery.args[0].type.ofType.name).equal('Int');

      done();
    });
  });
});
