(function() {
	'use strict';

	var filters = angular.module('filters');

	filters.controller('filtersCtrl', ['$scope', 'manufacturersProvider', 'filtersFactory', function($scope, manufacturersProvider, filtersFactory) {
        $scope.itemsList = [
            {'name': 'Iapetos Baltazar'},
            {'name': 'Mordred Maui'},
            {'name': 'Verethragna Tane'},
            {'name': 'Arawn Lir'},
            {'name': 'Cepheus Zephyrus'},
            {'name': 'Leander Pallas'},
            {'name': 'Chryses Vohu Manah'},
            {'name': 'Nuadha Lycus'}
        ];

        $scope.filters = filtersFactory.getCurrentFilters();

        $scope.events = {
            chooseFilter: function (filterName) {
                $scope.filters.filters[filterName].status = !$scope.filters.filters[filterName].status;
            },

            chooseOrder: function (orderName) {
                $scope.filters.order[orderName].status = !$scope.filters.order[orderName].status;

                if ( orderName === $scope.filters.order.cheaper.name && $scope.filters.order.expensive.status ) {
                    $scope.filters.order.expensive.status = false;
                } else if ( orderName === $scope.filters.order.expensive.name && $scope.filters.order.cheaper.status ) {
                    $scope.filters.order.cheaper.status = false;
                }
            }
        };
	}]);
})();