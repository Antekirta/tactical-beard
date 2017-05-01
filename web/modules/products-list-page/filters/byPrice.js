(function () {
    'use strict';

    angular.module('productsListPage')
        .filter('byPrice', [
            'filtersFactory',

            function (filtersFactory) {
                var priceFrom = filtersFactory.getCurrentFilters().filters.priceFrom,

                    priceTo = filtersFactory.getCurrentFilters().filters.priceTo;

                return function (items) {
                    return items.filter(function (item) {
                        return item.price >= +priceFrom.value && item.price <= +priceTo.value;
                    });
                };
            }
        ]);
})();