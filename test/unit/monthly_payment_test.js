var should = require('should'),
    MonthlyPayment = require('../../lib/private/monthly_payment'),
    _ = require('lodash'),
    loanUtil,
    principal,
    interest,
    payment;

describe('Monthly Payment', function(){

    beforeEach(function(done){

        principal = [
            1000,
            10000,
            15000,
            5000,
            10000
        ];

        interest = [
            0.05,
            0.01,
            0.01,
            0.15,
            0.1
        ];

        payment = 300;

        monthlyPayment = new MonthlyPayment(principal, interest, payment);
        done();
    });

    it('should call correctly', function(done){

        should.exist(monthlyPayment.getNextMonthPrincipal());
        console.log(monthlyPayment.getNextMonthPrincipal());
        should(monthlyPayment.getNextMonthPrincipal()).be.ok();

        done();
    });
});
