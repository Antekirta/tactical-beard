(function() {
	'use strict';

	var registry = angular.module('registry');

	var site = 'http://tacticalbeard39.com';

	registry.constant('REST_API', {
		'X_OC_RESTADMIN_ID': '4562314431343',

		'BASKET': site + '/api/rest/cart',

		'CATEGORIES': site + '/api/rest_admin/categories',

		'PRODUCTS': site + '/api/rest_admin/products',

		'MANUFACTURERS': site + '/api/rest_admin/manufacturers'
	})
})();