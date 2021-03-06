(function () {
    'use strict';

    angular.module('productsListPage').controller('productsListPageCtrl', [
        '$rootScope',
        '$scope',
        '$log',
        '$state',
        '$interval',
        '$stateParams',
        '$locale',
        'productsProvider',
        'filtersFactory',
        'statesFactory',
        'translitFactory',
        'categoriesDictionary',
        'APP_PARAMS',
        'STATE_NAMES',

        function ($rootScope, $scope, $log, $state, $interval, $stateParams, $locale, productsProvider, filtersFactory, statesFactory, translitFactory, categoriesDictionary, APP_PARAMS, STATE_NAMES) {
            // storage for min and max prices on the $rootScope level. It's necessary for price filters

            $rootScope.rootScope = {
                products: {}
            };

            $scope.helpers = {
                getCurrentOrder: function () {
                    const currentOrdermap = {
                        'cheaper': 'price',

                        // reverse
                        'expensive': '-price'
                    };

                    let currentOrder = _.find($scope.filters.order, function (orderType) {
                        return orderType.status;
                    });

                    if (currentOrder) {
                        return currentOrdermap[currentOrder.name];
                    } else {
                        return 'name';
                    }
                },

                getCurrentFilters: function () {
                    return 'byManufacturerFilter';
                }
            };

            const promises = {
                getProductsByCategoryId: function (id) {
                    productsProvider.getProductsByCategoryId(id).then(
                        function (response) {
                            let products = _.toArray(response.data.data);

                            setTitle();

                            /**
                             * Set page title
                             */
                            function setTitle() {
                                const firstProduct = _.first(products).category[0][0];

                                document.title = firstProduct.meta_title || firstProduct.name;
                            }

                            let images = [];

                            products.forEach(function (item) {
                                item.price = +item.price;

                                item.inStock = !!item.quantity;

                                images.push({id: item.id, image: item.original_image});

                                item.image = '';
                            });

                            $rootScope.rootScope.products.minPrice = _.minBy(products, function (product) {
                                return product.price;
                            }).price;

                            $rootScope.rootScope.products.maxPrice = _.maxBy(products, function (product) {
                                return product.price;
                            }).price;

                            let counter = 0;

                            let productToSetImage = {};

                            $scope.products = products;

                            const stopInterval = $interval(function () {
                                productToSetImage = _.find($scope.products, function (product) {
                                    return product.id === images[counter].id;
                                });

                                productToSetImage.image = images[counter].image;

                                counter++;

                                if (counter >= products.length) {
                                    $interval.cancel(stopInterval);
                                }
                            }, APP_PARAMS.INTERVAL_BETWEEN_REQUESTS);
                        },

                        function (error) {
                            $log.error(error);
                        }
                    );
                },

                getProductsBySearch: function (search) {
                    console.log('products-list-page.js search: ', search);
                    productsProvider.getProductsBySearch(search).then(
                        function (response) {
                            console.log('search response: ', response);
                            let products = _.toArray(response.data.data);

                            let images = [];

                            products.forEach(function (item) {
                                item.price = +item.price;

                                images.push({id: item.id, image: item.original_image});

                                item.image = '';
                            });

                            $rootScope.rootScope.products.minPrice = _.minBy(products, function (product) {
                                return product.price;
                            }).price;

                            $rootScope.rootScope.products.maxPrice = _.maxBy(products, function (product) {
                                return product.price;
                            }).price;

                            let counter = 0;

                            let productToSetImage = {};

                            $scope.products = products;

                            const stopInterval = $interval(function () {
                                productToSetImage = _.find($scope.products, function (product) {
                                    return product.id === images[counter].id;
                                });

                                productToSetImage.image = images[counter].image;

                                counter++;

                                if (counter >= products.length) {
                                    $interval.cancel(stopInterval);
                                }
                            }, APP_PARAMS.INTERVAL_BETWEEN_REQUESTS);
                        },

                        function (error) {
                            $log.error(error);
                        }
                    );
                },

                getPromoProducts: function () {
                    productsProvider.getProductsByTag('promo').then(
                        function (response) {
                            let products = _.toArray(response.data.data);

                            let images = [];

                            products.forEach(function (item) {
                                item.price = +item.price;

                                images.push({id: item.id, image: item.original_image});

                                item.image = '';
                            });

                            $rootScope.rootScope.products.minPrice = _.minBy(products, function (product) {
                                return product.price;
                            }).price;

                            $rootScope.rootScope.products.maxPrice = _.maxBy(products, function (product) {
                                return product.price;
                            }).price;

                            let counter = 0;

                            let productToSetImage = {};

                            $scope.products = products;

                            const stopInterval = $interval(function () {
                                productToSetImage = _.find($scope.products, function (product) {
                                    return product.id === images[counter].id;
                                });

                                productToSetImage.image = images[counter].image;

                                counter++;

                                if (counter >= products.length) {
                                    $interval.cancel(stopInterval);
                                }
                            }, APP_PARAMS.INTERVAL_BETWEEN_REQUESTS);
                        },

                        function (error) {
                            $log.error(error);
                        }
                    );
                }
            };

            $scope.getProductLink = function (state) {
                const categoryNameForUrl = translitFactory.rusTolat(state.categoryName[_.keys(state.categoryName)[0]][0].name);

                const productName = translitFactory.rusTolat(state.productName);

                const productId = state.productId;

                return '/categories/' + categoryNameForUrl + '/' + productName + '/?productId=' + productId;
            };

            $scope.goToUIProductState = function (state) {
                $state.go(STATE_NAMES.PRODUCT, {
                    productId: state.productId,
                    productName: translitFactory.rusTolat(state.productName),
                    categoryName: state.categoryName[_.keys(state.categoryName)[0]][0].name,
                    categoryNameForUrl: translitFactory.rusTolat(state.categoryName[_.keys(state.categoryName)[0]][0].name)
                });
            };

            $scope.products = [];

            $scope.filters = filtersFactory.getCurrentFilters();

            $scope.currentOrder = $scope.helpers.getCurrentOrder();

            $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

            categoriesDictionary
                .then(
                    function (dictionary) {
                        $stateParams.categoryId = dictionary[$stateParams.categoryName];
                    }
                )
                .then(
                    function () {
                        console.log('products-list-page.js: inside of categoriesDictionary', );
                        if ( $state.current.name === STATE_NAMES.SEARCH ) {
                            promises.getProductsBySearch($stateParams.search);
                        } else if ( $state.current.name === STATE_NAMES.PROMO ) {
                            promises.getPromoProducts();
                        } else {
                            promises.getProductsByCategoryId($stateParams.categoryId);
                        }
                    }
                );
        }]);
})();