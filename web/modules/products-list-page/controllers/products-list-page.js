(function() {
	'use strict';

	var productsListPage = angular.module('productsListPage');

	productsListPage.controller('productsListPageCtrl', ['$scope', '$log', 'productsProvider', function($scope, $log, productsProvider) {
        $scope.products = [];

        productsProvider.getProducts().then(
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
                // arr.forEach(function (category) {
                //     category[0].image = '../img/categories/' + category[0].meta_alias + '.svg';
                // });


				console.log('products', products);
                $scope.products = products;
            },

            function(error) {
                $log.error(error);
            }
        );
	}]);
})();