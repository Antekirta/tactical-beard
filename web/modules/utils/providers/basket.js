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

                'REST_API',

                'LOCAL_STORAGE',

                function ($http, $q, REST_API, LOCAL_STORAGE) {
                    const req = {
                        dataType: 'json',

                        headers: {
                            'X-Oc-Merchant-Id': REST_API.X_OC_MERCHANT_ID
                        }
                    };

                    return {
                        getProducts: function (session) {
                            req.headers['X-Oc-Session'] = session;

                            console.log('getProducts session!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', session);

                            return $http.get(REST_API.CART, req)
                                .then(
                                    function (response) {
                                        console.log('basketProvider getProducts response: ', response);
                                    }
                                );
                        },

                        putProduct: function (product, session) {
                            // if ( !localStorage.getItem(LOCAL_STORAGE.SESSION) ) {
                            //     localStorage.setItem(LOCAL_STORAGE.SESSION, session);
                            // }

                            req.headers['X-Oc-Session'] = localStorage.getItem(LOCAL_STORAGE.SESSION);

                            console.log('putProduct session!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', localStorage.getItem(LOCAL_STORAGE.SESSION));

                            let item = {
                                'product_id': product.id,

                                'quantity': product.quantity
                            };

                            return $http.post(REST_API.CART, item, req)
                                .then(
                                    function (response) {
                                        console.log('basketProvider putProduct response: ', response);
                                        return response;
                                    }
                                );
                        },

                        deleteItem: function (id) {
                            req.headers['X-Oc-Session'] = localStorage.getItem(LOCAL_STORAGE.SESSION);

                            let item = {
                                'product_id': id
                            };

                            return $http.delete(REST_API.CART, item, req)
                                .then(
                                    function (response) {
                                        console.log('basketProvider deleteItem response: ', response);
                                    }
                                );
                        },
                        
                        emptyCart: function () {
                            
                        }
                    };
                }
            ];
        });
})();