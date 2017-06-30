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
            // $scope.regions = regionsProvider.getRegions();
            $scope.cities = regionsProvider.getCitiesInRegion();

            countriesFactory.getCountryById(COUNTRIES.RUSSIA.ID)
                .then(
                    function (countries) {
                        console.log('countries: ', countries);

                        $scope.regions = countries;
                    }
                );

            const params = {
                currentSession: ''
            };

            session.getCurrentSession().then(
                function (session) {
                    return params.currentSession = session;
                }
            );

            const checkers = {
                userInfoIsFilled: function () {
                    let customerIsFullfilled =
                        $scope.customerForm.customer &&
                        $scope.customerForm.customer.name &&
                        $scope.customerForm.customer.email &&
                        $scope.customerForm.customer.tel &&
                        $scope.customerForm.customer.address &&
                        $scope.customerForm.customer.address.region &&
                        $scope.customerForm.customer.address.city &&
                        $scope.customerForm.customer.address.street;

                    console.log('userInfoIsFilled works!');

                    if ( customerIsFullfilled ) {
                        createGuestUser($scope.customerForm.customer);
                    }
                }
            };

            $scope.$watch('customerForm.customer.name', checkers.userInfoIsFilled);
            $scope.$watch('customerForm.customer.email', checkers.userInfoIsFilled);
            $scope.$watch('customerForm.customer.tel', checkers.userInfoIsFilled);
            $scope.$watch('customerForm.customer.address', createAddressWatcher);

            function createAddressWatcher() {
                if ( $scope.customerForm.customer ) {
                    $scope.$watch('customerForm.customer.address.region', checkers.userInfoIsFilled);
                    $scope.$watch('customerForm.customer.address.city', checkers.userInfoIsFilled);
                    $scope.$watch('customerForm.customer.address.street', checkers.userInfoIsFilled);
                }
            }

            function createGuestUser(customer) {
                const zoneId = _.find($scope.regions, function (region) {
                    console.log('createGuestUser region: ', region);

                    return region.name === customer.address.region;
                })['zone_id'];

                console.log('createGuestUser zoneId: ', zoneId);

                const customerInfo = {
                    'firstname': customer.name,
                    'lastname': customer.name,
                    'email': customer.email,
                    'telephone': customer.tel,
                    'fax': customer.tel,
                    'company': '',
                    'city': customer.address.city,
                    'address_1': customer.address.street,
                    'address_2': '',
                    'country_id': COUNTRIES.RUSSIA.ID,
                    'postcode': '',
                    'zone_id': zoneId
                };

                console.log('$scope.makeorder: ', $scope.customerForm);

                if ( $scope.customerForm.$valid ) {
                    checkoutProvider.createGuest(params.currentSession, customerInfo);
                }
            }
        }]);
})();