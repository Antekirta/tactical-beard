(function () {
    'use strict';

    angular.module('productsListPage')
        .filter('filterCaller', [
            '$injector',

            function ($injector) {
                return function (items, filterName) {
                    var currentFilter = $injector.get(filterName);

                    return currentFilter(items);
                };
            }
        ]);
})();