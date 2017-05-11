(function () {
    'use strict';
    
    angular.module('utils')
        .directive('imagePopup', function () {
            return {
                restrict: 'E',

                templateUrl: 'modules/utils/directives/image-popup/image-popup.html',

                link: function (scope, element, attrs) {
                    $(document).ready(function () {
                        var container = $( element.parent() );

                        var images = container.find('img');

                        console.log('element: ', element);
                        console.log('container: ', container);
                        console.log('images: ', images);

                        scope.imagePopup = {};

                        scope.imagePopup.image = 'http://tacticalbeard39.com/image/cache/import_files/9a4aa975-80b1-407b-a322-bfdd7b342e080-100x100.JPG';
                    });
                }
            };
        });
})();