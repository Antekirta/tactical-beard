(function() {
	'use strict';

	var siteHeader = angular.module('siteHeader');

	siteHeader.directive('headerBasket', ['EVENTS', function(EVENTS) {
		return {
			restrict: 'A',

			controller: 'siteHeaderCtrl',

			link: function(scope, element, attrs) {
				//$(document).ready(function() {
				//
				//});
			}
		};
	}]);
})();