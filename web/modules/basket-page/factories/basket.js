(function () {
    'use strict';
    
    angular.module('basketPage')
        .factory('basketFactory', [function () {
            var basket = [];

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
                    },

                    updateQuantity: function (id, quantity) {
                        var index = _.findIndex(basket, function (product) {
                            return product.id === id;
                        });

                        basket[index].quantity += quantity;
                    },

                    deleteAllProducts: function () {
                        basket = [];
                    },

                    deleteProductById: function (id) {
                        var index = _.findIndex(basket, function (product) {
                            return product.id === id;
                        });

                        basket.splice(index, 1);
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