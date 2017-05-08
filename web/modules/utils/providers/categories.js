(function() {
	'use strict';

	var utils = angular.module('utils');

	utils.provider('categoriesProvider', function() {
		this.$get = [
			'$http',

			'$q',

			'REST_API',

			'dataStorage',

			function($http, $q, REST_API, dataStorage) {
				var req = {
					method: 'GET',

					dataType: 'jsonp',

					headers: {
						'X-Oc-Restadmin-Id': REST_API.X_OC_RESTADMIN_ID
					}
				};

				return {
					getCategories: function() {
						req.url = REST_API.CATEGORIES;

						return $http(req).then(
							function(response) {
                                var categories = JSON.parse(dataStorage.getData('categories', true)) || {};

                                if ( !_.isEmpty(categories) ) {
                                    return categories;
                                } else {
                                    categories = response;

                                    dataStorage.setData('categories', JSON.stringify(categories), true);
								}

                                return categories;
							},

							function(error) {
								return $q.reject(error);
							}
						);
					},

					getSubCategories: function (id) {
                        req.url = REST_API.CATEGORIES + '/parent/' + id + '/';

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
