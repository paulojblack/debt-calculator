var LoanUtilities = require('./loan_utilities');
/**
 * @class
 * @constructor
 * @desc Determines most effective allocation of payment and returns the following month's
 * principal updated to reflect principal growth due to interest and decrease due to payments
 *
 * @param {Array} principal Ordered array containing principal values associated with interest
 * @param {Array} interest  Ordered array containing interest values associated with principal
 * @param {Number} payment  Amount of money the user will be applying towards their balance
 * @return {Array} next_month_principal Contains the following month's principal, returned to parent class
 * which will determine whether or not a new month must be calculated
 */
var MonthlyPayment = function MonthlyPayment(principal, interest, payment) {

    this.principal = principal;
    this.payment = payment;
    this.utils = new LoanUtilities(principal, interest);

};

MonthlyPayment.prototype.getNextMonthPrincipal = function getNextMonthPrincipal(){
    var self = this,
        payment = self.payment,
        monthly_interest,
        most_effective_payment,
        next_month_principal;

    monthly_interest = self.utils.computeMonthlyInterest();
    most_effective_payment = self.utils.getHighestInterest();

    next_month_principal = monthly_interest.map(function(value, index){
        var new_principal = self.principal[index] + value;

        if (value === most_effective_payment) {
            return new_principal - payment;
        } else {
            return new_principal;
        }
    });

    return self.formatPrinciple(next_month_principal);
};

MonthlyPayment.prototype.formatPrinciple = function(new_principle) {
    return new_principle.map(function(value){
        if (value <= 0) {
            return 0;
        } else {
            return value;
        }
    });
};

module.exports = MonthlyPayment;
