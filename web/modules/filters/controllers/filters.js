(function() {
	'use strict';

	var filters = angular.module('filters');

	filters.controller('filtersCtrl', ['$scope', '$log', 'manufacturersProvider', 'filtersFactory', function($scope, $log, manufacturersProvider, filtersFactory) {
        $scope.manufacturersList = [];

        manufacturersProvider.getManufacturers()
            .then(
                function (response) {
                    console.log('response', response);
                    $scope.manufacturersList = response.data.data;
                },

                function (error) {
                    $log.error(error);
                }
            );

        $scope.filters = filtersFactory.getCurrentFilters();

        $scope.events = {
            filters: {
                chooseManufacturer: function (event, selectedItem) {
                    $scope.filters = filtersFactory.setCurrentManufacturer(selectedItem);
                }
            },

            chooseFilter: function (filterName) {
                $scope.filters.filters[filterName].status = !$scope.filters.filters[filterName].status;
            },

            chooseOrder: function (orderName) {
                $scope.filters = filtersFactory.setCurrentOrder(orderName);
            }
        };

        $scope.$on('dropdownSelectItemSelected', $scope.events.filters.chooseManufacturer);

        $scope.events.filters.chooseManufacturer('third manufacturer');
	}]);
})();