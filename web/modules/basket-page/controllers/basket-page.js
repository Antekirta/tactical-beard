(function() {
    'use strict';

    var basketPage = angular.module('basketPage');

    basketPage.controller('basketPageCtrl', [
        '$scope',
        '$log',
        'LOCALSTORAGE',
        'productsProvider',
        'basketFactory',

        function($scope, $log, LOCALSTORAGE, productsProvider, basketFactory) {
            var basket = JSON.parse(localStorage.getItem(LOCALSTORAGE.BASKET)) || [];

            $scope.basketProducts = [];

            $scope.total = 0;

            var productHandlers = {
                getPrice: function (id) {
                    var price = basket[_.findIndex(basket, function (item) {
                        return item.id === id;
                    })].price;

                    return Math.floor(+price);
                },

                getQuantity: function (id) {
                    var quantity = basket[_.findIndex(basket, function (item) {
                        return item.id === id;
                    })].quantity;

                    return Math.floor(+quantity);
                }
            };

            $scope.helpers = {
                deleteItem: function (id) {
                    var index = _.findIndex($scope.basketProducts, function (product) {
                        return product.id === id;
                    });

                    $scope.basketProducts.splice(index, 1);

                    basketFactory.client.deleteProductById(id);

                    $scope.helpers.updateTotal();
                },

                updateTotal: function () {
                    if ( !_.isEmpty($scope.basketProducts) ) {
                        $scope.total = $scope.basketProducts.reduce(function (total, currentItem) {
                            return total + currentItem.price * currentItem.quantity;
                        }, 0);
                    }
                }
            };

            basket.forEach(function (basketItem) {
                productsProvider.getProductById(basketItem.id)
                    .then(
                        function (response) {
                            var item = response.data.data;

                            item.price = productHandlers.getPrice(item.id);

                            item.quantity = productHandlers.getQuantity(item.id);

                            $scope.basketProducts.push(item);

                            $scope.helpers.updateTotal();
                        },

                        function (error) {
                            $log.error(error);
                        }
                    );
            });

            // $scope.$watch('basketProducts', $scope.helpers.updateTotal);

            // setTimeout(function () {
            //     $scope.helpers.updateTotal();
            // }, 5000);
        }]);
})();