(function() {
    'use strict';

    var registry = angular.module('registry');

    registry.constant('DATE', {
        'DATE_TRANSFER': {
            'MS_IN_SEC': 1000,

            'SEC_IN_MIN': 60,

            'MIN_IN_HOUR': 60,

            'HOUR_IN_DAY': 24
        },

        'PARAMS': {
            'LATEST_PRODUCT_INTERVAL': 30
        }
    });
})();