(function() {
	'use strict';

	var utils = angular.module('utils');

	utils.provider('categoriesProvider', function() {
		this.$get = [
			'$http',

			'$q',

			'REST_API',

			function($http, $q, REST_API) {
				var req = {
					method: 'GET',

					url: REST_API.CATEGORIES,

					dataType: 'jsonp',

					headers: {
						'X-Oc-Restadmin-Id': REST_API.X_OC_RESTADMIN_ID
					}
				};

				return {
					getCategories: function() {
						return $http(req).then(
							function(response) {
								return response;
							},

							function(error) {
								return $q.reject(error);
							}
						);
					}
				};
			}
		];
	});
})();
