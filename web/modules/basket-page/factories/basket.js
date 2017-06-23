(function () {
    'use strict';

    angular.module('basketPage')
        .factory('basketFactory', [
            '$rootScope',

            '$log',

            'LOCAL_STORAGE',

            'EVENTS',

            'basketProvider',

            function ($rootScope, $log, LOCAL_STORAGE, EVENTS, basketProvider) {
                let basket = unitBasket();

                function unitBasket() {
                    if (localStorage.getItem(LOCAL_STORAGE.BASKET)) {
                        return JSON.parse(localStorage.getItem(LOCAL_STORAGE.BASKET)) || [];
                    }

                    return [];
                }

                function updateBasketStorage() {
                    localStorage.setItem(LOCAL_STORAGE.BASKET, JSON.stringify(basket));

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
                            return _.toArray(JSON.parse(localStorage.getItem(LOCAL_STORAGE.BASKET))).length;
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