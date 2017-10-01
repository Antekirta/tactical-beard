(function () {
    'use strict';

    angular.module('registry')
        .constant('PAYMENT_METHODS', {
            'BANK_TRANSFER': 'bank_transfer',

            'CHEQUE': 'cheque',

            'COD': 'cod'
        });
})();