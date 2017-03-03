(function() {
	'use strict';

	var mainMenu = angular.module('mainMenu');

	mainMenu.directive('mainMenu', function() {
		return {
			restrict: 'A',

			controller: 'mainMenuCtrl',

			templateUrl: 'modules/main-menu/partials/main-menu.html',

			link: function(scope, element, attrs) {

			}
		};
	});
})();