(function () {
    'use strict';

    angular.module('utils')
        .service('session', [
            '$http',

            '$q',

            'REST_API',

            function ($http, $q, REST_API) {
                var deferred = $q.defer();

                deferred.resolve('8ktnrub884mnu416vn9373tmd6');

                return deferred.promise;

                // var req = {
                //     method: 'GET',
                //
                //     url: REST_API.SESSION,
                //
                //     dataType: 'jsonp',
                //
                //     headers: {
                //         'X-Oc-Restadmin-Id': REST_API.X_OC_RESTADMIN_ID
                //     }
                // };
                //
                // return $http(req)
                //     .then(
                //         function (response) {
                //             console.log('response: ', response);
                //         }
                //     );
            }]);
})();