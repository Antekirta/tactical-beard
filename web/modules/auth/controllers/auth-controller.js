(function () {
    'use strict';

    angular.module('auth')
        .controller('authController', ['authProvider', function (authProvider) {
            const $authCtrl = this;

            $authCtrl.openModal = openModal;
            $authCtrl.login = login;

            $authCtrl.modalIsOpen = true;

            function openModal(event) {
                event.preventDefault();

                $authCtrl.modalIsOpen = true;
            }

            function login(event) {
                event.preventDefault();

                authProvider.getCustomerByEmail($authCtrl.userEmail)
                    .then(function (response) {
                        console.log('auth controller login response: ', response);
                    }, function (error) {

                    });

                console.log('$authCtrl.userEmail: ', $authCtrl.userEmail);
                console.log('$authCtrl.userPassword: ', $authCtrl.userPassword);
            }
        }]);
})();