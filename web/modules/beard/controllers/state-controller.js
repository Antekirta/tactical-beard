(function() {
    'use strict';

    var beard = angular.module('beard');

    beard.controller('stateCtrl', [
        '$scope',
        '$log',
        '$state',
        'STATE_NAMES',

        function($scope, $log, $state, STATE_NAMES) {
            $scope.sidebarCategoriesIsVisible = function () {
                return [STATE_NAMES.PRODUCTS_LIST, STATE_NAMES.CATEGORY, STATE_NAMES.PRODUCT, STATE_NAMES.INFO_PAGE].indexOf($state.current.name) > - 1;
            };

            $scope.filtersBlockIsVisible = function () {
                return ['category'].indexOf($state.current.name) > - 1;
            };
        }]);
})();