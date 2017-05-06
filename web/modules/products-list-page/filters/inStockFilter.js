(function () {
    'use strict';

    angular.module('productsListPage')
        .filter('inStockFilter', ['filtersFactory', function (filtersFactory) {
            return function (items) {
                var inStockFilterFilterStatus = filtersFactory.getCurrentFilters().filters.inStock.status;

                if ( inStockFilterFilterStatus ) {
                    return items.filter(function (item, index, arr) {
                        return item.stock_status !== 'В наличии';
                    });
                } else {
                    return items;
                }
            };
        }]);
})();