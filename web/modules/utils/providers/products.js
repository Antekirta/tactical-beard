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

                    getProductsBySearch: function (search) {
                        // req.url = REST_API.SEARCH_PRODUCTS + 'product_name=' + search;
                        req.url = REST_API.SEARCH_PRODUCTS_BY_NAME + search;
                        // req.url = 'http://tacticalbeard39.com/api/rest_admin/products/search/Helikon';

                        console.log('req.url!!!', req.url);
                        // req.url = 'http://tacticalbeard39.com/api/rest_admin/products/search/Helikon';

                        return $http(req).then(
                            function(response) {
                                return response;
                            },

                            function(error) {
                                return $q.reject(error);
                            }
                        );
                    },

					getProductsByTag: function (tag) {
                        req.url = REST_API.SEARCH_PRODUCTS + 'search=' + tag;

                        return $http(req).then(
                            function(response) {
                                return response;
                            },

                            function(error) {
                                return $q.reject(error);
                            }
                        );
                    },
					
					getProductFromDate: function (date) {
                        req.url = REST_API.SEARCH_PRODUCTS + 'filter_date_added_from=' + date;

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
