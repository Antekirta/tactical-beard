
(function () {
    'use strict';
    
    var filters = angular.module('filters');
    
    filters.factory('filtersFactory', function () {
        var filters = {
            order: {
                cheaper: {
                    name: 'cheaper',
                    status: true
                },
                expensive: {
                    name: 'expensive',
                    status: false
                }
            },

            filters: {
                searchByName: {
                    value: ''
                },
                manufacturers: {
                    name: false,
                    status: false
                },
                priceFrom: {
                    value: 0,
                    status: false
                },
                priceTo: {
                    value: 0,
                    status: false
                },
                discounted: {
                    name: 'discounted',
                    status: false
                },
                novelties: {
                    name: 'novelties',
                    status: false
                },
                inStock: {
                    name: 'inStock',
                    status: false
                }
            }
        };

        var minPrice = 0,

            maxPrice = 0;

        return {
            getCurrentFilters: function () {
               return filters;
            },

            setCurrentFilters: function (passedFilters) {
                return filters = passedFilters;
            },

            setSearchByName: function (value) {
                filters.filters.searchByName.value = value;

                return filters;
            },

            setCurrentManufacturer: function (manufacturerName) {
                filters.filters.manufacturers.status = !!manufacturerName;
                filters.filters.manufacturers.name = manufacturerName;

                return filters;
            },

            setLimitPrice: function (pricefrom, priceTo) {
                filters.filters.priceFrom.value = pricefrom;
                filters.filters.priceTo.value = priceTo;

                return filters;
            },

            setCurrentOrder: function (orderName) {
                for( var order in filters.order ) {
                    if ( filters.order.hasOwnProperty(order) ) {
                        filters.order[order].status = false;
                    }
                }

                filters.order[orderName].status = true;

                return filters;
            }
        };
    });
})();