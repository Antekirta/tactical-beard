(function() {
	'use strict';

	var siteHeader = angular.module('siteHeader');

	siteHeader.directive('langToggler', ['EVENTS', function(EVENTS) {
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