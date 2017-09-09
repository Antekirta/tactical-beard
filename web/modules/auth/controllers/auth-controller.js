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

                    authProvider.getUserByEmail($authCtrl.userEmail)
                        .then(function (response) {
                            const customerData = response.data.data;

                            if ( customerData ) {
                                if ( customerData.account_custom_field.password === $authCtrl.userPassword ) {
                                    customerData.account_custom_field.password = '';

                                    closeModal();

                                    session.getCurrentSession()
                                        .then(
                                            function (session) {
                                                $rootScope.currentUser = {
                                                    isLoggedIn: true,

                                                    session: session,

                                                    info: customerData
                                                };

                                                localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify($rootScope.currentUser));
                                            }
                                        );

                                    $log.log('customerData: ', customerData);
                                } else {
                                    alert('Введен неправильный пароль!');
                                }
                            } else {
                                alert('Пользователя с таким email не существует!');
                            }
                        }, function (error) {
                            $log.error(error);
                        });
                }

                function logout() {
                    $rootScope.currentUser = {
                        isLoggedIn: false,

                        session: null,

                        info: null
                    };

                    localStorage.removeItem(LOCAL_STORAGE.USER)
                }
            }]);
})();