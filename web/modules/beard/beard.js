(function () {
    'use strict';

    var beard = angular.module('beard', [
        'ui.router',

        'utils',

        'registry',

        'mainPage',

        'categoriesPage',

        'productsListPage',

        'filters',

        'productPage',

        'makeOrderPage',

        'orderDonePage',

        'basketPage',

        'infoListPage',

        'infoPage',

        'bookmarksPage',

        'personalAccountPage',

        'siteHeader',

        'mainMenu',

        'slider',

        'categoriesList',

        'impulseProducts',

        'pageContent',

        'categoriesSidebar',

        'siteFooter',

        'sidebarMenu',

        'sidebarAdditional',

        'enterPopup',

        'privateOffice',

        'auth'
    ]);

    beard.config([
        '$stateProvider',

        '$locationProvider',

        '$httpProvider',

        'mainMenuProvider',

        'REST_API',

        'STATES',

        function ($stateProvider, $locationProvider, $httpProvider, mainMenuProvider, REST_API, STATES) {
            //delete '#' sign in URL
            $locationProvider.html5Mode(true);

            //create app states
            STATES.forEach(function (state) {
                $stateProvider.state(state);
            });

            // setInterval(basketProvider.synchronizeBaskets, 2000);

            //configure mainMenu provider
            //mainMenuProvider.mainMenuItemsDestination = REST_API.MAIN_MENU.ITEMS;
        }]);

    beard.run([
        '$rootScope',

        'basketProvider',

        'LOCAL_STORAGE',

        function ($rootScope, basketProvider, LOCAL_STORAGE) {
            setInterval(basketProvider.synchronizeBaskets, 10000);

            $rootScope.currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER));
        }]);
})();