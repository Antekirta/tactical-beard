(function () {
    'use strict';

    angular.module('categoriesList').controller('categoriesListCtrl', [
        '$scope',

        '$log',

        '$state',

        'categoriesProvider',

        'translitFactory',

        'STATE_NAMES',

        function ($scope, $log, $state, categoriesProvider, translitFactory, STATE_NAMES) {
            $scope.categories = [];

            $scope.goToUICategoryState = function (state) {
                console.log('categories-list state: ', state.params.categoryId);

                $state.go(STATE_NAMES.CATEGORY, {
                    categoryId: state.params.categoryId,

                    categoryName: translitFactory.rusTolat(state.params.categoryName)
                });
            };

            $scope.helpers = {
                sortByOrder: function (a, b) {
                    const orderProp = 'sort_order';

                    try {
                        if ( !a.hasOwnProperty(orderProp) || !b.hasOwnProperty(orderProp) ) {
                            throw new SyntaxError('Wrong parameters in helpers.sortByOrder');
                        }

                        return a[orderProp] - b[orderProp];
                    } catch (err) {
                        $log.error(err);
                    }
                }
            };

            categoriesProvider.getCategories().then(
                function (response) {
                    let arr = _.toArray(response.data.data);
					
                    arr = _.sortBy(arr, [function (obj) {
                        return parseInt(obj.sort_order);
                    }]);

                    _.remove(arr, function (obj) {
                        return obj.meta_title === '';
                    });

                    arr.forEach(function (category,) {
                        category.image = '../img/categories/' + category.meta_alias + '.svg';
                    });

                    $scope.categories = arr;
                },

                function (error) {
                    $log.error(error);
                }
            );

        }]);
})();