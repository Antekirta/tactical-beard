(function() {
	'use strict';

	var filters = angular.module('filters');

	filters.controller('filtersCtrl', ['$scope', 'manufacturersProvider', function($scope, manufacturersProvider) {
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
	}]);
})();