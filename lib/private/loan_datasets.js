var MonthlyPayment = require('./monthly_payment'),
    _ = require('lodash');


var DataSet = function Dataset(principal, interest, payment) {

    this.principal = principal;
    this.interest = interest;
    this.payment = payment;

    this.newMonth = new MonthlyPayment();
};

dataset = new DataSet();

DataSet.prototype.getPaymentPlan = function getPaymentPlan() {
    var self = this,
        principal = self.principal,
        complete_loan_plan;

    complete_loan_plan = principal.map(function(initial_principle) {
        var individual_loan =  [];
        individual_loan.push(initial_principle);
        return [initial_principle];
        // return individual_loan;
    });

    console.log(complete_loan_plan)


};

module.exports = DataSet;
