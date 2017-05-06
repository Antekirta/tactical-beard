(function () {
    'use strict';

    angular.module('productsListPage')
        .filter('noveltiesFilter', ['filtersFactory', function (filtersFactory) {
            return function (items) {
                var noveltiesFilterStatus = filtersFactory.getCurrentFilters().filters.novelties.status;

                if ( noveltiesFilterStatus ) {
                    return items.filter(function (item, index, arr) {
                        return item.special.length;
                    });
                } else {
                    return items;
                }
            };
        }]);
})();