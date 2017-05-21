(function() {
	'use strict';

	var siteHeader = angular.module('siteHeader');

	siteHeader.controller('siteHeaderCtrl', [
		'$scope',

		'mainMenu',

		'STATES',

		'EVENTS',

		'languages',

		'basketFactory',

		function($scope, mainMenu, STATES, EVENTS, languages, basketFactory) {
			$scope.languages = languages.getLanguages();

			$scope.langHelpers = {
				toggleLanguage: function(lang) {
					languages.setCurrentLanguage(lang.order);
				}
			};

			var helpers = {
				basket: {
					setBasketLength: function () {
                        $scope.basketLength = basketFactory.client.getBasketLength();
                    }
				}
			};

            $scope.basketLength = basketFactory.client.getBasketLength();

			$scope.$on(EVENTS.BASKET_EVENTS, helpers.basket.setBasketLength);
	}]);
})();