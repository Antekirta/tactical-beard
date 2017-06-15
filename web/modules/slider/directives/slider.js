(function() {
	'use strict';

	var slider = angular.module('slider');

	slider.directive('slider', function() {
		return {
			restrict: 'A',

			controller: 'sliderCtrl',

			templateUrl: 'modules/slider/partials/slider.html',

			link: function(scope, element, attrs) {
				$(document).ready(function() {
					var container = element.find('ul'),

						slides = container.find('li'),

						i = 0;

					//cache it!
					scope.getSliderWidth = function () {
						return element[0].clientWidth;
					};

					var offsets = {
						current: 0,

						min: 0,

						max: scope.getSliderWidth() * (slides.length-1) * (-1)
					};

					scope.setSlidesParams = function () {
						var sliderWidth = scope.getSliderWidth(),

							i = 0;

						slides.css('width', sliderWidth + 'px');

						container.css('width', sliderWidth * slides.length + 'px');

						for (; i < slides.length; i++ ) {
							slides.eq(i).css('width', sliderWidth + 'px');

							slides.eq(i).css('left', sliderWidth * i + 'px');
						}
					};

					scope.changeSlide = function (direction) {
						var directions = {
							back: 'back',

							forward: 'forward'
						};

						var sliderWidth = scope.getSliderWidth();

						if( direction === directions.forward ) {

							if ( offsets.current > offsets.max ) {
								offsets.current = offsets.current - sliderWidth;
							} else {
								offsets.current = 0;
							}

						} else if( direction === directions.back ) {

							if ( offsets.current < offsets.min ) {
								offsets.current = offsets.current + sliderWidth;
							} else {
								offsets.current = offsets.max;
							}

						}

						$('.main-slider__slides-container').animate({left: offsets.current + 'px'});
					};

					scope.setSlidesParams();
				});
			}
		};
	});
})();