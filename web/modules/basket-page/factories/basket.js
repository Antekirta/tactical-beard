(function () {
    'use strict';
    
    angular.module('basketPage')
        .factory('basketFactory', ['LOCALSTORAGE', function (LOCALSTORAGE) {
            var basket;

            if ( localStorage.getItem(LOCALSTORAGE.BASKET) ) {
                basket = JSON.parse(localStorage.getItem(LOCALSTORAGE.BASKET)) || [];
            } else {
                basket = [];
            }

            console.log('basket after init: ', basket);

            return {
                client: {
                    getAllProducts: function () {
                        return basket;
                    },

                    getProductById: function (id) {
                        var index = _.findIndex(basket, function (product) {
                            return product.id === id;
                        });

                        return basket[index];
                    },

                    putProduct: function (product) {
                        var index = _.findIndex(basket, function (element) {
                            return element.id === product.id;
                        });

                        if ( index !== -1 ) {
                            this.updateQuantity(product.id, product.quantity);
                        } else {
                            basket.push(product);
                        }

                        this.updateBasketStorage();

                        console.log('localStorage.getItem(LOCALSTORAGE.BASKET): ', localStorage.getItem(LOCALSTORAGE.BASKET));
                    },

                    updateQuantity: function (id, quantity) {
                        var index = _.findIndex(basket, function (product) {
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
                        var index = _.findIndex(basket, function (product) {
                            return product.id === id;
                        });

                        basket.splice(index, 1);

                        this.updateBasketStorage();
                    },

                    updateBasketStorage: function () {
                        localStorage.setItem(LOCALSTORAGE.BASKET, JSON.stringify(basket));
                    }
                },

                server: {
                    getAllProducts: function () {
                        return basket;
                    },

                    getProductById: function (id) {
                        var index = _.findIndex(basket, function (product) {
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