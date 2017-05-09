(function () {
    'use strict';

    angular.module('utils')
        .directive('breadcrumbs', [function () {
            return {
                restrict: 'EA',

                templateUrl: 'modules/utils/directives/breadcrumbs/breadcrumbs.html',

                link: function (scope, element, attrs) {

                }
            };
        }]);
})();