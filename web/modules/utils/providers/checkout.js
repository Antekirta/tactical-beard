(function () {
    'use strict';

    angular.module('utils')
        .provider('checkoutProvider', function () {
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
                        createGuest: function (session) {
                            req.method = 'POST';
                            // req.url = REST_API.GUEST;
                            req.headers['X-Oc-Session'] = session;

                            const data = {
                                "firstname": "Demo1",
                                "lastname": "User",
                                "email": "nash1@vipmail.hur",
                                "telephone": "1-541-754-3010",
                                "fax": "1-541-754-3010",
                                "company": "string",
                                "city": "Berlin",
                                "address_1": "Demo",
                                "address_2": "Demo",
                                "country_id": "81",
                                "postcode": "3333",
                                "zone_id": "1256"
                            };

                            return $http.post(REST_API.GUEST, JSON.stringify(data), req)
                                .then(
                                    function (response) {
                                        console.log('createGuest response: ', response);
                                    }
                                );
                        },

                        setGuestShipping: function (session) {
                            req.method = 'POST';
                            req.url = REST_API.GUEST_SHIPPING;
                            req.headers['X-Oc-Session'] = session;

                            const data = {
                                "firstname": "Demo",
                                "lastname": "User",
                                "city": "Berlin",
                                "address_1": "Demo",
                                "address_2": "Demo",
                                "country_id": "81",
                                "postcode": "3333",
                                "zone_id": "1256"
                            };

                            return $http(req, JSON.stringify(data))
                                .then(
                                    function (response) {
                                        console.log('setGuestShipping response: ', response);
                                    }
                                );
                        },

                        getShippingMethods: function (session) {
                            req.method = 'GET';
                            req.url = REST_API.GET_SHIPPING_METHODS;
                            req.headers['X-Oc-Session'] = session;

                            return $http(req)
                                .then(
                                    function (response) {
                                        console.log('getShippingMethods response: ', response);
                                    }
                                );
                        },

                        setShippingMethods: function (session) {
                            req.method = 'POST';
                            req.url = REST_API.SET_SHIPPING_METHOD;
                            req.headers['X-Oc-Session'] = session;

                            const data = {

                            };

                            return $http(req, JSON.stringify(data))
                                .then(
                                    function (response) {
                                        console.log('setShippingMethods response: ', response);
                                    }
                                );
                        },

                        getPaymentMethods: function (session) {
                            req.method = 'GET';
                            req.url = REST_API.GET_PAYMENT_METHODS;
                            req.headers['X-Oc-Session'] = session;

                            return $http(req)
                                .then(
                                    function (response) {
                                        console.log('getPaymentMethods response: ', response);
                                    }
                                );
                        },

                        setPaymentMethod: function (session) {
                            req.method = 'POST';
                            req.url = REST_API.SET_PAYMENT_METHOD;
                            req.headers['X-Oc-Session'] = session;

                            const data = {

                            };

                            return $http(req, JSON.stringify(data))
                                .then(
                                    function (response) {
                                        console.log('setPaymentMethod response: ', response);
                                    }
                                );
                        },

                        confirm: function (session) {
                            req.method = 'POST';
                            req.url = REST_API.CONFIRM_ORDER;
                            req.headers['X-Oc-Session'] = session;

                            const data = {

                            };

                            return $http(req, JSON.stringify(data))
                                .then(
                                    function (response) {
                                        console.log('confirm response: ', response);
                                    }
                                );
                        },

                        pay: function (session) {
                            req.method = 'GET';
                            req.url = REST_API.PAY_ORDER;
                            req.headers['X-Oc-Session'] = session;

                            return $http(req)
                                .then(
                                    function (response) {
                                        console.log('pay response: ', response);
                                    }
                                );
                        },

                        finish: function (session) {
                            req.method = 'PUT';
                            req.url = REST_API.CONFIRM_ORDER;
                            req.headers['X-Oc-Session'] = session;

                            return $http(req)
                                .then(
                                    function (response) {
                                        console.log('finish response: ', response);
                                    }
                                );
                        }
                    };
                }];
        });
})();