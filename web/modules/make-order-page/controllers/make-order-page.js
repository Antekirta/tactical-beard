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
                                return checkoutProvider.getShippingMethods(params.currentSession);
                            }
                        );
                }
            }
        }]);
})();