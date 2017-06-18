(function () {
    'use strict';

    angular.module('utils')
        .directive('goToTop', [
            '$rootScope',

            function ($rootScope) {
                return {
                    link: function () {
                        const handlers = {
                            goToTop: function () {
                                $('body, html').animate({scrollTop: 200}, 500);
                            }
                        };

                        $rootScope.$on('$stateChangeSuccess', handlers.goToTop);
                    }
                }
            }
        ]);
})();