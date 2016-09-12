var MonthlyPayment = require('./monthly_payment'),
    _ = require('lodash'),
    internals = {};


var DataSet = function Dataset(principal, interest, payment) {
    var self = this;

    self.principal = principal;
    self.interest = interest;
    self.payment = payment;
};

DataSet.prototype.getPaymentPlan = function getPaymentPlan() {
    var self = this,
        principal = self.principal,
        complete_loan_plan,
        initial_principle_individual_array;

    initial_principle_individual_array = principal.map(function(initial_principle) {
        return [initial_principle];
    });

    complete_loan_plan = self.calculateLoansUntilPaid(principal, initial_principle_individual_array);

    return complete_loan_plan;
};

DataSet.prototype.calculateLoansUntilPaid = function calculateLoansUntilPaid(principal, complete_loan_plan) {
    var self = this,
        interest = self.interest,
        payment = self.payment,
        newMonth = new MonthlyPayment(principal, interest, payment),
        next_month_principal;

    next_month_principal = newMonth.getNextMonthPrincipal();

    complete_loan_plan.forEach(function(value, index){
        complete_loan_plan[index].push(next_month_principal[index]);
    });


    if (_.sum(next_month_principal) === 0) {
        return complete_loan_plan;
    } else {
        return self.calculateLoansUntilPaid(next_month_principal, complete_loan_plan);
    }

};

module.exports = DataSet;
