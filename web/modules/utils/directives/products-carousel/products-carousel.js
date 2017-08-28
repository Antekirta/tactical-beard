(function () {
    'use strict';

    angular.module('utils')
        .directive('productsCarousel', ['$interval', 'EVENTS', function ($interval, EVENTS) {
            return {
                restrict: 'A',

                templateUrl: 'modules/utils/directives/products-carousel/products-carousel.html',

                link: function (scope, element, attrs) {
                    scope.productsCarousel = {};

                    // settings

                    const map = {
                        promo: {
                            title: 'Промо-товары',

                            link: 'Смотреть все промо-товары',

                            href: '/categories/promo/'
                        },

                        new: {
                            title: 'Новинки',

                            link: 'Смотреть все новинки'
                        },

                        recommends: {
                            title: 'Рекомендуем',

                            link: ''
                        }
                    };

                    if ( !map[attrs.productsCarousel] ) {
                        throw new Error('There is no such carousel type: ' + attrs.productsCarousel);
                    }

                    scope.productsCarousel.title = map[attrs.productsCarousel].title;

                    scope.productsCarousel.link = map[attrs.productsCarousel].link;

                    // move carousel

                    $(document).ready(function () {
                        const controls = {
                            forward: element.find('.products-carousel__carousel-arrow--forward .carousel-arrow'),

                            back: element.find('.products-carousel__carousel-arrow--back .carousel-arrow')
                        };

                        let carousel = {
                            element: element.find('.products-carousel__list'),

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
                        }, 3000);

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