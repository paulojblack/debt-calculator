var should = require('should'),
    DataSet = require('../../lib/private/loan_datasets'),
    _ = require('lodash'),
    dataset,
    principal,
    interest,
    payment;

describe('Dataset', function() {

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

        dataSet = new DataSet(principal, interest, payment);

        done();
    });

    it('should get it right', function(done) {
        should.exist(dataSet.getPaymentPlan());
        done();
    });




});
