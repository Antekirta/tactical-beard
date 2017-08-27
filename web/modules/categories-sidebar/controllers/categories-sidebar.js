(function () {
    'use strict';

    angular.module('categoriesSidebar')
        .controller('categoriesSidebarCtrl', [
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

                $scope.goToUIState = function (state) {
                    $state.go(STATE_NAMES.CATEGORY, {
                        categoryId: state.params.categoryId,
                        categoryName: translitFactory.rusTolat(state.params.categoryName)
                    });
                };

                categoriesProvider.getCategories()
                // get categories
                    .then(function (response) {
                        let categories = _.toArray(response.data.data);

                        categories = _.sortBy(categories, [function (obj) {
                            return parseInt(obj.sort_order);
                        }]);

                        _.remove(categories, function (obj) {
                            return obj.meta_title === '';
                        });

                        $scope.categories = categories;

                        return categories;
                    })
                    // get subcategories
                    .then(function (categories) {
                        categories.forEach(function (category) {
                            categoriesProvider.getSubCategories(category.category_id)
                                .then(function (response) {
                                    if ( response.data.success ) {
                                        let subcategories = _.toArray(response.data);

                                        category.subcategories = _.toArray(subcategories[2]);
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