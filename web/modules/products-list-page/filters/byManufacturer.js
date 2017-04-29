(function () {
    'use strict';

    angular.module('productsListPage')
        .filter('byManufacturer', [
            'filtersFactory',

            function (filtersFactory) {
                var selectedManufacturer = filtersFactory.getCurrentFilters().filters.manufacturers;

                console.log('manufacturers: ', selectedManufacturer);

                return function (items) {
                    console.log('selectedManufacturer!!!', selectedManufacturer);
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