(function() {
	'use strict';

	var impulseProducts = angular.module('impulseProducts');

	impulseProducts.directive('impulseProducts', ['$interval', function($interval) {
		return {
			restrict: 'A',

			controller: 'impulseProductsCtrl',

			templateUrl: 'modules/impulse-products/partials/impulse-products.html',

			link: function(scope, element, attrs) {
				$(document).ready(function () {
					var controls = {
						forward: element.find('.impulse-products__carousel-arrow--forward .carousel-arrow'),

						back: element.find('.impulse-products__carousel-arrow--back .carousel-arrow')
					};

					var carousel = {
						element: element.find('.impulse-products__list'),

						currentOffset: 0,

						maxOffset: function () {
							return -((_.size(carousel.element[0].children) - 3) * 195);
                        },

						moves: {
                            forward: function () {
                                if ( carousel.currentOffset <= carousel.maxOffset() ) {
                                    carousel.moves.goToStart();
                                } else {
                                    carousel.currentOffset -= 195;

                                    carousel.element.css('transform', 'translateX(' + carousel.currentOffset + 'px)');
								}
                            },

                            back: function () {
                                carousel.currentOffset += 195;

                                carousel.element.css('transform', 'translateX(' + carousel.currentOffset + 'px)');
                            },

							goToStart: function () {
                                carousel.currentOffset = 0;

                                carousel.element.css('transform', 'translateX(' + carousel.currentOffset + 'px)');
                            }
						}
					};

                    $interval(function () {
                    	if ( carousel.currentOffset <= carousel.maxOffset() ) {
                            carousel.moves.goToStart();
						} else {
                            carousel.moves.forward();
						}
                    }, 2000);

                    $interval(function () {
						if ( carousel.currentOffset > 0 ) {
                            carousel.moves.goToStart();
						}
                    }, 300);

					controls.forward.on('click', function () {
						carousel.moves.forward();
                    });

                    controls.back.on('click', function () {
                        carousel.moves.back();
                    });

                });
			}
		};
	}]);
})();