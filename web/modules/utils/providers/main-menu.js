(function() {
	'use strict';

	var utils = angular.module('utils');

	utils.provider('mainMenu', function() {
		var menuItems = 'menu items';

		this.$get = [
			'$http',

			function($http) {
				var mainMenuItemsDestination = this.mainMenuItemsDestination;

				return {
					getMenuItems: function() {
						return $http.get(mainMenuItemsDestination).then(
							function (response) {
								return response;
							},

							function (error) {
								return error;
							}
						);
					}
				};
		}];
	})
})();