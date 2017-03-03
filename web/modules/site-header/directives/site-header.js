(function() {
	'use strict';

	var siteHeader = angular.module('siteHeader');

	siteHeader.directive('siteHeader', ['EVENTS', function(EVENTS) {
		return {
			restrict: 'A',

			controller: 'siteHeaderCtrl',

			templateUrl: 'modules/site-header/partials/site-header.html',

			link: function(scope, element, attrs) {

			}
		};
	}]);
})();