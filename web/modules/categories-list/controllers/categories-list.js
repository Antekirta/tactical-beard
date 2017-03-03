(function() {
	'use strict';

	var categoriesList = angular.module('categoriesList');

	categoriesList.controller('categoriesListCtrl', [
		'$scope',

		'$log',

		'categoriesProvider',

		function($scope, $log, categoriesProvider) {
			$scope.categories = [];

			$scope.helpers = {
				sortByOrder: function(a, b) {
					var orderProp = 'sort_order';

					try {
						if ( !a.hasOwnProperty(orderProp) || !b.hasOwnProperty(orderProp) ) {
							throw new SyntaxError('Wrong parameters in helpers.sortByOrder');
						}

						return a[orderProp] - b[orderProp];
					} catch (err) {
						$log.error(err);
					}
				}
			};

			categoriesProvider.getCategories().then(
				function(response) {
					$scope.categories = _.toArray(response.data.data.categories);
					//$scope.categories = $scope.categories.sort($scope.helpers.sortByOrder);
					console.log($scope.categories);
				},

				function(error) {
					$log.error(error);
				}
			);
		}]);
})();