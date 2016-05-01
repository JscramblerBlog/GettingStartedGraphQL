var http = require('http');
var url = require('url');
var schema = require('./graphql/schema');
var graphql = require('graphql');

var app = http.createServer(function (req, res) {
  const query = url.parse(req.url, true).query.query;

  graphql.graphql(schema, query).then(function (queryResult) {
    if (queryResult.errors) {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache'
      });

      res.end(queryResult.errors[0].message);
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      });

      res.end(JSON.stringify(queryResult));
    }
  });
});

module.exports = app;
