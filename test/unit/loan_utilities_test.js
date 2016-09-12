var should = require('should'),
    LoanUtilities = require('../../lib/private/loan_utilities'),
    _ = require('lodash'),
    loanUtil;

describe('Loan Utilities', function() {

    beforeEach(function (done) {

        principal = [
            9794.09,
            5457.19,
            7324.94,
            9737.3,
            6752.98,
            8259.64,
            7120.25
        ];

        interest = [
            0.0812,
            0.07125,
            0.07125,
            0.08375,
            0.0812,
            0.07125,
            0.07125
        ];

        loanUtil = new LoanUtilities(principal, interest);

        done();
    });

    it('should compute yearly interest', function(done) {
        should(loanUtil.computeYearlyInterest()).be.instanceOf(Array).and.have.length(7);
        should(loanUtil.computeYearlyInterest()).be.eql([ 795.28, 388.82, 521.9, 815.5, 548.34, 588.5, 507.32]);

        done();
    });

    it('should compute monthly interest', function(done) {
        should(loanUtil.computeMonthlyInterest()).be.instanceOf(Array).and.have.length(7);
        should(loanUtil.computeMonthlyInterest()).be.eql([ 66.27, 32.4, 43.49, 67.96, 45.7, 49.04, 42.28 ]);

        done();
    });

    it('should check highest interest', function(done) {
        should(loanUtil.getHighestInterest()).be.instanceOf(Number);
        should(loanUtil.getHighestInterest()).be.eql(67.96);


        done();
    });


});
