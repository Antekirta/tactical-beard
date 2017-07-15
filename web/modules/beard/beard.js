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

        'privateOffice'
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
        'basketProvider',

        function (basketProvider) {
            console.log('RUN!');

            setInterval(basketProvider.synchronizeBaskets, 10000);
        }]);
})();