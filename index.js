var Hapi = require('hapi'),
    server = new Hapi.Server({debug: {request: ['error']}}),
    LoanCalculator = require('./lib/loan_builder/loan_datasets');

server.connection({
  host: '0.0.0.0',
  port: 3000
});

var principal = [
    9794.09,
    5457.19,
    7324.94,
    9737.3,
    6752.98,
    8259.64,
    7120.25
];

var interest = [
    0.0812,
    0.07125,
    0.07125,
    0.08375,
    0.0812,
    0.07125,
    0.07125
];

var payment = 800;

var myLoan = new LoanCalculator(principal, interest, payment);

console.log(myLoan.fullPlan);
server.register(require('inert'), function (err) {

  if (err) {
    throw err;
  }

    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     handler: function(req, rep){
    //         rep(myLoan.getPaymentPlan());
    //     }
    // });
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
