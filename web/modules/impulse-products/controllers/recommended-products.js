(function () {
    'use strict';

    angular.module('impulseProducts')
        .controller('recommendedProductsCtrl', [
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

            function ($scope, $log, $state, $stateParams, $locale, productsProvider, filtersFactory, statesFactory, translitFactory, STATE_NAMES) {
                $scope.goToUIProductState = function (state) {
                    $state.go(STATE_NAMES.PRODUCT, {
                        productId: state.productId,
                        productName: translitFactory.rusTolat(state.productName),
                        categoryName: state.categoryName[_.keys(state.categoryName)[0]][0].name,
                        categoryNameForUrl: translitFactory.rusTolat(state.categoryName[_.keys(state.categoryName)[0]][0].name)
                    });
                };

                $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

                $scope.products = [];

                $scope.$on('PRODUCT_DOWNLOADED', function (event, productRelateds) {
                    productRelateds.forEach(function (id) {
                        productsProvider.getProductById(id).then(function (response) {
                            $scope.products.push(response.data.data);
                        });
                    });
                });
            }
        ]);
})();