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
					var arr = _.toArray(response.data.data.categories);

                    arr = _.sortBy(arr, [function (obj) {
						return parseInt(obj[0].sort_order);
                    }]);

                     _.remove(arr, function (obj) {
                        return obj[0].meta_title === '';
                    });

					arr.forEach(function (category) {
						category[0].image = '../img/categories/' + category[0].meta_alias + '.svg';
                    });

					console.log(arr);

                    $scope.categories = arr;
				},

				function(error) {
					$log.error(error);
				}
			);
		}]);
})();