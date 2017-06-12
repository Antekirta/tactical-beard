(function () {
    'use strict';

    var categoriesSidebar = angular.module('categoriesSidebar');

    categoriesSidebar.controller('categoriesSidebarCtrl', [
        '$scope',
        '$log',
        '$state',
        '$stateParams',
        'categoriesProvider',
        'statesFactory',
        'translitFactory',
        'STATE_NAMES',

        function ($scope, $log, $state, $stateParams, categoriesProvider, statesFactory, translitFactory, STATE_NAMES) {
            $scope.categories = [];

            $scope.goToUIState = function (state, shouldGo) {
                if (!shouldGo) {
                    $state.go(STATE_NAMES.CATEGORY, {
                        categoryId: state.params.categoryId,
                        categoryName: translitFactory.rusTolat(state.params.categoryName)
                    });
                }
            };

            categoriesProvider.getCategories()
            // get categories
                .then(function (response) {
                    var categories = _.toArray(response.data.data.categories);

                    categories = _.sortBy(categories, [function (obj) {
                        return parseInt(obj[0].sort_order);
                    }]);

                    _.remove(categories, function (obj) {
                        return obj[0].meta_title === '';
                    });

                    $scope.categories = categories;

                    return categories;
                })
                // get subcategories
                .then(function (categories) {
                    categories.forEach(function (category) {
                        categoriesProvider.getSubCategories(category[0].category_id)
                            .then(function (response) {
                                if (response.data.success) {
                                    var subcategories = _.toArray(response.data);

                                    category.subcategories = _.toArray(subcategories[1].categories);
                                }
                            })
                            .catch(function (error) {
                                $log.error(error);
                            });
                    });

                    return categories;
                })
                .catch(function (error) {
                    $log.error(error);
                });

        }]);
})();