(function () {
    'use strict';

    angular.module('makeOrderPage').controller('makeOrderPageCtrl', [
        '$scope',

        '$log',

        'session',

        'countriesFactory',

        'checkoutProvider',

        'basketProvider',

        'regionsProvider',

        'COUNTRIES',

        function ($scope, $log, session, countriesFactory, checkoutProvider, basketProvider, regionsProvider, COUNTRIES) {
            const $orderCtrl = this;

            $orderCtrl.order = {
                basket: [],
                firstname: '',
                lastname: '',
                email: '',
                telephone: '',
                company: '',
                city: '',
                address_1: '',
                country_id: '',
                postcode: '',
                zone_id: '',
                shipping_method: '',
                payment_method: '',
                agree: '',
                comment: ''
            };

            $orderCtrl.sendOrder = function sendOrder(event) {
                event.preventDefault();
                
                // createGuestUser();
                //
                // setShippingAdress();
                //
                // setShippingMethod();
                //
                // setPaymentMethod();
                //
                // confirmOrder();
                //
                // sendLetterToCustomer();
            };

            const params = {
                currentSession: ''
            };

            setCurrentSession();

            putBasketInOrder();

            /**
             * firstname
             * lastname
             * email
             * telephone
             * company // ?
             * city
             * address_1
             * country_id
             * postcode
             * zone_id
             * shipping_method
             * payment_method
             * agree
             * comment // ?
             */

            function setCurrentSession() {
                session.getCurrentSession().then(
                    function (session) {
                        params.currentSession = session;
                    }
                );
            }

            // send order inner

            function putBasketInOrder() {
                basketProvider.getProducts().then(
                    (response) => {
                        if ( !response.success ) {
                            $log.error('putBasketInOrder got an error! maybe the basket is empty.');
                        } else {
                            $orderCtrl.order.basket = response.data.products
                                .map((product) => {
                                    return {
                                        product_id: product.product_id,
                                        quantity: product.quantity,
                                    };
                                });
                        }
                    }
                );
            }
        }]);
})();