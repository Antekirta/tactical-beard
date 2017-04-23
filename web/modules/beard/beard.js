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

		'mainMenuProvider',

		'REST_API',

		'STATES',

		function($stateProvider, $locationProvider, mainMenuProvider, REST_API, STATES) {
			//delete '#' sign in URL
			$locationProvider.html5Mode(true);

			//create app states
			STATES.forEach(function(state) {
				$stateProvider.state(state);
			});

			//configure mainMenu provider
			//mainMenuProvider.mainMenuItemsDestination = REST_API.MAIN_MENU.ITEMS;
		}]);
})();