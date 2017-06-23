(function () {
    'use strict';

    angular.module('basketPage')
        .factory('basketFactory', [
            '$rootScope',

            'LOCALSTORAGE',

            'EVENTS',

            'basketProvider',

            function ($rootScope, LOCALSTORAGE, EVENTS, basketProvider) {
                let basket;

                if (localStorage.getItem(LOCALSTORAGE.BASKET)) {
                    basket = JSON.parse(localStorage.getItem(LOCALSTORAGE.BASKET)) || [];
                } else {
                    basket = [];
                }

                return {
                    client: {
                        getAllProducts: function () {
                            return basket;
                        },

                        getProductById: function (id) {
                            let index = _.findIndex(basket, function (product) {
                                return product.id === id;
                            });

                            return basket[index];
                        },

                        getBasketLength: function () {
                            return _.toArray(JSON.parse(localStorage.getItem(LOCALSTORAGE.BASKET))).length;
                        },

                        putProduct: function (product, session) {
                            let index = _.findIndex(basket, function (element) {
                                return element.id === product.id;
                            });

                            if (index !== -1) {
                                this.updateQuantity(product.id, product.quantity);
                            } else {
                                basket.push(product);
                            }

                            basketProvider.putProduct(product, session);

                            this.updateBasketStorage();
                        },

                        updateQuantity: function (id, quantity) {
                            let index = _.findIndex(basket, function (product) {
                                return product.id === id;
                            });

                            basket[index].quantity += quantity;

                            this.updateBasketStorage();
                        },

                        deleteAllProducts: function () {
                            basket = [];

                            this.updateBasketStorage();
                        },

                        deleteProductById: function (id) {
                            let index = _.findIndex(basket, function (product) {
                                return product.id === id;
                            });

                            basket.splice(index, 1);

                            this.updateBasketStorage();

                            basketProvider.deleteItem(id);
                        },

                        updateBasketStorage: function () {
                            localStorage.setItem(LOCALSTORAGE.BASKET, JSON.stringify(basket));

                            $rootScope.$broadcast(EVENTS.BASKET_EVENTS, {});
                        }
                    },

                    server: {
                        getAllProducts: function () {
                            return basket;
                        },

                        getProductById: function (id) {
                            let index = _.findIndex(basket, function (product) {
                                return product.id === id;
                            });

                            return basket[index];
                        },

                        putProduct: function (product) {
                            basket.push(product);
                        }
                    }
                };
            }]);
})();