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

            basketFactory.get.allProducts()
                .then(
                    function (products) {
                        $log.log('basket page allProducts: ', products);

                        if ( products.success ) {
                            fillLocalBasketFromServerCart(products.data.products);
                        }
                    },

                    function (error) {
                        $log.log('basket page allProducts error: ', error);
                    }
                );

            function fillLocalBasketFromServerCart(cart) {
                console.log('fillLocalBasketFromServerCart cart: ', cart);
            }

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

                    basketFactory.delete.productById(id);

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
                }
            };

            basket.forEach(function (basketItem) {
                productsProvider.getProductById(basketItem.id).then(function (response) {
                    let item = response.data.data;

                    item.price = productHandlers.getPrice(item.id);

                    item.quantity = productHandlers.getQuantity(item.id);
 
                    $scope.basketProducts.push(item);

                    $scope.helpers.updateTotal();
                }, function (error) {
                    $log.error(error);
                });
            });

            $scope.$watch('basketProducts', $scope.helpers.updateTotal);

            // setTimeout(function () {
            //     $scope.helpers.updateTotal();
            // }, 5000);
        }]);
})();