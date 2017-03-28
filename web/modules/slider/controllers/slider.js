(function() {
	'use strict';

	var slider = angular.module('slider');

	slider.controller('sliderCtrl', ['$scope', function($scope) {
		$scope.slides = [
			{
				header: 'Далеко-далеко'
			},
			{
				header: 'Мы в лес - вы с нами?'
			}
		];
	}]);
})();