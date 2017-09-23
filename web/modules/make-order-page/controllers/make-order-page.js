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
                product_id: '',
                quantity: 0,
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

                putBasketInOrder();

                createGuestUser();

                setShippingAdress();

                setShippingMethod();

                setPaymentMethod();

                confirmOrder();

                sendLetterToCustomer();
            };

            const params = {
                currentSession: ''
            };

            setCurrentSession();

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
        }]);
})();