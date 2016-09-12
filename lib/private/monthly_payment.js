var LoanUtilities = require('./loan_utilities'),
    _ = require('lodash');
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
        principal = self.principal,
        payment = self.payment,
        monthly_interest,
        most_effective_payment,
        next_month_principal;

    monthly_interest = self.utils.computeMonthlyInterest();
    most_effective_payment = self.utils.getHighestInterest();

    return monthly_interest.map(function(value, index){
        var new_principal = self.principal[index] + value;

        if (value === most_effective_payment) {
            return new_principal - payment;
        } else {
            return new_principal;
        }
    });


};


module.exports = MonthlyPayment;