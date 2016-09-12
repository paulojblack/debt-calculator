var InterestService = require('./LoanPaymentLogic'),
    _ = require('lodash');


var DataSet = function Dataset() {

    this.logic = new InterestService();
};

dataset = new DataSet();

DataSet.prototype.fullDataBuilder = function fullDataBuilder(loans_dict, time_in_months, payment) {
    var self = this,
        init_data = {},
        keys;


        console.log(this.logic.checkHighestInterest())


    keys = _.keys(loans_dict);

    keys.forEach(function(key){
        var principal_data = [],
            output_data,
            principal = loans_dict[key][0],
            interest = loans_dict[key][1];


        self.calculateNewPrinciple(principal, interest, payment, principal_data);

        init_data[key] = principal_data;
    });
    console.log(init_data)


};

DataSet.prototype.calculateNewPrinciple = function calculateNewPrinciple(principal, interest, payment, principal_data) {
    var next_principal;

    if (principal <= 0) {
        return;
    } else if (principal > 0) {
        next_principal = principal + (principal * interest) - payment;
        principal_data.push(next_principal);
        this.calculateNewPrinciple(next_principal, interest, payment, principal_data);
    }
};




var loans_dict = {
    Loan1: [9794.09, 0.0812],
    Loan2: [5457.19, 0.07125],
    Loan3: [7324.94, 0.07125],
    Loan4: [9737.3, 0.08375],
    Loan5: [6752.98, 0.0812],
    Loan6: [8259.64, 0.07125],
    Loan7: [7120.25, 0.07125]
};

var saLoansPrinc = [8259.64, 7120.25];
var navLoansPrinc = [9737.3, 9794.09, 5457.19, 7324.94, 6752.98];

var totPrinc = _.sum(saLoansPrinc) + _.sum(navLoansPrinc);

var myData;

myData = dataset.fullDataBuilder(loans_dict, 24, 1000);

module.exports = DataSet;
