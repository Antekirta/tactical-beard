(function() {
	'use strict';

	var utils = angular.module('utils');

	utils.provider('categoriesProvider', function() {
		this.$get = [
			'$http',

			'$q',

			'REST_API',

			'DATA_STORAGE',

			'dataStorage',

			function($http, $q, REST_API, DATA_STORAGE, dataStorage) {
				var req = {
					method: 'GET',

					dataType: 'jsonp',

					headers: {
						'X-Oc-Restadmin-Id': REST_API.X_OC_RESTADMIN_ID
					}
				};

				return {
					getCategories: function() {
						var categories = JSON.parse(dataStorage.getData(DATA_STORAGE.STORAGES.CATEGORIES, true)) || {};

                        // if categories are already stored in data storage, then return it from there

                        if ( !_.isEmpty(categories) ) {
                            var deferred = $q.defer();

                            deferred.resolve(categories);

                            return deferred.promise;
                        }

                        req.url = REST_API.CATEGORIES;

						return $http(req).then(
							function(response) {
                                categories = response;

                                dataStorage.setData(DATA_STORAGE.STORAGES.CATEGORIES, JSON.stringify(categories), true);

                                return categories;
							},

							function(error) {
								return $q.reject(error);
							}
						);
					},

                    getCategoriesForLevel: function(level) {
					    level = level || 2;

                        // var categories = JSON.parse(dataStorage.getData(DATA_STORAGE.STORAGES.CATEGORIES, true)) || {};
                        //
                        // // if categories are already stored in data storage, then return it from there
                        //
                        // if ( !_.isEmpty(categories) ) {
                        //     var deferred = $q.defer();
                        //
                        //     deferred.resolve(categories);
                        //
                        //     return deferred.promise;
                        // }

                        req.url = REST_API.CATEGORIES + '/level/' + level + '/';

                        return $http(req).then(
                            function(response) {
                                return response;
                            },

                            function(error) {
                                return $q.reject(error);
                            }
                        );
                    },

					getSubCategories: function (id) {
					    // TODO Implement cache for subcategories

                        // var subCategories = JSON.parse(dataStorage.getData(DATA_STORAGE.STORAGES.SUBCATEGORIES, true)) || {};

                        // if categories are already stored in data storage, then return it from there

                        // if ( !_.isEmpty(subCategories) ) {
                        //     var deferred = $q.defer();
                        //
                        //     console.log('subCategories: ', subCategories);
                        //
                        //     deferred.resolve(subCategories);
                        //
                        //     return deferred.promise;
                        // }

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
