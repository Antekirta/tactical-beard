(function() {
	'use strict';

	var registry = angular.module('registry');

	var pathToPartial = function(moduleName){
		return 'modules/' + moduleName + '/partials/' + moduleName + '.html';
	};

	var pathToController = function(moduleName) {
		return 'modules/' + moduleName + '/controllers/' + moduleName + '.html';
	};

	registry.constant('STATE_NAMES', {
		'HOME': 'home',
		'CATEGORIES': 'categories',
		'PRODUCTS_LIST': 'products-list',
		'CATEGORY': 'category',
		'PRODUCTS_LIST__PRODUCT': 'products-list.product',
		'MAKE_ORDER': 'make-order',
		'ORDER_DONE': 'order-done',
		'BASKET': 'basket',
		'INFO_LIST_PAGE': 'info-list-page',
		'INFO_PAGE': 'info-page',
		'BOOKMARKS_PAGE': 'bookmarks-page',
		'PERSONAL_ACCOUNT_PAGE': 'personal-account-page'
	});

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
			url: '/categories/{categoryName}/',
			params: {
                categoryId: null,

				categoryName: null
			},
			templateUrl: pathToPartial('products-list-page')
		},

		{
			name: 'category.product',
            url: '/{productName}/',
			controller: 'productPageCtrl',
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