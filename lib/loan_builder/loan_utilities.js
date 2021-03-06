var _= require('lodash'),
    MONTHS_IN_YEAR = 12;

/**
 * @class
 * @constructor
 * @desc Interest calculation service
 *
 * @param {Array} principal        Ordered values of principals
 * @param {Array} interest         Ordered values of interest, associated with principal
 */
var LoanUtilities = function LoanUtilities(principal, interest) {
    var self = this;

    self.principal = principal;
    self.interest = interest;
};

/**
 * @method
 * @memberof LoanUtilities
 * @desc Computes yearly interest for all loans passed in
 *
 * @return {Array} yearly_interest_value   Ordered values of interest paid per year
 */
LoanUtilities.prototype.computeYearlyInterest = function computeYearlyInterest() {
    var self = this;

    return self.principal.map(function (value, index){
        return _.round(value * self.interest[index], 2);
    });
};

/**
 * @method
 * @memberof LoanUtilities
 * @desc Computes monthly interest for all loans passed in
 *
 * @return {Array} monthly_interest_value   Ordered values of interest paid per month
 */
LoanUtilities.prototype.computeMonthlyInterest = function computeMonthlyInterest() {
    var self = this,
        yearly_interest_value = self.computeYearlyInterest();

    return yearly_interest_value.map(function(value) {
        return _.round(value / MONTHS_IN_YEAR, 2);
    });
};

/**
 * @method
 * @memberof LoanUtilities
 * @desc Returns highest interest rate
 *
 * @return {Number} highest_interest   Highest interest rate
 */
LoanUtilities.prototype.getHighestInterest = function getHighestInterest(){
    var self = this,
        monthly_interest_value = self.computeMonthlyInterest();

    return _.round(_.max(monthly_interest_value), 2);
};

module.exports = LoanUtilities;
