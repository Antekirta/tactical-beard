(function () {
    'use strict';
    
    angular.module('utils')
        .directive('imagePopup', ['EVENTS', function (EVENTS) {
            return {
                restrict: 'E',

                scope: true,

                templateUrl: 'modules/utils/directives/image-popup/image-popup.html',

                link: function (scope, element, attrs) {
                    // storage for images sources
                    var sources = [],

                        images,

                        background,

                        image;

                    $(document).ready(function () {
                        scope.imagePopup = {};

                        var helpers = {
                            fillImagesSources: function (sources, images) {
                                if ( _.isEmpty(sources) ) {
                                    _.toArray(images).forEach(function (item) {
                                        sources.push(item.src);
                                    });

                                    sources = _.compact(_.uniq(sources));
                                }
                            }
                        };

                        // basic settings
                        var container = element.parent();

                        container.on(EVENTS.ELEMENT.CLICK, function (event) {
                            var target = event.target;

                            // we declare images only here, insie of click callback, because we have to wait for the images to load
                            var images = container.find('img');

                            var background = $('.image-popup__dark-background');

                            var image = $('.image-popup__image');

                            helpers.fillImagesSources(sources, images);


                            console.log('sources: ', sources);



                            if ( target.nodeName === 'IMG' ) {
                                scope.imagePopup.image = target.src;

                                scope.$digest();

                                background.addClass('product-images__dark-background--visible');
                            }

                            background.on(EVENTS.ELEMENT.CLICK, function () {
                                $(this).removeClass('product-images__dark-background--visible');
                            });

                            image.on(EVENTS.ELEMENT.CLICK, function () {
                                console.log('scope.imagePopup.image before: ', scope.imagePopup.image);
                                var currentIndex = _.findIndex(sources, function (item) {
                                    return item === scope.imagePopup.image;
                                });

                                if ( currentIndex >= sources.length ) {
                                    currentIndex = 0;
                                } else {
                                    currentIndex++;
                                }

                                console.log('currentIndex: ', currentIndex);

                                scope.imagePopup.image = sources[currentIndex];

                                console.log('scope.imagePopup.image after: ', scope.imagePopup.image);

                                scope.$digest();
                            });
                        });
                    });
                }
            };
        }]);
})();