var Hapi = require('hapi');
var server = new Hapi.Server({debug: {request: ['error']}});
var InterestService = require('./lib');

server.connection({
  host: '0.0.0.0',
  port: 3000
});

server.register(require('inert'), function (err) {

  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply();
    }
  });
});

server.start(function() {
    console.log('Server up and running');
});
