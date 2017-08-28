(function () {
    'use strict';

    angular.module('productsListPage')
        .filter('inStockFilter', ['filtersFactory', function (filtersFactory) {
            return function (items) {
                let inStockFilterFilterStatus = filtersFactory.getCurrentFilters().filters.inStock.status;

                if ( inStockFilterFilterStatus ) {
                    return items.filter(function (item) {
                        return item.quantity;
                    });
                } else {
                    return items;
                }
            };
        }]);
})();