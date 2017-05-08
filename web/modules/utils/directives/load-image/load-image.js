(function () {
    'use strict';

    var utils = angular.module('utils');

    utils.directive('loadImage', ['EVENTS',

        function (EVENTS) {
        return {
            restrict: 'A',

            link: function (scope, element, attrs) {
                var image = angular.element(element[0]);

                image.on(EVENTS.LOAD.LOAD, function () {
                    var preloader = image.siblings('ng-include').find('.image-preloader');

                    preloader.fadeOut();
                });

                image.on(EVENTS.LOAD.ERROR, function () {
                    setTimeout(function () {
                        image[0].src = attrs.src;
                    }, 300);
                });

                // setTimeout(function () {
                //     if ( attrs.src !== '' ) {
                //         preloader.fadeOut();
                //     }
                // }, 2000);
            }
        };
    }]);
})();