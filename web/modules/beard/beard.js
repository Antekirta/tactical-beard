(function() {
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

		'enterPopup'
	]);

	beard.config([
		'$stateProvider',

		'$locationProvider',

		'$httpProvider',

		'mainMenuProvider',

		'REST_API',

		'STATES',

		function($stateProvider, $locationProvider, $httpProvider, mainMenuProvider, REST_API, STATES) {
			//delete '#' sign in URL
			$locationProvider.html5Mode(true);

			//create app states
			STATES.forEach(function(state) {
				$stateProvider.state(state);
			});

			console.log('STATES: ', STATES);

			// because of https://stackoverflow.com/questions/33660712/angularjs-post-fails-response-for-preflight-has-invalid-http-status-code-404

            // $httpProvider.defaults.headers.common = {};
            // $httpProvider.defaults.headers.post = {};
            // $httpProvider.defaults.headers.put = {};
            // $httpProvider.defaults.headers.patch = {};

			//configure mainMenu provider
			//mainMenuProvider.mainMenuItemsDestination = REST_API.MAIN_MENU.ITEMS;
		}]);
})();