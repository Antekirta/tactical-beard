(function() {
	'use strict';

	var pageContent = angular.module('pageContent');

	pageContent.directive('pageContent', function() {
		return {
			restrict: 'A',

			controller: 'pageContentCtrl',

			templateUrl: 'modules/page-content/partials/page-content.html',

			link: function(scope, element, attrs) {

			}
		};
	});
})();