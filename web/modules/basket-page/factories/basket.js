(function () {
    'use strict';

    angular.module('basketPage')
        .factory('basketFactory', [
            '$rootScope',

            '$log',

            'LOCALSTORAGE',

            'EVENTS',

            'basketProvider',

            function ($rootScope, $log, LOCALSTORAGE, EVENTS, basketProvider) {
                let basket = unitBasket();

                function unitBasket() {
                    if (localStorage.getItem(LOCALSTORAGE.BASKET)) {
                        return JSON.parse(localStorage.getItem(LOCALSTORAGE.BASKET)) || [];
                    }

                    return [];
                }

                function updateBasketStorage() {
                    localStorage.setItem(LOCALSTORAGE.BASKET, JSON.stringify(basket));

                    $rootScope.$broadcast(EVENTS.BASKET_EVENTS, {});
                }

                function updateQuantity(id, quantity) {
                    let index = _.findIndex(basket, function (product) {
                        return product.id === id;
                    });

                    basket[index].quantity += quantity;

                    updateBasketStorage();
                }

                return {
                    get: {
                        allProducts: function () {
                            return basket;
                        },

                        basketLength: function () {
                            return _.toArray(JSON.parse(localStorage.getItem(LOCALSTORAGE.BASKET))).length;
                        },

                        productById: function (id) {
                            let index = _.findIndex(basket, function (product) {
                                return product.id === id;
                            });

                            return basket[index];
                        },
                    },

                    put: {
                        product: function (product, session) {
                            basketProvider.putProduct(product, session)
                                .then(
                                    function () {
                                        putProductOnClient(product);
                                    },

                                    function (error) {
                                        $log.error('Basket factory put product error: ', error);
                                    }
                                );

                            function putProductOnClient(product) {
                                let productAlreadyInBasket = Boolean(_.find(basket, function (element) {
                                    return element.id === product.id;
                                }));

                                if (productAlreadyInBasket) {
                                    updateQuantity(product.id, product.quantity);
                                } else {
                                    basket.push(product);
                                }

                                updateBasketStorage();
                            }
                        }
                    },

                    delete: {
                        allProducts: function () {
                            basket = [];

                            updateBasketStorage();
                        },

                        productById: function (id) {
                            let index = _.findIndex(basket, function (product) {
                                return product.id === id;
                            });

                            basket.splice(index, 1);

                            updateBasketStorage();

                            basketProvider.deleteItem(id);
                        }
                    }
                };
            }]);
})();