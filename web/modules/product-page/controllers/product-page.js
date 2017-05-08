(function() {
	'use strict';

	var productPage = angular.module('productPage');

	productPage.controller('productPageCtrl', ['$scope', function($scope) {
		alert('productPageCtrl!');
	}]);
})();