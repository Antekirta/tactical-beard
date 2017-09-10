(function () {
    'use strict';

    angular.module('auth')
        .controller('authController', [
            '$rootScope',
            '$log',
            'authProvider',
            'session',
            'LOCAL_STORAGE',

            function ($rootScope, $log, authProvider, session, LOCAL_STORAGE) {
                const $authCtrl = this;

                $authCtrl.openModal = openModal;
                $authCtrl.login = login;
                $authCtrl.logout = logout;

                function openModal(event) {
                    event.preventDefault();

                    $authCtrl.modalIsOpen = true;
                }

                function closeModal() {
                    $authCtrl.modalIsOpen = false;
                }

                function login(event) {
                    event.preventDefault();

                    authProvider.login($authCtrl.userEmail, $authCtrl.userPassword)
                        .then(
                            function (response) {
                                $log.log('auth-controller.js response: ', response);

                                closeModal();
                            }
                        );
                }

                function logout() {
                    authProvider.logout();
                }
            }]);
})();