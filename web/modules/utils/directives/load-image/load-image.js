(function () {
    'use strict';

    var utils = angular.module('utils');

    utils.directive('loadImage', ['EVENTS',

        function (EVENTS) {
        return {
            restrict: 'A',

            link: function (scope, element, attrs) {
                var image = angular.element(element[0]);

                image.on('load', function () {
                    // remove preloader here
                });

                image.on(EVENTS.LOAD.ERROR, function () {
                    setTimeout(function () {
                        image[0].src = attrs.src;
                    }, 300);
                });
            }
        };
    }]);
})();