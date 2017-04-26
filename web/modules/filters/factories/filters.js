
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
            
            setFilter: function (filterName, filterValue) {

            }
        };
    });
})();