(function() {
    'use strict';

    var beard = angular.module('beard');

    beard.controller('stateCtrl', ['$scope', '$log', '$state', function($scope, $log, $state) {
        $scope.sidebarCategoriesIsVisible = function () {
            return ['products-list', 'category'].indexOf($state.current.name) > - 1;
        };

        $scope.filtersBlockIsVisible = function () {
            return ['category'].indexOf($state.current.name) > - 1;
        };
    }]);
})();