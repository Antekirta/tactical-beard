(function () {
    'use strict';

    angular.module('utils')
        .directive('goToTop', [
            '$rootScope',

            function ($rootScope) {
                const handlers = {
                    goToTop: function () {
                        $('body, html').animate({scrollTop: 0}, 500);
                    }
                };

                $rootScope.$on('$stateChangeSuccess', handlers.goToTop);
            }
        ]);
})();