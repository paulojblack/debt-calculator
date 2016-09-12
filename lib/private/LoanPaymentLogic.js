var _= require('lodash'),
    MONTHS_IN_YEAR = 12;

/**
 * @class
 * @constructor
 * @desc Interest calculation service
 *
 * @param {Object} loanPairs        An array of arrays containing principle, value pairs
 */
var InterestService = function InterestService() {

};

/**
 * @method
 * @memberof InterestService
 * @desc Computes yearly interest for all loans passed in
 *
 * @param  {Object[]} currentLoanDict
 * @return {Number[]}                 desc
 */
InterestService.prototype.computeYearlyInterest = function computeYearlyInterest(currentLoanDict) {
    var localDict = currentLoanDict,
        yearlyInterestPayments = {};

    //Grab yearly interest payments per loan
    _.forIn(localDict, function(value, key){
        yearlyInterestPayments[key] = value[0] * value[1];
    });

    return yearlyInterestPayments;
};

InterestService.prototype.computeMonthlyInterest = function computeMonthlyInterest(currentLoanDict) {
    var yearlyInterestPayments = this.computeYearlyInterest(currentLoanDict);

    return _.mapValues(yearlyInterestPayments, function(payment) {
        return payment / MONTHS_IN_YEAR;
    });

};

InterestService.prototype.checkHighestInterest = function checkHighestInterest(currentLoanDict){
    var monthlyInterestPayments,
        monthlyPaymentPairs,
        highestMonthlyPayments,
        loanToPay;

    monthlyInterestPayments = this.computeMonthlyInterest(currentLoanDict);
    monthlyPaymentPairs = _.toPairs(monthlyInterestPayments);
    highestMonthlyPayments = _.max(_.values(monthlyInterestPayments));

    monthlyPaymentPairs.map(function(payment) {
        if (payment[1] === highestMonthlyPayments) {
            loanToPay = payment[0];
        }
    });
    return loanToPay;
};

module.exports = InterestService;
