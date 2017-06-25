(function () {
    'use strict';

    /**
     * SERVER SIDE BASKET PROVIDER
     */

    angular.module('utils')
        .provider('basketProvider', function () {
            this.$get = [
                '$http',

                '$q',

                '$log',

                'session',

                'REST_API',

                'LOCAL_STORAGE',

                'PRODUCT_DICTIONARY',

                function ($http, $q, $log, session, REST_API, LOCAL_STORAGE, PRODUCT_DICTIONARY) {
                    const req = {
                        dataType: 'json',

                        headers: {
                            'X-Oc-Merchant-Id': REST_API.X_OC_MERCHANT_ID,

                            'X-Oc-Restadmin-Id': REST_API.X_OC_RESTADMIN_ID
                        }
                    };

                    return {
                        getProducts: function () {
                            return session.getCurrentSession()
                                .then(
                                    function (session) {
                                        return session;
                                    }
                                )
                                .then(
                                    function (session) {
                                        req.headers['X-Oc-Session'] = session;

                                        return $http.get(REST_API.CART, req)
                                            .then(
                                                function (response) {
                                                    return response.data;
                                                }
                                            );
                                    }
                                );
                        },

                        putProduct: function (product) {
                            return session.getCurrentSession()
                                .then(
                                    function (session) {
                                        return session;
                                    }
                                )
                                .then(
                                    function (session) {
                                        req.headers['X-Oc-Session'] = session;

                                        let item = {};

                                        item[PRODUCT_DICTIONARY.PRODUCT_ID] = product.id;
                                        item[PRODUCT_DICTIONARY.QUANTITY] = product.quantity;

                                        return $http.post(REST_API.CART, item, req)
                                            .then(
                                                function (response) {
                                                    $log.log('Product has been successfully added to basket: ', response);
                                                },

                                                function (error) {
                                                    $log.error('Product has NOT been added to basket because of: ', error);
                                                }
                                            );
                                    }
                                );
                        },

                        deleteItem: function (key) {
                            return session.getCurrentSession()
                                .then(
                                    function (session) {
                                        return session;
                                    }
                                )
                                .then(
                                    function (session) {
                                        req.headers['X-Oc-Session'] = session;

                                        req.data = {
                                            key: key
                                        };

                                        return $http.delete(REST_API.CART, req)
                                            .then(
                                                function (response) {
                                                    $log.log('Basket provider deleteItem response: ', response);
                                                },

                                                function (error) {
                                                    $log.error('Basket provider deleteItem error: ', error);
                                                }
                                            );
                                    }
                                );
                        },

                        emptyCart: function () {
                            return session.getCurrentSession()
                                .then(
                                    function (session) {
                                        return session;
                                    }
                                )
                                .then(
                                    function (session) {
                                        req.headers['X-Oc-Session'] = session;

                                        return $http.delete(REST_API.EMPTY_CART, req)
                                            .then(
                                                function (response) {
                                                    $log.log('BasketProvider emptyCart has worked successfully!: ', response);

                                                    return response.data;
                                                }
                                            );
                                    }
                                );
                        }
                    };
                }
            ];
        });
})();