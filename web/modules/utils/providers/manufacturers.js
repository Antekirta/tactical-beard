(function() {
	'use strict';

	var utils = angular.module('utils');

	utils.provider('manufacturersProvider', function() {
		this.$get = [
			'$http',

			'$q',

			'REST_API',

			function($http, $q, REST_API) {
				const req = {
					method: 'GET',

					dataType: 'jsonp',

					headers: {
						'X-Oc-Restadmin-Id': REST_API.X_OC_RESTADMIN_ID
					}
				};

				return {
					getManufacturers: function() {
						req.url = REST_API.MANUFACTURERS;

						return $http.get(REST_API.MANUFACTURERS, req).then(
							function(response) {
								console.log('getManufacturers response:', response);

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
