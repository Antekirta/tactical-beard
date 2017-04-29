(function() {
	'use strict';

	var registry = angular.module('registry');

	var pathToPartial = function(moduleName){
		return 'modules/' + moduleName + '/partials/' + moduleName + '.html'
	};

	var pathToController = function(moduleName) {
		return 'modules/' + moduleName + '/controllers/' + moduleName + '.html'
	};

	registry.constant('STATES', [
		{
			name: 'home',
			url: '/',
			templateUrl: pathToPartial('main-page')
		},

		{
			name: 'categories',
			url: '/categories/',
			controller: 'categoriesPageCtrl',
			templateUrl: pathToPartial('categories-page')
		},

        {
            name: 'products-list',
            url: '/categories/all/',
            templateUrl: pathToPartial('products-list-page')
        },

		{
			name: 'category',
			url: '/products-list/{categoryName}/',
			params: {
                categoryName: null
			},
			templateUrl: pathToPartial('products-list-page')
		},

		{
			name: 'products-list.product',
            url: '{productName}',
			templateUrl: pathToPartial('product-page')
		},

		{
			name: 'make-order',
			url: '/make-order/',
			templateUrl: pathToPartial('make-order-page')
		},

		{
			name: 'order-done',
			url: '/order-done/',
			templateUrl: pathToPartial('order-done-page')
		},

		{
			name: 'basket',
			url: '/basket/',
			templateUrl: pathToPartial('basket-page')
		},

		{
			name: 'info-list-page',
			url: '/info/:infoType/', //news or articles or something else
			templateUrl: pathToPartial('info-list-page')
		},

		{
			name: 'info-page',
			url: '/info/:infoType/:pageName/',
			templateUrl: pathToPartial('info-page')
		},

		{
			name: 'bookmarks-page',
			url: '/bookmarks/',
			templateUrl: pathToPartial('bookmarks-page')
		},

		{
			name: 'personal-account-page',
			url: '/account/',
			templateUrl: pathToPartial('personal-account-page')
		}
	]);
})();