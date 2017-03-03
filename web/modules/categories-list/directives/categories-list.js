(function() {
	'use strict';

	var categoriesList = angular.module('categoriesList');

	categoriesList.directive('categoriesList', function() {
		return {
			restrict: 'A',

			controller: 'categoriesListCtrl',

			templateUrl: 'modules/categories-list/partials/categories-list.html',

			link: function(scope, element, attrs) {

			}
		};
	});
})();