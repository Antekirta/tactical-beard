(function () {
    'use strict';

    var filters = angular.module('filters');

    filters.controller('filtersCtrl', [
        '$scope',
        '$rootScope',
        '$log',
        '$timeout',
        '$stateParams',
        'productsProvider',
        'manufacturersProvider',
        'filtersFactory',
        'categoriesDictionary',
        'FILTERS',

        function ($scope, $rootScope, $log, $timeout, $stateParams, productsProvider, manufacturersProvider, filtersFactory, categoriesDictionary, FILTERS) {
            $scope.filters = filtersFactory.getCurrentFilters();

            $scope.searchByName = '';

            $scope.manufacturersList = [];

            $scope.events = {
                filters: {
                    searchByName: function () {
                        $scope.filters = filtersFactory.setSearchByName($scope.filters.filters.searchByName.value);
                    },

                    chooseManufacturer: function (event, selectedItem) {
                        if (selectedItem === FILTERS.ALL_MANUFACTURERS) {
                            $scope.filters = filtersFactory.setCurrentManufacturer(false);
                        } else {
                            $scope.filters = filtersFactory.setCurrentManufacturer(selectedItem);
                        }

                        return $scope.filters;
                    },

                    limitPrice: function () {
                        $scope.filters = filtersFactory.setLimitPrice($scope.filters.filters.priceFrom.value, $scope.filters.filters.priceTo.value);
                    },

                    toggleDiscountFilter: function () {
                        $scope.filters = filtersFactory.setDiscountFilter(!$scope.filters.filters.discounted.status);
                    },

                    toggleNoveltiesFilter: function () {
                        $scope.filters = filtersFactory.setNoveltiesFilter(!$scope.filters.filters.novelties.status);
                    },

                    toggleInStockFilter: function () {
                        $scope.filters = filtersFactory.setInStockFilter(!$scope.filters.filters.inStock.status);
                    }
                },

                chooseOrder: function (orderName) {
                    $scope.filters = filtersFactory.setCurrentOrder(orderName);
                }
            };

            $scope.filters.filters.priceTo.value = 99999;

            // $rootScope.$on('$stateChangeSuccess', handlers.getPriceExtremums);

            manufacturersProvider.getManufacturers()
                .then(
                    function (response) {
                        var manufacturers = response.data.data;

                        manufacturers.unshift({name: FILTERS.ALL_MANUFACTURERS});

                        $scope.manufacturersList = manufacturers;
                    },

                    function (error) {
                        $log.error(error);
                    }
                );

            $scope.$watch('filters.filters.searchByName.value', $scope.events.filters.searchByName);
            $scope.$watch('rootScope.products.minPrice', $scope.events.filters.limitPrice);
            $scope.$watch('rootScope.products.maxPrice', $scope.events.filters.limitPrice);

            var dropdownSelectListener = $scope.$on('dropdownSelectItemSelected', $scope.events.filters.chooseManufacturer);

            $scope.$on('$destroy', dropdownSelectListener);
        }]);
})();