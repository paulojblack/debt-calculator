var LoanUtilities = require('./loan_utilities'),
    _ = require('lodash');


var DataSet = function Dataset() {

    this.logic = new LoanUtilities();
};

dataset = new DataSet();

DataSet.prototype.fullDataBuilder = function fullDataBuilder(loans_dict, time_in_months, payment) {
    var self = this,
        init_data = {},
        keys;


    keys = _.keys(loans_dict);

    keys.forEach(function(key){
        var principal_data = [],
            output_data,
            principal = loans_dict[key][0],
            interest = loans_dict[key][1];


        self.calculateNewPrinciple(principal, interest, payment, principal_data);

        init_data[key] = principal_data;
    });
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




module.exports = DataSet;
