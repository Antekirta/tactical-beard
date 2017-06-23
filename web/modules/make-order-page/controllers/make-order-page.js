(function () {
    'use strict';

    var makeOrderPage = angular.module('makeOrderPage');

    makeOrderPage.controller('makeOrderPageCtrl', [
        '$scope',

        'session',

        'checkoutProvider',

        'basketProvider',

        function ($scope, session, checkoutProvider, basketProvider) {
            /**
             * STEPS TO CHECKOUT
             * 0) GET api/rest/session DONE
             * 1) Other step 1: POST api/rest/guest to create guest user
             * 2) Other step 2: POST api/rest/guestshipping to shipping address to guest user
             * 3) GET api/rest/paymentaddress load the payment address of the customer
             * 4) POST    api/rest/paymentaddress    set the payment address
             * 5) GET    api/rest/shippingaddress load the shipping address of the customer.
             * 6) POST    api/rest/shippingaddress set the shipping address
             * 7) GET    api/rest/shippingmethods    get all available shipping methods
             * 8) POST    api/rest/shippingmethods    set the shipping method
             * 9) GET    api/rest/paymentmethods    get all available payment methods
             * 10) POST    api/rest/paymentmethods    set the payment method
             * 11) POST    api/rest/confirm    get an overview of the order
             * 12) GET    api/rest/pay    You only need to call this service, if you want to start payment process in webview
             * 13) PUT    api/rest/confirm    Update order status, empty cart, and clear session data.
             */

            const params = {
                session: ''
            };

            session.getCurrentSession().then(
                function (response) {
                    return params.session = response.data.data.session;
                }
            )
                .then(
                    function () {
                        return basketProvider.getProducts(params.session)
                            .then(
                                function (response) {

                                }
                            );
                    }
                )
                .then(
                    function () {
                        return checkoutProvider.createGuest(params.session)
                            .then(
                                function (response) {

                                }
                            );
                    }
                )
                .then(
                    function () {
                        return checkoutProvider.setGuestShipping(params.session)
                            .then(
                                function (response) {
                                }
                            );
                    }
                )
                .then(
                    function () {
                        return checkoutProvider.getShippingMethods(params.session)
                            .then(
                                function (response) {
                                }
                            );
                    }
                )
                .then(
                    function () {
                        return checkoutProvider.setShippingMethods(params.session)
                            .then(
                                function (response) {
                                }
                            );
                    }
                )
                .then(
                    function () {
                        return checkoutProvider.getPaymentMethods(params.session)
                            .then(
                                function (response) {
                                }
                            );
                    }
                )
                .then(
                    function () {
                        return checkoutProvider.setPaymentMethod(params.session)
                            .then(
                                function (response) {
                                }
                            );
                    }
                )
                .then(
                    function () {
                        return checkoutProvider.confirm(params.session)
                            .then(
                                function (response) {
                                }
                            );
                    }
                )
                .then(
                    function () {
                        return checkoutProvider.pay(params.session)
                            .then(
                                function (response) {
                                }
                            );
                    }
                )
                .then(
                    function () {
                        return checkoutProvider.finish(params.session)
                            .then(
                                function (response) {
                                }
                            );
                    }
                );
        }]);
})();