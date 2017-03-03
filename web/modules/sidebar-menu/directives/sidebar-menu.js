(function() {
	'use strict';

	var sidebarMenu = angular.module('sidebarMenu');

	sidebarMenu.directive('sidebarMenu', function() {
		return {
			restrict: 'A',

			controller: 'sidebarMenuCtrl',

			templateUrl: 'modules/sidebar-menu/partials/sidebar-menu.html',

			link: function(scope, element, attrs) {

			}
		};
	});
})();