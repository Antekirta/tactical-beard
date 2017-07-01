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
            const params = {
                currentSession: ''
            };

            $scope.shippingMethods = [];
            $scope.paymentMethods = [];
            $scope.orderConfirmed = false;

            $scope.setShippingMethod = setShippingMethod;
            $scope.setPaymentMethod = setPaymentMethod;

            fillRegionsList();

            setCurrentSession();

            $scope.$watch('customerForm.customer.name', userInfoIsFilled);
            $scope.$watch('customerForm.customer.email', userInfoIsFilled);
            $scope.$watch('customerForm.customer.tel', userInfoIsFilled);
            $scope.$watch('customerForm.customer.address', createAddressWatcher);

            function setCurrentSession() {
                session.getCurrentSession().then(
                    function (session) {
                        params.currentSession = session;
                    }
                );
            }

            function fillRegionsList() {
                countriesFactory.getCountryById(COUNTRIES.RUSSIA.ID)
                    .then(
                        function (countries) {
                            $scope.regions = countries;
                        }
                    );
            }

            function fillShippingTypesList(shippingMethods) {
                for (let method in shippingMethods) {
                    if ( shippingMethods.hasOwnProperty(method) ) {
                        $scope.shippingMethods.push({
                            name: shippingMethods[method].title,

                            value: shippingMethods[method].quote[method] && shippingMethods[method].quote[method].code
                        });
                    }
                }
            }
            
            function fillPaymentMethodsList(paymentMethods) {
                console.log('fillPaymentMethodsList paymentMethods: ', paymentMethods);

                for (let method in paymentMethods) {
                    if ( paymentMethods.hasOwnProperty(method) ) {
                        $scope.paymentMethods.push({
                            name: paymentMethods[method].title,

                            value: paymentMethods[method].code
                        });
                    }
                }
            }

            function createAddressWatcher() {
                if ( $scope.customerForm.customer ) {
                    $scope.$watch('customerForm.customer.address.region', userInfoIsFilled);
                    $scope.$watch('customerForm.customer.address.city', userInfoIsFilled);
                    $scope.$watch('customerForm.customer.address.street', userInfoIsFilled);
                }
            }

            function userInfoIsFilled() {
                let customerIsFullfilled =
                    $scope.customerForm.customer &&
                    $scope.customerForm.customer.name &&
                    $scope.customerForm.customer.email &&
                    $scope.customerForm.customer.tel &&
                    $scope.customerForm.customer.address &&
                    $scope.customerForm.customer.address.region;

                if ( customerIsFullfilled ) {
                    createGuestUser($scope.customerForm.customer);
                }
            }

            function createGuestUser(customer) {
                const zoneId = _.find($scope.regions, function (region) {
                    return region.name === customer.address.region;
                })['zone_id'];

                const customerInfo = {
                    'firstname': customer.name,
                    'lastname': customer.name,
                    'email': customer.email,
                    'telephone': customer.tel,
                    'fax': customer.tel,
                    'company': '',
                    'city': customer.address.city || 'Not specified',
                    'address_1': customer.address.street || 'Not specified',
                    'address_2': '',
                    'country_id': COUNTRIES.RUSSIA.ID,
                    'postcode': '',
                    'zone_id': zoneId
                };

                if ( $scope.customerForm.$valid ) {
                    checkoutProvider.createGuest(params.currentSession, customerInfo)
                        .then(
                            function () {
                                return checkoutProvider.setGuestShipping(params.currentSession, customerInfo);
                            }
                        )
                        .then(
                            function () {
                                return checkoutProvider.getShippingMethods(params.currentSession)
                                    .then(
                                        function (response) {
                                            if ( response.success ) {
                                                if ( _.isEmpty($scope.shippingMethods) ) {
                                                    fillShippingTypesList(response.data['shipping_methods']);
                                                }
                                            }
                                        }
                                    );
                            }
                        );
                }
            }
            
            function setShippingMethod(method) {
                checkoutProvider.setShippingMethods(params.currentSession, method.value, method.name)
                    .then(
                        function (response) {
                            if ( response.data.success ) {
                                $log.log('Shipping method has been successfully set!');
                            }
                        }
                    )
                    .then(
                        function () {
                            checkoutProvider.getPaymentMethods(params.currentSession)
                                .then(
                                    function (paymentMethods) {
                                        fillPaymentMethodsList(paymentMethods.data['payment_methods']);
                                    }
                                );
                        }
                    );
            }
            
            function setPaymentMethod(method) {
                checkoutProvider.setPaymentMethod(params.currentSession, method.value, method.name, true)
                    .then(
                        function (response) {
                            if ( response.data.success ) {
                                $log.log('Payment method has been successfully set!');
                            }
                        }
                    )
                    .then(
                        function () {
                            checkoutProvider.confirm(params.currentSession)
                                .then(
                                    function (response) {
                                        $scope.orderConfirmed = response.success;

                                        $scope.totalOrderInfo = response.data.payment;
                                    }
                                );
                        }
                    );
            }
        }]);
})();