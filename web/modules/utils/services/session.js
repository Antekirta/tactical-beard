(function () {
    'use strict';

    angular.module('utils')
        .service('session', [
            '$http',

            '$q',

            '$log',

            'REST_API',

            function ($http, $q, $log, REST_API) {
                const req = {
                    method: 'GET',

                    url: REST_API.SESSION,

                    dataType: 'json',

                    headers: {
                        'X-Oc-Merchant-Id': REST_API.X_OC_MERCHANT_ID,
                    }
                };

                return $http(req)
                    .then(
                        function (response) {
                            return response;
                        },

                        function (error) {
                            $log.error('Session service error: ', error);
                        }
                    );
            }]);
})();