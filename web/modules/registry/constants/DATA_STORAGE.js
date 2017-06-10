(function () {
    'use strict';

    var registry = angular.module('registry');

    registry.constant('DATA_STORAGE', {
        'STORAGES': {
            'PRODUCTS': 'products',

            'CATEGORY_ID': 'categoryId'
        }
    });
})();