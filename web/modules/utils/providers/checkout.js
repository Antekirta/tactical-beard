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
                        createGuest: function (session, guest) {
                            req.method = 'POST';
                            req.headers['X-Oc-Session'] = session;

                            return $http.post(REST_API.GUEST, guest, req)
                                .then(
                                    function (response) {
                                        console.log('createGuest response: ', response);

                                        return response;
                                    }
                                );
                        },

                        setGuestShipping: function (session, guest) {
                            req.headers['X-Oc-Session'] = session;

                            return $http.post(REST_API.GUEST_SHIPPING, guest, req)
                                .then(
                                    function (response) {
                                        console.log('setGuestShipping response: ', response);

                                        return response;
                                    }
                                );
                        },

                        getShippingMethods: function (session) {
                            req.headers['X-Oc-Session'] = session;

                            return $http.get(REST_API.GET_SHIPPING_METHODS, req)
                                .then(
                                    function (response) {
                                        console.log('getShippingMethods response: ', response);

                                        return response.data;
                                    }
                                );
                        },

                        setShippingMethods: function (session, method, comment) {
                            req.headers['X-Oc-Session'] = session;

                            const data = {
                                comment: comment,
                                shipping_method: method
                            };

                            return $http.post(REST_API.SET_SHIPPING_METHOD, data, req)
                                .then(
                                    function (response) {
                                        return response;
                                    }
                                );
                        },

                        getPaymentMethods: function (session) {
                            req.headers['X-Oc-Session'] = session;

                            return $http.get(REST_API.GET_PAYMENT_METHODS, req)
                                .then(
                                    function (response) {
                                        console.log('getPaymentMethods response: ', response);

                                        return response.data;
                                    }
                                );
                        },

                        setPaymentMethod: function (session, method, comment, agree) {
                            req.headers['X-Oc-Session'] = session;

                            const data = {
                                'payment_method': method,
                                'comment': comment,
                                'agree': agree
                            };

                            return $http.post(REST_API.SET_PAYMENT_METHOD, data, req)
                                .then(
                                    function (response) {
                                        console.log('setPaymentMethod response: ', response);

                                        return response;
                                    }
                                );
                        },

                        confirm: function (session) {
                            req.headers['X-Oc-Session'] = session;

                            return $http.post(REST_API.CONFIRM_ORDER, {}, req)
                                .then(
                                    function (response) {
                                        console.log('confirm response: ', response);

                                        return response.data;
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