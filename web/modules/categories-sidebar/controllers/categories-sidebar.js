(function() {
	'use strict';

	var categoriesSidebar = angular.module('categoriesSidebar');

	categoriesSidebar.controller('categoriesSidebarCtrl', ['$scope', '$log', 'categoriesProvider', function($scope, $log, categoriesProvider) {
        // categoriesProvider.getCategories().then(
        //     function(response) {
        //         var categories = _.toArray(response.data.data.categories);
        //
        //         categories = _.sortBy(categories, [function (obj) {
        //             return parseInt(obj[0].sort_order);
        //         }]);
        //
        //         _.remove(categories, function (obj) {
        //             return obj[0].meta_title === '';
        //         });
        //
        //         console.log('categories:', categories);
        //
        //         $scope.categories = categories;
        //     },
        //
        //     function(error) {
        //         $log.error(error);
        //     }
        // );
        //
        // categoriesProvider.getSubCategories(62).then(
        //     function(response) {
        //         var arr = _.toArray(response.data.data.categories);
        //
        //         console.log('arr: ', arr);
        //
        //         arr = _.sortBy(arr, [function (obj) {
        //             return parseInt(obj[0].sort_order);
        //         }]);
        //
        //         // _.remove(arr, function (obj) {
        //         //     return obj[0].meta_title === '';
        //         // });
        //
        //         $scope.subcategories = arr;
        //     },
        //
        //     function(error) {
        //         $log.error(error);
        //     }
        // );

        $scope.categories = [];

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
                            if ( response.data.success ) {
                                var subcategories = _.toArray(response.data);
                                console.log('subcategories: ', subcategories[1].categories);
                                category.subcategories = _.toArray(subcategories[1].categories);
                            }
                           return response.data;
                        });
                });

                return categories;
            });

	}]);
})();