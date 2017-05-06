
(function () {
    'use strict';

    var filters = angular.module('filters');

    angular.module('filters').factory('filtersFactory', function () {
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
            // common filters methods
            getCurrentFilters: function () {
               return filters;
            },

            setCurrentFilters: function (passedFilters) {
                filters = passedFilters;

                return filters;
            },

            // specific filters methods

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

            setDiscountFilter: function (status) {
                filters.filters.discounted.status = status;

                return filters;
            },

            setNoveltiesFilter: function (status) {
                filters.filters.novelties.status = status;

                return filters;
            },

            setInStockFilter: function (status) {
              filters.filters.inStock.status = status;

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