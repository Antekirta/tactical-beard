(function() {
	'use strict';

	var slider = angular.module('slider');

	slider.controller('sliderCtrl', ['$scope', function($scope) {
		$scope.slides = [
			{
				header: 'В продаже появился мужик с автоматом'
			},
			{
				header: 'Мы в лес - вы с нами?'
			}
		];
	}]);
})();