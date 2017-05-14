(function () {
    'use strict';

    angular.module('utils')
        .directive('pageTitle', [function () {
            return {
                restrict: 'EA',

                templateUrl: 'modules/utils/directives/page-title/page-title.html',

                link: function (scope, element, attrs) {

                }
            };
        }]);
})();