(function () {
    'use strict';
    var utils = angular.module('utils');
    utils.directive('imgSvg', ['$http', function ($http) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var src = attrs.src;

                var manipulateImgNode = function (data, elem) {
                    var xml = $.parseXML(data),
                        $svg = $(xml).find('svg'),
                        imgClass = elem.attr('class');

                    if (typeof(imgClass) !== 'undefined') {
                        $svg.attr("class", imgClass);
                    }

                    return $svg;
                };

                $http.get(src, { 'Content-Type': 'application/xml' }).then(function (data) {
                    // element.replaceWith(manipulateImgNode(data.data, element));
                    element[0].outerHTML = data.data;
                });
            }
        };
    }]);
})()