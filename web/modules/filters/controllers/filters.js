(function () {
    'use strict';

    angular.module('filters')
        .controller('filtersCtrl', [
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
                            $scope.filters = filtersFactory.setLimitPrice($rootScope.rootScope.products.minPrice, $rootScope.rootScope.products.maxPrice);
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

                manufacturersProvider.getManufacturers()
                    .then(
                        function (response) {
                            $scope.manufacturersList = response.data.data;
                        },

                        function (error) {
                            $log.error(error);
                        }
                    );

                $scope.$watch('filters.filters.searchByName.value', $scope.events.filters.searchByName);
                $scope.$watch('rootScope.products.minPrice', $scope.events.filters.limitPrice);
                $scope.$watch('rootScope.products.maxPrice', $scope.events.filters.limitPrice);

                let dropdownSelectListener = $scope.$on('dropdownSelectItemSelected', $scope.events.filters.chooseManufacturer);

                $scope.$on('$destroy', dropdownSelectListener);
            }]);
})();