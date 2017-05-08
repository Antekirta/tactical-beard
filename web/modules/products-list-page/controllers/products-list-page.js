(function() {
	'use strict';

	var productsListPage = angular.module('productsListPage');

	productsListPage.controller('productsListPageCtrl', [
	    '$scope',
        '$log',
        '$state',
        '$stateParams',
        '$locale',
        'productsProvider',
        'filtersFactory',
        'statesFactory',

        function($scope, $log, $state, $stateParams, $locale, productsProvider, filtersFactory, statesFactory) {
            $scope.helpers = {
                getCurrentOrder: function () {
                    var currentOrdermap = {
                        'cheaper': 'price',

                        // reverse
                        'expensive': '-price'
                    };

                    var currentOrder = _.find($scope.filters.order, function (orderType) {
                        return orderType.status;
                    });

                    if ( currentOrder ) {
                        return currentOrdermap[currentOrder.name];
                    } else {
                        return 'name';
                    }
                },

                getCurrentFilters: function () {
                    return 'byManufacturerFilter';
                }
            };

            $scope.stateMethods = statesFactory;

            console.log('$scope.stateMethods.getCurrentState(): ', $scope.stateMethods.getCurrentState());

            $scope.products = [];

            $scope.filters = filtersFactory.getCurrentFilters();

            $scope.currentOrder = $scope.helpers.getCurrentOrder();

            $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

            productsProvider.getProductsByCategoryId($stateParams.categoryName).then(
                function(response) {
                    var products = _.toArray(response.data.data);

                    products.forEach(function (item, index, arr) {
                        item.price = +item.price;
                    });

                    $scope.products = products;
                },

                function(error) {
                    $log.error(error);
                }
            );
        }]);
})();