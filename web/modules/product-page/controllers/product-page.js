(function () {
    'use strict';

    angular.module('productPage').controller('productPageCtrl', [
        '$scope',

        '$log',

        '$state',

        '$stateParams',

        '$sce',

        'session',

        'productsProvider',

        'basketFactory',

        'translitFactory',

        'STATE_NAMES',

        function ($scope, $log, $state, $stateParams, $sce, session, productsProvider, basketFactory, translitFactory, STATE_NAMES) {
            $scope.product = {};

            $scope.productCount = 1;

            $scope.descTypes = {
                artictic: {
                    name: 'artictic',

                    status: true
                },

                technical: {
                    name: 'technical',

                    status: false
                }
            };

            function getFirstCategory(product) {
                return product.category[_.keys(product.category)[0]][0];
            }

            $scope.helpers = {
                goToBreadcrumbState: function (state) {
                    $state.go(state.name, state.params);
                },

                changeProductCount: function (increase) {
                    if ( increase ) {
                        if ( $scope.productCount < $scope.product.quantity ) {
                            $scope.productCount++;
                        } else {
                            alert('В наличии всего ' + $scope.product.quantity + ' единиц товара!');
                        }
                    } else {
                        if ( $scope.productCount > 1 ) {
                            $scope.productCount--;
                        }
                    }
                },

                changeDescription: function (descType) {
                    let type;

                    for (type in $scope.descTypes) {
                        if ( $scope.descTypes.hasOwnProperty(type) ) {
                            $scope.descTypes[type].status = false;
                        }
                    }

                    $scope.descTypes[descType].status = true;
                }
            };

            $scope.basket = {
                putProduct: function (isProduct) {
                    if ( isProduct ) {
                        const product = {
                            id: $scope.product.id,

                            quantity: $scope.productCount,

                            price: $scope.product.bestPrice || $scope.product.oldPrice
                        };

                        session.getCurrentSession()
                            .then(
                                function (session) {
                                    return basketFactory.put.product(product, session)
                                        .then(
                                            function (response) {
                                                // functionality of success message is here
                                            }
                                        );
                                }
                            );
                    } else {
                        alert('Товара нет в наличии. Свяжитесь с нами для получения подробной информации.');
                    }
                }
            };

            const productHandlers = {
                createArtDescription: function (description) {
                    $scope.artDescription = $sce.trustAsHtml(description);
                },

                createTechDescription: function (techDetails) {
                    const uselessProductAttrNames = ['code', 'article', 'unit'];

                    $scope.product.techDescription = _.toArray(techDetails).filter(function (element, index, arr) {
                        return uselessProductAttrNames.indexOf(element[1].name) === -1;
                    });
                },

                createPrices: function (discounts, originalPrice) {
                    if ( !_.isEmpty(discounts) ) {
                        $scope.product.bestPrice = Math.floor(_.minBy(discounts, function (discount) {
                            return +discount.price;
                        }).price);
                    }

                    $scope.product.oldPrice = Math.floor(originalPrice);
                },

                createBreadcrumbs: function () {
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

                                params: {
                                    categoryId: getFirstCategory($scope.product).category_id,
                                    categoryName: translitFactory.rusTolat(getFirstCategory($scope.product).name)
                                }
                            }
                        },

                        {
                            name: $scope.product.product_description[0].name,
                            state: {
                                name: STATE_NAMES.PRODUCT,
                                params: {}
                            }
                        }
                    ];
                }
            };

            productsProvider.getProductById($stateParams.productId).then(
                function (response) {
                    $scope.product = response.data.data;

                    productHandlers.createArtDescription($scope.product.product_description[0].description);

                    productHandlers.createTechDescription($scope.product.product_attributes.attributes);

                    productHandlers.createPrices($scope.product.discounts, $scope.product.price);

                    productHandlers.createBreadcrumbs();
                },

                function (error) {
                    $log.error(error);
                }
            );
        }]);
})();