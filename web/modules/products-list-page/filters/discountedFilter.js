(function () {
    'use strict';

    angular.module('productsListPage')
        .filter('discountedFilter', ['filtersFactory', function (filtersFactory) {
            return function (items) {
                console.log('discountedFilter items: ', items);
                var discountedFilterStatus = filtersFactory.getCurrentFilters().filters.discounted.status;

                if ( discountedFilterStatus ) {
                    return items.filter(function (item, index, arr) {
                        return item.discounts.length;
                    });
                } else {
                    return items;
                }
            };
        }]);
})();