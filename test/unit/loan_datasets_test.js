var should = require('should'),
    DataSet = require('../../lib/private/loan_datasets'),
    _ = require('lodash'),
    dataset,
    principal,
    interest,
    payment,
    fs = require('fs');

describe('Dataset', function() {

    beforeEach(function(done){

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

        payment = 800;

        dataSet = new DataSet(principal, interest, payment);

        done();
    });

    it('should get it right', function(done) {
        should.exist(dataSet.getPaymentPlan());

        done();
    });

    it('should write the json im going to THROW THIS AWAY', function(done) {
        var my_data = {
            data: dataSet.getPaymentPlan(),
            months: []
        };
        var i = 0;
        my_data.months = my_data.data[0].map(function(payment){
            i += 1;
            return i
        });
        console.log(my_data.months)

        // console.log(my_data)
        fs.writeFile('data.json', JSON.stringify(my_data), null);

        done();

    });




});
