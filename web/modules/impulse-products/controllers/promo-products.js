(function() {
    'use strict';

    var impulseProducts = angular.module('impulseProducts');

    impulseProducts.controller('promoProductsCtrl', [
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

            $scope.goToUIProductState = function (state) {
                $state.go(STATE_NAMES.PRODUCT, {
                    productId: state.productId,
                    productName: translitFactory.rusTolat(state.productName),
                    categoryName: state.categoryName[_.keys(state.categoryName)[0]][0].name,
                    categoryNameForUrl: translitFactory.rusTolat(state.categoryName[_.keys(state.categoryName)[0]][0].name)
                });
            };

            $scope.products = [];

            $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

            productsProvider.getProductsByTag('promo').then(
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
        }
    ]);
})();