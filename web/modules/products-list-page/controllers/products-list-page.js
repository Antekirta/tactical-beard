(function() {
	'use strict';

	var productsListPage = angular.module('productsListPage');

	productsListPage.controller('productsListPageCtrl', ['$scope', '$log', '$state', '$stateParams', '$locale', 'productsProvider', function($scope, $log, $state, $stateParams, $locale, productsProvider) {
        $scope.products = [];

        $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

        productsProvider.getProductsByCategoryId($stateParams.categoryName).then(
            function(response) {
                var products = _.toArray(response.data.data);

                // arr = _.sortBy(arr, [function (obj) {
                //     return parseInt(obj[0].sort_order);
                // }]);
                //
                // _.remove(arr, function (obj) {
                //     return obj[0].meta_title === '';
                // });
                //
                console.log('products:', products);
                $scope.products = products;
            },

            function(error) {
                $log.error(error);
            }
        );
	}]);
})();