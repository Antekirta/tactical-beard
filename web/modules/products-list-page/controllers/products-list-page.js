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
        'translitFactory',
        'STATE_NAMES',

        function($scope, $log, $state, $stateParams, $locale, productsProvider, filtersFactory, statesFactory, translitFactory, STATE_NAMES) {
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

            $scope.goToUIProductState = function (state) {
                console.log('state: ', state.categoryName[_.keys(state.categoryName)[0]][0].name);

                $state.go(STATE_NAMES.PRODUCT, {
                    productId: state.productId,
                    productName: translitFactory.rusTolat(state.productName),
                    categoryName: state.categoryName[_.keys(state.categoryName)[0]][0].name,
                    categoryNameForUrl: translitFactory.rusTolat(state.categoryName[_.keys(state.categoryName)[0]][0].name)
                });
            };

            $scope.products = [];

            $scope.filters = filtersFactory.getCurrentFilters();

            $scope.currentOrder = $scope.helpers.getCurrentOrder();

            $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

            productsProvider.getProductsByCategoryId($stateParams.categoryId).then(
                function(response) {
                    var products = _.toArray(response.data.data);

                    products.forEach(function (item, index, arr) {
                        item.price = +item.price;
                    });

                    console.log('products: ', products);

                    $scope.products = products;
                },

                function(error) {
                    $log.error(error);
                }
            );
        }]);
})();