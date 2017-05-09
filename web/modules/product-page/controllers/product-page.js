(function() {
	'use strict';

	var productPage = angular.module('productPage');

	productPage.controller('productPageCtrl', [
		'$scope',

		'$log',

		'$state',

		'$stateParams',

		'productsProvider',

		'translitFactory',

		'STATE_NAMES',

		function($scope, $log, $state, $stateParams, productsProvider, translitFactory, STATE_NAMES) {
            $scope.product = {};

            $scope.productCount = 1;

            function getFirstCategory(product) {
				return product.category[_.keys(product.category)[0]][0];
            }

            $scope.helpers = {
                goToBreadcrumbState: function (state) {
                    $state.go(state.name, state.params);
                },
				
				changeProductCount: function (increase) {
					if ( increase ) {
                        $scope.productCount++;
					} else {
						if ( $scope.productCount > 1 ) {
                            $scope.productCount--;
						}
					}
                }
			};

            productsProvider.getProductById($stateParams.productId).then(
            	function (response) {
					$scope.product = response.data.data;

					console.log('$scope.product: ', $scope.product);

                    $scope.breadcrumbs = [
                        {
                            name: 'Главная',
                            state: {
                            	name: STATE_NAMES.HOME,
								params: {}
							}
                        },

                        {
                            name: 'Каталог',
                            state: {
                            	name: STATE_NAMES.CATEGORIES,
								params: {}
							}
                        },

                        {
                            name: $scope.product.category[_.keys($scope.product.category)[0]][0].name,
                            state: {
                            	name: STATE_NAMES.CATEGORY,

								params: {categoryId: getFirstCategory($scope.product).category_id, categoryName: translitFactory.rusTolat(getFirstCategory($scope.product).name)}
							}
                        },

                        {
                            name: $scope.product.product_description[1].name,
                            state: {
                            	name: STATE_NAMES.PRODUCT,
								params: {}
							}
                        }
                    ];
                },

				function (error) {
                    $log.error(error);
                }
			);


		}]);
})();