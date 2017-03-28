(function() {
	'use strict';

	var siteHeader = angular.module('siteHeader');

	siteHeader.controller('siteHeaderCtrl', [
		'$scope',

		'mainMenu',

		'STATES',

		'languages',

		function($scope, mainMenu, STATES, languages) {
			$scope.languages = languages.getLanguages();

			$scope.langHelpers = {
				toggleLanguage: function(lang) {
					languages.setCurrentLanguage(lang.order);
				}
			};

			$scope.basket = {

			};
	}]);
})();