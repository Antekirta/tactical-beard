(function() {
	'use strict';

	var categoriesSidebar = angular.module('categoriesSidebar');

	categoriesSidebar.controller('categoriesSidebarCtrl', ['$scope', 'categoriesProvider', function($scope, categoriesProvider) {
        $scope.subcategories = [
            'subcategory 1',
            'subcategory 2',
            'subcategory 3',
            'subcategory 4',
            'subcategory 5'
        ];

        categoriesProvider.getCategories().then(
            function(response) {
                var arr = _.toArray(response.data.data.categories);

                arr = _.sortBy(arr, [function (obj) {
                    return parseInt(obj[0].sort_order);
                }]);

                _.remove(arr, function (obj) {
                    return obj[0].meta_title === '';
                });

                $scope.categories = arr;
            },

            function(error) {
                $log.error(error);
            }
        );

        categoriesProvider.getSubCategories().then(
            function(response) {
                var arr = _.toArray(response.data.data.categories);

                console.log('arr: ', arr);

                arr = _.sortBy(arr, [function (obj) {
                    return parseInt(obj[0].sort_order);
                }]);

                // _.remove(arr, function (obj) {
                //     return obj[0].meta_title === '';
                // });

                $scope.subcategories = arr;
            },

            function(error) {
                $log.error(error);
            }
        );
	}]);
})();