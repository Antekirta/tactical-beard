(function() {
	'use strict';

	var utils = angular.module('utils');

	utils.provider('productsProvider', function() {
		this.$get = [
			'$http',

			'$q',

			'REST_API',

			function($http, $q, REST_API) {
				var req = {
					method: 'GET',

					dataType: 'jsonp',

					headers: {
						'X-Oc-Restadmin-Id': REST_API.X_OC_RESTADMIN_ID
					}
				};

				return {
					getProducts: function() {
						req.url = REST_API.PRODUCTS;

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
