(function() {
    'use strict';

    var impulseProducts = angular.module('impulseProducts');

    impulseProducts.controller('latestProductsCtrl', [
        '$scope',
        '$log',
        '$state',
        '$stateParams',
        '$locale',
        'productsProvider',
        'filtersFactory',
        'statesFactory',
        'translitFactory',
        'dateFactory',
        'STATE_NAMES',
        'DATE',

        function($scope, $log, $state, $stateParams, $locale, productsProvider, filtersFactory, statesFactory, translitFactory, dateFactory, STATE_NAMES, DATE) {
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

           var dateFrom = dateFactory.dateToFormat(dateFactory.substractPeriodFromCurrentDate(DATE.PARAMS.LATEST_PRODUCT_INTERVAL));

            productsProvider.getProductFromDate(dateFrom).then(
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