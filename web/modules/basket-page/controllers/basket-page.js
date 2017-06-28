(function () {
    'use strict';

    angular.module('basketPage').controller('basketPageCtrl', [
        '$scope',
        '$log',
        'LOCAL_STORAGE',
        'productsProvider',
        'basketFactory',

        function ($scope, $log, LOCAL_STORAGE, productsProvider, basketFactory) {
            let basket = JSON.parse(localStorage.getItem(LOCAL_STORAGE.BASKET)) || [];

            // contains pairs id: key, where id is product_id and key is key of product in cart
            let serverBasketKeys = {};

            basketFactory.get.allProducts()
                .then(
                    function (response) {
                        $log.log('basket page allProducts: ', response);

                        if ( response.success ) {
                            fillProductsKeysObject(response.data.products);

                            fillBasketProducts(response.data.products);
                        }
                    },

                    function (error) {
                        $log.log('basket page allProducts error: ', error);
                    }
                );

            // Be careful when rename it - there is watcher on this value!
            $scope.basketProducts = [];

            $scope.total = 0;

            const productHandlers = {
                getPrice: function getPrice(id) {
                    let price = basket[_.findIndex(basket, function (item) {
                        return item.id === id;
                    })].price;

                    return Math.floor(+price);
                },

                getQuantity: function getQuantity(id) {
                    let quantity = basket[_.findIndex(basket, function (item) {
                        return item.id === id;
                    })].quantity;

                    return Math.floor(+quantity);
                }
            };

            $scope.helpers = {
                emptyCart: function () {
                    basketFactory.delete.allProducts()
                        .then(
                            function (daleted) {
                                console.log('basket page emptyCart daleted', daleted);

                                $scope.basketProducts = [];

                                $scope.helpers.updateTotal();
                            }
                        );
                },

                deleteItem: function deleteItem(id) {
                    let index = _.findIndex($scope.basketProducts, function (product) {
                        return product.id === id;
                    });

                    $scope.basketProducts.splice(index, 1);

                    basketFactory.delete.productById(id, serverBasketKeys);

                    $scope.helpers.updateTotal();
                },

                updateTotal: function updateTotal() {
                    if (!_.isEmpty($scope.basketProducts)) {
                        $scope.total = $scope.basketProducts.reduce(function (total, currentItem) {
                            return total + currentItem.price * currentItem.quantity;
                        }, 0);
                    } else {
                        $scope.total = 0;
                    }
                },

                /**
                 * Finally collect all basket data and go to make-order page
                 */

                makeOrder: function () {
                    basketFactory.put.bunchOfProducts($scope.basketProducts);
                    console.log('$scope.basketProducts: ', $scope.basketProducts);
                }
            };

            $scope.$watch('basketProducts', $scope.helpers.updateTotal);

            function fillProductsKeysObject(cart) {
                cart.forEach(function (product) {
                    serverBasketKeys[String(product.product_id)] = product.key;
                });
            }

            function fillBasketProducts(cart) {
                cart.forEach(function (product) {
                    let item = {
                        id: product.product_id,

                        name: product.name,

                        price: parseInt(product.price),

                        quantity: +product.quantity,

                        image: product.thumb
                    };

                    $scope.basketProducts.push(item);

                    $scope.helpers.updateTotal();
                });
            }
        }]);
})();