(function () {
    'use strict';

    angular.module('makeOrderPage').controller('makeOrderPageCtrl', [
        '$scope',

        '$log',

        '$sce',

        'session',

        'countriesFactory',

        'checkoutProvider',

        'basketProvider',

        'regionsProvider',

        'COUNTRIES',

        'PAYMENT_METHODS',

        function ($scope, $log, $sce, session, countriesFactory, checkoutProvider, basketProvider, regionsProvider, COUNTRIES, PAYMENT_METHODS) {
            const $orderCtrl = this;

            $orderCtrl.shippingMethods = [];

            $orderCtrl.paymentMethods = [];
            $orderCtrl.PAYMENT_METHODS = PAYMENT_METHODS;

            $orderCtrl.customer = {
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
                agree: false,
                comment: ''
            };

            $orderCtrl.delivery = {
                shipping_method: ''
            };

            $orderCtrl.payment = {
                payment_method: ''
            };

            $scope.finishButtonIsVisible = false;

            $orderCtrl.sendOrder = function sendOrder(event) {
                event.preventDefault();

                createGuestUser($orderCtrl.customer);
            };

            $orderCtrl.setShippingMethod = function (event, method) {
                event.preventDefault();

                return checkoutProvider
                    .setShippingMethods(params.currentSession, method)
                    .then((response) => {
                        if ( response.data.success ) {
                            $log.log('Shipping method has been set to: ', $orderCtrl.delivery.shipping_method);

                            $orderCtrl.shippingMethodIsSet = true;

                            return checkoutProvider.getPaymentMethods(params.currentSession).then((response) => {
                                fillPaymentMethodsList(response.data.payment_methods);
                            });
                        }

                        $log.log('Shipping method has not been set. Info: ', response);
                    });
            };

            $orderCtrl.setPaymentMethod = function (event, method) {
                event.preventDefault();

                return checkoutProvider
                    .setPaymentMethod(params.currentSession, method, '', $scope.payment.agree)
                    .then((response) => {
                        if ( response.data.success ) {
                            $log.log('Payment method has been succesfully set', method);

                            console.log('$orderCtrl.delivery.payment_method: ', $orderCtrl.delivery.payment_method);

                            return checkoutProvider.confirm(params.currentSession).then((response) => {
                                $orderCtrl.confirmMessage = $sce.trustAsHtml(response.data.payment);

                                $scope.finishButtonIsVisible = true;
                            });
                        }
                    });
            };

            $orderCtrl.finishProcess = function () {
                return checkoutProvider.pay(params.currentSession).then((response) => {
                    $log.log('finishProcess response: ', response);
                });
            };

            const params = {
                currentSession: ''
            };

            setCurrentSession();

            putBasketInOrder();

            fillRegionsList();

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
            }

            function fillPaymentMethodsList(paymentMethods) {
                $orderCtrl.paymentMethods = [];

                for (let method in paymentMethods) {
                    if ( paymentMethods.hasOwnProperty(method) ) {
                        $orderCtrl.paymentMethods.push({
                            name: paymentMethods[method].title,

                            value: paymentMethods[method].code
                        });
                    }
                }
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

                                $orderCtrl.userIsCreated = true;
                            }
                        });
                    })
            }
        }]);
})();