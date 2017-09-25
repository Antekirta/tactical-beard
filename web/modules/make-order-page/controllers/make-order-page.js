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

            $orderCtrl.shippingMethods = [];
            $orderCtrl.paymentMethods = [];

            $orderCtrl.customer = {
                basket: [],
                firstname: 'stub',
                lastname: 'stub',
                email: 'stub@stub.com',
                telephone: '7777777777',
                company: 'stub',
                city: 'stub',
                address_1: '',
                country_id: 176,
                postcode: '4324',
                zone_id: '67',
                agree: '',
                comment: ''
            };

            $orderCtrl.delivery = {
                shipping_method: ''
            };

            $orderCtrl.delivery = {
                payment_method: ''
            };

            $orderCtrl.sendOrder = function sendOrder(event) {
                event.preventDefault();

                createGuestUser($orderCtrl.customer);

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

            $orderCtrl.setShippingMethod = function (event, method) {
                event.preventDefault();

                console.log('method: ', method);

                return checkoutProvider
                    .setShippingMethods(params.currentSession, method)
                    .then((response) => {
                        console.log('setShippingMethod response: ', response);
                    });
            };

            const params = {
                currentSession: ''
            };

            setCurrentSession();

            putBasketInOrder();

            fillRegionsList();

            // getShippingMethods();

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
                            $orderCtrl.customer.basket = response.data.products
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

            function fillShippingTypesList(shippingMethods) {
                for (let method in shippingMethods) {
                    if ( shippingMethods.hasOwnProperty(method) ) {
                        $orderCtrl.shippingMethods.push({
                            name: shippingMethods[method].title,

                            value: shippingMethods[method].quote[method] && shippingMethods[method].quote[method].code
                        });
                    }
                }

                console.log('$orderCtrl.shippingMethods: ', $orderCtrl.shippingMethods);
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

                checkoutProvider.createGuest(params.currentSession, customerInfo)
                    .then(() => {
                        return checkoutProvider.getShippingMethods(params.currentSession).then((response) => {
                            if ( response.success ) {
                                fillShippingTypesList(response.data.shipping_methods);
                            }
                        });
                    })
            }
        }]);
})();