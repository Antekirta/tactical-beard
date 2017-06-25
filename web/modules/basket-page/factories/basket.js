(function () {
    'use strict';

    angular.module('basketPage')
        .factory('basketFactory', [
            '$rootScope',

            '$log',

            'LOCAL_STORAGE',

            'EVENTS',

            'basketProvider',

            'session',

            function ($rootScope, $log, LOCAL_STORAGE, EVENTS, basketProvider, session) {
                let basket = JSON.parse(localStorage.getItem(LOCAL_STORAGE.BASKET)) || [];

                // helpers

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
                            return session.getCurrentSession()
                                .then(
                                    function (session) {
                                        return session;
                                    }
                                )
                                .then(
                                    function (session) {
                                        return basketProvider.getProducts(session)
                                            .then(
                                                function (response) {
                                                    $log.info('Basket factory get allProducts response: ', response);

                                                    return response.success;
                                                }
                                            );
                                    }
                                );
                        },

                        basketLength: function () {
                            return;
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

                                if ( productAlreadyInBasket ) {
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
                            return basketProvider.emptyCart()
                                .then(
                                    function (response) {
                                        console.log('basket factory delete allProducts response: ', response);

                                        if ( response.success ) {
                                            basket = [];

                                            updateBasketStorage();
                                        }

                                        return response;
                                    }
                                );
                        },

                        productById: function (id) {
                            basketProvider.deleteItem(id)
                                .then(
                                    function () {
                                        deleteProductOnClient(id);
                                    },

                                    function (error) {
                                        $log.error('Product has NOT been deleted from basket because of: ', error);
                                    }
                                );

                            function deleteProductOnClient(id) {
                                let indexOfProductInBasket = _.findIndex(basket, function (product) {
                                    return product.id === id;
                                });

                                basket.splice(indexOfProductInBasket, 1);

                                updateBasketStorage();
                            }
                        }
                    }
                };
            }]);
})();