(function () {
    'use strict';

    angular.module('productsListPage')
        .filter('byManufacturer', [
            'filtersFactory',

            function (filtersFactory) {
                var selectedManufacturer = filtersFactory.getCurrentFilters().filters.manufacturers;

                return function (items) {
                    if ( selectedManufacturer.status ) {
                        return items.filter(function (item) {
                            return item.manufacturer === selectedManufacturer.name;
                        });
                    }

                    return items;
                };
            }
        ]);
})();