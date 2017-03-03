(function() {
	'use strict';

	var registry = angular.module('registry');

	var site = 'http://tacticalbeard39.com';

	registry.constant('REST_API', {
		'X_OC_RESTADMIN_ID': '4562314431343',

		'CATEGORIES': site + '/api/rest_admin/categories'
	})
})();