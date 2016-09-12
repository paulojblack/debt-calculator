var InterestService = require('./LoanPaymentLogic'),
    _ = require('lodash');


var DataSet = function Dataset() {

    this.logic = new InterestService();
};

dataset = new DataSet();

DataSet.prototype.fullDataBuilder = function getDataToPlot(loansDict, timeInMonths, payment) {
    var self = this,
        fullData,
        keys;

    keys = _.keys(loansDict);

    fullData = keys.map(function(key) {
        var principal_data = [],
            output_data,
            principal = loansDict[key][0],
            interest = loansDict[key][1];

        self.calcNext(principal, interest, payment, principal_data);
        return principal_data;
    });

    var initData = {};
    keys.forEach(function(key){
        initData[key] = loansDict[key][0];
    });
    console.log(initData)
    // console.log(fullData)


};

DataSet.prototype.calcNext = function calcNext(principal, interest, payment, principal_data) {
    var next_principal;

    if (principal <= 0) {
        return;
    } else if (principal > 0) {
        next_principal = principal + (principal * interest) - payment;
        principal_data.push(next_principal);
        this.calcNext(next_principal, interest, payment, principal_data);
    }
};




var loansDict = {
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

myData = dataset.fullDataBuilder(loansDict, 24, 1000);

module.exports = DataSet;
