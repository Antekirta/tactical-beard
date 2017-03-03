(function() {
	'use strict';

	var sidebarAdditional = angular.module('sidebarAdditional');

	sidebarAdditional.directive('sidebarAdditional', function() {
		return {
			restrict: 'A',

			controller: 'sidebarAdditionalCtrl',

			templateUrl: 'modules/sidebar-additional/partials/sidebar-additional.html',

			link: function(scope, element, attrs) {

			}
		};
	});
})();