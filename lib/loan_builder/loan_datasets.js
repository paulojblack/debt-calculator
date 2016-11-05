var MonthlyPayment = require('./monthly_payment'),
    _ = require('lodash'),
    Moment = require('moment');

/**
 * @class
 * @constructor
 * @desc Surface layer class to create all loan objects and return to call
 *
 * @param {Number} principal
 * @param {Number} interest
 * @param {Number} payment
 */
var DataSet = function Dataset(principal, interest, payment) {
    var self = this;

    self.principal = principal;
    self.interest = interest;
    self.payment = payment;
    self.fullPlan = _.chunk(principal);

};

DataSet.prototype.getPaymentPlan = function getPaymentPlan() {
    var self = this,
        output = {};

    self.calculateLoansUntilPaid(self.principal).forEach(function(val, ind) {
        var loanNumber = ind + 1;
        output['loan' + loanNumber] = val;
    });

    var now = new Moment();
    output.months = output.loan1.map(function () {
        return now.add(1, 'months').format('MM-YY');
    });

    return output;
};

DataSet.prototype.calculateLoansUntilPaid = function calculateLoansUntilPaid(principal) {
    var self = this,
        newMonth = new MonthlyPayment(principal, self.interest, self.payment),
        next_month_principal = newMonth.getNextMonthPrincipal();

    self.fullPlan.forEach(function(value, index){
        self.fullPlan[index].push(next_month_principal[index]);
    });

    if (_.sum(next_month_principal) === 0) {
        return self.fullPlan;
    } else {
        return self.calculateLoansUntilPaid(next_month_principal, self.fullPlan);
    }
};

module.exports = DataSet;
