(function() {
	'use strict';

	var siteHeader = angular.module('siteHeader');

	siteHeader.controller('siteHeaderCtrl', [
		'$scope',

		'$state',

		'mainMenu',

		'STATES',

		'STATE_NAMES',

		'EVENTS',

		'KEYBOARD',

		'languages',

		'basketFactory',

		function($scope, $state, mainMenu, STATES, STATE_NAMES, EVENTS, KEYBOARD, languages, basketFactory) {
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

            $scope.goToUIProductState = function (state) {
            	if ( event.keyCode === KEYBOARD.ENTER ) {
                    $state.go(STATE_NAMES.SEARCH, {
                        search: state.search
                    });
				}
            };

            $scope.basketLength = basketFactory.client.getBasketLength();

			$scope.$on(EVENTS.BASKET_EVENTS, helpers.basket.setBasketLength);
	}]);
})();