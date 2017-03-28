(function() {
	'use strict';

	var utils = angular.module('utils');

	utils.factory('basket', [
		'REST_API',

		function(REST_API) {
			var getRequest = {
				method: 'GET',

				url: REST_API.BASKET,

				dataType: 'jsonp',

				headers: {
					'X-Oc-Restadmin-Id': REST_API.X_OC_RESTADMIN_ID
				}
			};

		}]);
})();