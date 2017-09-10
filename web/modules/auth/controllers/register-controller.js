(function () {
    'use strict';

    angular.module('auth')
        .controller('registerCotroller', [
            '$rootScope',
            '$log',
            'authProvider',

            function ($rootScope, $log, authProvider) {
                const $regCtrl = this;

                $regCtrl.register = register;

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
                        firstName: $regCtrl.firstName, //done
                        lastName: $regCtrl.lastName, //done
                        email: $regCtrl.email, //done
                        tel: $regCtrl.tel, //done
                        address: $regCtrl.address, //done
                        city: $regCtrl.city, //done
                        countryId: '176',
                        zoneId: '67',
                        password: $regCtrl.password //done
                    };

                    authProvider.createUser(userData)
                        .then(
                            function (response) {
                                $log.log('register-controller response: ', response);
                            }
                        );
                }

                // register();
            }]);
})();