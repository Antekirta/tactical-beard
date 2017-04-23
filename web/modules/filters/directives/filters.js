(function() {
    'use strict';

    var filters = angular.module('filters');

    filters.directive('filters', ['EVENTS', function(EVENTS) {
        return {
            restrict: 'A',

            controller: 'filtersCtrl',

            templateUrl: 'modules/filters/partials/filters.html',

            link: function(scope, element, attrs) {
                console.log(element);
            }
        };
    }]);
})();