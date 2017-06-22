(function () {
    'use strict';

    angular.module('utils')
        .provider('basketProvider', function () {
            this.$get = [
                '$http',

                '$q',

                'REST_API',

                function ($http, $q, REST_API) {
                    const req = {
                        dataType: 'json',

                        headers: {
                            'X-Oc-Merchant-Id': REST_API.X_OC_MERCHANT_ID
                        }
                    };

                    return {
                        getProducts: function (session) {
                            req.headers['X-Oc-Session'] = session;

                            return $http.get(REST_API.CART, req)
                                .then(
                                    function (response) {
                                        console.log('basketProvider getProducts response: ', response);
                                    }
                                );
                        },

                        putProduct: function (product, session) {
                            req.headers['X-Oc-Session'] = session;

                            console.log('session!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', session);

                            let item = {
                                'product_id': product.id,

                                'quantity': product.quantity
                            };

                            return $http.post(REST_API.CART, item, req)
                                .then(
                                    function (response) {
                                        console.log('basketProvider putProduct response: ', response);
                                    }
                                );

                            console.log('basketProvider addItem product: ', product);
                        }
                    };
                }
            ];
        });
})();