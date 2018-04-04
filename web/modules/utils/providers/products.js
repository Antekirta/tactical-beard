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

			'DATA_STORAGE',

			function($http, $q, $cacheFactory, dataStorage, REST_API, DATA_STORAGE) {
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
                                response.data.data = response.data.data.filter(function (item) {
                                    return !item.status;
                                });

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
                                response.data.data = response.data.data.filter(function (item) {
                                    return parseInt(item.status);
                                });

								// var products = JSON.parse(dataStorage.getData(DATA_STORAGE.STORAGES.PRODUCTS, true)) || {};

								// if ( products[id] ) {
								// 	return products[id];
								// } else {
								// 	products[id] = response;
                                //
								// 	dataStorage.setData('products', JSON.stringify(products), true);
								// }

                                return response;
                            },

                            function(error) {
                                return $q.reject(error);
                            }
                        );
                    },

                    getProductsBySearch: function (search) {
                        req.url = REST_API.SEARCH_PRODUCTS_BY_NAME + search;
                        req.transformResponse = [];
                        // req.url = 'https://tacbeard.com/backend/index.php?route=rest/product_admin/products&search=CM515 от CYMA';

                        return $http(req).then(
                            function(response) {
                                response.data = JSON.parse(response.data);
                                
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
                                response.data.data = response.data.data.filter(function (item) {
                                    return !item.status;
                                });

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
                                response.data.data = response.data.data.filter(function (item) {
                                    return !item.status;
                                });
                                
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
