var loans = require('../loan_builder');

module.exports = function() {
    return [
        {
            method: 'GET',
            path: '/',
            handler: function(req, rep) {
                rep('d');
            }
        }
    ];
};
