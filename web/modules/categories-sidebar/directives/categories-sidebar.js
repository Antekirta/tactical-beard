(function() {
	'use strict';

	var categoriesSidebar = angular.module('categoriesSidebar');

	categoriesSidebar.directive('categoriesSidebar', ['EVENTS', function(EVENTS) {
		return {
			restrict: 'A',

			controller: 'categoriesSidebarCtrl',

			templateUrl: 'modules/categories-sidebar/partials/categories-sidebar.html',

			link: function(scope, element, attrs) {

			}
		};
	}]);
})();