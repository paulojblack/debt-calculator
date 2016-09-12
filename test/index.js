var should = require('should'),
    sinon = require('sinon');


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
