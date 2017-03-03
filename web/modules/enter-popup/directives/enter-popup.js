(function() {
	'use strict';

	var enterPopup = angular.module('enterPopup');

	enterPopup.directive('enterPopup', function() {
		return {
			restrict: 'A',

			controller: 'enterPopupCtrl',

			templateUrl: 'modules/enter-popup/partials/enter-popup.html',

			link: function(scope, element, attrs) {

			}
		};
	});
})();