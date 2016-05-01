var target = require('../graphql/schema');
var graphql = require('graphql');
var should = require('should');

describe('A human type', function () {
  it('fails without arguments', function (done) {
    const query = `
      query HumanWithoutArgument {
        human {
        }
      }
    `;

    graphql.graphql(target, query).then(function (result) {
      should.exist(result.errors);

      done();
    });
  });

  it('fails with wrong argument type', function (done) {
    const query = `
      query HumanWithWrongArgumentType {
        human(id: "1") {
          name
        }
      }
    `;

    graphql.graphql(target, query).then(function (result) {
      should.exist(result.errors);

      done();
    });
  });
});
