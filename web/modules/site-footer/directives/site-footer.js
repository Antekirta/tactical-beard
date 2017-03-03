(function() {
	'use strict';

	var siteFooter = angular.module('siteFooter');

	siteFooter.directive('siteFooter', function() {
		return {
			restrict: 'A',

			controller: 'siteFooterCtrl',

			templateUrl: 'modules/site-footer/partials/site-footer.html',

			link: function(scope, element, attrs) {

			}
		};
	});
})();