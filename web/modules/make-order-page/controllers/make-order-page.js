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

                createGuestUser($orderCtrl.order);

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

            fillRegionsList();

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

            function fillRegionsList() {
                countriesFactory.getCountryById(COUNTRIES.RUSSIA.ID)
                    .then(
                        function (countries) {
                            $orderCtrl.regions = countries;
                        }
                    );
            }

            // send order inner

            function createGuestUser(customer) {
                const customerInfo = {
                    'firstname': customer.firstname,
                    'lastname': customer.lastname,
                    'email': customer.email,
                    'telephone': customer.telephone,
                    'fax': customer.fax,
                    'company': customer.company,
                    'city': customer.city || 'Not specified',
                    'address_1': customer.address_1 || 'Not specified',
                    'address_2': '',
                    'country_id': COUNTRIES.RUSSIA.ID,
                    'postcode': '',
                    'zone_id': customer.zone_id
                };

                console.log('customerInfo: ', customerInfo);

                checkoutProvider.createGuest(params.currentSession, customerInfo)
                    .then(() => {
                        return checkoutProvider.setGuestShipping(params.currentSession, customerInfo);
                    })
            }
        }]);
})();