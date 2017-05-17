(function() {
	'use strict';

	var utils = angular.module('utils');

	utils.provider('productsProvider', function() {
		this.$get = [
			'$http',

			'$q',

			'$cacheFactory',

			'dataStorage',

			'REST_API',

			function($http, $q, $cacheFactory, dataStorage, REST_API) {
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
					},

                    getProductById: function (id) {
                        req.url = REST_API.PRODUCTS + '/' + id + '/';

                        return $http(req).then(
                            function(response) {
                                return response;
                            },

                            function(error) {
                                return $q.reject(error);
                            }
                        );
                    },

                    getProductsByCategoryId: function (id) {
                        req.url = REST_API.PRODUCTS + '/category/' + id + '/';

                        return $http(req).then(
                            function(response) {
								var products = JSON.parse(dataStorage.getData('products', true)) || {};

								if ( products[id] ) {
									return products[id];
								} else {
									products[id] = response;

									dataStorage.setData('products', JSON.stringify(products), true);
								}

                                return products[id];
                            },

                            function(error) {
                                return $q.reject(error);
                            }
                        );
                    },
					
					getLatestProducts: function (limit) {
                        req.url = REST_API.LATEST_PRODUCTS;

                        return $http(req).then(
                            function(response) {
                            	console.log('getLatestProductsWithDetails req: ', req);
                            	console.log('getLatestProductsWithDetails response: ', response);
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
