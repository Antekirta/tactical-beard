(function() {
	'use strict';

	var categoriesPage = angular.module('categoriesPage');

	categoriesPage.controller('categoriesPageCtrl', [
		'$scope',

		'categoriesProvider',

		function($scope, categoriesProvider) {
			// categoriesProvider.then(
			// 	function(response) {
			// 		console.log('categoriesPageCtrl data', response);
			// 	},
            //
			// 	function(error) {
            //
			// 	}
			// );
		}]);
})();