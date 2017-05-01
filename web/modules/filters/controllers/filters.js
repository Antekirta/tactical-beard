(function() {
	'use strict';

	var filters = angular.module('filters');

	filters.controller('filtersCtrl', ['$scope', '$log', 'manufacturersProvider', 'filtersFactory', function($scope, $log, manufacturersProvider, filtersFactory) {
	    $scope.searchByName = '';

        $scope.manufacturersList = [];

        var allManufacturers = 'Все производители';

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

        $scope.filters = filtersFactory.getCurrentFilters();

        console.log($scope.f);

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
                }
            },

            chooseFilter: function (filterName) {
                $scope.filters.filters[filterName].status = !$scope.filters.filters[filterName].status;
            },

            chooseOrder: function (orderName) {
                $scope.filters = filtersFactory.setCurrentOrder(orderName);
            }
        };

        $scope.$watch('filters.filters.searchByName.value', $scope.events.filters.searchByName);

        var dropdownSelectListener = $scope.$on('dropdownSelectItemSelected', $scope.events.filters.chooseManufacturer);

        $scope.$on('$destroy', dropdownSelectListener);
	}]);
})();