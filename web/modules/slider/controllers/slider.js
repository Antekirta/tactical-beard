(function() {
	'use strict';

	var slider = angular.module('slider');

	slider.controller('sliderCtrl', ['$scope', function($scope) {
		$scope.slides = [
			{
				header: 'Оранжевая угроза',

				content: 'В воскресенье "Тактическая борода" организует игру по сценарию "Оранжевая угроза". Подробности по ссылке!',

				buttonText: 'Записаться на игру',

				link: 'http://tacbeard.com/arrange-game/'
			},
			{
				header: 'Новое поступление',

				content: 'В нашем магазине вы можете купить отличный оптический прицел ACOG GL 4 x 32A E👍😊. Имеет 4-х кратное увеличение, корпус сделан из металла.',

          		 buttonText: 'Посмотреть прицел',

                link: 'https://vk.com/market-20132331?section=album_7&w=product-20132331_485997%2Fquery'
			}
		];
	}]);
})();