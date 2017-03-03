(function() {
	'use strict';

	var impulseProducts = angular.module('impulseProducts');

	impulseProducts.directive('impulseProducts', function() {
		return {
			restrict: 'A',

			controller: 'impulseProductsCtrl',

			templateUrl: 'modules/impulse-products/partials/impulse-products.html',

			link: function(scope, element, attrs) {

			}
		};
	});
})();