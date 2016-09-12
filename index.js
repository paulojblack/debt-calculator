var Hapi = require('hapi');
var server = new Hapi.Server({debug: {request: ['error']}});
var LoanCalculator = require('./lib/private/loan_datasets');

server.connection({
  host: '0.0.0.0',
  port: 3000
});

var principal = [
    1000,
    10000,
    15000,
    0,
    10000
];

var interest = [
    0.05,
    0.01,
    0.01,
    0.15,
    0.1
];

var payment = 300;

myLoan = new LoanCalculator(principal, interest, payment);


server.register(require('inert'), function (err) {

  if (err) {
    throw err;
  }

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    });
});

server.start(function() {
    console.log('Server up and running');
});
