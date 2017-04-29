(function() {
	'use strict';

	var utils = angular.module('utils');

	utils.provider('manufacturersProvider', function() {
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
					getManufacturers: function() {
						req.url = REST_API.MANUFACTURERS;

						return $http(req).then(
							function(response) {
								response = {
									data: {
										data: [
                                            {
                                                name: 'first manufacturer'
                                            },
                                            {
                                                name: 'second manufacturer'
                                            },
                                            {
                                                name: 'third manufacturer'
                                            }
                                        ]
									}
								};
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
