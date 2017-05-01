
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

        return {
            getCurrentFilters: function () {
               return filters;
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
            
            setCurrentOrder: function (orderName) {
                for( var order in filters.order ) {
                    filters.order[order].status = false;
                }

                filters.order[orderName].status = true;

                return filters;
            }
        };
    });
})();