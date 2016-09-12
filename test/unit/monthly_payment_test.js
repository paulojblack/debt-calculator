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
            0,
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

    it('should get the next months principle', function(done){

        should.exist(monthlyPayment.getNextMonthPrincipal());
        should(monthlyPayment.getNextMonthPrincipal()).be.eql([1004.17, 10008.33, 15012.5, 0, 9783.33]);

        done();
    });
});
