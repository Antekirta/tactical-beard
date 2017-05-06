(function() {
	'use strict';

	var filters = angular.module('filters');

	filters.controller('filtersCtrl', ['$scope', '$log', '$timeout', '$stateParams', 'productsProvider', 'manufacturersProvider', 'filtersFactory', function($scope, $log, $timeout, $stateParams, productsProvider, manufacturersProvider, filtersFactory) {
        $scope.filters = filtersFactory.getCurrentFilters();

	    $scope.searchByName = '';

        $scope.manufacturersList = [];

        $scope.events = {
            filters: {
                searchByName: function () {
                    $scope.filters = filtersFactory.setSearchByName($scope.filters.filters.searchByName.value);
                },

                chooseManufacturer: function (event, selectedItem) {
                    if ( selectedItem === allManufacturers ) {
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

            chooseFilter: function (filterName) {
                $scope.filters.filters[filterName].status = !$scope.filters.filters[filterName].status;

                filtersFactory.setCurrentFilters($scope.filters);
            },

            chooseOrder: function (orderName) {
                $scope.filters = filtersFactory.setCurrentOrder(orderName);
            }
        };

        var allManufacturers = 'Все производители';

        $timeout(function () {
            productsProvider.getProductsByCategoryId($stateParams.categoryName).then(
                function(response) {
                    var products = _.toArray(response.data.data);

                    products.forEach(function (item, index, arr) {
                        item.price = +item.price;
                    });

                    $scope.filters.filters.priceFrom.value = _.minBy(products, function (product) {
                        return product.price;
                    }).price;
                    $scope.filters.filters.priceTo.value = _.maxBy(products, function (product) {
                        return product.price;
                    }).price;
                },

                function(error) {
                    $log.error(error);
                }
            );
        }, 0);

        manufacturersProvider.getManufacturers()
            .then(
                function (response) {
                    var manufacturers = response.data.data;

                    manufacturers.unshift({name: allManufacturers});

                    $scope.manufacturersList = manufacturers;
                },

                function (error) {
                    $log.error(error);
                }
            );

        $scope.$watch('filters.filters.searchByName.value', $scope.events.filters.searchByName);
        $scope.$watch('filters.filters.priceFrom.value', $scope.events.filters.limitPrice);
        $scope.$watch('filters.filters.priceTo.value', $scope.events.filters.limitPrice);

        var dropdownSelectListener = $scope.$on('dropdownSelectItemSelected', $scope.events.filters.chooseManufacturer);

        $scope.$on('$destroy', dropdownSelectListener);
	}]);
})();