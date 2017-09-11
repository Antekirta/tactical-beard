(function () {
    'use strict';

    angular.module('auth')
        .controller('registerCotroller', [
            '$rootScope',
            '$log',
            '$state',
            'COUNTRIES',
            'STATE_NAMES',
            'authProvider',
            'countriesFactory',


            function ($rootScope, $log, $state, COUNTRIES, STATE_NAMES, authProvider, countriesFactory) {
                const $regCtrl = this;

                $regCtrl.register = register;

                fillRegionsList();

                function register() {
                    // const userData = {
                    //     firstName: 'Petya', //done
                    //     lastName: 'Petya', //done
                    //     email: 'Petya@petya.ru', //done
                    //     tel: '+79003498143', //done
                    //     address: 'Nevskogo', //done
                    //     city: 'Kaliningrad', //done
                    //     countryId: '176',
                    //     zoneId: '67',
                    //     password: 'admin' //done
                    // };

                    const userData = {
                        firstName: $regCtrl.firstName,
                        lastName: $regCtrl.lastName,
                        email: $regCtrl.email,
                        tel: $regCtrl.tel,
                        address: $regCtrl.address,
                        city: $regCtrl.city,
                        countryId: '176', // Russia
                        zoneId: '67',
                        password: $regCtrl.password
                    };

                    authProvider.createUser(userData)
                        .then(
                            function () {
                                authProvider.login(userData.email, userData.password);

                                $state.go(STATE_NAMES.HOME);
                            }
                        );
                }

                function fillRegionsList() {
                    countriesFactory.getCountryById(COUNTRIES.RUSSIA.ID)
                        .then(
                            function (regions) {
                                $regCtrl.regions = regions;
                            }
                        );
                }
            }]);
})();